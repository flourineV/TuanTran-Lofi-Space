import { Lock } from "lucide-react";

export default function SupportButton() {
  return (
    <div className="flex items-center gap-2 bg-black/50 px-4 py-2 rounded-2xl text-white text-sm font-mono">
      <span>Feel good?</span>
      <button className="flex items-center gap-1 bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-bold hover:bg-orange-400 transition-colors focus:outline-none">
        <Lock size={14} className="text-white" />
        <span>Support me</span>
      </button>
    </div>
  );
}
