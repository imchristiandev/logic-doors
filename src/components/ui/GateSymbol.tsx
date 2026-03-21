import type { GateType } from '../../types/gate.types';

interface GateSymbolProps {
  type: GateType;
  activeOutput: boolean;
}

// Renders only the SVG paths in local gate coordinates.
// Used by GateSymbol (standalone) and by circuit diagram components.
export const GateContent = ({ type, color }: { type: GateType; color: string }) => {
  const t = { stroke: color, fill: "transparent", strokeWidth: "2" };
  const label = { stroke: "none", fill: color, fontFamily: "monospace", fontWeight: "bold" };

  switch (type) {
    case 'AND':
      return (
        <>
          <path d="M 5 5 L 25 5 A 15 15 0 0 1 25 35 L 5 35 Z" {...t} />
          <text x="11" y="23" fontSize="10" {...label}>AND</text>
        </>
      );
    case 'OR':
      return (
        <>
          <path d="M 5 5 Q 20 5 40 20 Q 20 35 5 35 Q 12 20 5 5 Z" {...t} />
          <text x="14" y="23" fontSize="10" {...label}>OR</text>
        </>
      );
    case 'NOT':
      return (
        <>
          <polygon points="10,5 35,20 10,35" {...t} />
          <circle cx="40" cy="20" r="4" fill="#0f172a" stroke={color} strokeWidth="2" />
          <text x="12" y="23" fontSize="8" {...label}>NOT</text>
        </>
      );
    case 'NAND':
      return (
        <>
          <path d="M 5 5 L 25 5 A 15 15 0 0 1 25 35 L 5 35 Z" {...t} />
          <circle cx="44" cy="20" r="4" fill="#0f172a" stroke={color} strokeWidth="2" />
          <text x="9" y="23" fontSize="9" {...label}>NAND</text>
        </>
      );
    case 'NOR':
      return (
        <>
          <path d="M 5 5 Q 20 5 38 20 Q 20 35 5 35 Q 12 20 5 5 Z" {...t} />
          <circle cx="46" cy="20" r="4" fill="#0f172a" stroke={color} strokeWidth="2" />
          <text x="11" y="23" fontSize="8" {...label}>NOR</text>
        </>
      );
    default:
      return null;
  }
};

const gateViewBox = (type: GateType) =>
  type === 'NAND' || type === 'NOR' ? '0 0 55 40' : '0 0 50 40';

// Gate positioned inside a circuit SVG canvas.
export const CircuitGate = ({ x, y, type, active }: { x: number; y: number; type: GateType; active: boolean }) => (
  <svg x={x} y={y} viewBox="0 0 50 40" width="50" height="40" overflow="visible">
    <GateContent type={type} color={active ? "#22d3ee" : "#64748b"} />
  </svg>
);

// Standalone gate symbol (for GateModule use).
export const GateSymbol = ({ type, activeOutput }: GateSymbolProps) => {
  const color = activeOutput ? "#22d3ee" : "#64748b";
  return (
    <svg
      viewBox={gateViewBox(type)}
      fill="transparent"
      strokeWidth="2"
      className="mb-3 w-14 h-10 md:w-20 md:h-14 transition-all duration-300 drop-shadow-lg"
    >
      <GateContent type={type} color={color} />
    </svg>
  );
};