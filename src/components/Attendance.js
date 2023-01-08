import React, { useState, useEffect } from "react";
import { Container, Table, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { HomeButton, AdminBtn } from "./Buttons";
import StudentService from "./StudentService";

const Attendance = () => {
  const [attendance, setAttendance] = useState([]);

  // fetch attendance info
  const getAttendance = async () => {
    StudentService.getAttendance().then((response) => {
      setAttendance(response.data);
    });
  };

  useEffect(() => {
    getAttendance();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // for Localization & translation
  const { t } = useTranslation();

  // get user session status (logged in / logged out)
  const loggedInSession = sessionStorage.getItem("token");

  return (
    <Container className="main mt-3" fluid>
      {loggedInSession ? (
        <>
          <Row className="row p-0 mt-3 mb-3">
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
              <h3 className="content main blue-text ">
                <strong>{t("attendance")}</strong>
                <br />
                {t("attendance_explanation")}
              </h3>
            </span>
          </Row>

          <Table
            className="text-center light-bg main-text-color borders"
            responsive="lg"
            bordered
            hover
            variant="none"
            size="sm"
          >
            <thead>
              <tr>
                <th>{t("student_id")}</th>
                <th>{t("status")}</th>
                <th>{t("date")}</th>
              </tr>
            </thead>

            <tbody>
              {attendance.map((attendance, index) => {
                return (
                  <tr key={index}>
                    <td>{attendance.student}</td>
                    <td>{attendance.status}</td>
                    <td>{attendance.date}</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </>
      ) : (
        <Row className="m-2 bg-light-blue">
          <h4 className="text-center warning">
            {t("restricted")} <br /> {t("please")}
            <Link to="/LoginForm" id="app-link">
              <strong> {t("login")} </strong>
            </Link>
            <>{t("or")}</>
            <Link to="/SignupForm" id="app-link">
              <strong> {t("signup")} </strong>
            </Link>
            {/* {t("to_register_new_students")}{" "} */}
          </h4>
        </Row>
      )}
    </Container>
  );
};

export default Attendance;
