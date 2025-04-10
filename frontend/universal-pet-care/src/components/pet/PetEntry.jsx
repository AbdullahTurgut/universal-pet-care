import React from "react";
import {
  Button,
  Col,
  Form,
  OverlayTrigger,
  Row,
  Tooltip,
} from "react-bootstrap";
import PetColorSelector from "./PetColorSelector";
import PetTypeSelector from "./PetTypeSelector";
import PetBreedSelector from "./PetBreedSelector";
import { FaMinus } from "react-icons/fa";

const PetEntry = ({ pet, index, removePet, canRemove, handleInputChange }) => {
  return (
    <fieldset>
      <legend className="legend">{`Pet #${index + 1} details`}</legend>
      <Form.Group>
        <Form.Control
          type="text"
          name="petName"
          id={`petName - ${index}`}
          value={pet.petName}
          placeholder="Enter pet name"
          onChange={handleInputChange}
          required
        />

        <Form.Control
          type="number"
          name="petAge"
          id="petAge"
          value={pet.petAge}
          placeholder="Enter pet age"
          onChange={handleInputChange}
          required
        />
      </Form.Group>

      <Form.Group as={Col} className="mb-2">
        <PetColorSelector value={pet.petColor} onChange={handleInputChange} />
      </Form.Group>

      <fieldset className="field-set">
        <legend className="legend">Pet Type and Breed</legend>
        <Form.Group as={Row} className="mb-2 d-flex">
          <Col>
            <PetTypeSelector value={pet.petType} onChange={handleInputChange} />
          </Col>
          <Col>
            <PetBreedSelector
              petType={pet.petType}
              value={pet.petBreed}
              onChange={handleInputChange}
            />
          </Col>
        </Form.Group>
      </fieldset>
      {canRemove && (
        <div className="d-flex justify-content-end mt-2">
          <OverlayTrigger overlay={<Tooltip>remove pets</Tooltip>}>
            <Button variant="danger" size="sm" onClick={() => removePet(index)}>
              <FaMinus />
            </Button>
          </OverlayTrigger>
        </div>
      )}
    </fieldset>
  );
};

export default PetEntry;
