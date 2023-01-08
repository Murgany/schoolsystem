import React from "react";
import axios from "axios";
import SignUpForm from "./SignUpForm";
import Registration from "./Registration";
import EditStudent from "./EditStudent";
import LoginForm from "./LoginForm";
import ClassInfo from "./ClassInfo";
import Attendance from "./Attendance";
import SingleStudent from "./StudentDetails";
import Grades from "./Grades";
import { Nav, Navbar, NavDropdown, Container } from "react-bootstrap";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  useHistory,
} from "react-router-dom";
import StudentList from "./Students";
import { useTranslation } from "react-i18next";

const lngs = {
  en: { nativeName: "English" },
  ar: { nativeName: "عربي" },
};

const Navigation = () => {
  const userSession = sessionStorage.getItem("token");
  const loggedInUser = sessionStorage.getItem("user");

  const { t, i18n } = useTranslation();
  const history = useHistory();

  let config = {
    headers: {
      Authorization: "Token " + sessionStorage.getItem("token"),
    },
  };

  const logout = async () => {
      // clear user data from storage
      sessionStorage.removeItem("user");
      sessionStorage.removeItem("staffStatus");
      history.push("/");

      // logout user from backend
    try {
      const res = await axios.post("logout", null, config);
      if (res) {
        sessionStorage.removeItem("token");
        console.log("LOGGED OUT !!!");
        window.location.reload(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Router>
      <Container className="m-0 mb-5 p-0" fluid>
        <Navbar
          collapseOnSelect
          expand="lg"
          className="fixed-top dark-bg "
          variant="dark"
          style={{ borderBottom: "7px solid #107dac" }}
        >
          <Container fluid className="" style={{ height: "" }}>
            <Navbar.Brand className="main col-sm-2 col-md-">
              <a
                href="/Students"
                style={{ padding: "2px" }}
                className="header-font"
                id="logo"
              >
                &#10070; Rawy Murgany
              </a>
            </Navbar.Brand>

            <Navbar.Toggle
              className="main"
              aria-controls="responsive-navbar-nav"
            />

            <Navbar.Collapse id="responsive-navbar-nav" className="navimation">
              <Nav
                className="main justify-content-between "
                style={{ width: "100%" }}
              >
                <Nav.Link
                  as={Link}
                  to={"/Students"}
                  id="navSwitch"
                  className=""
                >
                  {t("student_list")}
                </Nav.Link>

                <Nav.Link
                  as={Link}
                  to={"/Attendance"}
                  id="navSwitch"
                  className=""
                >
                  {t("attendance")}
                </Nav.Link>

                <Nav.Link
                  as={Link}
                  to={"/ClassInfo"}
                  id="navSwitch"
                  className=""
                >
                  {t("class_info")}
                </Nav.Link>

                <Nav.Link
                  as={Link}
                  to={"/Registration"}
                  id="navSwitch"
                  className="col-sm-"
                >
                  {t("registration")}
                </Nav.Link>

                <Nav.Link
                  as={Link}
                  to={"/Grades"}
                  id="navSwitch"
                  className="col-sm-"
                >
                  {t("grades")}
                </Nav.Link>

                <NavDropdown
                  className="col-sm-"
                  title={
                    loggedInUser ? (
                      <>
                        <i className="bi bi-person"> </i> {loggedInUser}
                      </>
                    ) : (
                      <>
                        <i className="bi bi-person" /> {t("account")}
                      </>
                    )
                  }
                  menuVariant="none"
                  id="navSwitch"
                >
                  {userSession ? (
                    <>
                      <NavDropdown.Item onClick={logout} id="nav-link">
                        {t("logout")}
                      </NavDropdown.Item>

                      <NavDropdown.Item
                        href={"https://simpleschoolsystem.pythonanywhere.com/admin"}
                        id="nav-link"
                        target="blank_"
                      >
                        <i className="bi bi-speedometer2" id="" />{" "}
                        {t("admin_dashboard_nav")}
                      </NavDropdown.Item>
                    </>
                  ) : (
                    <>
                      <NavDropdown.Item
                        as={Link}
                        to={"/LoginForm"}
                        id="nav-link"
                      >
                        {t("login")}
                      </NavDropdown.Item>
                      <NavDropdown.Item
                        as={Link}
                        to={"/SignUpForm"}
                        id="nav-link"
                      >
                        {t("signup")}
                      </NavDropdown.Item>
                    </>
                  )}
                </NavDropdown>

                <NavDropdown
                  id="navSwitch"
                  title={
                    <img
                      className="img-fluid lang-icon"
                      src="/static/images/icon.jpg"
                      alt=""
                    />
                  }
                >
                  {" "}
                  {Object.keys(lngs).map((lng) => (
                    <NavDropdown.Item
                      key={lng}
                      type="submit"
                      onClick={() => i18n.changeLanguage(lng)}
                      id="nav-link"
                    >
                      {lngs[lng].nativeName === "English" ? (
                        <div id="nav-link">
                          <img
                            className="lang-icon"
                            src="/static/images/icon.jpg"
                            alt=""
                          />
                        </div>
                      ) : (
                        <div id="nav-link">
                          <img
                            className="lang-icon"
                            src="/static/images/icon-2.png"
                            alt=""
                          />
                        </div>
                      )}
                    </NavDropdown.Item>
                  ))}
                </NavDropdown>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </Container>

      <Switch>
        <Route path="/students">
          <StudentList />
        </Route>

        <Route path="/attendance">
          <Attendance />
        </Route>

        <Route path="/classinfo">
          <ClassInfo />
        </Route>

        <Route path="/signupform">
          <SignUpForm />
        </Route>

        <Route path="/registration">
          <Registration />
        </Route>

        <Route path="/loginform">
          <LoginForm />
        </Route>

        <Route path="/grades">
          <Grades />
        </Route>

        <Route path="/studentdetails/:id">
          <SingleStudent />
        </Route>

        <Route path="/editstudent/:id">
          <EditStudent />
        </Route>
      </Switch>
    </Router>
  );
};

export default Navigation;
