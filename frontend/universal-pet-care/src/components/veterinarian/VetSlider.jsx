import React from "react";
import { Card, Carousel, Col, Row } from "react-bootstrap";
import RatingStars from "../rating/RatingStars";
import { Link } from "react-router-dom";
import placeholderImage from "../../assets/images/placeholder.jpg";

export const VetSlider = ({ veterinarians }) => {
  return (
    <main>
      <Carousel interval={3000} indicators={true} controls={true}>
        {veterinarians &&
          veterinarians.map((veterinarian, index) => (
            <Carousel.Item key={index}>
              <Row className="align-items-center">
                <Col xs={12} md={4} className="text-center">
                  <Card.Img
                    src={
                      veterinarian.photo
                        ? `data:image/png;base64,${veterinarian.photo}`
                        : placeholderImage
                    }
                    alt={"photo"}
                    style={{
                      maxWidth: "400px",
                      maxHeight: "400px",
                      objectFit: "contain",
                    }}
                  />
                </Col>
                <Col xs={12} md={8}>
                  <div>
                    <RatingStars rating={veterinarian.averageRating} />
                  </div>
                  <div>
                    <p className="text-success">
                      Dr. {`${veterinarian.firstName} ${veterinarian.lastName}`}
                    </p>
                  </div>
                  <p>{veterinarian.specialization}</p>
                  <p>
                    <span className="text-info">
                      Dr. {`${veterinarian.firstName} ${veterinarian.lastName}`}{" "}
                      is a {veterinarian.specialization}
                    </span>
                    <br />
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                    Maiores illum, enim delectus ea dolore repellendus, sint
                    tempore aliquid consequatur distinctio, minima harum. Rem
                    similique recusandae ea quae, iste quibusdam molestiae!
                  </p>
                  <p>
                    {" "}
                    <Link
                      className="me-3 link-2"
                      to={`/vet-reviews/${veterinarian.id}/veterinarian`}
                    >
                      What are people saying about
                    </Link>
                    Dr. {`${veterinarian.firstName} ${veterinarian.lastName}`}
                  </p>
                  <p>
                    <Link className="me-3" to={"/doctors"}>
                      Meet all veterinarians
                    </Link>
                  </p>
                </Col>
              </Row>
            </Carousel.Item>
          ))}
      </Carousel>
    </main>
  );
};
