import React, { useState } from 'react';
import Navbar from './Navbar2'; 
import i1 from '../ASSETS/g1.webp'
import i2 from '../ASSETS/g2.webp'
import i3 from '../ASSETS/g3.webp'
import j4 from '../ASSETS/h4.webp'
import j0   from '../ASSETS/hr4.webp'
import j5 from '../ASSETS/hr5.webp'
import j6 from '../ASSETS/hr6.webp'
import j7 from '../ASSETS/hr8.webp'

const Goa = () => {
  // Sample images for the carousel
  const images = [
    i1,
    i2,
    i3,
    // Add more image URLs here
  ];

  const [currentImage, setCurrentImage] = useState(0);

  const handleImageClick = (index) => {
    setCurrentImage(index);
  };

  // Sample itinerary data
  const itinerary = [
    {
      day: 'Day 1: Arrival in Goa',
      plan: 'Arrive in Goa and check into a budget-friendly hotel in Panjim. Explore the local markets and enjoy Goan cuisine at a local restaurant.',
      budget: '₹3,000',
    },
    {
      day: 'Day 2: North Goa Beaches and Forts',
      plan: 'Visit Calangute Beach, Baga Beach, and Anjuna Beach. Explore Fort Aguada and enjoy water sports at the beaches.',
      budget: '₹3,500',
    },
    {
      day: 'Day 3: Old Goa and Spice Plantation',
      plan: 'Explore the churches of Old Goa, including the Basilica of Bom Jesus and Se Cathedral. Visit a spice plantation for a guided tour and traditional Goan lunch.',
      budget: '₹3,000',
    },
    {
      day: 'Day 4: South Goa Exploration',
      plan: 'Visit Colva Beach and Palolem Beach. Explore the Cabo de Rama Fort and enjoy a serene evening by the beach.',
      budget: '₹3,500',
    },
    {
      day: 'Day 5: Dudhsagar Waterfalls and Departure',
      plan: 'Take a trip to Dudhsagar Waterfalls. Enjoy the scenic beauty and return to your hotel to check out and depart from Goa.',
      budget: '₹2,000',
    },
  ];
  
  const [hotelPrice, setHotelPrice] = useState(5000); // Sample hotel price

  const handleBargain = (newPrice) => {
    if (newPrice <= 300) {
      alert('You cannot bargain below ₹300');
    } else {
      setHotelPrice(newPrice);
    }
  };
  const recommendedHotels = [
    {
      name: 'Ahilya by the Sea',
      rating: '4.8',
      price: '₹20,000',
      image: j0,
    },
    {
      name: 'W Goa',
      rating: '4.7',
      price: '₹18,000',
      image: j4,
    },
    {
      name: 'The Leela Goa',
      rating: '4.6',
      price: '₹22,000',
      image: j5,
    },
    {
      name: 'Vivenda Dos Palhaços',
      rating: '4.5',
      price: '₹12,000',
      image: j6,
    },
    {
      name: 'Alila Diwa Goa',
      rating: '4.4',
      price: '₹15,000',
      image: j7,
    },
  ];
  
  return (
    
    <div className="container mx-auto p-6">
        <div><Navbar /></div>
      <div className="flex flex-col lg:flex-row mt-10">
        <div className="lg:w-1/2 mb-4 p-5">
          <img
            src={images[currentImage]}
            alt="Goa"
            className="w-full h-auto rounded-xl"
          />
          <div className="flex mt-2 pl-2 rounded-xl space-x-10 justify-center">
            {images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Goa ${index + 1}`}
                className={`w-1/4 roun cursor-pointer transition-opacity duration-300 hover:opacity-80 ${
                  index === currentImage && 'opacity-80'
                }`}
                onClick={() => handleImageClick(index)}
              />
            ))}
          </div>
          
        </div>
        <div className="lg:w-1/2 lg:pl-4">
          <h2 className="text-2xl font-semibold font-primary mb-2">5-Day Itinerary</h2>
          <div className="bg-orange-400 p-4 rounded-lg">
            {itinerary.map((item) => (
              <div key={item.day} className="mb-2">
                <h3 className="text-lg text-white font-semibold">{item.day}</h3>
                <p className=' text-gray-200'>{item.plan }</p>
                <p className="text-black-600 font-primary">{item.budget}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
     <hr className='mt-10' />
      <div className="bg-white p-4 mt-40 flex flex-col justify-evenly rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold font-primary mb-6">Recommended hotels in Kerala</h2>
            <div className="flex">
              {recommendedHotels.map((hotel) => (
                <div
               
                  className="w-80 mr-10"
                >
                  <div className="mb-2 flex-row justify-center">
                    <img
                      src={hotel.image}
                      alt={hotel.name}
                      className="w-full h-48 rounded-lg object-cover flex  justify-center"
                    />
                  </div>
                  <h4 className="text-lg font-semibold">{hotel.name}</h4>
                  <p className="text-gray-600">Rating: {hotel.rating}</p>
                  <p className="text-lg font-semibold">Price: {hotel.price}</p>
                  <button
                   
                    className="bg-orange-500 w-[80%]  text-white rounded-lg px-4 py-2 mt-2"
                  >
                    See more
                  </button>
                </div>
              ))}
            </div>
          </div>
      </div> 
  );
};

export default Goa;
