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
 
    navigate("/book", {state : {
      eventId : event._id,
      eventName: event.eventName,
      eventImage: event.eventImage,
      avilableSeats: event.avilableSeats,
      price: event.price,
      eventDate: event.eventDate,
      place: event.place

    }})
  }

  const recentEvents = events.slice(0,5)
    

  return (
    <div id="main" className="w-[100%] relative h-screen flex flex-col">
      {showLoader && (
        <div className="fixed inset-0 z-50 bg-black flex justify-center items-center">
          <div className="border-t-4 border-b-4 border-white w-16 h-16 rounded-full animate-spin"></div>
        </div>
      )}
      <NavBar page="home"/>
      <section id="history" className="relative w-full min-h-dvh flex flex-col justify-center items-center">
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
          <div className="w-full h-full absolute inset-0 bg-black/40"></div>
        </div>
        <div className="absolute px-10 z-20 flex flex-wrap w-full h-full justify-center items-center pointer-events-none">
          <div className="md:w-1/2 hidden lg:block px-8">
            <h1 className="text-white font-rubik text-[3.5rem] lg:text-[5.7rem] hidden md:block">
              Every Stop, Perfectly Planned
            </h1>
            <h3 className="z-30 text-gray-300 text-[1.5em] lg:text-[2rem] hidden md:block">
              Seamless Itineraries, Endless Memories.
            </h3>
          </div>
          <ItenaryCreation className="z-30 w-1/2 pointer-events-auto sm:bottom-10 md:bottom-40 md:right-40" />
        </div>
      </section>
      <section id="events" className="flex mb-10 flex-col w-full flex-wrap items-start p-20">
        <div className="w-full flex items-center justify-between">
          <h1 className="capitalize font-rubik mb-10 font-bold lg:text-[35.42px] md:text-[3rem] text-[2rem]">
          Your past Creation
        </h1>
        <NavLink to={"/my-trips"} className="capitalize font-rubik mb-10 font-normal hover:border-b-2 transition-all ease-linear duration-300 lg:text-[35.42px] md:text-[1.5rem] text-[1rem]">
          View All
        </NavLink>
        </div>
        <div className="sm:flex sm:flex-wrap md:grid md:grid-cols-2 lg:flex lg:overflow-x-auto scroll-smooth items-center overflow-hidden w-full justify-center gap-8">
          {displayedItenaries.map((item) => (
            <div
              key={item._id}
              onClick={() => handleSubmit(item)}
              className="relative scale-3d history-tile opacity-0 drop-shadow-2xl shadow-amber-100 w-96 h-70 rounded-lg overflow-hidden cursor-pointer shadow-lg group"
            >
              {item?.plan?.data?.coverImage && (
                <img
                  src={item.plan.data.coverImage}
                  alt={item.destination}
                  className="w-full h-full object-cover transform transition-transform duration-500 ease-in-out group-hover:scale-110"
                />
              )}
              <div className="absolute inset-0 bg-black/50 group-hover:bg-black/10 transition-colors duration-200 flex items-end justify-start pointer-events-none">
                <h1 className="text-white text-2xl font-bold mb-4 ml-2 text-center px-2">
                  {item.destination}
                </h1>
              </div>
            </div>
          ))}
        </div>
      </section>
      <section className="h-fit flex bg-[#F7F9FA]   flex-col">
        <div className="w-full flex items-center justify-between">
          <h1 className="text-[35.42px] mt-10 mx-10 p-6 font-rubik font-semibold">
          Popular events 
        </h1>
        
        <NavLink to={"/user-events"} className="capitalize mr-10 font-rubik mb-10 font-normal hover:border-b-2 transition-all ease-linear duration-300 lg:text-[35.42px] md:text-[1.5rem] text-[1rem]">
          View All
        </NavLink>
        </div>
        <div className="p-4 px-20 overflow-scroll scroll-smooth scrollbar-hidden  pt-10">
          <div className="sm:flex   mb-10 lg:flex  scroll-smooth w-fit gap-10 justify-center">
            {recentEvents.map((event) => (
              <div
                key={event._id}
                className="w-96 mt-10 flex flex-col bg-white rounded-2xl shadow-gray-300/40 shadow-blur shadow-xl p-2"
              >
                <div className="h-66 overflow-hidden rounded-2xl">
                  <img
                    src={event.eventImage}
                    alt=""
                    className="shadow-xl size-full transition-all linear duration-200 hover:scale-110 rounded-2xl object-cover"
                  />
                </div>
                <div className="px-6 mb-2">
                  <h1 className="font-light mt-4 text-[15px] font-rubik">
                    {event.organiserName}
                  </h1>
                  <h1 className="font-semibold capitalize text-xl font-rubik">
                    {event.eventName}
                  </h1>
                </div>
                <h1 className="mb-2 ml-6 font-rubik">
                  Available Seat: {event.avilableSeats}
                </h1>
                <div className="flex w-full items-center px-4 justify-between">
                  <h1 className="mb-2 ml-2 font-semibold font-rubik text-2xl">
                    Rs. {event.price}
                  </h1>
                   <h1 className="mb-2 hidden ml-2 font-semibold font-rubik text-2xl">
                     {event.place}
                  </h1>
                  <button
                    onClick={()=>handleBookingSubmit(event)}
                    className="border-[#2C7A7B] border-2 active:scale-95 transition-all ease-in-out duration-300 cursor-pointer hover:bg-[rgba(44,122,123,0.1)] text-[#2C7A7B] w-fit p-2 mb-2 ml-2 font-rubik rounded-xl"
                  >
                    Book Tickets
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
