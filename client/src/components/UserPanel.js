import React, { useState, useContext, useEffect, useCallback } from "react";
import Axios from "axios";
import AuthContext from "../store/auth-context";
import styles from "./UserPanel.module.css";
import Row from "react-bootstrap/Row";
import Button from "../shared/FormElements/Button";
import NewTicket from "./UserPanel/NewTicket";
import TicketList from "./UserPanel/TicketList";

const UserPanel = () => {
  const authCtx = useContext(AuthContext);
  const [user, setUser] = useState();

  // const getUserDetail = useCallback(() => {
  //   Axios.get("/users/userinfo", {
  //     headers: { "x-api-key": authCtx.user.token },
  //   })
  //     .then((response) => {
  //       setUser(response.data);
  //     })
  //     .catch((err) => {
  //       console.log(err.response.data.msg);
  //     });
  // });

  // useEffect(() => {
  //   getUserDetail();
  // }, []);

  return (
    <div className={styles.container}>
      <Row>
        <NewTicket/>
        <TicketList/>
      </Row>
    </div>
  );
};

export default UserPanel;
