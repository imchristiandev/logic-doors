import { useState } from 'react';
import { ToggleSwitch } from './ui/ToggleSwitch';
import { Wire } from './ui/Wire';
import { LogicBadge } from './ui/LogicBadge';
import { GateSymbol } from './ui/GateSymbol';
import { TruthTable } from './ui/TruthTable';

export interface StandardGateModuleProps {
    type: 'AND' | 'OR' | 'NOT' | 'NAND' | 'NOR';
    inputs: number;
    equation: string;
    headers: string[];
    truthTable: boolean[][];
    compute: (...args: boolean[]) => boolean;
}

export const StandardGateModule = ({ config }: { config: StandardGateModuleProps }) => {
  const { inputs: inputCount, type, equation, headers, truthTable, compute } = config;
  const [inA, setInA] = useState(false);
  const [inB, setInB] = useState(false);

  const out = inputCount === 1 ? compute(inA) : compute(inA, inB);
  
  const activeIndex = inputCount === 1 
    ? truthTable.findIndex(r => r[0] === inA)
    : truthTable.findIndex(r => r[0] === inA && r[1] === inB);

  const handleRowClick = (row: boolean[]) => {
    setInA(row[0]);
    if (inputCount === 2) setInB(row[1]);
  };

  return (
    <div className="flex flex-col md:flex-row items-stretch gap-4 p-4 md:p-5 bg-slate-900/50 border border-slate-800 rounded-xl shadow-lg backdrop-blur-sm transition-all hover:border-slate-700">

      {/* Circuit: Inputs + Gate + Output */}
      <div className="flex flex-1 min-w-0 items-center justify-between pr-4">
        {/* Inputs Section */}
        <div className="flex flex-col justify-center space-y-6">
          <div className="flex items-center space-x-2">
            <ToggleSwitch label="A" checked={inA} onChange={setInA} />
            <Wire active={inA} width="w-2 md:w-4" />
            <LogicBadge value={inA} />
            <Wire active={inA} width="w-2 md:w-4" />
          </div>

          {inputCount === 2 && (
            <div className="flex items-center space-x-2">
              <ToggleSwitch label="B" checked={inB} onChange={setInB} />
              <Wire active={inB} width="w-2 md:w-4" />
              <LogicBadge value={inB} />
              <Wire active={inB} width="w-2 md:w-4" />
            </div>
          )}
        </div>

        {/* Logic Gate & Equation */}
        <div className="flex flex-col items-center justify-center px-2 md:px-6 pr-4 md:pr-8 relative pb-4">
          <GateSymbol type={type} activeOutput={out} />
          <span
            className="absolute -bottom-2 whitespace-nowrap font-mono text-xs text-slate-400 bg-slate-900 px-2 rounded"
            dangerouslySetInnerHTML={{ __html: equation }}
          />
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
          rows={truthTable}
          activeIndex={activeIndex}
          onRowClick={handleRowClick}
        />
      </div>
    </div>
  );
};