import React, { useRef, useEffect, useState } from "react";
import "./miniWindow.css";
import Button from "@mui/material/Button";

function MiniWindow({
  show,
  handleClose,
  event,
  events,
  setEvents,
  isEditing,
  setIsEditing,
}) {
  const modalRef = useRef();
  // const [isEditing, setIsEditing] = useState(false);
  const [editedEvent, setEditedEvent] = useState({
    summary: event.summary || "",
    description: event.description || "",
    location: event.location || "",
  });

  // Sync initial values on event change
  useEffect(() => {
    setEditedEvent({
      summary: event.summary || "",
      description: event.description || "",
      location: event.location || "",
    });
  }, [event]);

  // Handle closing the modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        handleClose();
      }
    };
    if (show) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [show, handleClose]);

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

  const formatDate = (date) => new Date(date).toLocaleString();

  if (!event || !event.start || !event.end) return null;

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

        <div className="event-info">
          <strong>Location:</strong>
          {isEditing ? (
            <input
              type="text"
              value={editedEvent.location}
              onChange={handleInputChange("location")}
              className="edit-input"
            />
          ) : (
            <span> {event.location || "N/A"}</span>
          )}
        </div>

        <p className="event-info">
          <strong>Start Date:</strong> {formatDate(event.start.dateTime)}
        </p>
        <p className="event-info">
          <strong>End:</strong> {formatDate(event.end.dateTime)}
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
}

export default MiniWindow;
