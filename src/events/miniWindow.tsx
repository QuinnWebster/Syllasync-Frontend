import { useRef, useEffect, useState } from "react";
import "./miniWindow.css";
import Button from "@mui/material/Button";

type Event = {
  subject: string;
  start: any;
  end: any;
  description: string;
};

type MiniWindowProps = {
  show: boolean;
  handleClose: () => void;
  event: Event;
  events: Event[];
  setEvents: React.Dispatch<React.SetStateAction<Event[]>>;
  isEditing: boolean;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
};

const MiniWindow = ({
  show,
  handleClose,
  event,
  events,
  setEvents,
  isEditing,
  setIsEditing,
}: MiniWindowProps) => {
  const modalRef = useRef(); //Used to close the modal when clicking outside of it
  const [editedEvent, setEditedEvent] = useState({
    subject: event.subject || "",
    description: event.description || "",
  });

  //When the event changes, update the edited event
  useEffect(() => {
    setEditedEvent({
      subject: event.subject || "",
      description: event.description || "",
    });
  }, [event]);

  //Close the modal when clicking outside of it
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        handleClose();
      }
    };
    if (show) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [show, handleClose]);

  //Dont understand this part
  const handleEditToggle = () => {
    if (isEditing) {
      const updatedEvents = events.map((e) =>
        e === event ? { ...e, ...editedEvent } : e
      );
      setEvents(updatedEvents);
    }
    setIsEditing(!isEditing);
  };

  const handleInputChange = (field) => (e) => {
    setEditedEvent((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const deleteEvent = () => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      setEvents(events.filter((e) => e !== event));
      handleClose();
    }
  };

  // if (!event || !event.start || !event.end) return null;

  return (
    <div className={`modal ${show ? "show" : ""}`}>
      <div className="modal-content" ref={modalRef}>
        <span className="close" onClick={handleClose}>
          &times;
        </span>

        <div className="event-info">
          <strong>Event:</strong>
          {isEditing ? (
            <input
              type="text"
              value={editedEvent.summary}
              onChange={handleInputChange("summary")}
              className="edit-input"
            />
          ) : (
            <span> {event.summary || "N/A"}</span>
          )}
        </div>

        <div className="event-info">
          <strong>Description:</strong>
          {isEditing ? (
            <input
              type="text"
              value={editedEvent.description}
              onChange={handleInputChange("description")}
              className="edit-input"
            />
          ) : (
            <span> {event.description || "N/A"}</span>
          )}
        </div>

        <p className="event-info">
          <strong>Start Date</strong> {new Date(event.start).toLocaleString()}
        </p>
        <p className="event-info">
          <strong>End:</strong> {new Date(event.end).toLocaleString()}
        </p>

        <Button variant="contained" color="primary" onClick={handleEditToggle}>
          {isEditing ? "Save" : "Edit"}
        </Button>
        <Button variant="contained" color="primary" onClick={deleteEvent}>
          Delete Event
        </Button>
      </div>
    </div>
  );
};

export default MiniWindow;
