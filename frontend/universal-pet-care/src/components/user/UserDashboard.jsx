import React, { useState, useEffect } from "react";
import UseMessageAlerts from "../hooks/UseMessageAlerts";
import { deleteUserPhotoById } from "../modals/ImageUploaderService";
import { Card, Col, Container, Row, Tab, Tabs } from "react-bootstrap";
import UserProfile from "./UserProfile";
import { deleteUser, getUserById } from "./UserService";
import AlertMessage from "../common/AlertMessage";
import Review from "../review/Review";
import UserAppointments from "../appointment/UserAppointments";

const UserDashboard = () => {
  const [user, setUser] = useState({});
  const [appointments, setAppointments] = useState([]);
  const [activeKey, setActiveKey] = useState(() => {
    const storedActiveKey = localStorage.getItem("active");
    return storedActiveKey ? storedActiveKey : "profile";
  });
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

  // const {userId} = useParams();
  const userId = 8;

  useEffect(() => {
    const getUser = async () => {
      try {
        const data = await getUserById(userId);
        setUser(data.data);
        setAppointments(data.data.appointments);
      } catch (error) {
        setErrorMessage(error.response.data.message);
        setShowErrorAlert(true);
      }
    };
    getUser();
  }, [userId]);

  const handleRemovePhoto = async () => {
    try {
      const result = await deleteUserPhotoById(user.photoId, 6);
      setSuccessMessage(result.message);
      setShowSuccessAlert(true);
    } catch (error) {
      setErrorMessage(error.message);
      setShowErrorAlert(true);
    }
  };

  const handleDeleteAccount = async () => {
    try {
      const response = await deleteUser(userId);
      setSuccessMessage(response.message);
      setShowSuccessAlert(true);
    } catch (error) {
      console.log("this is the error from the delete account:", error);
      setErrorMessage(error.message);
      setShowErrorAlert(true);
      console.error(error.message);
    }
  };

  const handleTabSelect = (key) => {
    setActiveKey(key);
    localStorage.setItem("activeKey", key);
  };

  return (
    <Container className="mt-2 user-dashboard">
      {showErrorAlert && (
        <AlertMessage type={"danger"} message={errorMessage} />
      )}
      {showSuccessAlert && (
        <AlertMessage type={"success"} message={successMessage} />
      )}

      <Tabs
        className="mb-2"
        justify
        activeKey={activeKey}
        onSelect={handleTabSelect}
      >
        <Tab eventKey="profile" title={<h3>Profile</h3>}>
          {user && (
            <UserProfile
              user={user}
              handleRemovePhoto={handleRemovePhoto}
              handleDeleteAccount={handleDeleteAccount}
            />
          )}
        </Tab>
        <Tab eventKey="status" title={<h3>Appointments</h3>}></Tab>
        <Tab eventKey="appointments" title={<h3>Appointment Details</h3>}>
          <Row>
            <Col>
              {user && (
                <React.Fragment>
                  {appointments && appointments.length > 0 ? (
                    <UserAppointments appointments={appointments} user={user} />
                  ) : (
                    <p>No data </p>
                  )}
                </React.Fragment>
              )}
            </Col>
          </Row>
        </Tab>
        <Tab eventKey="reviews" title={<h3>Reviews</h3>}>
          <Container className="d-flex justify-content-center align-items-center">
            <Card className="mt-5 mb-4 review-card">
              <h4 className="text-center mb-2">Your Reviews</h4>
              <Row>
                <Col>
                  {user && user.reviews && user.reviews.length > 0 ? (
                    user.reviews.map((review, index) => (
                      <Review key={index} review={review} />
                    ))
                  ) : (
                    <p>No reviews found at this time.</p>
                  )}
                </Col>
              </Row>
            </Card>
          </Container>
        </Tab>
      </Tabs>
    </Container>
  );
};

export default UserDashboard;
