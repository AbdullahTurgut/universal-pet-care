import React, { useState } from "react";
import { Col, Form } from "react-bootstrap";
import AddItemModal from "../modals/AddItemModal";

const PetColorSelector = ({ value, onChange }) => {
  const [petColors, setPetColors] = useState([]);
  const [showModal, setShowModal] = useState(false);

  // 1. handle Color Change
  const handleColorChange = (e) => {
    if (e.target.value === "add-new-item") {
      setShowModal(true);
    } else {
      onChange(e);
    }
  };
  // handle save item
  const handleSaveNewItem = (newItem) => {
    if (newItem && !petColors.includes(newItem)) {
      setPetColors([...petColors, newItem]);
      onChange({ target: { name: "petColor", value: newItem } });
    }
  };
  return (
    <React.Fragment>
      <Form.Group as={Col} controlId="petColor">
        <Form.Control
          as="select"
          name="petColor"
          value={value}
          required
          onChange={handleColorChange}
        >
          <option value="">Select Pet Color</option>
          <option value="add-new-item">Add a new Color</option>
          <option value="White">White</option>
        </Form.Control>
      </Form.Group>
      <AddItemModal
        show={showModal}
        handleClose={() => setShowModal(false)}
        handleSave={handleSaveNewItem}
        itemLabel={"Color"}
      />
    </React.Fragment>
  );
};

export default PetColorSelector;
