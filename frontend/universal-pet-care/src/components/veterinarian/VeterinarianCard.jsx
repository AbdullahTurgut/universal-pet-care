import React from "react";
import { Accordion, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import placeholder from "../../assets/images/placeholder.jpg";

const VeterinarianCard = ({ veterinarian }) => {
  return (
    <Col key={veterinarian.id} className="mb-4 xs={12}">
      <Accordion>
        <Accordion.Item eventKey="0">
          <Accordion.Header>
            <div className="d-flex align-item-center">
              <Link>
                {veterinarian.photo ? (
                  <Card.Img
                    src={`data:image/png;base64${veterinarian.photo}`}
                    className="user-image"
                    alt="User photo"
                  />
                ) : (
                  <Card.Img
                    src={placeholder}
                    className="user-image"
                    alt="User photo"
                  />
                )}
              </Link>
            </div>
            <div>
              <Card.Title className="title">
                Dr. {veterinarian.firstName} {veterinarian.lastName}
              </Card.Title>
              <Card.Title>
                <h6>{veterinarian.specialization}</h6>
              </Card.Title>
              <Card.Title className="review rating-stars">
                Reviews: Some stars
              </Card.Title>
              <Link to={""}>Book appointment</Link>
            </div>
          </Accordion.Header>
          <Accordion.Body>
            <div>
              <Link to={""} className="link-2">
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
