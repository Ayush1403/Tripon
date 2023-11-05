import React from 'react'
import Searchbar from './Searchbar'
import logo from '../ASSETS/logo.png'
import { NavLink } from 'react-router-dom'

function Navbar() {
  return (
    <div className='relative w-screen h-[69px] bg-slate-700 bg-transparent flex text-white p-1 items-center justify-between'>
     <img src={logo} alt=""  className='w-[130px]'/>
    <ul className='flex space-x-10 flex-row ml-96  text-black'>
        <li><a href="/">Home</a></li>
        <li><a href="/">About us</a></li>
        <li><a href="/">Services</a></li>
        <li><a href="/">Contact us</a></li>
    </ul>
    <div className='mr-2 p-2'>
    </div>
    </div>
  )
}

export default Navbar