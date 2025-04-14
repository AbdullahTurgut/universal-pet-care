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
      setPetTypes([...specializations, newItem]);
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
          <option value="">Select Specialization</option>
          <option value="add-new-specialization">
            Add a new Specialization
          </option>
          {specializations.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </Form.Control>
      </Form.Group>
      <AddItemModal
        show={showModal}
        handleClose={() => setShowModal(false)}
        handleSave={handleSaveSpecialization}
        itemLabel={"Type"}
      />
    </React.Fragment>
  );
};

export default VetSpecializationSelector;
