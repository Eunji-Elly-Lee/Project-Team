import { Button, Modal } from "react-bootstrap";
import "components/ScheduleModal/ScheduleList.css";

function ScheduleList({
  show,
  onHide,
  schedules,
  setCurrentYear,
  setCurrentMonth
}) {
  const onClose = () => {
    onHide();
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      centered
      backdrop="static"
      keyboard={false}
      size="lg"
      className="schListModal"
    >
      <Modal.Header className="schListHeader">
        <Modal.Title className="schListTitle">
          Schedule List
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="schListBody">
        <div>
          Click a schedule to navigate to the calendar for the month of the year.
        </div>
        <div className="schListWrap">
          {schedules.map((schedule) => {
            const fromInfo =
              schedule.fromYear + "-" +
              (schedule.fromMonth < 10 ? "0" + schedule.fromMonth : schedule.fromMonth) + "-" +
              (schedule.fromDate < 10 ? "0" + schedule.fromDate : schedule.fromDate);
            
            const toInfo =
              schedule.toYear + "-" +
              (schedule.toMonth < 10 ? "0" + schedule.toMonth : schedule.toMonth) + "-" +
              (schedule.toDate < 10 ? "0" + schedule.toDate : schedule.toDate);
            
            return (
              <p
                key={schedule._id}
                onClick={() => {
                  setCurrentYear(schedule.fromYear);
                  setCurrentMonth(schedule.fromMonth - 1);
                  onHide();
                }}
              >
                {schedule.issue}&nbsp;
                &#40;{fromInfo}~{toInfo}&#41;
              </p>
            );
          })}
        </div>
        <Button
          className="schListBtn"
          variant="outline-secondary"
          onClick={onClose}
        >
          Close
        </Button>
      </Modal.Body>
    </Modal>
  );
}

export default ScheduleList;
