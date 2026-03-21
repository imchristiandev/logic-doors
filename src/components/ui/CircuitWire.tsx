interface CircuitWireProps {
  d: string;
  active: boolean;
}

const ACTIVE_COLOR   = "#22d3ee";
const INACTIVE_COLOR = "#334155";
const ACTIVE_FILTER  = "drop-shadow(0 0 5px rgba(6,182,212,0.7))";

export const CircuitWire = ({ d, active }: CircuitWireProps) => (
  <path
    d={d}
    stroke={active ? ACTIVE_COLOR : INACTIVE_COLOR}
    strokeWidth="2"
    fill="none"
    style={active
      ? { filter: ACTIVE_FILTER, transition: 'stroke 0.3s' }
      : { transition: 'stroke 0.3s' }
    }
  />
);
