import { Modal } from "react-bootstrap";
import "components/MeetingModal/MeetingList.css";

function MeetingList({ show, onHide, meetings }) {
  return (
    <Modal
      show={show}
      onHide={onHide}
      centered
      backdrop="static"
      keyboard={false}
      size="lg"
    >
      Meeting List!!
    </Modal>
  );
}

export default MeetingList;
