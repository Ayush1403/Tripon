import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Currency } from 'lucide-react';

const BookingSuccessful = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { booking } = location.state;

  const formattedDate = booking.eventDate
    ? new Date(booking.eventDate).toLocaleDateString()
    : "";

  return (
    <section className="min-h-screen bg-gray-100 flex justify-center items-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl max-w-3xl w-full p-8 relative">
        {/* Success Badge */}
        <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-green-500 w-20 h-20 rounded-full flex items-center justify-center shadow-lg">
          <svg
            className="w-10 h-10 text-white"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>

        {/* Header */}
        <h1 className="text-3xl font-bold text-center mt-12 mb-6 text-green-600">
          Booking Confirmed!
        </h1>

        {/* Attendee Info */}
        <div className="border rounded-xl p-6 mb-6 shadow-sm bg-gray-50">
          <h2 className="text-xl font-semibold mb-2">Attendee Details</h2>
          <p className="text-gray-700">
            <span className="font-medium">Name:</span> {booking.attendeeDetails.name}
          </p>
          <p className="text-gray-700">
            <span className="font-medium">Mobile:</span> {booking.attendeeDetails.Mobile}
          </p>
        </div>

        {/* Booking Info */}
        <div className="border rounded-xl p-6 mb-6 shadow-sm bg-gray-50">
          <h2 className="text-xl font-semibold mb-2">Booking Details</h2>
          <p className="text-gray-700">
            <span className="font-medium">Booking ID:</span> {booking.bookingId}
          </p>
          <p className="text-gray-700">
            <span className="font-medium">Event Code:</span> {booking.eventCode}
          </p>
          <p className="text-gray-700">
            <span className="font-medium">Seats Booked:</span> {booking.seatsNeeded}
          </p>
          <p className="text-gray-700 flex items-center gap-1">
            <span className="font-medium">Total Price:</span> <Currency className="w-4 h-4" /> {booking.totalPrice}
          </p>
          <p className="text-gray-700">
            <span className="font-medium">Payment Status:</span>{" "}
            <span className={booking.paymentStatus === "paid" ? "text-green-600" : "text-red-600"}>
              {booking.paymentStatus}
            </span>
          </p>
          <p className="text-gray-700">
            <span className="font-medium">Payment Method:</span> {booking.paymentMethod}
          </p>
        </div>

        {/* Event Info */}
        <div className="border rounded-xl p-6 shadow-sm bg-gray-50">
          <h2 className="text-xl font-semibold mb-2">Event Details</h2>
          <p className="text-gray-700">
            <span className="font-medium">Event ID:</span> {booking.eventId}
          </p>
          {booking.eventDate && (
            <p className="text-gray-700">
              <span className="font-medium">Event Date:</span> {formattedDate}
            </p>
          )}
        </div>

        {/* Button */}
        <button
          onClick={() => navigate("/")}
          className="mt-8 w-full bg-black text-white py-3 rounded-xl font-semibold text-lg hover:bg-gray-800 transition"
        >
          Go to Home
        </button>
      </div>
    </section>
  );
};

export default BookingSuccessful;
