import { useEffect, useState } from "react";
import Board from "../components/board";
import Chevron from "@/components/chevron";

export default function Home() {
  const [rowsColumns, setRowsColumns] = useState<number>(3);

  return (
    <main className="justify-center items-center">
      <div className="flex justify-center items-center p-4 space-x-4">
        <button
          className="flex justify-center items-center w-10 md:w-14 lg:w-16 aspect-square rounded-md"
          onClick={() => setRowsColumns(rowsColumns + 1)}
        >
          <Chevron chevronDown={false} />
        </button>
        <p className="border-2 rounder-md border-black p-1 px-3 md:p-2 md:px-4 lg:p-3 lg:px-5 aspect-square font-extrabold text-xl md:2xl lg:3xl">
          {rowsColumns}
        </p>
        <button
          className="flex justify-center items-center w-10 md:w-14 lg:w-16 aspect-square rounded-md"
          onClick={() => setRowsColumns(rowsColumns - 1)}
        >
          <Chevron chevronDown={true} />
        </button>
      </div>

      <Board rowsColumns={rowsColumns} />
    </main>
  );
}
