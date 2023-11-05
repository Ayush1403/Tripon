import React, { useState,Link,useEffect } from 'react';
import Navbar from './Navbar';
import bg from '../ASSETS/inh3.png';
import Product from './product';
import lg from '../ASSETS/about picture.png'
import ig from '../ASSETS/rr.png'
import { NavLink } from 'react-router-dom';
import jj from '../ASSETS/jj.webp'
import gsap from 'gsap'
import { explore } from '.';

function Home() {
useEffect(()=>{
  const sections = document.querySelectorAll('#section');

  sections.forEach((section, index) => {
    const offset = index ===0 ? '0' : '-50%';

   
    gsap.to("#section", {
      scrollTrigger: {
        trigger: section,
        start: offset,
        end: '50% 50%',
        pin: true,
        toggleActions: 'play none none reverse',
      },
      x: '0%',
      opacity: 1,
      duration: 1,
      ease: 'power2.out',
    });
  });
}, []);

  const backgroundImageStyle = {
    backgroundImage: `url(${bg})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  };

  const backgroundImageStyle2 = {
    backgroundImage: `url(${ig})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  };

  const [people, setPeople] = useState('');
  const [days, setDays] = useState('');
  const [budget, setBudget] = useState('');
  const [destination, setDestination] = useState('');
  const [customDestination, setCustomDestination] = useState('');

  const touristSpots = [
    'Goa',
    'Jaipur',
    'Kerala',
    'Agra',
    'Mumbai',
    'Varanasi',
    'Shimla',
    // Add more tourist spots as needed
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    const selectedDestination = destination === 'Other' ? customDestination : destination;
    
    // Now, you can make a fetch request to the backend with the user's input
    fetch('/generate-itinerary', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        budget: budget,
        people: people,
        days: days,
        destination: selectedDestination,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the response from the backend as needed
        console.log('Response from the backend:', data);
      })
      .catch((error) => {
        console.error('Error fetching itinerary data:', error);
      });
  };

  return (
    <>
      <div>
        <Navbar />
      </div>
      <section id='section' className='w-screen h-screen cover flex flex-col justify-center items-center' style={backgroundImageStyle}>
        <div className='w-screen flex items-center ease-in flex-col justify-center duration-200'>
          <h1 className='text-white text-5xl drop-shadow-md  h-auto lg:text-6xl font-bold p-6 font-secondry'>
            Let us help You plan your Travel
          </h1>
          <h4 className='text-white text-xl drop-shadow-md h-auto lg:text-xl font-semibold p-6 font-secondary'>
            You are one step away to your Journey
          </h4>
        </div>
<div className='p-6 bg-white mt-3 bg-opacity-0 rounded-xl flex items-center'>
        <form className='text-center bg-white flex flex-row  p-6 rounded-lg shadow-md items-center' onSubmit={handleSubmit}>
          <div className='mb-4 mr-4'>
            <label htmlFor='people' className='block font-bold'>
              Number of People:
            </label>
            <input
              type='number'
              id='people'
              value={people}
              onChange={(e) => setPeople(e.target.value)}
              className='border border-gray-300 rounded-md p-2 w-full'
            />
          </div>

          <div className='mb-4 mr-4'>
  <label htmlFor='days' className='block font-bold'>
    Number of Days:
  </label>
  <input
    type='number'
    id='days'
    value={days}
    onChange={(e) => setDays(e.target.value)}
    className='border border-gray-300 rounded-md p-2 w-full'
  />
</div>

          <div className='mb-4 mr-4'>
            <label htmlFor='budget' className='block'>
              Budget:
            </label>
            <input
              type='number'
              id='budget'
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              className='border border-gray-300 rounded-md p-2 w-full'
            />
          </div>

          <div className='mb-4 mr-4'>
            <label htmlFor='destination' className='block'>
              Destination:
            </label>
            <select
              id='destination'
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className='border border-gray-300 rounded-md p-2 w-full'
            >
              <option value=''>Select a Destination</option>
              {touristSpots.map((spot, index) => (
                <option key={index} value={spot}>
                  {spot}
                </option>
              ))}
              <option value='Other'>Other</option>
            </select>
          </div>

          {destination === 'Other' && (
            <div className='mb-4 mr-4'>
              <label htmlFor='customDestination' className='block'>
                Custom Destination:
              </label>
              <input
                type='text'
                id='customDestination'
                placeholder='Enter your custom destination'
                value={customDestination}
                onChange={(e) => setCustomDestination(e.target.value)}
                className='border border-gray-300 rounded-md p-2 w-full'
              />
            </div>
          )}

          <NavLink to={"/explore"} type='submit' className='p-3 bg-[#FA8B02] font-semibold text-white py-2 px-4 rounded-md'>
            Submit
          </NavLink>
        </form>
        </div>
      </section>
      <section className='h-[650px] w-screen p-20 text-xl font-semibold '>
            <h2>Explore Some popular destination</h2>

            <div className=' flex flex-row mt-10 justify-around'>
              <Product />
             
            </div>
      </section>
      <hr />
      <section className='h-[650px] flex w-screen p-20 text-xl items-center font-semibold '>
         <div className='w-[50%] p-10'>
            <img src={lg} alt=""  className='w-[400px] h-[auto] '/>
         </div>
         <div className='w-[50%] p-10'>
           <h2 className='text-black font-semibold text-lg'>About us</h2>
           <p className='font-light'>After decades of experience, and a whole life in India, we offer you the most complete tourism service in the city. In addition to having bikes and rickshaws to have as much fun as you want, you have the choice of tour guides with whom to tour and drivers for your every need! We offer packages in the way that you get the most at the lowest price. Book with us and we will always be available for you!</p>
         </div>
          
      </section>
      <section className='w-screen h-[420px] overflow-hidden flex items-center justify-around ' style={backgroundImageStyle2}>
              <div className='w-[569px] h-[360px] bg-white flex flex-col p-20 ml-20 items-center us rounded-3xl bg-opacity-30'>
                <h1 className='text-3xl font-primary text-center '>Get Special Bargain power for Stay</h1>
                <p className='mt-7'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.</p>
                <NavLink className="w-30 h-auto p-3 font-primary font-extralight text-white mt-7 bg-orange-500 rounded-3xl"> Contact us  </NavLink>
              </div>
            
      </section>
    </>
  );
}

export default Home;
