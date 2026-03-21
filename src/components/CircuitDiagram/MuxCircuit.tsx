import { useMemo, useState } from 'react';
import { TruthTable } from '../ui/TruthTable';
import { CircuitWire } from '../ui/CircuitWire';
import { InputNode, OutputNode } from '../ui/CircuitNode';
import { CircuitGate } from '../ui/GateSymbol';
import { computeMux, MUX_ROWS } from '../../logic/circuits';

// ── Layout: gate top-left corners ─────────────────────────────────────────────
const NX = 120,  NY = 210;   // NOT
const A1X = 240, A1Y = 60;   // AND1
const A2X = 240, A2Y = 160;  // AND2
const OX = 370,  OY = 120;   // OR

// ── Layout: input node centers ────────────────────────────────────────────────
const IA = { x: 40, y: 73  };
const IB = { x: 40, y: 173 };
const IS = { x: 40, y: 230 };

// ── Layout: gate connector points (from viewBox geometry) ─────────────────────
//   AND: inputs (gx+5, gy+13) & (gx+5, gy+27), output (gx+40, gy+20)
//   NOT: input  (gx+10, gy+20),                 output (gx+44, gy+20)
//   OR:  inputs (gx+8, gy+13) & (gx+8, gy+27), output (gx+40, gy+20)
const notIn  = { x: NX  + 10, y: NY  + 20 };
const notOut = { x: NX  + 44, y: NY  + 20 };
const a1TIn  = { x: A1X + 5,  y: A1Y + 13 };
const a1BIn  = { x: A1X + 5,  y: A1Y + 27 };
const a1Out  = { x: A1X + 40, y: A1Y + 20 };
const a2TIn  = { x: A2X + 5,  y: A2Y + 13 };
const a2BIn  = { x: A2X + 5,  y: A2Y + 27 };
const a2Out  = { x: A2X + 40, y: A2Y + 20 };
const orTIn  = { x: OX  + 8,  y: OY  + 13 };
const orBIn  = { x: OX  + 8,  y: OY  + 27 };
const orOut  = { x: OX  + 40, y: OY  + 20 };

const QX   = 500;
const S_JX = 90;   // x where the S wire forks toward NOT and AND2

// ── Signal label (circuit-specific text tag) ──────────────────────────────────
const SigLabel = ({ x, y, active, children }: { x: number; y: number; active: boolean; children: string }) => (
  <text x={x} y={y} fontSize={9} fill={active ? "#22d3ee" : "#475569"}
    fontFamily="monospace" stroke="none" style={{ transition: 'fill 0.3s' }}>
    {children}
  </text>
);

// ── Component ─────────────────────────────────────────────────────────────────

export const MuxCircuit = () => {
  const [a, setA] = useState(false);
  const [b, setB] = useState(false);
  const [s, setS] = useState(false);

  const { sNot, and1, and2, q } = computeMux(a, b, s);

  const activeIndex = useMemo(
    () => MUX_ROWS.findIndex(r => r[0] === a && r[1] === b && r[2] === s),
    [a, b, s],
  );

  const handleRowClick = (row: boolean[]) => {
    setA(row[0]); setB(row[1]); setS(row[2]);
  };

  return (
    <div className="flex flex-col md:flex-row items-stretch gap-4 p-4 md:p-5 bg-slate-900/50 border border-slate-800 rounded-xl shadow-lg backdrop-blur-sm transition-all hover:border-slate-700">

      {/* Circuit */}
      <div className="flex-1 min-w-0">
        <div className="mb-3 flex items-center gap-3">
          <span className="text-slate-300 font-mono font-semibold text-sm">MUX 2→1</span>
          <span className="text-slate-500 font-mono text-xs">Q = (A · S̄) + (B · S)</span>
          <div className={`ml-auto w-2.5 h-2.5 rounded-full transition-all duration-300 ${
            q ? 'bg-cyan-400 shadow-[0_0_10px_rgba(6,182,212,0.8)]' : 'bg-slate-700 border border-slate-600'
          }`} />
        </div>

        <div className="overflow-x-auto">
          <svg viewBox="0 0 530 270" className="w-full" style={{ minWidth: '360px', maxHeight: '270px' }}>

            {/* Wires */}
            <CircuitWire d={`M ${IA.x},${IA.y} H ${a1TIn.x}`}                        active={a}    />
            <CircuitWire d={`M ${IB.x},${IB.y} H ${a2TIn.x}`}                        active={b}    />
            <CircuitWire d={`M ${IS.x},${IS.y} H ${notIn.x}`}                         active={s}    />
            <CircuitWire d={`M ${S_JX},${IS.y} V ${a2BIn.y} H ${a2BIn.x}`}           active={s}    />
            <CircuitWire d={`M ${notOut.x},${notOut.y} H 210 V ${a1BIn.y} H ${a1BIn.x}`} active={sNot} />
            <CircuitWire d={`M ${a1Out.x},${a1Out.y} H 345 V ${orTIn.y} H ${orTIn.x}`}  active={and1} />
            <CircuitWire d={`M ${a2Out.x},${a2Out.y} H 345 V ${orBIn.y} H ${orBIn.x}`}  active={and2} />
            <CircuitWire d={`M ${orOut.x},${orOut.y} H ${QX - 8}`}                   active={q}    />

            {/* S junction dot */}
            <circle cx={S_JX} cy={IS.y} r={3}
              fill={s ? "#22d3ee" : "#334155"}
              style={{ transition: 'fill 0.3s' }}
            />

            {/* Gates */}
            <CircuitGate x={NX}  y={NY}  type="NOT" active={sNot} />
            <CircuitGate x={A1X} y={A1Y} type="AND" active={and1} />
            <CircuitGate x={A2X} y={A2Y} type="AND" active={and2} />
            <CircuitGate x={OX}  y={OY}  type="OR"  active={q}    />

            {/* Inputs */}
            <InputNode cx={IA.x} cy={IA.y} active={a} label="A" onClick={() => setA(!a)} />
            <InputNode cx={IB.x} cy={IB.y} active={b} label="B" onClick={() => setB(!b)} />
            <InputNode cx={IS.x} cy={IS.y} active={s} label="S" onClick={() => setS(!s)} />

            {/* Output */}
            <OutputNode cx={QX} cy={orOut.y} active={q} label="Q" />

            {/* Signal labels */}
            <SigLabel x={notOut.x + 8} y={notOut.y - 8}  active={sNot}>S'</SigLabel>
            <SigLabel x={a1Out.x + 5}  y={a1Out.y - 6}   active={and1}>A·S'</SigLabel>
            <SigLabel x={a2Out.x + 5}  y={a2Out.y + 14}  active={and2}>B·S</SigLabel>
          </svg>
        </div>
      </div>

      {/* Divider */}
      <div className="hidden md:block w-px self-stretch bg-slate-700/50" />

      {/* Truth Table */}
      <div className="flex-shrink-0 flex items-center justify-center">
        <TruthTable
          headers={['A', 'B', 'S', 'Q']}
          rows={MUX_ROWS}
          activeIndex={activeIndex}
          onRowClick={handleRowClick}
        />
      </div>
    </div>
  );
};
