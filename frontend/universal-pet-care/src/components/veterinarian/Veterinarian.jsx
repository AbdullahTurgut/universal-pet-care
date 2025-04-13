import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import UseMessageAlerts from "../hooks/UseMessageAlerts";
import { Card, Col, Container, Row } from "react-bootstrap";
import UserImage from "../common/UserImage";
import { BsFillArrowRightSquareFill } from "react-icons/bs";
import RatingStars from "../rating/RatingStars";
import Rating from "../rating/Rating";
import Review from "../review/Review";

const Veterinarian = () => {
  const [veterinarian, setVeterinarian] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { veterinarianId } = useParams();
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

  const getUser = async () => {
    setIsLoading(true);
    try {
      const response = await getUserId(veterinarianId);
      setVeterinarian(response.data);
      setIsLoading(false);
    } catch (error) {
      setErrorMessage(error.response.data.message);
      setShowErrorAlert(true);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  return (
    <Container>
      <Card>
        <Row>
          <Col>
            <UserImage
              userId={veterinarian.id}
              userPhoto={veterinarian.photo}
              altText={`${veterinarian.firstName}'s photo`}
            />
          </Col>
          <Col>
            <Link to={"/doctors"}>
              <BsFillArrowRightSquareFill /> back to veterinarians
            </Link>
          </Col>
        </Row>
        <Card.Body>
          <Card.Title>
            Dr. {veterinarian.firstName} {veterinarian.lastName}
          </Card.Title>
          <Card.Title>
            Specialization : {veterinarian.specialization}
          </Card.Title>

          {veterinarian.averageRating > 0 && (
            <Card.Text className="rating-stars">
              Ratings: (
              {veterinarian.averageRating > 0
                ? Number(veterinarian.averageRating.toFixed(1))
                : "0.0"}
              ) stars
              <RatingStars rating={veterinarian.averageRating} /> rated by (
              {veterinarian.totalReviewers || 0}{" "}
              {veterinarian.totalReviewers === 1 ? "person" : "people"}){" "}
            </Card.Text>
          )}
          <Link
            to={`/book-appointment/${veterinarian.id}/new-appointment`}
            className="link"
          >
            Book Appointment
          </Link>
          <hr />
          <p className="about">
            About Dr. {veterinarian.firstName} {veterinarian.lastName}
          </p>
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit.
            Architecto, perferendis. Quis adipisci delectus vero exercitationem
            nam nulla a nobis, natus suscipit veniam temporibus, ipsum, dolore
            aut repudiandae laudantium eveniet quae.
          </p>
          <hr />
          <Rating veterinarianId={veterinarian.id} onReviewSubmit={null} />
          <h4 className="text-center mb-4">Reviews</h4>
          <hr />

          {/* Render paginated reviews */}
          {veterinarian && veterinarian.reviews.length > 0 ? (
            veterinarian.reviews.map((review) => (
              <Review
                key={review.id}
                review={review}
                userType={veterinarian.userType}
              />
            ))
          ) : (
            <p>No reviews yet.</p>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Veterinarian;
