import { loginUser } from "../api";
import React, { useState } from "react";
import { setSession } from "../helpers";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import AccountForm from "../components/AccountForm";
import { useForm } from "react-hook-form";

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

export default function Login() {
  const { reset } = useForm();
  const [result, setResult] = useState("");
  const [open, setOpen] = useState(false);
  const [severity, setSeverity] = useState("");
  const history = useHistory();

  const onSubmit = ({ username, password }) => {
    loginUser(username, password).then((res) => {
      if (res.status === 200) {
        setSession(res.data.token);
        setResult("Login Successfull");
        setSeverity("success");
        history.push("/login");
      } else if (res.status === 401) {
        setSeverity("error");
        setResult(res.data.message);
        reset();
      }
      setOpen(true);
    });
  };
  return (
    <AccountForm
      type="Login"
      submit={onSubmit}
      styles={useStyles}
      open={open}
      result={result}
      severity={severity}
    />
  );
}
