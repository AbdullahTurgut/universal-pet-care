import React, { useEffect, useState } from "react";
import { Col, Form } from "react-bootstrap";
import AddItemModal from "../modals/AddItemModal";
import { getSpecializations } from "../veterinarian/VeterinarianService";

const VetSpecializationSelector = ({ value, onChange }) => {
  const [specializations, setSpecializations] = useState([]);
  const [showModal, setShowModal] = useState(false);

  // Fetch existing pet types from the server or local storage
  useEffect(() => {
    const fetchSpecializations = async () => {
      try {
        const response = await getSpecializations();
        setSpecializations(response.data);
      } catch (error) {
        console.error(error.response.data.message);
      }
    };
    fetchSpecializations();
  }, []);

  // 1. handle Type Change
  const handleSpecializationChange = (e) => {
    if (e.target.value === "add-new-specialization") {
      setShowModal(true);
    } else {
      onChange(e);
    }
  };
  // handle save item
  const handleSaveSpecialization = (newItem) => {
    if (newItem && !specializations.includes(newItem)) {
      setSpecializations([...specializations, newItem]);
      onChange({ target: { name: "specialization", value: newItem } });
    }
  };
  return (
    <React.Fragment>
      <Form.Group as={Col} controlId="specialization">
        <Form.Control
          as="select"
          name="specialization"
          value={value}
          required
          onChange={handleSpecializationChange}
        >
          <option value="">...select specialization...</option>
          {specializations.map((specialization) => (
            <option key={specialization} value={specialization}>
              {specialization}
            </option>
          ))}
          <option value="add-new-specialization">Add a new</option>
        </Form.Control>
      </Form.Group>
      <AddItemModal
        show={showModal}
        handleClose={() => setShowModal(false)}
        handleSave={handleSaveSpecialization}
        itemLabel={"specialization"}
      />
    </React.Fragment>
  );
};

export default VetSpecializationSelector;
