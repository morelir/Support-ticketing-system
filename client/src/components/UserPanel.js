import React, { useState, useContext, useEffect, useCallback } from "react";
import Axios from "axios";
import AuthContext from "../store/auth-context";
import styles from "./UserPanel.module.css";
import Row from "react-bootstrap/Row";
import Table from "react-bootstrap/Table";
import Button from "../shared/FormElements/Button";
import NewTicket from "./UserPanel/NewTicket";
import Spinner from "react-bootstrap/Spinner";
import Image from "react-bootstrap/Image";
import Ticket from "./UserPanel/Ticket";

const UserPanel = () => {
  const authCtx = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);
  const [tickets, setTickets] = useState([]);
  const config = {
    headers: { "x-api-key": authCtx.user.token },
  };

  const getData = async () => {
    try {
      let response = await Axios.get("UserPanel/tickets", config);
      setTickets(response.data);
      setIsLoading(false);
      // setIsOpen(true);
    } catch (err) {
      console.log("err")
      console.log(err.response);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const updateTickets = (tickets) => {
    setIsLoading(true);
    setTickets(tickets);
    setIsLoading(false);
  };

  return (
    <main>
      <div className={`${styles["container-max-width"]} container-xl `}>
        <div className={styles["table-responsive"]}>
          <div className={styles["table-wrapper"]}>
            <div className={styles["table-title"]}>
              <div className="row">
                <div className={styles["col-sm-2"]}>
                  <h2>
                    <strong>Ticket List</strong>
                  </h2>
                </div>

                {!isLoading && (
                  <div className={styles["col-sm-10"]}>
                    {/* <a className={styles["btn"]}>
                    <BsFilterRight
                      title="faults filter"
                      onClick={handleOpen}
                      style={{ fontSize: "25px" }}
                    />
                  </a> */}

                    <NewTicket updateTickets={updateTickets} />
                  </div>
                )}
              </div>
            </div>
            <table className={`table ${styles.table}`}>
              {/* <FaultsFilter
              faults={allFaults}
              users={users}
              clients={clients}
              isOpen={isOpen}
              updateFaults={updateFaults}
              resetFaults={resetFaults}
            /> */}
              <thead>
                <tr>
                  <th>No.</th>
                  <th>Status</th>
                  <th>Open Date</th>
                  <th>Close Date</th>
                  <th>Urgency Level</th>
                  <th>Handling Duration</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {!isLoading ? (
                  tickets.length === 0 ? (
                    <tr className={styles["ticket-even-pos"]}>
                      <td colSpan="9">
                        <strong>Not Found</strong>
                      </td>
                    </tr>
                  ) : (
                    tickets.map((ticket, pos) => {
                      return <Ticket ticket={ticket} pos={pos} key={ticket._id} />;
                    })
                  )
                ) : (
                  <tr>
                    <td colSpan="9">
                      <Spinner
                        as="span"
                        animation="border"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                      />
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
};

export default UserPanel;
