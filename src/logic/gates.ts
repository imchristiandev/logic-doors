import type { GateType } from '../types/gate.types';

export const GATE_FN: Record<GateType, (...args: boolean[]) => boolean> = {
  AND:  (a, b) => a && b,
  OR:   (a, b) => a || b,
  NOT:  (a)    => !a,
  NAND: (a, b) => !(a && b),
  NOR:  (a, b) => !(a || b),
};
