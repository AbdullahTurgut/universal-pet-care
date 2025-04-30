import React, { useEffect, useState } from "react";
import UseMessageAlerts from "../hooks/UseMessageAlerts";
import { useNavigate, useParams } from "react-router-dom";
import { getUserById, updateUser } from "./UserService";
import { Form, Card, Container, Col, Button } from "react-bootstrap";
import VetSpecializationSelector from "./VetSpecializationSelector";
import ProcessSpinner from "../common/ProcessSpinner";
import AlertMessage from "../common/AlertMessage";

const UserUpdate = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const { userId } = useParams();
  const navigate = useNavigate();

  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    gender: "",
    phoneNumber: "",
    email: "",
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

  useEffect(() => {
    const getUserData = async () => {
      try {
        const data = await getUserById(userId);
        setUser(data.data);
      } catch (error) {
        setErrorMessage(error.message);
      }
    };
    getUserData();
  }, [userId]);

  const handleUserInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleUserUpdate = async (e) => {
    e.preventDefault();
    const updatedUserData = {
      firstName: user.firstName,
      lastName: user.lastName,
      gender: user.gender,
      phoneNumber: user.phoneNumber,
      email: user.email,
      userType: user.userType,
      specialization: user.specialization,
    };
    // Perform registration logic here
    try {
      setIsProcessing(true);
      const response = await updateUser(userId, updatedUserData);
      setSuccessMessage(response.message);
      setShowSuccessAlert(true);
    } catch (error) {
      setErrorMessage(error.message);
      setShowErrorAlert(true);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleCancelEdit = () => {
    navigate(`/user-dashboard/${userId}`);
  };

  return (
    <Container md={6} className="d-flex justify-content-center mt-5">
      <Col md={6}>
        <Form onSubmit={handleUserUpdate}>
          <Card className="shadow mb-5">
            <Card.Header className="text-center mb-2">
              Update User Information
            </Card.Header>
            <Card.Body>
              <fieldset className="field-set">
                <legend>Full Name</legend>
                <Form.Group
                  as={Col}
                  controlId="nameFields"
                  className="mb-2 d-flex"
                >
                  <Form.Control
                    type="text"
                    name="firstName"
                    value={user.firstName}
                    onChange={handleUserInputChange}
                    style={{ marginRight: "10px" }}
                  />
                  <Form.Control
                    type="text"
                    name="lastName"
                    value={user.lastName}
                    onChange={handleUserInputChange}
                  />
                </Form.Group>
              </fieldset>

              <Form.Group as={Col} controlId="gender" className="mb-2">
                <Form.Label className="legend">Gender</Form.Label>
                <Form.Control
                  as="select"
                  name="gender"
                  value={user.gender}
                  onChange={handleUserInputChange}
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </Form.Control>
              </Form.Group>

              <Form.Group as={Col} controlId="userType" className="mb-2">
                <Form.Label className="legend">UserType</Form.Label>
                <Form.Control
                  type="text" // as="text" değil, type="text"
                  name="userType"
                  value={user.userType}
                  onChange={handleUserInputChange}
                  disabled
                />
              </Form.Group>

              <fieldset className="field-set mb-2 mt-2">
                <legend>Contact Information</legend>
                <Form.Group
                  as={Col}
                  controlId="emailPhoneFields"
                  className="mb-2 d-flex"
                >
                  <Form.Control
                    type="email"
                    name="email"
                    value={user.email}
                    onChange={handleUserInputChange}
                    style={{ marginRight: "10px" }}
                    disabled
                  />
                  <Form.Control
                    type="text"
                    name="phoneNumber"
                    placeholder="Mobile Contact"
                    value={user.phoneNumber}
                    onChange={handleUserInputChange}
                  />
                </Form.Group>
              </fieldset>

              {user.userType === "VET" && (
                <Form.Group controlId="specialization" className="mb-4">
                  <Form.Label className="legend">Specialization</Form.Label>
                  <VetSpecializationSelector
                    handleAddSpecialization={handleUserInputChange}
                    user={user}
                    setUser={setUser}
                  />
                </Form.Group>
              )}

              {showErrorAlert && (
                <AlertMessage type={"danger"} message={errorMessage} />
              )}
              {showSuccessAlert && (
                <AlertMessage type={"success"} message={successMessage} />
              )}

              {/* Action Buttons  */}
              <div className="d-flex justify-content-center">
                <div className="mx-2">
                  <Button
                    type="submit"
                    variant="outline-warning"
                    size="sm"
                    disabled={isProcessing}
                  >
                    {isProcessing ? (
                      <ProcessSpinner message="Processing..." />
                    ) : (
                      "Update"
                    )}
                  </Button>
                </div>
                <div className="mx-2">
                  <Button
                    variant="outline-info"
                    size="sm"
                    onClick={handleCancelEdit}
                  >
                    Back to Profile
                  </Button>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Form>
      </Col>
    </Container>
  );
};

export default UserUpdate;
