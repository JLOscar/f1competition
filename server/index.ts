import express from "express";
import {
  getCurrentDriverFinishedStatus,
  getCurrentDriverStandings,
} from "./routes/getCurrentStandings";

const app = express();
const PORT = 8000;

export const apiBaseUrl = "http://ergast.com/api/f1";

app.get("/driver-standings", async (req, res) => {
  //TODO: Remove and replace with real current round
  const round = 2;
  const driverStandings = await getCurrentDriverStandings(round);
  res.json(driverStandings);
});

app.get("/finished-status", async (req, res) => {
  //TODO: Not finished :)
  const driverStandings = await getCurrentDriverFinishedStatus();
  res.json(driverStandings);
});

app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
});
