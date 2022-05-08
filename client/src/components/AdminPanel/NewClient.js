import React, { useState, useContext, useEffect } from "react";
import AuthContext from "../../store/auth-context";
import styles from "./NewClient.module.css";
import Button from "../../shared/FormElements/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Spinner from "react-bootstrap/Spinner";
import Image from "react-bootstrap/Image";
import Message from "../../shared/FormElements/Message";
import { MdOutlineAddCircle } from "react-icons/md";
import CropImage from "../../shared/FormElements/CropImage";
import axios from "axios";

const initialState = {
  name: "",
  email: "",
  pass: "",
  confPass: "",
  formIsValid: false,
  selectedFile: {
    name: "",
    file: "",
  },
  cropFile: {
    name: "",
    file: "",
  },
};

const NewClient = (props) => {
  const authCtx = useContext(AuthContext);
  const [show, setShow] = useState(false);
  const [savingForm, setSavingForm] = useState(false);
  const [
    { name, email, pass, confPass, formIsValid, selectedFile, cropFile },
    setState,
  ] = useState(initialState);

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
  };

  const submit = async (e) => {
    e.preventDefault();
    setSavingForm(true);
    const profileID = Math.floor(Math.random() * Date.now()).toString();
    let data = new FormData();
    data.append("file", cropFile.file, `${profileID}-${cropFile.name}`);
    console.log(profileID);
    try {
      let response = await axios.post("/AdminPanel/newClient", data, {
        headers: {
          "Content-Type": "multipart/form-data",
          "x-api-key": authCtx.user.token,
        },
        params: {
          name: name,
          email: email,
          pass: pass,
          filePath: `${profileID}-${cropFile.name}`,
        },
      });
      props.updateClients(response.data.users);
    } catch (err) {
      console.log(err.response.data.msg);
    }
    setSavingForm(false);
  };

  useEffect(() => {
    const identifier = setTimeout(() => {
      console.log("checking form validity");
      setState((prevState) => {
        return {
          ...prevState,
          formIsValid:
            name.length > 2 &&
            email.includes("@") > 0 &&
            email.length > 2 &&
            pass.length > 3 &&
            confPass.length > 3 &&
            pass === confPass &&
            cropFile.file !== "",
        };
      });
    }, 250);
    return () => {
      console.log("Clean-Up Timeout");
      clearTimeout(identifier);
    };
  }, [name, email, pass, confPass,cropFile]);

  const onFileUpload = (e) => {
    const file = e.target.files[0];
    setState((prevState) => {
      return {
        ...prevState,
        selectedFile: {
          name: file.name,
          file: e.target.files[0], //or URL.createObjectURL(e.target.files[0])
        }, //URL.createObjectURL(formData.get("myFile"))
        // cropFile: {
        //   name: file.name,
        //   file: e.target.files[0],
        // },
      };
    });
  };

  const onCropSave = ({ file, preview }) => {
    console.log(file)
    setState((prevState) => {
      return {
        ...prevState,
        cropFile: {
          name: file.name,
          file: file,
        },
      };
    });
  };

  const handleChange = (e) => {
    setState((prevState) => {
      return { ...prevState, [e.target.name]: e.target.value };
    });
  };

  return (
    <>
      <Button
        className={styles.btnNewClient}
        onClick={handleOpen}
        colorHover="white"
        style={{ fontSize: "1.2rem" }}
      >
        <strong>New Client</strong>{" "}
        <MdOutlineAddCircle style={{ marginBottom: "5px" }} />
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
              <strong>New Client</strong>
            </h3>
          </Modal.Title>
        </Modal.Header>
        <Form onSubmit={submit}>
          <Modal.Body className={styles["modal-body"]}>
            <Row className="mb-3" style={{ marginTop: "15px" }}>
              <Form.Group as={Col}>
                <Form.Label>
                  <strong>
                    Name <span style={{ color: "orange" }}>*</span>
                  </strong>
                </Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={name}
                  onChange={handleChange}
                />
              </Form.Group>
            </Row>
            <Row className="mb-3" style={{ marginTop: "15px" }}>
              <Form.Group as={Col}>
                <Form.Label>
                  <strong>
                    Email <span style={{ color: "orange" }}>*</span>
                  </strong>
                </Form.Label>
                <Form.Control
                  type="text"
                  name="email"
                  value={email}
                  onChange={handleChange}
                />
              </Form.Group>
            </Row>
            <Row className="mb-3" style={{ marginTop: "15px" }}>
              <Form.Group as={Col}>
                <Form.Label>
                  <strong>
                    Password <span style={{ color: "orange" }}>*</span>
                  </strong>
                </Form.Label>
                <Form.Control
                  type="password"
                  name="pass"
                  value={pass}
                  onChange={handleChange}
                />
              </Form.Group>
            </Row>
            <Row className="mb-3" style={{ marginTop: "15px" }}>
              <Form.Group controlId="formFile" className="mb-3" as={Col}>
                <Form.Label>
                  <strong>
                    Confirm Password <span style={{ color: "orange" }}>*</span>
                  </strong>
                </Form.Label>
                <Form.Control
                  type="password"
                  name="confPass"
                  value={confPass}
                  onChange={handleChange}
                />
              </Form.Group>
            </Row>
            <Row>
              <Form.Group controlId="formFile" className="mb-3" as={Col}>
                <Form.Label>
                  <strong>Upload Profile Picture </strong>
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
              {cropFile.file !== "" && (
                <>
                  <Image src={URL.createObjectURL(cropFile.file)} />
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
              <Button disabled={!formIsValid} color="blue-modal" type="submit">
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
      <CropImage onSave={onCropSave} selectedFile={selectedFile.file} />
    </>
  );
};

export default NewClient;
