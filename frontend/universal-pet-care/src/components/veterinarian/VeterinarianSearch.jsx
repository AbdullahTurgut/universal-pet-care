import React, { useState } from "react";
import format from "date-fns";

const VeterinarianSearch = ({ onSearchResult }) => {
  const [searchQuery, setSearchQuery] = useState({
    date: null,
    time: null,
    specialization: "",
  });

  const [showDateTime, setShowDateTime] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleInputChange = (e) => {
    setSearchQuery({
      ...searchQuery,
      [e.target.name]: e.target.value,
    });
  };

  const handleDateChange = (date) => {
    setSearchQuery({
      date,
    });
  };
  const handleTimeChange = (time) => {
    setSearchQuery({
      time,
    });
  };

  const handleDateTimeToggle = (e) => {
    const isChecked = e.target.checked;
    setShowDateTime(isChecked);
    if (!isChecked) {
      setSearchQuery({
        ...searchQuery,
        date: null,
        time: null,
      });
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    let searchParams = { specialization: searchQuery.specialization };

    if (searchQuery.date) {
      const formattedDate = format(searchQuery.date, "yyyy-MM-dd");
      searchParams.date = formattedDate;
    }

    if (searchQuery.time) {
      const formattedTime = format(searchQuery.time, "HH:mm");
      searchParams.time = formattedTime;
    }

    try {
      const response = await findAvailableVeterinarians(searchParams);
      onSearchResult(response.data);
    } catch (error) {}
  };

  return <div>VeterinarianSearch</div>;
};

export default VeterinarianSearch;
