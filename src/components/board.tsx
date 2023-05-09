import { useEffect, useState } from "react";
import { IBoard, ISlot, Player } from "../types";
import Slot from "./slot";
import { checkWin } from "@/calculations";

export default function Board(props: IBoard) {
  const [player, setPlayer] = useState<Player>(Player.Cross);
  const [slots, setSlots] = useState<ISlot[]>([]);
  const [win, setWin] = useState<Player | undefined>(undefined);

  async function updatePlayer(newPlayer: Player, newSlots: ISlot[]) {
    setPlayer(newPlayer);
    const moves = props.movesMade + 1;
    props.setMovesMade(props.movesMade + 1);
    if (moves < props.rowsColumns) return;
    const winner = await checkWin(newSlots, props.rowsColumns);

    if (winner == undefined && moves == props.rowsColumns * props.rowsColumns) {
    } else if (winner == Player.Circle) {
      setWin(winner);
    } else if (winner == Player.Cross) {
      setWin(winner);
    } else return;
  }

  function restart() {
    props.setMovesMade(0)
    setWin(undefined)
    setPlayer(Player.Cross)
    slots.forEach(slot => {
      slot.isPlayed = false;
      slot.player = undefined
    })
    
  }

  function ShowWinner() {
    let message
    
    if(win == undefined) {
      message = "It's a tie!"
    } else if(win == Player.Circle) {
      message = "Circle has won!"
    } else {
      message = "Cross has won!"
    }
    return (
      <div className="flex flex-col h-20 w-48 bg-slate-500/50 justify-center items-center rounded-lg space-y-3">
        <h1 className="font-semibold">
          {message}
        </h1>
        <button
          onClick={restart}
          className="bg-black p-1 rounded-lg text-white font-semibold"
        >
          Restart?
        </button>
      </div>
    );
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

  useEffect(() => {}, [props.rowsColumns])

  return (
    <div className="flex items-center justify-center">
      <div className="flex flex-col justify-center items-center w-11/12 h-11/12">
        {win != undefined ||
        props.movesMade == props.rowsColumns * props.rowsColumns ? (
          ShowWinner()
        ) : (
          SetupBoard()
        )}
      </div>
    </div>
  );
}
