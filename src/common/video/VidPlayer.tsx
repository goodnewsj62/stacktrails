"use client";

import dynamic from "next/dynamic";
import {
  createContext,
  Dispatch,
  SetStateAction,
  useCallback,
  useRef,
  useState,
} from "react";
import ReactPlayer from "react-player";
import PlayButton from "./ui/PlayBtn";
import PlayerControlsWrapper from "./ui/PlayerControlsWrapper";

type VidPlayerProps = { src: string };

const initialState = {
  src: undefined,
  pip: false,
  playing: false,
  controls: false,
  light: false,
  volume: 1,
  muted: false,
  played: 0,
  loaded: 0,
  duration: 0,
  playbackRate: 1.0,
  loop: false,
  seeking: false,
  loadedSeconds: 0,
  playedSeconds: 0,
  setState: () => {},
};

type PlayerState = Omit<typeof initialState, "src" | "setState"> & {
  src?: string;
  setState: Dispatch<SetStateAction<PlayerState>>;
};

export const ReactPlayerProvider = createContext<PlayerState>(initialState);

const Player: React.FC<VidPlayerProps> = ({ src }) => {
  const playerRef = useRef<HTMLVideoElement | null>(null);
  //   const urlInputRef = useRef<HTMLInputElement | null>(null);

  const [state, setState] = useState<PlayerState>(initialState);

  const load = (src?: string) => {
    setState((prevState) => ({
      ...prevState,
      src,
      played: 0,
      loaded: 0,
      pip: false,
    }));
  };

  const handlePlayPause = () => {
    setState((prevState) => ({ ...prevState, playing: !prevState.playing }));
  };

  const handleRateChange = () => {
    const player = playerRef.current;
    if (!player) return;

    setState((prevState) => ({
      ...prevState,
      playbackRate: player.playbackRate,
    }));
  };

  const handlePlay = () => {
    console.log("onPlay");
    setState((prevState) => ({ ...prevState, playing: true }));
  };

  const handleEnterPictureInPicture = () => {
    console.log("onEnterPictureInPicture");
    setState((prevState) => ({ ...prevState, pip: true }));
  };

  const handleLeavePictureInPicture = () => {
    console.log("onLeavePictureInPicture");
    setState((prevState) => ({ ...prevState, pip: false }));
  };

  const handlePause = () => {
    console.log("onPause");
    setState((prevState) => ({ ...prevState, playing: false }));
  };

  const handleProgress = () => {
    const player = playerRef.current;
    // We only want to update time slider if we are not currently seeking
    if (!player || state.seeking || !player.buffered?.length) return;

    console.log("onProgress");

    setState((prevState) => ({
      ...prevState,
      loadedSeconds: player.buffered?.end(player.buffered?.length - 1),
      loaded:
        player.buffered?.end(player.buffered?.length - 1) / player.duration,
    }));
  };

  const handleTimeUpdate = () => {
    const player = playerRef.current;
    // We only want to update time slider if we are not currently seeking
    if (!player || state.seeking) return;

    console.log("onTimeUpdate", player.currentTime);

    if (!player.duration) return;

    setState((prevState) => ({
      ...prevState,
      playedSeconds: player.currentTime,
      played: player.currentTime / player.duration,
    }));
  };

  const handleEnded = () => {
    console.log("onEnded");
    setState((prevState) => ({ ...prevState, playing: prevState.loop }));
  };

  const handleDurationChange = () => {
    const player = playerRef.current;
    if (!player) return;

    console.log("onDurationChange", player.duration);
    setState((prevState) => ({ ...prevState, duration: player.duration }));
  };

  const setPlayerRef = useCallback((player: HTMLVideoElement) => {
    if (!player) return;
    playerRef.current = player;
    console.log(player);
  }, []);

  //   const handleLoadCustomUrl = () => {
  //     if (urlInputRef.current?.value) {
  //       setState((prevState) => ({
  //         ...prevState,
  //         src: urlInputRef.current?.value,
  //       }));
  //     }
  //   };

  return (
    <ReactPlayerProvider value={{ ...state, setState }}>
      <div className="w-full h-full relative">
        <PlayerControlsWrapper playerRef={playerRef} />
        <PlayButton onClick={handlePlayPause} />

        <ReactPlayer
          src={src}
          ref={setPlayerRef}
          style={{
            width: "100%",
            height: "100%",
            aspectRatio: "16/9",
            background: "#000",
            borderRadius: "5px",
          }}
          className="react-player"
          pip={state.pip}
          playing={state.playing}
          controls={state.controls}
          light={state.light}
          loop={state.loop}
          playbackRate={state.playbackRate}
          volume={state.volume}
          muted={state.muted}
          config={{
            youtube: {
              color: "white",
            },
            // vimeo: {
            //   color: "ffffff",
            // },
            // spotify: {
            //   preferVideo: true,
            // },
            // tiktok: {
            //   fullscreen_button: true,
            //   progress_bar: true,
            //   play_button: true,
            //   volume_control: true,
            //   timestamp: false,
            //   music_info: false,
            //   description: false,
            //   rel: false,
            //   native_context_menu: true,
            //   closed_caption: false,
            // },
          }}
          onLoadStart={() => console.log("onLoadStart")}
          onReady={() => console.log("onReady")}
          onStart={(e) => console.log("onStart", e)}
          onPlay={handlePlay}
          onEnterPictureInPicture={handleEnterPictureInPicture}
          onLeavePictureInPicture={handleLeavePictureInPicture}
          onPause={handlePause}
          onRateChange={handleRateChange}
          onSeeking={(e) => console.log("onSeeking", e)}
          onSeeked={(e) => console.log("onSeeked", e)}
          onEnded={handleEnded}
          onError={(e) => console.log("onError", e)}
          onTimeUpdate={handleTimeUpdate}
          onProgress={handleProgress}
          onDurationChange={handleDurationChange}
        />
      </div>
    </ReactPlayerProvider>
  );
};

const VidPlayer = dynamic(() => Promise.resolve(Player), {
  ssr: false,
  loading: () => (
    <div
      style={{
        height: "100%", // Changed to 100% to match parent
        backgroundColor: "#000",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "white",
      }}
    >
      Loading video player...
    </div>
  ),
});

export default VidPlayer;
