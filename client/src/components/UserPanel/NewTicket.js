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
import { MdOutlineAddCircle } from "react-icons/md";
import axios from "axios";

const initialState = {
  title: "",
  description: "",
  urgencyLevel: "Low",
  selectedFile: {
    name: "",
    file: "",
  },
};

const NewTicket = (props) => {
  const authCtx = useContext(AuthContext);
  const [show, setShow] = useState(false);
  const [savingForm, setSavingForm] = useState(false);
  const [{ title, description, urgencyLevel, selectedFile }, setState] =
    useState(initialState);

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
    setState({ ...initialState });
    // setSavingForm(false);
  };

  const submitNewTicket = async (e) => {
    e.preventDefault();
    setSavingForm(true);
    console.log(config);
    const ticketID = Math.floor(Math.random() * Date.now()).toString();
    let data = new FormData();
    data.append("file", selectedFile.file, `${ticketID}-${selectedFile.name}`);
    console.log(data);
    try {
      let response = await axios.post("/UserPanel/AddFile", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      response = await axios.post(
        "/UserPanel/NewTicket",
        {
          number: ticketID,
          status: "Open",
          clientID: authCtx.user._id,
          title: title,
          description: description,
          urgencyLevel: urgencyLevel,
        },
        config
      );
      props.updateTickets(response.data.tickets,response.data.low,response.data.medium,response.data.high);
      setSavingForm(false);
    } catch (err) {
      console.log(err);
      setSavingForm(false);
    }
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
      };
    });
  };

  return (
    <>
      <Button
        className={styles.btnNewTicket}
        onClick={handleOpen}
        colorHover="white"
        style={{fontSize:"1.2rem"}}
      >
        <strong >New Ticket</strong> <MdOutlineAddCircle style={{ marginBottom: "5px" }} />
      </Button>

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
                  name="description"
                  value={description}
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
                  <Image src={URL.createObjectURL(selectedFile.file)} />
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
