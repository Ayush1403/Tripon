import React from 'react'



import gg from '../ASSETS/jj.webp';
import ggg from '../ASSETS/rj.webp';
import ggg1 from '../ASSETS/kk.webp';
import gg3 from '../ASSETS/binsar.webp';


import { NavLink } from 'react-router-dom';

// Import your images (e.g., gg, ggg, gg3, ggg1) here

function Product() {
  return (
    <div className='flex justify-around flex-col'>
      <h1 className='text-black text-xl drop-shadow-md h-auto lg:text-2xl font-light p-6 font-primary mt-10 ml-5'>
        Places according to your Interest
      </h1>
      <div>
        <div className='flex items-start justify-evenly'>
          <div className="ml-10 flex flex-col hover:scale-110 ease-in-out duration-300">
            <img src={gg} alt="Goa" className="w-[200px] h-[274px] rounded-lg object-cover" />
            <div className="w-pdt flex flex-row items-center justify-between mt-4">
              <div className='w-[200px]'>
                <h3 className="font-primary text-xl">Goa</h3>
                <h5 className="font-medium text-sm">India's coastal paradise</h5>
                <NavLink to={"/goa"} className="text-orange-600">See more</NavLink>
              </div>
            </div>
          </div>

          <div className="ml-10 flex hover:scale-110 ease-in-out duration-300 flex-col">
            <img src={ggg} alt="Gulmarg" className="w-[200px] h-[274px] rounded-lg object-cover" />
            <div className="w-pdt flex flex-row items-center justify-between mt-4">
              <div className='w-[200px]'>
                <h3 className="font-primary text-xl">Gulmarg</h3>
                <h5 className="font-medium text-sm">Best place for Skiing</h5>
                <NavLink to={"/gulmarg"} className="text-orange-600">See more</NavLink>
              </div>
            </div>
          </div>

          <div className="ml-10 flex flex-col hover:scale-110 ease-in-out duration-300">
            <img src={gg3} alt="Binsar" className="w-[200px] h-[274px] rounded-lg object-cover" />
            <div className="w-pdt flex flex-row items-center justify-between mt-4">
              <div className='w-[200px]'>
                <h3 className="font-primary text-xl">Binsar</h3>
                <h5 className="font-medium text-sm">Panoramic view of the Himalayas</h5>
                <NavLink to={"/binsara"} className="text-orange-600">See more</NavLink>
              </div>
            </div>
          </div>

          <div className="ml-10 flex flex-col hover:scale-110 ease-in-out duration-300">
            <img src={ggg1} alt="Kerala" className="w-[200px] h-[274px] rounded-lg object-cover" />
            <div className="w-pdt flex flex-row items-center justify-between mt-4">
              <div className='w-[200px]'>
                <h3 className="font-primary text-xl">Kerala</h3>
                <h5 className="font-medium text-sm">India's tropical paradise</h5>
                <NavLink to={"/kerala"} className="text-orange-600">See more</NavLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Product;
