import { Container } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import React, { useEffect, useMemo, useState } from "react";
import { getDriverStandings } from "../../hooks/driver";
import { DriverListItem } from "./DriverListItem/DriverListItem";

interface Driver {
  code: string;
  dateOfBirth: string;
  driverId: string;
  familyName: string;
  givenName: string;
  nationality: string;
  permanentNumber: string;
  url: string;
}

export interface DriverObj {
  Constructors: any;
  Driver: Driver;
  points: string;
  position: string;
  positionText: string;
  wins: string;
}

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
});

export const DriverStandings: React.FC = () => {
  const classes = useStyles();

  const driverStandings = useMemo(() => {
    return getDriverStandings();
  }, []);
  const [driverData, setDriverData] = useState<DriverObj[]>();
  driverStandings.then((data) => {
    setDriverData(data);
  });

  return (
    <div className={classes.root}>
      <div className={classes.currentRound}>Current Round: 2</div>
      {driverData && (
        <div>
          {driverData?.map((driverObj, index) => {
            return <DriverListItem key={index} driverObj={driverObj} />;
          })}
        </div>
      )}
    </div>
  );
};
