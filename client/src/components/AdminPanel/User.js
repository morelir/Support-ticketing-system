import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import styles from "./User.module.css";
import { capitalizeFirstLetter } from "../../utils/functions";
import Image from "react-bootstrap/Image";

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
      pathname: `/AdminPanel/${props.user._id}`,
      // to access state at the new path use props.location.state
      state: {
        user: props.user,
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
        style={{ position: "relative" }}
      >
        <td>{props.pos}</td>
        <td >
          <Image className={styles.profile} src={props.user.filePath} />
          <strong>{capitalizeFirstLetter(props.user.name)}</strong>
        </td>
        <td>{props.user.email}</td>

        <td>
          {capitalizeFirstLetter(props.user.role)}
        </td>

        <td style={{textAlign: "center"}}>
          {props.user.openTickets}
        </td>

        <td style={{textAlign: "center"}}>
          {props.user.generalTickets}
        </td>
      </tr>

    </>
  );
};

export default User;
