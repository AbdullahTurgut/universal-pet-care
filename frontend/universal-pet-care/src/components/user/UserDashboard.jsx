import React, { useState, useEffect } from "react";
import UseMessageAlerts from "../hooks/UseMessageAlerts";
import { deleteUserPhotoById } from "../modals/ImageUploaderService";
import { Container } from "react-bootstrap";
import UserProfile from "./UserProfile";
import { getUserById } from "./UserService";

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
  const userId = 6;

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
  return (
    <Container>
      {user && (
        <UserProfile user={user} handleRemovePhoto={handleRemovePhoto} />
      )}
    </Container>
  );
};

export default UserDashboard;
