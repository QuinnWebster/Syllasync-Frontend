import React, { useState } from "react";
import { momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Calendar } from "react-big-calendar";
import moment from "moment";
import "./showCalendar.css";
import MiniWindow from "./miniWindow";

const localizer = momentLocalizer(moment);

type Event = {
  subject: string;
  start: string;
  end: string;
  description: string;
};

type ShowCalendarProps = {
  events: Event[];
  setEvents: React.Dispatch<React.SetStateAction<Event[]>>;
};

const ShowCalendar: React.FC<ShowCalendarProps> = ({ events, setEvents }) => {
  const [showMiniWindow, setMiniWindow] = useState(false);
  const [currentEvent, setCurrentEvent] = useState<Event | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  function expandEvent(event: Event) {
    setCurrentEvent(event);
    setMiniWindow(true);
  }

  function closeModal() {
    setIsEditing(false);
    setMiniWindow(false);
  }

  const formattedEvents = events.map((event) => ({
    title: event.subject,
    start: new Date(event.start),
    end: new Date(event.end),
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
      {showMiniWindow && currentEvent && (
        <MiniWindow
          show={showMiniWindow}
          handleClose={closeModal}
          event={currentEvent}
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
