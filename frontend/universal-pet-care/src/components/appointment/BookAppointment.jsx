import React, { useState } from "react";
import UseMessageAlerts from "../hooks/UseMessageAlerts";
import { useParams } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  OverlayTrigger,
  Tooltip,
  Button,
} from "react-bootstrap";
import DatePicker from "react-datepicker";
import PetEntry from "../pet/PetEntry";
import { formatDateAndTime } from "../utils/utilities";
import { bookAppointment } from "./AppointmentService";
import { FaPlus } from "react-icons/fa";

const BookAppointment = () => {
  // backend cekecegimiz veriler icin
  const [formData, setFormData] = useState({
    date: "",
    time: "",
    reason: "",
    pets: [
      {
        petName: "",
        petAge: "",
        petColor: "",
        petType: "",
        petBreed: "",
      },
    ],
  });

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

  const { recipientId } = useParams(); // recipientId  useParams() ile alıyoruz

  const handleDateChange = (date) => {
    setFormData((prevData) => ({
      ...prevData,
      date: date,
    }));
  };

  const handleTimeChange = (time) => {
    setFormData((prevData) => ({
      ...prevData,
      time: time,
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handlePetChange = (index, e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      pets: prevState.pets.map((pet, i) =>
        i === index ? { ...pet, [name]: value } : pet
      ),
    }));
  };

  const addPet = () => {
    const newPet = {
      petName: "",
      petAge: "",
      petColor: "",
      petType: "",
      petBreed: "",
    };
    setFormData((prevState) => ({
      ...prevState,
      pets: [...prevState.pets, newPet],
    }));
  };

  const removePet = (index, e) => {
    const filteredPets = formData.pets.filter(
      (_, petIndex) => petIndex !== index
    );
    setFormData((prevState) => ({
      ...prevState,
      pets: filteredPets,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { date, time } = formData;

    const { formattedDate, formattedTime } = formatDateAndTime(date, time);

    // Constructing an array of pet objects from fromData.pets
    const pets = formData.pets.map((pet) => ({
      name: pet.petName,
      age: pet.petAge,
      color: pet.petColor,
      type: pet.petType,
      breed: pet.petBreed,
    }));

    const request = {
      appointment: {
        date: formattedDate,
        time: formattedTime,
        reason: formData.reason,
      },
      pets: pets,
    };

    try {
      const response = await bookAppointment(senderId, recipientId, request);
      setSuccessMessage(response.data.message);
      handleReset();
      setShowSuccessAlert(true);
    } catch (error) {
      setErrorMessage(error.response.data.message);
      setShowErrorAlert(true);
    }
  };

  const handleReset = () => {
    setFormData({
      date: "",
      time: "",
      reason: "",
      pets: [
        {
          petName: "",
          petAge: "",
          petColor: "",
          petType: "",
          petBreed: "",
        },
      ],
    });
    setShowSuccessAlert(false);
    setShowErrorAlert(false);
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col lg={6} md={10} sm={12}>
          <Form onSubmit={handleSubmit}>
            <Card className="shadow mb-5">
              <Card.Header as="h5" className="text-center">
                {" "}
                Appointment Booking Form
              </Card.Header>
              <Card.Body>
                <fieldset className="field-set mb-4">
                  <legend className="text-center">
                    Appointment Date and Time
                    <Form.Group as={Row} className="mb-4">
                      <Col md={6}>
                        <DatePicker
                          selected={formData.date}
                          onChange={handleDateChange}
                          dateFormat="yyyy/MM/dd"
                          className="form-control"
                          minDate={new Date()}
                          placeholderText="Select a date"
                          required
                        />
                      </Col>
                      <Col md={6}>
                        <DatePicker
                          selected={formData.time}
                          onChange={handleTimeChange}
                          showTimeSelect
                          showTimeSelectOnly
                          timeIntervals={30}
                          dateFormat="HH:mm"
                          className="form-control"
                          placeholderText="Select time"
                          required
                        />
                      </Col>
                    </Form.Group>
                  </legend>
                </fieldset>
                <Form.Group className="mb-4">
                  <Form.Control
                    as="textarea"
                    rows={3}
                    name="reason"
                    onChange={handleInputChange}
                    value={formData.reason}
                    required
                  />
                </Form.Group>
                <h5 className="text-center">Appointment Pet Information</h5>
                {formData.pets.map((pet, index) => (
                  <PetEntry
                    key={index}
                    pet={pet}
                    index={index}
                    handleInputChange={(e) => handlePetChange(index, e)}
                    removePet={removePet}
                    canRemove={formData.pets.length > 1}
                  />
                ))}

                <div className="d-flex justify-content-center mb-3">
                  <OverlayTrigger overlay={<Tooltip>Add more pets</Tooltip>}>
                    <Button size="sm" onClick={addPet} className="me-2">
                      <FaPlus />
                    </Button>
                  </OverlayTrigger>

                  <Button
                    type="submit"
                    variant="outline-primary"
                    size="sm"
                    className="me-2"
                  >
                    Book Appointment
                  </Button>

                  <Button
                    variant="outline-info"
                    size="sm"
                    onClick={handleReset}
                  >
                    Reset
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default BookAppointment;
