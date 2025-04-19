import React from "react";
import { Button, Col, Container, Form, InputGroup, Row } from "react-bootstrap";
import { formatAppointmentStatus } from "../utils/utilities";

const AppointmentFilter = ({
  statuses = [],
  selectedStatus,
  onSelectStatus,
  onClearFilters,
}) => {
  return (
    <Container className="mt-5">
      <Row>
        <Col xs={12} md={6}>
          <Form>
            <Form.Group>
              <Form.Label>Filter appointment by Status</Form.Label>
              <InputGroup>
                <Form.Select
                  value={selectedStatus}
                  onChange={(e) => onSelectStatus(e.target.value)}
                >
                  <option value="all">all</option>
                  {statuses.map((status, index) => (
                    <option key={index} value={status}>
                      {formatAppointmentStatus(status)}
                    </option>
                  ))}
                </Form.Select>
                <Button
                  variant="secondary"
                  type="button"
                  onClick={onClearFilters}
                >
                  Clear Filter
                </Button>
              </InputGroup>
            </Form.Group>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default AppointmentFilter;
