import { useState } from "react";
import { IBoard, ISlot, Player } from "../types";
import Slot from "./slot";
import { checkWin } from "@/calculations";

export default function Board(props: IBoard) {
  const [player, setPlayer] = useState<Player>(Player.Cross);
  const [slots, setSlots] = useState<ISlot[]>([]);
  const [movesMade, setMovesMade] = useState<number>(0);

  async function updatePlayer(newPlayer: Player) {
    setPlayer(newPlayer);
    const moves = movesMade + 1;
    setMovesMade(movesMade + 1);
    if (moves < props.rowsColumns) return;
    const winner = await checkWin(slots, props.rowsColumns);

    if (
      winner == undefined &&
      movesMade == props.rowsColumns * props.rowsColumns
    ) {
      console.log("its a tie!");
    } else if (winner == Player.Circle) {
      console.log("Circle has won!");
    } else if (winner == Player.Cross) {
      console.log("Cross has won!");
    } else return;
  }

  function SetupBoard() {
    let col: number[] = [];
    for (let i = 0; i < props.rowsColumns; i++) {
      col.push(i);
    }

    let rows: number[] = [];
    for (let i = 0; i < props.rowsColumns; i++) {
      rows.push(i);
    }

    return rows.map((row) => {
      return (
        <div
          key={row}
          className="h-20 md:h-32 lg:h-40 flex flex-row justify-center"
        >
          {col.map((slot) => {
            return (
              <Slot
                id={slot + row * props.rowsColumns}
                key={slot + row * props.rowsColumns}
                updatePlayer={updatePlayer}
                setSlots={setSlots}
                slots={slots}
                rowsColumns={props.rowsColumns}
                row={row}
                col={slot}
                assignment={player}
              />
            );
          })}
        </div>
      );
    });
  }

  return (
    <div className="flex items-center justify-center">
      <div className="flex flex-col justify-center items-center w-11/12 h-11/12">
        {SetupBoard()}
      </div>
    </div>
  );
}
