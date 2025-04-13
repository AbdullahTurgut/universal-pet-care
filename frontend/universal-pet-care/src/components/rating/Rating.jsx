import React, { useState } from "react";
import UseMessageAlerts from "../hooks/UseMessageAlerts";
import { Form } from "react-bootstrap";
import { FaStar } from "react-icons/fa";

const Rating = ({ veterinarianId, onReviewSubmit }) => {
  const [hover, setHover] = useState(null);
  const [reviewInfo, setReviewInfo] = useState({
    rating: null,
    feedback: null,
  });

  const [
    successMessage,
    setSuccessMessage,
    showSuccessAlert,
    setShowSuccessAlert,
    errorMessage,
    setErrorMessage,
    showErrorAlert,
    setShowErrorAlert,
  ] = UseMessageAlerts();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setReviewInfo((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await addReview(veterinarianId, reviewerId, reviewInfo);
      setSuccessMessage(response.data.message);
      setShowSuccessAlert(true);
      if (onReviewSubmit) {
        onReviewSubmit(); // Call the parent function with the new review
      }
    } catch (error) {
      setErrorMessage(error.response.data.message);
      setShowErrorAlert(true);
    }
  };

  return (
    <React.Fragment>
      <Form>
        <h3>Rate this doctor: </h3>
        <div>
          {[...Array(5)].map((_, index) => {
            const ratingValue = index + 1;
            return (
              <Form.Label key={index}>
                <Form.Check
                  type="radio"
                  name="rating"
                  value={ratingValue}
                  onChange={handleInputChange}
                  checked={reviewInfo.rating === ratingValue}
                  inline
                />
                <FaStar
                  size={20}
                  className="star"
                  color={
                    ratingValue <= (hover || reviewInfo.rating)
                      ? "#ffc107"
                      : "#e4e5e9"
                  }
                  onMouseEnter={() => setHover(ratingValue)}
                  onMouseLeave={() => setHover(null)}
                />
              </Form.Label>
            );
          })}
        </div>
      </Form>
    </React.Fragment>
  );
};

export default Rating;
