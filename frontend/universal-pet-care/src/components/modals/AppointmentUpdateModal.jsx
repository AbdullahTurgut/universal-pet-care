import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
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

  const handleSubmit = () => {
    const updateAppointment = {
      ...appointment,
      date: date.toISOString().split("T")[0],
      time: time.toTimeString().split(" ")[0].substring(0, 5),
      reason,
    };
    handleUpdate(updateAppointment);
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Update Appointment</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="date">
            <Form.Label className="me-2">Date</Form.Label>
            <DatePicker
              selected={date}
              onChange={(date) => setDate(date)}
              dateFormat="yyyy-MM-dd"
              className="form-control"
            />
          </Form.Group>
          <Form.Group controlId="time" className="mt-4">
            <Form.Label className="me-2">Time</Form.Label>
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
          <Form.Group controlId="reason" className="mt-2">
            <Form.Label>Reason</Form.Label>
            <Form.Control
              as={"textarea"}
              rows={3}
              placeholder="Enter your reason"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="info" onClick={handleSubmit}>
          Save Update
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AppointmentUpdateModal;
