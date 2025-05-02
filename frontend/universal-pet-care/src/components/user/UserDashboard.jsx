import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import UseMessageAlerts from "../hooks/UseMessageAlerts";
import { deleteUserPhotoById } from "../modals/ImageUploaderService";
import { Card, Col, Container, Row, Tab, Tabs } from "react-bootstrap";
import UserProfile from "./UserProfile";
import { deleteUser, getUserById } from "./UserService";
import AlertMessage from "../common/AlertMessage";
import Review from "../review/Review";
import UserAppointments from "../appointment/UserAppointments";
import { CustomPieChart } from "../charts/CustomPieChart";
import { formatAppointmentStatus } from "../utils/utilities";
import { NoDataAvailable } from "../common/NoDataAvailable";
import { logout } from "../auth/AuthService";

const UserDashboard = () => {
  const [user, setUser] = useState({});
  const [appointments, setAppointments] = useState([]);
  const [appointmentData, setAppointmentData] = useState([]);
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
  const { userId } = useParams();
  const currentUserId = localStorage.getItem("userId");
  const isCurrentUser = userId === currentUserId;

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

  useEffect(() => {
    if (user && user.appointments) {
      const statusCounts = user.appointments.reduce((acc, appointment) => {
        const formattedStatus = formatAppointmentStatus(appointment.status);
        if (!acc[formattedStatus]) {
          acc[formattedStatus] = {
            name: formattedStatus,
            value: 1,
          };
        } else {
          acc[formattedStatus].value += 1;
        }
        return acc;
      }, {});

      const transformedData = Object.values(statusCounts);
      setAppointmentData(transformedData);
      setAppointments(user.appointments);
      //console.log("Here is the transform data: ", transformedData);
    }
  }, [user]);

  const handleRemovePhoto = async () => {
    try {
      const result = await deleteUserPhotoById(user.photoId, userId);
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
      setTimeout(() => {
        logout();
      }, 10000);
    } catch (error) {
      //console.log("this is the error from the delete account:", error);
      setErrorMessage(error.message);
      setShowErrorAlert(true);
    }
  };

  const handleTabSelect = (key) => {
    setActiveKey(key);
    localStorage.setItem("activeKey", key);
  };

  return (
    <Container className="mt-2 user-dashboard">
      <Tabs
        className="mb-2"
        justify
        activeKey={activeKey}
        onSelect={handleTabSelect}
      >
        <Tab eventKey="profile" title={<h3>Profile</h3>}>
          {showErrorAlert && (
            <AlertMessage type={"danger"} message={errorMessage} />
          )}
          {showSuccessAlert && (
            <AlertMessage type={"success"} message={successMessage} />
          )}
          {user && (
            <UserProfile
              user={user}
              handleRemovePhoto={handleRemovePhoto}
              handleDeleteAccount={handleDeleteAccount}
              isCurrentUser={isCurrentUser}
            />
          )}
        </Tab>
        <Tab eventKey="status" title={<h3>Appointments Overview</h3>}>
          <Row>
            <Col>
              {appointmentData && appointmentData.length > 0 ? (
                <CustomPieChart data={appointmentData} />
              ) : (
                <NoDataAvailable dataType={"appointment data"} />
              )}
            </Col>
          </Row>
        </Tab>
        {isCurrentUser && (
          <Tab eventKey="appointments" title={<h3>Appointment Details</h3>}>
            <Row>
              <Col>
                {user && (
                  <React.Fragment>
                    {appointments && appointments.length > 0 ? (
                      <UserAppointments
                        appointments={appointments}
                        user={user}
                      />
                    ) : (
                      <NoDataAvailable dataType={"appointment data"} />
                    )}
                  </React.Fragment>
                )}
              </Col>
            </Row>
          </Tab>
        )}

        <Tab eventKey="reviews" title={<h3>Reviews</h3>}>
          <Container className="d-flex justify-content-center align-items-center">
            <Card className="mt-5 mb-4 review-card">
              <h4 className="text-center mb-2">Your Reviews</h4>
              <Row>
                <Col>
                  {user && user.reviews && user.reviews.length > 0 ? (
                    user.reviews.map((review, index) => (
                      <Review
                        key={index}
                        review={review}
                        userType={user.userType}
                      />
                    ))
                  ) : (
                    <NoDataAvailable dataType={"review data"} />
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
