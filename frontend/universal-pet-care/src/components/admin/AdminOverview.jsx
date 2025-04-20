import React, { useState, useEffect } from "react";
import {
  countAllUsers,
  countPatients,
  countVeterinarians,
} from "../user/UserService";
import { CardComponent } from "../cards/CardComponent";
import { BsPeopleFill } from "react-icons/bs";
import { countAppointments } from "../appointment/AppointmentService";
import { RegistrationChart } from "../charts/RegistrationChart";

export const AdminOverview = () => {
  const [userCount, setUserCount] = useState(0);
  const [veterinarianCount, setVeterinarianCount] = useState(0);
  const [patientCount, setPatientCount] = useState(0);
  const [appointmentCount, setAppointmentCount] = useState(0);
  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const userCount = await countAllUsers();
        const veterinarianCount = await countVeterinarians();
        const patientCount = await countPatients();
        const appCount = await countAppointments();
        setUserCount(userCount);
        setVeterinarianCount(veterinarianCount);
        setPatientCount(patientCount);
        setAppointmentCount(appCount);
      } catch (error) {
        console.error("Error fetching counts: ", error);
      }
    };
    fetchCounts();
  }, []);

  return (
    <main>
      <h5 className="chart-title">Activities Overview</h5>
      <div className="main-cards">
        <CardComponent
          label={"USERS"}
          count={userCount}
          IconComponent={BsPeopleFill}
        />
        <CardComponent
          label={"APPOINTMENTS"}
          count={appointmentCount}
          IconComponent={BsPeopleFill}
        />
        <CardComponent
          label={"VETERINARIANS"}
          count={veterinarianCount}
          IconComponent={BsPeopleFill}
        />
        <CardComponent
          label={"PATIENTS"}
          count={patientCount}
          IconComponent={BsPeopleFill}
        />
      </div>

      <div className="charts">
        <RegistrationChart />
      </div>
    </main>
  );
};
