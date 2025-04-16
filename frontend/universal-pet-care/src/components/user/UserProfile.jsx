import React, { useState } from "react";
import { Button, Card, Col, ListGroup, Row } from "react-bootstrap";
import UserImage from "../common/UserImage";
import { Link } from "react-router-dom";
import ImageUploaderModal from "../modals/ImageUploaderModal";
import ChangePasswordModal from "../modals/ChangePasswordModal";

const UserProfile = ({ user, handleRemovePhoto, handleCloseAccount }) => {
  const [showImageUploaderModal, setShowImageUploaderModal] = useState(false);
  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);

  const handleShowImageUploaderModal = () => {
    setShowImageUploaderModal(true);
  };
  const handleCloseImageUploaderModal = () => {
    setShowImageUploaderModal(false);
  };
  const handleShowChangePasswordModal = () => {
    setShowChangePasswordModal(true);
  };
  const handleCloseChangePasswordModal = () => {
    setShowChangePasswordModal(false);
  };

  return (
    <React.Fragment>
      <Row>
        <Col md={3}>
          <Card className="text-center mb-3 shadow">
            <Card.Body>
              <UserImage userId={user.id} userPhoto={user.photo} />
            </Card.Body>
            <div className="text-center">
              <p>
                <Link to={"#"} onClick={handleShowImageUploaderModal}>
                  Update Photo
                </Link>
              </p>
              <ImageUploaderModal
                userId={user.id}
                show={showImageUploaderModal}
                handleClose={handleCloseImageUploaderModal}
              />
              <p>
                <Link to={"#"} onClick={handleRemovePhoto}>
                  Remove Photo
                </Link>
              </p>
              <p>
                <Link to={"#"} onClick={handleShowChangePasswordModal}>
                  Change Password
                </Link>
              </p>
              <ChangePasswordModal
                userId={user.id}
                show={showChangePasswordModal}
                handleClose={handleCloseChangePasswordModal}
              />
            </div>
          </Card>
        </Col>
        <Col md={8}>
          <Card className="mb-3 shadow">
            <Card.Body className="d-flex align-items-center">
              <Col md={4}>First Name :</Col>
              <Col md={4}>
                <Card.Text>{user.firstName}</Card.Text>
              </Col>
            </Card.Body>
            <Card.Body className="d-flex align-items-center">
              <Col md={4}>Last Name :</Col>
              <Col md={4}>
                <Card.Text>{user.lastName}</Card.Text>
              </Col>
            </Card.Body>
            <Card.Body className="d-flex align-items-center">
              <Col md={4}>Gender :</Col>
              <Col md={4}>
                <Card.Text>{user.gender}</Card.Text>
              </Col>
            </Card.Body>
            <Card.Body className="d-flex align-items-center">
              <Col md={4}>Email :</Col>
              <Col md={4}>
                <Card.Text>{user.email}</Card.Text>
              </Col>
            </Card.Body>
            <Card.Body className="d-flex align-items-center">
              <Col md={4}>Mobile :</Col>
              <Col md={4}>
                <Card.Text>{user.phoneNumber}</Card.Text>
              </Col>
            </Card.Body>
            <Card.Body className="d-flex align-items-center">
              <Col md={4}>User Type</Col>
              <Col md={4}>
                <Card.Text>{user.userType}</Card.Text>
              </Col>
            </Card.Body>
            {user.userType === "VET" && (
              <Card.Body className="d-flex align-items-center">
                <Col md={4}>Specialization :</Col>
                <Col md={4}>
                  <Card.Text>{user.specialization}</Card.Text>
                </Col>
              </Card.Body>
            )}

            <Card.Body className="d-flex align-items-center">
              <Col md={4}>Account Status :</Col>
              <Col md={4}>
                <Card.Text className={user.enabled ? "active" : "inactive"}>
                  {user.enabled ? "Active" : "Inactive"}
                </Card.Text>
              </Col>
            </Card.Body>
          </Card>

          <Card className="mb-3 shadow">
            <Card.Body className="d-flex align-items-center">
              <Col md={2}>Role(s) :</Col>
              <Col md={4}>
                <ListGroup variant="flush">
                  {user.roles &&
                    user.roles.map((role, index) => (
                      <ListGroup.Item key={index} className="text-success">
                        {role ? role.replace("ROLE_", "") : ""}
                      </ListGroup.Item>
                    ))}
                </ListGroup>
              </Col>
            </Card.Body>

            <Card.Body>
              <div className="d-flex justify-content-center mb-4">
                <div className="mx-2">
                  <Link to={""} className="btn btn-warning btn-sm">
                    Edit Profile
                  </Link>
                </div>
                <div className="mx-2">
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={handleCloseAccount}
                  >
                    Close Account
                  </Button>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default UserProfile;
