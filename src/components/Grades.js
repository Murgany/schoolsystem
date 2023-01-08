import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { HomeButton, AdminBtn } from "./Buttons";
import { Link } from "react-router-dom";
import { Container, Row, Form } from "react-bootstrap";

function Grades() {
  const [sum, setSum] = React.useState(0);
  const [perc, setPerc] = useState(0);
  const [result, setResult] = useState("");
  const [comment, setComment] = useState("");

  const [input, setInput] = React.useState({
    english: "",
    arabic: "",
    science: "",
    maths: "",
  });

  const { t } = useTranslation();
  const userSession = sessionStorage.getItem("token");

  //user input handler
  const handleInput = function (e) {
    // make sure numbers are between 0 and 100
    if (e.target.value < 0 || e.target.value > 100) {
        alert("Inputs must be positive numbers between 0 and 100.")
    } else {
      setInput({
        ...input,
        [e.target.name]: e.target.value,
      });
    }
  };

  const academicResults = () => {
    //calculate sum
    const sum = [
      parseFloat(input.english) +
        parseFloat(input.arabic) +
        parseFloat(input.science) +
        parseFloat(input.maths),
    ];

    setSum(sum);
    //calculate percenttage
    const percentage = parseFloat((sum * 100) / 400);
    setPerc(percentage);

    // grading the percentage
    setResult(percentage >= 50 ? "Passed!" : "Failed!");

    // determine teachers comment based on percentage
    if (percentage >= 91 && percentage <= 100) {
      setComment("Excellent!");
    } else if (percentage <= 90 && percentage >= 81) {
      setComment("Very good!");
    } else if (percentage <= 80 && percentage >= 71) {
      setComment("Good!");
    } else if (percentage <= 70 && percentage >= 50) {
      setComment("Fair!");
    } else {
      setComment("Poor!");
    }
  };

  return (
    <Container className="justify-content-center pt-3" fluid>
      {userSession ? (
        <div className="mb-4">
          <div className="justify-content-center pt-3">
            <Row>
              
              <span className="op-btn-box">
                <HomeButton />
              </span>
              
              <span className="op-btn-box">
                <AdminBtn />
              </span>

              <span
                className="help op-btn-box ops-"
                style={{ position: "relative" }}
              >
                <button className="help-btn btn-sm" id="buttons">
                  <i className="bi bi-question-circle main" />
                </button>
                <h3 className="content main blue-text">
                  {t("grade_description")}
                </h3>
              </span>

              <span className="op-btn-box">
                <button
                  id="buttons"
                  className="btn-sm"
                  type="button"
                  onClick={academicResults}
                >
                  <i className="bi bi-calculator main" />
                </button>
              </span>
            </Row>

            <Row style={{ transition: "", padding: "12px" }}>
              <Form className="light-bg col-12">

                <h3 className="text-center headers main-text-color pt-2 mb-2">
                  <span className="blue-text bg-white mb-">
                    Note : In future updates we will be able to save and fectch
                    grades from the database.
                  </span>{" "}
                  <br />
                  <br />
                  {t("grade_calc")}
                </h3>

                <hr />
                <div className="row justify-content-between m-1">
                  <div className="col-sm-5">
                    <label>{t("en_subj")}</label>

                    <input
                      // pattern="[0-9]*"
                      onChange={handleInput}
                      value={input.english}
                      type="number"
                      name="english"
                      className="input-group"
                      placeholder="0"
                    />
                  </div>

                  <div className="col-sm-5">
                    <label>{t("ar_subj")}</label>
                    <input
                      // pattern="[0-9]*"
                      onChange={handleInput}
                      value={input.arabic}
                      type="number"
                      name="arabic"
                      className="input-group"
                      placeholder="0"
                    />
                  </div>

                  <div className="col-sm-5">
                    <label>{t("sci_subj")}</label>
                    <input
                      // pattern="[0-9]*"
                      onChange={handleInput}
                      value={input.science}
                      type="number"
                      name="science"
                      className="input-group"
                      placeholder="0"
                    />
                  </div>

                  <div className="col-sm-5">
                    <label>{t("math_subj")}</label>
                    <input
                      // pattern="[0-9]*"
                      onChange={handleInput}
                      value={input.maths}
                      name="maths"
                      type="number"
                      className="input-group"
                      placeholder="0"
                    />
                  </div>

                  <div>
                    <hr />
                    <h3 className="text-center headers main-text-color pt-2 mb-2">
                      {t("results_form")}
                    </h3>
                  </div>

                  <div className="col-sm-5">
                    <label>{t("total_marks")}</label>
                    <input
                      className="input-group"
                      value={sum}
                      type="text"
                      readOnly
                    />
                  </div>

                  <div className="col-sm-5">
                    <label>{t("perc")}</label>
                    <input
                      className="input-group"
                      value={perc + "%"}
                      type="text"
                      readOnly
                    />
                  </div>

                  <div className="col-sm-5">
                    <label>{t("result")}</label>
                    <input
                      className="input-group"
                      value={result}
                      type="text"
                      placeholder={t("result")}
                      readOnly
                    />
                  </div>

                  <div className="col-sm-5">
                    <label>{t("comment")}</label>
                    <input
                      className="input-group mb-3"
                      value={comment}
                      type="text"
                      placeholder={t("comment")}
                      readOnly
                    />
                  </div>

                  <div>
                    <hr />
                  </div>
                </div>
              </Form>
            </Row>
          </div>
        </div>
      ) : (
        <>
          <Row className="m-2 mt- bg-light-blue">
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
        </>
      )}
    </Container>
  );
}

export default Grades;
