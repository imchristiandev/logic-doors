import { GATES_CONFIG } from "./config/gates.config";
import { GateModule } from "./components/GateModule";
import { MuxCircuit } from "./components/CircuitDiagram/MuxCircuit";

function App() {
  return (
    <main className="min-h-screen bg-[#0b1120] p-4 md:p-8 font-sans flex flex-col items-center">
      <div className="max-w-6xl w-full">
        {/* Header */}
        <header className="mb-10 text-center space-y-2">
          <h1 className="text-3xl font-bold text-slate-200 tracking-tight">
            Logic gates{" "}
            <span className="text-cyan-400 font-mono">v1.0</span>
          </h1>
          <p className="text-slate-500 font-mono text-sm">
            Interactive Digital Logic Gates &bull; Click Truth Tables to Set
            Inputs
          </p>
        </header>

        {/* Gates Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {GATES_CONFIG.map((config, idx) => (
            <GateModule key={idx} config={config} />
          ))}
        </div>

        {/* Circuit Schema */}
        <div className="mt-8">
          <h2 className="text-xl font-bold text-slate-200 tracking-tight mb-4">
            Circuit Schema{" "}
            <span className="text-cyan-400 font-mono text-base">example</span>
          </h2>
          <MuxCircuit />
        </div>
      </div>

      <footer className="mt-12 text-center text-slate-600 font-mono text-xs space-y-1">
        <p className="text-slate-500">Developers</p>
        <p>Christian David Ramírez Bolívar</p>
        <p>Jose David Salamanca Tobar</p>
        <p>Jenny Alexandra Oliva Vallejos</p>
        <p>Laura Valentina Ñustes Contento</p>
      </footer>
    </main>
  );
}

export default App;
