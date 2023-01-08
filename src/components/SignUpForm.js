import React, { useState } from "react";
import axios from "axios";
import { Form, Container, Row } from "react-bootstrap";
import { useHistory, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { SubmitBtn, CancelBtn } from "./Buttons";

const SignUpForm = () => {
  const [formValue, setformValue] = useState({
    username: "",
    email: "",
    password: "",
  });

  const { t } = useTranslation();
  const history = useHistory();

  const handleChange = (e) => {
    setformValue({
      ...formValue,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const loginFormData = new FormData();
    loginFormData.append("username", formValue.username);
    loginFormData.append("email", formValue.email);
    loginFormData.append("password", formValue.password);

    try {
      let res = await axios({
        method: "POST",
        url: "register",
        data: loginFormData,
        headers: { "Content-Type": "multipart/form-data" },
      });
      if (res) {
        alert("Signed up successfully");
        history.push("/LoginForm");
      }
    } catch (err) {
      console.log(err);
      document.getElementById("errorMsg").innerHTML =
        "Error! Please check all fields ";
    }
  };

  return (
    <Container
      className="justify-content-center"
      fluid
      style={{
        height: "100vh",
        width: "100%",
      }}
    >
      <Row className="justify-content-center mt-4">
        <h2 className="main-text-color text-center">
          <strong className="">{t("new_signup")}</strong>
        </h2>
      </Row>

      <Row className="justify-content-center mt-4">
        <Form
          onSubmit={handleSubmit}
          style={{ border: "1px solid #107dac" }}
          className="form p-3 bg-light"
        >
          <div>
            <h1 id="errorMsg" className="text-danger text-center bg-white">{""}</h1>
          </div>

          <Form.Group className="mb-3">
            <Form.Label htmlFor="username" className="main-text-color">
              {t("username")}
            </Form.Label>
            <Form.Control
              type="username"
              name="username"
              placeholder="John Doe"
              className="main light-bg"
              onChange={handleChange}
            />

            <Form.Label htmlFor="email" className="main-text-color">
              {t("email_2")}
            </Form.Label>
            <Form.Control
              type="email"
              name="email"
              placeholder="example@example.com"
              className="main light-bg"
              onChange={handleChange}
            />

            <Form.Label htmlFor="password" className="main-text-color">
              {t("password")}
            </Form.Label>
            <Form.Control
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleChange}
              className="main light-bg"
            />
          </Form.Group>

          <div className="text-center">
            
            <div className="text-center">
              <span className="m-1">
                <SubmitBtn />
              </span>
              <span className="m-1">
                <CancelBtn />
              </span>
            </div>

            <p className="main-text-color mt-3">{t("already_have_account")}</p>

            <Link to="/LoginForm" id="app-link-2" className="blu light-tex p-1">
              <strong> {t("login")} </strong>
            </Link>
          </div>
        </Form>
      </Row>
    </Container>
  );
};

export default SignUpForm;
