import React, { useState } from 'react';
import Navbar from './Navbar2'; 
import i1 from '../ASSETS/img1.jpg'
import i2 from '../ASSETS/inh3.jpg'
import i3 from '../ASSETS/inh.jpg'
import i4 from '../ASSETS/hotel-room.webp'
import i5 from '../ASSETS/ll.webp'
import i6 from '../ASSETS/lk.webp'

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
        day: 'Day 1: Beach Day',
        plan: 'Start your trip with a relaxing day at the beautiful beaches of Goa. Enjoy the sun, sea, and sand at Baga Beach or Calangute Beach.',
        budget: '₹4,500',
      },
      {
        day: 'Day 2: Historical Exploration',
        plan: 'Visit historic sites like the Aguada Fort and Chapora Fort to discover Goa\'s rich heritage. Enjoy a sumptuous Goan lunch at a local restaurant.',
        budget: '₹4,800',
      },
      {
        day: 'Day 3: Adventure Thrills',
        plan: 'Indulge in water sports at Anjuna Beach or go on a thrilling trek in the Western Ghats. Enjoy the adrenaline rush.',
        budget: '₹5,200',
      },
      {
        day: 'Day 4: Cultural Immersion',
        plan: 'Explore the vibrant markets of Anjuna and Mapusa. Visit the beautiful Basilica of Bom Jesus and Se Cathedral to witness Goan architecture and culture.',
        budget: '₹4,500',
      },
      {
        day: 'Day 5: Relaxation and Shopping',
        plan: 'Spend a leisurely day shopping for souvenirs and relaxing at the spa. Wrap up your trip with a seafood feast at a beachfront restaurant.',
        budget: '₹4,000',
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
      name: 'Beachfront Paradise Hotel',
      rating: '4.5',
      price: '₹' + hotelPrice,
      image: i4,
    },
    {
      name: 'Tropical Oasis Resort',
      rating: '4.2',
      price: '₹6,000',
      image: i5,
    },
    {
      name: 'Seaside Retreat Inn',
      rating: '4.0',
      price: '₹4,800',
      image: i6,
    },
    {
        name: 'Star Delight',
        rating: '3.0',
        price: '₹4,200',
        image: i6,
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
      <h2 className="text-2xl font-semibold font-primary mb-6">Recommended hotels in Goa</h2>
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
