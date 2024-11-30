import Banner from "../components/banner";
import Guide from "../components/guide";
import { useState, useEffect } from "react";
import pdf_prev from "./../images/pdf-img.jfif";
import { useDropzone, Accept } from "react-dropzone";
import pdfToText from "react-pdftotext";
import { useNavigate } from "react-router-dom";
import "./landingPage.css";
import HashLoader from "react-spinners/HashLoader";

type AcceptedFile = File[];

const apiUrl = import.meta.env.VITE_API_URL;

// type Event = {
//   summary: string;
//   location: string;
//   description: string;
//   start: {
//     dateTime: string;
//     timeZone: string;
//   };
//   end: {
//     dateTime: string;
//     timeZone: string;
//   };
//   colorId: string;
// };

function LandingPage() {
  const [fileName, setFileName] = useState<string>("");
  const [isFileSelected, setIsFileSelected] = useState<boolean>(false);
  const [pdfText, setPdfText] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [dotCount, setDotCount] = useState(1);

  //Allows you to navigate to a different page
  const navigate = useNavigate();

  //Used for the loading animation
  useEffect(() => {
    if (loading) {
      const interval = setInterval(() => {
        setDotCount((prev) => (prev % 3) + 1);
      }, 500); // Update every 500ms for a smooth effect
      return () => clearInterval(interval);
    }
  }, [loading]);

  // Handles the file drop
  function onDrop(acceptedFiles: AcceptedFile): void {
    const file = acceptedFiles[0];
    if (file.type !== "application/pdf") {
      alert("Please upload a PDF file.");
      return;
    }
    setFileName(file.name);
    setIsFileSelected(true);
    extractTextFromPDF(file);
  }

  // Function to extract text from the dropped PDF file
  async function extractTextFromPDF(file: File) {
    if (file.type === "application/pdf") {
      try {
        const text = await pdfToText(file);
        if (text.length > 7000) {
          alert("The PDF file is too large. Please upload a smaller file.");
          return;
        }
        setPdfText(text);
      } catch (error) {
        console.error("Failed to extract text from pdf", error);
        alert("Failed to extract text from pdf.");
      }
    } else {
      console.error("The file is not a PDF.");
      alert("Please upload a PDF file.");
    }
  }

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: ".pdf" as unknown as Accept,
  });

  //Checks if the response from the AI is a list of events
  function isListOfEvents(aiResponse: any): aiResponse is Event[] {
    return (
      Array.isArray(aiResponse) &&
      aiResponse.every(
        (ele) =>
          typeof ele.summary === "string" &&
          typeof ele.location === "string" &&
          typeof ele.description === "string" &&
          typeof ele.start === "object" &&
          typeof ele.end === "object" &&
          typeof ele.colorId === "string" &&
          typeof ele.start.dateTime === "string" &&
          typeof ele.start.timeZone === "string" &&
          typeof ele.end.dateTime === "string" &&
          typeof ele.end.timeZone === "string" &&
          Object.keys(ele).length === 6
      )
    );
  }

  //On submit pdf
  const handleSubmit = async () => {
    if (!pdfText.trim()) {
      alert(
        "No text extracted from the PDF. Please check the file and try again."
      );
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: pdfText,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to fetch data from the server");
      }

      const response = await res.json();

      console.log("The response from the AI is:", response);

      const calendarObjects = JSON.parse(response.joke).objects;

      // if (!isListOfEvents(calendarObjects)) {
      //   console.error("Invalid response from the AI");
      //   alert("Invalid response from the AI. Please try again.");
      //   return;
      // }

      const notes = "My notes";

      setLoading(false);

      navigate("/events/events", {
        state: {
          message: calendarObjects,
          notes: notes,
        },
      });
    } catch (error) {
      setLoading(false);
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div>
      <Banner signInText={false} wantButtons={true} />
      <>
        <br />
        <h1 className="greeting">Hey</h1>

        <br />

        <div className="text-container">
          <h3>
            Welcome to Syllasyncc, the tool that puts your syllabus in your
            calendar!
          </h3>
        </div>
        <div>
          <>
            <div>
              <div className="instructions">
                <br />
                <h5>
                  To get started, upload a PDF of your syllabus and click
                  "Submit Syllabus". Our AI will extract the important dates,
                  preview them to you, and then add them to your calendar!
                </h5>
              </div>
              <div className="pdf-dropzone-container">
                <div {...getRootProps()} className="dropzone">
                  <input {...getInputProps()} />
                  {!isFileSelected ? (
                    <p>Drag and drop a PDF here, or click to select one</p>
                  ) : (
                    <div className="file-thumbnail">
                      <div className="--label"></div>
                      <img
                        src={pdf_prev}
                        alt="PDF Thumbnail"
                        className="pdf-thumbnail"
                      />
                      <p>{fileName}</p>
                    </div>
                  )}
                </div>
                <button
                  className="submit-button"
                  onClick={() => {
                    setTimeout(handleSubmit, 100);
                  }}
                  disabled={!isFileSelected || loading} // Disable button until a file is selected
                >
                  Submit Syllabus
                </button>

                {loading && (
                  <div className="loading">
                    <HashLoader color={"#237fe2"} loading={loading} size={40} />
                    <br />
                    <p>Extracting Dates {".".repeat(dotCount)}</p>
                  </div>
                )}
              </div>
            </div>
            <Guide></Guide>
          </>
        </div>
      </>
    </div>
  );
}

export default LandingPage;
