import React, { useEffect, useState } from "react";
import { Col, Form } from "react-bootstrap";
import AddItemModal from "../modals/AddItemModal";
import { getPetBreeds } from "./PetService";

const PetBreedSelector = ({ petType, value, onChange }) => {
  const [petBreeds, setPetBreeds] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (petType) {
      const fetchPetBreeds = async () => {
        try {
          const response = await getPetBreeds(petType);
          //console.log(response.data);
          setPetBreeds(response.data);
        } catch (error) {
          console.error(error.response.data.message);
        }
      };
      fetchPetBreeds();
    } else {
      setPetBreeds([]);
    }
  }, [petType]);

  // 1. handle Breed Change
  const handleBreedChange = (e) => {
    if (e.target.value === "add-new-breed") {
      setShowModal(true);
    } else {
      onChange(e);
    }
  };
  // handle save item
  const handleSaveNewBreedItem = (newItem) => {
    if (newItem && !petBreeds.includes(newItem)) {
      setPetBreeds([...petBreeds, newItem]);
      onChange({ target: { name: "petBreed", value: newItem } });
    }
  };
  return (
    <React.Fragment>
      <Form.Group as={Col} controlId="petBreed">
        <Form.Control
          as="select"
          name="petBreed"
          value={value}
          required
          onChange={handleBreedChange}
        >
          <option value="">Select Pet Breed</option>
          <option value="add-new-breed">Add a new Breed</option>

          {petBreeds.map((breed) => (
            <option key={breed} value={breed}>
              {breed}
            </option>
          ))}
        </Form.Control>
      </Form.Group>
      <AddItemModal
        show={showModal}
        handleClose={() => setShowModal(false)}
        handleSave={handleSaveNewBreedItem}
        itemLabel={"Breed"}
      />
    </React.Fragment>
  );
};

export default PetBreedSelector;
