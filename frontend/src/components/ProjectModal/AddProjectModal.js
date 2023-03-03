import { useState } from "react";
import axios from "axios";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import { BsCheck2Circle } from "react-icons/bs";
import "components/ProjectModal/ProjectModal.css";

function AddProjectModal({ show, onHide }) {
  const MSG = "New project has been added successfully!";
  const initialPrjState = {
    title: "",
    contents: "",
    skills: "",
    github: "",
    link: ""
  };
  const [project, setProject] = useState(initialPrjState);
  const [prjForm, setPrjForm] = useState(true);

  const onClose = () => {
    setProject(initialPrjState);
    onHide();
  };

  const onPrjForm = (e) => {
    const { name, value } = e.target;
    setProject({ ...project, [name]: value });
  };

  const onSubmitPrj = async (e) => {
    e.preventDefault();

    try {
      // Add new project
      await axios.post(`${process.env.REACT_APP_API_URL}/projects/add`, {
        project
      });

      // Hide the form and display message
      setPrjForm(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      centered
      backdrop="static"
      keyboard={false}
      size="lg"
      className="projectModal"
    >
      {prjForm ? (
        <>
        <Modal.Header className="prjModalHeader">
          <Modal.Title className="prjModalTitle">
            New Project
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="prjModalBody">
          <Form onSubmit={onSubmitPrj}>
            <Form.Group as={Row}>
              <Form.Label column sm="3">
                Title
              </Form.Label>
              <Col sm="9">
                <Form.Control
                  type="text"
                  required
                  name="title"
                  value={project.title}
                  onChange={onPrjForm}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm="3">
                Contents
              </Form.Label>
              <Col sm="9">
                <Form.Control
                  type="text"
                  required
                  name="contents"
                  value={project.contents}
                  onChange={onPrjForm}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm="3">
                Skills
              </Form.Label>
              <Col sm="9">
                <Form.Control
                  type="text"
                  required
                  name="skills"
                  value={project.skills}
                  onChange={onPrjForm}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm="3">
                Github
              </Form.Label>
              <Col sm="9">
                <Form.Control
                  type="text"
                  name="github"
                  value={project.github}
                  onChange={onPrjForm}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm="3">
                Link
              </Form.Label>
              <Col sm="9">
                <Form.Control
                  type="text"
                  name="link"
                  value={project.link}
                  onChange={onPrjForm}
                />
              </Col>
            </Form.Group>
            <Button
              className="prjFormBtn"
              variant="outline-secondary"
              onClick={onClose}
            >
              Close
            </Button>
            <Button
              className="prjFormBtn"
              variant="outline-info"
              type="submit"
            >
              Submit
            </Button>
          </Form>
        </Modal.Body>
        </>
      ) : (
        <>
        <div className="prjMessage">{MSG}</div>
        <div className="prjCheck">
          <BsCheck2Circle />
        </div>
        <div>
          <Button
            className="prjCloseBtn"
            variant="outline-secondary"
            // When clicking, close the modal and reload the project page
            onClick={() => window.location.reload()}
          >
            Close
          </Button>
        </div>
        </>
      )}
    </Modal>
  );
}

export default AddProjectModal;
