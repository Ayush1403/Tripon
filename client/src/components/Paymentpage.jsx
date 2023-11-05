import React, { useState } from 'react';

const PaymentPage = ({ selectedHotel }) => {
  const [formData, setFormData] = useState({
    name: '',
    cardNumber: '',
    expirationDate: '',
    cvv: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    // Handle payment submission logic here
    // You can process payments, confirm bookings, etc.
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-4">Payment Page</h1>
      {selectedHotel && (
        <div className="mb-4">
          <h2 className="text-xl font-semibold mb-2">Selected Hotel Details</h2>
          <p>Name: {selectedHotel.name}</p>
          <p>Price: ₹{selectedHotel.price}</p>
          {/* Add more hotel details here */}
        </div>
      )}

      <form onSubmit={handlePaymentSubmit} className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Payment Information</h2>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Name on Card</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="w-full border p-2 rounded focus:outline-none focus:ring focus:border-blue-300"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Card Number</label>
          <input
            type="text"
            name="cardNumber"
            value={formData.cardNumber}
            onChange={handleInputChange}
            className="w-full border p-2 rounded focus:outline-none focus:ring focus:border-blue-300"
            required
          />
        </div>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">Expiration Date</label>
            <input
              type="text"
              name="expirationDate"
              value={formData.expirationDate}
              onChange={handleInputChange}
              className="w-full border p-2 rounded focus:outline-none focus:ring focus:border-blue-300"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">CVV</label>
            <input
              type="text"
              name="cvv"
              value={formData.cvv}
              onChange={handleInputChange}
              className="w-full border p-2 rounded focus:outline-none focus:ring focus:border-blue-300"
              required
            />
          </div>
        </div>
        <button
          type="submit"
          className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-700 transition-colors"
        >
          Confirm Payment
        </button>
      </form>
    </div>
  );
};

export default PaymentPage;
