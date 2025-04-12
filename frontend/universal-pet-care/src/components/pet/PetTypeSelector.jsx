import React, { useEffect, useState } from "react";
import { Col, Form } from "react-bootstrap";
import AddItemModal from "../modals/AddItemModal";
import { getPetTypes } from "./PetService";

const PetTypeSelector = ({ value, onChange }) => {
  const [petTypes, setPetTypes] = useState([]);
  const [showModal, setShowModal] = useState(false);

  // Fetch existing pet types from the server or local storage
  useEffect(() => {
    const fetchPetTypes = async () => {
      try {
        const response = await getPetTypes();
        setPetTypes(response.data);
      } catch (error) {
        console.error(error.response.data.message);
      }
    };
    fetchPetTypes();
  }, []);

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
    if (newItem && !petTypes.includes(newItem)) {
      setPetTypes([...petTypes, newItem]);
      onChange({ target: { name: "petType", value: newItem } });
    }
  };
  return (
    <React.Fragment>
      <Form.Group as={Col} controlId="petType">
        <Form.Control
          as="select"
          name="petType"
          value={value}
          required
          onChange={handleTypeChange}
        >
          <option value="">Select Pet Type</option>
          <option value="add-new-type">Add a new Type</option>
          {petTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
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
