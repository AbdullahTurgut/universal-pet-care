import React, { use, useEffect, useState } from "react";
import { Accordion, Button, Col, Container, Row } from "react-bootstrap";
import ReactDatePicker from "react-datepicker";
import PetsTable from "../pet/PetsTable";
import { formatAppointmentStatus, UserType } from "../utils/utilities";
import useColorMapping from "../hooks/ColorMapping";
import PatientActions from "../actions/PatientActions";
import VeterinarianActions from "../actions/VeterinarianActions";
import UseMessageAlerts from "../hooks/UseMessageAlerts";
import {
  cancelAppointment,
  updateAppointment,
  declineAppointment,
  approveAppointment,
  getAppointmentById,
} from "./AppointmentService";
import AlertMessage from "../common/AlertMessage";
import { UserInformation } from "../common/UserInformation";
import { Link, useParams } from "react-router-dom";
import AppointmentFilter from "./AppointmentFilter";
import Paginator from "../common/Paginator";

const UserAppointments = ({ user, appointments: initialAppointments }) => {
  const [appointments, setAppointments] = useState(initialAppointments);
  const [selectedStatus, setSelectedStatus] = useState("");
  const [filteredAppointments, setFilteredAppointments] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [appointmentsPerPage] = useState(4);

  const fetchAppointment = async (appointmentId) => {
    try {
      const response = await getAppointmentById(appointmentId);
      const updatedAppointment = response.data;
      setAppointments(
        appointments.map((appointment) =>
          appointment.id === updatedAppointment.id
            ? updatedAppointment
            : appointment
        )
      );
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchAppointment();
  }, []);

  const handlePetsUpdate = async (updatedAppointmentId) => {
    try {
      await fetchAppointment(updatedAppointmentId);
    } catch (error) {
      console.error(error);
    }
  };
  const colors = useColorMapping();
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

  const { recipientId } = useParams();
  // for VETs

  // Approve appointment,
  const handleApproveAppointment = async (appointmentId) => {
    try {
      const response = await approveAppointment(appointmentId);
      setSuccessMessage(response.message);
      setShowSuccessAlert(true);
    } catch (error) {
      setErrorMessage(error.response.message);
      setShowErrorAlert(true);
    }
  };
  // Decline appointment
  const handleDeclineAppointment = async (appointmentId) => {
    try {
      const response = await declineAppointment(appointmentId);
      setSuccessMessage(response.message);
      setShowSuccessAlert(true);
    } catch (error) {
      setErrorMessage(error.response.message);
      setShowErrorAlert(true);
    }
  };

  // -------------------------------------
  // for PATIENT

  // Cancel appointment
  const handleCancelAppointment = async (id) => {
    try {
      const response = await cancelAppointment(id);
      console.log("the cancel response from : ", response);
      setSuccessMessage(response.message);
      setShowSuccessAlert(true);
    } catch (error) {
      setErrorMessage(error.response.message);
      setShowErrorAlert(true);
    }
  };
  // update appointment
  const handleUpdateAppointment = async (updatedAppointment) => {
    try {
      const result = await updateAppointment(
        updatedAppointment.id,
        updatedAppointment
      );
      setAppointments(
        appointments.map((appointment) =>
          appointment.id === updatedAppointment.id
            ? updatedAppointment
            : appointment
        )
      );
      console.log("the result from update : ", result);
      setSuccessMessage(result.data.message);
      setShowSuccessAlert(true);
    } catch (error) {
      console.error(error);
    }
  };

  const onSelectStatus = (status) => {
    setSelectedStatus(status);
  };

  const handleClearFilter = () => {
    setSelectedStatus("all");
  };

  const statues = Array.from(
    new Set(appointments.map((appointment) => appointment.status))
  );

  useEffect(() => {
    let filter = appointments;
    if (selectedStatus && selectedStatus !== "all") {
      filter = appointments.filter(
        (appointment) => appointment.status === selectedStatus
      );
    }
    setFilteredAppointments(filter);
  }, [selectedStatus, appointments]);

  const indexOfLastVet = currentPage * appointmentsPerPage;
  const indexOfFirstVet = indexOfLastVet - appointmentsPerPage;

  const currentAppointments = filteredAppointments.slice(
    indexOfFirstVet,
    indexOfLastVet
  );

  return (
    <Container className="p-5">
      {showSuccessAlert && (
        <AlertMessage type={"success"} message={successMessage} />
      )}
      {showErrorAlert && (
        <AlertMessage type={"danger"} message={errorMessage} />
      )}

      <AppointmentFilter
        onClearFilters={handleClearFilter}
        statuses={statues}
        onSelectStatus={onSelectStatus}
      />
      <Accordion className="mt-4 mb-5">
        {currentAppointments.map((appointment, index) => {
          const formattedStatus = formatAppointmentStatus(appointment.status);

          const statusColor = colors[formattedStatus] || colors["default"];

          const isWaitingForApproval =
            formattedStatus === "waiting-for-approval";
          const isApproved = formattedStatus === "approved";
          return (
            <Accordion.Item eventKey={index} key={index} className="mb-2">
              <Accordion.Header>
                <div>
                  <div className="mb-3">Date: {appointment.date}</div>
                  <div style={{ color: statusColor }}>
                    Status: {formattedStatus}
                  </div>
                </div>
              </Accordion.Header>
              <Accordion.Body>
                <Row>
                  <Col md={4} className="mt-2">
                    <p>
                      Appointment No:{" "}
                      <span className="text-info">
                        {" "}
                        {appointment.appointmentNo}
                      </span>
                    </p>
                    <ReactDatePicker
                      selected={
                        new Date(`${appointment.date}T${appointment.time}`)
                      }
                      showTimeSelect
                      timeFormat="HH:mm"
                      timeIntervals={30}
                      timeCaption="time"
                      dateFormat="MMMM d,yyyy h:mm aa"
                      inline
                    />

                    <p>
                      Time:
                      <span className="text-info">{appointment.time}</span>
                    </p>
                    <p>Reason: {appointment.reason}</p>
                  </Col>
                  <Col md={8} className="mt-2">
                    <h4>Pets:</h4>
                    <PetsTable
                      pets={appointment.pets}
                      appointmentId={appointment.id}
                      onPetsUpdate={handlePetsUpdate}
                      isPatient={user.userType === UserType.PATIENT}
                      isEditable={isWaitingForApproval}
                    />
                  </Col>
                  {isApproved && (
                    <UserInformation
                      userType={user.userType}
                      appointment={appointment}
                    />
                  )}
                </Row>

                {user.userType === UserType.PATIENT && (
                  <Link to={`/book-appointment/${recipientId}/new-appointment`}>
                    Book New Appointment
                  </Link>
                )}

                {user && user.userType === UserType.PATIENT && (
                  <div>
                    <PatientActions
                      onCancel={handleCancelAppointment}
                      onUpdate={handleUpdateAppointment}
                      isDisabled={!isWaitingForApproval}
                      appointment={appointment}
                    />
                  </div>
                )}
                {user && user.userType === UserType.VET && (
                  <div>
                    <VeterinarianActions
                      onApprove={handleApproveAppointment}
                      onDecline={handleDeclineAppointment}
                      isDisabled={!isWaitingForApproval}
                      appointment={appointment}
                    />
                  </div>
                )}
              </Accordion.Body>
            </Accordion.Item>
          );
        })}
      </Accordion>
      <Paginator
        itemsPerPage={appointmentsPerPage}
        totalItems={filteredAppointments.length}
        paginate={setCurrentPage}
        currentPage={currentPage}
      />
    </Container>
  );
};

export default UserAppointments;
