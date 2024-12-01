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

  const wait = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRecipientEmail(e.target.value);
  };

  const handleSendClick = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const sendEvents = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!recipientEmail.trim()) {
      alert("Please enter a valid email address.");
      return;
    }

    setLoading(true);

    try {
      setShowPopup(false);

      await wait(2000);

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

      console.log("The response is:", response);

      if (!response.ok) {
        throw new Error("Failed to fetch data from the server");
      }

      navigate("/allDone");
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
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
