import { useEffect, useState, useMemo } from "react";
import { CloudRain, Flame, Coffee, Bird, Leaf, Droplet } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import AudioPlayer from "./components/AudioPlayer";
import SupportButton from "./components/SupportButton";
import InfoModal from "./components/InfoModal";
import PomodoroModal from "./components/PomodoroModal";
import TodoModal from "./components/TodoModal";
import { Typewriter } from "react-simple-typewriter";
import { InfoIcon, TimerIcon, CheckSquareIcon } from "lucide-react";
import Tooltip from "./components/Tooltip";

const backgrounds = [
  "https://yorunpfvofhfoovznxfd.supabase.co/storage/v1/object/sign/lofispaceassets/bg3.gif?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJsb2Zpc3BhY2Vhc3NldHMvYmczLmdpZiIsImlhdCI6MTc0MjczMDg0NiwiZXhwIjoyMDg4MzMwODQ2fQ.7g3EN3rLBLeqObNeWTs3h9VcfeSQ01DRTR2oG13Paic",
  "https://yorunpfvofhfoovznxfd.supabase.co/storage/v1/object/sign/lofispaceassets/bg1.gif?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJsb2Zpc3BhY2Vhc3NldHMvYmcxLmdpZiIsImlhdCI6MTc0MjczMDg1NywiZXhwIjoyMDg4MzMwODU3fQ.otFBdbvLaArDHNdWvoXrmjVx38BQZSIVTqc66xWOzE0",
  "https://yorunpfvofhfoovznxfd.supabase.co/storage/v1/object/sign/lofispaceassets/bg4.gif?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJsb2Zpc3BhY2Vhc3NldHMvYmc0LmdpZiIsImlhdCI6MTc0MjczMDg3NSwiZXhwIjoyMDg4MzMwODc1fQ.Vz4hEZQNATyDHiFLfuhEytd5Qr7285k9FMsldiZ35ps",
  "https://yorunpfvofhfoovznxfd.supabase.co/storage/v1/object/sign/lofispaceassets/bg5.gif?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJsb2Zpc3BhY2Vhc3NldHMvYmc1LmdpZiIsImlhdCI6MTc0MjczMDkyNSwiZXhwIjoyMDg4MzMwOTI1fQ.E491qGzXIsfqAxLNebOuNApMl4991UFzpp5tu4x_WLU",
  "https://yorunpfvofhfoovznxfd.supabase.co/storage/v1/object/sign/lofispaceassets/bg6.gif?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJsb2Zpc3BhY2Vhc3NldHMvYmc2LmdpZiIsImlhdCI6MTc0MjczMDk0MSwiZXhwIjoyMDg4MzMwOTQxfQ.J6cEc4YySSZ4UsOdkbPpuNJtja2Gyr3sxwHmRKtDbpI",
  "https://yorunpfvofhfoovznxfd.supabase.co/storage/v1/object/sign/lofispaceassets/bg2.gif?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJsb2Zpc3BhY2Vhc3NldHMvYmcyLmdpZiIsImlhdCI6MTc0MjczMDk1NSwiZXhwIjoyMDg4MzMwOTU1fQ.Wl14EVm8iZXXh1A7r2IWF_EiOXlxuQ57jiKNvz9dfuY",
  "https://yorunpfvofhfoovznxfd.supabase.co/storage/v1/object/sign/lofispaceassets/bg7.gif?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJsb2Zpc3BhY2Vhc3NldHMvYmc3LmdpZiIsImlhdCI6MTc0MjczMDk2OSwiZXhwIjoyMDg4MzMwOTY5fQ.pjtVQdWnSgQqwEzjP9BcnYB3Gt_5aQ912v1yCI9V3IQ",
];

const screenglitch =
  "https://yorunpfvofhfoovznxfd.supabase.co/storage/v1/object/sign/lofispaceassets/screenglitch.gif?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJsb2Zpc3BhY2Vhc3NldHMvc2NyZWVuZ2xpdGNoLmdpZiIsImlhdCI6MTc0Mjc5MTU3NiwiZXhwIjoyMDg4MzkxNTc2fQ.RTeTVy6tybkW1DvDfjnoNkXL5pVurDp3-BjFPWsm3AE";

