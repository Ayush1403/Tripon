import React, { useEffect, useState } from 'react'
import NavBar from '../components/NavBar.jsx'
import { eventState } from '../store/eventStore.js'
import { authState } from '../store/authStore.js'
import { useNavigate } from 'react-router-dom'
import Foot from './Foot.jsx'
import { Search, Filter } from 'lucide-react'

const AllEvents = () => {
  const { getEvent, events } = eventState();
  const { authUser, checkAuth } = authState();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all'); // all, high, medium, low

  useEffect(() => {
    checkAuth();
  }, []);

  useEffect(() => {
    if (authUser?.userType === "Organiser") {
      getEvent();
    }
  }, [authUser]);

  // Filter events based on search and booking status
  const filteredEvents = events.filter(event => {
    const matchesSearch = event.eventName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.organiserName.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (!matchesSearch) return false;

    if (filterStatus === 'all') return true;

    const seatsBooked = (event.Seats || 0) - (event.avilableSeats || 0);
    const bookingPercentage = event.Seats ? Math.round((seatsBooked / event.Seats) * 100) : 0;

    if (filterStatus === 'high') return bookingPercentage >= 70;
    if (filterStatus === 'medium') return bookingPercentage >= 30 && bookingPercentage < 70;
    if (filterStatus === 'low') return bookingPercentage < 30;

    return true;
  });

  return (
    <section className='w-full pt-16 gap-12 min-h-dvh flex flex-col relative bg-gray-50'>
      <NavBar page="organise" />
      
      {/* Hero Section */}
      <div className='w-full flex justify-center rounded-lg h-[350px]'>
        <div className='w-[95%] h-full relative rounded-3xl overflow-hidden'>
          <img src="/images/hero-bg.jpg" alt="" className='size-full object-cover' />
          <div className='w-full flex flex-col justify-center px-10 bg-gradient-to-r from-20% from-black/70 to-black/5 h-full z-30 absolute inset-0'>
            <h1 className='text-white font-bold font-poppins text-[3.5rem]'>All Your Events</h1>
            <p className='text-white/90 font-poppins text-xl mt-2'>Manage and monitor all your events in one place</p>
          </div>
        </div>
      </div>

      {/* Search and Filter Section */}
      <section className='px-10 w-full flex flex-col gap-6'>
        <div className='flex flex-col md:flex-row gap-4 items-center justify-between'>
          {/* Search Bar */}
          <div className='relative w-full md:w-96'>
            <Search className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400' size={20} />
            <input
              type="text"
              placeholder="Search events by name or organiser..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className='w-full pl-10 pr-4 py-3 border-2 border-gray-300 rounded-xl font-rubik focus:outline-none focus:border-[#2C7A7B] transition-all'
            />
          </div>

          {/* Filter Buttons */}
          <div className='flex gap-2 items-center'>
            <Filter size={20} className='text-gray-600' />
            <button
              onClick={() => setFilterStatus('all')}
              className={`px-4 py-2 rounded-lg font-rubik font-medium transition-all ${
                filterStatus === 'all' 
                  ? 'bg-[#2C7A7B] text-white' 
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilterStatus('high')}
              className={`px-4 py-2 rounded-lg font-rubik font-medium transition-all ${
                filterStatus === 'high' 
                  ? 'bg-green-600 text-white' 
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              High Booking
            </button>
            <button
              onClick={() => setFilterStatus('medium')}
              className={`px-4 py-2 rounded-lg font-rubik font-medium transition-all ${
                filterStatus === 'medium' 
                  ? 'bg-yellow-600 text-white' 
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              Medium
            </button>
            <button
              onClick={() => setFilterStatus('low')}
              className={`px-4 py-2 rounded-lg font-rubik font-medium transition-all ${
                filterStatus === 'low' 
                  ? 'bg-red-600 text-white' 
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              Low Booking
            </button>
          </div>
        </div>

        {/* Stats Overview */}
        <div className='grid grid-cols-1 md:grid-cols-4 gap-4 mb-4'>
          <div className='bg-white p-6 rounded-xl shadow-md'>
            <h3 className='font-rubik text-gray-600 text-sm'>Total Events</h3>
            <p className='font-bold font-poppins text-3xl mt-2'>{events.length}</p>
          </div>
          <div className='bg-white p-6 rounded-xl shadow-md'>
            <h3 className='font-rubik text-gray-600 text-sm'>High Booking (70%+)</h3>
            <p className='font-bold font-poppins text-3xl mt-2 text-green-600'>
              {events.filter(e => {
                const perc = Math.round(((e.Seats - e.avilableSeats) / e.Seats) * 100);
                return perc >= 70;
              }).length}
            </p>
          </div>
          <div className='bg-white p-6 rounded-xl shadow-md'>
            <h3 className='font-rubik text-gray-600 text-sm'>Medium Booking (30-70%)</h3>
            <p className='font-bold font-poppins text-3xl mt-2 text-yellow-600'>
              {events.filter(e => {
                const perc = Math.round(((e.Seats - e.avilableSeats) / e.Seats) * 100);
                return perc >= 30 && perc < 70;
              }).length}
            </p>
          </div>
          <div className='bg-white p-6 rounded-xl shadow-md'>
            <h3 className='font-rubik text-gray-600 text-sm'>Low Booking (&lt;30%)</h3>
            <p className='font-bold font-poppins text-3xl mt-2 text-red-600'>
              {events.filter(e => {
                const perc = Math.round(((e.Seats - e.avilableSeats) / e.Seats) * 100);
                return perc < 30;
              }).length}
            </p>
          </div>
        </div>

        {/* Events Grid */}
        <div className='w-full'>
          <h1 className='font-rubik font-medium text-[2rem] mb-6'>
            {searchTerm || filterStatus !== 'all' 
              ? `Filtered Events (${filteredEvents.length})` 
              : 'All Events'}
          </h1>
        </div>

        {filteredEvents.length > 0 ? (
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-12'>
            {filteredEvents.map((event) => {
              const seatsBooked = (event.Seats || 0) - (event.avilableSeats || 0);
              const bookingPercentage = event.Seats 
                ? Math.round((seatsBooked / event.Seats) * 100) 
                : 0;

              // Determine status color
              let statusColor = 'bg-red-600';
              if (bookingPercentage >= 70) statusColor = 'bg-green-600';
              else if (bookingPercentage >= 30) statusColor = 'bg-yellow-600';

              return (
                <div key={event._id} className="flex flex-col bg-white rounded-2xl shadow-gray-300/40 shadow-blur shadow-xl p-2 hover:shadow-2xl transition-all duration-300">
                  <div className="h-66 rounded-2xl relative overflow-hidden">
                    <img src={event.eventImage} alt={event.eventName} className="shadow-xl size-full transition-all linear duration-200 hover:scale-110 rounded-2xl object-cover" />
                    <div className={`absolute top-3 right-3 ${statusColor} text-white px-3 py-1 rounded-full text-xs font-semibold font-rubik`}>
                      {bookingPercentage}% Booked
                    </div>
                  </div>
                  <div className="px-6 mb-2">
                    <h1 className="font-light mt-4 text-[15px] font-rubik text-gray-600">
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
                        className={`h-2 rounded-full transition-all duration-500 ${
                          bookingPercentage >= 70 ? 'bg-green-600' :
                          bookingPercentage >= 30 ? 'bg-yellow-500' : 'bg-red-500'
                        }`}
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
                    <button 
                      className="border-[#2C7A7B] border-2 active:scale-95 transition-all ease-in-out duration-300 cursor-pointer hover:bg-[rgba(44,122,123,0.1)] text-[#2C7A7B] w-fit p-2 mb-2 ml-2 font-rubik rounded-xl"
                      onClick={() => navigate(`/eventshow/${event._id}`)}
                    >
                      View Details
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className='flex flex-col items-center justify-center py-20'>
            <div className='text-gray-400 mb-4'>
              <Filter size={64} />
            </div>
            <h2 className='font-rubik font-semibold text-2xl text-gray-700 mb-2'>No Events Found</h2>
            <p className='font-rubik text-gray-500'>Try adjusting your search or filter criteria</p>
          </div>
        )}
      </section>

      <Foot />
    </section>
  );
}

export default AllEvents