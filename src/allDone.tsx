import "./allDone.css"; // Import the CSS file for styling
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Banner from "./components/banner";

function AllDone() {
  const location = useLocation();
  const { message, event } = location.state || {}; // Destructure the state safely

  console.log("All Done message:", message, "Event:", event);

  const navigate = useNavigate();

  return (
    <div>
      <Banner signInText={false} wantButtons={true} />

      <div className="all-done-container">
        <div className="all-done-title">
          <h1>🎉 Congratulations!</h1>
          <br></br>
          <h2>All Events Have Been Added to Your Calendar</h2>
        </div>
        <div className="all-done-link">
          <h3>View Your Calendar:</h3>
          <br></br>
          <a
            className="calendar-link"
            href="https://calendar.google.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Open Google Calendar
          </a>
        </div>
        <div className="all-done-footer">
          <p>Thank you for using our service!</p>
        </div>
      </div>
      <button className="Back" onClick={() => navigate("/")}>
        {" "}
        Back to Home
      </button>
    </div>
  );
}

export default AllDone;
