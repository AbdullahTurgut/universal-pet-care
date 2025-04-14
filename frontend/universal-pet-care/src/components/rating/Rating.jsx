import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { FaStar } from "react-icons/fa";
import AlertMessage from "../common/AlertMessage";
import UseMessageAlerts from "../hooks/UseMessageAlerts";
import { addReview } from "../review/ReviewService";

const Rating = ({ veterinarianId, onReviewSubmit }) => {
  const [hover, setHover] = useState(null);
  const [rating, setRating] = useState(null);
  const [feedback, setFeedback] = useState("");

  const reviewerId = 4;

  const {
    successMessage,
    setSuccessMessage,
    showSuccessAlert,
    setShowSuccessAlert,
    errorMessage,
    setErrorMessage,
    showErrorAlert,
    setShowErrorAlert,
  } = UseMessageAlerts();

  /*const handleInputChange = (e) => {
    const { name, value } = e.target;
    setReviewInfo((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }; */

  const handleRatingChange = (value) => {
    setRating(value);
  };

  const handleFeedbackChange = (e) => {
    setFeedback(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const reviewInfo = {
      stars: rating,
      feedback: feedback,
    };

    try {
      const response = await addReview(veterinarianId, reviewerId, reviewInfo);
      setSuccessMessage(response.message);
      setShowSuccessAlert(true);
      if (onReviewSubmit) {
        onReviewSubmit(); // Call the parent function with the new review
      }
    } catch (error) {
      setErrorMessage(error.message);
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
        <div className="mb-2">
          {[...Array(5)].map((_, index) => {
            const ratingValue = index + 1;
            return (
              <Form.Label key={index} className="me-2">
                <Form.Check
                  type="radio"
                  name="rating"
                  value={ratingValue}
                  onChange={() => handleRatingChange(ratingValue)}
                  checked={rating === ratingValue}
                  inline
                />
                <FaStar
                  size={20}
                  className="star"
                  color={
                    ratingValue <= (hover || rating) ? "#ffc107" : "#e4e5e9"
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
            value={feedback}
            required
            onChange={handleFeedbackChange}
            placeholder="Write your feedback here..."
          />
        </div>
        <div className="mt-2">
          <Button type="submit" variant="outline-primary">
            Submit Review
          </Button>
        </div>
        <p>
          You have rated this doctor with{" "}
          <span style={{ color: "orange" }}>{rating} stars</span>
        </p>
      </Form>
    </React.Fragment>
  );
};

export default Rating;
