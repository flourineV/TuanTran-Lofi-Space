import { useEffect, useRef, useState } from "react";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  SkipBack,
  SkipForward,
} from "lucide-react";

interface Track {
  name: string;
  url: string;
}

interface AudioPlayerProps {
  playlist: Track[];
  currentSongIndex: number;
  setCurrentSongIndex: React.Dispatch<React.SetStateAction<number>>;
  isPlaying: boolean;
  setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function AudioPlayer({
  playlist,
  currentSongIndex,
  setCurrentSongIndex,
  isPlaying,
  setIsPlaying,
}: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [volumeVisible, setVolumeVisible] = useState(false);
  const [volume, setVolume] = useState(0.7);
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const vol = parseFloat(e.target.value);
    setVolume(vol);
    if (audioRef.current) {
      audioRef.current.volume = vol;
    }
  };

  const handlePrev = () => {
    setCurrentSongIndex((prev) =>
      prev === 0 ? playlist.length - 1 : prev - 1
    );
  };

  const handleNext = () => {
    setCurrentSongIndex((prev) => (prev + 1) % playlist.length);
  };

  // Cập nhật source khi đổi bài
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.src = playlist[currentSongIndex].url;
      audioRef.current.load();
      if (isPlaying) {
        audioRef.current.play(); // đảm bảo play khi load bài mới
      }
    }
  }, [currentSongIndex, playlist, isPlaying]);

  return (
    <div className="bg-black/60 backdrop-blur-md rounded-2xl p-4 flex flex-col items-start gap-2 min-w-[234px]">
      <div className="flex items-center gap-4">
        <button
          onClick={handlePrev}
          className="focus:outline-none"
          onMouseDown={(e) => e.preventDefault()}
        >
          <SkipBack size={20} color="white" />
        </button>
        <button
          onClick={togglePlay}
          className="w-10 h-10 flex items-center justify-center bg-white rounded-full focus:outline-none"
        >
          {isPlaying ? (
            <Pause size={20} color="black" />
          ) : (
            <Play size={20} color="black" />
          )}
        </button>

        <button
          onClick={handleNext}
          className="focus:outline-none"
          onMouseDown={(e) => e.preventDefault()}
        >
          <SkipForward size={20} color="white" />
        </button>
        {volume === 0 ? (
          <VolumeX size={20} color="white" />
        ) : (
          <Volume2 size={20} color="white" />
        )}
        <button
          onClick={() => setVolumeVisible(!volumeVisible)}
          className="text-xs text-white bg-white/30 px-2 py-0.5 rounded-md focus:outline-none"
        >
          Vol
        </button>
        {volumeVisible && (
          <input
            type="range"
            min={0}
            max={1}
            step={0.01}
            value={volume}
            onChange={handleVolumeChange}
            className="w-20 h-1 appearance-none bg-transparent cursor-pointer focus:outline-none"
          />
        )}
      </div>

      {/* Hiển thị tên bài hát */}
      <div className="text-white text-sm font-mono mt-1 ml-3 text-start px-2">
        {playlist[currentSongIndex]?.name || "No Track"}
      </div>

      <audio
        ref={audioRef}
        onEnded={() => {
          if (audioRef.current) {
            audioRef.current.currentTime = 0;
            audioRef.current.play(); // tự play lại
          }
        }}
      />
    </div>
  );
}
