import React, { useState, useContext, useEffect } from "react";
import AuthContext from "../../../store/auth-context";
import styles from "./EditTicket.module.css";
import Button from "../../../shared/FormElements/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Spinner from "react-bootstrap/Spinner";
import Image from "react-bootstrap/Image";
import Message from "../../../shared/FormElements/Message";
import { displayDate, getTimeDuration} from "../../../utils/functions";
import axios from "axios";

const EditTicket = (props) => {
  const initialState = {
    number: props.ticket.number,
    status: props.ticket.status,
    title: props.ticket.title,
    description: props.ticket.description,
    urgencyLevel: props.ticket.urgencyLevel,
    open_date: props.ticket.open_date,
    close_date: props.ticket.close_date,
    selectedFile: {
      name: "",
      file: props.ticket.filePath,
    },
    fileUploaded: false,
    statusChanged: false,
    formIsValid: false,
  };
  const authCtx = useContext(AuthContext);
  const [savingForm, setSavingForm] = useState(false);
  const [
    {
      number,
      status,
      statusChanged,
      title,
      description,
      urgencyLevel,
      open_date,
      close_date,
      selectedFile,
      fileUploaded,
      formIsValid,
    },
    setState,
  ] = useState(initialState);

  const config = {
    headers: { "x-api-key": authCtx.user.token },
  };

  const reset = () => {
    setState({ ...initialState });
  };

  const submit = async (e) => {
    e.preventDefault();
    setSavingForm(true);
    try {
      await axios.patch(
        `/UserPanel/UpdateTicket`,
        {
          id: props.ticket._id,
          updates: ["title", "description", "urgencyLevel", "status"],
          values: [title, description, urgencyLevel, status],
        },
        config
      );
      props.updateTicketAttr(
        props.ticket,
        props.pos,
        ["title", "description", "urgencyLevel", "status"],
        [title, description, urgencyLevel, status]
      );
    } catch (err) {
      console.log("patch edit ticket raise error");
    }
    setSavingForm(false);
  };

  useEffect(() => {
    const checkStatus = async () => {
      if (
        props.show === true &&
        authCtx.user.role === "admin" &&
        status === "Open"
      ) {
        setState({
          ...initialState,
          status: "Working on it",
          statusChanged: true,
        });
        try {
          await axios.patch(
            `/UserPanel/UpdateTicket`,
            {
              id: props.ticket._id,
              updates: ["status"],
              values: ["Working on it"],
            },
            config
          );
        } catch (err) {
          console.log("patch update ticket status raise error");
        }
      }
    };
    checkStatus();
  }, [props.show]);

  useEffect(() => {
    const identifier = setTimeout(() => {
      console.log(formIsValid);
      console.log("checking form validity");
      setState((prevState) => {
        return {
          ...prevState,
          formIsValid:
            description.length > 0 &&
            title.length > 0 &&
            (description !== props.ticket.description ||
              title !== props.ticket.title ||
              urgencyLevel !== props.ticket.urgencyLevel),
        };
      });
    }, 250);
    return () => {
      console.log("Clean-Up Timeout");
      clearTimeout(identifier);
    };
  }, [description, urgencyLevel, title]);

  const handleChange = (e) => {
    setState((prevState) => {
      return { ...prevState, [e.target.name]: e.target.value };
    });
  };

  const onFileUpload = (e) => {
    const file = e.target.files[0];
    setState((prevState) => {
      return {
        ...prevState,
        selectedFile: {
          name: file.name,
          file: e.target.files[0], //or URL.createObjectURL(e.target.files[0])
        }, //URL.createObjectURL(formData.get("myFile"))
        fileUploaded: true,
      };
    });
  };

  return (
    <Modal
      show={props.show}
      backdrop="static"
      keyboard={false}
      className={styles["modal"]}
      dialogClassName={styles["modal-dialog"]}
      contentClassName={styles["modal-content"]}
    >
      <Modal.Header className={styles["modal-header"]}>
        <Modal.Title>
          <h3>
            <strong>Edit Ticket</strong>
          </h3>
        </Modal.Title>
      </Modal.Header>
      <Form onSubmit={submit}>
        <Modal.Body className={styles["modal-body"]}>
          <Row className="mb-3" style={{ marginTop: "15px" }}>
            <Form.Group as={Col}>
              <Form.Label>
                <strong>No.</strong>
              </Form.Label>
              <Form.Control
                type="text"
                name="number"
                value={number}
                onChange={handleChange}
                disabled={true}
              />
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label>
                <strong>Status</strong>
              </Form.Label>
              <Form.Control
                type="text"
                value={status}
                as="select"
                name="urgencyLevel"
                onChange={handleChange}
                disabled={true}
              >
                <>
                  <option value={"Open"}>Open</option>
                  <option value={"Working on it"}>Working on it</option>
                  <option value={"Done"}>Done</option>
                </>
              </Form.Control>
            </Form.Group>
          </Row>
          <Row className="mb-3" style={{ marginTop: "15px" }}>
            <Form.Group as={Col}>
              <Form.Label>
                <strong>Open Date</strong>
              </Form.Label>
              <Form.Control value={displayDate(open_date)} disabled />
            </Form.Group>

            <Form.Group as={Col}>
              <Form.Label>
                <strong>Close Date</strong>
              </Form.Label>

              <Form.Control
                value={
                  displayDate(open_date) > displayDate(close_date)
                    ? ""
                    : displayDate(close_date)
                }
                disabled
              />
            </Form.Group>
          </Row>

          <Row className="mb-3">
            <Form.Group controlId="formFile" className="mb-3" as={Col}>
              <Form.Label>
                <strong>Duration</strong>
              </Form.Label>
              <Form.Control
                value={getTimeDuration(open_date)}
                disabled={true}
              />
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label>
                <strong>Urgency level</strong>
              </Form.Label>
              <Form.Control
                type="text"
                value={urgencyLevel}
                as="select"
                name="urgencyLevel"
                onChange={handleChange}
                disabled={authCtx.user.role === "regular" ? true : false}
              >
                <>
                  <option value={"Low"}>Low</option>
                  <option value={"Medium"}>Medium</option>
                  <option value={"High"}>High</option>
                </>
              </Form.Control>
            </Form.Group>
          </Row>

          <Row className="mb-3" style={{ marginTop: "15px" }}>
            <Form.Group as={Col}>
              <Form.Label>
                <strong>Title</strong>
              </Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={title}
                onChange={handleChange}
                disabled={authCtx.user.role === "regular" ? true : false}
              />
            </Form.Group>
          </Row>

          <Row className="mb-3">
            <Form.Group as={Col}>
              <Form.Label>
                <strong>Problem Description</strong>
              </Form.Label>
              <Form.Control
                style={{ height: "10em" }}
                as="textarea"
                type="text"
                name="description"
                value={description}
                onChange={handleChange}
                disabled={authCtx.user.role === "regular" ? true : false}
              />
            </Form.Group>
          </Row>

          <Row className="mb-3">
            {fileUploaded ? (
              <>
                <Image src={selectedFile.file} />
                <Message style={{ wordWrap: "break-word" }}>
                  {" "}
                  Uploaded the file successfully : {selectedFile.name}{" "}
                </Message>
              </>
            ) : (
              <>
                <Form.Label>
                  <strong>Uploaded File</strong>
                </Form.Label>
                <Image src={selectedFile.file} />
              </>
            )}
          </Row>
        </Modal.Body>
        <Modal.Footer className={styles["modal-footer"]}>
          <Button
            onClick={() => {
              if (statusChanged)
                props.updateTicketAttr(
                  props.ticket,
                  props.pos,
                  ["status"],
                  [status]
                );
              props.handleClose();
              reset();
            }}
            disabled={savingForm}
            color="grey-modal"
            type="button"
          >
            Close
          </Button>
          {authCtx.user.role === "admin" && (
            <>
              {!savingForm ? (
                <Button
                  disabled={!formIsValid}
                  color="blue-modal"
                  type="submit"
                >
                  Save
                </Button>
              ) : (
                <Button variant="primary" disabled>
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                  />
                  <span> Saving...</span>
                </Button>
              )}
            </>
          )}
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default EditTicket;
