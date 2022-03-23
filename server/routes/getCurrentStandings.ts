import axios from "axios";
import { json } from "body-parser";
import { apiBaseUrl } from "..";

export const getCurrentDriverStandings = async (round: number) => {
  const year = new Date().getFullYear();
  //TODO: Add real current round
  const url = `${apiBaseUrl}/${year}/${round}/driverStandings.json`;

  const response = await axios.get(url);

  return response.data.MRData.StandingsTable.StandingsLists[0].DriverStandings;
};

export const getCurrentDriverFinishedStatus = async () => {
  const year = new Date().getFullYear() - 1;
  //TODO: Add real current round
  const currentRound = 2;

  const url = `${apiBaseUrl}/${year}/${currentRound}/status.json`;

  const response = await axios.get(url);

  return response.data.MRData.StandingsTable.StandingsLists[0].DriverStandings;
};
