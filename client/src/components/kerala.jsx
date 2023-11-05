import React, { useState } from 'react';
import Navbar from './Navbar2'; 
import i1 from '../ASSETS/k1.webp'
import i2 from '../ASSETS/k2.webp'
import i3 from '../ASSETS/k3.webp'
import i4 from '../ASSETS/kr1.webp'
import i5 from '../ASSETS/kr2.webp'
import i6 from '../ASSETS/kr5.webp'
import i7 from '../ASSETS/kr8.webp'

const Kerala = () => {
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
        day: 'Day 1: Arrival in Kochi',
        plan: 'Begin your Kerala journey by arriving in Kochi, the historic port city. Explore Fort Kochi, visit the Chinese fishing nets, and enjoy a seafood dinner.',
        budget: '₹2,000',
      },
      {
        day: 'Day 2: Munnar - Hill Station',
        plan: 'Head to Munnar, a beautiful hill station. Visit tea gardens, enjoy the cool climate, and take a nature walk.',
        budget: '₹2,500',
      },
      {
        day: 'Day 3: Munnar Exploration',
        plan: 'Spend the day exploring Munnar, visiting attractions like Mattupetty Dam, Anamudi Peak, and Eravikulam National Park.',
        budget: '₹2,000',
      },
      {
        day: 'Day 4: Thekkady - Wildlife Adventure',
        plan: 'Drive to Thekkady and explore Periyar Wildlife Sanctuary. Enjoy a boat ride on Periyar Lake and experience the wildlife.',
        budget: '₹2,500',
      },
      {
        day: 'Day 5: Alleppey - Backwaters',
        plan: 'Head to Alleppey and board a houseboat for a backwater cruise. Experience the serene backwaters of Kerala.',
        budget: '₹2,500',
      },
      {
        day: 'Day 6: Kovalam - Beach Relaxation',
        plan: 'Travel to Kovalam and relax on the beautiful Kovalam Beach. Enjoy water activities and explore the local markets.',
        budget: '₹2,000',
      },
      {
        day: 'Day 7: Kovalam Sightseeing',
        plan: 'Explore attractions in Kovalam, including the Lighthouse Beach and Hawah Beach. Visit Padmanabhaswamy Temple in Trivandrum.',
        budget: '₹2,000',
      },
      {
        day: 'Day 8: Wayanad - Nature Retreat',
        plan: 'Drive to Wayanad, a nature lover’s paradise. Visit waterfalls, wildlife sanctuaries, and explore the natural beauty.',
        budget: '₹2,500',
      },
      {
        day: 'Day 9: Wayanad Adventures',
        plan: 'Engage in adventure activities like trekking, zip-lining, and explore local tribal culture in Wayanad.',
        budget: '₹2,000',
      },
      {
        day: 'Day 10: Departure',
        plan: 'Say goodbye to Kerala with a heart full of memories. Depart from Kochi with lasting impressions of "God’s Own Country."',
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
        image: i7,
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
          <h2 className="text-2xl font-semibold font-primary mb-2">10-Day Itinerary</h2>
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

export default Kerala;
