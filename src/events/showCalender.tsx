import React, { useState } from "react";
import { momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Calendar } from "react-big-calendar";
import moment from "moment";
import "./showCalendar.css"; // Import your CSS file
import MiniWindow from "./miniWindow"; // Import your modal component

// Initialize the localizer
const localizer = momentLocalizer(moment);

type Event = {
  id: string;
  summary: string;
  description: string;
  start: {
    dateTime: string;
    timeZone: string;
  };
  end: {
    dateTime: string;
    timeZone: string;
  };
};

type ShowCalendarProps = {
  events: Event[];
  setEvents: React.Dispatch<React.SetStateAction<Event[]>>;
};

const ShowCalendar: React.FC<ShowCalendarProps> = ({ events, setEvents }) => {
  const [showMiniWindow, setMiniWindow] = useState(false);
  const [currentEvent, setCurrentEvent] = useState({});
  const [isEditing, setIsEditing] = useState(false);

  function expandEvent(event: Event) {
    // Set the original event to display in the modal
    setCurrentEvent(event);
    setMiniWindow(true); // Show the mini window
  }

  // Close the mini window
  function closeModal() {
    setIsEditing(false);
    setMiniWindow(false);
  }

  //Format the events for the calendar
  const formattedEvents = events.map((event) => ({
    id: event.id,
    title: event.summary,
    start: new Date(event.start.dateTime), // Convert to Date object
    end: new Date(event.end.dateTime), // Convert to Date object
    originalEvent: event,
  }));

  return (
    <div className="calendar-container">
      <Calendar
        localizer={localizer}
        events={formattedEvents}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500, margin: "50px" }}
        onSelectEvent={(event) => expandEvent(event.originalEvent)}
        selectable
      />
      {showMiniWindow && (
        <MiniWindow
          show={showMiniWindow}
          handleClose={closeModal}
          event={currentEvent} // Pass the original event format
          events={events}
          setEvents={setEvents}
          isEditing={isEditing}
          setIsEditing={setIsEditing}
        />
      )}
    </div>
  );
};

export default ShowCalendar;
