import React, { useEffect, useState } from "react";
import UseMessageAlerts from "../hooks/UseMessageAlerts";
import { Col, OverlayTrigger, Row, Table, Tooltip } from "react-bootstrap";
import { Link } from "react-router-dom";
import { BsEyeFill } from "react-icons/bs";
import AlertMessage from "../common/AlertMessage";
import { getPatients } from "../patient/PatientService";
import { UserFilter } from "../user/UserFilter";
import Paginator from "../common/Paginator";

export const PatientComponent = () => {
  const [patients, setPatients] = useState([]);
  const [filteredPatients, setFilteredPatients] = useState([]);
  const [selectedEmail, setSelectedEmail] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [patientsPerPage] = useState(7);

  const indexOfLastPatient = currentPage * patientsPerPage;
  const indexOfFirstPatient = indexOfLastPatient - patientsPerPage;
  const currentPatients = filteredPatients.slice(
    indexOfFirstPatient,
    indexOfLastPatient
  );

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

  useEffect(() => {
    let filtered = patients;
    if (selectedEmail) {
      filtered = filtered.filter((patient) => patient.email === selectedEmail);
    }
    setFilteredPatients(filtered);
  }, [selectedEmail, patients]);

  const emails = Array.from(new Set(patients.map((patient) => patient.email)));
  const handleClearFilters = () => {
    setSelectedEmail("");
  };

  return (
    <main>
      <h5>List of Patients</h5>
      <Row>
        <Col>
          {showErrorAlert && (
            <AlertMessage type={"danger"} message={errorMessage} />
          )}
          {showSuccessAlert && (
            <AlertMessage type={"success"} message={successMessage} />
          )}
        </Col>
      </Row>
      <Row className="mb-2">
        <Col md={6}>
          <UserFilter
            values={emails}
            selectedValue={selectedEmail}
            onSelectedValue={setSelectedEmail}
            onClearFilters={handleClearFilters}
            label={"email"}
          />
        </Col>
      </Row>
      <Table bordered hover striped>
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
          {currentPatients.map((patient, index) => (
            <tr key={index}>
              <td>{patient.id}</td>
              <td>{patient.firstName}</td>
              <td>{patient.lastName}</td>
              <td>{patient.email}</td>
              <td>{patient.phoneNumber}</td>
              <td>{patient.gender}</td>
              <td>{patient.createdAt}</td>
              <td>
                <OverlayTrigger
                  overlay={
                    <Tooltip id={`tooltip-view-${index}`}>
                      View patient details
                    </Tooltip>
                  }
                >
                  <Link
                    to={`/user-dashboard/${patient.id}/my-dashboard`}
                    className="text-info"
                  >
                    <BsEyeFill />
                  </Link>
                </OverlayTrigger>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Paginator
        paginate={setCurrentPage}
        currentPage={currentPage}
        itemsPerPage={patientsPerPage}
        totalItems={filteredPatients.length}
      />
    </main>
  );
};
