import { Client } from "pg";
//TODO: Hide this in .env
const client = new Client({
  host: "",
  database: "",
  user: "",
  password: "",
  port: 1234,
  ssl: { rejectUnauthorized: false },
});

client.connect();

export const getDrivers = async () => {
  const res = await client.query(`SELECT * FROM drivers`);
  return res.rows;
};

export const getCompetitors = async () => {
  const competitorsRes = await client.query(`select * from competitor`);
  const competitors = competitorsRes.rows;
  const h2hRes = await client.query(`select * from h2hbet`);
  const h2h = h2hRes.rows;
  const constructorsRes = await client.query(`select * from constructorbet`);
  const constructors = constructorsRes.rows;

  const completeCompetitors = competitors.map((competitor) => {
    const h2hRow = h2h.find((h) => (h.id = competitor.h2hId));
    const constructorRow = constructors.find(
      (c) => (c.id = competitor.constructorId)
    );

    return { ...competitor, h2h: h2hRow, constructor: constructorRow };
  });

  return completeCompetitors;
};

export const getConstructors = async () => {
  const res = await client.query(`SELECT * FROM constructor`);
  return res.rows;
};
