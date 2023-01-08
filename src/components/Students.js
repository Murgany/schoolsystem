import React, { useEffect, useState } from "react";
import {
  Table,
  Button,
  Container,
  Row,
  Col,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import StudentService from "./StudentService";
import { useTranslation } from "react-i18next";
import { AdminBtn } from "./Buttons";

const StudentList = () => {

  const [student_info, setStudent_info] = useState([]);
  const [searchValue, setNewValue] = useState("");

  // get the user status (logged in / logged out)
  const staffStatus = sessionStorage.getItem("staffStatus");

  //used to keep user logged in for a given time already set up in the backend
  const loggedInSession = sessionStorage.getItem("token");

  useEffect(() => {
    getAllStudents();
  }, []);

  // fetch students from API
  const getAllStudents = async () => {
    StudentService.getAllStudents().then((response) => {
      setStudent_info(response.data);
    });
  };

  // delete selected student
  const deleteStudent = async (id) => {
    const deleteConfirm = window.confirm("Delete parmanently?");
    if (deleteConfirm) {
      StudentService.deleteStudent(`${id}`);
      alert("Successfully Deleted!!!");
      getAllStudents();
    }
  };

  // for page refresh button
  const refreshPage = () => {
    window.location.reload(false);
  };

  // search bar input handler
  const newSearch = (e) => {
    setNewValue(e.target.value);
  };
  //search filter by character
  const filteredNames = student_info.filter((student_info) => {
    return student_info.name.toLowerCase().includes(searchValue.toLowerCase());
  });

  //clear search input
  const clearInput = () => {
    setNewValue("");
  };

  const displayClearBtn = searchValue.length > 0 && searchValue !== "Search";

  const { t } = useTranslation();

  return (
    <Container className="light-b pt-3" fluid>
      {loggedInSession ? (
        <>
          <Row className="mb-3 pt-3 justify-content-between">

            <Col className="col-sm-5">

              <span style={{ display: "inline-flex" }}>
                <AdminBtn />
              </span>

              <span className="ms-1 me-1">
                <button
                  variant="none"
                  id="buttons"
                  onClick={refreshPage}
                  className="btn-sm"
                >
                  <i className="bi bi-arrow-clockwise main"></i>
                </button>
              </span>

              <span
                className="help op-btn-box"
                style={{ position: "absolute" }}
              >
                <button className="help-btn btn-sm" id="buttons">
                  <i className="bi bi-question-circle main" />
                </button>
                <h3 className="content main blue-text">
                  <strong>{t("student_list")}</strong>
                  <br />
                  {t("student_list_description")}
                </h3>
              </span>
            </Col>

            <Col className="col-sm-5">
              {displayClearBtn && (
                <Button
                  onClick={clearInput}
                  variant="light"
                  style={{ fontSize: "13px", padding: "0.3%", margin: "0.4%" }}
                >
                  x
                </Button>
              )}

                <input
                  value={searchValue}
                  onChange={newSearch}
                  className="form-control search-box main bg-light"
                  type="text"
                  placeholder={t("search")}
                />
            </Col>
          </Row>

          <Row className="justify-content-center">
            <Table
              responsive
              bordered
              hover
              variant="none"
              size="sm"
              className="borders light-bg"
            >
              <thead className="text-center main-text-color">
                <tr>
                  <th>{t("id")}</th>
                  <th>{t("name")}</th>
                  <th>{t("age")}</th>
                  <th>{t("class")}</th>
                  <th>{t("gender")}</th>
                  <th>{t("section")}</th>
                  <th>{t("shift")}</th>
                  <th>{t("action")}</th>
                </tr>
              </thead>
              <tbody className="main-text-color text-center">
                {filteredNames &&
                  filteredNames.map((student_info, id) => {
                    return (
                      <tr key={id}>
                        <td>{student_info.id}</td>
                        <td>{student_info.name}</td>
                        <td>{student_info.age}</td>
                        <td>{student_info.class_type}</td>
                        <td>{student_info.gender}</td>
                        <td>{student_info.section}</td>
                        <td>{student_info.shift_name}</td>
                        <td>
                          {staffStatus === "ADMINS" && (
                            <Row className="justify-content-center m-0 p-0 ">

                              <div className="col-sm-3 justify-content-center text-center m-0 p-0">
                                {["bottom"].map((placement) => (
                                  <OverlayTrigger
                                    key={placement}
                                    placement={placement}
                                    overlay={
                                      <Tooltip id="tooltip-disabled">
                                        {t("view_student")}
                                      </Tooltip>
                                    }
                                  >
                                    <span className="d-inline-block">
                                      <Button
                                        as={Link}
                                        to={"studentdetails/" + student_info.id}
                                        className="btn-sm"
                                        variant="none"
                                      >
                                        <i
                                          className="bi bi-eye icons p-0 m-0"
                                          id="icons"
                                        />
                                      </Button>
                                    </span>
                                  </OverlayTrigger>
                                ))}
                              </div>

                              <div className="col-sm-3 justify-content-center text-center m-0 p-0">
                                {["bottom"].map((placement) => (
                                  <OverlayTrigger
                                    key={placement}
                                    placement={placement}
                                    overlay={
                                      <Tooltip
                                        //id={`tooltip-${placement}`}
                                        id="tooltip-disabled"
                                      >
                                        {t("edit_student")}
                                      </Tooltip>
                                    }
                                  >
                                    <span className="d-inline-block">
                                      <Button
                                        as={Link}
                                        to={"/editstudent/" + student_info.id}
                                        className="btn-sm"
                                        variant="none"
                                      >
                                        <i className="bi bi-pen" id="icons" />
                                      </Button>
                                    </span>
                                  </OverlayTrigger>
                                ))}
                              </div>

                              <div className="col-sm-3 justify-content-center text-center m-0 p-0">
                                {["bottom"].map((placement) => (
                                  <OverlayTrigger
                                    key={placement}
                                    placement={placement}
                                    overlay={
                                      <Tooltip
                                        id="tooltip-disabled"
                                        //id={`tooltip-${placement}`}
                                      >
                                        {t("delete_student")}
                                      </Tooltip>
                                    }
                                  >
                                    <span className="d-inline-block">
                                      <Button
                                        className="btn-sm"
                                        variant="none"
                                        onClick={() =>
                                          deleteStudent(student_info.id)
                                        }
                                      >
                                        <i
                                          className="bi bi-trash icons"
                                          id="icons"
                                        />
                                      </Button>
                                    </span>
                                  </OverlayTrigger>
                                ))}
                              </div>
                            </Row>
                          )}

                          {staffStatus === "STAFFS" && (
                            <Row className="justify-content-center">
                              <Col className="col-4 m-0 p-0">
                                {["bottom"].map((placement) => (
                                  <OverlayTrigger
                                    key={placement}
                                    placement={placement}
                                    overlay={
                                      <Tooltip id="tooltip-disabled">
                                        {t("view_student")}
                                      </Tooltip>
                                    }
                                  >
                                    <span className="d-inline-block">
                                      <Button
                                        as={Link}
                                        to={"studentdetails/" + student_info.id}
                                        className="btn-sm"
                                        variant="none"
                                      >
                                        <i
                                          className="bi bi-eye p-0 m-0"
                                          id="icons"
                                        />
                                      </Button>
                                    </span>
                                  </OverlayTrigger>
                                ))}
                              </Col>
                            </Row>
                          )}
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </Table>
          </Row>
        </>
      ) : (
        <Row className="m-2 bg-light-blue">
          <h4 className="text-center warning">
            {t("student_list_restricted")} <br />
            {t("please")}
            <Link to="/LoginForm" id="app-link">
              <strong> {t("login")} </strong>
            </Link>
            <>{t("or")}</>
            <Link to="/SignupForm" id="app-link">
              <strong> {t("signup")} </strong>
            </Link>
          </h4>
        </Row>
      )}
    </Container>
  );
};

export default StudentList;
