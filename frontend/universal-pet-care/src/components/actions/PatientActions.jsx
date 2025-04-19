import React, { useState } from "react";
import ActionButtons from "./ActionButtons";
import AppointmentUpdateModal from "../modals/AppointmentUpdateModal";

const PatientActions = ({ onCancel, onUpdate, isDisabled, appointment }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);

  const handleActionClick = (actionType) => {
    setIsProcessing(true);
    try {
      if (actionType === "Update") {
        setShowUpdateModal(true);
        setIsProcessing(false);
      } else {
        onCancel(appointment.id);
        setIsProcessing(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdateAppointment = async (updatedAppointment) => {
    setIsProcessing(true);
    try {
      await onUpdate(updatedAppointment);
      handleCloseModal();
      setIsProcessing(false);
    } catch (error) {
      console.error(error);
      setIsProcessing(false);
    }
  };

  const handleCloseModal = () => {
    setShowUpdateModal(false);
    setIsProcessing(false);
  };

  return (
    <React.Fragment>
      <section className="d-flex justify-content-end gap-2 mt-2 mb-2">
        <ActionButtons
          title={"Update Appointment"}
          variant={"warning"}
          onClick={() => handleActionClick("Update")}
          disabled={isDisabled}
          isProcessing={isProcessing}
        />
        <ActionButtons
          title={"Cancel Appointment"}
          variant={"danger"}
          onClick={() => onCancel(appointment.id)}
          disabled={isDisabled}
          isProcessing={isProcessing}
        />
      </section>
      {showUpdateModal && (
        <AppointmentUpdateModal
          show={showUpdateModal}
          appointment={appointment}
          handleClose={handleCloseModal}
          handleUpdate={handleUpdateAppointment}
        />
      )}
    </React.Fragment>
  );
};

export default PatientActions;
