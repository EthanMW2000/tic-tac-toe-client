import { useEffect, useState } from "react";
import Mark from "./mark";
import Slot from "./slot";
import { ISlot, Player } from "./types";
import Board from "./board";



export default function Home() {
  const [rowsColumns, setRowsColumns] = useState<number>(3)

  return (
    <main className="justify-center items-center">
      <div className="flex p-4 space-x-4">
      <button className="flex justify-center items-center w-24 aspect-square bg-gray-500 rounded-md" onClick={() => setRowsColumns(rowsColumns+1)}>
        <object data='/up-chevron.svg' type='image/svg+xml' className="w-3/4" />
      </button>
      <button className="flex justify-center items-center w-24 aspect-square bg-gray-500 rounded-md" onClick={() => setRowsColumns(rowsColumns-1)}>
        <object data='/down-chevron.svg' type='image/svg+xml' className="w-3/4" />
      </button>
      </div>
      <p>{rowsColumns}</p>
      <Board rowsColumns={rowsColumns}  />
    </main>
  )
}
