import React, { useState, useEffect } from 'react'
import { authState } from '../store/authStore'
import { useNavigate } from 'react-router-dom'
import { Loader2Icon, Mail } from 'lucide-react'

const OtpVerification = ({ username }) => {
  const [Error, setError] = useState({})
  const [verify, setVerify] = useState({ 
    username: username || "",
    otp: '' 
  })
  const [resendTimer, setResendTimer] = useState(30) // countdown in seconds
  const { verifyy, isVerifying, error, authUser } = authState()
  const navigate = useNavigate()

  // Timer for resend button
  useEffect(() => {
    let interval
    if (resendTimer > 0) {
      interval = setInterval(() => {
        setResendTimer((prev) => prev - 1)
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [resendTimer])

  const handleChange = (e) => {
    setVerify({
      ...verify,
      [e.target.name]: e.target.value,
    })
  }

  const validate = () => {
    const newError = {}
    if (!verify.otp.trim()) {
      newError.otp = 'OTP is required'
    } else if (verify.otp.length < 4) {
      newError.otp = 'OTP must be at least 4 digits'
    }
    setError(newError)
    return Object.keys(newError).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (validate()) {
      const payload = { username: authUser?.username, otp: verify.otp }
      const success = await verifyy(payload)
      if (success) {
        navigate('/login')
      }
    }
  }

  // UI only for resend OTP
  const handleResendOtp = () => {
    setResendTimer(30) // restart timer
    // 🔴 Leave resend OTP logic for backend/API
    console.log('Resend OTP clicked')
  }

  return (
    <main className="w-full font-rubik h-screen flex justify-center items-center">
      <div className="lg:w-1/4 backdrop-blur-3xl rounded-lg shadow-lg bg-white/70 w-11/12 max-w-md p-6 flex flex-col justify-center items-center">
        
        <h1 className="text-[1.5rem] font-semibold mb-2">OTP Verification</h1>
        <p className="text-gray-700 text-sm mb-4">
          Enter the OTP sent to <span className="font-medium">{authUser?.email}</span>
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col w-full items-center">
          <div
            className={`border-2 p-2 rounded-lg w-3/4 bg-white/80 ${
              Error?.otp ? 'border-red-400' : 'border-gray-300'
            }`}
          >
            <input
              type="number"
              inputMode="numeric"
              name="otp"
              value={verify.otp}
              onChange={handleChange}
              placeholder="Enter OTP"
              className="w-full text-center text-lg font-semibold tracking-widest outline-none bg-transparent"
            />
          </div>
          <p className="text-red-700 text-[10px] mt-1">{Error?.otp}</p>
          {error && <p className="text-red-700 text-[10px]">{error}</p>}

          {/* Resend OTP */}
          <button
            type="button"
            onClick={handleResendOtp}
            className={`mt-4 text-sm text-blue-600 disabled:cursor-not-allowed disabled:scale-100 cursor-pointer active:scale-95 disabled:text-gray-400`}
            disabled={resendTimer > 0}
          >
            {resendTimer > 0 ? `Resend OTP in ${resendTimer}s` : "Resend OTP"}
          </button>

          {/* Submit Button */}
          <button
            className="bg-black text-white active:scale-95 font-normal cursor-pointer p-2 self-center text-sm mt-6 rounded-lg w-3/4 flex justify-center items-center"
            disabled={isVerifying}
          >
            {isVerifying ? (
              <Loader2Icon className="animate-spin" size={18} />
            ) : (
              <span>Verify</span>
            )}
          </button>
        </form>
      </div>
    </main>
  )
}

export default OtpVerification
