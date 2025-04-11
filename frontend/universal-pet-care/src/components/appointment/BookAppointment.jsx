import React, { useState } from "react";

const BookAppointment = () => {
  // backend cekecegimiz veriler icin
  const [formData, setFormData] = useState({
    date: "",
    time: "",
    reason: "",
    pets: [
      {
        petName: "",
        petAge: "",
        petColor: "",
        petType: "",
        petBreed: "",
      },
    ],
  });

  const handleDateChange = (date) => {
    setFormData((prevData) => ({
      ...prevData,
      date: date,
    }));
  };

  const handleTimeChange = (time) => {
    setFormData((prevData) => ({
      ...prevData,
      time: time,
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handlePetChange = (index, e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      pets: prevState.pets.map((pet, i) =>
        i === index ? { ...pet, [name]: value } : pet
      ),
    }));
  };

  return <div>BookAppointment</div>;
};

export default BookAppointment;
