import React, { useState } from "react";
import { Accordion, Button, Col, Container, Row } from "react-bootstrap";
import ReactDatePicker from "react-datepicker";
import PetsTable from "../pet/PetsTable";
import { formatAppointmentStatus, UserType } from "../utils/utilities";
import useColorMapping from "../hooks/ColorMapping";
import PatientActions from "../actions/PatientActions";
import VeterinarianActions from "../actions/VeterinarianActions";
import UseMessageAlerts from "../hooks/UseMessageAlerts";
import { updateAppointment } from "./AppointmentService";
import AlertMessage from "../common/AlertMessage";

const UserAppointments = ({ user, appointments: initialAppointments }) => {
  const [appointments, setAppointments] = useState(initialAppointments);
  const handlePetsUpdate = () => {};
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
  // for VETs

  // Approve appointment,
  const handleApproveAppointment = () => {};
  // Decline appointment
  const handleDeclineAppointment = () => {};

  // -------------------------------------
  // for PATIENT

  // Cancel appointment
  const handleCancelAppointment = () => {};
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

  return (
    <Container className="p-5">
      {showSuccessAlert && (
        <AlertMessage type={"success"} message={successMessage} />
      )}
      {showErrorAlert && (
        <AlertMessage type={"danger"} message={errorMessage} />
      )}
      <Accordion className="mt-4 mb-5">
        {appointments.map((appointment, index) => {
          const formattedStatus = formatAppointmentStatus(appointment.status);

          const statusColor = colors[formattedStatus] || colors["default"];

          const isWaitingForApproval =
            formattedStatus === "waiting-for-approval";
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
                    {" "}
                    <h4>Pets:</h4>
                    <PetsTable
                      pets={appointment.pets}
                      appointmentId={appointment.id}
                      onPetsUpdate={handlePetsUpdate}
                      isPatient={user.userType === UserType.PATIENT}
                      isEditable={isWaitingForApproval}
                    />
                  </Col>
                </Row>
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
                    />
                  </div>
                )}
              </Accordion.Body>
            </Accordion.Item>
          );
        })}
      </Accordion>
    </Container>
  );
};

export default UserAppointments;
