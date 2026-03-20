export function deriveTable(inputCount: number, fn: (...args: boolean[]) => boolean): boolean[][] {
  return Array.from({ length: 2 ** inputCount }, (_, i) => {
    const inputs = Array.from(
      { length: inputCount },
      (_, b) => !!(i >> (inputCount - 1 - b) & 1)
    );
    return [...inputs, fn(...inputs)];
  });
}
