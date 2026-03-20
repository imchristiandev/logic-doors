import { useMemo, useState } from 'react';
import type { GateConfig } from '../../types/gate.types';
import { GATE_FN } from '../../logic/gates';
import { deriveTable } from '../../logic/truthTable';
import { ToggleSwitch } from '../ui/ToggleSwitch';
import { Wire } from '../ui/Wire';
import { LogicBadge } from '../ui/LogicBadge';
import { GateSymbol } from '../ui/GateSymbol';
import { TruthTable } from '../ui/TruthTable';
import { Equation } from '../ui/Equation';

const INPUT_LABELS = ['A', 'B', 'C', 'D'];

export const GateModule = ({ config }: { config: GateConfig }) => {
  const { type, inputs: inputCount, equation } = config;

  const [inputs, setInputs] = useState<boolean[]>(Array(inputCount).fill(false));

  const computeFn = GATE_FN[type];
  const table = useMemo(() => deriveTable(inputCount, computeFn), [inputCount, computeFn]);
  const headers = [...INPUT_LABELS.slice(0, inputCount), 'Q'];

  const out = computeFn(...inputs);

  const activeIndex = table.findIndex(row =>
    inputs.every((v, i) => row[i] === v)
  );

  const handleToggle = (index: number, value: boolean) => {
    setInputs(prev => prev.map((v, i) => (i === index ? value : v)));
  };

  const handleRowClick = (row: boolean[]) => {
    setInputs(row.slice(0, inputCount));
  };

  return (
    <div className="flex flex-col md:flex-row items-stretch gap-4 p-4 md:p-5 bg-slate-900/50 border border-slate-800 rounded-xl shadow-lg backdrop-blur-sm transition-all hover:border-slate-700">

      {/* Circuit: Inputs + Gate + Output */}
      <div className="flex flex-1 min-w-0 items-center justify-between pr-4">
        {/* Inputs Section */}
        <div className="flex flex-col justify-center space-y-6">
          {inputs.map((value, i) => (
            <div key={i} className="flex items-center space-x-2">
              <ToggleSwitch label={INPUT_LABELS[i]} checked={value} onChange={v => handleToggle(i, v)} />
              <Wire active={value} width="w-2 md:w-4" />
              <LogicBadge value={value} />
              <Wire active={value} width="w-2 md:w-4" />
            </div>
          ))}
        </div>

        {/* Logic Gate & Equation */}
        <div className="flex flex-col items-center justify-center px-2 md:px-6 pr-4 md:pr-8 relative pb-4">
          <GateSymbol type={type} activeOutput={out} />
          <span className="absolute -bottom-2">
            <Equation lhs={equation.lhs} rhs={equation.rhs} negated={equation.negated} />
          </span>
        </div>

        {/* Output Section */}
        <div className="flex items-center justify-center">
          <Wire active={out} width="w-3 md:w-6" />
          <LogicBadge value={out} />
          <Wire active={out} width="w-2 md:w-4" />
          <div className={`w-3 h-3 rounded-full ml-1 transition-all duration-300 ${
            out ? 'bg-cyan-400 shadow-[0_0_12px_3px_rgba(6,182,212,0.6)]' : 'bg-slate-800 border border-slate-700'
          }`} />
        </div>
      </div>

      {/* Divider */}
      <div className="hidden md:block w-px self-stretch bg-slate-700/50" />

      {/* Interactive Truth Table */}
      <div className="flex-shrink-0 flex items-center justify-center">
        <TruthTable
          headers={headers}
          rows={table}
          activeIndex={activeIndex}
          onRowClick={handleRowClick}
        />
      </div>
    </div>
  );
};
