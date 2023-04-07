import { Button, Modal } from "react-bootstrap";
import "components/MeetingModal/MeetingList.css";

function MeetingList({
  show,
  onHide,
  meetings,
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
      className="mtgListModal"
    >
      <Modal.Header className="mtgListHeader">
        <Modal.Title className="mtgListTitle">
          Meeting List
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="mtgListBody">
        <div>
          Click a meeting to navigate to the calendar for the month of the year.
        </div>
        <div className="mtgListWrap">
          {meetings.map((meeting) => {
            const dateInfo =
              meeting.meetingYear + "-" +
              (meeting.meetingMonth < 10 ? "0" + meeting.meetingMonth : meeting.meetingMonth) + "-" +
              (meeting.meetingDate < 10 ? "0" + meeting.meetingDate : meeting.meetingDate);
                        
            return (
              <p
                key={meeting._id}
                onClick={() => {
                  setCurrentYear(meeting.meetingYear);
                  setCurrentMonth(meeting.meetingMonth - 1);
                  onHide();
                }}
              >
                Meeting on {dateInfo}
              </p>
            );
          })}
        </div>
        <Button
          className="mtgListBtn"
          variant="outline-secondary"
          onClick={onClose}
        >
          Close
        </Button>
      </Modal.Body>
    </Modal>
  );
}

export default MeetingList;
