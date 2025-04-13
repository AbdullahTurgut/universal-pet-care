import React, { useState } from "react";
import UseMessageAlerts from "../hooks/UseMessageAlerts";
import { Button, Form } from "react-bootstrap";
import { FaStar } from "react-icons/fa";
import AlertMessage from "../common/AlertMessage";

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
      {showErrorAlert && (
        <AlertMessage type={"danger"} message={errorMessage} />
      )}
      {showSuccessAlert && (
        <AlertMessage type={"success"} message={successMessage} />
      )}
      <Form onSubmit={handleSubmit}>
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
        <div>
          <Form.Control
            as="textarea"
            rows={4}
            value={reviewInfo.feedback}
            required
            onChange={handleInputChange}
            placeholder="Write your feedback here..."
          />
        </div>
        <div>
          <Button variant="secondary">Submit Review</Button>
        </div>
        <p>
          You have rated this doctor with{" "}
          <span style={{ color: "orange" }}>{reviewInfo.rating} stars</span>
        </p>
      </Form>
    </React.Fragment>
  );
};

export default Rating;
