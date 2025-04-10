import React, { useState } from "react";
import { Form } from "react-bootstrap";
import AddItemModal from "../modals/AddItemModal";

const PetTypeSelector = ({ value, onChange }) => {
  const [petType, setPetType] = useState([]);
  const [showModal, setShowModal] = useState(false);

  // 1. handle Type Change
  const handleTypeChange = (e) => {
    if (e.target.value === "add-new-type") {
      setShowModal(true);
    } else {
      onChange(e);
    }
  };
  // handle save item
  const handleSaveNewTypeItem = (newItem) => {
    if (newItem && !petType.includes(newItem)) {
      setPetType([...petType, newItem]);
      onChange({ target: { name: "petType", value: newItem } });
    }
  };
  return (
    <React.Fragment>
      <Form.Group>
        <Form.Control
          as="select"
          name="petType"
          value={value}
          required
          onChange={handleTypeChange}
        >
          <option value="">Select Pet Type</option>
          <option value="add-new-type">Add a new Type</option>
          <option value="Type">Type</option>
        </Form.Control>
      </Form.Group>
      <AddItemModal
        show={showModal}
        handleClose={() => setShowModal(false)}
        handleSave={handleSaveNewTypeItem}
        itemLabel={"Type"}
      />
    </React.Fragment>
  );
};

export default PetTypeSelector;
