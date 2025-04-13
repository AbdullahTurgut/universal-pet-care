import React from "react";
import { Accordion, Col, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import UserImage from "../common/UserImage";
import placeholder from "../../assets/images/placeholder.jpg";

const VeterinarianCard = ({ veterinarian }) => {
  return (
    <Col key={veterinarian.id} className="mb-4 xs={12}">
      <Accordion>
        <Accordion.Item eventKey="0">
          <Accordion.Header>
            <div className="d-flex align-item-center">
              <Link>
                <UserImage
                  userId={veterinarian.id}
                  userPhoto={veterinarian.photo}
                  placeholder={placeholder}
                />
              </Link>
            </div>
            <div>
              <Card.Title className="title">
                Dr. {veterinarian.firstName} {veterinarian.lastName}
              </Card.Title>
              <Card.Title>
                <h6>{veterinarian.specialization}</h6>
              </Card.Title>
              <Card.Text className="review rating-stars">
                Reviews: Some stars
              </Card.Text>
              <Link
                to={`/book-appointment/${veterinarian.id}/new-appointment`}
                className="link"
              >
                Book appointment
              </Link>
            </div>
          </Accordion.Header>
          <Accordion.Body>
            <div>
              <Link
                to={`/veterinarian/${veterinarian.id}/veterinarian`}
                className="link-2"
              >
                See what people are saying about this veterinarian
              </Link>
              <span className="margin-left-space">
                Dr. {veterinarian.firstName}
              </span>
            </div>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </Col>
  );
};

export default VeterinarianCard;
