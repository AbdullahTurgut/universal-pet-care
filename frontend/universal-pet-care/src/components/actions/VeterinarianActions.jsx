import React, { useState } from "react";
import ActionButtons from "./ActionButtons";

const VeterinarianActions = ({ onApprove, onDecline, isDisabled }) => {
  const [isProcessing, setIsProcessing] = useState(false);

  const handleActionClick = (actionType) => {
    setIsProcessing(true);
    if (actionType === "Approve") {
      onApprove()
        .then(() => {
          setIsProcessing(false);
        })
        .catch(() => {
          setIsProcessing(false);
        });
    } else {
      onDecline()
        .then(() => {
          setIsProcessing(false);
        })
        .catch(() => {
          setIsProcessing(false);
        });
    }
  };

  return (
    <section>
      <ActionButtons
        title={"Decline Appointment"}
        variant={"danger"}
        onClick={() => handleActionClick("Decline")}
        disabled={isDisabled}
        isProcessing={isProcessing}
      />
      <ActionButtons
        title={"Approve Appointment"}
        variant={"danger"}
        onClick={() => handleActionClick("Approve")}
        disabled={isDisabled}
        isProcessing={isProcessing}
      />
    </section>
  );
};

export default VeterinarianActions;
