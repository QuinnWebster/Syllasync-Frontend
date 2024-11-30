import { useState } from "react";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import "./sendEmail.css";

const apiUrl = import.meta.env.VITE_API_URL_MAIL;

type SendEmailProps = {
  eventsQ: any;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

const SendEmail = ({ eventsQ, setLoading }: SendEmailProps) => {
  const navigate = useNavigate();
  const [recipientEmail, setRecipientEmail] = useState<string>("");
  const [showPopup, setShowPopup] = useState<boolean>(false);

  const wait = (ms: any) => new Promise((resolve) => setTimeout(resolve, ms));

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRecipientEmail(e.target.value);
  };

  const handleSendClick = () => {
    setShowPopup(true); // Show popup when button is clicked
  };

  const handleClosePopup = () => {
    setShowPopup(false); // Close popup without submitting
  };

  const sendEvents = async (e: React.FormEvent) => {
    setLoading(true);

    wait(2000); // Simulate a 2-second delay

    e.preventDefault();

    if (!recipientEmail.trim()) {
      alert("Please enter a valid email address.");
      return;
    }

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          events: eventsQ,
          recipientEmail,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch data from the server");
      }

      navigate("/allDone");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <button className="addEvent" onClick={handleSendClick}>
        Send Events via Email
      </button>

      {showPopup && (
        <Box
          sx={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "white",
            boxShadow: 24,
            p: 4,
            borderRadius: "8px",
            zIndex: 1000,
            minWidth: "200px",
            height: "200px",
          }}
        >
          <form onSubmit={sendEvents}>
            <TextField
              label="Enter your email"
              variant="outlined"
              type="email"
              value={recipientEmail}
              onChange={handleEmailChange}
              fullWidth
              required
            />
            <Box
              sx={{ display: "flex", justifyContent: "space-between", gap: 5 }}
            >
              <button
                type="button"
                className="cancel-button"
                onClick={handleClosePopup}
              >
                Cancel
              </button>
              <button className="send-button" type="submit">
                Confirm and Send
              </button>
            </Box>
          </form>
        </Box>
      )}

      {showPopup && (
        <Box
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            bgcolor: "rgba(0, 0, 0, 0.5)",
            zIndex: 999,
          }}
          onClick={handleClosePopup}
        />
      )}
    </div>
  );
};

export default SendEmail;
