import React, { useState, useRef, useEffect } from "react";
import { authState } from "../store/authStore";
import { useNavigate, useLocation } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import { X, MenuIcon } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useGSAP } from "@gsap/react";

// Page-specific configurations
const pageConfigs = {
  home: {
    showLogo: true,
    logoText: "Tripon",
    bgColor: "transparent",
    scrollBg: "rgba(0,0,0,0.8)",
    textColor: "text-white",
     scrollColor: "text-white",
     menuItems: [
       { label: "Home", path: "/" },
      { label: "My Trips", path: "/my-trips" },
     
      { label: "My Bookings", path: "/user-book" },
    ],
    transparent: true,
  },
  itinerary: {
    showLogo: true,
    logoText: "Tripon",
    bgColor: "rgba(255,247,237,0.9)",
    scrollBg: "rgba(255,247,237,1)",
    textColor: "text-gray-800",
     scrollColor: "text-white",
    menuItems: [
       { label: "Home", path: "/" },
      { label: "My Trips", path: "/my-trips" },
     
      { label: "My Bookings", path: "/user-book" },
    ],
    transparent: false,
  },
  profile: {
    showLogo: true,
    logoText: "Tripon",
    bgColor: "white",
    scrollBg: "white",
    textColor: "text-gray-800",
     scrollColor: "text-white",
    menuItems:  [
        { label: "Home", path: "/" },
      { label: "My Trips", path: "/my-trips" },
    
      { label: "My Bookings", path: "/user-book" },
    ],
    transparent: false,
  },
  explore: {
    showLogo: true,
    logoText: "Tripon",
    bgColor: "transparent",
    scrollBg: "rgba(0,0,0,0.9)",
    textColor: "text-black",
    scrollColor: "#fff",
    menuItems: [
       { label: "Home", path: "/" },
      { label: "My Trips", path: "/my-trips" },
     
      { label: "My Bookings", path: "/user-book" },
    ],
    transparent: true,
  },
  organise: {
    showLogo: true,
    logoText: "Tripon",
    bgColor: "transparent",
    scrollBg: "rgba(0,0,0,0.9)",
    textColor: "text-black",
    scrollColor: "#fff",
    menuItems:  [
      { label: "Home", path: "/" },
      { label: "My Events", path: "/all-events" },
      { label: "Event Bookings", path: "/eventcreate" },
    ],
    transparent: true,
  },
};

