interface ToggleSwitchProps {
    label: string;
    checked: boolean;
    onChange: (newValue: boolean) => void;
}

export const ToggleSwitch = ({ label, checked, onChange }: ToggleSwitchProps) => (
  <div className="flex items-center space-x-3">
    <span className="text-slate-400 font-mono font-semibold w-4 text-right">{label}</span>
    <button
      onClick={() => onChange(!checked)}
      className={`relative w-10 h-5 rounded-full transition-all duration-300 focus:outline-none border ${
        checked ? 'bg-cyan-900/50 border-cyan-500' : 'bg-slate-800 border-slate-600'
      }`}
    >
      <div
        className={`absolute top-0.5 left-0.5 w-3.5 h-3.5 rounded-full shadow-sm transform transition-transform duration-300 flex items-center justify-center ${
          checked ? 'translate-x-5 bg-cyan-400 shadow-[0_0_8px_rgba(6,182,212,0.8)]' : 'translate-x-0 bg-slate-400'
        }`}
      />
    </button>
  </div>
);