import { makeStyles } from "@material-ui/styles";
import React, { useEffect, useMemo, useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Container } from "../../dragAndDrop/Container";

const useStyles = makeStyles({
  root: {
    height: "100%",
    width: "100%",
  },
});

export const AddCompetitor: React.FC = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <DndProvider backend={HTML5Backend}>
        <Container />
      </DndProvider>
    </div>
  );
};
