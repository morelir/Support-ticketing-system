import React, { useState, useContext } from "react";
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
import axios from "axios";

const EditTicket = (props) => {
  const initialState = {
    number: props.ticket.number,
    status: props.ticket.status,
    title: props.ticket.title,
    description: props.ticket.description,
    urgencyLevel: props.ticket.urgencyLevel,
    selectedFile: {
      name: "",
      file: props.ticket.filePath,
    },
    fileUploaded: false,
  };
  const authCtx = useContext(AuthContext);
  const [savingForm, setSavingForm] = useState(false);
  const [
    {
      number,
      status,
      title,
      description,
      urgencyLevel,
      selectedFile,
      fileUploaded,
    },
    setState,
  ] = useState(initialState);

  const config = {
    headers: { "x-api-key": authCtx.user.token },
  };

  const reset = () => {
    setState({ ...initialState });
    // setSavingForm(false);
  };
  const submitNewTicket = async (e) => {
    e.preventDefault();
  };

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
      <Form onSubmit={submitNewTicket}>
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
                disabled={authCtx.user.role === "regular" ? true : false}
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
            <Form.Group controlId="formFile" className="mb-3" as={Col}>
              <Form.Label>
                <strong>Upload Photo</strong>
              </Form.Label>
              <Form.Control
                type="file"
                accept=".png,.jpg,.jpeg"
                name="file"
                onChange={onFileUpload}
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
                <Image src={selectedFile.file} />
                <Message style={{ wordWrap: "break-word" }}>
                  {" "}
                  Uploaded file
                </Message>
              </>
            )}
          </Row>
        </Modal.Body>
        <Modal.Footer className={styles["modal-footer"]}>
          <Button
            onClick={() => {
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
              {savingForm ? (
                <Button
                  // disabled={!fault.formIsValid}
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
