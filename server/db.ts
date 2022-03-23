import { Client } from "pg";
//TODO: Hide this in .env
const client = new Client({
  host: "ec2-34-255-225-151.eu-west-1.compute.amazonaws.com",
  database: "de33jp38qo5lof",
  user: "cwkdfusxsqrits",
  password: "86e25767023224fedff963365b729597fd5f4d97088f6609743e5ee97c269464",
  port: 5432,
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
