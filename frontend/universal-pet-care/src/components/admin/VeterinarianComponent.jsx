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
} from "react-icons/bs";
import { getVeterinarians } from "../veterinarian/VeterinarianService";
import { deleteUser } from "../user/UserService";

export const VeterinarianComponent = () => {
  const [veterinarians, setVeterinarians] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [vetToDelete, setVetToDelete] = useState(null);

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

  return (
    <main className="mt-2">
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
        <Col>
          <div className="d-flex justify-content-end">
            <Link to={"/user-registration"}>
              <BsPlusSquareFill />
            </Link>
          </div>
        </Col>
      </Row>
      <Table>
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
          {veterinarians.map((vet, index) => (
            <tr>
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
                  <Link to={"/"} className="text-info">
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
                  <Link
                    to={`/update-profile/${vet.id}`}
                    className="text-warning"
                  >
                    <BsPencilFill />
                  </Link>
                </OverlayTrigger>
              </td>
              <td>
                <OverlayTrigger
                  overlay={
                    <Tooltip id={`tooltip-view-${index}`}>
                      Unlock vet account
                    </Tooltip>
                  }
                >
                  <Link to={"/"}>
                    <BsLockFill />
                  </Link>
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
          ))}
        </tbody>
      </Table>
    </main>
  );
};
