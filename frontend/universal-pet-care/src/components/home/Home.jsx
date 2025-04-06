import React from "react";
import d5 from "../../assets/images/d5.jpg";
import { Container, Col, Row, Button, Card, ListGroup } from "react-bootstrap";

const Home = () => {
  return (
    <Container className="home-container mt-5">
      <Row>
        <Col md={6} className="mb-3">
          <Card>
            <Card.Img
              variant="top"
              src={d5}
              alt="About Us"
              className="hero-image"
            />
            <Card.Body>
              <h2 className="text-info">Who we are</h2>
              <Card.Title>Comprehensive Care for your Furry Friends</Card.Title>
              <Card.Text className="mt-4">
                Your pet deserves the best — and we're here to help make that
                happen. At Universal Pet Care, we provide a full range of
                services to keep your furry friends healthy, happy, and loved.
                From regular vet check-ups to grooming, training, and
                personalized wellness plans, we have got everything your pet
                needs under one roof.From regular vet check-ups to grooming,
                training, and personalized wellness plans, we have got
                everything your pet needs under one roof.
              </Card.Text>
              <Card.Text className="mt-4">
                Your pet deserves the best — and we're here to help make that
                happen. At Universal Pet Care, we provide a full range of
                services to keep your furry friends healthy, happy, and loved.
                From regular vet check-ups to grooming, training, and
                personalized wellness plans, we have got everything your pet
                needs under one roof.From regular vet check-ups to grooming,
                training, and personalized wellness plans, we have got
                everything your pet needs under one roof.
              </Card.Text>

              <Button variant="outline-info">Meet Our Veterinarians</Button>
            </Card.Body>
          </Card>
        </Col>

        <Col md={6} className="mb-3">
          <Card>
            <Card.Img
              variant="top"
              src={d5}
              alt="About Us"
              className="hero-image"
            />
            <Card.Body>
              <h2 className="text-info">Our Services</h2>
              <Card.Title>What we do</Card.Title>
              <ListGroup className="services-list">
                <ListGroup.Item>Veterinarian Check-ups</ListGroup.Item>
                <ListGroup.Item>Emergency Surgery</ListGroup.Item>
                <ListGroup.Item>Pet Vaccinations</ListGroup.Item>
                <ListGroup.Item>Dental Care</ListGroup.Item>
                <ListGroup.Item>Spaying and Neutering</ListGroup.Item>
                <ListGroup.Item>And many more...</ListGroup.Item>
              </ListGroup>
              <Card.Text className="mt-3">
                From routine check-ups to emergency surgery, our full range of
                veterinary services ensures your pet's health is in good hands.
              </Card.Text>
              <Button variant="outline-info">Meet Our Veterinarians</Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <div className="card mb-5">
        <h4>
          What people are saying about{" "}
          <span className="text-info">Universal Pet Care</span> Veterinarians
        </h4>
        <hr />
        <p className="text-center">
          Here, we are going to sliding veterinarians across
        </p>
      </div>
    </Container>
  );
};

export default Home;
