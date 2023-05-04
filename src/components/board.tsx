import { useState } from "react";
import { IBoard, ISlot, Player } from "../types";
import Slot from "./slot";

export default function Board(props: IBoard) {
  const [player, setPlayer] = useState<Player>(Player.Circle);
  const [playedSlots, setPlayedSlots] = useState<ISlot[]>([]);

  function updatePlayer(newPlayer: Player) {
    setPlayer(newPlayer);
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
                setPlayedSlots={setPlayedSlots}
                playedSlots={playedSlots}
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
