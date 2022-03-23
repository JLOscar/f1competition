import express from "express";
import {
  getCurrentDriverFinishedStatus,
  getCurrentDriverStandings,
} from "./routes/getCurrentStandings";
import cors from "cors";
import { getCompetitors, getConstructors, getDrivers } from "./db";

const app = express();
const PORT = 8000;

export const apiBaseUrl = "http://ergast.com/api/f1";
app.use(cors());
app.get("/driver-standings", async (req, res) => {
  //TODO: Remove and replace with real current round
  const round = 1;
  const driverStandings = await getCurrentDriverStandings(round);
  res.header("Access-Control-Allow-Origin", "*");
  res.json(driverStandings);
});

app.get("/constructors", async (req, res) => {
  const constructors = await getConstructors();
  res.header("Access-Control-Allow-Origin", "*");
  res.json(constructors);
});

app.get("/finished-status", async (req, res) => {
  //TODO: Not finished :)
  const driverStandings = await getCurrentDriverFinishedStatus();
  res.json(driverStandings);
});

app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
});
