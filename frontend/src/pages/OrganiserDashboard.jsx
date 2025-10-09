import React, { useEffect } from 'react'
import NavBar from '../components/NavBar.jsx'
import { eventState } from '../store/eventStore.js'
import { authState } from '../store/authStore.js'
import { useNavigate } from 'react-router-dom'

import Foot from './Foot.jsx'

const OrganiserDashboard = () => {
  const { getEvent, events } = eventState();
  const { authUser, checkAuth } = authState();
  const navigate = useNavigate();


  useEffect(() => {
    checkAuth();
  }, []);

  useEffect(() => {
    if (authUser?.userType === "Organiser") {
      getEvent();
    }
  }, [authUser]);


  // Get only the 5 most recent events
  const recentEvents = events.slice(0, 5);

  return (
    <section className='w-full pt-16 gap-12 min-h-dvh flex flex-col relative'>
      <NavBar page="organise" />
      
      <div className='w-full flex justify-center rounded-lg h-[450px]'>
        <div className='w-[95%] h-full relative rounded-3xl overflow-hidden'>
          <img src="/images/hero-bg.jpg" alt="" className='size-full object-cover' />
          <div className='w-full flex flex-col justify-center px-10 bg-gradient-to-r from-20% from-black/70 to-black/5 h-full z-30 absolute inset-0'>
            <h1 className='text-white  font-bold font-poppins text-[4rem] '>Reach More Attendees, <br />Fill More Seats</h1>
            <button
            onClick={()=>(navigate("/eventcreate"))}
            className='cursor-pointer mt-4 w-fit p-4 font-poppins  rounded-lg shadow-2xs 
            hover:bg-transparent hover:border-2 border-white transition-all
            duration-300 ease-linear hover:text-white active:scale-95  text-xl bg-white'>
              Create Events
            </button>
          </div>
        </div>
      </div>

      <section className='px-10 w-dvw  flex flex-col'>
        <div className='w-full'>
          <h1 className='font-rubik font-medium text-[2.5rem]'>Recent Events</h1>
        </div> <div className='flex flex-row overflow-x-scroll scrollbar-hidden gap-6'>
          {recentEvents.map((event) => {
            const seatsBooked = (event.Seats || 0) - (event.avilableSeats || 0);
            const bookingPercentage = event.Seats 
              ? Math.round((seatsBooked / event.Seats) * 100) 
              : 0;

            return (
              <div key={event._id} className="w-[384px] shrink-0 flex flex-col bg-white rounded-2xl shadow-gray-300/40 shadow-blur shadow-xl p-2">
                <div className="h-66 rounded-2xl">
                  <img src={event.eventImage} alt="" className="shadow-xl size-full transition-all linear duration-200 hover:scale-110 rounded-2xl object-cover" />
                </div>
                <div className="px-6 mb-2">
                  <h1 className="font-light mt-4 text-[15px] font-rubik">
                    {event.organiserName}
                  </h1>
                  <h1 className="font-semibold capitalize text-xl font-rubik">
                    {event.eventName}
                  </h1>
                </div>
                
                <div className="px-6 mb-2">
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-rubik text-gray-600">Total Seats: {event.Seats || 0}</span>
                    <span className="text-sm font-rubik text-gray-600">{bookingPercentage}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${bookingPercentage}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-sm font-rubik">
                    <span className="text-gray-700">Booked: {seatsBooked}</span>
                    <span className="text-gray-700">Available: {event.avilableSeats || 0}</span>
                  </div>
                </div>

                <div className="flex w-full items-center px-4 justify-between">
                  <h1 className="mb-2 ml-2 font-semibold font-rubik text-2xl">
                    Rs. {event.price}
                  </h1>
                 <button className="border-[#2C7A7B] border-2 active:scale-95 transition-all ease-in-out duration-300 cursor-pointer hover:bg-[rgba(44,122,123,0.1)] text-[#2C7A7B] w-fit p-2 mb-2 ml-2 font-rubik rounded-xl"
                  onClick={()=>(navigate(`/eventshow/${event._id}`))}>
                  View Details
                 </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>
      <Foot />
    </section>
  );
}

export default OrganiserDashboard