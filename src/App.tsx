import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Routes, Route, Link, BrowserRouter } from "react-router-dom";
import { DriverStandings } from "./components/driverStandings/DriverStandings";

export const App = () => {
  return (
    <div style={{ width: "100%", height: "100%" }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<></>} />
          <Route path="/standings" element={<DriverStandings />} />
          <Route path="/competition-standings" element={<></>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};
