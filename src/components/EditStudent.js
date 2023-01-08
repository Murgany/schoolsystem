import React, { useState, useEffect } from "react";
import axios from "axios";
import { Form, Container, Row, Col } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { HomeButton, AdminBtn, CancelBtn, SubmitBtn } from "./Buttons";

const EditStudent = (props) => {
  const [formValue, setformValue] = useState({
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
    edited_by: "",
  });

  const config = {
    headers: {
      Authorization: "Token " + sessionStorage.getItem("token"),
    },
  };


  const handleUpdateStudent = async (e) => {
    e.preventDefault();

    let confirmUpdate = window.confirm("Update student informations?");
    if (confirmUpdate) {
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
      bodyFormData.append("edited_by", formValue.edited_by);

      try {
        const response = await axios.patch(
          `student_info/${props.match.params.id}`,
          bodyFormData,
          config
        );
        if (response) {
          alert("Updated successfully!");
          // history.push("/students");
        }
      } catch {
        document.getElementById("errorMsg").innerHTML ="Error! please review all fields."
      }
    }
  };

  useEffect(() => {
    //prepopulate page with data from selected table row
    async function fetchData() {
      const response = await axios.get(
        "student_info/" + props.match.params.id,
        config
      );
      setformValue(response.data);
    }
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //input handler
  const handleChange = (e) => {
    setformValue({
      ...formValue,
      [e.target.name]: e.target.value,
    });
  };

  //route to another page onclick
  // const history = useHistory();

  const { t } = useTranslation();
  const loggedInUser = sessionStorage.getItem("user");

  return (
    <Container className="mt-3" fluid>

      <Row className="mt-2 mb-2">
        <span className="op-btn-box">
          <HomeButton />
        </span>
        <span className="op-btn-box">
          <AdminBtn />
        </span>
      </Row>

      <Row className="justify-content-center m-0">
        <Form className="light-bg p-2 borders" onSubmit={handleUpdateStudent}>
          <h3 className="text-center headers main-text-color pt-2 mb-2">
            {t("update_student")}
          </h3>
          <hr />

          <Form.Group className="mb-3 main-text-color">
            <div><h3 id="errorMsg">{""}</h3></div>
            <Row className="mb-3">
              <Col className="col-6">
                <Form.Label className="main">{t("admission_date")}</Form.Label>
                <Form.Control
                  onChange={handleChange}
                  value={formValue.admission_date}
                  type="date"
                  name="admission_date"
                  placeholder="year/month/date"
                  className="main"
                />
              </Col>

              <Col className="col-6">
                <Form.Label className="main">{t("academic_year")}</Form.Label>
                <Form.Control
                  onChange={handleChange}
                  value={formValue.academic_year}
                  name="academic_year"
                  placeholder="2021/2022"
                  className="main"
                />
              </Col>
            </Row>

            <Row>
              <Col>
                <Form.Label className="main">{t("name")}</Form.Label>
                <Form.Control
                  onChange={handleChange}
                  value={formValue.name}
                  placeholder="John Doe"
                  name="name"
                  className="main"
                />
              </Col>

              <Col>
                <Form.Label className="main">{t("guardian")}</Form.Label>
                <Form.Control
                  type="text"
                  onChange={handleChange}
                  value={formValue.guardian_name}
                  name="guardian_name"
                  placeholder="John Doe"
                  className="main"
                />
              </Col>
            </Row>

            <Row>
              <Col>
                <Form.Label className="main">{t("age")}</Form.Label>
                <Form.Control
                  onChange={handleChange}
                  value={formValue.age}
                  name="age"
                  placeholder="18"
                  className="main"
                />
              </Col>

              <Col>
                <Form.Label className="main">{t("gender")}</Form.Label>
                <select
                  type="text"
                  value={formValue.gender}
                  onChange={handleChange}
                  className="form-control main"
                  name="gender"
                  placeholder={t("gender")}
                >
                  <option className="main" defaultValue>
                    {t("gender")}
                  </option>
                  <option className="main" value="M">
                    Male
                  </option>
                  <option className="main" value="F">
                    Female
                  </option>
                  <option className="main" value="Other">
                    Other
                  </option>
                </select>
              </Col>
            </Row>

            <Row>
              <Col>
                <Form.Label className="main">{t("class")}</Form.Label>
                <select
                  onChange={handleChange}
                  className="form-control main"
                  name="class_type"
                >
                  <option className="main" defaultValue={formValue.class_type}>
                    {formValue.class_type}
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
                <Form.Label className="main">{t("section")}</Form.Label>
                <select
                  onChange={handleChange}
                  className="form-control main"
                  name="section"
                >
                  <option
                    className="main text-muted"
                    defaultValue={formValue.section}
                  >
                    {formValue.section}
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
                    {formValue.shift_name}
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
                <Form.Label className="main">{t("phone")}</Form.Label>
                <Form.Control
                  onChange={handleChange}
                  value={formValue.emergency_phone}
                  name="emergency_phone"
                  placeholder="+1 555 555 555"
                  className="main"
                />
              </Col>

              <Col>
                <Form.Label className="main">{t("email")}</Form.Label>
                <Form.Control
                  type="email"
                  onChange={handleChange}
                  value={formValue.guardian_email}
                  name="guardian_email"
                  placeholder="example@example.com"
                  className="main"
                />
              </Col>
            </Row>

            <Form.Label>{t("updated_by")}</Form.Label>
            <Form.Control
              className="main main-text-color"
              name="updated_by"
              value={loggedInUser}
              readOnly
            />

            <Form.Text className="text-muted">
              {t("please_enter_all_informations")}
            </Form.Text>
          </Form.Group>

          <div className="text-center">
            <span className="op-btn-box m-1"><SubmitBtn /></span>
            <span className="op-btn-box m-1"><CancelBtn /></span>
          </div>
        </Form>
      </Row>
      <br />
    </Container>
  );
};

export default withRouter(EditStudent);
