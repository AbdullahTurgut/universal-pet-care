import React, { useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  InputGroup,
  Row,
} from "react-bootstrap";
import { BsPersonFill, BsLockFill } from "react-icons/bs";
import { Link, useLocation, useNavigate } from "react-router-dom";
import UseMessageAlerts from "../hooks/UseMessageAlerts";
import { loginUser } from "./AuthService";
import AlertMessage from "../common/AlertMessage";

const Login = () => {
  const [credentials, setCredentials] = React.useState({
    email: "",
    password: "",
  });

  const { errorMessage, setErrorMessage, showErrorAlert, setShowErrorAlert } =
    UseMessageAlerts();

  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prevState) => ({ ...prevState, [name]: value }));
  };

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("authToken");
    if (isAuthenticated) {
      navigate(from, { replace: true });
    }
  });

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!credentials.email || !credentials.password) {
      setErrorMessage("Please, enter a valid username and password");
      setShowErrorAlert(true);
      return;
    }
    try {
      const data = await loginUser(credentials.email, credentials.password);
      localStorage.setItem("authToken", data.token);
      const decoded = jwtDecode(data.token);
      localStorage.setItem("userRoles", JSON.stringify(decoded.roles)); // Navbar userRoles params
      localStorage.setItem("userId", decoded.id);
      clearLoginForm();
      navigate(from, { replace: true });
    } catch (error) {
      setErrorMessage(error.response.data.message);
      setShowErrorAlert(true);
    }
  };

  const clearLoginForm = () => {
    setCredentials({ email: "", password: "" });
    setShowErrorAlert(false);
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col sm={6}>
          <Card>
            {showErrorAlert && (
              <AlertMessage type={"danger"} message={errorMessage} />
            )}
            <Card.Body>
              <Card.Title className="text-center mb-4"></Card.Title>
              <Form onSubmit={handleLogin}>
                <Form.Group className="mb-3" controlId="username">
                  <Form.Label>Username</Form.Label>
                  <InputGroup>
                    <InputGroup.Text>
                      <BsPersonFill />
                      {/* Icon for username */}
                    </InputGroup.Text>
                    <Form.Control
                      type="text"
                      name="email"
                      value={credentials.email}
                      onChange={handleInputChange}
                    />
                  </InputGroup>
                </Form.Group>
                <Form.Group className="mb-3" controlId="password">
                  <Form.Label>Password</Form.Label>
                  <InputGroup>
                    <InputGroup.Text>
                      <BsLockFill />
                      {/* Icon for password */}
                    </InputGroup.Text>
                    <Form.Control
                      type="password"
                      name="password"
                      value={credentials.password}
                      onChange={handleInputChange}
                    />
                  </InputGroup>
                </Form.Group>

                <Button
                  variant="outline-primary"
                  type="submit"
                  className="w-100"
                >
                  Login
                </Button>
              </Form>
              {/* Alt linkler */}
              <div className="text-center mt-4">
                <div className="text-muted small">
                  Don't have an account yet?{" "}
                  <Link
                    to="/register-user"
                    className="fw-semibold text-decoration-none"
                  >
                    Register here
                  </Link>
                </div>

                <div className="mt-2">
                  <Link
                    to="/password-reset-request"
                    className="text-primary text-decoration-none small"
                  >
                    Forgot password?
                  </Link>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
