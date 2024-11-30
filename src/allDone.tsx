import "./allDone.css"; // Import the CSS file for styling
import { useNavigate } from "react-router-dom";
import Banner from "./components/banner";

function AllDone() {
  const navigate = useNavigate();

  return (
    <div>
      <Banner signInText={false} wantButtons={true} />

      <div className="all-done-container">
        <div className="all-done-title">
          <h1>🎉 Congratulations!</h1>
          <br></br>
          <h2>The email containing your events has been sent</h2>
        </div>
        <div className="all-done-footer">
          <p>Thank you for using our service!</p>
        </div>
        <button className="Back" onClick={() => navigate("/")}>
          {" "}
          Back to Home
        </button>
      </div>
    </div>
  );
}

export default AllDone;
