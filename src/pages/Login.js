import { loginUser } from "../api";
import React, { useState } from "react";
import { setSession } from "../helpers";
import { useHistory } from "react-router-dom";
import { Input, Button } from "@material-ui/core";
import { useForm, Controller } from "react-hook-form";

export default function Login() {
  const { control, handleSubmit, reset } = useForm();
  const [result, setResult] = useState("");
  const history = useHistory();

  const onSubmit = ({ email, password }) => {
    loginUser(email, password).then((res) => {
      if (res.status === 200) {
        setSession(res.data.token);
        setResult("Login Successfull");
        history.push("/login");
      } else if (res.status === 401) {
        setResult(res.data.message);
        reset({
          password: "",
        });
      }
    });
  };
  // TODO: Make email and password field required
  return (
    <div>
      <h3>Login</h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller as={Input} name="email" control={control} defaultValue="" />
        <Controller
          as={Input}
          name="password"
          type="password"
          control={control}
          defaultValue=""
        />
        <Button type="submit">Submit</Button>
      </form>
      <h1>{result}</h1>
    </div>
  );
}
