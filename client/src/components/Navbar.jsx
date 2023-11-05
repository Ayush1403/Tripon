import React from 'react'
import Searchbar from './Searchbar'
import logo from '../ASSETS/logo.png'
import { NavLink } from 'react-router-dom'

function Navbar() {
  return (
    <div className='relative w-screen h-[69px] bg-slate-700 bg-opacity-50 flex items-center text-white p-3 justify-around'>
     <img src={logo} alt=""  className='w-28'/>
    <ul className='flex space-x-10 mr-10'>
        <li><a href="/">Home</a></li>
        <li><a href="/">About us</a></li>
        <li><a href="/">Services</a></li>
        <li><a href="/">Contact us</a></li>
    </ul>
    <div className='mr-2 p-2'>
    <NavLink className="w-30 h-auto font-primary font-extralight text-white hover:bg-orange-500 ease-in duration-300 p-3 rounded-2xl"> Login</NavLink>
    <NavLink className="w-30 h-auto font-primary font-extralight text-white p-3 bg-orange-500 hover:bg-transparent hover:border-2 ease-in duration-100 rounded-2xl ml-2"> SignUp  </NavLink>
    </div>
    </div>
  )
}

export default Navbar