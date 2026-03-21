const CYAN = "#22d3ee";
const GLOW = "drop-shadow(0 0 5px rgba(6,182,212,0.7))";

interface InputNodeProps {
  cx: number;
  cy: number;
  active: boolean;
  label: string;
  onClick: () => void;
}

export const InputNode = ({ cx, cy, active, label, onClick }: InputNodeProps) => (
  <g onClick={onClick} style={{ cursor: 'pointer', userSelect: 'none' }}>
    <circle
      cx={cx} cy={cy} r={12}
      fill={active ? "#164e63" : "#1e293b"}
      stroke={active ? CYAN : "#475569"}
      strokeWidth="1.5"
      style={active ? { filter: GLOW, transition: 'all 0.3s' } : { transition: 'all 0.3s' }}
    />
    <text x={cx} y={cy + 4} textAnchor="middle" fontSize={10}
      fill={active ? CYAN : "#94a3b8"} fontFamily="monospace" fontWeight="bold"
      stroke="none" style={{ transition: 'fill 0.3s' }}>
      {active ? '1' : '0'}
    </text>
    <text x={cx - 22} y={cy + 4} textAnchor="middle" fontSize={12}
      fill="#94a3b8" fontFamily="monospace" fontWeight="600" stroke="none">
      {label}
    </text>
  </g>
);

interface OutputNodeProps {
  cx: number;
  cy: number;
  active: boolean;
  label: string;
}

export const OutputNode = ({ cx, cy, active, label }: OutputNodeProps) => (
  <g>
    <circle
      cx={cx} cy={cy} r={8}
      fill={active ? "#164e63" : "#0f172a"}
      stroke={active ? CYAN : "#334155"}
      strokeWidth="1.5"
      style={active
        ? { filter: 'drop-shadow(0 0 8px rgba(6,182,212,0.9))', transition: 'all 0.3s' }
        : { transition: 'all 0.3s' }
      }
    />
    <text x={cx} y={cy + 4} textAnchor="middle" fontSize={9}
      fill={active ? CYAN : "#64748b"} fontFamily="monospace" fontWeight="bold"
      stroke="none" style={{ transition: 'fill 0.3s' }}>
      {active ? '1' : '0'}
    </text>
    <text x={cx + 18} y={cy + 4} textAnchor="middle" fontSize={12}
      fill="#94a3b8" fontFamily="monospace" fontWeight="600" stroke="none">
      {label}
    </text>
  </g>
);
