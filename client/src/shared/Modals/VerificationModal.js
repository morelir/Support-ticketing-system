import React, { useState, useEffect } from "react";
// import Button from "react-bootstrap/Button";
import Button from "../FormElements/Button";
import Modal from "react-bootstrap/Modal";
import Spinner from "react-bootstrap/Spinner";
import styles from "./VerificationModal.module.css";
import Form from "react-bootstrap/Form";
import CloseButton from "react-bootstrap/CloseButton";
import axios from "axios";

const VerificationModal = (props) => {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState("");
  const reset = () => {
    setErrors("");
  };
  const handleClose = () => {
    reset();
    props.setShowVerification(false);
  };

  const handle = async () => {
    setLoading(true);
    try {
      props.handle();
      handleClose();
    } catch (err) {
      setErrors(err.message)
    }
    setLoading(false);
  };

  // #closeModal
  return (
    <>
      <Modal
        show={props.show}
        backdrop="static"
        keyboard={false}
        className={styles["modal"]}
        dialogClassName={styles["modal-dialog"]}
        contentClassName={styles["modal-content"]}
      >
        <Modal.Header className={`${styles["modal-header"]}`}>
          <Modal.Title>
            <h3>
              <strong>{props.header}</strong>
              <CloseButton
                onClick={handleClose}
                variant="white"
                style={{
                  position: "absolute",
                  top: "20px",
                  right: "10px",
                  fontSize: "1.5rem",
                  marginBottom: "0.5",
                }}
              />
            </h3>
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          {props.children}
          <Form.Text>{errors}</Form.Text>
        </Modal.Body>

        <Modal.Footer>
          {!loading ? (
            <Button
              style={{ width: "100%" }}
              variant="primary"
              onClick={handle}
            >
              <strong>Continue</strong>
            </Button>
          ) : (
            <Button variant="primary">
              <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
              />
              Continue...
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default VerificationModal;
