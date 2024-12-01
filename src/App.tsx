import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./homePage/landingPage";
import Events from "./events/events";
import AllDone from "./allDone";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/events/events" element={<Events />} />
        <Route path="/allDone" element={<AllDone />} />
      </Routes>
    </Router>
  );
}

export default App;
