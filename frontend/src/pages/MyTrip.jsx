import React, { useEffect, useState } from 'react'
import { authState } from '../store/authStore.js'
import { itenaryState } from '../store/itenaryStore.js'
import { useNavigate } from 'react-router-dom'
import NavBar from '../components/NavBar.jsx'
import Foot from './Foot.jsx'
import { MapPin, Calendar, Search, Trash2, Eye, Clock } from 'lucide-react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

const MyTrip = () => {
  const { authUser, checkAuth } = authState();
  const { itenaries, itenaryGet, setSelectedItenary, deleteItenary } = itenaryState();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  useEffect(() => {
    if (authUser) {
      const fetchItenaries = async () => {
        await itenaryGet();
        setIsLoading(false);
      };
      fetchItenaries();
    }
  }, [authUser]);

  // Animate cards on mount
  useGSAP(() => {
    if (!isLoading && itenaries.length > 0) {
      gsap.fromTo(
        '.trip-card',
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
  }, [isLoading, itenaries]);

  const handleViewItenary = (item) => {
    setSelectedItenary(item);
    navigate('/itenary');
  };

  const handleDeleteItenary = async (id, e) => {
    e.stopPropagation();
    if (window.confirm('Are you sure you want to delete this trip?')) {
      await deleteItenary(id);
    }
  };

  // Filter itenaries based on search
  const filteredItenaries = itenaries.filter(item =>
    item.destination.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Sort by most recent
  const sortedItenaries = [...filteredItenaries].reverse();

  return (
    <section className='w-full pt-16 min-h-screen flex flex-col bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50'>
      <NavBar page="explore" />
      
      {/* Hero Section */}
      <div className='w-full px-10 py-16'>
        <div className='max-w-7xl mx-auto'>
          <div className='flex items-center gap-4 mb-4'>
            <MapPin className='text-[#2C7A7B]' size={48} />
            <div>
              <h1 className='text-5xl font-bold font-rubik text-gray-800'>My Trips</h1>
              <p className='text-gray-600 font-rubik text-lg mt-2'>
                Explore your travel memories and planned adventures
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className='px-10 mb-8'>
        <div className='max-w-7xl mx-auto'>
          <div className='relative w-full md:w-96'>
            <Search className='absolute left-4 top-1/2 -translate-y-1/2 text-gray-400' size={20} />
            <input
              type="text"
              placeholder="Search destinations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className='w-full pl-12 pr-4 py-3 border-2 border-gray-300 rounded-xl font-rubik focus:outline-none focus:border-[#2C7A7B] transition-all bg-white shadow-md'
            />
          </div>
        </div>
      </div>

      {/* Stats Section */}
      {itenaries.length > 0 && (
        <div className='px-10 mb-8'>
          <div className='max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4'>
            <div className='bg-white p-6 rounded-xl shadow-md border-l-4 border-[#2C7A7B]'>
              <div className='flex items-center gap-3'>
                <MapPin className='text-[#2C7A7B]' size={24} />
                <div>
                  <h3 className='font-rubik text-gray-600 text-sm mb-1'>Total Trips</h3>
                  <p className='font-bold font-poppins text-3xl text-[#2C7A7B]'>{itenaries.length}</p>
                </div>
              </div>
            </div>
            <div className='bg-white p-6 rounded-xl shadow-md border-l-4 border-purple-600'>
              <div className='flex items-center gap-3'>
                <MapPin className='text-purple-600' size={24} />
                <div>
                  <h3 className='font-rubik text-gray-600 text-sm mb-1'>Destinations Explored</h3>
                  <p className='font-bold font-poppins text-3xl text-purple-600'>
                    {new Set(itenaries.map(i => i.destination)).size}
                  </p>
                </div>
              </div>
            </div>
            <div className='bg-white p-6 rounded-xl shadow-md border-l-4 border-pink-600'>
              <div className='flex items-center gap-3'>
                <Clock className='text-pink-600' size={24} />
                <div>
                  <h3 className='font-rubik text-gray-600 text-sm mb-1'>Latest Trip</h3>
                  <p className='font-semibold font-rubik text-lg text-pink-600'>
                    {itenaries[itenaries.length - 1]?.destination || 'N/A'}
                  </p>
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
            <p className="mt-4 text-gray-600 text-lg font-rubik">Loading your trips...</p>
          </div>
        </div>
      )}

      {/* Trips Grid */}
      {!isLoading && (
        <div className='px-10 pb-12 flex-1'>
          <div className='max-w-7xl mx-auto'>
            {sortedItenaries.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {sortedItenaries.map((item) => (
                  <div
                    key={item._id}
                    className="trip-card relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer group transform hover:-translate-y-2"
                    onClick={() => handleViewItenary(item)}
                  >
                    {/* Image Section */}
                    <div className="relative h-64 overflow-hidden">
                      {item?.plan?.data?.coverImage ? (
                        <img
                          src={item.plan.data.coverImage}
                          alt={item.destination}
                          className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-[#2C7A7B] to-teal-600 flex items-center justify-center">
                          <MapPin className="text-white" size={64} />
                        </div>
                      )}
                      
                      {/* Overlay Gradient */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                      
                      {/* Destination Name */}
                      <div className="absolute bottom-0 left-0 right-0 p-4">
                        <h2 className="text-white text-2xl font-bold font-rubik mb-1">
                          {item.destination}
                        </h2>
                        {item.startDate && (
                          <div className="flex items-center gap-2 text-white/90">
                            <Calendar size={16} />
                            <span className="text-sm font-rubik">
                              {new Date(item.startDate).toLocaleDateString('en-US', { 
                                month: 'short', 
                                day: 'numeric', 
                                year: 'numeric' 
                              })}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleViewItenary(item);
                        }}
                        className="bg-white/90 hover:bg-white p-2 rounded-full shadow-lg transition-all active:scale-95"
                        title="View Trip"
                      >
                        <Eye size={18} className="text-[#2C7A7B]" />
                      </button>
                      <button
                        onClick={(e) => handleDeleteItenary(item._id, e)}
                        className="bg-white/90 hover:bg-white p-2 rounded-full shadow-lg transition-all active:scale-95"
                        title="Delete Trip"
                      >
                        <Trash2 size={18} className="text-red-600" />
                      </button>
                    </div>

                    {/* Bottom Info */}
                    <div className="p-4 bg-white">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600 font-rubik">
                          {item.plan?.data?.days?.length || 0} Days
                        </span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleViewItenary(item);
                          }}
                          className="text-[#2C7A7B] hover:text-teal-700 font-rubik font-semibold text-sm flex items-center gap-1 transition-colors"
                        >
                          View Details
                          <Eye size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-2xl shadow-lg p-16 text-center">
                <div className="flex justify-center mb-6">
                  <div className="bg-gray-100 p-8 rounded-full">
                    <MapPin className="text-gray-300" size={64} />
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-gray-700 mb-3 font-rubik">
                  {searchTerm ? 'No Trips Found' : 'No Trips Yet'}
                </h3>
                <p className="text-gray-500 font-rubik mb-6 max-w-md mx-auto">
                  {searchTerm 
                    ? "Try adjusting your search criteria" 
                    : "Start planning your next adventure and create memorable itineraries!"}
                </p>
                {!searchTerm && (
                  <button 
                    onClick={() => navigate('/')}
                    className="bg-[#2C7A7B] text-white px-6 py-3 rounded-xl font-rubik font-semibold hover:bg-teal-700 transition-all active:scale-95"
                  >
                    Create Your First Trip
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      <Foot />
    </section>
  );
}

export default MyTrip