import React from "react";
import { Button } from "react-bootstrap";

const ActionButtons = ({
  title,
  variant,
  onClick,
  disabled,
  isProcessing,
  className = " ",
}) => {
  return (
    <div className="d-flex justify-content-end gap-2 mt-2 mb-2">
      <Button
        variant={variant}
        size="sm"
        disabled={disabled || isProcessing}
        onClick={onClick}
        className={className}
      >
        {isProcessing ? "Processing..." : title}
      </Button>
    </div>
  );
};

export default ActionButtons;
