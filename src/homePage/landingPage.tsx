import Banner from "../components/banner";
import Guide from "../components/guide";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { useState, useEffect } from "react";
import pdf_prev from "./../images/pdf-img.jfif";
import { useDropzone, Accept } from "react-dropzone";
import pdfToText from "react-pdftotext"; // Importing the library
import { useNavigate } from "react-router-dom";
import "./landingPage.css";
// import axios from "axios";
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
  const session = useSession(); // Tokens
  const supabase = useSupabaseClient(); // Talk to Supabase
  const [fileName, setFileName] = useState<string>("");
  const [isFileSelected, setIsFileSelected] = useState<boolean>(false);
  const [pdfText, setPdfText] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [dotCount, setDotCount] = useState(1);

  const navigate = useNavigate();

  useEffect(() => {
    if (loading) {
      const interval = setInterval(() => {
        setDotCount((prev) => (prev % 3) + 1);
      }, 500); // Update every 500ms for a smooth effect
      return () => clearInterval(interval);
    }
  }, [loading]);

  async function signOut(): Promise<void> {
    console.log("Trying to sign out");
    await supabase.auth.signOut();
  }

  async function googleSignIn(): Promise<void> {
    console.log("Trying to sign in with Google");
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        scopes:
          "https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile",
        queryParams: { prompt: "select_account" },
      },
    });
    if (error) {
      alert("Error logging into Google provider with Supabase");
      console.log(error);
    }
  }

  // Function to handle the drop of the PDF
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

  // function isListOfEvents(aiResponse: any): aiResponse is Event[] {
  //   return (
  //     Array.isArray(aiResponse) &&
  //     aiResponse.every(
  //       (ele) =>
  //         typeof ele.summary === "string" &&
  //         typeof ele.location === "string" &&
  //         typeof ele.description === "string" &&
  //         typeof ele.start === "object" &&
  //         typeof ele.end === "object" &&
  //         typeof ele.colorId === "string" &&
  //         typeof ele.start.dateTime === "string" &&
  //         typeof ele.start.timeZone === "string" &&
  //         typeof ele.end.dateTime === "string" &&
  //         typeof ele.end.timeZone === "string" &&
  //         Object.keys(ele).length === 6
  //     )
  //   );
  // }

  const handleSubmit = async () => {
    if (!pdfText.trim()) {
      alert(
        "No text extracted from the PDF. Please check the file and try again."
      );
      return;
    }

    setLoading(true);

    console.log("Sending request to the server");

    try {
      console.log("Sending request to the server");
      const res = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: "By the end of the course, students will understand matrix operations, solve systems of linear equations, apply vector spaces and linear transformations, and analyze eigenvalues and eigenvectors, with key dates including the course start on September 4, 2024, assignments due on September 25, October 16, and November 13, a midterm on October 30, and a final exam on December 11.",
        }),
      });
      console.log("Got response");

      if (!res.ok) {
        throw new Error("Failed to fetch data from the server");
      }

      const response = await res.json();

      const calendarObjects = JSON.parse(response.joke).objects;

      console.log("Response", calendarObjects);
      console.log("Type", typeof calendarObjects);

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
          session: session,
        },
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // try {
  //   const response = await axios.post(
  //     `http://localhost:5000/api/getAiResponse`,
  //     {
  //       content: pdfText,
  //     }
  //   );

  //   console.log("Response", response.data.message);

  //   const aiResponse = response.data.message;

  //   const calendarObjects = aiResponse.objects;

  //   const notes = aiResponse.additionalNotes;

  //   if (!isListOfEvents(calendarObjects)) {
  //     console.error("Invalid response from the AI");
  //     alert("Invalid response from the AI. Please try again.");
  //     return;
  //   }

  //   // const calendarObjects = [
  //   //   {
  //   //     summary: "Quiz 1",
  //   //     location: "",
  //   //     description: "Quiz 1 for section 1",
  //   //     start: {
  //   //       dateTime: "2024-11-05T09:00:00",
  //   //       timeZone: "Canada/Pacific",
  //   //     },
  //   //     end: {
  //   //       dateTime: "2024-11-05T09:50:00",
  //   //       timeZone: "Canada/Pacific",
  //   //     },
  //   //     colorId: "1",
  //   //   },
  //   // ];

  //   // const notes = "My notes";

  //   setLoading(false);

  //   navigate("/events/events", {
  //     state: {
  //       message: calendarObjects,
  //       notes: notes,
  //       session: session,
  //     },
  //   });
  // } catch (error) {
  //   setLoading(false);
  //   console.error("Error fetching data:", error);
  //   alert("There was an error sending the data. Please try again.");
  // }

  return (
    <div>
      {session ? (
        <Banner
          googleSignIn={googleSignIn}
          signOut={signOut}
          signInText={false}
          wantButtons={true}
        />
      ) : (
        <Banner
          googleSignIn={googleSignIn}
          signOut={signOut}
          signInText={true}
          wantButtons={false}
        />
      )}

      {session ? (
        <>
          <br />
          <h1 className="greeting">
            Hey{" "}
            {session.user.user_metadata?.full_name ||
              session.user.user_metadata?.name ||
              session.user.email}
          </h1>
        </>
      ) : (
        <></>
      )}
      <br />

      <div className="text-container">
        <h3>
          Welcome to Syllasync, the tool that puts your syllabus in your
          calendar!
        </h3>
      </div>
      <div>
        {session ? (
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
                    {/* <p> Extracting Dates </p> */}

                    <p>Extracting Dates {".".repeat(dotCount)}</p>
                  </div>
                )}
              </div>
            </div>
            <Guide></Guide>
          </>
        ) : (
          <div className="signed-out">
            <br></br>
            <h2>Sign in to get started!</h2>
            <button className="submit-button" onClick={googleSignIn}>
              Sign in with Google
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default LandingPage;
