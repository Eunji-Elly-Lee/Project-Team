import { Button, Modal } from "react-bootstrap";
import "components/ProjectModal/ProjectModal.css";

function ProjectModal({ show, onHide }) {
  return (
    <Modal show={show} onHide={onHide}>
      Project Modal!!
      <Button onClick={onHide}>Close</Button>
    </Modal>
  );
}

export default ProjectModal;
