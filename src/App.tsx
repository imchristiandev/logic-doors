import { GATES_CONFIG } from "./constants/gates-config";
import { StandardGateModule } from "./components/StandardGateModule";

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
            <StandardGateModule key={idx} config={config} />
          ))}
        </div>
      </div>
    </main>
  );
}

export default App;
