interface TruthTableProps {
    headers: string[];
    rows: boolean[][];
    activeIndex: number;
    onRowClick: (row: boolean[]) => void;
}

export const TruthTable = ({ headers, rows, activeIndex, onRowClick }: TruthTableProps) => (
  <div className="w-full overflow-hidden rounded-lg border border-slate-700 bg-slate-800/50">
    <table className="w-full border-collapse font-mono text-sm text-slate-300">
      <thead>
        <tr className="bg-slate-800 border-b border-slate-700">
          {headers.map((h, i) => (
            <th key={i} className="px-3 py-2 font-medium text-slate-400">{h}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, rIdx) => {
          const isActive = rIdx === activeIndex;
          return (
            <tr 
              key={rIdx} 
              onClick={() => onRowClick(row)}
              className={`cursor-pointer transition-colors duration-200 border-b border-slate-700/50 last:border-0 hover:bg-slate-700/50 ${
                isActive ? 'bg-cyan-900/30' : ''
              }`}
            >
              {row.map((val, cIdx) => (
                <td key={cIdx} className={`px-3 py-1.5 text-center ${
                  cIdx === row.length - 1 
                    ? (isActive ? 'text-cyan-400 font-bold drop-shadow-[0_0_5px_rgba(6,182,212,0.8)]' : 'text-slate-300 font-semibold')
                    : ''
                }`}>
                  {val ? '1' : '0'}
                </td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  </div>
);