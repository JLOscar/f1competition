import { makeStyles } from "@material-ui/styles";
import type { CSSProperties, FC } from "react";
import { useDrag, DragSourceMonitor } from "react-dnd";
import { ItemTypes } from "./ItemsTypes";

const style: CSSProperties = {
  border: "1px dashed gray",
  backgroundColor: "white",
  padding: "0.5rem 1rem",
  marginRight: "1.5rem",
  marginBottom: "1.5rem",
  float: "left",
};

// const useStyles = makeStyles({
//     root: {
//       height: "100%",
//       width: "100%",
//       textAlign: "center",
//     },
//     currentRound: {
//       fontSize: 24,
//       fontWeight: 700,
//       margin: "20px auto 20px auto",
//     },
//   });

export interface BoxProps {
  name: string;
}

interface DropResult {
  allowedDropEffect: string;
  dropEffect: string;
  name: string;
}

export const Box: FC<BoxProps> = ({ name }) => {
  const [{ opacity }, drag] = useDrag(
    () => ({
      type: ItemTypes.BOX,
      item: { name },
      end(item, monitor) {
        const dropResult = monitor.getDropResult() as DropResult;
        if (item && dropResult) {
          let alertMessage = "";
          const isDropAllowed =
            dropResult.allowedDropEffect === "any" ||
            dropResult.allowedDropEffect === dropResult.dropEffect;

          if (isDropAllowed) {
            const isCopyAction = dropResult.dropEffect === "copy";
            const actionName = isCopyAction ? "copied" : "moved";
            alertMessage = `You ${actionName} ${item.name} into ${dropResult.name}!`;
          } else {
            alertMessage = `You cannot ${dropResult.dropEffect} an item into the ${dropResult.name}`;
          }
          alert(alertMessage);
        }
      },
      collect: (monitor: DragSourceMonitor) => ({
        opacity: monitor.isDragging() ? 0.4 : 1,
      }),
    }),
    [name]
  );

  return (
    <div ref={drag} style={{ ...style, opacity }}>
      {name}
    </div>
  );
};