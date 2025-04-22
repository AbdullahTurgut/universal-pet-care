import React, { useState } from "react";
import { Form } from "react-bootstrap";

export const VetEditableRows = ({ vet, onSave, onCancel }) => {
  const [editedVet, setEditedVet] = useState(vet);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedVet((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSave = () => {
    onSave(vet.id, editedVet, onCancel);
  };
  return (
    <tr>
      <td>
        <Form.Control
          type="text"
          name="firstName"
          value={editedVet.firstName}
          onChange={handleInputChange}
        />
      </td>
      <td>
        <Form.Control
          type="text"
          name="lastName"
          value={editedVet.lastName}
          onChange={handleInputChange}
        />
      </td>
    </tr>
  );
};
