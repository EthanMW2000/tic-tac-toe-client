import { useState } from "react";
import { Player } from "../types";

interface markProps {
  assignment?: Player;
  updatePlayer(data: Player): void;
  isPlayed: boolean;
  setPlayer(data: Player): void;
  handlePlay(data: Player): void;
}

export default function Mark(props: markProps) {
  const [marker, setMarker] = useState<Player | undefined>(props.assignment);

  async function handleClick() {
    if (props.assignment === Player.Circle) {
      setMarker(Player.Circle);
      props.setPlayer(Player.Circle);
      props.handlePlay(Player.Circle);
      props.updatePlayer(Player.Cross);
    } else {
      setMarker(Player.Cross);
      props.setPlayer(Player.Cross);
      props.handlePlay(Player.Cross);
      props.updatePlayer(Player.Circle); 
    }
  }

  return (
    <>
      {props.isPlayed ? (
        marker === Player.Circle ? (
          <object
            data="/circle-symbol.svg"
            type="image/svg+xml"
            className="w-11/12"
          />
        ) : (
          <object
            data="/x-symbol.svg"
            type="image/svg+xml"
            className="w-11/12"
          />
        )
      ) : (
        <button
          className="flex w-full h-full justify-center items-center"
          onClick={handleClick}
        />
      )}
    </>
  );
}
