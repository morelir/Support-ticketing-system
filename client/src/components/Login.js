import React, { useState, useContext } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import styles from "./Login.module.css";
import Axios from "axios";
import AuthContext from "../store/auth-context";
import { useHistory } from "react-router-dom";
import Message from "../shared/FormElements/Message";

const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState("");
  const authCtx = useContext(AuthContext);
  const history = useHistory();

  function validateForm() {
    return email.length > 0 && password.length > 0;
  }

  function handleSubmit(event) {
    event.preventDefault();
    setErrors("");
    Axios.post("/Login", {
      email: email,
      pass: password,
    })
      .then((response) => {
        console.log(response.data.user);
        const expirationTime = new Date(new Date().getTime() + 3600 * 1000);
        const objUserAndToken = {
          ...response.data.user,
          token: response.data.token,
        };
        authCtx.login(objUserAndToken, expirationTime.toISOString());
        console.log(authCtx.isLoggedIn);
        if (response.data.user.role === "regular")
          history.replace("/UserPanel");
        else if (response.data.user.role === "admin")
          history.replace("/AdminPanel");
        else history.replace("/");
      })
      .catch((err) => {
        setErrors(err.response.data.msg);
      });
  }
  if (authCtx.isLoggedIn) {
    return <h1 style={{color:"white"}}>This page is not available</h1>
  } else {
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
            <Button size="lg" type="submit" disabled={!validateForm()}>
              Login
            </Button>
            <Message error style={{ marginTop: "20px" }}>
              {errors}
            </Message>
          </Form>
        </div>
      </div>
    );
  }
};

export default Login;
