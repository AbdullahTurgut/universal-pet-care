import React, { useEffect, useState } from "react";
import UseMessageAlerts from "../hooks/UseMessageAlerts";
import { Form, useNavigate, useParams } from "react-router-dom";
import { getUserById } from "./UserService";
import { Card, Container } from "react-bootstrap";

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

  const handleUserUpdateSubmit = async (e) => {
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
    navigate(`/user-dashboard/${userId}/my-dashboard`);
  };

  return (
    <Container>
      <div>
        <Form>
          <div>
            <Card>
              <Card.Header></Card.Header>
              <Card.Body> </Card.Body>
            </Card>
          </div>
        </Form>
      </div>
    </Container>
  );
};

export default UserUpdate;
