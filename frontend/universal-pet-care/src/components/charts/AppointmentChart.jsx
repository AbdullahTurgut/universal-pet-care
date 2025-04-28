import React, { useEffect, useState } from "react";
import { CustomPieChart } from "./CustomPieChart";
import { getAppointmentsSummary } from "../appointment/AppointmentService";
import { NoDataAvailable } from "../common/NoDataAvailable";

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

  return (
    <section>
      {appointmentData && appointmentData.length > 0 ? (
        <React.Fragment>
          <h5 className="mb-4 chart-title">Appointments Overview</h5>
          <CustomPieChart data={appointmentData} />
        </React.Fragment>
      ) : (
        <NoDataAvailable
          dataType={"appointment data"}
          errorMessage={errorMessage}
        />
      )}
    </section>
  );
};