const sounds = {
  Rain: "https://rqttalafsfckeviernus.supabase.co/storage/v1/object/public/Audio%20Bucket/Rainy%20Day.mp3",
  Fireplace:
    "https://rqttalafsfckeviernus.supabase.co/storage/v1/object/public/Audio%20Bucket/Fireplace.mp3",
  "Coffee Cups":
    "https://rqttalafsfckeviernus.supabase.co/storage/v1/object/public/Audio%20Bucket/Coffee%20Cups.mp3",
  Bird: "https://yorunpfvofhfoovznxfd.supabase.co/storage/v1/object/sign/lofispaceassets/birdsound.mp3?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJsb2Zpc3BhY2Vhc3NldHMvYmlyZHNvdW5kLm1wMyIsImlhdCI6MTc0Mjc1MDUxOSwiZXhwIjoyMDg4MzUwNTE5fQ.kuC5szTNjYvOE-WB8q2EiMUpukFunltVmDOLdahQM0k",
  "Leaf wind":
    "https://yorunpfvofhfoovznxfd.supabase.co/storage/v1/object/sign/lofispaceassets/leafwind.mp3?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJsb2Zpc3BhY2Vhc3NldHMvbGVhZndpbmQubXAzIiwiaWF0IjoxNzQyNzUwNTM0LCJleHAiOjIwODgzNTA1MzR9.V1AMBVNGi2UbGBN5U930P0RlUUbNgQg2hHdSpKBtqCc",
  Waterfall:
    "https://yorunpfvofhfoovznxfd.supabase.co/storage/v1/object/sign/lofispaceassets/waterfall.mp3?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJsb2Zpc3BhY2Vhc3NldHMvd2F0ZXJmYWxsLm1wMyIsImlhdCI6MTc0Mjc1MDczMSwiZXhwIjoyMDg4MzUwNzMxfQ.9UE-CJVIc4F8X9ePNXvPWvrXuADtcwhdbdHDKvrAFfA",
};

const icons = [CloudRain, Flame, Coffee, Bird, Leaf, Droplet];

