import React from "react";
import { Button, Form, InputGroup } from "react-bootstrap";

export const VetFilter = ({
  specializations = [],
  selectedSpecialization,
  onSpecializationChange,
  onClearFilters,
}) => {
  return (
    <InputGroup className="mb-4">
      <InputGroup.Text>Filter by Specialization</InputGroup.Text>
      <Form.Select
        className="form-control"
        value={selectedSpecialization}
        onChange={(e) => onSpecializationChange(e.target.value)}
      >
        <option>Select specialization</option>
        {specializations.map((specialization, index) => (
          <option key={index} value={specialization}>
            {specialization}
          </option>
        ))}
      </Form.Select>
      <Button variant="secondary" onClick={onClearFilters}>
        Clear Filter
      </Button>
    </InputGroup>
  );
};
