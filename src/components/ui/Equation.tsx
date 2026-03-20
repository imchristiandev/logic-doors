interface EquationProps {
  lhs: string;
  rhs: string;
  negated?: boolean;
}

export const Equation = ({ lhs, rhs, negated = false }: EquationProps) => (
  <span className="font-mono text-xs text-slate-400">
    {lhs}
    {negated
      ? <span style={{ textDecoration: 'overline' }}>{rhs}</span>
      : rhs
    }
  </span>
);
