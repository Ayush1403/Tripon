import React, { useState } from 'react';
import Navbar from './Navbar2';
import i1 from '../ASSETS/b1.webp';
import i2 from '../ASSETS/b2.webp';
import i3 from '../ASSETS/b3.webp';
import i4 from '../ASSETS/b4.webp';
import i5 from '../ASSETS/br5.webp';
import i6 from '../ASSETS/br6.webp';
import i7 from '../ASSETS/br8.webp';

const Binsara = () => {
  // Sample images for the carousel
  const images = [i1, i2, i3];

  const [currentImage, setCurrentImage] = useState(0);

  const handleImageClick = (index) => {
    setCurrentImage(index);
  };

  // Sample itinerary data
  const itinerary = [
    {
      day: 'Day 1: Arrival in Binsar',
      plan: 'Begin your Binsar journey by arriving in the serene hill town. Enjoy the fresh mountain air and explore the local surroundings.',
      budget: '₹2,500',
    },
    {
      day: 'Day 2: Binsar Wildlife Sanctuary',
      plan: 'Visit Binsar Wildlife Sanctuary and go for a nature walk. Spot exotic birds and wildlife in their natural habitat.',
      budget: '₹2,500',
    },
    {
      day: 'Day 3: Binsar Zero Point',
      plan: 'Hike to Binsar Zero Point for breathtaking panoramic views of the Himalayan peaks, including Nanda Devi and Trishul.',
      budget: '₹2,000',
    },
    {
      day: 'Day 4: Binsar Mahadev Temple',
      plan: 'Visit Binsar Mahadev Temple, a serene and ancient Shiva temple amidst dense deodar forests. Enjoy a spiritual experience.',
      budget: '₹2,000',
    },
    {
      day: 'Day 5: Departure',
      plan: 'Say farewell to the tranquil beauty of Binsar and head back with cherished memories of the Himalayan region.',
      budget: '₹1,500',
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
      <div>
        <Navbar />
      </div>
      <div className="flex flex-col lg:flex-row mt-10">
        {/* Image Carousel Section */}
        <div className="lg:w-1/2 mb-4 p-5">
          <img
            src={images[currentImage]}
            alt="Binsar"
            className="w-full h-auto rounded-xl"
          />
          <div className="flex mt-2 pl-2 rounded-xl space-x-10 justify-center">
            {images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Binsar ${index + 1}`}
                className={`w-1/4 rounded-xl cursor-pointer transition-opacity duration-300 hover:opacity-80 ${
                  index === currentImage ? 'opacity-80' : ''
                }`}
                onClick={() => handleImageClick(index)}
              />
            ))}
          </div>
        </div>

        {/* Itinerary Section */}
        <div className="lg:w-1/2 lg:pl-4">
          <h2 className="text-2xl font-semibold font-primary mb-2">
            10-Day Itinerary
          </h2>
          <div className="bg-orange-400 p-4 rounded-lg">
            {itinerary.map((item) => (
              <div key={item.day} className="mb-2">
                <h3 className="text-lg text-white font-semibold">{item.day}</h3>
                <p className="text-gray-200">{item.plan}</p>
                <p className="text-black-600 font-primary">{item.budget}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <hr className="mt-10" />

      {/* Hotels Section */}
      <div className="bg-white p-4 mt-40 flex flex-col justify-evenly rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold font-primary mb-6">
          Recommended Hotels in Kerala
        </h2>
        <div className="flex">
          {recommendedHotels.map((hotel, index) => (
            <div key={index} className="w-80 mr-10">
              <div className="mb-2 flex-row justify-center">
                <img
                  src={hotel.image}
                  alt={hotel.name}
                  className="w-full h-48 rounded-lg object-cover flex justify-center"
                />
              </div>
              <h4 className="text-lg font-semibold">{hotel.name}</h4>
              <p className="text-gray-600">Rating: {hotel.rating}</p>
              <p className="text-lg font-semibold">Price: {hotel.price}</p>
              <button className="bg-orange-500 w-[80%] text-white rounded-lg px-4 py-2 mt-2">
                See more
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Binsara;
