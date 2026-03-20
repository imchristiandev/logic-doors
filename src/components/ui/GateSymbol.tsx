import type { GateType } from '../../types/gate.types';

interface GateSymbolProps {
  type: GateType;
  activeOutput: boolean;
}

export const GateSymbol = ({ type, activeOutput }: GateSymbolProps) => {
  const strokeColor = activeOutput ? "#22d3ee" : "#64748b"; // cyan-400 or slate-500
  const commonProps = { 
    fill: "transparent", 
    stroke: strokeColor, 
    strokeWidth: "2", 
    className: "mb-3 w-14 h-10 md:w-20 md:h-14 transition-all duration-300 drop-shadow-lg"
  };
  
  switch (type) {
    case 'AND':
      return (
        <svg viewBox="0 0 50 40" {...commonProps}>
          <path d="M 5 5 L 25 5 A 15 15 0 0 1 25 35 L 5 35 Z" />
          <text x="11" y="23" fontSize="10" stroke="none" fill={strokeColor} className="font-mono font-bold transition-colors duration-300">AND</text>
        </svg>
      );
    case 'OR':
      return (
        <svg viewBox="0 0 50 40" {...commonProps}>
          <path d="M 5 5 Q 20 5 40 20 Q 20 35 5 35 Q 12 20 5 5 Z" />
          <text x="14" y="23" fontSize="10" stroke="none" fill={strokeColor} className="font-mono font-bold transition-colors duration-300">OR</text>
        </svg>
      );
    case 'NOT':
      return (
        <svg viewBox="0 0 50 40" {...commonProps}>
          <polygon points="10,5 35,20 10,35" />
          <circle cx="40" cy="20" r="4" fill="#0f172a" />
          <text x="12" y="23" fontSize="8" stroke="none" fill={strokeColor} className="font-mono font-bold transition-colors duration-300">NOT</text>
        </svg>
      );
    case 'NAND':
      return (
        <svg viewBox="0 0 55 40" {...commonProps}>
          <path d="M 5 5 L 25 5 A 15 15 0 0 1 25 35 L 5 35 Z" />
          <circle cx="44" cy="20" r="4" fill="#0f172a" />
          <text x="9" y="23" fontSize="9" stroke="none" fill={strokeColor} className="font-mono font-bold transition-colors duration-300">NAND</text>
        </svg>
      );
    case 'NOR':
      return (
        <svg viewBox="0 0 55 40" {...commonProps}>
          <path d="M 5 5 Q 20 5 38 20 Q 20 35 5 35 Q 12 20 5 5 Z" />
          <circle cx="46" cy="20" r="4" fill="#0f172a" />
          <text x="11" y="23" fontSize="8" stroke="none" fill={strokeColor} className="font-mono font-bold transition-colors duration-300">NOR</text>
        </svg>
      );
    default: return null;
  }
};