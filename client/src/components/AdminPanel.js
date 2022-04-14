import React, { useState, useContext, useEffect, useCallback } from "react";
import Axios from "axios";
import AuthContext from "../store/auth-context";
import styles from "./AdminPanel.module.css";
import NewTicket from "./UserPanel/NewTicket";
import Spinner from "react-bootstrap/Spinner";
import Ticket from "./UserPanel/Ticket";
import Dashboard from "./UserPanel/Dashboard";
import User from "./AdminPanel/User";

const AdminPanel = () => {
  const authCtx = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const config = {
    headers: { "x-api-key": authCtx.user.token },
  };

  const getData = async () => {
    try {
      let response = await Axios.get("AdminPanel/users", config);
      setUsers(response.data.users);
      setIsLoading(false);
    } catch (err) {
      console.log("err");
      console.log(err.response);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const updateUsers = (users) => {
    setIsLoading(true);
    setUsers(users);
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
                    <strong>Clients</strong>
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

                    {/* <NewTicket updateTickets={updateTickets} /> */}
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
                  <th>Client Name</th>
                  <th>Open Tickets Number</th>
                  <th>General Tickets Number</th>
                </tr>
              </thead>
              <tbody>
                {!isLoading ? (
                  users.length === 0 ? (
                    <tr className={styles["ticket-even-pos"]}>
                      <td colSpan="3">
                        <strong>Not Found</strong>
                      </td>
                    </tr>
                  ) : (
                    users.map((user, pos) => {
                      return (
                        <User user={user} pos={pos} key={user._id} />
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

export default AdminPanel;
