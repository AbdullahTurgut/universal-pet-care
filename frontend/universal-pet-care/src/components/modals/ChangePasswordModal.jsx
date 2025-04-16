import React, { useState } from "react";
import UseMessageAlerts from "../hooks/UseMessageAlerts";
import { Button, Form, InputGroup, Modal } from "react-bootstrap";
import { changeUserPassword } from "../user/UserService";
import AlertMessage from "../common/AlertMessage";

const ChangePasswordModal = ({ userId, show, handleClose }) => {
  const [type, setType] = useState("password");
  const { icon, setIcon } = useState(null);

  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
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
    setPasswords((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await changeUserPassword(
        userId,
        passwords.currentPassword,
        passwords.newPassword,
        passwords.confirmNewPassword
      );
      console.log(response);
      setSuccessMessage(response.message);
      handleReset();
      setShowSuccessAlert(true);
    } catch (error) {
      console.error(error);
      setErrorMessage(error.response.data.message);
      setShowErrorAlert(true);
    }
  };
  /*
  const handleShowPassword = () => {
    if (type === "password") {
      setType("text");
      setIcon(eye);
    } else {
      setType("password");
      setIcon(eyeOff);
    }
  };
*/
  const handleReset = () => {
    setPasswords({
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    });
    setShowErrorAlert(false);
    setShowSuccessAlert(false);
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Change Password</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {showErrorAlert && (
          <AlertMessage type={"danger"} message={errorMessage} />
        )}
        {showSuccessAlert && (
          <AlertMessage type={"success"} message={successMessage} />
        )}
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="currentPassword">
            <Form.Label>Current Password</Form.Label>
            <InputGroup>
              <Form.Control
                type={type}
                name="currentPassword"
                value={passwords.currentPassword}
                onChange={handleInputChange}
                placeholder="Enter current password"
              />
              {/*<InputGroup.Text onClick={handleShowPassword}>
                <Icon icon={icon} />
              </InputGroup.Text> */}
            </InputGroup>
          </Form.Group>

          <Form.Group controlId="newPassword" className="mb-2">
            <Form.Label>New Password</Form.Label>
            <Form.Control
              type={type}
              name="newPassword"
              value={passwords.newPassword}
              onChange={handleInputChange}
              placeholder="Enter new password"
            />
          </Form.Group>
          <Form.Group controlId="confirmNewPassword" className="mb-2">
            <Form.Label>Confirm New Password</Form.Label>
            <Form.Control
              type={type}
              name="confirmNewPassword"
              value={passwords.confirmNewPassword}
              onChange={handleInputChange}
              placeholder="Confirm new password"
            />
          </Form.Group>
          <div className="d-flex justify-content-center mt-4">
            <div className="mx-2">
              <Button variant="secondary" size="sm" type="submit">
                Change Password
              </Button>
            </div>
            <div className="mx-2 mb-4">
              <Button variant="danger" size="sm" onClick={handleReset}>
                Reset
              </Button>
            </div>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default ChangePasswordModal;
