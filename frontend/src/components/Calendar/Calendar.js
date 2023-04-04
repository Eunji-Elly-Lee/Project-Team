import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import useCalendarPrint from "hooks/useCalendarPrint";
import { Button } from "react-bootstrap";
import ScheduleList from "components/ScheduleModal/ScheduleList";
import MeetingList from "components/MeetingModal/MeetingList";
import ScheduleModal from "components/ScheduleModal/ScheduleModal";
import MeetingModal from "components/MeetingModal/MeetingModal";
import "components/Calendar/Calendar.css";

function Calendar({ projectId, user }) {
  const months = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];
  const weeks = ["SUN", "MON", "TUE", "WED", "THUR", "FRI", "SAT"];
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [schedules, setSchedules] = useState([]);
  const [meetings, setMeetings] = useState([]);
  const [admin, setAdmin] = useState(false);
  const [schListShow, setSchListShow] = useState(false);
  const [mtgListShow, setMtgListShow] = useState(false);
  const [schModalShow, setSchModalShow] = useState(false);
  const [mtgModalShow, setMtgModalShow] = useState(false);

  // Display calendar returned by the useCalendarPrint hook
  const displayCalendar = useCalendarPrint({
    weeks,
    currentYear,
    currentMonth,
    schedules,
    meetings,
    admin
  });

  // Get all schedules and meetings from server
  const getAllData = useCallback(async () => {
    try {
      const allSchedules = await axios.get(
        `${process.env.REACT_APP_API_URL}/schedules/getAll?projectId=${projectId}`
      )
      .then((response) => {
        return response.data;
      });

      const allMeetings = await axios.get(
        `${process.env.REACT_APP_API_URL}/meetings/getAll?projectId=${projectId}`
      )
      .then((response) => {
        return response.data;
      });

      setSchedules(allSchedules);
      setMeetings(allMeetings);
    } catch (error) {
      console.log(error);
    }
  }, [projectId]);

  const onPrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const onNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  useEffect(() => {
    getAllData();
    
    if (user !== null && user.role) {
      setAdmin(true);
    }
  }, [getAllData, user]);  

  console.log(schedules, meetings);

  return (
    <div className="calendarContainer">
      <div className="calendarHeader">
        <p>
          <span
            className="calendarCtrl"
            onClick={onPrevMonth}
          >
            &lt;
          </span>
          {months[currentMonth]} {currentYear}          
          <span
            className="calendarCtrl"
            onClick={onNextMonth}
          >
            &gt;
          </span>
        </p>
        <div onClick={() => setSchListShow(true)}>
          &bull; Schedules
        </div>
        <div onClick={() => setMtgListShow(true)}>
          &bull; Meetings
        </div>
        <Button
          className="calAddBtn"
          variant="outline-info"
          onClick={() => setMtgModalShow(true)}
        >
          Add
        </Button>
      </div>
      <div className="calendar">
        {weeks.map((week) => {
          return (
            <div key={week} className="calendarCell weeks">
              {week}
            </div>
          );
        })}
        {/* Display calendar returned by the useCalendarPrint hook */}
        {displayCalendar}
      </div>
      {/* When clicking Schedules element, open the schedule list modal */}
      <ScheduleList
        show={schListShow}
        onHide={() => setSchListShow(false)}
        schedules={schedules}
      />
      {/* When clicking Meetings element, open the meeting list modal */}
      <MeetingList
        show={mtgListShow}
        onHide={() => setMtgListShow(false)}
        meetings={meetings}
      />
      {/* When adding new schedule or clicking schedule data, open the schedule modal */}
      <ScheduleModal
        show={schModalShow}
        onHide={() => setSchModalShow(false)}
      />
      {/* When adding new meeting or clicking meeting data, open the meeting modal */}
      <MeetingModal
        show={mtgModalShow}
        onHide={() => setMtgModalShow(false)}
      />
    </div>
  );
}

export default Calendar;
