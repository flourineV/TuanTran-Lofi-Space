import { ReactNode } from "react";

const Tooltip = ({ text, children }: { text: string; children: ReactNode }) => {
  return (
    <div className="relative group flex items-center">
      {children}
      <div className="absolute right-full mr-2 bg-black text-white text-xs px-2 py-1 rounded font-mono whitespace-nowrap z-50 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        {text}
      </div>
    </div>
  );
};

export default Tooltip;
