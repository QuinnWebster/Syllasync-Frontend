import React, { useState } from "react";
import { momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Calendar } from "react-big-calendar";
import moment from "moment";
import "./showCalendar.css"; // Import your CSS file
import MiniWindow from "./miniWindow"; // Import your modal component

// Initialize the localizer
const localizer = momentLocalizer(moment);

// Define the event type
type Event = {
  subject: string; // The title of the event
  start: string; // ISO date format: "2024-09-04T00:00:00"
  end: string; // ISO date format: "2024-09-04T01:00:00"
  description: string;
  location: string;
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
    // Set the original event to display in the modal
    setCurrentEvent(event);
    setMiniWindow(true); // Show the mini window
  }

  // Close the mini window
  function closeModal() {
    setIsEditing(false);
    setMiniWindow(false);
  }

  // Format the events for the calendar
  const formattedEvents = events.map((event) => ({
    title: event.subject, // Use subject as the event title
    start: new Date(event.start), // Convert ISO date string to Date object
    end: new Date(event.end), // Convert ISO date string to Date object
    originalEvent: event, // Preserve the original event structure
  }));

  return (
    <div className="calendar-container">
      <Calendar
        localizer={localizer}
        events={formattedEvents} // Pass the formatted events
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
