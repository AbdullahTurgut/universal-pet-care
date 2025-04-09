import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import VeterinarianCard from "./VeterinarianCard";
import { getVeterinarians } from "./VeterinarianService";
import VeterinarianSearch from "./VeterinarianSearch";

const VeterinarianListing = () => {
  const [veterinarians, setVeterinarians] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  // call all the veterinarians from the backend
  useEffect(() => {
    getVeterinarians()
      .then((data) => {
        setVeterinarians(data.data);
      })
      .catch((error) => {
        setErrorMessage(error.message);
      });
  }, []);

  if (veterinarians.length === 0) {
    return <p>No veterinarians found at this time</p>;
  }

  const handleSearchResult = (searchResult) => {};
  return (
    <Container>
      <Row className="justify-content-center">
        <h2 className="text-center mb-4 mt-4">Meet Our Veterinarians</h2>
      </Row>
      <Row className="justify-content-center">
        <Col md={4}>
          <VeterinarianSearch onSearchResult={handleSearchResult} />
        </Col>
        <Col md={7}>
          {veterinarians.map((veterinarian, index) => (
            <VeterinarianCard key={index} veterinarian={veterinarian} />
          ))}
        </Col>
      </Row>
    </Container>
  );
};

export default VeterinarianListing;
