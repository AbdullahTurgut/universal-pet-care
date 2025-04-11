import React, { useState } from "react";
import { formatDateAndTime } from "../utils/utilities";
import { set } from "date-fns";

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

  const {
    successMessage,
    setSuccessMessage,
    showSuccessAlert,
    setShowSuccessAlert,
    errorMessage,
    setErrorMessage,
    showErrorAlert,
    setShowErrorAlert,
  } = UseMessageAlerts();

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

  const addPet = () => {
    const newPet = {
      petName: "",
      petAge: "",
      petColor: "",
      petType: "",
      petBreed: "",
    };
    setFormData((prevState) => ({
      ...prevState,
      pets: [...prevState.pets, newPet],
    }));
  };

  const removePet = (index, e) => {
    const filteredPets = formData.pets.filter(
      (_, petIndex) => petIndex !== index
    );
    setFormData((prevState) => ({
      ...prevState,
      pets: filteredPets,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { date, time } = formData;

    const { formattedDate, formattedTime } = formatDateAndTime(date, time);

    const pets = formData.pets.map((pet) => ({
      name: pet.petName,
      age: pet.petAge,
      color: pet.petColor,
      type: pet.petType,
      breed: pet.petBreed,
    }));

    const request = {
      appointment: {
        date: formattedDate,
        time: formattedTime,
        reason: formData.reason,
      },
      pets: pets,
    };

    try {
      const response = await bookAppointment(senderId, recipientId, request);
      setSuccessMessage(response.data.message);
      handleReset();
      setShowSuccessAlert(true);
    } catch (error) {
      setErrorMessage(error.response.data.message);
      setShowErrorAlert(true);
    }
  };

  const handleReset = () => {
    setFormData({
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
    setShowSuccessAlert(false);
    setShowErrorAlert(false);
  };

  return <div>BookAppointment</div>;
};

export default BookAppointment;
