"use client";

import { RefObject } from "react";
import PlayerControls from "./PlayerControls";
import ProgressBar from "./ProgressBar";

type PlayerControlsWrapperProps = {
  playerRef: RefObject<any>;
};
const PlayerControlsWrapper: React.FC<PlayerControlsWrapperProps> = ({
  playerRef,
}) => {
  return (
    <div className="absolute bottom-0 left-0 right-0 z-[100] flex flex-col">
      <div className="flex items-center justify-center w-full">
        <ProgressBar playerRef={playerRef} />
      </div>
      <PlayerControls playerRef={playerRef} />
    </div>
  );
};

export default PlayerControlsWrapper;
