import React, { useEffect } from "react";
import "./App.css";
import Navigation from "./components/Navbar";
import { Container, Row, Col } from "react-bootstrap";
import { BrowserRouter as Router } from "react-router-dom";
import { useTranslation } from "react-i18next";
import ScrollToTop from "./components/Scroller";
import axios from "axios";

axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";

const App = () => {
  
  const { t, i18n } = useTranslation();

  useEffect(() => {
    document.dir = i18n.dir();
  }, [i18n, i18n.language]);

  return (
    <Container className="main bg-light" fluid>
      <Row>
        <Router>
    
          <Row className="dark-bg m-0 p-0">
            <Navigation />
          </Row>
    
            <Container className="main-text-color">
              <Row className="justify-content-center">
                <Row
                  className="pt-5 img-fluid bg"
                  style={{
                    backgroundImage: `url(/static/images/books.jpg)`,
                    backgroundSize: "100%",
                    backgroundRepeat: "no-repeat",
                    height: "45vh",
                    backgroungBlendMode: "luminocity",
                  }}
                >
                  <div className="bg-light mb-0 header-box">
                    <h3 className="text-center blue-text header-font pt-4">
                      STUDENT MANAGEMENT SYSTEM
                    </h3>

                    <h4 className="text-center blue-text header-font">
                      <strong>...</strong>
                    </h4>
                  </div>
                </Row>

                <div className="custom-view mt-3">
                  <br />

                  <h4 className="mt-3 mb-4 pt-3 main headers blue-text text-center header-font ">
                    {t("hello_and_welcome")}
                  </h4>

                  <p>{t("welcome_msg")}</p>

                  <h5 className="text-center mb-4 blue-text header-font headers">
                    {t("intro_h")}
                  </h5>

                  <p>
                    {t("intro_msg")}
                    <a href="/LoginForm" id="navSwitch-2">
                      {" "}
                      {t("login")}{" "}
                    </a>{" "}
                    {t("or")}{" "}
                    <a href="LoginForm" id="navSwitch-2">
                      {" "}
                      {t("signup")}.
                    </a>{" "}
                    {t("intro_2")}{" "}
                    <a id="navSwitch-2" href="mailto:virtua_web@outlook.com">
                      <strong>{t("contact_us")}</strong>
                    </a>
                  </p>
                </div>
                <br />

                <Row className="main-text-color justify-content-between custom-view mt-4 m-0 pb-4">
                  <h5 className="text-center blue-text header-font pb-2 mb-4 headers">
                    {t("authentication_and_permissions")}
                  </h5>

                  <div className="col-12 col-sm-5 col-md-5 m- col-lg-3 pt-3 mb-1 bg-light-blue">
                    <p className="text-light text-center">
                      <strong>{t("admin_users")}</strong>
                    </p>
                    <hr className="light-bg" />
                    <p className="text-light">
                      {" "}
                      {t("admin_username")}
                      <br />
                      {t("admin_pw")}
                      <br />
                      <br />
                      {t("admin_perms")}
                    </p>
                  </div>

                  <div className="col-12 col-sm-5 col-md-5 col-lg-3 mb-1 pt-3 bg-light-blue">
                    <p className="text-light text-center">
                      <strong>{t("staff_users")}</strong>
                    </p>
                    <hr className="light-bg" />
                    <p className="text-light">
                      {t("staff_username")}
                      <br />
                      <br />
                      {t("staff_pw")}
                      <br />
                      <br />
                      {t("permissions")}
                    </p>
                  </div>

                  <div className="col-12 col-sm-5 col-md-15 col-lg-3 mb-1 pt-3 bg-light-blue">
                    <p className="text-light text-center">
                      <strong>{t("none_staff_users")}</strong>
                    </p>{" "}
                    <hr className="light-bg" />
                    <p className="text-light">{t("none_Staff_perms")}</p>
                  </div>
                </Row>
                <br />

                <Row className="justify-content-center tech-box dark-bg mt-4 m-0 p-">
                  <div className="light-text custom-view dark-bg mt-5 m- p-0 mb-4">
                    <h5 className="main header-font text-center pb-2">
                      {t("tech_used")}
                    </h5>

                    <p>
                      <a
                        id="app-link"
                        href="https://reactjs.org/"
                        target="blank_"
                      >
                        React JS
                      </a>{" "}
                      {t("ui")}
                    </p>

                    <p>
                      <a
                        id="app-link"
                        href="https://www.djangoproject.com/"
                        target="blank_"
                      >
                        Djnago
                      </a>{" "}
                      {t("backend")}
                    </p>

                    <p>
                      <a
                        id="app-link"
                        href="https://www.django-rest-framework.org/"
                        target="blank_"
                      >
                        Django REST Framework
                      </a>{" "}
                      {t("drf")}
                    </p>

                    <p>
                      <a
                        id="app-link"
                        href="https://james1345.github.io/django-rest-knox/"
                        target="blank_"
                      >
                        Django-Rest-Knox
                      </a>{" "}
                      {t("knox")}
                    </p>

                    <p>
                      <a
                        id="app-link"
                        href="https://www.axios.com/"
                        target="blank_"
                      >
                        Axios
                      </a>{" "}
                      {t("axios")}
                    </p>

                    <p>
                      <a
                        id="app-link"
                        href="https://getbootstrap.com/"
                        target="blank_"
                      >
                        Bootstrap
                      </a>{" "}
                      {t("and")}{" "}
                      <a
                        id="app-link"
                        href="https://react-bootstrap.github.io/"
                        target="blank_"
                      >
                        React-bootstrap
                      </a>{" "}
                      {t("responsive")}
                    </p>

                    <p>
                      <a
                        id="app-link"
                        href="https://www.w3.org/Style/CSS/Overview.en.html"
                        target="blank_"
                      >
                        CSS
                      </a>{" "}
                      {t("css")}
                    </p>

                    <p>
                      <a
                        id="app-link"
                        href="https://reactjs.org/docs/introducing-jsx.html"
                        target="blank_"
                      >
                        JSX
                      </a>{" "}
                      {t("jsx")}
                    </p>

                    <p>
                      <a
                        id="app-link"
                        href="https://react.i18next.com/"
                        target="blank_"
                      >
                        i18next
                      </a>{" "}
                      {t("i18next")}
                    </p>
                  </div>
                </Row>
              </Row>

              <footer className="text-center light-text row pb-3 dark-bg">
                <div className="pb-3">
                  <Col>
                    <a
                      id="app-link"
                      href="https://rawymo.netlify.app/"
                      target="blank_"
                    >
                      Portfolio
                    </a>
                    &emsp;|&emsp;
                    <a
                      id="app-link"
                      href="mailto:rawymo@outlook.com"
                      target="blank_"
                    >
                      Contact
                    </a>
                  </Col>
                </div>
                <div className="pb-3">
                  <ScrollToTop />
                  <br />
                </div>
                <hr />
                <small>{t("page_disappear")}</small>{" "}
                <small> &copy; 2022 Rawy Murgany</small>
              </footer>
            </Container>
        </Router>
      </Row>
    </Container>
  );
};

export default App;

