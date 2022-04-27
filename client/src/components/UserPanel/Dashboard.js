import React, { useState, useContext } from "react";
import styles from "./Dashboard.module.css";
import image from "../../images/dashboard/circle.png";
import { FaRocket } from "react-icons/fa";
import { AiFillCar } from "react-icons/ai";
import { BiCycling } from "react-icons/bi";

const Dashboard = (props) => {
  return (
    <div className="row" >
      <div className={`col-md-4 `}>
        <div
          style={{
            background:
              "linear-gradient(90deg, rgb(217, 132, 132), rgb(205, 7, 7))",
          }}
          className={`${styles["card"]} text-white`}
        >
          <div className="card-body">
            <img
              src={image}
              className={styles["card-img-absolute"]}
              alt="circle"
            />
            <h4 className="font-weight-normal mb-3">
              <strong>
                High Urgency Level
                <br />
                Open Tickets{" "}
              </strong>
              <FaRocket
                style={{
                  position: "absolute",
                  fontSize: "50px",
                  top: "40px",
                  right: "20px",
                }}
              />
            </h4>
            <h4 className="mb-5">
              <strong>{props.high}</strong>
            </h4>
            {/* <h6 className="card-text">Increased by 60%</h6> */}
          </div>
        </div>
      </div>
      <div className="col-md-4">
        <div
          style={{
            background: "linear-gradient(90deg,#90caf9,#047edf 99%)",
          }}
          className={`${styles["card"]} text-white`}
        >
          <div className="card-body">
            <img
              src={image}
              className={styles["card-img-absolute"]}
              alt="circle"
            />
            <h4 className="font-weight-normal mb-3">
              <strong>
                Medium Urgency Level
                <br />
                Open Tickets{" "}
              </strong>
              <AiFillCar
                style={{
                  position: "absolute",
                  fontSize: "50px",
                  top: "40px",
                  right: "20px",
                }}
              />
            </h4>
            <h4 className="mb-5">
              <strong>{props.medium}</strong>
            </h4>
            {/* <h6 className="card-text">Decreased by 10%</h6> */}
          </div>
        </div>
      </div>
      <div className="col-md-4 stretch-card grid-margin">
        <div
          style={{
            background:
              "linear-gradient(90deg, rgb(153, 213, 140), rgb(10, 213, 80))",
          }}
          className={`${styles["card"]} text-white`}
        >
          <div className="card-body">
            <img
              src={image}
              className={styles["card-img-absolute"]}
              alt="circle"
            />
            <h4 className="font-weight-normal mb-3">
              <strong>
                Low Urgency Level
                <br />
                Open Tickets{" "}
              </strong>
              <BiCycling
                style={{
                  position: "absolute",
                  fontSize: "50px",
                  top: "40px",
                  right: "20px",
                }}
              />
            </h4>
            <h4 className="mb-5">
              <strong>{props.low}</strong>
            </h4>
            {/* <h6 className="card-text">Decreased by 10%</h6> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
