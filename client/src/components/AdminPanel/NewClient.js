import React, { useState, useContext, useEffect } from "react";
import AuthContext from "../../store/auth-context";
import styles from "./NewClient.module.css";
import Button from "../../shared/FormElements/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Spinner from "react-bootstrap/Spinner";
import Message from "../../shared/FormElements/Message";
import { MdOutlineAddCircle } from "react-icons/md";
import axios from "axios";

const initialState = {
  name: "",
  email: "",
  pass: "",
  confPass: "",
  formIsValid: false,
};

const NewClient = (props) => {
  const authCtx = useContext(AuthContext);
  const [show, setShow] = useState(false);
  const [savingForm, setSavingForm] = useState(false);
  const [{ name, email, pass, confPass, formIsValid }, setState] =
    useState(initialState);

  const config = {
    headers: { "x-api-key": authCtx.user.token },
  };

  const handleClose = () => {
    setShow(false);
  };

  const handleOpen = () => {
    setShow(true);
  };

  const reset = () => {
    setState({ ...initialState });
  };

  const submit = async (e) => {
    e.preventDefault();
    setSavingForm(true);
    try {
      let response = await axios.post(
        "/AdminPanel/newClient",
        {
          name: name,
          email: email,
          pass: pass,
        },
        config
      );
      props.updateClients(response.data.users);
    } catch (err) {
      console.log(err.response.data.msg);
    }
    setSavingForm(false);
  };

  useEffect(() => {
    const identifier = setTimeout(() => {
      console.log("checking form validity");
      setState((prevState) => {
        return {
          ...prevState,
          formIsValid:
            name.length > 2 &&
            email.includes("@") > 0 &&
            email.length > 2 &&
            pass.length > 3 &&
            confPass.length > 3 &&
            pass === confPass,
        };
      });
    }, 250);
    return () => {
      console.log("Clean-Up Timeout");
      clearTimeout(identifier);
    };
  }, [name, email, pass, confPass]);

  const handleChange = (e) => {
    setState((prevState) => {
      return { ...prevState, [e.target.name]: e.target.value };
    });
  };

  return (
    <>
      <Button
        className={styles.btnNewClient}
        onClick={handleOpen}
        colorHover="white"
        style={{ fontSize: "1.2rem" }}
      >
        <strong>New Client</strong>{" "}
        <MdOutlineAddCircle style={{ marginBottom: "5px" }} />
      </Button>

      <Modal
        show={show}
        backdrop="static"
        keyboard={false}
        className={styles["modal"]}
        dialogClassName={styles["modal-dialog"]}
        contentClassName={styles["modal-content"]}
      >
        <Modal.Header className={styles["modal-header"]}>
          <Modal.Title>
            <h3>
              <strong>New Client</strong>
            </h3>
          </Modal.Title>
        </Modal.Header>
        <Form onSubmit={submit}>
          <Modal.Body className={styles["modal-body"]}>
            <Row className="mb-3" style={{ marginTop: "15px" }}>
              <Form.Group as={Col}>
                <Form.Label>
                  <strong>
                    Name <span style={{ color: "orange" }}>*</span>
                  </strong>
                </Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={name}
                  onChange={handleChange}
                />
              </Form.Group>
            </Row>
            <Row className="mb-3" style={{ marginTop: "15px" }}>
              <Form.Group as={Col}>
                <Form.Label>
                  <strong>
                    Email <span style={{ color: "orange" }}>*</span>
                  </strong>
                </Form.Label>
                <Form.Control
                  type="text"
                  name="email"
                  value={email}
                  onChange={handleChange}
                />
              </Form.Group>
            </Row>
            <Row className="mb-3" style={{ marginTop: "15px" }}>
              <Form.Group as={Col}>
                <Form.Label>
                  <strong>
                    Password <span style={{ color: "orange" }}>*</span>
                  </strong>
                </Form.Label>
                <Form.Control
                  type="password"
                  name="pass"
                  value={pass}
                  onChange={handleChange}
                />
              </Form.Group>
            </Row>
            <Row className="mb-3" style={{ marginTop: "15px" }}>
              <Form.Group controlId="formFile" className="mb-3" as={Col}>
                <Form.Label>
                  <strong>
                    Confirm Password <span style={{ color: "orange" }}>*</span>
                  </strong>
                </Form.Label>
                <Form.Control
                  type="password"
                  name="confPass"
                  value={confPass}
                  onChange={handleChange}
                />
              </Form.Group>
            </Row>
          </Modal.Body>
          <Modal.Footer className={styles["modal-footer"]}>
            <Button
              onClick={() => {
                handleClose();
                reset();
              }}
              disabled={savingForm}
              color="grey-modal"
              type="button"
            >
              Close
            </Button>
            {!savingForm ? (
              <Button disabled={!formIsValid} color="blue-modal" type="submit">
                Save
              </Button>
            ) : (
              <Button variant="primary" disabled>
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />
                <span> Saving...</span>
              </Button>
            )}
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};

export default NewClient;
