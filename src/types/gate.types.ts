export type GateType = 'AND' | 'OR' | 'NOT' | 'NAND' | 'NOR';

export interface GateEquation {
  lhs: string;
  rhs: string;
  negated: boolean;
}

export interface GateConfig {
  type: GateType;
  inputs: number;
  equation: GateEquation;
}
