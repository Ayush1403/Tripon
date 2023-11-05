import React, { useState } from 'react';

const Hoteldetail = ({ hotel }) => {
  const [bargainPrice, setBargainPrice] = useState(300);
  const [isBargained, setIsBargained] = useState(false);

  const handleBargain = () => {
    if (isBargained) {
      alert('You can only bargain once for this hotel.');
    } else if (bargainPrice <= 300) {
      alert('Bargain price must be higher than ₹300.');
    } else {
      // Implement your logic to submit the bargain price to the backend
      // You can make an API request to handle this.

      // Assuming you've successfully bargained, update the state
      setIsBargained(true);
    }
  };

  const handleBook = () => {
    // Implement your logic to book the hotel here
    // You can make an API request or perform any other booking-related actions.
    alert(`You've booked ${hotel.name}. Enjoy your stay!`);
  };

  return (
    <div className="mb-10">
      <div>
        <img
          src={hotel.image}
          alt={hotel.name}
          className="w-full h-64 rounded-lg object-cover"
        />
      </div>
      <h2 className="text-2xl font-semibold font-primary mt-4">{hotel.name}</h2>
      <p className="text-gray-600">Rating: {hotel.rating}</p>
      <p className="text-lg font-semibold">Price: {hotel.price}</p>
      <p className="mt-4 text-gray-700">{hotel.description}</p>
      <button
        onClick={handleBook}
        className="bg-blue-500 w-[80%] text-white rounded-lg px-4 py-2 mt-4"
      >
        Book Hotel
      </button>
      <div className="mt-4">
        <input
          type="number"
          value={bargainPrice}
          onChange={(e) => setBargainPrice(e.target.value)}
          className="rounded-lg p-2 border border-gray-400"
          placeholder="Enter your bargain price"
        />
        <button
          onClick={handleBargain}
          className="bg-orange-500 text-white rounded-lg px-4 py-2 mt-2"
        >
          Bargain
        </button>
      </div>
      {isBargained && <p className="text-green-500 mt-2">You've successfully bargained!</p>}
    </div>
  );
};

export default Hoteldetail;
