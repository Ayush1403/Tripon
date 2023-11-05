import React, { useState } from 'react';
import Navbar from './Navbar2';
import i4 from '../ASSETS/kr1.webp';
import i5 from '../ASSETS/kr2.webp';
import i6 from '../ASSETS/kr5.webp';
import { Link } from 'react-router-dom';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import Swal from 'sweetalert2'; // Import Swal from SweetAlert2

const HotelDetails = () => {
  const hotel = {
    name: 'Beachfront Paradise Hotel',
    rating: 4.5,
    description:
      'Welcome to Beachfront Paradise Hotel, where dreams of the perfect seaside getaway become a reality. Nestled along the pristine shores of a tropical paradise, our luxurious resort offers a unique and unforgettable experience for those seeking the ultimate beachfront escape.',
    price: 5000,
    images: [i4, i5, i6],
  };

  const [isBargained, setIsBargained] = useState(false);
  const [bargainAmount, setBargainAmount] = useState(hotel.price - 300);
  const [bargainPopup, setBargainPopup] = useState(false);

  const handleBargainClick = () => {
    setBargainPopup(true);
  };

  const handleBargainSubmit = () => {
    if (bargainAmount < hotel.price - 300) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Bargain amount cannot be less than the price decided by the hotel manager!',
      });
    } else {
      setIsBargained(true);
      setBargainPopup(false);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <div>
        <Navbar />
        <Link to="/binsara">Back to Binsara</Link>
      </div>
      <div className="flex flex-col lg:flex-row mt-10 items-center">
        <div className="lg:w-1/2 mb-4 p-5">
          <Carousel showArrows={true} showStatus={false} showThumbs={true} className='flex flex-col items-center justify-center'>
            {hotel.images.map((image, index) => (
              <div key={index} className='flex flex-col items-center justify-center'>
                <img src={image} alt={`${hotel.name} ${index}`} />
              </div>
            ))}
          </Carousel>
        </div>
        <div className="lg:w-1/2 lg:pl-4">
          <h2 className="text-2xl font-semibold font-primary mb-2">{hotel.name}</h2>
          <div className=" p-4 rounded-lg">
            <p className="text-black mb-2">{hotel.description}</p>
            <p className="text-lg text-black-600 font-primary">
              Rating: {hotel.rating.toFixed(1)} stars
            </p>
            <p className="text-lg text-black-600 font-primary">
              Price: ₹{isBargained ? bargainAmount : hotel.price}
            </p>
            {isBargained ? (
              <button className="bg-orange-500 w-[40%] text-white rounded-lg px-4 py-2 mt-2">
                Book Your Ticket Now
              </button>
            ) : (
              <button
                onClick={handleBargainClick}
                className="bg-orange-500 w-[40%] text-white rounded-lg px-4 py-2 mt-2"
              >
                Bargain
              </button>
            )}
            {bargainPopup && !isBargained && (
              <div className="mt-2">
                <input
                  type="number"
                  value={bargainAmount}
                  onChange={(e) => setBargainAmount(e.target.value)}
                  min={hotel.price - 300}
                  className="p-4 border-2 rounded-xl"
                />
                <button
                  onClick={handleBargainSubmit}
                  className="bg-orange-500 text-white rounded-lg px-4 py-2 ml-2"
                >
                  Submit Bargain
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotelDetails;
