import { loginUser } from "../api";
import React, { useState } from "react";
import { setSession } from "../helpers";
import { useHistory } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [result, setResult] = useState("");
  const history = useHistory();

  return (
    <div>
      <h3>Login</h3>
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
          loginUser(email, password).then((res) => {
            if (res.status === 200) {
              setSession(res.data.token);
              setResult("Login Successfull");
              history.push("/login");
            } else if (res.status === 401) {
              setResult(res.data.message);
              setPassword("");
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
