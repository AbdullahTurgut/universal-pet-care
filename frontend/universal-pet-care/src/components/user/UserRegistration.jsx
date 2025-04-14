import React, { useState } from "react";
import UseMessageAlerts from "../hooks/UseMessageAlerts";
import { Card, Col, Container, Form, Row } from "react-bootstrap";

const UserRegistration = () => {
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    gender: "",
    phoneNumber: "",
    email: "",
    password: "",
    userType: "",
    specialization: "",
  });

  const {
    errorMessage,
    setErrorMessage,
    successMessage,
    setSuccessMessage,
    showErrorAlert,
    setShowErrorAlert,
    showSuccessAlert,
    setShowSuccessAlert,
  } = UseMessageAlerts();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // feedback from backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Perform registration logic here
    try {
      const response = await registerUser(user); // Assuming you have a registerUser function
      setSuccessMessage(response.message);
      setShowSuccessAlert(true);
      handleReset(); // Reset the form after successful registration
    } catch (error) {
      setErrorMessage(error.message);
      setShowErrorAlert(true);
    }
  };

  const handleReset = () => {
    setUser({
      firstName: "",
      lastName: "",
      gender: "",
      phoneNumber: "",
      email: "",
      password: "",
      userType: "",
      specialization: "",
    });
  };
  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col xs={12} md={8} lg={6}>
          <Form onSubmit={handleSubmit}>
            <Card className="shadow mb-5">
              <Card.Header className="text-center">
                User Registration Form
              </Card.Header>
              <Card.Body>
                <fieldset>
                  <legend>Full Name</legend>
                  <Row>
                    <Col xs={6}></Col>
                  </Row>
                </fieldset>
              </Card.Body>
            </Card>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default UserRegistration;
