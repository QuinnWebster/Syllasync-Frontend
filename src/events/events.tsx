import { useState } from "react";
import { useLocation } from "react-router-dom";
import ShowCalendar from "./showCalender";
import EventCard from "./showList";
import { useNavigate } from "react-router-dom";
import HashLoader from "react-spinners/HashLoader";
import "./events.css";
import Banner from "./../components/banner";
import SendEmail from "./sendEmail";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";

// const wait = (ms: any) => new Promise((resolve) => setTimeout(resolve, ms));

type Event = {
  subject: string;
  start: any;
  end: any;
  description: string;
  location: string;
};

function HandleGoogle() {
  const location = useLocation();
  const message = location.state?.message;

  const navigate = useNavigate();

  const [isCalendarView, setIsCalendarView] = useState(false);
  const [events, setEvents] = useState<Event[]>(message);
  const [loading, setLoading] = useState<boolean>(false);
  const [showButtons, setShowButtons] = useState<boolean>(true);
  const [email, setEmail] = useState<string>("");

  //Switch between calendar view and list view
  function toggleView() {
    setIsCalendarView(!isCalendarView);
  }

  function handleEmailChange(e: any) {
    setEmail(e.target.value);
  }

  function getEmail() {
    console.log(email);
  }

  return (
    <div>
      <Banner signInText={false} wantButtons={true} />
      <div>
        <>
          <br></br>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "20px",
            }}
          >
            {showButtons && (
              <>
                <button
                  className="addEvent"
                  onClick={() => toggleView()}
                  disabled={loading}
                >
                  {isCalendarView ? "List View" : "Preview Calendar"}
                </button>
                <SendEmail eventsQ={events} recipientEmail={email}></SendEmail>
              </>
            )}
            {loading && (
              <div className="loading">
                <HashLoader color={"#123abc"} loading={loading} size={50} />
                <br></br>
                <p>Sending Email</p>
              </div>
            )}
          </div>
          <Button onClick={getEmail}>Get Email</Button>
          <TextField
            label="Enter your email"
            variant="outlined"
            type="email"
            value={email}
            onChange={handleEmailChange}
            fullWidth
          />
          <div className="title">
            <h1>{isCalendarView ? "Preview Calendar" : "Events Extracted"}</h1>
          </div>

          <div className="calendar">
            {isCalendarView && (
              <ShowCalendar events={events} setEvents={setEvents} />
            )}
          </div>
          <div className="list">
            {!isCalendarView && (
              <EventCard events={events} setEvents={setEvents} />
            )}
          </div>
          <br></br>
          <br></br>
          <div>
            <button
              className="Back"
              onClick={() => navigate("/")}
              disabled={loading}
            >
              {" "}
              Back
            </button>
          </div>
        </>
      </div>
    </div>
  );
}

export default HandleGoogle;
