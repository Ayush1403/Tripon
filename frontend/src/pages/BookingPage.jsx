import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { authState } from "../store/authStore";
import { bookingState } from "../store/bookingStore";
import NavBar from "../components/NavBar";
import { Currency } from "lucide-react";

const BookingPage = () => {
  const location = useLocation();
  const { authUser } = authState();
  const [seatsneeded, setseatsneeded] = useState(1)
  const navigate = useNavigate();
  const [formData, setformData] = useState(
    {
      seatsNeeded: 1,
      
      attendeeDetails:{
        name: "",
        Mobile: ""
      }
    }
  )
  const [showModal, setShowModal] = useState(false);

  const { isLoading, order, error, createBooking, verifyBooking } =
    bookingState();
  const { eventId, eventName, eventImage, price, avilableSeats , eventDate , place } =
    location.state;
    const string = eventDate;
    const splitted = string.split('T')[0]
  

    const totalPrice = formData.seatsNeeded * price;


    const handleChange = (e) => {
      const {name,value} = e.target;
      const cleanValue = name === "Mobile" ? value.replace(/\D/g, "") : value;


      if(name === "Mobile" || name === "name"){
         setformData({
        ...formData,
          
          attendeeDetails:{
            ...formData.attendeeDetails,
            [name]: cleanValue,
          }
        
      })
      }else{
          const cleanValue = Number(value);
  if (cleanValue > avilableSeats) {
    setShowModal(true);
  } else {
    setShowModal(false);
  }
         setformData({

        ...formData,
          seatsNeeded:cleanValue,
      })
      }
    }


  

    const handleSubmit = async(e) => {
      e.preventDefault();

      const bookingData = {
        userId: authUser._id,
        eventId,
        seatsNeeded: formData.seatsNeeded,
        attendeeDetails: formData.attendeeDetails
      }

      const orderData =await createBooking(bookingData)

        const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: orderData.amount,
      currency: orderData.currency,
      order_id: orderData.orderId,
      name: eventName,
      description: `${formData.seatsNeeded} seat(s)`,
      handler: async function(response){
        const result =await verifyBooking({
           userId: authUser._id,
            eventId,
            seatsNeeded: formData.seatsNeeded,
            attendeeDetails: formData.attendeeDetails,
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature
        })

        if(result.success){
          navigate("/booksuccess",{state:{
            booking:result.booking
          }})
        }
        else(
          alert("Booking Unsucessfull")
        )
      }
    }

    const rzp = new window.Razorpay(options);
    rzp.open();
    }
  return (
    <section className="min-w-full h-screen flex justify-center items-center bg-gray-100">
      <NavBar page={"organise"} />
      <div className="w-[3/4] bg-white drop-shadow-2xl  flex min-h-[70%]">
        <div className="w-1/2 hidden lg:block relative">
          <img src={eventImage} alt="" className="size-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent z-20"></div>
          <div className='font-rubik w-full p-4 absolute z-30 bottom-0 '>
            <h1 className="text-[2rem] text-white font-semibold">{eventName}</h1>
            <div className="flex w-full justify-between"><h3 className="text-[1.5rem] text-white font-normal">Avilable Seats:<span className="font-semibold">{avilableSeats}</span></h3>
            <h6 className="text-[1.5rem] text-white font-normal">{splitted}</h6></div>
          </div>
        </div>
        <div className="flex-col w-full lg:w-1/2 gap-4 px-4 py-10 mt-4">
          <h1 className="text-3xl md:text-[3rem] mb-4 font-rubik font-semibold">Book Your Tickets</h1>
          
            <div className="w-full lg:hidden h-[150px] p-2 rounded-2xl shadow-2xl flex gap-4  overflow-hidden">
             <div className="w-1/4 h-full">
              <img src={eventImage} alt={eventName} className="size-full rounded-lg object-cover" />
             </div>
             <div> 
             <div className="flex flex-col w-full justify-start items-start h-full">
               <h1 className="font-rubik font-semibold text-[1.5rem]">{eventName}</h1>
                <h1 className="font-rubik font-normal text-[1rem]">{place}</h1>
             <div className="font-rubik flex justify-between w-full font-normal mt-10 text-[1rem] gap-6">
              <h1>Avilable Seats: <span className="font-semibold">{avilableSeats}</span></h1>
              <h1>Total Price: <span className="font-semibold">{totalPrice}</span></h1>
</div>

             </div>
             </div>
            </div>
          <form onSubmit={handleSubmit} className="p-4 w-full space-y-4 h-fit">
            <div className="">
              <label htmlFor="" className="block text-lg font-medium mb-2">
                Name
              </label>
              <input type="text"
              name="name"
              value={formData.attendeeDetails.name}
              onChange={handleChange}
              className="outline-none border-2 w-full p-2 rounded-lg" 
              placeholder="Name"
              />
            </div>
             <div className="">
              <label htmlFor="" className="block text-lg font-medium mb-2">
                Mobile No.
              </label>
              <input type="tel"
              name="Mobile"
              value={formData.attendeeDetails.Mobile}
              onChange={handleChange}
              className="outline-none border-2 w-full p-2 rounded-lg" 
              placeholder="Mobile no."
              maxLength={10}
              inputMode="numeric"
              pattern="[0-9]*"
              />
            </div>
              <div className="">
              <label htmlFor="" className="block text-lg font-medium mb-2">
                Seats Needed
              </label>
              <input type="number"
              name="seatsNeeded"
              value={formData.seatsNeeded}
              onChange={handleChange}
              className="outline-none border-2 w-full p-2 rounded-lg" 
              placeholder="Seats Needed"

              />
            </div>

            <button className="w-full bg-black text-white p-2 font-rubik text-lg font-medium rounded-lg">
              {
                isLoading ? (<h1>
                  Loading....
                </h1>) : (<h1>
                  Proceed to payment : {totalPrice}
                </h1>)
              }
            </button>
          </form>
         </div>
      </div>
      {showModal && (
  <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">
    <div className="bg-white p-6 rounded-2xl shadow-xl text-center w-[90%] max-w-md">
      <h1 className="text-2xl font-semibold mb-3 text-red-600">
        Seats Not Available
      </h1>
      <p className="text-gray-700 font-medium">
        You are trying to book more than {avilableSeats} seats.
      </p>
      <button
        onClick={() => setShowModal(false)}
        className="mt-6 bg-black text-white px-6 py-2 rounded-lg font-medium"
      >
        OK
      </button>
    </div>
  </div>
)}
    </section>
    
  );
};

export default BookingPage;
