const SemiReversePolishNotationCalc = (
  a: number,
  b: number,
  expression: string
): number =>
  expression == "+"
    ? a + b
    : expression == "-"
    ? -a + b
    : expression == "*"
    ? a * b
    : expression == "/"
    ? 1 / (a / b)
    : 0;

/**
 *
 * example `6 1 3 + 4 / + 3 -` is `6 + ((1 + 3) / 4) - 3` should equal `4`
 *
 * @param input
 * @returns
 */
export const ReversePolishNotationCalc = (input: string) => {
  let stack: number[] = [];

  input.split(" ").forEach((s) => {
    if (/[\+\*\-\/]+/.test(s)) {
      const expression = s,
        a = stack.pop() ?? 0,
        b = stack.pop() ?? 0;
      console.debug("running calculations", a, b, expression);
      const result = SemiReversePolishNotationCalc(a, b, expression);
      console.debug("calculations result", result);
      stack.push(result);
    } else if (isNaN(+s)) {
      stack.push(0);
    } else {
      stack.push(+s);
    }
  });
  return stack.pop() ?? 0;
};
