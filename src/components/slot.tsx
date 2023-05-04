import { useEffect, useState } from "react";
import { ISlot, Player } from "../types";
import Mark from "./mark";
import { findAdjacency } from "@/calculations";

interface slotProps {
  id: number;
  updatePlayer(data: Player): void;
  setPlayedSlots(data: ISlot[]): void;
  playedSlots: ISlot[];
  assignment: Player;
  rowsColumns: number;
  row: number;
  col: number;
}

export default function Slot(props: slotProps) {
  const [isPlayed, setIsPlayed] = useState<boolean>(false);
  const [player, setPlayer] = useState<Player>();
  const [adjacency, setAdjaceny] = useState<number[]>();
  const idString = props.id.toString();

  function handlePlay() {
    if (isPlayed === true) return;
    const slot: ISlot = {
      id: props.id,
      player: player as Player,
      isPlayed: isPlayed,
      row: props.row,
      col: props.col,
    };
    props.setPlayedSlots([...props.playedSlots, slot]);
    setIsPlayed(true);
  }

  async function setAdjacencies() {
    setAdjaceny(await findAdjacency(props.row, props.col, props.rowsColumns))
  }

  useEffect(() => {
    if (player != undefined) {
      handlePlay();
    }
    if (!adjacency) {
      setAdjacencies();
    }
  });

  return (
    <div
      id={idString}
      className="max-w-48 max-h-48 min-w-6 min-h-6 aspect-square border-2 border-black"
    >
      <div className="flex justify-center items-center w-full h-full">
        <Mark
          assignment={props.assignment}
          updatePlayer={props.updatePlayer}
          isPlayed={isPlayed}
          setPlayer={setPlayer}
        />
      </div>
    </div>
  );
}
