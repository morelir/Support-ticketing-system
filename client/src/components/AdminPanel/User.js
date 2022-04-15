import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import styles from "./User.module.css";
import Modal from "react-bootstrap/Modal";
import { displayDate, getTimeDuration } from "../../utils/functions";
import Button from "../../shared/FormElements/Button";
import UserPanel from "../UserPanel";

const User = (props) => {
  const evenPos = (pos) => pos % 2 == 0;
  const history = useHistory();
  const [show, setShow] = useState(false);
  const [savingForm, setSavingForm] = useState(false);
  const handleClose = () => {
    setShow(false);
  };
  const handleOpen = () => {
    // setShow(true);
    history.push({
      pathname: "/UserPanel",
      state: {
        // location state
        user:props.user
      },
    });
  };
  return (
    <>
      <tr
        className={
          evenPos(props.pos) ? styles["user-even-pos"] : styles["user-odd-pos"]
        }
        onClick={handleOpen}
      >
        <td>{props.user.name}</td>

        <td>
          <strong>3 </strong>
        </td>

        <td>
          <strong>9 </strong>
        </td>
      </tr>

      {/* <Modal
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
              <strong>Client Tickets</strong>
            </h3>
          </Modal.Title>
        </Modal.Header>

        <Modal.Body className={styles["modal-body"]}>
            <UserPanel user={props.user}/>
        </Modal.Body>
      </Modal> */}
    </>
  );
};

export default User;
