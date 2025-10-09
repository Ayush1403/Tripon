import React, { useEffect, useState } from 'react'
import { itenaryState } from '../store/itenaryStore'
import {MapContainer ,TileLayer, Marker , Popup , Polyline , useMap} from 'react-leaflet'
import 'leaflet/dist/leaflet.css';
import L, { control, popup } from 'leaflet'
import NavBar from '../components/NavBar.jsx'
import Sliders from 'react-slick'
import 'leaflet-routing-machine'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {PanelBottom, PanelBottomClose} from 'lucide-react'
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css'
import { eventState } from '../store/eventStore.js';

const ItenaryDetail = () => {
  const {selectedItenary} = itenaryState();
  const[currentDay , setCurrentDay]=useState(0)
  const [isOpen , setIsOpen] = useState(null);
  const [coords, setCoords] = useState([])
  
  const {getDestinationEvent,isEventLoading,eventsDestination} = eventState();
  const settings ={
      infinite : true,
      speed: 500,
      slidesToShow: 1,
      slideToScroll: 1,
      autoplay: true,
      autoplaySpeed: 2000,
      cssEase: "linear",
      pauseOnHover: true
  }

  const days = selectedItenary.plan.data.days
  const showDay = currentDay !== null ? days[currentDay] : days[0]


    const getCoordinates = async(placeName) => {
    const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(placeName)}`)
    const data = await res.json();
      if(data.length > 0){
        return { lat: parseFloat(data[0].lat) , lng: parseFloat(data[0].lon)}
      }
      return null;

  }

delete L.Icon.Default.prototype.getIconUrl;
const custom =L.icon({
iconUrl: "/images/location.svg",
iconSize: [38, 80],
iconAnchor: [19,80],
popupAnchor: [-3 , -76],
})
  useEffect(() => {
    if (selectedItenary?.destination) {
      getDestinationEvent(selectedItenary.destination);
    }
  }, [selectedItenary?.destination]);

  console.log('Events for destination:', eventsDestination);


  useEffect(()=>{
   const fetchCord = async()=> {
     
    if(!showDay?.places) return null;

    const result = await Promise.all(
      showDay.places.map(async place=>{
        const c = await getCoordinates(place.name);
        if(c) return { ...c ,name: place.name}
        return null;
      })

     
    );
     setCoords(result.filter(Boolean))
   }
   fetchCord();
  },[showDay])


  const AutoZoom = ({coords}) => {
    const map = useMap();
    useEffect(()=>{
      if(coords.length===0) return;
      const bounds = coords.map(c => [c.lat,c.lng]);
      map.fitBounds(bounds, {padding: [10,10]});

    },[coords , map])
    return null;
  }

  const Routing = ({coords})=>{
  const map = useMap();
  useEffect(()=>{
    if(!map || coords.length < 2) return;
    const waypoints = coords.map(c => L.latLng(c.lat, c.lng));

   const routingControl = L.Routing.control({
      waypoints,
      routeWhileDragging: false,
      show: false,
      addWaypoints: false,
      draggableWaypoints: false,
      fitSelectedRoutes: true,
      createMarker: (i, wp) => {
        return L.marker(wp.latLng, { icon: custom }).bindPopup(coords[i]?.name || "");
      },
  
  }).addTo(map);

  return () => map.removeControl(routingControl);
},[coords,map])

return null;
  }
  return (
    <div className='w-full min-h-screen bg-gradient-to-br from-orange-100 to-amber-100'>
      <NavBar page='itinerary'/>
      <div key={showDay._id} className='w-1/2 flex justify-start items-start text-start'>
     <h1 className='w-full text-start mt-20 mx-10 text-5xl'>{showDay.city}</h1>
     </div> 
    <div className='w-full flex flex-col justify-center items-center gap-2 min-h-screen'>
    
     
     <div className='flex lg:flex lg:flex-row  w-[95%] mt-10 gap-4'>
       <div key={showDay._id} className='lg:w-1/2 w-full  z-10 rounded-lg'>
       
        
        {showDay?.places && showDay.places.length > 0 ? (
             <div className='w-full rounded-xl h-fit'>
           <Sliders {...settings} className='rounded-lg drop-shadow-2xl' key={currentDay}>
      
          
         {showDay?.places.map((items,id)=>(
          <div key={id}>
            <img src={items.image} alt="" className='object-cover  z-10 rounded-lg w-full h-96 ' />
           <div className='absolute bg-gradient-to-t from-black/60 to-transparent 
                w-full h-30 text-white bottom-0 flex items-center text-2xl px-4 font-rubik font-semibold z-50'>
            <h1 className='text-white '>
              {items.name}
            </h1>
           </div>
            </div>
        ))}
    
            </Sliders>
         </div>
        ):(<p>No Images Found</p>) }
        
        </div>
        <div className='lg:w-1/2 w-full h-fit mb-10'>
          <MapContainer center={coords.length > 0 ? [coords[0].lat,coords[0].lng]: [22,77]} zoom={5} dragging={false} scrollWheelZoom={false}   className="drop-shadow-2xl" style={{height: '384px', width: '100%' , borderRadius: '8px' , borderColor: '#000' , borderSize:"2px"}}>
           <TileLayer
  url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
  attribution='&copy; <a href="https://www.openstreetmap.org/">OSM</a> contributors &copy; <a href="https://carto.com/">CARTO</a>'
/>
            {coords.map((c,id)=>(
              <Marker riseOnHover key={id} position={[c.lat,c.lng]} icon={custom} >
               <Popup >{c.name}</Popup>
                </Marker>
            ))}
              <AutoZoom coords={coords} />
              <Routing coords={coords} />
            </MapContainer> 
        </div>
     </div>   
        

   {days.map((day,id)=>(
   <div className='w-[95%] flex h-auto items-start justify-between p-2 rounded-lg bg-amber-50 gap-4 flex-col'
   onClick={()=>setIsOpen(isOpen === id ? null : id)}>
     <div key={day._id}
    onClick={()=>setCurrentDay(id)}
    className='flex flex-col gap-y-3  w-full transition-all  ease-in duration-300 cursor-pointer'
    >
       <div className='flex justify-between items-center h-full mt-3 p-2'>
         <h1 className='font-bold font-rubik'>Days {id + 1}</h1>
        <PanelBottomClose className={`  right-25 ${isOpen === id ? "transition-transform ease-in rotate-180" : ""}`}/> 
       
       </div>
            <div className={`grid font-rubik group transition-all grid-cols-1 w-full gap-2 duration-300 ease-in-out overflow-hidden ${isOpen===id ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'}`}>
          {day.places.map((index,id)=>(
            <div key={index._id} className='flex hover:bg-gray-400/10 w-full ease-linear transition-all rounded-sm p-4 bg-gray-400/40 flex-col'>
            <h1 className='font-semibold'>{index.name}</h1>
            <p className='font-light'>{index.description}</p>
            </div>
          ))}
          </div>
       
    </div>
    </div>
   ))}

    </div>
    </div>
  )
}

export default ItenaryDetail