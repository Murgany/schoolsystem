import React from "react";
import { Form, Container, Row, Col } from "react-bootstrap";
import axios from "axios";
import { useHistory, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { HomeButton, AdminBtn, CancelBtn, SubmitBtn } from "./Buttons";

const Registration = () => {
  const [formValue, setformValue] = React.useState({
    name: "",
    age: "",
    class_type: "",
    gender: "",
    section: "",
    shift_name: "",
    admission_date: "",
    academic_year: "",
    guardian_name: "",
    guardian_email: "",
    emergency_phone: "",
    created_by: "",
  });

  //for site translation
  const { t } = useTranslation();

  // we will use this for routing to a different page after successful submit
  const history = useHistory();

  //Get logged in user token, to be used while submitting registration form. The form must be submitted by authorised (logged in)) user
  let config = {
    headers: {
      Authorization: "Token " + sessionStorage.getItem("token"),
    },
  };

  //API request. user input form.
  const handleCreateStudent = async (e) => {
    e.preventDefault();

    const addNewStudent = window.confirm("Register new student ?");

    if (addNewStudent) {
      var bodyFormData = new FormData();

      bodyFormData.append("name", formValue.name);
      bodyFormData.append("age", formValue.age);
      bodyFormData.append("class_type", formValue.class_type);
      bodyFormData.append("admission_date", formValue.admission_date);
      bodyFormData.append("gender", formValue.gender);
      bodyFormData.append("section", formValue.section);
      bodyFormData.append("shift_name", formValue.shift_name);
      bodyFormData.append("guardian_name", formValue.guardian_name);
      bodyFormData.append("guardian_email", formValue.guardian_email);
      bodyFormData.append("emergency_phone", formValue.emergency_phone);
      bodyFormData.append("academic_year", formValue.academic_year);
      bodyFormData.append("edited_by", formValue.created_by);

      try {
        const response = await axios.post("student_info", bodyFormData, config);
        if (response) {
          alert("Student registered successfully!");
          history.push("/students");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  // form filling by user
  const handleChange = (e) => {
    setformValue({
      ...formValue,
      [e.target.name]: e.target.value,
    });
  };

  //username used in navbar when user is loggedin
  const loggedInUser = sessionStorage.getItem("user");

  //used in logic below. showing form to users who are logged in only.
  const loggedInSession = sessionStorage.getItem("token");

  return (
    <Container className="justify-content-center pt-3" fluid>
      {/* show form only to logged in users */}
      {loggedInSession ? (
        <>
          <div className="row p-0 mt-3 mb-3">
            <span className="op-btn-box">
              <HomeButton />
            </span>

            <span className="op-btn-box">
              <AdminBtn />
            </span>

            <span className="help op-btn-box" style={{ position: "relative" }}>
              <button className="help-btn btn-sm" id="buttons">
                <i className="bi bi-question-circle main" />
              </button>
              <h3 className="content blue-text main">
                {t("registration_explanation")}
              </h3>
            </span>

            <span className="op-btn-box">
              <CancelBtn />
            </span>
          </div>

          <Row className="justify-content-center m-0">
            <Form
              className="light-bg p-2 borders"
              onSubmit={handleCreateStudent}
            >
              <h3 className="text-center headers main-text-color pt-2 mb-2">
                {t("new_registration")}
              </h3>

              <hr />
              <Form.Group className="mb-3 main-text-color">

                <Row className="mb-3">

                  <Col className="col-6">
                    <Form.Label>{t("admission_date")}</Form.Label>
                    <Form.Control
                      type="date"
                      onChange={handleChange}
                      name="admission_date"
                      placeholder={t("year_month_date")}
                      className="main"
                    />
                  </Col>

                  <Col className="col-6">
                    <Form.Label>{t("academic_year")}</Form.Label>
                    <Form.Control
                      onChange={handleChange}
                      name="academic_year"
                      placeholder="2021/2022"
                      className="main"
                    />
                  </Col>
                </Row>
                <Row>
                  <Col className="col-6">
                    <Form.Label>{t("name")}</Form.Label>
                    <Form.Control
                      type="text"
                      onChange={handleChange}
                      placeholder={t("full_name")}
                      name="name"
                      required
                      className="main text-muted"
                    />
                  </Col>

                  <Col className="col-6">
                    <Form.Label>{t("guardian")}</Form.Label>
                    <Form.Control
                      type="text"
                      onChange={handleChange}
                      name="guardian_name"
                      placeholder={t("guardian_name")}
                      className="main"
                    />
                  </Col>
                </Row>

                <Row>
                  <Col className="col-sm-6">
                    <Form.Label>{t("age")}</Form.Label>
                    <Form.Control
                      onChange={handleChange}
                      name="age"
                      placeholder="18"
                      className="main"
                    />
                  </Col>

                  <Col  className="col-sm-6">
                    <Form.Label>{t("gender")}</Form.Label>
                    <select
                      onChange={handleChange}
                      className="form-control main text-muted"
                      name="gender"
                      placeholder={t("gender")}
                    >
                      <option className="main" defaultValue>
                        {t("gender")}
                      </option>
                      <option className="main text-dark" value="M">
                        Male
                      </option>
                      <option className="main text-dark" value="F">
                        Female
                      </option>
                      <option className="main text-dark" value="O">
                        Other
                      </option>
                    </select>
                  </Col>
                </Row>

                <Row>
                  <Col>
                    <Form.Label>{t("class")}</Form.Label>
                    <select
                      onChange={handleChange}
                      className="form-control main"
                      name="class_type"
                      placeholder={t("gender")}
                    >
                      <option className="main" defaultValue="1">
                        {t("class")}
                      </option>
                      <option className="main" value="1">
                        1
                      </option>
                      <option className="main" value="2">
                        2
                      </option>
                      <option className="main" value="3">
                        3
                      </option>
                    </select>
                  </Col>

                  <Col>
                    <Form.Label>{t("section")}</Form.Label>
                    <select
                      onChange={handleChange}
                      className="form-control main"
                      name="section"
                    >
                      <option className="main text-muted" defaultValue>
                        {t("section")}
                      </option>
                      <option className="main" value={t("science")}>
                        {t("science")}
                      </option>
                      <option className="main" value={t("art")}>
                        {t("art")}
                      </option>
                    </select>
                  </Col>

                  <Col>
                    <Form.Label>{t("shift")}</Form.Label>
                    <select
                      onChange={handleChange}
                      className="form-control main"
                      name="shift_name"
                    >
                      <option className="main text-muted" defaultValue>
                        {t("shift")}
                      </option>
                      <option className="main" value={t("morning")}>
                        {t("morning")}
                      </option>
                      <option className="main" value={t("afternoon")}>
                        {t("afternoon")}
                      </option>
                      <option className="main" value={t("evening")}>
                        {t("evening")}
                      </option>
                    </select>
                  </Col>
                </Row>

                <Row>
                  <Col>
                    <Form.Label>{t("phone")}</Form.Label>
                    <Form.Control
                      onChange={handleChange}
                      name="emergency_phone"
                      placeholder={t("phone")}
                      className="main"
                    />
                  </Col>

                  <Col>
                    <Form.Label>{t("email")}</Form.Label>
                    <Form.Control
                      type="email"
                      onChange={handleChange}
                      name="guardian_email"
                      placeholder="example@example.com"
                      className="main"
                    />
                  </Col>
                </Row>

                <Form.Label>{t("registered_by")}</Form.Label>
                <Form.Control
                  className="main main-text-color"
                  name="created_by"
                  value={loggedInUser}
                  readOnly
                />

                <Form.Text className="text-muted">
                  {t("please_enter_all_informations")}
                </Form.Text>
              </Form.Group>

              <div className="text-center">
                
                <span className="m-1"><SubmitBtn /></span>
                <span className="m-1"><CancelBtn /></span>
          
              </div>
            </Form>
          </Row>
          <br />
        </>
      ) : (
        // show this if user is not looged in
        <Row className="m-2 bg-light-blue">
          <h4 className="text-center warning">
            {t("restricted")} <br /> {t("please")}
            <Link to="/LoginForm" id="app-link">
              <strong> {t("login")} </strong>
            </Link>
            {t("or")}
            <Link to="/SignupForm" id="app-link">
              <strong> {t("signup")} </strong>
            </Link>
            {t("to_register_new_students")}{" "}
          </h4>
        </Row>
      )}
    </Container>
  );
};

export default Registration;
