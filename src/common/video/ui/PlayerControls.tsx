"use client";

import { RefObject, useContext } from "react";
import screenfull from "screenfull";
import { ReactPlayerProvider } from "../VidPlayer";

// icons
import {
  FaPause,
  FaPlay,
  FaRedo,
  FaUndo,
  FaVolumeMute,
  FaVolumeUp,
} from "react-icons/fa";
import {
  MdFullscreen,
  MdFullscreenExit,
  MdLoop,
  MdPictureInPictureAlt,
} from "react-icons/md";

type PlayerControlsProps = {
  playerRef: RefObject<any>;
};
const PlayerControls: React.FC<PlayerControlsProps> = ({ playerRef }) => {
  const { setState, ...state } = useContext(ReactPlayerProvider);
  const {
    playing,
    muted,
    loop,
    volume,
    playbackRate,
    duration,
    playedSeconds,
    pip,
  } = state;

  // --- handlers ---
  const handlePlayPause = () => {
    setState((prev) => ({ ...prev, playing: !prev.playing }));
  };

  const handleRestart = () => {
    setState((prev) => ({ ...prev, played: 0, playedSeconds: 0 }));
    const video = document.querySelector("video") as HTMLVideoElement | null;
    if (video) video.currentTime = 0;
  };

  const handleToggleLoop = () => {
    setState((prev) => ({ ...prev, loop: !prev.loop }));
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number.parseFloat(e.target.value);
    setState((prev) => ({ ...prev, volume: val, muted: val === 0 }));
  };

  const handleToggleMuted = () => {
    setState((prev) => ({ ...prev, muted: !prev.muted }));
  };

  const handleSetPlaybackRate = (rate: number) => {
    setState((prev) => ({ ...prev, playbackRate: rate }));
  };

  const handleClickFullscreen = () => {
    const reactPlayer = document.querySelector(".react-player");
    if (reactPlayer && screenfull.isEnabled) {
      screenfull.toggle(reactPlayer as Element);
    }
  };

  const handleTogglePIP = () => {
    setState((prev) => ({ ...prev, pip: !prev.pip }));
  };

  const handleSeekChange = (type: "add" | "subtract" = "add") => {
    if (playerRef.current) {
      const duration = playerRef.current.duration || 0;
      let move = Math.min(playedSeconds + 5, duration);
      if (type === "subtract") {
        move = Math.max(0, playedSeconds - 5);
      }
      playerRef.current.currentTime = move;
    }
  };

  // --- helpers ---
  const formatTime = (secs: number) => {
    if (!secs || isNaN(secs)) return "0:00";
    const minutes = Math.floor(secs / 60);
    const seconds = Math.floor(secs % 60)
      .toString()
      .padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  // --- UI ---
  return (
    <div className="flex items-center justify-between bg-black/60 text-white px-3 py-2 text-sm z-[200]">
      {/* Left controls */}
      <div className="flex items-center gap-3">
        {/* Play / Pause */}
        <button type="button" onClick={handlePlayPause}>
          {playing ? <FaPause size={18} /> : <FaPlay size={18} />}
        </button>

        {/* Loop */}
        <button
          type="button"
          onClick={handleToggleLoop}
          className={loop ? "text-primary" : "text-white"}
        >
          <MdLoop size={18} />
        </button>

        {/* backwards by 5 seconds */}

        <button type="button" onClick={() => handleSeekChange("subtract")}>
          <FaUndo size={16} />
        </button>

        {/* Time */}
        <span>
          {formatTime(playedSeconds)} / {formatTime(duration)}
        </span>

        {/* Move 5 seconds */}
        <button type="button" onClick={() => handleSeekChange()}>
          <FaRedo size={16} />
        </button>
      </div>

      {/* Right controls */}
      <div className="flex items-center gap-3">
        {/* Volume */}
        <button type="button" onClick={handleToggleMuted}>
          {muted || volume === 0 ? (
            <FaVolumeMute size={18} />
          ) : (
            <FaVolumeUp size={18} />
          )}
        </button>
        <input
          type="range"
          min={0}
          max={1}
          step="any"
          value={muted ? 0 : volume}
          onChange={handleVolumeChange}
          className="w-20 accent-primary"
        />

        {/* Playback rate */}
        <select
          value={playbackRate}
          onChange={(e) => handleSetPlaybackRate(Number(e.target.value))}
          className="bg-black/40 border border-gray-500 rounded px-1 text-xs"
        >
          {[0.5, 1, 1.25, 1.5, 2].map((rate) => (
            <option key={rate} value={rate}>
              {rate}x
            </option>
          ))}
        </select>

        {/* Picture-in-Picture */}
        <button
          type="button"
          onClick={handleTogglePIP}
          className={pip ? "text-primary" : ""}
        >
          <MdPictureInPictureAlt size={18} />
        </button>

        {/* Fullscreen */}
        <button type="button" onClick={handleClickFullscreen}>
          {screenfull.isFullscreen ? (
            <MdFullscreenExit size={18} />
          ) : (
            <MdFullscreen size={18} />
          )}
        </button>
      </div>
    </div>
  );
};

export default PlayerControls;
