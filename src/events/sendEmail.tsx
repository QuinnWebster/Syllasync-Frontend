// import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./events.css";
const apiUrl = import.meta.env.VITE_API_URL_MAIL;

const SendEmail = (eventsQ: any, recipientEmail: string) => {
  const navigate = useNavigate();

  const sendEvents = async (e: React.FormEvent) => {
    // console.log("The events are ", events);
    // console.log("The type of events is ", typeof events);

    e.preventDefault();

    console.log("The email is ", recipientEmail);

    console.log("The type of recipientEmail is ", typeof recipientEmail);

    const events = eventsQ.eventsQ;

    try {
      // const recipientEmail = "qwebster737@gmail.com";

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          events,
          recipientEmail: recipientEmail,
        }),
      });

      navigate("/allDone");

      if (!response.ok) {
        throw new Error("Failed to fetch data from the server");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <button className="addEvent" onClick={sendEvents}>
        Send Events via Email
      </button>
    </div>
  );
};

export default SendEmail;
