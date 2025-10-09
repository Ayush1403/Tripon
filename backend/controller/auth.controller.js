import mongoose from "mongoose";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../config/util.js";
import nodemailer from "nodemailer";
import crypto from "crypto";
import { otpEmailTemplate } from "../emailTemplete/otpTemplete.js";
import { createTransporter } from "../config/mail.js";

//Mail User
const transporter = createTransporter();



//Otp Generate
const generateOtp = () => crypto.randomInt(10000, 99999).toString();
// Create User
export const createUser = async (req, res) => {
  const { userType , username, fullName, email, password } = req.body;
  
  try {
    if (!username || !fullName || !email || !password) {
      return res
        .status(400)
        .json({ success: false, error: "All field required" });
    }
    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      return res
        .status(409)
        .json({ success: false, error: "User already exist" });
    }
    const nameExist = await User.findOne({ username: username });
    if (nameExist) {
      return res
        .status(409)
        .json({ success: false, error: "Username should be unique" });
    }
    if (
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/.test(
        password
      )

    )
    
    {
      return res
        .status(400)
        .json({
          success: false,
          error:
            "Password should contain atleast one Uppercase one Lowercase and one Special symbol",
        });
    }
    if (password.length < 6) {
      return res
        .status(400)
        .json({
          success: false,
          error: "Password length should be minimum 6",
        });
    }
    const otp = generateOtp();
    const otpDate = new Date(Date.now() + 10 * 60 * 1000);
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      username,
      fullName,
      email,
      otp,
      otpDate,
      password: hashedPassword,
      userType
    });
    if (newUser) {
      await newUser.save();
     try {
  await transporter.sendMail({
    from: "ayushsrivastava03004@gmail.com",
    to: email,
    subject: "OTP for Verification👍",
    html: otpEmailTemplate(fullName, otp),
  });
} catch (emailError) {
  console.log('Email sending error:', emailError.error);
  console.log('Error code:', emailError.code);
  // Still save the user but log the email error
}
      res.status(201).json({
        success: true,
        user: {
          _id: newUser._id,
          username,
          fullName,
          email,
          otp,
          isVerified: newUser.isVerified,
          userType
        },
      });
    }
  } catch (error) {
    res.status(500).json({ success: false, error: "Internal server error" });
    console.log(error.error);
  }
};

export const verifyUser = async (req, res) => {
  const { username, otp } = req.body;
  try {
    const otpVerify = await User.findOne({ username });
    if (!otpVerify) {
      return res
        .status(404)
        .json({ success: false, error: "User not found" });
    }

    if (otpVerify.isVerified) {
      return res
        .status(400)
        .json({ success: false, error: "User already verified" });
    }

    if (otpVerify.otp !== otp) {
      return res.status(400).json({ success: false, error: "Invalid OTP" });
    }

    if (otpVerify.otpDate && otpVerify.otpDate < Date.now()) {
      return res.status(400).json({ success: false, error: "OTP expired" });
    }
    otpVerify.isVerified = true;
    otpVerify.otp = null;
    otpVerify.otpDate = null;
    await otpVerify.save();

    generateToken(otpVerify._id, res);
    res.status(200).json({
      success: true,
      error: "User Veerified",
      user: {
        _id: otpVerify._id,
        username: otpVerify.username,
        email: otpVerify.email,
        isVerified: otpVerify.isVerified,
      },
    });
    console.log("ver");
  } catch (error) {
    console.log(error.error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};
//resend Otp

export const resendOtp = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    const otp = generateOtp();
    const otpDate = new Date(Date.now() + 10 * 60 * 1000);

    user.otp = otp;
    user.otpDate = otpDate;
    await user.save();

    await transporter.sendMail({
      from: "ayushsrivastava03004@gmail.com",
      to: email,
      subject: "Resend OTP for Verification 👍",
      html: otpEmailTemplate(user.fullName, otp),
    });

    return res.status(200).json({
      success: true,
      error: "New OTP sent successfully",
    });
  } catch (error) {
    console.error(error.error);
    return res
      .status(500)
      .json({ success: false, error: "Internal Server Error" });
  }
};

//Login User
export const userSignin = async (req, res) => {
  const { userType,username, password } = req.body;

  try {
    if (!username || !password) {
      return res
        .status(400)
        .json({ success: false, error: "All field required" });
    }
    const nameExist = await User.findOne({ username: username });
    if (!nameExist) {
      return res
        .status(404)
        .json({ success: false, error: "Username not found" });
    }
    const comparePassword = await bcrypt.compare(password, nameExist.password);
    if (!comparePassword) {
      return res
        .status(400)
        .json({ success: false, error: "Invalid Password" });
    }
    if (nameExist.isVerified != true) {
      return res
        .status(403)
        .json({ success: false, error: "User not verified." });
    }

    generateToken(nameExist._id, res);
    res.status(201).json({
      error: "LoggedIn Successfully",
      user: {
        username,
        _id: nameExist._id,
        userType
      },
    });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
    console.log(error.error);
  }
};

//Logout User
export const logoutUser = async (req, res) => {
  try {
    res.cookie("token", "", {
      maxAge: 0,
    });
    res.status(201).json({ error: "LoggedOut Successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
    console.log(error.error);
  }
};
//Check Authentication
export const checkAuth = (req, res) => {
  try {
    res.status(200).json(req.user);
  } catch (error) {
    console.log("error in checkAuth", error.error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
