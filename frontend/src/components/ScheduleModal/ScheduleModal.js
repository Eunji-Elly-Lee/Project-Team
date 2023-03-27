import { Modal } from "react-bootstrap";
import "components/ScheduleModal/ScheduleModal.css";

function ScheduleModal({ show, onHide }) {
  return (
    <Modal
      show={show}
      onHide={onHide}
      centered
      backdrop="static"
      keyboard={false}
      size="lg"
    >
      Schedule Modal!!
    </Modal>
  );
}

export default ScheduleModal;
