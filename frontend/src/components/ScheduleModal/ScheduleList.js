import { Modal } from "react-bootstrap";
import "components/ScheduleModal/ScheduleList.css";

function ScheduleList({ show, onHide, schedules }) {
  return (
    <Modal
      show={show}
      onHide={onHide}
      centered
      backdrop="static"
      keyboard={false}
      size="lg"
    >
      Schedule List!!
    </Modal>
  );
}

export default ScheduleList;
