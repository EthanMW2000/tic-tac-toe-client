import { useState } from "react";
import { IBoard, Player } from "./types";
import Slot from "./slot";



export default function Board(props: IBoard) {
    const [player, setPlayer] = useState<Player>(Player.Circle)

    const updatePlayer = (newPlayer: Player) => {
        setPlayer(newPlayer)
    }

    function SetupBoard() {        
        
    }

    return (
        <div className="flex items-center justify-center">
            <div className="w-11/12 h-11/12">

            </div>
        </div>
    )
}