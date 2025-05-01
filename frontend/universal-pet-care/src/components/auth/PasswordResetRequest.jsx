import React, { useState } from "react";
import UseMessageAlerts from "../hooks/UseMessageAlerts";
import { Button, Card, Container, Form } from "react-bootstrap";
import AlertMessage from "../common/AlertMessage";
import ProcessSpinner from "../common/ProcessSpinner";
import { requestPasswordReset } from "./AuthService";

const PasswordResetRequest = () => {
  // state variables
  const [email, setEmail] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsProcessing(true);
    try {
      const data = await requestPasswordReset(email);
      setSuccessMessage(data.message);
      setShowSuccessAlert(true);
      setEmail("");
    } catch (error) {
      setErrorMessage(error.message);
      setShowErrorAlert(true);
    }
    setIsProcessing(false);
  };

  return (
    <Container
      className="d-flex align-items-center justify-content-center"
      style={{ marginTop: "100px" }}
    >
      <Card className="w-100" style={{ maxWidth: "600px" }}>
        {showErrorAlert && (
          <AlertMessage type={"danger"} message={errorMessage} />
        )}
        {showSuccessAlert && (
          <AlertMessage type={"success"} message={successMessage} />
        )}
        <Card.Body>
          <Card.Title>Password Reset Request</Card.Title>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="email">
              <Form.Label>Enter your email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Form.Text className="text-muted">
                We'll send a password reset link to your email.
              </Form.Text>
            </Form.Group>
            <div className="d-flex justify-content-end">
              <Button variant="outline-info" type="submit">
                {isProcessing ? (
                  <ProcessSpinner message="Sending verification link, please wait..." />
                ) : (
                  "Send Link"
                )}
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default PasswordResetRequest;
