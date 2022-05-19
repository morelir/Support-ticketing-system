import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import { BiSearchAlt } from "react-icons/bi";
import { HiOutlineRefresh } from "react-icons/hi";
import { CSSTransition } from "react-transition-group";
import Button from "../../shared/FormElements/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import styles from "./Filter.module.css";
import "./Filter.css"

const initialState = {
  number: "",
  status: "",
  from_date_open: "",
  urgencyLevel: "",
};

const Filter = (props) => {
  const [{ number, status, from_date_open, urgencyLevel}, setState] =
    useState(initialState);

  const [formIsValid, setFormIsValid] = useState(false);

  const reset = () => {
    setState({ ...initialState });
    props.reset();
  };

  const handleSearch = () => {
    props.update(
      props.tickets.filter((item) => {
        return (
          (number !== "" ? item.number === number : true) &&
          (status !== "" ? item.status === status : true) &&
          (urgencyLevel !== "" ? item.urgencyLevel === urgencyLevel : true) &&
          (from_date_open !== "" ? item.open_date >= from_date_open : true)
        );
      })
    );
  };

  const handleChange = (e) => {
    setState((prevState) => {
      return { ...prevState, [e.target.name]: e.target.value };
    });
  };

  useEffect(() => {
    const identifier = setTimeout(() => {
      console.log("checking form validity");
      setFormIsValid(
        number !== "" ||
          status !== "" ||
          from_date_open !== "" ||
          urgencyLevel !== ""
      );
    }, 250);

    return () => {
      console.log("Clean-Up Timeout");
      clearTimeout(identifier);
    };
  }, [number, status, from_date_open, urgencyLevel]);

  return (
    <thead className={styles.thead} >
      <CSSTransition
        in={props.open}
        timeout={300}
        classNames="slide-in-up"
        mountOnEnter
        unmountOnExit
      >
        <tr>
          <th colSpan="9">
            <Row>
              <Form.Group as={Col}>
                <Form.Label>Ticket No.</Form.Label>
                <Form.Control
                  name="number"
                  value={number}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group as={Col}>
                <Form.Label>Status</Form.Label>
                <Form.Control
                  as="select"
                  value={status}
                  onChange={handleChange}
                  name="status"
                >
                  <option value="" selected></option>
                  <option value="Open">Open</option>
                  <option value="Working on it">Working on it</option>
                  <option value="Close">Close</option>
                </Form.Control>
              </Form.Group>

              <Form.Group as={Col}>
                <Form.Label>From date</Form.Label>
                <Form.Control
                  name="from_date_open"
                  value={from_date_open}
                  onChange={handleChange}
                  type="date"
                />
              </Form.Group>

              <Form.Group as={Col}>
                <Form.Label> Urgency level</Form.Label>
                <Form.Control
                  as="select"
                  name="urgencyLevel"
                  value={urgencyLevel}
                  onChange={handleChange}
                >
                  <option value="" selected></option>
                  <option value={"Low"}>Low</option>
                  <option value={"Medium"}>Medium</option>
                  <option value={"High"}>High</option>
                </Form.Control>
              </Form.Group>

              <Form.Group as={Col} className={styles["responsive"]}>
                <Button
                  title="search"
                  disabled={!formIsValid}
                  onClick={handleSearch}
                  color="blue-modal"
                  style={{width:"165px"}}
                >
                  Search <BiSearchAlt />
                </Button>

                <Button
                  title="reset"
                  color="grey-modal"
                  style={{width:"165px"}}
                  onClick={() => {
                    reset();
                  }}
                >
                  Reset <HiOutlineRefresh />
                </Button>
              </Form.Group>
            </Row>
          </th>
        </tr>
      </CSSTransition>
    </thead>
  );
};

export default Filter;
