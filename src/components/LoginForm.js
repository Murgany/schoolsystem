import React, { useState } from "react";
import axios from "axios";
import { Form, Container, Row } from "react-bootstrap";
import { useHistory, withRouter, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { SubmitBtn, CancelBtn } from "./Buttons";

const LoginForm = () => {

  const [formValue, setformValue] = useState({
    username: "",
    password: "",
    email: "",
  });

  const { t } = useTranslation();
  const history = useHistory();

  //handle user input
  const handleChange = (e) => {
    setformValue({
      ...formValue,
      [e.target.name]: e.target.value,
    });
  };


  // login form API post operation
  const handleSubmit = async (e) => {
    e.preventDefault();
    const loginFormData = new FormData();
    loginFormData.append("username", formValue.username);
    loginFormData.append("password", formValue.password);

    try {
      await axios({
        method: "POST",
        url: "login",
        data: loginFormData,
        headers: { "Content-Type": "multipart/form-data" },
      }).then((response) => {
        // save user info for authentication purposes
        sessionStorage.setItem("user", response.data.username);
        sessionStorage.setItem("token", response.data.token);
        sessionStorage.setItem("staffStatus", response.data.userGroup);
      });
      // go to home page after successful login
      history.push({ pathname: "/students" });
      window.location.reload(false);
    } catch {
      // if there's error, display this
      document.getElementById("errorMsg").innerHTML="Error! Please check all fields ";
    }
  };

  return (
    <Container fluid style={{ height: "100vh" }}>
      <Row className="mt-5">
        <h2 className="main-text-color text-center">
          <strong>{t("login")}</strong>
        </h2>
      </Row>

      <Row className="justify-content-center mt-4">
        <Form
          onSubmit={handleSubmit}
          className="form borders justify-content-center m-1 p-3 bg-light"
        >
          <div>
            <h1 id="errorMsg" className="text-danger text-center bg-white">{""}</h1>
          </div>

          <Form.Group className="mb-3">
            <Form.Label htmlFor="username" className="main main-text-color">
              {t("username")}
            </Form.Label>
            <Form.Control
              type="username"
              name="username"
              placeholder="John Doe"
              autoComplete="username"
              className="main light-bg"
              onChange={handleChange}
            />

            <Form.Label htmlFor="password" className="main main-text-color">
              {t("password")}
            </Form.Label>

            <Form.Control
              type="password"
              name="password"
              placeholder="Password"
              autoComplete="current-password"
              className="main light-bg"
              onChange={handleChange}
            />
          </Form.Group>

          <div className="text-center">
            <span className="m-1">
              <SubmitBtn />
            </span>
            <span className="m-1">
              <CancelBtn />
            </span>

            <p className="main-text-color mt-3">{t("dont_have_account")}</p>
            <Link
              to="/SignupForm"
              id="app-link-2"
              className="blu light-tex p-1"
            >
              <strong> {t("signup")} </strong>
            </Link>
          </div>
        </Form>
      </Row>
    </Container>
  );
};

export default withRouter(LoginForm);