const NavBar = ({ page, customConfig = {} }) => {
  const newRef = useRef(null);
  gsap.registerPlugin(ScrollTrigger);
  const [isOpen, setisOpen] = useState(false);
  const { authUser, logout } = authState();
  const navigate = useNavigate();
  const location = useLocation();

  // ✅ Get config or return nothing
  const baseConfig = pageConfigs[page] || null;
  const config = baseConfig ? { ...baseConfig, ...customConfig } : null;

  if (!config) return null; // 👈 No default navbar

  const handleLogout = async () => {
    logout();
  };
const handleMenuClick = (item) => {
  if (item.path) {
    navigate(item.path); // route navigation
  } else if (item.sectionId) {
    const section = document.getElementById(item.sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" }); // smooth scroll
    }
  }
  setisOpen(false); // close mobile menu if open
};

  // Scroll animation with page-specific colors
  useGSAP(() => {
    if (config.transparent) {
      gsap.to(newRef.current, {
        backgroundColor: config.scrollBg,
        color: config.scrollColor,
        duration: 1,
        ease: "linear",
        scrollTrigger: {
          trigger: newRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }
  }, []);

  useEffect(() => {
    if (isOpen) {
      gsap.fromTo(
        "#full",
        { opacity: 0, y: -50 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
      );
    }
  }, [isOpen]);

  const isMobile = useMediaQuery({ query: "(max-width: 999px)" });

  // Button styles
  const getPrimaryBtnClass = () => {
    if (config.textColor === "text-white") {
      return "px-3 py-1 bg-white rounded hover:bg-transparent hover:text-white text-black hover:border-2 border-white transition";
    }
    return "px-3 py-1 bg-orange-500 text-white rounded hover:bg-orange-600 transition";
  };

  const getSecondaryBtnClass = () => {
    if (config.textColor === "text-white") {
      return "px-3 py-1 hover:bg-white rounded bg-transparent hover:text-black border-2 border-white transition";
    }
    return "px-3 py-1 bg-transparent text-orange-500 rounded hover:bg-orange-50 border-2 border-orange-500 transition";
  };

  return !isMobile ? (
    <div
      id="nav"
      ref={newRef}
      className={`flex px-20 font-rubik w-full h-fit fixed top-0 z-50 justify-between items-center p-4 ${config.textColor}`}
      style={{ backgroundColor: config.bgColor }}
    >
      {config.showLogo && (
        <h1
          className={`text-xl font-rubik font-bold z-50 cursor-pointer ${isOpen ? "text-white" : ""}`}
          onClick={() => navigate("/")}
        >
          {config.logoText}
        </h1>
      )}

      {authUser == null ? (
        <div className="flex items-center gap-4">
          <button onClick={() => navigate("/login")} className={getPrimaryBtnClass()}>
            LogIn
          </button>
          <button onClick={() => navigate("/signup")} className={getSecondaryBtnClass()}>
            SignIn
          </button>
        </div>
      ) : (
        <>
          <ul className="flex uppercase justify-around font-semibold gap-12">
            {config.menuItems.map((item, idx) => (
              <li
                key={idx}
                className="hover:border-b-2 border-current ease-linear duration-200 cursor-pointer"
                onClick={()=>(handleMenuClick(item))}
              >
                {item.label}
              </li>
            ))}
          </ul>
          <div>
            <span className="font-semibold mr-6">Hi, {authUser.fullName}</span>
            <button onClick={handleLogout} className={getPrimaryBtnClass()}>
              Logout
            </button>
          </div>
        </>
      )}
    </div>
  ) : (
    <div
      id="nav"
      ref={newRef}
      className={`flex font-rubik w-full h-fit fixed top-0 z-50 justify-between items-center p-4 ${config.textColor}`}
      style={{ backgroundColor: config.bgColor }}
    >
      {config.showLogo && (
        <h1 className="text-xl font-bold cursor-pointer" onClick={() => navigate("/")}>
          {config.logoText}
        </h1>
      )}

      {authUser == null ? (
        <div className="flex items-center gap-4">
          <button onClick={() => navigate("/login")} className={getPrimaryBtnClass()}>
            LogIn
          </button>
          <button onClick={() => navigate("/signup")} className={getSecondaryBtnClass()}>
            SignIn
          </button>
        </div>
      ) : (
        <>
          <div className="cursor-pointer z-50" onClick={() => setisOpen(!isOpen)}>
            {isOpen ? <X className="text-white "/> : <MenuIcon size={28} />}
          </div>

          {isOpen && (
            <nav
              id="full"
              className="fixed top-0 left-0 w-full h-full bg-black z-40 flex flex-col justify-center items-center gap-6"
            >
              <ul className="flex uppercase flex-col gap-6 text-center">
                {config.menuItems.map((item, idx) => (
                  <li
                    key={idx}
                    className="text-white text-xl hover:border-b-2 transition duration-200 cursor-pointer"
                    onClick={() => handleMenuClick(item)}
                  >
                    {item.label}
                  </li>
                ))}
              </ul>

              <span className="text-white text-lg font-semibold mt-4">
                Hi, {authUser.fullName}
              </span>

              <button
                onClick={handleLogout}
                className="px-4 py-2 mt-4 bg-white text-black rounded hover:bg-transparent hover:text-white border-2 border-white transition"
              >
                Logout
              </button>
            </nav>
          )}
        </>
      )}
    </div>
  );
};

export default NavBar;
