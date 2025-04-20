import React, { useEffect, useState } from "react";

export const AppointmentChart = () => {
  const [appointmentData, setAppointmentData] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const getAppointmentsInfo = async () => {
      try {
        const response = await getAppointmentsSummary();
        setAppointmentData(response.data);
      } catch (error) {
        setErrorMessage(error.message);
      }
    };
    getAppointmentsInfo();
  }, []);

  return <div>AppointmentChart</div>;
};
