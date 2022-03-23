import { Container } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import React, { useMemo, useState } from "react";
import {
  getCompetitors,
  getConstructors,
  getDriverStandings,
} from "../../hooks";
import { DriverObj } from "../driverStandings/DriverStandings";

const useStyles = makeStyles({
  root: {
    height: "100%",
    width: "100%",
    textAlign: "center",
  },
  currentRound: {
    fontSize: 24,
    fontWeight: 700,
    margin: "20px auto 20px auto",
  },
  h2hRow: {
    display: "flex",
    flexDirection: "row",
  },
});

export enum DriverIds {
  Albon = "albon",
  Alonso = "alonso",
  Bottas = "bottas",
  Gasly = "gasly",
  Hamilton = "hamilton",
  Latifi = "latifi",
  Leclerc = "leclerc",
  Magnussen = "kevin_magnussen",
  Norris = "norris",
  Ocon = "ocon",
  Perez = "perez",
  Ricciardo = "ricciardo",
  Russel = "russel",
  Sainz = "sainz",
  Schumacher = "mick_schumacher",
  Stroll = "stroll",
  Tsunoda = "tsunoda",
  Verstappen = "max_verstappen",
  Zhou = "zhou",
  Vettel = "vettel",
}

//TODO: fix manufacturer enum
interface H2H {
  manufacturer: string;
  topDriver: DriverIds | "equal";
}

// export interface H2H {
//   Mercedes: DriverIds.Hamilton | DriverIds.Russel;
//   Redbull: DriverIds.Verstappen | DriverIds.Perez;
//   Ferrari: DriverIds.Leclerc | DriverIds.Sainz;
//   McLaren: DriverIds.Norris | DriverIds.Ricciardo;
//   Alfa: DriverIds.Bottas | DriverIds.Zhou;
//   Alpha: DriverIds.Gasly | DriverIds.Tsunoda;
//   Haas: DriverIds.Schumacher | DriverIds.Magnussen;
//   Aston: DriverIds.Vettel | DriverIds.Stroll;
//   Alpine: DriverIds.Alonso | DriverIds.Ocon;
//   Williams: DriverIds.Latifi | DriverIds.Albon;
// }

export interface Competitor {
  id: number;
  name: string;
  h2hId: number;
  constructorId: number;
}
export interface Constructor {
  id: number;
  name: string;
  driver1id: string;
  driver2id: string;
}

export const CompetitorStandings: React.FC = () => {
  const classes = useStyles();

  //Driver standings
  const driverStandings = useMemo(() => {
    return getDriverStandings();
  }, []);
  driverStandings.then((data) => {
    setDriverData(data);
  });

  //Competitors
  const competitorsRaw = useMemo(() => {
    return getCompetitors();
  }, []);
  competitorsRaw.then((data) => {
    setCompetitors(data);
  });

  //Constructors
  const constructorsRaw = useMemo(() => {
    return getConstructors();
  }, []);
  constructorsRaw.then((data) => {
    setConstructors(data);
  });

  const [driverData, setDriverData] = useState<DriverObj[]>();
  const [competitors, setCompetitors] = useState<Competitor[]>();
  const [constructors, setConstructors] = useState<Constructor[]>();

  const currentH2H = useMemo(() => {
    if (!constructors || !driverData) {
      return;
    }

    const h2h = constructors?.map((constructor) => {
      const driver1Id = constructor.driver1id;
      const driver2Id = constructor.driver2id;

      const driver1 = driverData?.find((driver) => {
        return driver.Driver.driverId === driver1Id;
      });
      const driver2 = driverData?.find(
        (driver) => driver.Driver.driverId === driver2Id
      );

      const getTopDriver = () => {
        if (!driver1 || !driver2) {
          return;
        }

        return driver1?.points > driver2?.points
          ? driver1.Driver.familyName
          : driver1?.points === driver2?.points
          ? "equal"
          : driver2.Driver.familyName;
      };

      const topDriver = getTopDriver();

      return {
        manufacturer: constructor.name,
        topDriver: topDriver,
      } as H2H;
    });

    return h2h;
  }, [constructors, driverData]);

  return (
    <Container>
      <div className={classes.currentRound}>H2H standings</div>
      {currentH2H &&
        currentH2H.map((h2h, index) => {
          return (
            <div key={index} className={classes.h2hRow}>
              <h3>{`${
                h2h.manufacturer.charAt(0).toUpperCase() +
                h2h.manufacturer.slice(1)
              }: ${h2h.topDriver}`}</h3>
            </div>
          );
        })}
    </Container>
  );
};
