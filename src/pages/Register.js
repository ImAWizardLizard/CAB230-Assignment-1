import React, { useState } from "react";
import { registerUser } from "../api";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [result, setResult] = useState("");

  return (
    <div>
      <h3>Register</h3>
      <input
        id="email"
        name="email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
      />
      <input
        id="password"
        name="password"
        value={password}
        type="password"
        onChange={(event) => setPassword(event.target.value)}
      />
      <button
        id="submit"
        type="button"
        onClick={() =>
          registerUser(email, password).then((res) => {
            if (res.status === 201 && res.data.success) {
              setResult("Account successfully registered");
              setEmail("");
              setPassword("");
            } else if (res.data.error) {
              if (res.status === 401) {
                setResult("Need both email and password as input");
              } else if (res.status === 409) {
                setResult("User already registered");
                setEmail("");
                setPassword("");
              }
            }
          })
        }
      >
        Submit
      </button>
      <h1>{result}</h1>
    </div>
  );
}
