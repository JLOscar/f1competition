import axios from "axios";

//DB hooks
export const getCompetitors = async () => {
  const baseUrl = "http://127.0.0.1:8000";
  const res = await axios.get(`${baseUrl}/competitors`, {
    headers: { "Access-Control-Allow-Origin": "true" },
  });
  const { data } = res;
  return data;
};

export const getConstructors = async () => {
  const baseUrl = "http://127.0.0.1:8000";
  const res = await axios.get(`${baseUrl}/constructors`, {
    headers: { "Access-Control-Allow-Origin": "true" },
  });
  const { data } = res;
  return data;
};

//API hooks
export const getDriverStandings = async () => {
  const baseUrl = "http://127.0.0.1:8000";
  const res = await axios.get(`${baseUrl}/driver-standings`, {
    headers: { "Access-Control-Allow-Origin": "true" },
  });

  const { data } = res;
  return data;
};
