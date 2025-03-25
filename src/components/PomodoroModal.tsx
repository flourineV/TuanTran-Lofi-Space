import { X } from "lucide-react";
import { useState, useEffect, useRef } from "react";

const link =
  "https://yorunpfvofhfoovznxfd.supabase.co/storage/v1/object/sign/lofispaceassets/notification-18-270129.mp3?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJsb2Zpc3BhY2Vhc3NldHMvbm90aWZpY2F0aW9uLTE4LTI3MDEyOS5tcDMiLCJpYXQiOjE3NDI5MjMxMjgsImV4cCI6MjA4ODUyMzEyOH0.UigPJpDnqSRM9JrKXgFQnwru1XQOI9CYEPqY9PFT7WI";

const PomodoroModal = ({ onClose }: { onClose: () => void }) => {
  const [time, setTime] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [custom, setCustom] = useState(25);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = new Audio(link);
  }, []);

  useEffect(() => {
    let timer: any;
    if (isRunning && time > 0) {
      timer = setInterval(() => setTime((prev) => prev - 1), 1000);
    } else if (time === 0) {
      setIsRunning(false);
      audioRef.current?.play(); // 🔔 Play sound
    }

    return () => clearInterval(timer);
  }, [isRunning, time]);

  const format = (t: number) =>
    `${String(Math.floor(t / 60)).padStart(2, "0")}:${String(t % 60).padStart(
      2,
      "0"
    )}`;

  return (
    <div className="fixed flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-3 w-64 relative font-mono shadow-xl text-center">
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-black"
          onClick={onClose}
        >
          <X />
        </button>
        <h2 className="text-lg font-bold text-purple-600 mb-3">
          Pomodoro Timer
        </h2>
        <div className="text-4xl font-bold text-indigo-800 mb-4">
          {format(time)}
        </div>
        <div className="flex justify-center gap-4 mb-4">
          <button
            onClick={() => setIsRunning((prev) => !prev)}
            className={`${
              isRunning ? "bg-yellow-500" : "bg-green-500"
            } text-white px-4 py-2 rounded`}
          >
            {isRunning ? "Pause" : "Start"}
          </button>
          <button
            onClick={() => {
              setIsRunning(false);
              setTime(custom * 60);
            }}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Reset
          </button>
        </div>
        <div className="text-sm text-gray-600">
          Custom time:{" "}
          <input
            type="number"
            min={1}
            value={custom}
            onChange={(e) => setCustom(Number(e.target.value))}
            className="border px-2 w-12 text-center"
          />{" "}
          min
        </div>
      </div>
    </div>
  );
};

export default PomodoroModal;
