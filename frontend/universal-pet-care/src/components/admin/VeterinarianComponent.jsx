import React, { useEffect, useState } from "react";
import UseMessageAlerts from "../hooks/UseMessageAlerts";
import DeleteConfirmationModal from "../modals/DeleteConfirmationModal";
import { Col, OverlayTrigger, Row, Table, Tooltip } from "react-bootstrap";
import AlertMessage from "../common/AlertMessage";
import { Link } from "react-router-dom";
import {
  BsEyeFill,
  BsLockFill,
  BsPencilFill,
  BsPlusSquareFill,
  BsTrashFill,
  BsUnlockFill,
} from "react-icons/bs";
import { getVeterinarians } from "../veterinarian/VeterinarianService";
import {
  deleteUser,
  lockUserAccount,
  unlockUserAccount,
  updateUser,
} from "../user/UserService";
import { VetEditableRows } from "../veterinarian/VetEditableRows";
import { UserFilter } from "../user/UserFilter";
import Paginator from "../common/Paginator";

export const VeterinarianComponent = () => {
  const [veterinarians, setVeterinarians] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [vetToDelete, setVetToDelete] = useState(null);
  const [editVetId, setEditVetId] = useState(null);
  const [filteredVets, setFilteredVets] = useState([]);
  const [selectedSpecialization, setSelectedSpecialization] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [vetsPerPage] = useState(7);

  const indexOfLastVet = currentPage * vetsPerPage;
  const indexOfFirstVet = indexOfLastVet - vetsPerPage;
  const currentVets = filteredVets.slice(indexOfFirstVet, indexOfLastVet);

  const {
    successMessage,
    setSuccessMessage,
    showSuccessAlert,
    setShowSuccessAlert,
    errorMessage,
    setErrorMessage,
    showErrorAlert,
    setShowErrorAlert,
  } = UseMessageAlerts();

  const fetchVeterinarians = () => {
    getVeterinarians()
      .then((data) => {
        setVeterinarians(data.data);
      })
      .catch((error) => {
        setErrorMessage(error.message);
        setShowErrorAlert(true);
      });
  };
  useEffect(() => {
    fetchVeterinarians();
  }, []);

  const handleDeleteAccount = async () => {
    if (vetToDelete) {
      try {
        const response = await deleteUser(vetToDelete);
        setSuccessMessage(response.message);
        setShowDeleteModal(false);
        setShowSuccessAlert(true);
        fetchVeterinarians();
      } catch (error) {
        setErrorMessage(error.message);
        setShowErrorAlert(true);
      }
    }
  };

  const handleShowDeleteModal = (vetId) => {
    setVetToDelete(vetId);
    setShowDeleteModal(true);
  };

  // Function to toggle lock/unlock
  const handleToggleAccountLock = async (vet) => {
    try {
      let response;
      if (vet.enabled) {
        response = await lockUserAccount(vet.id);
      } else {
        response = await unlockUserAccount(vet.id);
      }
      // Optimistically update the UI to reflect the new "enabled" state
      setVeterinarians(
        veterinarians.map((theVet) =>
          theVet.id === vet.id
            ? { ...theVet, enabled: !theVet.enabled }
            : theVet
        )
      );
      setSuccessMessage(response.message);
      setShowSuccessAlert(true);
    } catch (error) {
      setErrorMessage(error.message);
      setShowErrorAlert(true);
    }
    y;
  };

  const handleCancelClick = () => {
    setEditVetId(null);
  };

  const handleEditClick = (vetId) => {
    setEditVetId(vetId);
  };

  const handleSaveUpdate = async (vetId, editedVet) => {
    try {
      const response = await updateUser(vetId, editedVet);
      setVeterinarians((prevVets) =>
        prevVets.map((vet) =>
          vet.id === vetId ? { ...vet, ...editedVet } : vet
        )
      );
      setEditVetId(null);
      setSuccessMessage(response.message);
      setShowSuccessAlert(true);
    } catch (error) {
      setErrorMessage(error.message);
      setShowErrorAlert(true);
    }
  };

  useEffect(() => {
    let filtered = veterinarians;
    if (selectedSpecialization) {
      filtered = filtered.filter(
        (vet) => vet.specialization === selectedSpecialization
      );
    }
    setFilteredVets(filtered);
  }, [selectedSpecialization, veterinarians]);

  const specializations = Array.from(
    new Set(veterinarians.map((vet) => vet.specialization))
  );
  const handleClearFilters = () => {
    setSelectedSpecialization("");
  };

  return (
    <main className="mt-2">
      <h5>List of Veterinarians</h5>
      <DeleteConfirmationModal
        show={showDeleteModal}
        onHide={() => setShowDeleteModal(false)}
        onConfirm={handleDeleteAccount}
        itemToDelete="veterinarian"
      />
      <Row>
        <Col>
          {showErrorAlert && (
            <AlertMessage type={"danger"} message={errorMessage} />
          )}
          {showSuccessAlert && (
            <AlertMessage type={"success"} message={successMessage} />
          )}
        </Col>
      </Row>
      <Row className="mb-2">
        <Col md={6}>
          <UserFilter
            values={specializations}
            selectedValue={selectedSpecialization}
            onSelectedValue={setSelectedSpecialization}
            onClearFilters={handleClearFilters}
            label={"specialization"}
          />
        </Col>
        <Col md={6}>
          <div className="d-flex justify-content-end mt-2">
            <Link to={"/register-user"}>
              <BsPlusSquareFill size={25} />
            </Link>
          </div>
        </Col>
      </Row>
      <Table bordered hover striped>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Mobile</th>
            <th>Gender</th>
            <th>Specialization</th>
            <th>Registered on</th>
            <th colSpan={4}>Action</th>
          </tr>
        </thead>
        <tbody>
          {currentVets.map((vet, index) =>
            editVetId === vet.id ? (
              <VetEditableRows
                key={vet.id}
                vet={vet}
                onSave={handleSaveUpdate}
                onCancel={handleCancelClick}
              />
            ) : (
              <tr key={index}>
                <td>Dr. {vet.firstName}</td>
                <td>{vet.lastName}</td>
                <td>{vet.email}</td>
                <td>{vet.phoneNumber}</td>
                <td>{vet.gender}</td>
                <td>{vet.specialization}</td>
                <td>{vet.createdAt}</td>
                <td>
                  <OverlayTrigger
                    overlay={
                      <Tooltip id={`tooltip-view-${index}`}>
                        View vet information
                      </Tooltip>
                    }
                  >
                    <Link
                      to={`/user-dashboard/${vet.id}/my-dashboard`}
                      className="text-info"
                    >
                      <BsEyeFill />
                    </Link>
                  </OverlayTrigger>
                </td>
                <td>
                  <OverlayTrigger
                    overlay={
                      <Tooltip id={`tooltip-view-${index}`}>
                        edit vet information
                      </Tooltip>
                    }
                  >
                    <Link to={"#"} className="text-warning">
                      <BsPencilFill onClick={() => handleEditClick(vet.id)} />
                    </Link>
                  </OverlayTrigger>
                </td>
                <td>
                  <OverlayTrigger
                    overlay={
                      <Tooltip id={`tooltip-view-${index}`}>
                        {vet.enabled ? "Lock" : "Unlock"} vet account
                      </Tooltip>
                    }
                  >
                    <span
                      onClick={() => handleToggleAccountLock(vet)}
                      style={{ cursor: "pointer" }}
                    >
                      {vet.enabled ? <BsUnlockFill /> : <BsLockFill />}
                    </span>
                  </OverlayTrigger>
                </td>
                <td>
                  <OverlayTrigger
                    overlay={
                      <Tooltip id={`tooltip-view-${index}`}>
                        delete vet account
                      </Tooltip>
                    }
                  >
                    <Link
                      to={"#"}
                      className="text-danger"
                      onClick={() => handleShowDeleteModal(vet.id)}
                    >
                      <BsTrashFill />
                    </Link>
                  </OverlayTrigger>
                </td>
              </tr>
            )
          )}
        </tbody>
      </Table>
      <Paginator
        paginate={setCurrentPage}
        currentPage={currentPage}
        itemsPerPage={vetsPerPage}
        totalItems={filteredVets.length}
      />
    </main>
  );
};
