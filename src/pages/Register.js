import React, { useState } from "react";
import { registerUser } from "../api";
import { makeStyles } from "@material-ui/core";
import AccountForm from "../components/AccountForm";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing.unit * 2,
  },
  padding: {
    padding: theme.spacing.unit,
  },
  alertRoot: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}));

export default function Register() {
  const [result, setResult] = useState("");
  const [open, setOpen] = useState(false);
  const [severity, setSeverity] = useState("");

  const onSubmit = ({ username, password }) => {
    registerUser(username, password).then((res) => {
      if (res.status === 201 && res.data.success) {
        setResult("Account successfully registered");
        setSeverity("success");
      } else if (res.data.error) {
        if (res.status === 401) {
          setResult("Need both email and password as input");
          setSeverity("error");
        } else if (res.status === 409) {
          setResult("User already registered");
          setSeverity("error");
        }
      }
      setOpen(true);
    });
  };

  return (
    <AccountForm
      type="Register"
      submit={onSubmit}
      styles={useStyles}
      open={open}
      result={result}
      severity={severity}
    />
  );
}
