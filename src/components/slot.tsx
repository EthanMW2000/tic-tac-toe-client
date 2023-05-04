import { useEffect, useState } from "react";
import { ISlot, Player } from "../types";
import Mark from "./mark";

interface slotProps extends ISlot {
  id: number,
  updatePlayer(data: Player): void
}

export default function Slot(props: slotProps) {
    const idString = props.id.toString()

    return (
      <div
        id={idString}
        className="max-w-48 max-h-48 min-w-6 min-h-6 aspect-square border-2 border-black z-0"
      >
        <div className="flex justify-center items-center w-full h-full">
          <Mark
            assignment={props.assignment}
            updatePlayer={props.updatePlayer}
          />
        </div>
      </div>
    );
  }