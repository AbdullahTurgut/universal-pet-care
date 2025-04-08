import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import VeterinarianCard from "./VeterinarianCard";

const VeterinarianListing = () => {
  const [veterinarians, setVeterinarians] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  // call all the veterinarians from the backend
  useEffect(() => {
    getVeterinarians()
      .then((data) => {
        setVeterinarians(data);
      })
      .catch((error) => {
        setErrorMessage(error.message);
      });
  }, []);

  if (veterinarians.length === 0) {
    return <p>No veterinarians found at this time</p>;
  }
  return (
    <Row>
      <h6>Meet Our Veterinarians</h6>
      <Col>
        <Container>
          <Row>
            <h5>The search goes here</h5>
          </Row>
        </Container>
      </Col>
      <Col>
        <Container>
          <Row>
            {veterinarians.map((veterinarian, index) => (
              <VeterinarianCard key={index} veterinarian={veterinarian} />
            ))}
          </Row>
        </Container>
      </Col>
    </Row>
  );
};

export default VeterinarianListing;
