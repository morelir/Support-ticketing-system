import React, { useState, useContext, useReducer, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import styles from "./Login.module.css";
import Axios from "axios";
import AuthContext from "../store/auth-context";
import { useHistory } from "react-router-dom";
import Message from "../shared/FormElements/Message";
import { randomString, sendEmail } from "../utils/functions";
import ModalDialog from "../shared/Modals/ModalDialog";
import VerificationModal from "../shared/Modals/VerificationModal";

const emailReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return { value: action.value, isValid: action.value.includes("@") };
  }
  if (action.type === "INPUT_BLUR") {
    return { value: state.value, isValid: state.value.includes("@") };
  }
  return { value: "", isValid: false };
};

const passwordReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return { value: action.value, isValid: action.value.length > 2 };
  }
  if (action.type === "INPUT_BLUR") {
    return { value: state.value, isValid: state.value.length > 2 };
  }
  return { value: "", isValid: false };
};

const Login = (props) => {
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  const [showVerification, setShowVerification] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const [code, setCode] = useState("");
  const [errors, setErrors] = useState("");
  const authCtx = useContext(AuthContext);
  const history = useHistory();
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);
  const [formIsValid, setFormIsValid] = useState(false);

  const [emailState, dispatchEmail] = useReducer(emailReducer, {
    value: "",
    isValid: null,
  });

  const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
    value: "",
    isValid: null,
  });

  useEffect(()=>{
    setTimeout(()=>{
      console.log("Checking form validity")
      setFormIsValid(emailState.isValid && passwordState.isValid)
    },500)
  },[emailState.isValid,passwordState.isValid])

  // function validateForm() {
  //   return emailState.isValid && passwordState.isValid;
  // }

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    setErrors("");
    Axios.post("/Login", {
      email: emailState.value,
      pass: passwordState.value,
    })
      .then(async (response) => {
        // setUser(response.data);
        // let code = randomString(5);
        // await sendEmail(email, `Verification Code : ${code}`);
        // setVerificationCode(code);
        // setShowVerification(true);

        const expirationTime = new Date(new Date().getTime() + 3600 * 1000);
        const objUserAndToken = {
          ...response.data.user,
          token: response.data.token,
        };
        authCtx.login(objUserAndToken, expirationTime.toISOString());
        if (response.data.user.role === "regular")
          history.replace("/UserPanel");
        else if (response.data.user.role === "admin")
          history.replace("/AdminPanel");
        else history.replace("/");
      })
      .catch((err) => {
        setErrors(err.response.data.msg);
      });
    setLoading(false);
  };

  const handleVerifyCode = () => {
    console.log(verificationCode);
    if (code === verificationCode) {
      const expirationTime = new Date(new Date().getTime() + 3600 * 1000);
      const objUserAndToken = {
        ...user.user,
        token: user.token,
      };
      authCtx.login(objUserAndToken, expirationTime.toISOString());
      if (user.user.role === "regular") history.replace("/UserPanel");
      else if (user.user.role === "admin") history.replace("/AdminPanel");
      else history.replace("/");
    } else {
      console.log("err");
      throw new Error(
        "The code you entered is not matched to the verification code."
      );
    }
  };

  if (authCtx.isLoggedIn) {
    return <h1 style={{ color: "white" }}>This page is not available</h1>;
  } else {
    return (
      <div>
        <div className={styles.login}>
          <h1 className={styles.login_header}>Login</h1>
          <Form onSubmit={handleSubmit}>
            <Form.Group
              className={`${styles.control} ${
                emailState.isValid===false && styles.invalid
              }`}
              size="lg"
              controlId="email"
            >
              <label>Email</label>
              <input
                // autoFocus
                type="email"
                value={emailState.value}
                onChange={(e) =>
                  dispatchEmail({ type: "USER_INPUT", value: e.target.value })
                }
                onBlur={() => {
                  dispatchEmail({ type: "INPUT_BLUR" });
                }}
              />
            </Form.Group>
            <Form.Group
              className={`${styles.control} ${
                passwordState.isValid===false && styles.invalid 
              }`}
              size="lg"
              controlId="password"
            >
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                value={passwordState.value}
                onChange={(e) =>
                  dispatchPassword({
                    type: "USER_INPUT",
                    value: e.target.value,
                  })
                }
                onBlur={() => {
                  dispatchPassword({ type: "INPUT_BLUR" });
                }}
              />
            </Form.Group>
            {!loading ? (
              <Button size="lg" type="submit" disabled={!formIsValid}>
                Login
              </Button>
            ) : (
              <Button size="lg">
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />
                Login...
              </Button>
            )}
            <Message error style={{ marginTop: "20px" }}>
              {errors}
            </Message>
          </Form>
        </div>
        <VerificationModal
          show={showVerification}
          setShowVerification={setShowVerification}
          handle={handleVerifyCode}
          btn_name="Close Ticket"
          btn_color="green"
          header="Verification Code"
          input="Verification code"
        >
          <Form.Group>
            <Form.Label>
              For added security, we need to verify your email address. We've
              send a verification code to <strong>{emailState.value}</strong>.
            </Form.Label>
            <Form.Control
              placeholder="Verification code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
          </Form.Group>
        </VerificationModal>
      </div>
    );
  }
};

export default Login;
