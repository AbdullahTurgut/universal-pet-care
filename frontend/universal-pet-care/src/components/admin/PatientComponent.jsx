import React, { useEffect, useState } from "react";
import UseMessageAlerts from "../hooks/UseMessageAlerts";
import { OverlayTrigger, Table, Tooltip } from "react-bootstrap";
import { Link } from "react-router-dom";
import { BsEyeFill } from "react-icons/bs";

export const PatientComponent = () => {
  const [patients, setPatients] = useState([]);

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

  const fetchPatients = async () => {
    try {
      const response = await getPatients();
      setPatients(response.data);
    } catch (error) {
      setErrorMessage(error.message);
      setShowErrorAlert(true);
    }
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  return (
    <main>
      <Table>
        <thead>
          <tr>
            <th>Id</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Mobile</th>
            <th>Gender</th>
            <th>Registered on</th>
            <th colSpan={2}>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{patients.id}</td>
            <td>{patients.firstName}</td>
            <td>{patients.lastName}</td>
            <td>{patients.email}</td>
            <td>{patients.phoneNumber}</td>
            <td>{patients.gender}</td>
            <td>{patients.createdAt}</td>
            <td>
              <OverlayTrigger
                overlay={
                  <Tooltip id={`tooltip-view-${index}`}>
                    View patient details
                  </Tooltip>
                }
              >
                <Link
                  to={`/user-dashboard/${patients.id}/my-dashboard`}
                  className="text-info"
                >
                  <BsEyeFill />
                </Link>
              </OverlayTrigger>
            </td>
          </tr>
        </tbody>
      </Table>
    </main>
  );
};