const musicLibrary = {
  Study: {
    "Tokyo Cafe":
      "https://yorunpfvofhfoovznxfd.supabase.co/storage/v1/object/sign/lofispaceassets/study1.mp3?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJsb2Zpc3BhY2Vhc3NldHMvc3R1ZHkxLm1wMyIsImlhdCI6MTc0Mjc0OTc1NSwiZXhwIjoyMDg4MzQ5NzU1fQ.Sil5956dWYgMDFTeKvR0zORM_JEVR3IG6TCMrWj5c-M",
    "So Glad - Nawhij":
      "https://yorunpfvofhfoovznxfd.supabase.co/storage/v1/object/sign/lofispaceassets/study2.mp3?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJsb2Zpc3BhY2Vhc3NldHMvc3R1ZHkyLm1wMyIsImlhdCI6MTc0MjczNDI3NCwiZXhwIjoyMDg4MzM0Mjc0fQ.R0Moj3kaDFXVKwYRI5798jz9dz-gyFDk3aukZwxyxdA",
    "Hydrangea - Nawhij":
      "https://yorunpfvofhfoovznxfd.supabase.co/storage/v1/object/sign/lofispaceassets/study3.mp3?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJsb2Zpc3BhY2Vhc3NldHMvc3R1ZHkzLm1wMyIsImlhdCI6MTc0MjczNDI4NSwiZXhwIjoyMDg4MzM0Mjg1fQ.xxd6FclgkOCG-f_c3twIqHsjkLwBr7g8i_UAWggx7Fs",
  },
  Typing: {
    "I'm Sorry":
      "https://yorunpfvofhfoovznxfd.supabase.co/storage/v1/object/sign/lofispaceassets/type1.mp3?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJsb2Zpc3BhY2Vhc3NldHMvdHlwZTEubXAzIiwiaWF0IjoxNzQyNzM0MzA2LCJleHAiOjIwODgzMzQzMDZ9.avgdGqO-0H6bJzJdesCQHLb93KNvvn4Z7FrjflzSvYI",
    "Snow & Sand":
      "https://yorunpfvofhfoovznxfd.supabase.co/storage/v1/object/sign/lofispaceassets/type2.mp3?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJsb2Zpc3BhY2Vhc3NldHMvdHlwZTIubXAzIiwiaWF0IjoxNzQyNzM0MzE3LCJleHAiOjIwODgzMzQzMTd9.BOWGSiWy0DVui7thUtCTesKdjg2JfGRPKblyxU2l0Ns",
    Espresso:
      "https://yorunpfvofhfoovznxfd.supabase.co/storage/v1/object/sign/lofispaceassets/type3.mp3?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJsb2Zpc3BhY2Vhc3NldHMvdHlwZTMubXAzIiwiaWF0IjoxNzQyNzM0MzI3LCJleHAiOjIwODgzMzQzMjd9.gc8MRFKu5y96XU_bLbjMBAmdnL1nFZ64YX3aDZ8hfYw",
  },
  JazzHop: {
    "With you - Nawhij":
      "https://yorunpfvofhfoovznxfd.supabase.co/storage/v1/object/sign/lofispaceassets/jazz1.mp3?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJsb2Zpc3BhY2Vhc3NldHMvamF6ejEubXAzIiwiaWF0IjoxNzQyNzQ5ODY4LCJleHAiOjIwODgzNDk4Njh9.daJTcEv5trujNbpKEBMjQY1x1dJHEGw71sIQ_3ViuNk",
    Brush:
      "https://yorunpfvofhfoovznxfd.supabase.co/storage/v1/object/sign/lofispaceassets/jazz2.mp3?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJsb2Zpc3BhY2Vhc3NldHMvamF6ejIubXAzIiwiaWF0IjoxNzQyNzQ5ODgzLCJleHAiOjIwODgzNDk4ODN9.iC4Yi6CbwBXXA-a2XrrbtyGKE5qypTlqwxWKuvGBTxw",
    Cascades:
      "https://yorunpfvofhfoovznxfd.supabase.co/storage/v1/object/sign/lofispaceassets/jazz3.mp3?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJsb2Zpc3BhY2Vhc3NldHMvamF6ejMubXAzIiwiaWF0IjoxNzQyNzQ5ODk0LCJleHAiOjIwODgzNDk4OTR9.MHJUJ1wqvQe4hbcKkj2qAx4UeNfd3uUqdb4I-CsFIQU",
  },
  Samurai: {
    "Whispers in the Garden":
      "https://yorunpfvofhfoovznxfd.supabase.co/storage/v1/object/sign/lofispaceassets/samurai1.mp3?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJsb2Zpc3BhY2Vhc3NldHMvc2FtdXJhaTEubXAzIiwiaWF0IjoxNzQyNzQ5OTA1LCJleHAiOjIwODgzNDk5MDV9.D5i17_cOqtWFZTY584kRO7A4jd4Hikg3q7NUn3NXHAA",
    Nagory:
      "https://yorunpfvofhfoovznxfd.supabase.co/storage/v1/object/sign/lofispaceassets/samurai2.mp3?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJsb2Zpc3BhY2Vhc3NldHMvc2FtdXJhaTIubXAzIiwiaWF0IjoxNzQyNzQ5OTE5LCJleHAiOjIwODgzNDk5MTl9.xgc8L7fFv9hViHW41ah84S7EiG4JK-XIZgGkDbhxd7A",
    "Keeping Face":
      "https://yorunpfvofhfoovznxfd.supabase.co/storage/v1/object/sign/lofispaceassets/samurai3.mp3?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJsb2Zpc3BhY2Vhc3NldHMvc2FtdXJhaTMubXAzIiwiaWF0IjoxNzQyNzQ5OTI4LCJleHAiOjIwODgzNDk5Mjh9.DpOVur8mKknmcRzkEfz5hFqa2xtszvFvXLEMVgW5Qtw",
  },
  "Night lullaby": {
    Lullaby:
      "https://yorunpfvofhfoovznxfd.supabase.co/storage/v1/object/sign/lofispaceassets/night1.mp3?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJsb2Zpc3BhY2Vhc3NldHMvbmlnaHQxLm1wMyIsImlhdCI6MTc0Mjc0OTk0NiwiZXhwIjoyMDg4MzQ5OTQ2fQ.1oPj7LfMJtICrKDBFDbLMlBG7BP0N2J9JnCbRLy52-4",
    "Somedays - Flance":
      "https://yorunpfvofhfoovznxfd.supabase.co/storage/v1/object/sign/lofispaceassets/night2.mp3?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJsb2Zpc3BhY2Vhc3NldHMvbmlnaHQyLm1wMyIsImlhdCI6MTc0Mjc0OTk1OSwiZXhwIjoyMDg4MzQ5OTU5fQ.JmnwdzUw-qqoTP-1ERzYrXLmZD8xmzktWXsd38lQuqk",
    Stargazing:
      "https://yorunpfvofhfoovznxfd.supabase.co/storage/v1/object/sign/lofispaceassets/night3.mp3?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJsb2Zpc3BhY2Vhc3NldHMvbmlnaHQzLm1wMyIsImlhdCI6MTc0Mjc0OTk2NywiZXhwIjoyMDg4MzQ5OTY3fQ.18SJ_l97A-Sow0lB52De5B16dzUky5N-e-sdSpwyrqk",
  },
};
const soundNames = Object.keys(sounds);
function App() {
  const [showIntro, setShowIntro] = useState(true);
  const [currentBg, setCurrentBg] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [displayEffectNames, setDisplayEffectNames] = useState<string[]>([]);
  const [selectedModal, setSelectedModal] = useState<
    "info" | "pomo" | "todo" | null
  >(null);

  const [flashTrigger, setFlashTrigger] = useState<false | "strong" | "weak">(
    false
  );
  type LofiType = "Study" | "Typing" | "JazzHop" | "Samurai" | "Night lullaby";
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  const [selectedType, setSelectedType] = useState<LofiType>("Study");
  const [activeEffects, setActiveEffects] = useState<boolean[]>(
    Array(soundNames.length).fill(false)
  );
  const [effectAudios, setEffectAudios] = useState<HTMLAudioElement[]>([]);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const playlistArray = useMemo(() => {
    return Object.entries(musicLibrary[selectedType]).map(([name, url]) => ({
      name,
      url,
    }));
  }, [selectedType]);
  useEffect(() => {
    // Initialize audio objects for each sound
    const audios = soundNames.map((name) => {
      const audio = new Audio(sounds[name as keyof typeof sounds]);
      audio.loop = true;
      return audio;
    });
    setEffectAudios(audios);
  }, []);
  const toggleEffect = (index: number) => {
    setActiveEffects((prev) => {
      const newState = [...prev];
      newState[index] = !newState[index];

      // Play or pause the sound
      if (effectAudios[index]) {
        if (newState[index]) {
          effectAudios[index].play();
        } else {
          effectAudios[index].pause();
          effectAudios[index].currentTime = 0;
        }
      }

      // Update display names
      const activeNames = soundNames.filter((_, i) => newState[i]);
      setDisplayEffectNames(activeNames);

      return newState;
    });
  };

  useEffect(() => {
    const flashSequence = () => {
      // Flash đầu mạnh
      setFlashTrigger("strong");
      setTimeout(() => {
        // Tắt flash đầu
        setFlashTrigger(false);
        // Flash nhẹ sau đó
        setTimeout(() => {
          setFlashTrigger("weak");
          setTimeout(() => setFlashTrigger(false), 150); // Tắt flash nhẹ
        }, 150); // Delay giữa 2 lần flash
      }, 200); // Duration flash đầu
    };

    const interval = setInterval(() => {
      flashSequence();
    }, Math.random() * 7000 + 5000);

    return () => clearInterval(interval);
  }, []);
  // Detect key press
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (showIntro) {
        setShowIntro(false);
        setIsPlaying(true);
        return;
      }
      if (e.key === "ArrowRight") {
        setCurrentBg((prev) => (prev + 1) % backgrounds.length);
      }
      if (e.key === "ArrowLeft") {
        setCurrentBg(
          (prev) => (prev - 1 + backgrounds.length) % backgrounds.length
        );
      }
      if (e.key === "Enter") {
        setIsPlaying((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [showIntro]);
  const handleStart = () => {
    setShowIntro(false);
    setIsPlaying(true);
  };

  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      setTouchStartX(e.touches[0].clientX);
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (touchStartX === null) return;
      const touchEndX = e.changedTouches[0].clientX;
      const diff = touchStartX - touchEndX;

      if (Math.abs(diff) > 20) {
        if (diff > 0) {
          // Vuốt sang trái: next background
          setCurrentBg((prev) => (prev + 1) % backgrounds.length);
        } else {
          // Vuốt sang phải: previous background
          setCurrentBg(
            (prev) => (prev - 1 + backgrounds.length) % backgrounds.length
          );
        }
      }

      setTouchStartX(null);
    };

    window.addEventListener("touchstart", handleTouchStart);
    window.addEventListener("touchend", handleTouchEnd);

    return () => {
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [touchStartX]);

  return (
    <div className="w-full h-screen bg-black flex items-center justify-center relative">
      <AnimatePresence>
        {showIntro && (
          <motion.div
            className="absolute inset-0 bg-black flex flex-col items-center justify-center text-white"
            initial={{ opacity: 1 }}
            style={{
              backgroundImage: `url(${screenglitch})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            onClick={handleStart}
          >
            <div className="absolute inset-0 bg-black/85 pointer-events-none" />

            {/* Outer Frame */}
            <div className="absolute inset-0 border-[16px] border-[#5e3b34]  z-50 shadow-lg">
              {/* Middle Frame */}
              <div className="absolute inset-[8px] border-[8px] border-[#231f1e]  z-50">
                {/* Inner Frame */}
                <div className="absolute inset-[6px] border-[10px] border-[#4c241c]  z-50">
                  {/* Center container */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center z-50 gap-4 pointer-events-none">
                    <h1 className="text-4xl font-mono">
                      TuanTran{" "}
                      <span className="text-purple-400">Lofi Space</span>
                    </h1>
                    <div className="border border-blue-400 px-4 py-2">
                      <span className="text-green-400 font-mono">
                        <Typewriter
                          words={["PRESS ANY KEY TO START"]}
                          loop={false}
                          cursor
                          cursorStyle="_"
                          typeSpeed={80}
                          deleteSpeed={50}
                          delaySpeed={2000}
                        />
                      </span>
                    </div>
                  </div>

                  <div className="absolute bottom-8 left-8 flex gap-5">
                    {[1, 2, 3].map((_, i) => (
                      <div
                        key={i}
                        className="w-7 h-7 bg-[#5e3b34] border-2
      border-t-[#8b6b60] border-l-[#8b6b60] border-b-[#3b201a] border-r-[#3b201a]
      shadow-inner shadow-[#3b201a]
      transition-all duration-200 ease-in-out
      hover:border-t-[#3b201a] hover:border-l-[#3b201a] hover:border-b-[#8b6b60] hover:border-r-[#8b6b60]
      hover:shadow-inner hover:shadow-[#8b6b60]
      hover:translate-y-[2px] hover:translate-x-[2px] hover:scale-95"
                      ></div>
                    ))}
                  </div>

                  <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-4">
                    {/* Nút tròn trái */}
                    <div className="w-24 h-24 bg-[#5e3b34] rounded-full border-[4px] border-[#2e1a16] flex items-center justify-center relative shadow-[inset_0_4px_4px_rgba(0,0,0,0.4)] animate-spin-slow">
                      <div className="w-16 h-16 bg-[#3c1f19] rounded-full flex items-center justify-center">
                        <div className="w-2 h-10 bg-[#2e1a16] border-[#8b655e]"></div>
                      </div>
                    </div>

                    {/* Text Label */}
                    <div className="bg-[#4c241c] mt-36 px-4 py-1 border-[4px] border-[#2e1a16] rounded-sm font-mono text-white text-sm">
                      By TuanTran
                    </div>

                    {/* Nút tròn phải */}
                    <div className="w-24 h-24 bg-[#5e3b34] rounded-full border-[4px] border-[#2e1a16] flex items-center justify-center relative shadow-[inset_0_4px_4px_rgba(0,0,0,0.4)]  animate-spin-slow">
                      <div className="w-16 h-16 bg-[#3c1f19] rounded-full flex items-center justify-center">
                        <div className="w-2 h-10 bg-[#2e1a16] border-[#8b655e]"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {!showIntro && (
        <motion.div
          className="w-full h-full flex items-center justify-center text-white"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <div
            className="h-screen w-screen bg-cover bg-center bg-no-repeat relative"
            style={{ backgroundImage: `url(${backgrounds[currentBg]})` }}
          >
            {" "}
            <div
              className="absolute inset-0 bg-black/30"
              style={{ backdropFilter: "blur(1px)" }}
            ></div>{" "}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                backgroundImage: ` linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px) `,
                backgroundSize: "40px 40px",
              }}
            ></div>{" "}
            <div
              className={`absolute inset-0 pointer-events-none transition-opacity duration-300 ${
                flashTrigger === "strong"
                  ? "opacity-50"
                  : flashTrigger === "weak"
                  ? "opacity-20"
                  : "opacity-0"
              }`}
              style={{
                background:
                  "linear-gradient(to bottom, rgba(255,255,255,0.6), rgba(255,255,255,0))",
              }}
            ></div>{" "}
            {/* Content */} <div className="absolute top-4 left-4"></div>{" "}
            <div className="hidden">
              {" "}
              {backgrounds.map((url, index) => (
                <div
                  key={index}
                  style={{ backgroundImage: `url(${url})` }}
                  className="w-0 h-0 bg-cover"
                />
              ))}{" "}
            </div>{" "}
            <div className="absolute top-6 left-6 gap-3 z-50 md:flex hidden">
              {/* Info Button + Modal */}
              <div className="relative">
                <button
                  onClick={() =>
                    setSelectedModal((prev) =>
                      prev === "info" ? null : "info"
                    )
                  }
                  className="w-12 h-12 bg-black/70 rounded-full flex items-center justify-center transition"
                >
                  <InfoIcon size={24} />
                </button>
                {selectedModal === "info" && (
                  <div className="absolute top-14 left-0">
                    <InfoModal onClose={() => setSelectedModal(null)} />
                  </div>
                )}
              </div>

              {/* Pomodoro Button + Modal */}
              <div className="relative">
                <button
                  onClick={() =>
                    setSelectedModal((prev) =>
                      prev === "pomo" ? null : "pomo"
                    )
                  }
                  className="w-12 h-12 bg-black/70 rounded-full flex items-center justify-center transition"
                >
                  <TimerIcon size={24} />
                </button>
                {selectedModal === "pomo" && (
                  <div className="absolute top-14 -left-14">
                    <PomodoroModal onClose={() => setSelectedModal(null)} />
                  </div>
                )}
              </div>

              {/* Todo Button + Modal */}
              <div className="relative">
                <button
                  onClick={() =>
                    setSelectedModal((prev) =>
                      prev === "todo" ? null : "todo"
                    )
                  }
                  className="w-12 h-12 bg-black/70 rounded-full flex items-center justify-center transition"
                >
                  <CheckSquareIcon size={24} />
                </button>
                {selectedModal === "todo" && (
                  <div className="absolute top-14 -left-28">
                    <TodoModal onClose={() => setSelectedModal(null)} />
                  </div>
                )}
              </div>
            </div>
            <div className="absolute top-28 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center mt-16 md:mt-0 ml-2 md:ml-0">
              {/* Title */}
              <h1 className="text-white text-3xl md:text-4xl font-bold font-mono text-center">
                TuanTran <span className="text-purple-400">Lofi Space</span>
              </h1>

              {/* Music Status */}
              <div className="bg-black/50 text-white px-4 py-2 rounded-full text-xs md:text-sm mt-4 md:mt-2">
                {isPlaying
                  ? `Now playing: ${
                      playlistArray[currentSongIndex]?.name || "Unknown"
                    }`
                  : "Music Paused"}
              </div>

              {/* Instructions */}
              <div className="bg-black/50 text-white px-4 py-2 rounded-full text-xs flex md-flex-wrap items-center gap-2 justify-center mt-2">
                <span>Press</span>
                <span className="bg-gray-500 px-2 py-1 rounded">←</span>
                <span className="bg-gray-500 px-2 py-1 rounded">→</span>
                <span>to switch backgrounds | Press</span>
                <span className="bg-gray-500 px-2 py-1 rounded">Enter</span>
                <span>to play/pause music</span>
              </div>
            </div>
            <div className="absolute md:top-52 top-36 left-1/2 transform -translate-x-1/2 flex flex-wrap justify-center gap-3 mt-32 md:mt-0">
              {" "}
              {Object.keys(musicLibrary).map((type) => (
                <button
                  key={type}
                  onClick={() => {
                    setSelectedType(type as LofiType);
                    setCurrentSongIndex(0);
                    setIsPlaying(true); // <-- Bổ sung dòng này
                  }}
                  className={`px-4 py-2 rounded-full text-sm font-mono transition-all focus:outline-none ${
                    selectedType === type
                      ? "bg-purple-500 text-white"
                      : "bg-black/50 text-white/70 hover:bg-black/70"
                  }`}
                >
                  {" "}
                  {type}{" "}
                </button>
              ))}{" "}
            </div>{" "}
            <div className="absolute md:bottom-10 md:left-10 bottom-20 left-10">
              {" "}
              <AudioPlayer
                playlist={playlistArray}
                currentSongIndex={currentSongIndex}
                setCurrentSongIndex={setCurrentSongIndex}
                isPlaying={isPlaying}
                setIsPlaying={setIsPlaying}
              />{" "}
            </div>{" "}
            <div className="absolute md:bottom-40 md:left-10 bottom-48 left-10">
              {" "}
              <SupportButton />{" "}
            </div>{" "}
            <div className="absolute bottom-6 w-full flex justify-center gap-3">
              {" "}
              {backgrounds.map((_, index) => (
                <div
                  key={index}
                  className={`h-2 rounded-full transition-[width] duration-300 ${
                    index === currentBg ? "bg-white w-4" : "bg-white/50 w-2"
                  }`}
                ></div>
              ))}{" "}
            </div>{" "}
            {/* Sound Effect Buttons */}{" "}
            <div className="absolute md:top-[490px] top-3/4  right-6 transform -translate-y-1/2 flex flex-col gap-4">
              {" "}
              {soundNames.map((name, index) => {
                const IconComponent = icons[index];
                return (
                  <Tooltip text={name}>
                    <button
                      onClick={() => toggleEffect(index)}
                      className={`w-12 h-12 flex items-center justify-center rounded-full transition-all focus:outline-none ${
                        activeEffects[index] ? "bg-yellow-300" : "bg-black/50"
                      }`}
                      tabIndex={-1}
                      onMouseDown={(e) => e.preventDefault()}
                    >
                      <IconComponent
                        color={activeEffects[index] ? "black" : "white"}
                        size={24}
                      />
                    </button>
                  </Tooltip>
                );
              })}{" "}
            </div>{" "}
          </div>
        </motion.div>
      )}
    </div>
  );
}

export default App;
