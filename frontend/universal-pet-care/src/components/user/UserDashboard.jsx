import React, { useState, useEffect } from "react";
import UseMessageAlerts from "../hooks/UseMessageAlerts";
import { deleteUserPhotoById } from "../modals/ImageUploaderService";
import { Container } from "react-bootstrap";
import UserProfile from "./UserProfile";
import { deleteUser, getUserById } from "./UserService";

const UserDashboard = () => {
  const [user, setUser] = useState({});

  const {
    successMessage,
    setSuccessMessage,
    errorMessage,
    setErrorMessage,
    showSuccessAlert,
    setShowSuccessAlert,
    showErrorAlert,
    setShowErrorAlert,
  } = UseMessageAlerts();

  // const {userId} = useParams();
  const userId = 5;

  useEffect(() => {
    const getUser = async () => {
      try {
        const data = await getUserById(userId);
        setUser(data.data);
      } catch (error) {
        setErrorMessage(error.message);
        setShowErrorAlert(true);
      }
    };
    getUser();
  }, [userId]);

  const handleRemovePhoto = async () => {
    try {
      const result = await deleteUserPhotoById(user.photoId, 6);
      setSuccessMessage(result.message);
      setShowSuccessAlert(true);
    } catch (error) {
      setErrorMessage(error.message);
      setShowErrorAlert(true);
    }
  };

  const handleDeleteAccount = async () => {
    try {
      const response = await deleteUser(userId);
      setSuccessMessage(response.message);
      setShowSuccessAlert(true);
    } catch (error) {
      console.log("this is the error from the delete account:", error);
      setErrorMessage(error.message);
      setShowErrorAlert(true);
      console.error(error.message);
    }
  };

  return (
    <Container>
      {user && (
        <UserProfile
          user={user}
          handleRemovePhoto={handleRemovePhoto}
          handleDeleteAccount={handleDeleteAccount}
        />
      )}
    </Container>
  );
};

export default UserDashboard;
