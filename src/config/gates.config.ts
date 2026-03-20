import type { GateConfig } from '../types/gate.types';

export const GATES_CONFIG: GateConfig[] = [
  { type: 'AND',  inputs: 2, equation: { lhs: 'Q = ', rhs: 'A · B',  negated: false } },
  { type: 'OR',   inputs: 2, equation: { lhs: 'Q = ', rhs: 'A + B',  negated: false } },
  { type: 'NOT',  inputs: 1, equation: { lhs: 'Q = ', rhs: 'A',      negated: true  } },
  { type: 'NAND', inputs: 2, equation: { lhs: 'Q = ', rhs: 'A · B',  negated: true  } },
  { type: 'NOR',  inputs: 2, equation: { lhs: 'Q = ', rhs: 'A + B',  negated: true  } },
];
