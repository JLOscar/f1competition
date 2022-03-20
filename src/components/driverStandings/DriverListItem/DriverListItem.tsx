import { makeStyles } from "@material-ui/styles";
import React from "react";
import { DriverObj } from "../DriverStandings";

const useStyles = makeStyles({
  root: {
    width: "100%",
    backgroundColor: "grey",
    marginBottom: 10,
    borderRadius: 10,
    display: "flex",
    textAlign: "left",
  },
  position: {
    marginLeft: 10,
    width: 50,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  driverInfo: {
    marginLeft: 20,
    display: "flex",
    flexDirection: "column",
  },
  driverName: {
    fontSize: "24px",
    fontWeight: 700,
  },
  driverNumber: {},
  driverPoints: { fontSize: "20px", fontWeight: 600 },
});

interface Props {
  driverObj: DriverObj;
}

export const DriverListItem: React.FC<Props> = ({ driverObj }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.position}>
        <h1>{driverObj.position}.</h1>
      </div>
      <div className={classes.driverInfo}>
        <div className={classes.driverName}>
          {driverObj.Driver.givenName} {driverObj.Driver.familyName}
        </div>
        <div className={classes.driverNumber}>
          # {driverObj.Driver.permanentNumber}
        </div>
        <div className={classes.driverPoints}>Points: {driverObj.points}</div>
      </div>
    </div>
  );
};
