# Logic Gates

An interactive digital logic gates explorer built with React, TypeScript, and Tailwind CSS. Toggle inputs, click truth table rows, and see the circuit respond in real time.

## Features

- Interactive circuit visualization per gate (inputs → gate symbol → output)
- Clickable truth tables — click any row to set inputs instantly
- Glowing cyan visual feedback for active signals
- Truth tables are **derived at runtime** from pure logic functions — never hardcoded

## Gates included

| Gate | Inputs | Expression |
|------|--------|------------|
| AND  | 2      | Q = A · B  |
| OR   | 2      | Q = A + B  |
| NOT  | 1      | Q = Ā      |
| NAND | 2      | Q = A · B̄  |
| NOR  | 2      | Q = A + B̄  |

## Tech stack

- **React 19** + **TypeScript**
- **Vite** — dev server and build
- **Tailwind CSS** — styling

## Getting started

```bash
npm install
npm run dev
```

Other scripts:

```bash
npm run build    # type-check + production build
npm run preview  # serve the production build locally
npm run lint     # run ESLint
```

## Project structure

```
src/
  types/
    gate.types.ts          # GateType, GateConfig, GateEquation — single source of truth
  logic/
    gates.ts               # Pure compute functions for each gate (GATE_FN record)
    truthTable.ts          # deriveTable() — generates truth table from a compute function
  config/
    gates.config.ts        # Gate definitions: type, input count, equation metadata
  components/
    GateModule/
      index.tsx            # Main gate card — dynamic N-input state, derives table via useMemo
    ui/
      GateSymbol.tsx       # SVG gate symbol, color-coded by output state
      TruthTable.tsx       # Interactive table with active-row highlight
      Equation.tsx         # Renders boolean equations with optional overline (negation)
      Wire.tsx             # Animated wire segment
      LogicBadge.tsx       # 0/1 badge with glow
      ToggleSwitch.tsx     # Styled boolean toggle
  App.tsx
  main.tsx
```

### Dependency flow

```
types/  ←  logic/  ←  config/  ←  components/  ←  App
```

Config and logic layers never import from components.

## Adding a new gate

1. Add the gate type to `GateType` in [src/types/gate.types.ts](src/types/gate.types.ts).
2. Add its compute function to `GATE_FN` in [src/logic/gates.ts](src/logic/gates.ts).
3. Add its SVG symbol case to [src/components/ui/GateSymbol.tsx](src/components/ui/GateSymbol.tsx).
4. Add an entry to `GATES_CONFIG` in [src/config/gates.config.ts](src/config/gates.config.ts).

No changes to `GateModule` or `App` are needed — the truth table is derived automatically.
