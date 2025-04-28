import React, { useEffect, useState } from "react";
import { getAggregatedUsers } from "../user/UserService";
import {
  Bar,
  BarChart,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { NoDataAvailable } from "../common/NoDataAvailable";

export const RegistrationChart = () => {
  const [userData, setUserData] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const response = await getAggregatedUsers();
        const usersData = response.data;
        console.log(usersData);
        const transformedData = Object.entries(usersData).map(
          ([month, counts]) => {
            return {
              name: month,
              Veterinarians: counts.VET || 0,
              Patients: counts.PATIENT || 0,
            };
          }
        );
        setUserData(transformedData);
      } catch (error) {
        setErrorMessage(error.message);
      }
    };
    getUsers();
  }, []);
  return (
    <section>
      {userData && userData.length > 0 ? (
        <React.Fragment>
          <ResponsiveContainer width={"60%"} height={400}>
            <h5 className="chart-title mb-5">Users Registration Overview</h5>

            <BarChart data={userData}>
              <XAxis dataKey="name" angle={-50} textAnchor="end" height={70} />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey={"Veterinarians"} fill="#2f6a32" />
              <Bar dataKey={"Patients"} fill="#d26161" />
            </BarChart>
          </ResponsiveContainer>
        </React.Fragment>
      ) : (
        <NoDataAvailable dataType={"users data"} errorMessage={errorMessage} />
      )}
    </section>
  );
};
