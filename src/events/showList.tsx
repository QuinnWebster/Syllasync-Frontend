import React, { useState } from "react";
import { Card, CardContent, Typography, Grid } from "@mui/material";
import "./showList.css";
import MiniWindow from "./miniWindow";

type Event = {
  subject: string;
  start: any;
  end: any;
  description: string;
  location: string;
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
    setMiniWindow(false);
  }

  function expandEvent(event: Event) {
    setCurrentEvent(event);
    setMiniWindow(true);
  }

  // "start":"2024-09-04T00:00:00","end":"2024-09-04T23:59:00","description"

  return (
    <div className="event-list-container">
      <br />
      <Grid container spacing={2}>
        {events.map((event, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card className="event-card" elevation={3}>
              <CardContent
                onClick={() => expandEvent(event)}
                style={{ maxHeight: "250px", overflow: "auto" }}
              >
                <Typography
                  variant="h6"
                  component="div"
                  className="event-title"
                  sx={{ paddingBottom: "8px" }}
                >
                  {event.subject}
                </Typography>
                <Typography
                  color="text.secondary"
                  className="event-date"
                  sx={{ paddingBottom: "8px" }}
                >
                  {new Date(event.start).toLocaleString()}
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
