import React, { useState } from "react";
import ActionButtons from "./ActionButtons";

const PatientActions = ({ onCancel, onUpdate, isDisabled }) => {
  const [isProcessing, setIsProcessing] = useState(false);

  const handleActionClick = (actionType) => {
    setIsProcessing(true);
    if (actionType === "Update") {
      onUpdate()
        .then(() => {
          setIsProcessing(false);
        })
        .catch(() => {
          setIsProcessing(false);
        });
    } else {
      onCancel()
        .then(() => {
          setIsProcessing(false);
        })
        .catch(() => {
          setIsProcessing(false);
        });
    }
  };
  return (
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
        onClick={() => handleActionClick("Cancel")}
        disabled={isDisabled}
        isProcessing={isProcessing}
      />
    </section>
  );
};

export default PatientActions;
