import React, { useState } from "react";
import styles from "./Ticket.module.css";
import { displayDate, getTimeDuration } from "../../utils/functions";
import Button from "../../shared/FormElements/Button";
import EditTicket from "./Ticket/EditTicket";

const Ticket = (props) => {
  const evenPos = (pos) => pos % 2 == 0;
  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
  };
  const handleOpen = () => {
    setShow(true);
  };
  return (
    <>
      <tr
        className={
          evenPos(props.pos)
            ? styles["ticket-even-pos"]
            : styles["ticket-odd-pos"]
        }
        onClick={handleOpen}
        // id={evenPos(pos) ? "ticket-even-pos" : "ticket-odd-pos"}
      >
        <td>{props.ticket.number}</td>

        <td>
          <strong>{props.ticket.status} </strong>
        </td>

        <td>{displayDate(props.ticket.open_date)}</td>
        

        <td className={styles[`urgencyLevel-${props.ticket.urgencyLevel}`]}>
          <strong>{props.ticket.urgencyLevel}</strong>
        </td>
        <td>{getTimeDuration(props.ticket.open_date)}</td>
        <td></td>
      </tr>
      <tr
        className={
          evenPos(props.pos)
            ? styles["ticket-even-pos"]
            : styles["ticket-odd-pos"]
        }
        onClick={handleOpen}
      >
        <td colSpan="9" className={styles["ticket-description"]}>
          <span>{props.ticket.description}</span>
        </td>
      </tr>
      <EditTicket ticket={props.ticket} show={show} handleClose={handleClose}/>
    </>
  );
};

export default Ticket;
