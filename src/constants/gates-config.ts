import type { StandardGateModuleProps } from '../components/StandardGateModule';

export const GATES_CONFIG: StandardGateModuleProps[] = [
  {
    type: 'AND',
    inputs: 2,
    equation: 'Q = A &middot; B',
    headers: ['A', 'B', 'Q'],
    compute: (a: boolean, b: boolean) => a && b,
    truthTable: [[false, false, false], [false, true, false], [true, false, false], [true, true, true]]
  },
  {
    type: 'OR',
    inputs: 2,
    equation: 'Q = A + B',
    headers: ['A', 'B', 'Q'],
    compute: (a: boolean, b: boolean) => a || b,
    truthTable: [[false, false, false], [false, true, true], [true, false, true], [true, true, true]]
  },
  {
    type: 'NOT',
    inputs: 1,
    equation: 'Q = <span style="text-decoration: overline">A</span>',
    headers: ['A', 'Q'],
    compute: (a: boolean) => !a,
    truthTable: [[false, true], [true, false]]
  },
  {
    type: 'NAND',
    inputs: 2,
    equation: 'Q = <span style="text-decoration: overline">A &middot; B</span>',
    headers: ['A', 'B', 'Q'],
    compute: (a: boolean, b: boolean) => !(a && b),
    truthTable: [[false, false, true], [false, true, true], [true, false, true], [true, true, false]]
  },
  {
    type: 'NOR',
    inputs: 2,
    equation: 'Q = <span style="text-decoration: overline">A + B</span>',
    headers: ['A', 'B', 'Q'],
    compute: (a: boolean, b: boolean) => !(a || b),
    truthTable: [[false, false, true], [false, true, false], [true, false, false], [true, true, false]]
  }
];