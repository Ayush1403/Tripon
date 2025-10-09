import React, { useEffect, useState } from 'react'
import { authState } from '../store/authStore.js'
import { bookingState } from '../store/bookingStore.jsx'
import NavBar from '../components/NavBar.jsx'
import Foot from './Foot.jsx'
import { Ticket, Calendar, MapPin, Users, DollarSign, CheckCircle, Search, Filter } from 'lucide-react'

const UserBooking = () => {
  const { authUser, checkAuth } = authState();
  const { getTickets, order, isBookingLoaded, error } = bookingState();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all'); // all, confirmed, pending

  useEffect(() => {
    checkAuth();
  }, []);

  useEffect(() => {
    if (authUser?._id) {
      getTickets(authUser._id);
    }
  }, [authUser]);

  // Filter bookings based on search and status
  const filteredBookings = order?.filter(booking => {
    const matchesSearch = booking.attendeeDetails.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         booking.eventCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         booking.bookingId.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (!matchesSearch) return false;

    if (filterStatus === 'all') return true;
    return booking.bookingStatus === filterStatus;
  }) || [];

  if (isBookingLoaded) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-teal-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-[#2C7A7B] mx-auto"></div>
          <p className="mt-4 text-gray-600 text-lg font-rubik">Loading your bookings...</p>
        </div>
      </div>
    )
  }

  return (
    <section className='w-full pt-16 min-h-screen flex flex-col bg-gradient-to-br from-teal-50 to-blue-50'>
      <NavBar page="explore" />
      
      {/* Header Section */}
      <div className='w-full px-10 py-12'>
        <div className='max-w-7xl mx-auto'>
          <h1 className='text-5xl font-bold font-rubik text-gray-800 mb-2'>My Bookings</h1>
          <p className='text-gray-600 font-rubik text-lg'>View and manage all your event tickets</p>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className='px-10 mb-8'>
        <div className='max-w-7xl mx-auto flex flex-col md:flex-row gap-4 items-center justify-between'>
          {/* Search Bar */}
          <div className='relative w-full md:w-96'>
            <Search className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400' size={20} />
            <input
              type="text"
              placeholder="Search by name, event code or booking ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className='w-full pl-10 pr-4 py-3 border-2 border-gray-300 rounded-xl font-rubik focus:outline-none focus:border-[#2C7A7B] transition-all bg-white'
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
              onClick={() => setFilterStatus('confirmed')}
              className={`px-4 py-2 rounded-lg font-rubik font-medium transition-all ${
                filterStatus === 'confirmed' 
                  ? 'bg-green-600 text-white' 
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              Confirmed
            </button>
            <button
              onClick={() => setFilterStatus('pending')}
              className={`px-4 py-2 rounded-lg font-rubik font-medium transition-all ${
                filterStatus === 'pending' 
                  ? 'bg-yellow-600 text-white' 
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              Pending
            </button>
          </div>
        </div>
      </div>

      {/* Bookings Summary */}
      {order && order.length > 0 && (
        <div className='px-10 mb-8'>
          <div className='max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4'>
            <div className='bg-white p-6 rounded-xl shadow-md'>
              <h3 className='font-rubik text-gray-600 text-sm mb-1'>Total Bookings</h3>
              <p className='font-bold font-poppins text-3xl text-[#2C7A7B]'>{order.length}</p>
            </div>
            <div className='bg-white p-6 rounded-xl shadow-md'>
              <h3 className='font-rubik text-gray-600 text-sm mb-1'>Confirmed Bookings</h3>
              <p className='font-bold font-poppins text-3xl text-green-600'>
                {order.filter(b => b.bookingStatus === 'confirmed').length}
              </p>
            </div>
            <div className='bg-white p-6 rounded-xl shadow-md'>
              <h3 className='font-rubik text-gray-600 text-sm mb-1'>Total Amount Spent</h3>
              <p className='font-bold font-poppins text-3xl text-purple-600'>
                ₹{order.reduce((sum, b) => sum + b.totalPrice, 0).toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className='px-10 flex-1 flex items-center justify-center'>
          <div className='max-w-7xl mx-auto w-full'>
            <div className="bg-red-50 border-2 border-red-200 rounded-xl p-6 text-center">
              <p className="text-red-600 font-medium font-rubik">{error}</p>
            </div>
          </div>
        </div>
      )}

      {/* Bookings List */}
      <div className='px-10 pb-12 flex-1'>
        <div className='max-w-7xl mx-auto'>
          {filteredBookings.length > 0 ? (
            <div className="space-y-6">
              {filteredBookings.map((booking) => (
                <div 
                  key={booking._id} 
                  className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
                >
                  {/* Booking Header */}
                  <div className="bg-gradient-to-r from-[#2C7A7B] to-teal-600 px-6 py-4">
                    <div className="flex items-center justify-between flex-wrap gap-4">
                      <div className="flex items-center space-x-3">
                        <Ticket className="text-white" size={28} />
                        <div>
                          <h2 className="text-xl font-bold text-white font-rubik">
                            Booking #{booking.bookingId}
                          </h2>
                          <p className="text-teal-100 text-sm font-rubik">Event Code: {booking.eventCode}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className={`px-4 py-2 rounded-full text-sm font-bold font-rubik ${
                          booking.bookingStatus === 'confirmed' 
                            ? 'bg-green-400 text-green-900' 
                            : 'bg-yellow-400 text-yellow-900'
                        }`}>
                          {booking.bookingStatus.toUpperCase()}
                        </span>
                        <span className={`px-4 py-2 rounded-full text-sm font-bold font-rubik ${
                          booking.paymentStatus === 'paid' 
                            ? 'bg-blue-400 text-blue-900' 
                            : 'bg-orange-400 text-orange-900'
                        }`}>
                          {booking.paymentStatus.toUpperCase()}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Booking Details */}
                  <div className="p-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      {/* Left Column */}
                      <div className="space-y-4">
                        <div className="flex items-start space-x-3">
                          <div className="bg-teal-100 p-2 rounded-lg">
                            <Ticket className="text-[#2C7A7B]" size={20} />
                          </div>
                          <div>
                            <p className="text-sm text-gray-500 font-medium font-rubik">Attendee Name</p>
                            <p className="text-gray-800 font-semibold font-rubik text-lg">{booking.attendeeDetails.name}</p>
                          </div>
                        </div>

                        <div className="flex items-start space-x-3">
                          <div className="bg-teal-100 p-2 rounded-lg">
                            <Users className="text-[#2C7A7B]" size={20} />
                          </div>
                          <div>
                            <p className="text-sm text-gray-500 font-medium font-rubik">Contact Number</p>
                            <p className="text-gray-800 font-semibold font-rubik">{booking.attendeeDetails.Mobile}</p>
                          </div>
                        </div>

                        <div className="flex items-start space-x-3">
                          <div className="bg-purple-100 p-2 rounded-lg">
                            <Users className="text-purple-600" size={20} />
                          </div>
                          <div>
                            <p className="text-sm text-gray-500 font-medium font-rubik">Number of Seats</p>
                            <p className="text-gray-800 font-semibold font-rubik text-lg">{booking.seatsNeeded} Seats</p>
                          </div>
                        </div>
                      </div>

                      {/* Right Column */}
                      <div className="space-y-4">
                        <div className="flex items-start space-x-3">
                          <div className="bg-green-100 p-2 rounded-lg">
                            <DollarSign className="text-green-600" size={20} />
                          </div>
                          <div>
                            <p className="text-sm text-gray-500 font-medium font-rubik">Total Amount</p>
                            <p className="text-gray-800 font-bold font-rubik text-2xl">₹{booking.totalPrice.toLocaleString()}</p>
                          </div>
                        </div>

                        <div className="flex items-start space-x-3">
                          <div className="bg-blue-100 p-2 rounded-lg">
                            <CheckCircle className="text-blue-600" size={20} />
                          </div>
                          <div>
                            <p className="text-sm text-gray-500 font-medium font-rubik">Payment Method</p>
                            <p className="text-gray-800 font-semibold font-rubik capitalize">{booking.paymentMethod}</p>
                          </div>
                        </div>

                        <div className="flex items-start space-x-3">
                          <div className="bg-yellow-100 p-2 rounded-lg">
                            <CheckCircle className="text-yellow-600" size={20} />
                          </div>
                          <div>
                            <p className="text-sm text-gray-500 font-medium font-rubik">Transaction ID</p>
                            <p className="text-gray-700 font-mono text-sm">{booking.transactionId}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-2xl shadow-lg p-16 text-center">
              <div className="flex justify-center mb-6">
                <div className="bg-gray-100 p-6 rounded-full">
                  <Ticket className="text-gray-300" size={64} />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-700 mb-3 font-rubik">No Bookings Found</h3>
              <p className="text-gray-500 font-rubik mb-6">
                {searchTerm || filterStatus !== 'all' 
                  ? "Try adjusting your search or filter criteria" 
                  : "You haven't made any bookings yet. Start exploring events!"}
              </p>
              {(!searchTerm && filterStatus === 'all') && (
                <button 
                  onClick={() => window.location.href = '/'}
                  className="bg-[#2C7A7B] text-white px-6 py-3 rounded-xl font-rubik font-semibold hover:bg-teal-700 transition-all"
                >
                  Browse Events
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      <Foot />
    </section>
  )
}

export default UserBooking