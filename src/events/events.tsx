// import "./App.css";
import { useState } from "react";

import { useLocation } from "react-router-dom";

import ShowCalendar from "./showCalender";
import EventCard from "./showList";

import { useNavigate } from "react-router-dom";

import HashLoader from "react-spinners/HashLoader";

import "./events.css";
import Banner from "./../components/banner";
const wait = (ms: any) => new Promise((resolve) => setTimeout(resolve, ms));

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

function HandleGoogle() {
  const location = useLocation();
  const session = location.state?.session;
  const message = location.state?.message;
  const notes = location.state?.notes;

  console.log("getitng here");

  const navigate = useNavigate();

  const [isCalendarView, setIsCalendarView] = useState(false);
  const [events, setEvents] = useState<Event[]>(message);
  const [loading, setLoading] = useState<boolean>(false);
  const [showButtons, setShowButtons] = useState<boolean>(true);

  function toggleView() {
    setIsCalendarView(!isCalendarView);
  }

  async function createCalendarEvent() {
    setLoading(true);
    setShowButtons(false);
    await wait(2000);

    // try {
    //   for (let i = 0; i < events.length; i++) {
    //     console.log("Event", events[i]);
    //     await fetch(
    //       "https://www.googleapis.com/calendar/v3/calendars/primary/events",
    //       {
    //         method: "POST",
    //         headers: {
    //           Authorization: "Bearer " + session.provider_token, // Access token for Google
    //         },
    //         // body: JSON.stringify(event[0]),
    //         body: JSON.stringify(events[i]),
    //       }
    //     );
    //     // .then((data) => data.json())
    //     // .then((data) => {
    //     //   myEvents.push(data);
    //     // });
    //   }
    //   setLoading(false);
    //   navigate("/allDone");
    // } catch (error) {
    //   setLoading(false);

    //   console.log("Error creating event", error);
    //   alert("Error creating event");
    // }
  }

  return (
    <div>
      <Banner signInText={false} wantButtons={true} />
      <div>
        {session ? (
          <>
            <h2>testing</h2>
            <>
              {/* <h2 className="greeting">
                <br></br>
                Hey{" "}
                {session.user.user_metadata?.full_name ||
                  session.user.user_metadata?.name ||
                  session.user.email}
              </h2> */}
            </>
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
                  <button
                    className="addEvent"
                    onClick={() => createCalendarEvent()}
                    disabled={loading}
                  >
                    Add Events to Calendar
                  </button>
                </>
              )}
              {loading && (
                <div className="loading">
                  <HashLoader color={"#123abc"} loading={loading} size={50} />
                  <br></br>
                  <p>Adding Events to Your Calendar</p>
                </div>
              )}
            </div>
            <div className="title">
              <h1>
                {isCalendarView ? "Preview Calendar" : "Events Extracted"}
              </h1>
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
            <div className="notes">
              <h2>{notes ? notes : ""}</h2>
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
        ) : (
          <div>
            <h2>Session expired. Please sign in again.</h2>
            <button className="Back" onClick={() => navigate("/")}>
              {" "}
              Back
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default HandleGoogle;
