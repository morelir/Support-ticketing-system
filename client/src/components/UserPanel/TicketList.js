import React, { useState } from "react";
import styles from "./TicketList.module.css";
import Button from "../../shared/FormElements/Button";

const TicketList = () => {
  return (
    <div className={styles.subRight_container}>
      <div className={styles.boundaryLine}></div>
      <Button style={{ width: "300px", high: "75px" }} color="grey" size="big">
        ticket
      </Button>
      <Button style={{ width: "300px", high: "75px" }} color="grey" size="big">
        ticket
      </Button>
      <Button color="grey" size="big">
        ticket
      </Button>
      <Button color="grey" size="big">
        ticket
      </Button>
      <Button color="grey" size="big">
        ticket
      </Button>
    </div>
  );
};

export default TicketList;
