import React, { useState } from "react";
import { registerUser } from "../api";
import { Input, Button } from "@material-ui/core";
import { useForm, Controller } from "react-hook-form";

export default function Register() {
  const { control, handleSubmit, reset } = useForm();
  const [result, setResult] = useState("");

  const onSubmit = ({ email, password }) => {
    registerUser(email, password).then((res) => {
      if (res.status === 201 && res.data.success) {
        setResult("Account successfully registered");
      } else if (res.data.error) {
        if (res.status === 401) {
          setResult("Need both email and password as input");
        } else if (res.status === 409) {
          setResult("User already registered");
        }
      }
    });
  };

  return (
    <div>
      <h3>Register</h3>
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
