export type Operator = "+" | "-" | "*" | "/";

export interface CalculatorState {
  expression: string;
  result: string | null;
  prevExpression: string;
  justEvaluated: boolean;
}

export interface CalculatorDisplayLines {
  topLine: string;
  bigLine: string;
  ansText: string;
}

export const createInitialCalculatorState = (): CalculatorState => ({
  expression: "",
  result: null,
  prevExpression: "",
  justEvaluated: false,
});
