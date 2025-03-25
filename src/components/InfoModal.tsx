// components/InfoModal.tsx
import { X, Facebook, Github, Instagram } from "lucide-react";

const InfoModal = ({ onClose }: { onClose: () => void }) => {
  return (
    <div className="fixed flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-64 relative font-mono shadow-xl">
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-black"
          onClick={onClose}
        >
          <X />
        </button>
        <h2 className="text-xl font-bold text-purple-600 mb-2 text-center">
          About Me
        </h2>
        <p className="text-sm text-gray-700 mb-4">
          Xin chào! Mình là <b>TuanTran</b>, người tạo ra Lofi Space 🎧
        </p>
        <div className="flex justify-evenly text-purple-700 text-center">
          <a href="https://www.facebook.com/tuan.tran.501844" target="_blank">
            <Facebook className="hover:text-blue-500" />
          </a>
          <a href="https://github.com/flourineV" target="_blank">
            <Github className="hover:text-black" />
          </a>
          <a href="https://www.instagram.com/np.flourinee/" target="_blank">
            <Instagram className="hover:text-pink-600" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default InfoModal;
