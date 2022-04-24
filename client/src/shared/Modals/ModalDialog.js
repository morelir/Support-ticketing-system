import React, { useState, useEffect } from "react";
// import Button from "react-bootstrap/Button";
import Button from "../FormElements/Button";
import Modal from "react-bootstrap/Modal";
import Spinner from "react-bootstrap/Spinner";
import styles from "./ModalDialog.module.css";
import axios from "axios";

const ModalDialog = (props) => {
  const [show, setShow] = useState(false);
  const [savingForm, setSavingForm] = useState(false);

  const handleClose = () => {
    setShow(false);
  };

  const handleOpen = () => {
    setShow(true);
  };

  // #closeModal
  return (
    <>
      <Button
        type="button"
        onClick={handleOpen}
        style={props.btn_style}
        color={props.btn_color}
      >
        {props.btn_name}
      </Button>

      <Modal
        show={show}
        // onHide={handleClose}
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
            </h3>
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>{props.children}</Modal.Body>

        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => {
              handleClose();
            }}
            disabled={savingForm}
            className={styles.btnNo}
            colorHover="grey"
          >
            No
          </Button>
          {!savingForm ? (
            <Button
              className={styles.btnYes}
              colorHover="grey"
              variant="primary"
              type="submit"
              onClick={() => {
                props.handle(setSavingForm,handleClose);
              }}
            >
              Yes
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
      </Modal>
    </>
  );
};

export default ModalDialog;
