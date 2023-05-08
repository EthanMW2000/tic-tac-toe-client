import { useEffect, useState } from "react";
import { ISlot, Player } from "../types";
import Mark from "./mark";
import { findAdjacency } from "@/calculations";

interface slotProps {
  id: number;
  updatePlayer(data: Player): void;
  setSlots(data: ISlot[]): void;
  slots: ISlot[];
  assignment: Player;
  rowsColumns: number;
  row: number;
  col: number;
}

export default function Slot(props: slotProps) {
  const [isPlayed, setIsPlayed] = useState<boolean>(false);
  const [player, setPlayer] = useState<Player>();
  const [adjacency, setAdjaceny] = useState<number[]>([]);
  const [slot, setSlot] = useState<ISlot>();
  const idString = props.id.toString();

  function handlePlay(setting: Player) {
    setIsPlayed(true);
    const updateSlots = props.slots.map((s) => {
      if (s.id == props.id) {
        (s.isPlayed = true), (s.player = setting);
      }
      return s;
    });
  }

  useEffect(() => {
    async function calculateAdjacencies() {
      const adjacencyArr = await findAdjacency(
        props.row,
        props.col,
        props.rowsColumns
      );
      setAdjaceny(adjacencyArr);
      const slotInfo = {
        id: props.id,
        player: player as Player,
        isPlayed: isPlayed,
        row: props.row,
        col: props.col,
        adjacency: adjacencyArr,
      };
      setSlot(slotInfo);
      const updateSlots = props.slots;
      const existingSlot = updateSlots.find((s) => s.id == slotInfo.id);
      if (existingSlot != undefined) return;
      updateSlots.push(slotInfo);
      props.setSlots(updateSlots);
    }
    calculateAdjacencies();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
          handlePlay={handlePlay}
        />
      </div>
    </div>
  );
}
