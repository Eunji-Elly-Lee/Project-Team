import { Modal } from "react-bootstrap";
import "components/MeetingModal/MeetingModal.css";

function MeetingModal({ show, onHide }) {
  return (
    <Modal
      show={show}
      onHide={onHide}
      centered
      backdrop="static"
      keyboard={false}
      size="lg"
    >
      Meeting Modal!!
    </Modal>
  );
}

export default MeetingModal;
