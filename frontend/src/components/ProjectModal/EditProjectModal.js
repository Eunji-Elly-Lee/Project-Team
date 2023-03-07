import { useEffect, useState } from "react";
import axios from "axios";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import { BsCheck2Circle, BsQuestionCircle } from "react-icons/bs";
import "components/ProjectModal/ProjectModal.css";

function EditProjectModal({ show, onHide, project }) {
  const initialPrjState = {
    title: "",
    contents: "",
    skills: "",
    github: "",
    link: ""
  };
  const [editProject, setEditProject] = useState(initialPrjState);
  const [message, setMessage] = useState("");
  const [prjForm, setPrjForm] = useState(true);
  const [deleting, setDeleting] = useState(false);

  const onClose = () => {
    setEditProject(project);
    onHide();
  };

  const onCheckDeleting = () => {
    // Hide the form and display message
    setMessage("Are you sure you want to delete this project?");
    setPrjForm(false);
    setDeleting(true);
  };

  const onDeletePrj = async () => {
    try {
      // Delete project by id
      await axios.delete(
        `${process.env.REACT_APP_API_URL}/projects/delete?id=${editProject._id}`
      );

      // Display delete success message
      setMessage("Project has been deleted successfully!");
      setDeleting(false);
    } catch (error) {
      console.log(error);
    }
  };

  const onPrjForm = (e) => {
    const { name, value } = e.target;
    setEditProject({ ...editProject, [name]: value });
  };

  const onSubmitPrj = async (e) => {
    e.preventDefault();

    try {
      // Update project info
      await axios.put(`${process.env.REACT_APP_API_URL}/projects/update`, {
        project: editProject
      });

      // Hide the form and display message
      setMessage("Project has been updated successfully!");
      setPrjForm(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setEditProject(project);
  }, [project]);

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
            Update Project
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
                  value={editProject.title}
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
                  value={editProject.contents}
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
                  value={editProject.skills}
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
                  value={editProject.github}
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
                  value={editProject.link}
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
              Update
            </Button>
            <Button
              className="prjFormBtn prjDeleteBtn"
              variant="outline-danger"
              onClick={onCheckDeleting}
            >
              Delete
            </Button>
          </Form>
        </Modal.Body>
        </>
      ) : (
        <>
        <div className="prjMessage">{message}</div>
        {deleting ? (
          // Display delete confirmation field 
          <>
          <div className="prjCheck">
            <BsQuestionCircle />
          </div>
          <div className="prjDeleteBtns">
            <Button
              variant="outline-danger"
              onClick={onDeletePrj}
            >
              Yes
            </Button>
            <Button
              variant="outline-secondary"
              // When clicking, close the modal and reload the project page
              onClick={() => window.location.reload()}
            >
              No
            </Button>
          </div>
          </>
        ) : (
          <>
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
        </>
      )}
    </Modal>
  );
}

export default EditProjectModal;
