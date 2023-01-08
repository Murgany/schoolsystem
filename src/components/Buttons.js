import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export const AdminBtn = () => {
  return (
    <Button
      href={"https://simpleschoolsystem.pythonanywhere.com/admin"}
      target="blank_"
      id="buttons"
      className="btn-sm"
    >
      <i className="bi bi-speedometer2 main" />
    </Button>
  );
};

export const HomeButton = () => {
  return (
    <Button
      as={Link}
      to="/students"
      variant="none"
      id="buttons"
      className="btn-sm"
    >
      <i className="bi bi-house main" />
    </Button>
  );
};

export const SubmitBtn = () => {
  return (
    <Button
      type="submit"
      variant="none"
      id="buttons"
      className="btn-sm"
    >
      <i className="bi bi-check-circle main" />
    </Button>
  );
};

export const CancelBtn = () => {
  return (
    <Button
      as={Link}
      to="/students"
      variant="none"
      id="buttons"
      className="btn-sm"
    >
      <i className="bi bi-x-circle main" />
    </Button>
  );
};


/* eslint import/no-anonymous-default-export: [2, {"allowObject": true}] */
export default {
  HomeButton,
};
