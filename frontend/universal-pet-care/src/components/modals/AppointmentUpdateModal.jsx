import React, { useState } from "react";
import { Form, Modal } from "react-bootstrap";
import DatePicker from "react-datepicker";

const AppointmentUpdateModal = ({
  show,
  handleClose,
  appointment,
  handleUpdate,
}) => {
  const [date, setDate] = useState(new Date(appointment.date));
  const [time, setTime] = useState(
    new Date(`${appointment.date}T${appointment.time}`)
  );
  const [reason, setReason] = useState(appointment.reason);

  const handleUpdateSubmit = () => {
    const updateAppointment = {
      ...appointment,
      date: date.toISOString().split("T")[0],
      time: time.toTimeString().split(" ")[0].substring(0, 5),
      reason,
    };
    handleUpdateSubmit(updateAppointment);
  };

  return (
    <Modal>
      <Modal.Header>
        <Modal.Title>Update Appointment</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="appointmentDate">
            <Form.Label className="me-2">Date</Form.Label>
            <DatePicker
              selected={date}
              onChange={(date) => setDate(date)}
              dateFormat="yyyy-MM-dd"
              className="form-control"
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Time</Form.Label>
            <DatePicker
              selected={time}
              onChange={(time) => setTime(time)}
              showTimeSelect
              showTimeSelectOnly
              timeIntervals={30}
              timeCaption="Time"
              dateFormat="HH:mm"
              className="form-control"
              placeholderText="Select Time"
              required
            />
          </Form.Group>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AppointmentUpdateModal;
