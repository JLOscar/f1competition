import { Routes, Route, Link, BrowserRouter } from "react-router-dom";
import { AddCompetitor } from "./components/addCompetitor/AddCompetitor";
import { DriverStandings } from "./components/driverStandings/DriverStandings";

export const App = () => {
  return (
    <div style={{ width: "100%", height: "100%" }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<></>} />
          <Route path="/standings" element={<DriverStandings />} />
          <Route path="/competition-standings" element={<></>} />
          <Route path="/add-competitor" element={<AddCompetitor />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};
