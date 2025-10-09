import React from 'react'

const EventCreation = () => {
  return (
    <div
      className={` w-fit h-fit font-rubik p-10 text-white bg-black/40 shadow-2xl backdrop-blur-sm drop-shadow-2xl rounded-4xl`}
    >
   
        <>
          <h1 className="uppercase font-light text-[3.2rem] md:text-[5rem] text-start ml-4 mb-6">
            Plan <br /> With Us
          </h1>
          <form  className="flex flex-col gap-4 px-2">
            <input
              type="text"
              name="destination"
              placeholder="Destination"
              className="capitalize outline-none bg-black/40 placeholder:text-gray-400 p-4 rounded-lg"
              required
            />
            <div className="flex gap-2">
              <input
                type="date"
                name="startDate"
                className="outline-none bg-black/40 text-gray-400 p-4 uppercase rounded-lg"
                required
              />
              <input
                type="date"
                name="endDate"
                className="outline-none uppercase bg-black/40 text-gray-400 p-4 rounded-lg"
                required
              />
            </div>
            <input
              type="text"
              name="budget"
              placeholder="Budget"
              className="capitalize date outline-none bg-black/40 placeholder:text-gray-400 p-4 rounded-lg"
              required
            />

            <button
              type="submit"
              className="bg-white text-black font-semibold p-2 rounded"
            >
              Create Itinerary
            </button>

          </form>
        </>
    
    </div>
  )
}

export default EventCreation