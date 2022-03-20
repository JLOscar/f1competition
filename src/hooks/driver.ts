import axios from "axios";
import { resolve } from "path";

export const getDriverStandings = async () => {
  const baseUrl = "http://127.0.0.1:8000";
  const res = await axios.get(`${baseUrl}/driver-standings`, {
    headers: { "Access-Control-Allow-Origin": "true" },
  });

  const { data } = res;
  return data;
};
