import { useState } from "react";
import { Player } from "./types";

interface markProps {
  assignment?: Player
  updatePlayer(data: Player): void
}

export default function Mark(props: markProps) {

  const [isPlayed, setIsPlayed] = useState<boolean>(false)
  const [marker, setMarker] = useState<Player | undefined>(props.assignment)

  function handleClick() {
    setIsPlayed(true)
    if (props.assignment === Player.Circle) {
      setMarker(Player.Circle)
      props.updatePlayer(Player.Cross)
    } else {
      setMarker(Player.Cross)
      props.updatePlayer(Player.Circle)
    }
  }

  return (
    <>
      { 
        isPlayed ? (
      (marker === Player.Circle) ?
        <object data='/circle-symbol.svg' type='image/svg+xml' className="w-11/12"/> :
        <object data='/x-symbol.svg' type='image/svg+xml' className="w-11/12"/>
      ) : 
      <button className="flex w-full h-full justify-center items-center" onClick={handleClick} />
      }
   </>
  )
}
  