import React, { useEffect, useState } from "react";
import { authState } from "../store/authStore";
import { itenaryState } from "../store/itenaryStore";
import ItenaryCreation from "../components/ItenaryCreation";
import { NavLink, useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import ScrollTrigger from "gsap/all";
import { eventState } from "../store/eventStore";

const Home = () => {
  gsap.registerPlugin(ScrollTrigger);
  const { authUser, checkAuth } = authState();
  const { itenaries, itenaryGet, setSelectedItenary } = itenaryState();
  const { getUserEvent, events } = eventState();
  const navigate = useNavigate();
  const [displayedItenaries, setDisplayedItenaries] = useState([]);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    checkAuth();
    if (authUser) {
      itenaryGet();
      getUserEvent();
    }
  }, [authUser]);

  useEffect(() => {
    const updateItenaries = () => {
      const width = window.innerWidth;
      const sortedItenaries = [...itenaries].reverse();
      if (width < 768) {
        setDisplayedItenaries(sortedItenaries.slice(0, 6));
      } else {
        setDisplayedItenaries(sortedItenaries.slice(0, 8));
      }
    };
    updateItenaries();
    window.addEventListener("resize", updateItenaries);
    return () => window.removeEventListener("resize", updateItenaries);
  }, [itenaries]);

  useGSAP(
    () => {
      const tiles = gsap.utils.toArray(".history-tile");
      tiles.forEach((tile) => {
        gsap.to(tile, {
          opacity: 1,
          scale: 1,
          duration: 0.3,
          ease: "power1.inOut",
          scrollTrigger: {
            trigger: tile,
            start: "top 85%",
            end: "top 50%",
            toggleActions: "play none none reverse",
          },
        });
      });
    },
    { dependencies: [displayedItenaries] }
  );

  useEffect(() => {
    if (!showLoader) {
      document.body.style.overflow = "auto";
    } else {
      document.body.style.overflow = "hidden";
    }
  }, [showLoader]);

  const handleSubmit = (item) => {
    setSelectedItenary(item);
    navigate("/itenary");
  };

  const handleVideoLoad = () => {
    setVideoLoaded(true);
    setTimeout(() => setShowLoader(false), 1000);
  };

  const handleBookingSubmit = (event) => {
    navigate("/book", {
      state: {
        eventId: event._id,
        eventName: event.eventName,
        eventImage: event.eventImage,
        avilableSeats: event.avilableSeats,
        price: event.price,
        eventDate: event.eventDate,
        place: event.place,
      },
    });
  };

  const recentEvents = events.slice(0, 5);

  return (
    <div id="main" className="w-[100%] relative h-screen flex flex-col">
      {showLoader && (
        <div className="fixed inset-0 z-50 bg-gradient-to-br from-gray-900 via-black to-gray-800 flex justify-center items-center">
          <div className="relative">
            <div className="border-t-4 border-b-4 border-teal-400 w-16 h-16 rounded-full animate-spin"></div>
            <div className="absolute inset-0 border-l-4 border-r-4 border-teal-600 w-16 h-16 rounded-full animate-spin animation-delay-150"></div>
          </div>
        </div>
      )}
      <NavBar page="home" />
      
      {/* Hero Section */}
      <section
        id="history"
        className="relative w-full min-h-dvh flex flex-col justify-center items-center"
      >
        <div className="absolute inset-0 z-0">
          <video
            src="/videos/bg.mp4"
            autoPlay
            muted
            loop
            playsInline
            className="size-full object-cover"
            onLoadedData={handleVideoLoad}
          ></video>
          <div className="w-full h-full absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60"></div>
        </div>
        <div className="absolute px-10 z-20 flex flex-wrap w-full h-full justify-center items-center pointer-events-none">
          <div className="md:w-1/2 hidden lg:block px-8">
            <h1 className="text-white font-rubik text-[3.5rem] lg:text-[5.7rem] hidden md:block leading-tight mb-6 animate-fade-in">
              Every Stop, Perfectly Planned
            </h1>
            <h3 className="z-30 text-gray-200 text-[1.5em] lg:text-[2rem] hidden md:block font-light">
              Seamless Itineraries, Endless Memories.
            </h3>
            <div className="mt-8 flex gap-4">
              <div className="w-2 h-2 rounded-full bg-teal-400 animate-pulse"></div>
              <div className="w-2 h-2 rounded-full bg-teal-400 animate-pulse animation-delay-200"></div>
              <div className="w-2 h-2 rounded-full bg-teal-400 animate-pulse animation-delay-400"></div>
            </div>
          </div>
          <ItenaryCreation className="z-30 w-1/2 pointer-events-auto sm:bottom-10 md:bottom-40 md:right-40" />
        </div>
      </section>

      {/* Past Creations Section */}
      <section
        id="events"
        className="flex mb-10 flex-col w-full flex-wrap items-start p-8 md:p-20 bg-gradient-to-b from-white to-gray-50"
      >
        <div className="w-full flex items-center justify-between mb-8">
          <div>
            <h1 className="capitalize font-rubik font-bold lg:text-[35.42px] md:text-[3rem] text-[2rem] text-gray-800">
              Your Past Creations
            </h1>
            <div className="h-1 w-24 bg-gradient-to-r from-teal-400 to-teal-600 rounded-full mt-2"></div>
          </div>
          {displayedItenaries.length > 0 && (
            <NavLink
              to={"/my-trips"}
              className="capitalize font-rubik font-normal text-teal-600 hover:text-teal-700 hover:scale-105 transition-all ease-linear duration-300 lg:text-[20px] md:text-[1.5rem] text-[1rem] flex items-center gap-2 group"
            >
              View All
              <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
            </NavLink>
          )}
        </div>

        {displayedItenaries.length === 0 ? (
          <div className="w-full flex flex-col items-center justify-center py-20 px-4">
            <div className="relative mb-8">
              <div className="w-32 h-32 bg-gradient-to-br from-teal-100 to-teal-200 rounded-full flex items-center justify-center">
                <svg
                  className="w-16 h-16 text-teal-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
                  />
                </svg>
              </div>
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full animate-ping opacity-75"></div>
            </div>
            <h2 className="text-2xl font-rubik font-bold text-gray-800 mb-3">
              No Itineraries Yet
            </h2>
            <p className="text-gray-600 text-center max-w-md mb-6 font-rubik">
              Start planning your dream trip! Create your first itinerary and make unforgettable memories.
            </p>
            <button
              onClick={() => document.getElementById('history').scrollIntoView({ behavior: 'smooth' })}
              className="bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white px-8 py-3 rounded-full font-rubik font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            >
              Create Your First Trip
            </button>
          </div>
        ) : (
          <div className="sm:flex sm:flex-wrap md:grid md:grid-cols-2 lg:flex lg:overflow-x-auto scroll-smooth items-center overflow-hidden w-full justify-center gap-8">
            {displayedItenaries.map((item) => (
              <div
                key={item._id}
                onClick={() => handleSubmit(item)}
                className="relative scale-3d history-tile opacity-0 drop-shadow-2xl w-96 h-70 rounded-2xl overflow-hidden cursor-pointer shadow-lg group hover:shadow-2xl transition-all duration-300"
              >
                {item?.plan?.data?.coverImage && (
                  <img
                    src={item.plan.data.coverImage}
                    alt={item.destination}
                    className="w-full h-full object-cover transform transition-transform duration-500 ease-in-out group-hover:scale-110"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent group-hover:from-black/60 transition-colors duration-300 flex items-end justify-start pointer-events-none">
                  <div className="p-6 w-full">
                    <h1 className="text-white text-2xl font-bold mb-2 font-rubik">
                      {item.destination}
                    </h1>
                    <div className="flex items-center gap-2 text-gray-300 text-sm">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                      </svg>
                      <span>{item.days} Days</span>
                    </div>
                  </div>
                </div>
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-semibold text-teal-600">
                  View Details
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Popular Events Section */}
      <section className="min-h-fit flex bg-gradient-to-br from-gray-50 to-white flex-col pb-20">
        <div className="w-full flex items-center justify-between px-8 md:px-20">
          <div>
            <h1 className="text-[35.42px] mt-10 p-6 font-rubik font-bold text-gray-800">
              Popular Events
            </h1>
            <div className="h-1 w-24 bg-gradient-to-r from-teal-400 to-teal-600 rounded-full ml-6"></div>
          </div>
          {recentEvents.length > 0 && (
            <NavLink
              to={"/user-events"}
              className="capitalize mr-10 font-rubik font-normal text-teal-600 hover:text-teal-700 hover:scale-105 transition-all ease-linear duration-300 lg:text-[20px] md:text-[1.5rem] text-[1rem] flex items-center gap-2 group"
            >
              View All
              <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
            </NavLink>
          )}
        </div>

        <div className="p-4 px-8 md:px-20 overflow-scroll scroll-smooth scrollbar-hidden pt-10">
          {recentEvents.length === 0 ? (
            <div className="w-full flex flex-col items-center justify-center py-20 px-4">
              <div className="relative mb-8">
                <div className="w-32 h-32 bg-gradient-to-br from-purple-100 to-pink-200 rounded-full flex items-center justify-center">
                  <svg
                    className="w-16 h-16 text-purple-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-pink-400 rounded-full animate-ping opacity-75"></div>
              </div>
              <h2 className="text-2xl font-rubik font-bold text-gray-800 mb-3">
                No Events Available
              </h2>
              <p className="text-gray-600 text-center max-w-md font-rubik">
                Stay tuned! Exciting events are coming soon. Check back later for amazing experiences.
              </p>
            </div>
          ) : (
            <div className="sm:flex mb-10 lg:flex scroll-smooth w-fit gap-10 justify-center">
              {recentEvents.map((event) => (
                <div
                  key={event._id}
                  className="w-96 mt-10 flex flex-col bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-3 transform hover:-translate-y-2"
                >
                  <div className="h-66 overflow-hidden rounded-2xl relative group">
                    <img
                      src={event.eventImage}
                      alt={event.eventName}
                      className="shadow-xl size-full transition-all duration-500 group-hover:scale-110 rounded-2xl object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  <div className="px-6 mb-2 mt-4">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-8 h-8 bg-gradient-to-br from-teal-400 to-teal-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                        {event.organiserName.charAt(0).toUpperCase()}
                      </div>
                      <h1 className="font-light text-[15px] font-rubik text-gray-600">
                        {event.organiserName}
                      </h1>
                    </div>
                    <h1 className="font-semibold capitalize text-xl font-rubik text-gray-800 mb-2">
                      {event.eventName}
                    </h1>
                  </div>
                  <div className="px-6 mb-3 flex items-center gap-2 text-gray-600">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" />
                    </svg>
                    <h1 className="font-rubik text-sm">
                      <span className="font-semibold">{event.avilableSeats}</span> seats available
                    </h1>
                  </div>
                  <div className="flex w-full items-center px-4 justify-between mt-auto">
                    <div>
                      <p className="text-xs text-gray-500 font-rubik mb-1">Starting from</p>
                      <h1 className="font-bold font-rubik text-2xl text-teal-600">
                        ₹{event.price}
                      </h1>
                    </div>
                    <button
                      onClick={() => handleBookingSubmit(event)}
                      className="bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white px-6 py-3 rounded-xl font-rubik font-semibold shadow-md hover:shadow-lg active:scale-95 transition-all ease-in-out duration-300 cursor-pointer"
                    >
                      Book Now
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;
