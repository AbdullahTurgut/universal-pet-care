import React, { useEffect, useState } from "react";
import { Form, InputGroup, Modal, Button } from "react-bootstrap";
import AlertMessage from "../common/AlertMessage";
import { updateUserPhoto, uploadUserPhoto } from "./ImageUploaderService";
import UseMessageAlerts from "../hooks/UseMessageAlerts";
import { getUserById } from "../user/UserService";

const ImageUploaderModal = ({ userId, show, handleClose }) => {
  // 1. get the user
  // 2. check if user already has a profile image
  // 3. if yes, the update the existing photo else create a new one
  const [file, setFile] = useState(null);
  const [user, setUser] = useState();
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

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

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

  const handleImageUpload = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("file", file);

      if (user && user.photo) {
        const reader = new FileReader();
        reader.readAsArrayBuffer(file);
        reader.onload = async (e) => {
          const fileBytes = new Uint8Array(e.target.result);
          const response = await updateUserPhoto(user.photoId, fileBytes); // Assuming you have a function to update the photo
          setSuccessMessage(response.data);
          window.location.reload(); // Reload the page to see the updated photo
          setShowSuccessAlert(true);
        };
      } else {
        const response = await uploadUserPhoto(userId, file); // Assuming you have a function to upload the photo
        setSuccessMessage(response.data);
        window.location.reload(); // Reload the page to see the updated photo
        setShowSuccessAlert(true);
      }
    } catch (error) {
      setErrorMessage(error.message);
      setShowErrorAlert(true);
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Upload Profile Photo</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {showErrorAlert && (
          <AlertMessage type={"danger"} message={errorMessage} />
        )}
        {showSuccessAlert && (
          <AlertMessage type={"success"} message={successMessage} />
        )}
        <Form>
          <h6>Select the photo you would like to display on your profile</h6>
          <InputGroup>
            <Form.Control type="file" onChange={handleFileChange} />
            <Button variant="secondary" onClick={handleImageUpload}>
              Upload
            </Button>
          </InputGroup>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default ImageUploaderModal;
