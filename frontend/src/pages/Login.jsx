import React, { useState } from 'react'
import { User2, Lock, Loader, EyeClosed, LucideEye } from 'lucide-react';
import { authState } from '../store/authStore';
import { Link, useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar';

const Login = () => {
  const [Error, setError] = useState()
  const [isOpen, setisOpen] = useState(false)
  const [formData, setformData] = useState({
    username: "",
    password: "",
  })

  const handleChange = (e) => {
    setformData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const navigate = useNavigate();
  const { error, isLogingIn, login } = authState();

  const validateForm = () => {
    const newError = {}
    if (!formData.username.trim()) {
      newError.username = "Username is required"
    }

    if (!formData.password.trim()) {
      newError.password = "Password is required"
    }

    setError(newError)
    return Object.keys(newError).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      const success = await login(formData)
      if (success) {
        navigate("/")
      }
    }
  }

  return (
    <section className='h-screen bg-gray-800 flex flex-col justify-center items-center'>
      <NavBar page='explore' />

      <div className='flex mt-10 items-center w-3/4 h-[90%]'>
        <img
          src='/images/login.jpg'
          alt='Login'
          className='shadow-lg object-cover w-full h-full'
        />
        {/* Login box */}
        <div className='absolute bg-gradient-to-r from-black to-black/50 text-white p-10 font-rubik w-3/4 h-[90%] shadow-lg flex flex-col items-stretch px-4 justify-center text-2xl font-semibold'>
          <div className='absolute translate-x-1/2 2xl:translate-x-0 w-1/2 lg:left-10'>
            <h1 className='w-full text-center text-[2rem] lg:text-[4.5rem] md:text-[3rem]'>Login</h1>
            <h3 className='capitalize w-full text-center mt-4 font-normal'>Welcome Back!</h3>

            <div className='flex flex-col items-center gap-2 mt-10'>
              <form noValidate onSubmit={handleSubmit} className='flex w-full flex-col max-w-md gap-3'>
                <label htmlFor="username" className='font-normal text-start text-sm mb-1'>Username</label>
                <div className={`flex gap-2 w-full border-b-2 p-2 ${Error?.username ? "border-red-500" : "border-white"}`}>
                  <User2 />
                  <input
                    type="text"
                    required
                    onChange={handleChange}
                    name="username"
                    value={formData.username}
                    id="username"
                    placeholder='username'
                    className='text-sm w-full font-normal select-none outline-none bg-transparent'
                  />
                </div>
                <p className='text-red-700 text-[8px]'>{Error?.username}</p>
                {error && <p className='text-red-700 text-[8px]'>{error}</p>}

                <label htmlFor="password" className='font-normal mt-6 mb-1 text-sm'>Password</label>
                <div className={`flex gap-2 justify-between w-full border-b-2 p-2 ${Error?.password ? "border-red-500" : "border-white"}`}>
                  <div className='flex gap-2 w-full'>
                    <Lock />
                    <input
                      type={isOpen ? "text" : "password"}
                      required
                      onChange={handleChange}
                      id="password"
                      name="password"
                      value={formData.password}
                      placeholder='Password'
                      className='text-sm font-normal select-none outline-none bg-transparent w-full'
                    />
                  </div>
                  <button
                    type='button'
                    onClick={() => setisOpen(!isOpen)}
                    className='text-gray-400 hover:text-white transition-colors'
                  >
                    {!isOpen ? <EyeClosed /> : <LucideEye />}
                  </button>
                </div>
                {error && <p className='text-red-700 text-[8px]'>{error}</p>}
                <p className='text-red-700 text-[8px]'>{Error?.password}</p>

                <button
                  className='bg-white text-black active:scale-95 mb-2 font-normal cursor-pointer p-2 self-center text-sm mt-10 rounded-lg w-3/4 hover:bg-gray-100 transition-all'
                  disabled={isLogingIn}
                >
                  {!isLogingIn ? <span>Login</span> : <Loader className='animate-spin mx-auto' />}
                </button>
              </form>

              <div className='block 2xl:hidden justify-end items-end flex-col mt-4'>
                <Link to={'/signup'}>
                  <p className='font-light text-lg mt-2'>
                    Don't have an account?{" "}
                    <button className='font-semibold hover:border-b-2 transition-all duration-150 ease-linear cursor-pointer'>
                      Sign Up
                    </button>
                  </p>
                </Link>
                <Link to={'/loginO'}>
                  <p className='font-light text-lg mt-2'>
                    Organiser?{" "}
                    <button className='font-semibold hover:border-b-2 transition-all duration-150 ease-linear cursor-pointer'>
                      Login Here
                    </button>
                  </p>
                </Link>
              </div>
            </div>
          </div>

          <div className='absolute hidden 2xl:block bottom-30 right-20'>
            <div className='flex justify-end items-end flex-col'>
              <h1 className='font-normal text-end text-[4rem]'>
                New Here?
              </h1>
              <Link to={'/signup'}>
                <p className='font-light text-lg mt-2'>
                  Create an account -{" "}
                  <button className='font-semibold hover:border-b-2 transition-all duration-150 ease-linear cursor-pointer'>
                    Sign Up
                  </button>
                </p>
              </Link>
             
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Login