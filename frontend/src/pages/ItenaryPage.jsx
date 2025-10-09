import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Slider from "react-slick";

const ItenaryPage = () => {
  const location = useLocation();
  const [itenary, setItenary] = useState(null);
  const [openDay, setOpenDay] = useState(0);

  // Load itinerary from navigation state or localStorage
  useEffect(() => {
    if (location.state?.itenary) {
      setItenary(location.state.itenary);
      localStorage.setItem("selectedItenary", JSON.stringify(location.state.itenary));
    } else {
      const stored = localStorage.getItem("selectedItenary");
      if (stored) setItenary(JSON.parse(stored));
    }
  }, [location.state]);

  if (!itenary) return <p className="p-8 text-xl text-gray-600">Loading itinerary...</p>;

  const days = itenary?.data?.days || [];
  const currentDay = openDay !== null ? days[openDay] : days[0];
  const coverImage = itenary?.data?.coverImage;
  const stats = itenary?.data?.stats;

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
    arrows: true,
  };

  const toggleDay = (idx) => setOpenDay(openDay === idx ? null : idx);

  return (
    <main className="p-6 w-full min-h-screen flex flex-col md:flex-row justify-center items-start gap-6">
      {/* Left Section: Slider + Cover */}
      <div className="w-full md:w-1/2 flex flex-col gap-4">
      

        {/* Slider for current day */}
        {currentDay?.places?.length > 0 ? (
          <Slider {...settings} key={openDay}>
            {currentDay.places.map((place, idx) => (
              <div key={`${openDay}-${idx}`} className="relative">
                <img
                  src={place.image || "/placeholder-image.jpg"}
                  alt={place.name}
                  className="w-full h-[400px] object-cover rounded-lg"
                  onError={(e) => (e.target.src = "/placeholder-image.jpg")}
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                  <h3 className="text-white font-bold text-xl">{place.name}</h3>
                  <p className="text-white text-sm">{place.type}</p>
                </div>
              </div>
            ))}
          </Slider>
        ) : (
          <div className="w-full h-96 bg-gray-200 flex items-center justify-center rounded-lg">
            <p className="text-gray-500">No images available</p>
          </div>
        )}
      </div>

      {/* Right Section: Accordion */}
      <div className="w-full md:w-1/2 overflow-y-auto max-h-[700px] flex flex-col gap-2">
        {days.map((day, idx) => (
          <div
            key={day.day || idx}
            className="border border-gray-300 rounded-lg overflow-hidden bg-white shadow-sm"
          >
            <div
              className="p-4 cursor-pointer flex justify-between items-center bg-gray-50 hover:bg-gray-100 transition-colors"
              onClick={() => toggleDay(idx)}
            >
              <span className="font-bold text-black">Day {day.day} - {day.city}</span>
              <span className="text-black font-bold">{openDay === idx ? "▲" : "▼"}</span>
            </div>

            <div
              className={`overflow-hidden transition-all duration-500 ease-in-out ${
                openDay === idx ? "max-h-[1000px]" : "max-h-0"
              }`}
            >
              <div className="p-4 space-y-3 bg-white">
                {day.places && day.places.length > 0 ? (
                  day.places.map((place, i) => (
                    <div
                      key={i}
                      className="pb-3 border-b border-gray-200 last:border-b-0"
                    >
                      <h1 className="font-semibold text-lg text-gray-800">{place.name}</h1>
                      <p className="text-gray-600 text-sm mt-1">{place.description}</p>
                      <p className="text-gray-500 text-xs mt-1 capitalize">Type: {place.type}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 text-sm">No places for this day</p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
};

export default ItenaryPage;
