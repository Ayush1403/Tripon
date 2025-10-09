import React , {useState} from 'react';
import {ALargeSmall, ChartNoAxesCombined, EyeClosed, Loader, Lock, LucideChartNoAxesColumnIncreasing, LucideEye, MailCheck, User, User2} from 'lucide-react'
import { authState } from '../store/authStore';
import { Link, useNavigate } from 'react-router-dom';
import OtpVerification from './OtpVerification';
import NavBar from '../components/NavBar';

const SignUpOrganiser = () => {

  const [showOtp, setshowOtp] = useState(false)
  const [isOpen, setisOpen] = useState(false)
  const [Error, setError] = useState()
  const [formData, setformData] = useState({
    username: "",
    fullName: "",
    email: "",
    password: "",
    userType:"Organiser",

  })

  const {isSigningUp , useAuth , signup , error} = authState();
  const navigate = useNavigate();

  const handleChange = (e) =>{
    setformData({
      ...formData , 
      [e.target.name] : e.target.value
    })
  }

  const validateForm = () =>{
    const newError = {}
     if(!formData.username.trim()){
      newError.username= "Username is required"
    }
    if(!formData.fullName.trim()){
      newError.fullName= "Fullname is required"
    }
    if(!formData.email.trim()){
      newError.email= "Email is required"
    }
    if(!formData.password.trim()){
      newError.password= "Password is required"
    }
    if(!/\S+@\S+\.\S+/.test(formData.email)){
      newError.email= "Invalid email format"
    }
    if(!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/.test(formData.password)){
      newError.password="Need atleas one CApital Alphabet , Number , Small Letter & Special symbol"
    }
 

    setError(newError);
    return Object.keys(newError).length === 0;
  }

  const handleSubmit = async(e) =>{
    e.preventDefault();

    

    if(validateForm()){
      const success = await signup(formData)
      if(success){
        setshowOtp(true)
      }
    }
  }
  return (
    <section className=' h-screen bg-gray-800 flex flex-col justify-center items-center'>
     <NavBar page='explore' />
     
      <div className='flex mt-10 transition-transform ease-linear items-center w-3/4 h-[90%]'>
          <img
            src='/images/events.jpeg'
            alt='Signup'
            className='shadow-lg object-cover w-full h-full'
          />
        {/* Signup box */}
        <div className='absolute bg-gradient-to-r from-black to-black/50 text-white p-10  font-rubik w-3/4  h-[90%] shadow-lg flex flex-col  items-stretch px-4 justify-center text-2xl font-semibold'>
         <div className='absolute translate-x-1/2 2xl:translate-x-0 w-1/2 lg:left-10'>
           <h1 className='w-full text-center text-[2rem] lg:text-[4.5rem] md:text-[3rem]'>Signup</h1>
          <h3 className='capitalize w-full text-center mt-4 font-normal '>Let us join your Journey</h3>
        <div className='flex flex-col items-center gap-2 mt-10'>
            <form noValidate onSubmit={handleSubmit} className='flex w-full flex-col max-w-md gap-3 '>
                     <label htmlFor="fullName" className='font-normal text-start text-sm mb-1'>Username</label>
               <div className={`flex gap-2  w-full border-b-2 p-2 ${Error?.username ? "border-red-500" :  "border-white"} `}>
             <User2 />
              <input type="text" required onChange={handleChange} name="username" value={formData.username} id="" placeholder='username'  className='text-sm   w-full font-normal select-none outline-none'/>
            </div>
            <p className='text-red-700 text-[8px]'>{Error?.username}</p>
            {error&& <p className='text-red-700 text-[8px]'>{error}</p>}
             <label htmlFor="fullName" className='font-normal text-start text-sm mb-1'>Fullname</label>
            
             <div className={`flex gap-2  w-full border-b-2 p-2 ${Error?.fullName ? "border-red-500" :  "border-white"} `}>
              <ALargeSmall />
              <input type="text" required onChange={handleChange} name="fullName" value={formData.fullName} id="" placeholder='Full name'  className='text-sm   w-full font-normal select-none outline-none'/>
            </div>
             <p className='text-red-700 text-[8px]'>{Error?.fullName}</p>
             {error&& <p className='text-red-700 text-[8px]'>{error}</p>}
            <label htmlFor="#Email" className='font-normal mb-1 mt-6 text-sm '>Email</label>
             <div className={`flex gap-2  w-full border-b-2 p-2 ${Error?.email ? "border-red-500" :  "border-white"} `}>
              <MailCheck />
              <input type="email" required onChange={handleChange} id="Email" name="email" value={formData.email} placeholder='Email' className='text-sm w-full font-normal select-none outline-none'/>
            </div>
             <p className='text-red-700 text-[8px]'>{Error?.email}</p>
                         {error&& <p className='text-red-700 text-[8px]'>{error}</p>}
             <label htmlFor="#Email" className='font-normal mt-6 mb-1 text-sm '>Password</label>
              <div className={`flex gap-2 justify-between w-full border-b-2 p-2 ${Error?.password ? "border-red-500" :  "border-white"} `}>
             <div className='flex gap-2'>
               <Lock />
              <input type={isOpen ? "text" : "password"} required onChange={handleChange} id="password" name="password" value={formData.password} placeholder='Password' className='text-sm  font-normal select-none outline-none'/>
             </div><button type='button' onClick={()=>setisOpen(!isOpen)} className='text-gray-500'>
               {
                !isOpen ? <EyeClosed  /> : <LucideEye />
              }
             </button>
            </div>
                        {error&& <p className='text-red-700 text-[8px]'>{error}</p>}
             <p className='text-red-700 text-[8px]'>{Error?.password}</p>
            <button className='bg-white text-black active:scale-95 mb-2 font-normal cursor-pointer p-2 self-center text-sm mt-10 rounded-lg w-3/4' disabled={isSigningUp}>
             {
              !isSigningUp ? <span> Submit</span> : <Loader />
             }
              </button>
          </form>
          <div className='block 2xl:hidden justify-end items-end flex-col'>
          <Link to={'/login'}>
            <p className='font-light text-lg mt-2'>Go To Organiser-{"  "}   
              <button className='font-semibold hover:border-b-2 transition-all duration-150 ease-linear cursor-pointer'>
                Sign Up
              </button>
            </p>
             </Link>
          </div>
        </div>
         </div>
          <div className='absolute hidden 2xl:block bottom-[40%] right-20'>
          <div className='flex justify-end items-end flex-col'>
            <h1 className='font-bold  text-end text-[4rem]'>Let Us <br />Help In Your Event</h1>
            
          </div>
        </div>
        </div>

        {/* Image box */}
       
      </div>

      {
        showOtp && (
          <div className='w-full absolute flex items-center justify-center inset-0 bg-black/40 z-50'>
            <OtpVerification username={formData.username}/>  
          </div>
        )
      }
    </section>
  );
};

export default SignUpOrganiser;
