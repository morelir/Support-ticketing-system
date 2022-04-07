import React, { useState, useContext, useEffect, useCallback } from "react";
import Axios from "axios";
import AuthContext from "../store/auth-context";
import styles from "./UserPanel.module.css";
import Row from "react-bootstrap/Row";
import Table from "react-bootstrap/Table";
import Button from "../shared/FormElements/Button";
import NewTicket from "./UserPanel/NewTicket";
import Spinner from "react-bootstrap/Spinner";
import { displayDate, getTimeDuration } from "../utils/functions";

const UserPanel = () => {
  const authCtx = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);
  const [tickets, setTickets] = useState([]);

  const evenPos = (pos) => pos % 2 == 0;

  const getData = async () => {
    try {
      // let response = await Axios.get("UserPanel/tickets");
      // setTickets(defaultFilter(response.data, authCtx.user.team));

      setIsLoading(false);
      // setIsOpen(true);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(async () => {
    await getData();
  }, []);

  const updateTickets = (tickets) => {
    setTickets(tickets);
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

                    <NewTicket  updateTickets={updateTickets} />
                  </div>
                )}
              </div>
            </div>
            <table
              className="table"
            >
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
                      return (
                        <React.Fragment key={ticket.number}>
                          <tr
                            className={
                              evenPos(pos)
                                ? styles["ticket-even-pos"]
                                : styles["ticket-odd-pos"]
                            }
                            // id={evenPos(pos) ? "ticket-even-pos" : "ticket-odd-pos"}
                          >
                            <td>{ticket.number}</td>

                            <td>
                              <strong>{ticket.status} </strong>
                            </td>

                            <td>{displayDate(ticket.open_date)}</td>
                            <td>{displayDate(ticket.close_date)}</td>

                            <td
                              className={
                                styles[`urgencyLevel-${ticket.urgencyLevel}`]
                              }
                            >
                              <strong>{ticket.urgencyLevel}</strong>
                            </td>
                            <td>{getTimeDuration(ticket.date_created)}</td>
                            {/* <td>
                            <EditFaultModel
                              fault={fault}
                              teams={teams.filter(
                                (team) =>
                                  team.name === "Technical service" ||
                                  team.name === "Customer service"
                              )}
                              users={users}
                              clients={clients}
                              updateFaults={updateFaults}
                            />
                            {authCtx.user.team === "Customer service" ? (
                              <>
                                <ModalDialog
                                  type="fault"
                                  _id={fault._id}
                                  authCtx={authCtx}
                                  Activity={faultActivity}
                                  native="/faultManagement/closeFault"
                                  update={updateFaults}
                                  className="close"
                                  btn_name="Close"
                                  btn_disabled={fault.status !== "Done"}
                                  icon="lock"
                                  icon_font="20px"
                                  href="#closeModal"
                                  header="Close Fault"
                                >
                                  <Form.Group>
                                    <Form.Label>
                                      <strong>
                                        Are you sure you want to close the fault
                                        ?
                                      </strong>
                                    </Form.Label>
                                  </Form.Group>
                                </ModalDialog>
                              </>
                            ) : (
                              <>
                                <NewRequestModal
                                  products={products}
                                  number={fault.number}
                                  updateFaults={updateFaults}
                                  request={fault.request}
                                  urgencyLevel={fault.urgencyLevel}
                                  team="Stock"
                                />
                                <ModalDialog
                                  type="fault"
                                  _id={fault._id}
                                  authCtx={authCtx}
                                  Activity={faultActivity}
                                  native="/faultManagement/doneFault"
                                  update={updateFaults}
                                  className="done"
                                  btn_name="Done"
                                  btn_disabled={fault.request}
                                  icon="check_circle_outline"
                                  icon_font="21"
                                  href="#doneModal"
                                  header="Done Fault"
                                >
                                  <Form.Group>
                                    <Form.Label>
                                      <strong>
                                        Are you sure the fault has been done ?
                                      </strong>
                                    </Form.Label>
                                  </Form.Group>
                                </ModalDialog>
                              </>
                            )}
                          </td> */}
                          </tr>
                          <tr
                            className={
                              evenPos(pos)
                                ? styles["ticket-even-pos"]
                                : styles["ticket-odd-pos"]
                            }
                          >
                            <td
                              colSpan="9"
                              className={styles["ticket-description"]}
                            >
                              <span>{ticket.description}</span>
                            </td>
                          </tr>
                        </React.Fragment>
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
