import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { eventState } from '../store/eventStore.js'
import { authState } from '../store/authStore.js'
import { bookingState } from '../store/bookingStore.jsx'
import { Ticket, User, Phone, DollarSign, CheckCircle, CreditCard, Hash } from 'lucide-react'
import NavBar from '../components/NavBar.jsx'
const EventPages = () => {
  const { eventId } = useParams();
  const { getAllTickets, order, isBookingLoaded, error } = bookingState();
  const { authUser, checkAuth } = authState();

  useEffect(() => {
    if (eventId) {
      getAllTickets(eventId);
    }
  }, [eventId, getAllTickets])

  if (isBookingLoaded) {
    return (

      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-purple-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 text-lg">Loading tickets...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 flex items-center justify-center">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md">
          <p className="text-red-600 font-medium">Error: {error}</p>
        </div>
      </div>
    )
  }

  return (

    <div className="min-h-screen bg-gradient-to-br pt-16 from-purple-50 to-blue-50 py-8 px-4">
      <NavBar page="organise"/>
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Event Tickets</h1>
          <p className="text-gray-600">View all bookings for this event</p>
        </div>

        {order && order.length > 0 ? (
          <div className="space-y-6">
            {order.map((ticket) => (
              <div 
                key={ticket._id} 
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                <div className="bg-gradient-to-r from-purple-600 to-blue-600 px-6 py-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Ticket className="text-white" size={24} />
                      <h2 className="text-xl font-bold text-white">Booking #{ticket.bookingId}</h2>
                    </div>
                    <span className={`px-4 py-1 rounded-full text-sm font-semibold ${
                      ticket.bookingStatus === 'confirmed' 
                        ? 'bg-green-400 text-green-900' 
                        : 'bg-yellow-400 text-yellow-900'
                    }`}>
                      {ticket.bookingStatus.toUpperCase()}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="flex items-start space-x-3">
                        <User className="text-purple-600 mt-1 flex-shrink-0" size={20} />
                        <div>
                          <p className="text-sm text-gray-500 font-medium">Attendee Name</p>
                          <p className="text-gray-800 font-semibold">{ticket.attendeeDetails.name}</p>
                        </div>
                      </div>

                      <div className="flex items-start space-x-3">
                        <Phone className="text-purple-600 mt-1 flex-shrink-0" size={20} />
                        <div>
                          <p className="text-sm text-gray-500 font-medium">Mobile</p>
                          <p className="text-gray-800 font-semibold">{ticket.attendeeDetails.Mobile}</p>
                        </div>
                      </div>

                      <div className="flex items-start space-x-3">
                        <Ticket className="text-purple-600 mt-1 flex-shrink-0" size={20} />
                        <div>
                          <p className="text-sm text-gray-500 font-medium">Seats</p>
                          <p className="text-gray-800 font-semibold">{ticket.seatsNeeded} Seats</p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-start space-x-3">
                        <DollarSign className="text-green-600 mt-1 flex-shrink-0" size={20} />
                        <div>
                          <p className="text-sm text-gray-500 font-medium">Total Price</p>
                          <p className="text-gray-800 font-bold text-xl">₹{ticket.totalPrice}</p>
                        </div>
                      </div>

                      <div className="flex items-start space-x-3">
                        <CheckCircle className="text-green-600 mt-1 flex-shrink-0" size={20} />
                        <div>
                          <p className="text-sm text-gray-500 font-medium">Payment Status</p>
                          <p className="text-gray-800 font-semibold capitalize">{ticket.paymentStatus}</p>
                        </div>
                      </div>

                      <div className="flex items-start space-x-3">
                        <CreditCard className="text-purple-600 mt-1 flex-shrink-0" size={20} />
                        <div>
                          <p className="text-sm text-gray-500 font-medium">Payment Method</p>
                          <p className="text-gray-800 font-semibold capitalize">{ticket.paymentMethod}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <div className="flex items-center space-x-3">
                      <Hash className="text-gray-400" size={20} />
                      <div className="flex-1">
                        <p className="text-sm text-gray-500">Transaction ID</p>
                        <p className="text-gray-700 font-mono text-sm">{ticket.transactionId}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-500">Event Code</p>
                        <p className="text-gray-700 font-semibold">{ticket.eventCode}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-lg p-12 text-center">
            <Ticket className="mx-auto text-gray-300 mb-4" size={64} />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No Tickets Found</h3>
            <p className="text-gray-500">There are no bookings for this event yet.</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default EventPages