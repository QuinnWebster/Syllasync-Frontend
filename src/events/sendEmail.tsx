// import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./events.css";
const apiUrl = import.meta.env.VITE_API_URL_MAIL;

const SendEmail = (eventsQ: any, recipientEmail: any) => {
  const navigate = useNavigate();

  //   const events = [
  //     {
  //       subject: "Event 1: Introduction to AI",
  //       start: "2024-12-01T09:00:00",
  //       end: "2024-12-01T10:00:00",
  //       description:
  //         "Join us for an introduction to the world of AI! We will cover the basics of machine learning and deep learning.",
  //     },
  //     {
  //       subject: "Event 2: Advanced Web Development",
  //       start: "2024-12-02T13:00:00",
  //       end: "2024-12-02T15:00:00",
  //       description:
  //         "A hands-on workshop on modern web development practices, covering topics such as React, Node.js, and deployment.",
  //     },
  //     {
  //       subject: "Event 3: Data Science Workshop",
  //       start: "2024-12-03T10:00:00",
  //       end: "2024-12-03T12:00:00",
  //       description:
  //         "Dive deep into data science with this interactive workshop. Learn how to analyze data, use Python, and visualize results.",
  //     },
  //   ];s

  //   const sendEvents = async (e: React.FormEvent) => {
  //     e.preventDefault();

  //     try {
  //       const recipientEmail = "qwebster737@gmail.com";

  //       const response = await axios.post("http://localhost:3001/send-events", {
  //         events,
  //         recipientEmail,
  //       });
  //       setResponseMessage(response.data.message);
  //     } catch (error) {
  //       console.error(error);
  //       setResponseMessage("Error sending events");
  //     }
  //   };

  const sendEvents = async (e: React.FormEvent) => {
    // console.log("The events are ", events);
    // console.log("The type of events is ", typeof events);

    e.preventDefault();

    const events = eventsQ.eventsQ;

    // console.log("The events are ", myList);
    // console.log("The type of events is ", typeof myList);

    try {
      // const recipientEmail = "qwebster737@gmail.com";

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          events,
          recipientEmail,
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
