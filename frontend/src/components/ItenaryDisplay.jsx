import React, { useEffect, useState } from "react";
import { authState } from "../store/authStore";
import { itenaryState } from "../store/itenaryStore";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import ScrollTrigger from "gsap/all";

const ItenaryDisplay = () => {
  gsap.registerPlugin(ScrollTrigger);
  const { authUser, checkAuth } = authState();
  const { itenaries, itenaryGet, setSelectedItenary } = itenaryState();
  const navigate = useNavigate();
  const [displayedItenaries, setDisplayedItenaries] = useState([]);
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    checkAuth();
    if (authUser) {
      itenaryGet();
    }
  }, [authUser]);

  useEffect(() => {
    if (itenaries.length > 0) {
      const sortedItenaries = [...itenaries].reverse();
      const width = window.innerWidth;
      const sliced = width < 768 ? sortedItenaries.slice(0, 6) : sortedItenaries.slice(0, 8);
      setDisplayedItenaries(sliced);
      setTimeout(() => setShowLoader(false), 200);
    }
  }, [itenaries]);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      const sortedItenaries = [...itenaries].reverse();
      const sliced = width < 768 ? sortedItenaries.slice(0, 6) : sortedItenaries.slice(0, 8);
      setDisplayedItenaries(sliced);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
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

  const handleSubmit = (item) => {
    setSelectedItenary(item);
    navigate("/itenary");
  };

  useEffect(() => {
    if (showLoader) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [showLoader]);

  if (showLoader) {
    return (
      <div className="fixed inset-0 z-50 bg-black flex justify-center items-center">
        <div className="border-t-4 border-b-4 border-white w-16 h-16 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <section className="flex mb-10 flex-col w-full flex-wrap items-start p-20">
      <h1 className="capitalize font-rubik mb-10 font-bold lg:text-[35.42px] md:text-[4rem] text-[2rem]">
        Your past Creation
      </h1>
      <div className="sm:flex sm:flex-wrap md:grid md:grid-cols-2 lg:flex lg:overflow-x-auto scroll-smooth items-center w-full justify-center gap-8">
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
  );
};

export default ItenaryDisplay;
