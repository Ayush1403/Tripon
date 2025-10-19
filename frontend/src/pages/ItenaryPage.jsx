import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Slider from "react-slick";
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import 'leaflet-routing-machine';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import { PanelBottomClose } from 'lucide-react';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import NavBar from "../components/NavBar";

const ItenaryPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [itenary, setItenary] = useState(null);
  const [openDay, setOpenDay] = useState(0);
  const [isOpen, setIsOpen] = useState(null);
  const [coords, setCoords] = useState([]);

  // Load itinerary from navigation state only
  useEffect(() => {
    if (location.state?.itenary) {
      setItenary(location.state.itenary);
    } else {
      // If no state, redirect back to home or creation page
      navigate("/");
    }
  }, [location.state, navigate]);

  const days = itenary?.data?.days || [];
  const currentDay = openDay !== null ? days[openDay] : days[0];

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    cssEase: "linear",
    pauseOnHover: true,
  };

  // Custom marker icon
  delete L.Icon.Default.prototype._getIconUrl;
  const custom = L.icon({
    iconUrl: "/images/location.svg",
    iconSize: [38, 80],
    iconAnchor: [19, 80],
    popupAnchor: [-3, -76],
  });

  // Get coordinates for places
  const getCoordinates = async (placeName) => {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(placeName)}`
    );
    const data = await res.json();
    if (data.length > 0) {
      return { lat: parseFloat(data[0].lat), lng: parseFloat(data[0].lon) };
    }
    return null;
  };

  // Fetch coordinates when day changes
  useEffect(() => {
    const fetchCord = async () => {
      if (!currentDay?.places) return;

      const result = await Promise.all(
        currentDay.places.map(async (place) => {
          const c = await getCoordinates(place.name);
          if (c) return { ...c, name: place.name };
          return null;
        })
      );
      setCoords(result.filter(Boolean));
    };
    fetchCord();
  }, [currentDay]);

  // Auto zoom map to fit markers
  const AutoZoom = ({ coords }) => {
    const map = useMap();
    useEffect(() => {
      if (coords.length === 0) return;
      const bounds = coords.map((c) => [c.lat, c.lng]);
      map.fitBounds(bounds, { padding: [10, 10] });
    }, [coords, map]);
    return null;
  };

  // Routing between markers
  const Routing = ({ coords }) => {
    const map = useMap();
    useEffect(() => {
      if (!map || coords.length < 2) return;
      const waypoints = coords.map((c) => L.latLng(c.lat, c.lng));

      const routingControl = L.Routing.control({
        waypoints,
        routeWhileDragging: false,
        show: false,
        addWaypoints: false,
        draggableWaypoints: false,
        fitSelectedRoutes: true,
        createMarker: (i, wp) => {
          return L.marker(wp.latLng, { icon: custom }).bindPopup(
            coords[i]?.name || ""
          );
        },
      }).addTo(map);

      return () => map.removeControl(routingControl);
    }, [coords, map]);

    return null;
  };

  if (!itenary)
    return <p className="p-8 text-xl text-gray-600">Loading itinerary...</p>;

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-orange-100 to-amber-100">
        <NavBar page='itinerary'/>
      <div className="w-1/2 flex justify-start items-start text-start">
        <h1 className="w-full text-start mt-20 mx-10 text-5xl">
          {currentDay?.city || "Your Itinerary"}
        </h1>
      </div>

      <div className="w-full flex flex-col justify-center items-center gap-2 min-h-screen">
        {/* Main content: Slider and Map */}
        <div className="flex lg:flex lg:flex-row w-[95%] mt-10 gap-4">
          {/* Image Slider */}
          <div className="lg:w-1/2 w-full z-10 rounded-lg">
            {currentDay?.places && currentDay.places.length > 0 ? (
              <div className="w-full rounded-xl h-fit">
                <Slider {...settings} className="rounded-lg drop-shadow-2xl" key={openDay}>
                  {currentDay.places.map((place, id) => (
                    <div key={id}>
                      <img
                        src={place.image || "/placeholder-image.jpg"}
                        alt={place.name}
                        className="object-cover z-10 rounded-lg w-full h-96"
                        onError={(e) => (e.target.src = "/placeholder-image.jpg")}
                      />
                      <div className="absolute bg-gradient-to-t from-black/60 to-transparent w-full h-30 text-white bottom-0 flex items-center text-2xl px-4 font-rubik font-semibold z-50">
                        <h1 className="text-white">{place.name}</h1>
                      </div>
                    </div>
                  ))}
                </Slider>
              </div>
            ) : (
              <p>No Images Found</p>
            )}
          </div>

          {/* Map */}
          <div className="lg:w-1/2 w-full h-fit mb-10">
            <MapContainer
              center={coords.length > 0 ? [coords[0].lat, coords[0].lng] : [22, 77]}
              zoom={5}
              dragging={false}
              scrollWheelZoom={false}
              className="drop-shadow-2xl"
              style={{
                height: "384px",
                width: "100%",
                borderRadius: "8px",
                borderColor: "#000",
                borderSize: "2px",
              }}
            >
              <TileLayer
                url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/">OSM</a> contributors &copy; <a href="https://carto.com/">CARTO</a>'
              />
              {coords.map((c, id) => (
                <Marker riseOnHover key={id} position={[c.lat, c.lng]} icon={custom}>
                  <Popup>{c.name}</Popup>
                </Marker>
              ))}
              <AutoZoom coords={coords} />
              <Routing coords={coords} />
            </MapContainer>
          </div>
        </div>

        {/* Day Accordion */}
        {days.map((day, id) => (
          <div
            key={day.day || id}
            className="w-[95%] flex h-auto items-start justify-between p-2 rounded-lg bg-amber-50 gap-4 flex-col"
            onClick={() => setIsOpen(isOpen === id ? null : id)}
          >
            <div
              onClick={() => setOpenDay(id)}
              className="flex flex-col gap-y-3 w-full transition-all ease-in duration-300 cursor-pointer"
            >
              <div className="flex justify-between items-center h-full mt-3 p-2">
                <h1 className="font-bold font-rubik">Day {id + 1}</h1>
                <PanelBottomClose
                  className={`right-25 ${
                    isOpen === id ? "transition-transform ease-in rotate-180" : ""
                  }`}
                />
              </div>
              <div
                className={`grid font-rubik group transition-all grid-cols-1 w-full gap-2 duration-300 ease-in-out overflow-hidden ${
                  isOpen === id ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                {day.places && day.places.length > 0 ? (
                  day.places.map((place, idx) => (
                    <div
                      key={idx}
                      className="flex hover:bg-gray-400/10 w-full ease-linear transition-all rounded-sm p-4 bg-gray-400/40 flex-col"
                    >
                      <h1 className="font-semibold">{place.name}</h1>
                      <p className="font-light">{place.description}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500">No places for this day</p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ItenaryPage;
