import React, { useState } from "react";
import { itenaryState } from "../store/itenaryStore";
import { useNavigate } from "react-router-dom";
import Lottie from "lottie-react";
import loadingAnimation from "../assets/loading.json";

const ItenaryCreation = ({ className }) => {
  const { itenaryCreate, isItenaryCreating, error, setSelectedItenary } =
    itenaryState();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    destination: "",
    startDate: "",
    endDate: "",
    budget: "",
    budgetCategory: "",
  });

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const dateObj = new Date(dateString);
    const month = String(dateObj.getMonth() + 1).padStart(2, "0");
    const day = String(dateObj.getDate()).padStart(2, "0");
    const year = dateObj.getFullYear();
    return `${month} ${day} ${year}`;
  };

  const getBudgetCategory = (budget) => {
    const value = Number(budget);
    if (value < 10000) return "Low";
    else if (value >= 10000 && value <= 60000) return "Medium";
    else return "High";
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "budget" && { budgetCategory: getBudgetCategory(value) }),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...formData,
      startDate: formatDate(formData.startDate),
      endDate: formatDate(formData.endDate),
    };

    const createdItenary = await itenaryCreate(payload);

    if (createdItenary) {
      setSelectedItenary(createdItenary);

      // Pass itinerary via navigate state only
      navigate("/itenaryP", { 
        state: { itenary: createdItenary },
        replace: true 
      });
    }
  };

  return (
    <div
      className={`${className} w-fit h-fit font-rubik p-10 text-white bg-black/40 shadow-2xl backdrop-blur-sm drop-shadow-2xl rounded-4xl`}
    >
      {isItenaryCreating ? (
        <div className="flex flex-col items-center justify-center gap-4">
          <Lottie
            animationData={loadingAnimation}
            loop={true}
            className="w-60 h-60"
          />
          <p className="text-xl font-medium">✨ Good things take time ✨</p>
        </div>
      ) : (
        <>
          <h1 className="uppercase font-light text-[3.2rem] md:text-[5rem] text-start ml-4 mb-6">
            Plan <br /> With Us
          </h1>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4 px-2">
            <input
              type="text"
              name="destination"
              onChange={handleChange}
              value={formData.destination}
              placeholder="Destination"
              className="capitalize outline-none bg-black/40 placeholder:text-gray-400 p-4 rounded-lg"
              required
            />
            <div className="flex gap-2">
              <input
                type="date"
                name="startDate"
                onChange={handleChange}
                value={formData.startDate}
                className="outline-none bg-black/40 text-gray-400 p-4 uppercase rounded-lg"
                required
              />
              <input
                type="date"
                name="endDate"
                onChange={handleChange}
                value={formData.endDate}
                className="outline-none uppercase bg-black/40 text-gray-400 p-4 rounded-lg"
                required
              />
            </div>
            <input
              type="text"
              name="budget"
              onChange={handleChange}
              value={formData.budget}
              placeholder="Budget"
              className="capitalize date outline-none bg-black/40 placeholder:text-gray-400 p-4 rounded-lg"
              required
            />

            <button
              type="submit"
              disabled={isItenaryCreating}
              className="bg-white text-black font-semibold p-2 rounded"
            >
              Create Itinerary
            </button>

            {error && <p className="text-red-500">{error}</p>}
          </form>
        </>
      )}
    </div>
  );
};

export default ItenaryCreation;
