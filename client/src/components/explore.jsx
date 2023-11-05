import React from 'react'
import Navbar from './Navbar2'
import bg from '../ASSETS/inh3.png';
import Product from './product';
import hg from '../ASSETS/inh.jpg';
import gg from '../ASSETS/jj.webp';
import ggg from '../ASSETS/rj.webp';
import ggg1 from '../ASSETS/kk.webp';
import gg3 from '../ASSETS/binsar.webp';
import gg4 from '../ASSETS/jjj.png'
import { useEffect,useState } from 'react';
import { NavLink } from 'react-router-dom';

function Explore() {
  const [result, setResult] = useState(null);
useEffect(() => {
// Get result from localStorage
const result = localStorage.getItem('result');
setResult(JSON.parse(result));
}, []);


  return (
    <>
   <div>
        <Navbar />
      </div>
      <section className='w-screen h-auto cover flex flex-col top-[69px]'>
        <div >
          <h1 className='text-black text-xl drop-shadow-md  h-auto lg:text-2xl  font-light p-6 font-primary mt-10 ml-5'>
            Places according to your Intrest
                      </h1>
            <div>
              <div className='flex items-start justify-evenly'>
            <div className="ml-10 flex flex-col  hover:scale-110 ease-in-out duration-300">
      <img src={gg} alt="Product Image" className="w-[200px] h-[274px] rounded-lg object-cover" />
      <div className="w-pdt flex flex-row items-center justify-between mt-4">
        <div className='w-[200px]'>
          <h3 className="font-primary text-xl">Goa</h3>
          <h5 className=" font-medium text-sm">India's coastal paradise</h5>
          <NavLink to={"/goa"} className="text-orange-600">See more</NavLink>
        </div>

      </div>
      </div>
      <div className="ml-10 flex hover:scale-110 ease-in-out duration-300 flex-col">
      <img src={ggg} alt="Product Image" className="w-[200px] h-[274px] rounded-lg object-cover" />
      <div className="w-pdt flex flex-row items-center justify-between mt-4">
        <div className='w-[200px]'>
          <h3 className="font-primary text-xl">Gulmarg</h3>
          <h5 className=" font-medium text-sm">Best place for Skiing</h5>
          <NavLink to={"/gulmarg"} className="text-orange-600">See more</NavLink>
        </div>
      </div>
      </div>
      <div className="ml-10 flex flex-col  hover:scale-110 ease-in-out duration-300">
      <img src={gg3} alt="Product Image" className="w-[200px] h-[274px] rounded-lg object-cover" />
      <div className="w-pdt flex flex-row items-center justify-between mt-4">
        <div className='w-[200px]'>
          <h3 className="font-primary text-xl">Binsar</h3>
          <h5 className=" font-medium text-sm">Panaromic view of himalya</h5>
          <NavLink to={"/binsara"} className="text-orange-600">See more</NavLink>
        </div>
      </div>
      </div>
      <div className="ml-10 flex flex-col  hover:scale-110 ease-in-out duration-300">
      <img src={ggg1} alt="Product Image" className="w-[200px] h-[274px] rounded-lg object-cover" />
      <div className="w-pdt flex flex-row items-center justify-between mt-4">
        <div className='w-[200px]'>
          <h3 className="font-primary text-xl">Kerala</h3>
          <h5 className=" font-medium text-sm"> India's tropical paradise</h5>
          <NavLink to={"/kerala"} className="text-orange-600">See more</NavLink>
        </div>
      </div>
      </div>

      </div>
      </div>
      </div>
        </section>
       <hr className='mt-10 flex items-center' />
       <section className='w-screen h-auto flex p-20 mt-10 bg-orange-500 items-start justify-evenly'>
        <div className='w-[40%]'>
        <h1 className='mr-10 text-3xl font-bold drop-shadow-lg justify-start text-white font-secondry'>Why should you trust us</h1>
        <p className='mt-10 text-xl text-justify text-white'>Trust us to revolutionize your travel experience with our AI-powered travel plans and the unique ability to negotiate hotel prices, ensuring you get the best deals. Our user-centric approach, transparent information, and 24/7 support guarantee a seamless and personalized journey. Join thousands of satisfied travelers who have already chosen us to create unforgettable adventures</p>
        </div>
        <div>
          <img src={gg4} alt="" className=' drop-shadow-xl' />
        </div>
       </section>
    </>
  )
}

export default Explore