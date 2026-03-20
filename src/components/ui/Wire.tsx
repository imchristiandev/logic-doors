interface WireProps {
    active: boolean;
    width?: string; // Tailwind width class, e.g. "w-6"
}

export const Wire = ({ active, width = "w-6" }: WireProps) => (
  <div className={`${width} h-[2px] transition-all duration-300 ${
    active ? 'bg-cyan-400 shadow-[0_0_8px_rgba(6,182,212,0.8)]' : 'bg-slate-700'
  }`} />
);