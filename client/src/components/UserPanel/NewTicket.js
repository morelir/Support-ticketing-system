import React, { useState, useContext } from "react";
import AuthContext from "../../store/auth-context";
import styles from "./NewTicket.module.css";
import Button from "../../shared/FormElements/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Spinner from "react-bootstrap/Spinner";
import Image from "react-bootstrap/Image";
import Message from "../../shared/FormElements/Message";
import axios from "axios";

const initialState = {
  title: "",
  discription: "",
  urgencyLevel: "",
  selectedFile:{
    name: "",
    file: "",
  }
};

const NewTicket = () => {
  const authCtx = useContext(AuthContext);
  const [show, setShow] = useState(false);
  const [savingForm, setSavingForm] = useState(false);
  const [{title,discription,urgencyLevel,selectedFile}, setState] = useState(initialState);

  // const [selectedFile, setSelectedFile] = useState({
  //   name: "",
  //   file: "",
  // });
  let formData = new FormData();
  const config = {
    headers: { "x-api-key": authCtx.user.token },
  };

  const handleClose = () => {
    setShow(false);
  };

  const handleOpen = () => {
    setShow(true);
  };

  const reset = () => {
    setState({...initialState})
    // setSavingForm(false);
  };

  const submitNewTicket = async (e) => {
    e.preventDefault();
    setSavingForm(true);
    await axios.post(
      "/UserPanel/NewTicket",
      {
        title: title,
        discription: discription,
        urgencyLevel: urgencyLevel,
        selectedFile: selectedFile.file,
      },
      config
    );
    setSavingForm(false);
  };

  const handleChange = (e) => {
    setState((prevState)=>{
      return { ...prevState, [e.target.name]: e.target.value };
    })
  };

  const onFileUpload = (e) => {
    const file = e.target.files[0];
    formData.append("myFile", file, file.name);
    setState((prevState) => {
      return {
        ...prevState,
        selectedFile:{
        name: file.name,
        file: URL.createObjectURL(formData.get("myFile")), //or URL.createObjectURL(e.target.files[0])
        }
      };
    });
  };

  return (
    <>
      <div className={styles.subLeft_container}>
        <Button onClick={handleOpen} color="grey" size="big">
          Add new ticket
        </Button>
      </div>

      <Modal
        show={show}
        backdrop="static"
        keyboard={false}
        className={styles["modal"]}
        dialogClassName={styles["modal-dialog"]}
        contentClassName={styles["modal-content"]}
      >
        <Modal.Header className={styles["modal-header"]}>
          <Modal.Title>
            <h3>
              <strong>New Ticket</strong>
            </h3>
          </Modal.Title>
        </Modal.Header>
        <Form onSubmit={submitNewTicket}>
          <Modal.Body className={styles["modal-body"]}>
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
                  name="discription"
                  value={discription}
                  onChange={handleChange}
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
                />
              </Form.Group>
            </Row>
            <Row className="mb-3">
              {selectedFile.file !== "" && (
                <>
                  <Image src={selectedFile.file} />
                  <Message style={{ wordWrap: "break-word" }}>
                    {" "}
                    Uploaded the file successfully : {selectedFile.name}{" "}
                  </Message>
                </>
              )}
            </Row>
          </Modal.Body>
          <Modal.Footer className={styles["modal-footer"]}>
            <Button
              onClick={() => {
                handleClose();
                reset();
              }}
              disabled={savingForm}
              color="grey-modal"
              type="button"
            >
              Close
            </Button>
            {!savingForm ? (
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
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};

export default NewTicket;
