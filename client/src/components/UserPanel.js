import React, { useState, useContext, useEffect, useCallback } from "react";
import Axios from "axios";
import AuthContext from "../store/auth-context";
import styles from "./UserPanel.module.css";
import NewTicket from "./UserPanel/NewTicket";
import Spinner from "react-bootstrap/Spinner";
import Ticket from "./UserPanel/Ticket";
import Dashboard from "./UserPanel/Dashboard";
import { capitalizeFirstLetter } from "../utils/functions";

const UserPanel = (props) => {
  const authCtx = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);
  const [tickets, setTickets] = useState([]);
  const [urgency, setUrgency] = useState({});
  const config = {
    headers: { "x-api-key": authCtx.user.token },
  };

  const getData = async () => {
    try {
      let response;
      if (props.location.state) {
        response = await Axios.get("AdminPanel/clientTickets", {
          params: {
            id: props.location.state.user._id,
          },
          headers: { "x-api-key": authCtx.user.token },
        });
      } else {
        response = await Axios.get("UserPanel/tickets", config);
      }
      setTickets(response.data.tickets);
      setUrgency({
        low: response.data.low,
        medium: response.data.medium,
        high: response.data.high,
      });
      setIsLoading(false);
      // setIsOpen(true);
    } catch (err) {
      console.log("err");
      console.log(err.response);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const updateTickets = (tickets, low, medium, high) => {
    setIsLoading(true);
    setTickets(tickets);
    setUrgency({ low: low, medium: medium, high: high });
    setIsLoading(false);
  };

  const updateTicketAttr = (ticket,name,value) => {
    setIsLoading(true);
    setTickets(tickets.map((tick)=>{
      if (tick._id===ticket._id)
        tick[name]=value;
      return tick;
    }))
    setIsLoading(false);
  };

  return (
    <main>
      <div className={`${styles["container-max-width"]} container-xl `}>
        {!isLoading && (
          <Dashboard
            low={urgency.low}
            medium={urgency.medium}
            high={urgency.high}
          />
        )}
        <div className={styles["table-responsive"]}>
          <div className={styles["table-wrapper"]}>
            <div className={styles["table-title"]}>
              <div className="row">
                <div className={styles["col-sm-2"]}>
                  <h2>
                    <strong>Ticket List</strong>
                    {authCtx.user.role === "admin" && (
                      <strong>
                        {" "}
                        -{" "}
                        {capitalizeFirstLetter(props.location.state.user.name)}
                      </strong>
                    )}
                  </h2>
                </div>

                {!isLoading && authCtx.user.role !== "admin" && (
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
                      return (
                        <Ticket ticket={ticket} pos={pos} key={ticket._id} updateTicketAttr={updateTicketAttr} />
                      );
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
