import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import styles from "./MessageModal.module.css";

const MessageModal = (props) => {
  const handleClose = () => {
    props.setShowCreatedMessage(false);
  };

  return (
    <Modal
      show={props.showCreatedMessage}
      className={styles.modal}
      contentClassName={styles["modal-content"]}
    >
      <Modal.Header className={styles["modal-header"]}>
        <Modal.Title>
          <h3>
            <strong>{props.header}</strong>
          </h3>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>{props.children}</Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={handleClose}>
          Confirm
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default MessageModal;
