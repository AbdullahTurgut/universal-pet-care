import React, { useEffect, useState } from "react";
import UseMessageAlerts from "../hooks/UseMessageAlerts";
import { resetPassword, validateToken } from "./AuthService";
import { Button, Card, Container, Form } from "react-bootstrap";
import AlertMessage from "../common/AlertMessage";
import ProcessSpinner from "../common/ProcessSpinner";

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [tokenStatus, setTokenStatus] = useState("Pending");

  const queryParams = new URLSearchParams(window.location.search);
  const token = queryParams.get("token");

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

  useEffect(() => {
    if (token) {
      validateToken(token)
        .then((response) => {
          setTokenStatus(response.message);
        })
        .catch((error) => {
          setErrorMessage(error.message);
          setShowErrorAlert(true);
        });
    }
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsProcessing(true);
    try {
      const data = await resetPassword(token, newPassword);
      setSuccessMessage(data.message);
      setShowSuccessAlert(true);
    } catch (error) {
      setErrorMessage(error.message);
      setShowErrorAlert(true);
    }
    setIsProcessing(false);
  };
  return (
    <Container>
      <Card style={{ maxWidth: "600px" }} className="w-100">
        {showErrorAlert && (
          <AlertMessage type={"danger"} message={errorMessage} />
        )}
        {showSuccessAlert && (
          <AlertMessage type={"success"} message={successMessage} />
        )}

        {tokenStatus === "Valid" ? (
          <Card.Body>
            <Card.Title>Reset Your Password</Card.Title>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="emailInput">
                <Form.Label>Set a new Password</Form.Label>
                <Form.Control
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="choose a new password"
                />
              </Form.Group>
              <Button variant="outline-info" type="submit">
                {isProcessing ? (
                  <ProcessSpinner message="Resetting your password, please wait..." />
                ) : (
                  "Reset Password"
                )}
              </Button>
            </Form>
          </Card.Body>
        ) : tokenStatus === "Pending" ? (
          <Card.Body>
            <ProcessSpinner message="Validating token, please wait..." />
          </Card.Body>
        ) : (
          <Card.Body>
            <AlertMessage
              type={"danger"}
              message={
                "Invalid or expired link, process aborted, please try again!"
              }
            />
          </Card.Body>
        )}
      </Card>
    </Container>
  );
};

export default ResetPassword;
