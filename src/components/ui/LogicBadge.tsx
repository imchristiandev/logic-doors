export const LogicBadge = ({ value }: { value: boolean }) => (
  <div className={`flex items-center justify-center w-5 h-5 rounded text-xs font-mono font-bold transition-all duration-300 ${
    value ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/50 shadow-[0_0_8px_rgba(6,182,212,0.4)]' 
          : 'bg-slate-800 text-slate-500 border border-slate-700'
  }`}>
    {value ? '1' : '0'}
  </div>
);