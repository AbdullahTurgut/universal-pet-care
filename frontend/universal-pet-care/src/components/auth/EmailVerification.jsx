import React, { useEffect, useState } from "react";
import { verifyEmail } from "./AuthService";
import ProcessSpinner from "../common/ProcessSpinner";

export const EmailVerification = () => {
  const [verificationMessage, setVerificationMessage] = useState(
    "Verifying your email, please wait..."
  );

  const [alertType, setAlertType] = useState("alert-info");
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const token = queryParams.get("token");
    if (token) {
      verifyEmailToken(token);
    } else if (!token) {
      setVerificationMessage("No token provided.");
      setAlertType("alert-danger");
    }
  }, []);

  const verifyEmailToken = async (token) => {
    setIsProcessing(true);
    try {
      const response = await verifyEmail(token);
      switch (response.message) {
        case "Valid":
          setVerificationMessage(
            "Your email has been successfully verified, you can proceed to Login."
          );
          setAlertType("alert-success");
          break;
        case "Verified":
          setVerificationMessage(
            "This email has already been verified, please proceed to Login."
          );
          setAlertType("alert-info");
          break;
        default:
          setVerificationMessage("An unexpected error occurred.");
          setAlertType("alert-danger");
      }
    } catch (error) {
      if (error.message) {
        const { message } = error.response.data;

        if (message && message === "Invalid") {
          setVerificationMessage("This verification link is invalid.");
          setAlertType("alert-danger");
        } else {
          setVerificationMessage(
            "This verification link has expired, please try again"
          );
        }
        setAlertType("alert-warning");
      } else {
        setVerificationMessage("Failed to connect to the server.");
        setAlertType("alert-danger");
      }
    } finally {
      setIsProcessing(false); // Stop loading regardless of the outcome
    }
  };
  return (
    <div className="d-flex justify-content-center mt-lg-5">
      {isProcessing ? (
        <ProcessSpinner message="Processing your request, please wait..." />
      ) : (
        <div className="col-12 col-md-6">
          <div className={`alert ${alertType}`} role="alert">
            {verificationMessage}
          </div>
        </div>
      )}
    </div>
  );
};
