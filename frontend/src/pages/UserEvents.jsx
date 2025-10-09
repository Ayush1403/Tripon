import React, { useEffect, useState } from 'react'
import { authState } from '../store/authStore.js'
import { eventState } from '../store/eventStore.js'
import { useNavigate } from 'react-router-dom'
import NavBar from '../components/NavBar.jsx'
import Foot from './Foot.jsx'
import { Calendar, Search, MapPin, DollarSign, Users, Ticket } from 'lucide-react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

const UserEvents = () => {
  const { authUser, checkAuth } = authState();
  const { getUserEvent, events } = eventState();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterAvailability, setFilterAvailability] = useState('all'); // all, available, soldout
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  useEffect(() => {
    if (authUser) {
      const fetchEvents = async () => {
        await getUserEvent();
        setIsLoading(false);
      };
      fetchEvents();
    }
  }, [authUser]);

  // Animate cards on mount
  useGSAP(() => {
    if (!isLoading && events.length > 0) {
      gsap.fromTo(
        '.event-card',
        { opacity: 0, y: 30, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.5,
          stagger: 0.1,
          ease: 'power2.out'
        }
      );
    }
  }, [isLoading, events]);

  const handleBookEvent = (event) => {
    navigate("/book", {
      state: {
        eventId: event._id,
        eventName: event.eventName,
        eventImage: event.eventImage,
        avilableSeats: event.avilableSeats,
        price: event.price,
        eventDate: event.eventDate,
        place: event.place
      }
    });
  };

  // Filter events based on search and availability
  const filteredEvents = events.filter(event => {
    const matchesSearch = event.eventName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.organiserName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.place?.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (!matchesSearch) return false;

    if (filterAvailability === 'all') return true;
    if (filterAvailability === 'available') return event.avilableSeats > 0;
    if (filterAvailability === 'soldout') return event.avilableSeats === 0;

    return true;
  });

  // Sort by most recent
  const sortedEvents = [...filteredEvents].reverse();

  // Calculate stats
  const availableEvents = events.filter(e => e.avilableSeats > 0).length;
  const soldOutEvents = events.filter(e => e.avilableSeats === 0).length;

  return (
    <section className='w-full pt-16 min-h-screen flex flex-col bg-gradient-to-br from-orange-50 via-red-50 to-pink-50'>
      <NavBar page="explore" />
      
      {/* Hero Section */}
      <div className='w-full px-10 py-16'>
        <div className='max-w-7xl mx-auto'>
          <div className='flex items-center gap-4 mb-4'>
            <Calendar className='text-[#2C7A7B]' size={48} />
            <div>
              <h1 className='text-5xl font-bold font-rubik text-gray-800'>Discover Events</h1>
              <p className='text-gray-600 font-rubik text-lg mt-2'>
                Explore exciting events happening around you
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className='px-10 mb-8'>
        <div className='max-w-7xl mx-auto flex flex-col md:flex-row gap-4 items-center justify-between'>
          {/* Search Bar */}
          <div className='relative w-full md:w-96'>
            <Search className='absolute left-4 top-1/2 -translate-y-1/2 text-gray-400' size={20} />
            <input
              type="text"
              placeholder="Search events, organizers or locations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className='w-full pl-12 pr-4 py-3 border-2 border-gray-300 rounded-xl font-rubik focus:outline-none focus:border-[#2C7A7B] transition-all bg-white shadow-md'
            />
          </div>

          {/* Filter Buttons */}
          <div className='flex gap-2 items-center'>
            <span className='text-gray-600 font-rubik font-medium mr-2'>Filter:</span>
            <button
              onClick={() => setFilterAvailability('all')}
              className={`px-4 py-2 rounded-lg font-rubik font-medium transition-all ${
                filterAvailability === 'all' 
                  ? 'bg-[#2C7A7B] text-white' 
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              All Events
            </button>
            <button
              onClick={() => setFilterAvailability('available')}
              className={`px-4 py-2 rounded-lg font-rubik font-medium transition-all ${
                filterAvailability === 'available' 
                  ? 'bg-green-600 text-white' 
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              Available
            </button>
            <button
              onClick={() => setFilterAvailability('soldout')}
              className={`px-4 py-2 rounded-lg font-rubik font-medium transition-all ${
                filterAvailability === 'soldout' 
                  ? 'bg-red-600 text-white' 
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              Sold Out
            </button>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      {events.length > 0 && (
        <div className='px-10 mb-8'>
          <div className='max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4'>
            <div className='bg-white p-6 rounded-xl shadow-md border-l-4 border-[#2C7A7B]'>
              <div className='flex items-center gap-3'>
                <Calendar className='text-[#2C7A7B]' size={24} />
                <div>
                  <h3 className='font-rubik text-gray-600 text-sm mb-1'>Total Events</h3>
                  <p className='font-bold font-poppins text-3xl text-[#2C7A7B]'>{events.length}</p>
                </div>
              </div>
            </div>
            <div className='bg-white p-6 rounded-xl shadow-md border-l-4 border-green-600'>
              <div className='flex items-center gap-3'>
                <Ticket className='text-green-600' size={24} />
                <div>
                  <h3 className='font-rubik text-gray-600 text-sm mb-1'>Available Events</h3>
                  <p className='font-bold font-poppins text-3xl text-green-600'>{availableEvents}</p>
                </div>
              </div>
            </div>
            <div className='bg-white p-6 rounded-xl shadow-md border-l-4 border-red-600'>
              <div className='flex items-center gap-3'>
                <Users className='text-red-600' size={24} />
                <div>
                  <h3 className='font-rubik text-gray-600 text-sm mb-1'>Sold Out Events</h3>
                  <p className='font-bold font-poppins text-3xl text-red-600'>{soldOutEvents}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Loading State */}
      {isLoading && (
        <div className='flex-1 flex items-center justify-center'>
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-[#2C7A7B] mx-auto"></div>
            <p className="mt-4 text-gray-600 text-lg font-rubik">Loading events...</p>
          </div>
        </div>
      )}

      {/* Events Grid */}
      {!isLoading && (
        <div className='px-10 pb-12 flex-1'>
          <div className='max-w-7xl mx-auto'>
            <div className='mb-6'>
              <h2 className='font-rubik font-semibold text-2xl text-gray-800'>
                {searchTerm || filterAvailability !== 'all' 
                  ? `Filtered Events (${sortedEvents.length})` 
                  : 'All Events'}
              </h2>
            </div>

            {sortedEvents.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {sortedEvents.map((event) => {
                  const isAvailable = event.avilableSeats > 0;
                  
                  return (
                    <div
                      key={event._id}
                      className="event-card flex flex-col bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
                    >
                      {/* Image Section */}
                      <div className="relative h-64 overflow-hidden">
                        <img
                          src={event.eventImage}
                          alt={event.eventName}
                          className="w-full h-full object-cover transform transition-transform duration-500 hover:scale-110"
                        />
                        
                        {/* Availability Badge */}
                        <div className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-bold font-rubik ${
                          isAvailable 
                            ? 'bg-green-500 text-white' 
                            : 'bg-red-500 text-white'
                        }`}>
                          {isAvailable ? 'Available' : 'Sold Out'}
                        </div>

                        {/* Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                      </div>

                      {/* Content Section */}
                      <div className="p-6 flex-1 flex flex-col">
                        <div className="mb-3">
                          <p className="font-light text-sm text-gray-600 font-rubik mb-1">
                            {event.organiserName}
                          </p>
                          <h2 className="font-semibold capitalize text-xl font-rubik text-gray-800 mb-2">
                            {event.eventName}
                          </h2>
                        </div>

                        {/* Event Details */}
                        <div className="space-y-2 mb-4 flex-1">
                          {event.place && (
                            <div className="flex items-center gap-2 text-gray-600">
                              <MapPin size={16} className="text-[#2C7A7B]" />
                              <span className="text-sm font-rubik">{event.place}</span>
                            </div>
                          )}
                          
                          {event.eventDate && (
                            <div className="flex items-center gap-2 text-gray-600">
                              <Calendar size={16} className="text-[#2C7A7B]" />
                              <span className="text-sm font-rubik">
                                {new Date(event.eventDate).toLocaleDateString('en-US', { 
                                  month: 'short', 
                                  day: 'numeric', 
                                  year: 'numeric' 
                                })}
                              </span>
                            </div>
                          )}

                          <div className="flex items-center gap-2 text-gray-600">
                            <Users size={16} className={isAvailable ? 'text-green-600' : 'text-red-600'} />
                            <span className="text-sm font-rubik">
                              {event.avilableSeats} {isAvailable ? 'seats available' : 'seats'}
                            </span>
                          </div>
                        </div>

                        {/* Price and Button */}
                        <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                          <div className="flex items-center gap-1">
                            <DollarSign size={20} className="text-gray-700" />
                            <span className="text-2xl font-bold font-rubik text-gray-800">
                              ₹{event.price}
                            </span>
                          </div>
                          <button
                            onClick={() => handleBookEvent(event)}
                            disabled={!isAvailable}
                            className={`px-4 py-2 rounded-xl font-rubik font-semibold transition-all active:scale-95 ${
                              isAvailable
                                ? 'border-2 border-[#2C7A7B] text-[#2C7A7B] hover:bg-[rgba(44,122,123,0.1)] cursor-pointer'
                                : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                            }`}
                          >
                            {isAvailable ? 'Book Now' : 'Sold Out'}
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="bg-white rounded-2xl shadow-lg p-16 text-center">
                <div className="flex justify-center mb-6">
                  <div className="bg-gray-100 p-8 rounded-full">
                    <Calendar className="text-gray-300" size={64} />
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-gray-700 mb-3 font-rubik">
                  {searchTerm || filterAvailability !== 'all' ? 'No Events Found' : 'No Events Available'}
                </h3>
                <p className="text-gray-500 font-rubik mb-6 max-w-md mx-auto">
                  {searchTerm || filterAvailability !== 'all'
                    ? "Try adjusting your search or filter criteria" 
                    : "Check back later for exciting events!"}
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      <Foot />
    </section>
  );
}

export default UserEvents