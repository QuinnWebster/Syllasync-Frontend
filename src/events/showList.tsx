import React, { useState } from "react";
import { Card, CardContent, Typography, Grid } from "@mui/material"; // Ensure to import Grid from MUI
import "./showList.css"; // Ensure to import your CSS file
import MiniWindow from "./miniWindow"; // Import your modal component

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

type ShowListProps = {
  events: Event[];
  setEvents: React.Dispatch<React.SetStateAction<Event[]>>;
};

const ShowList: React.FC<ShowListProps> = ({ events, setEvents }) => {
  const [showMiniWindow, setMiniWindow] = useState(false);
  const [currentEvent, setCurrentEvent] = useState({});
  const [isEditing, setIsEditing] = useState(false);

  function closeModal() {
    setIsEditing(false);
    setMiniWindow(false); // Hide the modal
  }

  function expandEvent(event: Event) {
    setCurrentEvent(event); // Set the event to display
    setMiniWindow(true); // Show the modal
  }

  return (
    <div className="event-list-container">
      <br />
      <Grid container spacing={2}>
        {events.map((event, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card className="event-card" elevation={3}>
              <CardContent onClick={() => expandEvent(event)}>
                <Typography
                  variant="h6"
                  component="div"
                  className="event-title"
                >
                  {event.summary}{" "}
                </Typography>
                <Typography color="text.secondary" className="event-date">
                  {new Date(event.start.dateTime).toLocaleString("en-CA", {
                    timeZone: event.start.timeZone,
                  })}
                </Typography>
                <Typography color="text.secondary" className="event-location">
                  {event.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <MiniWindow
        show={showMiniWindow}
        handleClose={closeModal}
        event={currentEvent}
        events={events}
        setEvents={setEvents}
        isEditing={isEditing}
        setIsEditing={setIsEditing}
      />
    </div>
  );
};

export default ShowList;
