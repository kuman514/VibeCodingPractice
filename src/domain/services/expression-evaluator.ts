import { Operator } from "@/domain/models/calculator";

type NumberToken = { kind: "number"; value: number };
type OperatorToken = { kind: "operator"; value: Operator };
type Token = NumberToken | OperatorToken;

export type EvaluationResult =
  | { ok: true; value: number }
  | { ok: false };

const OPERATOR_CHARS = new Set<string>(["+", "-", "*", "/"]);
const NUMBER_CHAR_PATTERN = /[0-9.]/;

function tokenize(expression: string): Token[] | null {
  const tokens: Token[] = [];
  let i = 0;

  while (i < expression.length) {
    const char = expression[i];

    if (OPERATOR_CHARS.has(char)) {
      const previous = tokens[tokens.length - 1];
      const expectsOperand = !previous || previous.kind === "operator";

      if (expectsOperand) {
        let j = i + 1;
        let numberText = char === "-" ? "-" : "";
        while (j < expression.length && NUMBER_CHAR_PATTERN.test(expression[j])) {
          numberText += expression[j];
          j++;
        }
        if (numberText === "" || numberText === "-") return null;
        const value = Number(numberText);
        if (Number.isNaN(value)) return null;
        tokens.push({ kind: "number", value });
        i = j;
      } else {
        tokens.push({ kind: "operator", value: char as Operator });
        i++;
      }
      continue;
    }

    if (NUMBER_CHAR_PATTERN.test(char)) {
      let j = i;
      let numberText = "";
      while (j < expression.length && NUMBER_CHAR_PATTERN.test(expression[j])) {
        numberText += expression[j];
        j++;
      }
      const value = Number(numberText);
      if (Number.isNaN(value)) return null;
      tokens.push({ kind: "number", value });
      i = j;
      continue;
    }

    i++;
  }

  return tokens;
}

function reduceByOperators(tokens: Token[], operators: Operator[]): Token[] | null {
  if (tokens.length === 0 || tokens[0].kind !== "number") return null;

  const reduced: Token[] = [tokens[0]];
  for (let i = 1; i < tokens.length; i += 2) {
    const operatorToken = tokens[i];
    const numberToken = tokens[i + 1];
    if (!operatorToken || operatorToken.kind !== "operator" || !numberToken || numberToken.kind !== "number") {
      return null;
    }

    if (operators.includes(operatorToken.value)) {
      const previous = reduced.pop() as NumberToken;
      let value: number;
      switch (operatorToken.value) {
        case "*":
          value = previous.value * numberToken.value;
          break;
        case "/":
          value = previous.value / numberToken.value;
          break;
        case "+":
          value = previous.value + numberToken.value;
          break;
        case "-":
          value = previous.value - numberToken.value;
          break;
      }
      reduced.push({ kind: "number", value });
    } else {
      reduced.push(operatorToken, numberToken);
    }
  }

  return reduced;
}

function evaluateTokens(tokens: Token[]): number | null {
  const afterMultiplyDivide = reduceByOperators(tokens, ["*", "/"]);
  if (!afterMultiplyDivide) return null;

  const afterAddSubtract = reduceByOperators(afterMultiplyDivide, ["+", "-"]);
  if (!afterAddSubtract || afterAddSubtract.length !== 1) return null;

  return (afterAddSubtract[0] as NumberToken).value;
}

export function evaluateArithmeticExpression(expression: string): EvaluationResult {
  const cleaned = expression.replace(/[+\-*/.]+$/, "");
  if (cleaned === "") return { ok: false };

  const tokens = tokenize(cleaned);
  if (!tokens) return { ok: false };

  const value = evaluateTokens(tokens);
  if (value === null || !Number.isFinite(value)) return { ok: false };

  const rounded = Math.round(value * 1e12) / 1e12;
  return { ok: true, value: rounded };
}

export function formatEvaluationValue(value: number): string {
  return String(value);
}
