import React, { useState } from "react";
import UseMessageAlerts from "../hooks/UseMessageAlerts";
import DeleteConfirmationModal from "../modals/DeleteConfirmationModal";
import AlertMessage from "../common/AlertMessage";
import { Button, Table } from "react-bootstrap";
import EditablePetRow from "./EditablePetRow";
import { BsPencilFill, BsTrashFill } from "react-icons/bs";

const PetsTable = ({ pets, appointmentId, onPetsUpdate, isEditable }) => {
  const [editModeId, setEditModeId] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [petToDelete, setPetToDelete] = useState(null);

  const {
    successMessage,
    setSuccessMessage,
    errorMessage,
    setErrorMessage,
    showSuccessAlert,
    setShowSuccessAlert,
    showErrorAlert,
    setShowErrorAlert,
  } = UseMessageAlerts();

  const handleEditClick = (petId) => {
    setEditModeId(petId);
  };
  const handleCancel = () => {
    setEditModeId(null);
  };

  const handleShowDeleteModal = (petId) => {
    setPetToDelete(petId);
    setShowDeleteModal(true);
  };

  const handleDeletePet = async () => {
    if (petToDelete) {
      try {
        const response = await deletePet(petToDelete);
        setSuccessMessage(response.message);
        setShowDeleteModal(false);
        setShowSuccessAlert(true);
        onPetsUpdate(appointmentId);
      } catch (error) {
        setErrorMessage(error.message);
        setShowErrorAlert(true);
      }
    }
  };

  const handleSavePetUpdate = async (petId, updatedPet) => {
    try {
      const response = await updatePet(petId, updatedPet);
      setSuccessMessage(response.message);
      setEditModeId(null);
      setShowSuccessAlert(true);
    } catch (error) {
      setErrorMessage(error.message);
      setShowErrorAlert(true);
    }
  };
  return (
    <section>
      <DeleteConfirmationModal
        show={showDeleteModal}
        onHide={() => setShowDeleteModal(false)}
        onConfirm={handleDeletePet}
        itemToDelete={"pet"}
      />
      {showErrorAlert && (
        <AlertMessage type={"danger"} message={errorMessage} />
      )}
      {showSuccessAlert && (
        <AlertMessage type={"success"} message={successMessage} />
      )}

      <Table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Type</th>
            <th>Breed</th>
            <th>Color</th>
            <th>Age</th>
            <th colSpan={3}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(pets) &&
            pets.map((pet, index) =>
              editModeId === pet.id ? (
                <EditablePetRow
                  key={index}
                  pet={pet}
                  index={index}
                  onSave={handleSavePetUpdate}
                  onCancel={handleCancel}
                />
              ) : (
                <tr key={pet.id}>
                  <td>{pet.name}</td>
                  <td>{pet.type}</td>
                  <td>{pet.breed}</td>
                  <td>{pet.color}</td>
                  <td>{pet.age}</td>

                  <React.Fragment>
                    <td>
                      <Button
                        className="btn btn-sm btn-warning"
                        disabled={!isEditable}
                        onClick={() => handleEditClick(pet.id)}
                      >
                        <BsPencilFill />
                      </Button>
                    </td>
                    <td>
                      <Button
                        className="btn btn-sm btn-danger"
                        disabled={!isEditable}
                        onClick={() => handleShowDeleteModal(pet.id)}
                      >
                        <BsTrashFill />
                      </Button>
                    </td>
                  </React.Fragment>
                </tr>
              )
            )}
        </tbody>
      </Table>
    </section>
  );
};

export default PetsTable;
