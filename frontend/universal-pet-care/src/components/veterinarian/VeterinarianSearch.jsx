import React, { useEffect, useState } from "react";
import UseMessageAlerts from "../hooks/UseMessageAlerts";
import { Button, Col, Form, Row } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import AlertMessage from "../common/AlertMessage";
import {
  findAvailableVeterinarians,
  getSpecializations,
} from "./VeterinarianService";
import { formatDateAndTime } from "../utils/utilities";

const VeterinarianSearch = ({ onSearchResult }) => {
  const [specializations, setSpecialization] = useState([]);
  const [searchQuery, setSearchQuery] = useState({
    date: null,
    time: null,
    specialization: "",
  });

  const [showDateTime, setShowDateTime] = useState(false);
  //const [errorMessage, setErrorMessage] = useState(""); // bunun yerine
  const { errorMessage, setErrorMessage, showErrorAlert, setShowErrorAlert } =
    UseMessageAlerts();

  const handleInputChange = (e) => {
    setSearchQuery({
      ...searchQuery,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    getSpecializations()
      .then((data) => {
        setSpecialization(data.data || data);
      })
      .catch((error) => {
        setErrorMessage(error.message);
      });
  }, []);

  const handleDateChange = (date) => {
    setSearchQuery({
      ...searchQuery,
      date,
    });
  };
  const handleTimeChange = (time) => {
    setSearchQuery({
      ...searchQuery,
      time,
    });
  };

  const handleDateTimeToggle = (e) => {
    const isChecked = e.target.checked;
    setShowDateTime(isChecked);
    if (!isChecked) {
      setSearchQuery({
        ...searchQuery,
        date: null,
        time: null,
      });
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    const { date, time } = searchQuery;
    const { formattedDate, formattedTime } = formatDateAndTime(date, time);

    let searchParams = { specialization: searchQuery.specialization };

    if (searchQuery.date && searchQuery.time) {
      //const formattedDate = format(searchQuery.date, "yyyy-MM-dd");
      searchParams.date = formattedDate;
      searchParams.time = formattedTime;
    }
    //if (searchQuery.time) {
    //const formattedTime = format(searchQuery.time, "HH:mm");
    // searchParams.time = formattedTime;
    //}
    try {
      const response = await findAvailableVeterinarians(searchParams);
      onSearchResult(response.data);
      setShowErrorAlert(false); // Clear any previous error messages
    } catch (error) {
      console.log("error", error);
      setErrorMessage(error.response.data.message);
      setShowErrorAlert(true);
    }
  };

  const handleClearSearch = () => {
    setSearchQuery({
      date: null,
      time: null,
      specialization: "",
    });
    setShowDateTime(false);
    onSearchResult(null);
  };

  return (
    <section className="stickyFormContainer">
      <h3>Find a Veterinarian</h3>
      <Form onSubmit={handleSearch}>
        <Form.Group>
          <Form.Label>Specialization</Form.Label>
          <Form.Control
            as="select"
            name="specialization"
            value={searchQuery.specialization}
            onChange={handleInputChange}
          >
            <option value="">Select specialization</option>
            {specializations.map((specialization, index) => (
              <option value={specialization} key={index}>
                {specialization}
              </option>
            ))}
          </Form.Control>
          <fieldset>
            <Row className="mb-3">
              <Col>
                <Form.Group className="mb-3">
                  <Form.Check
                    type="checkbox"
                    label="Include Date and Time Availability"
                    checked={showDateTime}
                    onChange={handleDateTimeToggle}
                  />
                </Form.Group>
                {showDateTime && (
                  <React.Fragment>
                    <legend>Include Date and Time</legend>
                    <Form.Group className="mb-3">
                      <Form.Label className="searchText">Date</Form.Label>
                      <DatePicker
                        selected={searchQuery.date}
                        onChange={handleDateChange}
                        dateFormat="yyyy/MM/dd"
                        minDate={new Date()} // bu sekilde gecmis tarih secilemez
                        className="form-control"
                        placeholderText="Select a date"
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label className="searchText">Time</Form.Label>
                      <DatePicker
                        selected={searchQuery.time}
                        onChange={handleTimeChange}
                        showTimeSelect
                        showTimeSelectOnly
                        timeIntervals={30}
                        dateFormat="HH:mm"
                        className="form-control"
                        placeholderText="Select time"
                        required
                      />
                    </Form.Group>
                  </React.Fragment>
                )}
              </Col>
            </Row>
          </fieldset>

          <div className="d-flex justify-content-center mb-4">
            <Button type="submit" variant="outline-primary">
              Search
            </Button>
            <div className="mx-2">
              <Button
                type="button"
                variant="outline-info"
                onClick={handleClearSearch}
              >
                Clear Search
              </Button>
            </div>
          </div>
        </Form.Group>
      </Form>
      <div>
        {showErrorAlert && (
          <AlertMessage type={"danger"} message={errorMessage} />
        )}
      </div>
    </section>
  );
};

export default VeterinarianSearch;
