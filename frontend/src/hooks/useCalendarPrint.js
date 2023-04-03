import { useMemo } from "react";

const useCalendarPrint = ({
  weeks,
  currentYear,
  currentMonth,
  schedules,
  meetings,
  admin
}) => {
  return useMemo(() => {
    // Last date of the current month (ex: 28, 30, 31, ect.)
    const lastDate = new Date(currentYear, currentMonth + 1, 0).getDate();
    // First day of the current month (ex: SUN, MON, TUE, ect.)
    const firstDay = new Date(currentYear, currentMonth, 1).getDay();
    // Last day of the current month (ex: SUN, MON, TUE, ect.)
    const lastDay = new Date(currentYear, currentMonth, lastDate).getDay();   
    
    let calendarCells = [];

    for (const day of weeks) {
      if (weeks[firstDay] === day) {
        // Insert cells containing the numbers of dates
        for (let i = 1; i <= lastDate; i++) {
          // Check if there is a schedule on this date
          let scheduled = false;
          let issued = false;
          let sch = null;

          for (const schedule of schedules) {
            if (schedule.fromYear === currentYear &&
                schedule.fromMonth === currentMonth + 1 &&
                schedule.toMonth === schedule.fromMonth &&
                (i >= schedule.fromDate && i <= schedule.toDate)) {
              scheduled = true;
              sch = schedule;
            } else if (schedule.fromYear === currentYear &&
                schedule.fromMonth === currentMonth + 1 &&
                schedule.toMonth !== schedule.fromMonth &&
                (i >= schedule.fromDate && i <= lastDate)) {
              scheduled = true;
              sch = schedule;
            } else if (schedule.fromYear === currentYear &&
                schedule.toMonth === currentMonth + 1 &&
                schedule.toMonth !== schedule.fromMonth &&
                (i >= 1 && i <= schedule.toDate)) {
              scheduled = true;
              sch = schedule;
            } else if (schedule.toYear === currentYear &&
                schedule.toMonth === currentMonth + 1 &&
                schedule.toMonth !== schedule.fromMonth &&
                (i >= 1 && i <= schedule.toDate)) {
              scheduled = true;
              sch = schedule;
            }

            if (scheduled) {
              // Day of the week when the schedule starts
              const fromDay = 
                new Date(currentYear, currentMonth, schedule.fromDate).getDay();
              // Day of the week of this date
              const nowDay = new Date(currentYear, currentMonth, i).getDay();
              // Value to display an issue of this schedule
              // If the schedule starts on Saturday, the issue will be printed on Sunday
              issued =
                (schedule.fromDate === i && fromDay !== 6) ||
                (fromDay === 6 && nowDay === 0);

              // If matching a schedule and this date, end searching schedules
              break;
            }
          }

          // Check if there is a meeting on this date
          let met = false;
          let mtg = null;

          for (const meeting of meetings) {
            if (meeting.meetingYear === currentYear &&
              meeting.meetingMonth === currentMonth + 1 &&
              meeting.meetingDate === i) {
              met = true;
              mtg = meeting;

              // If matching a meeting and this date, end searching meetings
              break;
            }
          }

          calendarCells.push(
            <div key={i} className="calendarCell">
              {i}
              {scheduled && (
                <div
                  className={"schedule" +
                    (sch.fromDate === i ? " startSchedule" : "") +
                    (sch.toDate === i ? " endSchedule" : "") +
                    (issued ? " issue" : "") +
                    (admin ? " canClick" : "")
                  }
                  style={{
                    backgroundColor: sch.color,
                  }}
                >
                  {issued && <span>{sch.issue}</span>}
                </div>
              )}              
              {met && (
                <div
                  className={"meeting canClick" +
                    (scheduled ? "" : " noSch")
                  }
                >
                  Meeting
                </div>
              )}
            </div>
          );
        }

        // If finishing printing numbers for all dates, end the day of the weeks cycle
        break;
      } else {
        // Insert blank cells before the week day of the 1st of the current month
        calendarCells.push(
          <div key={day} className="calendarCell"></div>
        );
      }
    }

    // Insert blank cells from the last date of the current month to Saturday
    if (lastDay !== 6) {
      for (let i = lastDay + 1; i <= 6; i++) {
        calendarCells.push(
          <div key={i * 100} className="calendarCell"></div>
        );
      }
    }

    return calendarCells;
  }, [
    weeks,
    currentYear,
    currentMonth,
    schedules,
    meetings,
    admin
  ]);
};

export default useCalendarPrint;
