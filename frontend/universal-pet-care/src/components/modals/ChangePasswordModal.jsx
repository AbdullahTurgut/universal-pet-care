import React, { useState } from "react";
import { eyeOff } from "react-icons-kit/feather";
import UseMessageAlerts from "../hooks/UseMessageAlerts";

const ChangePasswordModal = () => {
  const [type, setType] = useState("password");
  const { icon, setIcon } = useState(eyeOff);

  const [password, setPassword] = useState({
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
    setPassword((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return <div>ChangePasswordModal</div>;
};

export default ChangePasswordModal;
