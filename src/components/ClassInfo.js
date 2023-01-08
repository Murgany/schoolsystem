import React, { useState, useEffect } from "react";
import { Container, Table, Row } from "react-bootstrap";
import StudentService from "./StudentService";
import { useTranslation } from "react-i18next";
import { HomeButton, AdminBtn } from "./Buttons";
import { Link } from "react-router-dom";

const ClassInfo = () => {
  const [class_count, setClassCount] = useState([]);
  const { t } = useTranslation();
  const loggedInSession = sessionStorage.getItem("token");

  const getAllStudents = async () => {
    StudentService.getAllStudents().then((response) => {
      // get all class info & filter out duplicates
      const classes = response.data
        .map((Item) => Item.class_type)
        .filter(
          (classType, index, array) => array.indexOf(classType) === index
        );

      // get class names and student count in each class
      const count = classes.map((class_name) => ({
        Class_name: class_name,
        Class_count: response.data.filter(
          (item) => item.class_type === class_name
        ).length,
      }));

      setClassCount(count);
    });
  };

  useEffect(() => {
    getAllStudents();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container className="light-b mt-3" fluid >
      {loggedInSession ? (
        <>
          <div className="row p-0 mt-3 mb-3">

            <span className="op-btn-box">
              <HomeButton />
            </span>

            <span className="op-btn-box ms- me-">
              <AdminBtn />
            </span>

            <span
              className="help op-btn-box"
              style={{ position: "relative" }}
            >
              <button className="help-btn btn-sm" id="buttons">
                <i className="bi bi-question-circle main" />
              </button>
              <h3 className="content main blue-text ">
                <strong>{t("class_info")}</strong>
                <br />
                  {t("the_student_count_automatically_increases")}
              </h3>
            </span>
          </div>

          {/* <Row className="m-0 main-text-color blue" variant="info"></Row> */}

          <Row className="justify-content-center">
            <Table
              className="text-center light-bg main-text-color borders"
              responsive="sm"
              bordered
              hover
              variant="none"
              size="sm"
            >
              <thead>
                <tr>
                  <th>{t("class")}</th>
                  <th>{t("student_count")}</th>
                </tr>
              </thead>

              <tbody>
                {class_count.map((Cls_info, index) => (
                  <tr key={index}>
                    <td>Senior {Cls_info.Class_name}</td>
                    <td>{Cls_info.Class_count}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Row>
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
              <strong>{t("signup")} </strong>
            </Link>
          </h4>
        </Row>
      )}
    </Container>
  );
};

export default ClassInfo;
