import React, { useState, useContext } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import styles from "./Login.module.css";
import Axios from "axios";
import AuthContext from "../store/auth-context";
import { useNavigate } from "react-router-dom";

const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState("");
  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();

  function validateForm() {
    return email.length > 0 && password.length > 0;
  }

  function handleSubmit(event) {
    event.preventDefault();
    console.log("event");
    setErrors("");
    Axios.post("/Login", {
      email: "webappscereceive@gmail.com",
      pass: "12345",
    })
      .then((response) => {
        console.log(response.data.user);
        const expirationTime = new Date(
          new Date().getTime() +  3600 * 1000
        );
        const objUserAndToken = {
          ...response.data.user,
          token: response.data.token,
        };
        console.log(objUserAndToken)
        authCtx.login(objUserAndToken, expirationTime.toISOString());
        console.log(authCtx.user);
        if (response.data.user.role === "regular") navigate("/UserPanel");
        else if (response.data.user.team === "admin") navigate("/AdminPanel");
        else navigate("/");
      })
      .catch((err) => {
        setErrors(err.response.data.msg);
      });
  }

  return (
    <div>
      <div className={styles.login}>
        <h1 className={styles.login_header}>Login</h1>
        <Form onSubmit={handleSubmit}>
          <Form.Group size="lg" controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              autoFocus
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
          <Form.Group size="lg" controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <Button block size="lg" type="submit" disabled={!validateForm()}>
            Login
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default Login;
