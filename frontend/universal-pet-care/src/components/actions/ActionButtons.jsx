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
    <Button
      variant={variant}
      size="sm"
      disabled={disabled || isProcessing}
      onClick={onClick}
      className={className}
    >
      {isProcessing ? "Processing..." : title}
    </Button>
  );
};

export default ActionButtons;
