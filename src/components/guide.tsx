import { CSSProperties } from "react";
import { FaUpload, FaCalendarAlt, FaListUl, FaCalendar } from "react-icons/fa";

const styles: Record<string, CSSProperties> = {
  container: {
    textAlign: "center",
    padding: "2rem",
    fontFamily: "Arial, sans-serif",
    maxWidth: "800px",
    margin: "0 auto",
  },
  heading: {
    fontSize: "2.5rem",
    fontWeight: "bold",
    marginBottom: "1.5rem",
  },
  guideContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(4, minmax(250px, 1fr))",
    gap: "1.5rem",
    justifyContent: "center",
    alignContent: "center",
  },

  step: {
    backgroundColor: "#f9f9f9",
    padding: "1.5rem",
    borderRadius: "10px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
  },
  icon: {
    fontSize: "3rem",
    color: "#007aff",
    marginBottom: "1rem",
  },
  stepTitle: {
    fontSize: "1.25rem",
    fontWeight: "bold",
    marginBottom: "0.5rem",
  },
  description: {
    fontSize: "1rem",
    color: "#555",
  },
};

const Guide = () => {
  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>How It Works</h2>
      <div style={styles.guideContainer}>
        <div style={styles.step}>
          <FaUpload style={styles.icon} />
          <h4 style={styles.stepTitle}>Upload Your Syllabus as a PDF</h4>
          <p style={styles.description}>
            Drag and drop your syllabus file or select it from your computer.
          </p>
        </div>
        <div style={styles.step}>
          <FaCalendarAlt style={styles.icon} />
          <h4 style={styles.stepTitle}>Extract Key Dates</h4>
          <p style={styles.description}>
            AI finds due dates for assignments, quizzes, and exams.
          </p>
        </div>
        <div style={styles.step}>
          <FaListUl style={styles.icon} />
          <h4 style={styles.stepTitle}>Preview Events</h4>
          <p style={styles.description}>
            Review events in a list or preview them in a calendar view.
          </p>
        </div>
        <div style={styles.step}>
          <FaCalendar style={styles.icon} />
          <h4 style={styles.stepTitle}>Get Your Events via Email</h4>
          <p style={styles.description}>
            Enter your email address to receive a detailed list of your events.
            You can easily add them to your calendar from there.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Guide;
