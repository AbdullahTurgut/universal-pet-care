import { useEffect, useState } from "react";
import { format } from "date-fns";

export const useAlertWithTimeout = (
  initialVisibility = false,
  duration = 10000
) => {
  const [isVisible, setIsVisible] = useState(initialVisibility);

  useEffect(() => {
    let timer;
    if (isVisible) {
      timer = setTimeout(() => {
        setIsVisible(false);
      }, duration);
    }
    return () => clearTimeout(timer);
  }, [isVisible, duration]);

  return [isVisible, setIsVisible];
};

/**
 * Formats the given date and time
 * @param {Date | string} date - The date to format
 * @param {Date | string} time - The time to format
 * @returns {Object} An object containing the formatted date and time
 */

export const formatDateAndTime = (date, time) => {
  const formattedDate = format(date, "yyyy-MM-dd");
  const formattedTime = format(time, "HH:mm");

  return { formattedDate, formattedTime };
};

/* enum constants converter */
export const formatAppointmentStatus = (status) => {
  return status.toLowerCase().replace(/_/g, "-");
};

export const UserType = {
  PATIENT: "PATIENT",
  VET: "VET",
};
