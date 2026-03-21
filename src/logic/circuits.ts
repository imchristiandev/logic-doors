import { deriveTable } from './truthTable';

export const computeMux = (a: boolean, b: boolean, s: boolean) => {
  const sNot = !s;
  const and1 = a && sNot;
  const and2 = b && s;
  return { sNot, and1, and2, q: and1 || and2 };
};

export const MUX_ROWS = deriveTable(3, (...i) => (i[0] && !i[2]) || (i[1] && i[2]));
