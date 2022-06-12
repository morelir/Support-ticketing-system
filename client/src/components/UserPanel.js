import React, { useState, useContext, useEffect, useCallback } from "react";
import Axios from "axios";
import AuthContext from "../store/auth-context";
import { useHistory } from "react-router-dom";
import styles from "./UserPanel.module.css";
import NewTicket from "./UserPanel/NewTicket";
import Spinner from "react-bootstrap/Spinner";
import { IoArrowBackCircleSharp } from "react-icons/io5";
import Ticket from "./UserPanel/Ticket";
import Dashboard from "./UserPanel/Dashboard";
import { BsFilter } from "react-icons/bs";
import {
  capitalizeFirstLetter,
  firstLetterToLowerCase,
} from "../utils/functions";
import Filter from "./UserPanel/Filter";

const UserPanel = (props) => {
  const authCtx = useContext(AuthContext);
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(true);
  const [allTickets, setAllTickets] = useState([]);
  const [tickets, setTickets] = useState([]);
  const [urgency, setUrgency] = useState({});
  const config = {
    headers: { "x-api-key": authCtx.user.token },
  };
  const [client, setClient] = useState({});
  const [filterOpen, setFilterOpen] = useState(false);
  const handleFilterOpen = () => {
    if (!filterOpen) setFilterOpen(true);
    else setFilterOpen(false);
  };

  const getData = async () => {
    try {
      let response;
      let data = Date.now();
      if (props.location.state) {
        setClient(props.location.state.user);
        response = await Axios.get("AdminPanel/clientTickets", {
          params: {
            id: props.location.state.user._id,
          },
          headers: { "x-api-key": authCtx.user.token },
        });
      } else {
        response = await Axios.get("UserPanel/tickets", config);
      }
      console.log(Date.now() - data);
      setAllTickets(response.data.tickets);
      setTickets(response.data.tickets);
      setUrgency({
        low: response.data.low,
        medium: response.data.medium,
        high: response.data.high,
      });
      setIsLoading(false);
      setFilterOpen(true);
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
    setAllTickets(tickets);
    setTickets(tickets);
    setUrgency({ low: low, medium: medium, high: high });
    setIsLoading(false);
  };

  const OnTicketsFilter = (tickets) => {
    setIsLoading(true);
    setTickets(tickets);
    setIsLoading(false);
  };

  const resetTickets = () => {
    setTickets(allTickets);
  };

  const updateTicketAttr = (ticket, index, names, values) => {
    let statusChanged = false;
    names.map((name, pos) => {
      if (name === "status" && ticket[name] !== values[pos])
        statusChanged = true;
      if (name === "status" && values[pos] === "Close") {
        setUrgency((prev) => {
          return {
            ...prev,
            [firstLetterToLowerCase(ticket["urgencyLevel"])]:
              prev[firstLetterToLowerCase(ticket["urgencyLevel"])] - 1,
          };
        });
      }
      if (name === "urgencyLevel") {
        setUrgency((prev) => {
          return {
            ...prev,
            [firstLetterToLowerCase(values[pos])]:
              prev[firstLetterToLowerCase(values[pos])] + 1,
            [firstLetterToLowerCase(ticket[name])]:
              prev[firstLetterToLowerCase(ticket[name])] - 1,
          };
        });
      }
      ticket[name] = values[pos];
    });
    let newTickets = [
      ...tickets.slice(0, index),
      ticket,
      ...tickets.slice(index + 1),
    ];
    if (statusChanged) {
      newTickets.sort((a, b) => {
        if (a.status === "Close")
          return 1; //a is greater than b by the ordering criterion
        else if (b.status === "Close")
          return -1; //a is less than b by some ordering criterion
        else if (a.status === "Working on it") return 1;
        else if (b.status === "Working on it") return -1;
        else return 0;
      });
    }
    setTickets((prev) => newTickets);
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
              {authCtx.user.role === "admin" && (
                <IoArrowBackCircleSharp
                  className={styles["arrowBack"]}
                  onClick={() => {
                    history.replace("/AdminPanel");
                  }}
                />
              )}
              <BsFilter
                title="filter"
                className={styles["filter"]}
                onClick={handleFilterOpen} 
              />
              <div className="row">
                <div className={styles["col-sm-2"]}>
                  <h2>
                    <strong>Ticket List</strong>
                    {authCtx.user.role === "admin" && (
                      <>
                        <strong>
                          {" "}
                          -{" "}
                          {capitalizeFirstLetter(
                            props.location.state.user.name
                          )}{" "}
                        </strong>
                        {/* <Image className={styles.profile} src={client.filePath} /> */}
                      </>
                    )}
                  </h2>
                </div>

                {!isLoading && authCtx.user.role !== "admin" && (
                  <div className={styles["col-sm-10"]}>
                    {/* <a className={styles["btn"]}> */}

                    {/* </a> */}
                    <NewTicket updateTickets={updateTickets} />
                  </div>
                )}
              </div>
            </div>
            {/* table */}
            <table className={` ${styles.table}`}> 
              <Filter
                tickets={allTickets}
                open={filterOpen}
                update={OnTicketsFilter}
                reset={resetTickets}
              />
              <thead  >
                <tr>
                  <th>No.</th>
                  <th>Status</th>
                  <th>Open Date</th>
                  <th>Urgency Level</th>
                  <th>Handling Duration</th>
                </tr>
              </thead>
              <tbody >
                {!isLoading ? (
                  tickets.length === 0 ? (
                    <tr className={styles["ticket-even-pos"]}>
                      <td colSpan="9">
                        <strong>No tickets found </strong>
                      </td>
                    </tr>
                  ) : (
                    tickets.map((ticket, pos) => {
                      return (
                        <Ticket
                          ticket={ticket}
                          pos={pos}
                          key={ticket._id}
                          updateTicketAttr={updateTicketAttr}
                          client={client}
                        />
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
