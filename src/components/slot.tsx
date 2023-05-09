import { useEffect, useState } from "react";
import { ISlot, Player } from "../types";
import Mark from "./mark";
import { findAdjacency } from "@/calculations";

interface slotProps {
  id: number;
  updatePlayer(data: Player, newSlots: ISlot[]): void;
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

  function handlePlay(setting: Player, newPlayer: Player) {
    setIsPlayed(true);
    const updateSlots = props.slots.map((s) => {
      if (s.id == props.id) {
        (s.isPlayed = true),
          (s.player = setting),
          (s.col = props.col),
          (s.row = props.row);
      }
      return s;
    });
    props.updatePlayer(newPlayer, updateSlots);
  }

  useEffect(() => {
    async function calculateAdjacencies() {
      const adjacencyArr = await findAdjacency(
        props.row,
        props.col,
        props.rowsColumns
      );
      setAdjaceny(adjacencyArr);
      if (props.slots.find(s => s.id == props.id)) {
        const updateSlots = props.slots.map((s) => {
          if (s.id == props.id) {
            (s.player = player),
              (s.isPlayed = isPlayed),
              (s.col = props.col),
              (s.row = props.row),
              (s.adjacency = adjacencyArr);
          }
          return s;
        });
        props.setSlots(updateSlots);
      } else {
        const updateSlots = props.slots
        updateSlots.push({
          id: props.id,
          player: undefined,
          isPlayed: isPlayed,
          col: props.col,
          row: props.row,
          adjacency: adjacencyArr,
        });
        props.setSlots(updateSlots)
      }
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
          isPlayed={isPlayed}
          setPlayer={setPlayer}
          handlePlay={handlePlay}
        />
      </div>
    </div>
  );
}
