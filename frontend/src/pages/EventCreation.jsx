import React, { useState } from 'react'
import NavBar from '../components/NavBar'
import { eventState } from '../store/eventStore'
import { useNavigate } from 'react-router-dom';

const EventCreation = () => {
    const {isCreating,createUserEvent}=eventState();
     const [imagePreview, setImagePreview] = useState("");
    const [formData, setformData] = useState({
        eventName: "",
        organiserName:"",
        eventImage:"",
        eventDate: "",
        place: "",
        avilableSeats: 10,
        price: 0,
    })
    const navigate = useNavigate();

    const handleChange = (e) => {
        const {name , value } = e.target;
      
            setformData({
            ...formData,
            [name]: value,
        })
        
    }

     const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        // Store the actual file
        setformData((prev) => ({
            ...prev,
            eventImage: file,
        }));

        // Create preview separately
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            setImagePreview(reader.result);
        };
    };


    const handleSubmit = async(e) => {
        e.preventDefault();

        const success =await createUserEvent(formData);
        if(success){
            
            navigate("/")
        }else{
            alert("Event Creation failed")
        }
    }
  return (
    <section className='w-full pt-16 bg-gray-200 min-h-dvh '>
        <NavBar  page="organise"/>
        <div className='px-10 flex flex-col gap-8'>
            <h1 className='text-black  font-bold font-poppins text-[2.5rem] '>Create Your Event</h1>
            <form onSubmit={handleSubmit} className='w-full flex flex-col space-y-6 items-center'>
                <div className='flex flex-col'>
                    <label htmlFor="image" className='rounded-xl w-96 h-80 overflow-hidden border-2'>
                        <img src={imagePreview||"/images/images.webp"} alt="" className='size-full object-cover' />
                    </label>
                    <input type="file" id='image' onChange={handleImageUpload} accept="image/*" name='eventImage' className='hidden'/>
                    <h1 className='w-full text-center font-rubik text-xl font-medium '>Add Your Image Here</h1>
                </div>
                 <div className='flex w-full lg:w-1/2 flex-col'>
                    <label className='w-full  mb-2 font-rubik text-xl font-medium ' >
                       <h1>Organiser Name</h1>
                    </label>
                    <input type="text" onChange={handleChange} value={formData.organiserName} placeholder='John Doe' name='organiserName' className='w-full  p-2 rounded-lg capitalize outline-none bg-white drop-shadow-sm' />
                   
                </div>
                <div className='flex w-full lg:w-1/2 flex-col'>
                    <label className='w-full  mb-2 font-rubik text-xl font-medium ' >
                       <h1>Event Name</h1>
                    </label>
                    <input type="text" onChange={handleChange} 
                    value={formData.eventName} 
                    placeholder='conferance' 
                    name='eventName' 
                    className='w-full  p-2 rounded-lg 
                    capitalize outline-none 
                    bg-white drop-shadow-sm' />
                   
                </div>
                  <div className='flex w-full lg:w-1/2 flex-col'>
                    <label className='w-full  mb-2 font-rubik text-xl font-medium ' >
                       <h1>Place</h1>
                    </label>
                    <input type="text"  onChange={handleChange} 
                    value={formData.place} 
                    placeholder='Mumbai' 
                    name='place' 
                    className='w-full  p-2 rounded-lg 
                    capitalize outline-none 
                    bg-white drop-shadow-sm' />
                   
                </div>
                 <div className='flex w-full lg:w-1/2 flex-col'>
                    <label className='w-full  mb-2 font-rubik text-xl font-medium ' >
                       <h1>Price</h1>
                    </label>
                    <input type="number"  onChange={handleChange} 
                    value={formData.price} 
                    name='price' 
                    className='w-full  p-2 rounded-lg 
                    capitalize outline-none 
                    bg-white drop-shadow-sm' />
                   
                </div>
                   <div className='flex w-full lg:w-1/2 flex-col'>
                    <label className='w-full  mb-2 font-rubik text-xl font-medium ' >
                       <h1>Event Date</h1>
                    </label>
                    <input type="date"  onChange={handleChange} 
                    value={formData.eventDate} 
                    name='eventDate' 
                    className='w-full  p-2 rounded-lg 
                    capitalize outline-none 
                    bg-white drop-shadow-sm' />
                   
                </div>
                  <div className='flex w-full lg:w-1/2 flex-col'>
                    <label className='w-full  mb-2 font-rubik text-xl font-medium ' >
                       <h1>Avilable Seats</h1>
                    </label>
                    <input type="number"  onChange={handleChange} 
                    value={formData.avilableSeats} 
                    name='avilableSeats' 
                    className='w-full  p-2 rounded-lg 
                    capitalize outline-none 
                    bg-white drop-shadow-sm' />
                </div>

                <button className='w-fit p-3 bg-black text-white px-10 font-rubit text-lg rounded-lg mb-4'>
                    {isCreating ? "isCreating..." : "Create Event"}
                </button>
            </form>
        </div>
    </section>
  )
}

export default EventCreation