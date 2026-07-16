import {
  CalculatorDisplayLines,
  CalculatorState,
  Operator,
  createInitialCalculatorState,
} from '@/domain/models/calculator';
import {
  evaluateArithmeticExpression,
  formatEvaluationValue,
} from '@/domain/services/expression-evaluator';

const OPERATOR_CHARS = new Set<string>(['+', '-', '*', '/']);

function isOperatorChar(char: string | undefined): char is Operator {
  return char !== undefined && OPERATOR_CHARS.has(char);
}

export function getCurrentNumberSegment(expression: string): string {
  let i = expression.length;
  while (i > 0 && /[0-9.]/.test(expression[i - 1])) {
    i--;
  }
  const digits = expression.slice(i);

  if (i > 0 && expression[i - 1] === '-') {
    const before = expression[i - 2];
    const isSign = i - 1 === 0 || isOperatorChar(before);
    if (isSign) {
      return '-' + digits;
    }
  }

  return digits;
}

export function formatExpressionForDisplay(expression: string): string {
  return expression
    .replace(/([+\-*/])/g, ' $1 ')
    .replace(/\*/g, '×')
    .replace(/\//g, '÷')
    .replace(/-/g, '−')
    .replace(/\s+/g, ' ')
    .trim();
}

export function inputDigit(
  state: CalculatorState,
  digit: string,
): CalculatorState {
  let expression = state.justEvaluated ? '' : state.expression;
  const currentSegment = getCurrentNumberSegment(expression);
  if (currentSegment === '0') {
    expression = expression.slice(0, -1) + digit;
  } else {
    expression += digit;
  }
  return { ...state, expression, justEvaluated: false };
}

export function inputDecimalPoint(state: CalculatorState): CalculatorState {
  const expression = state.justEvaluated ? '' : state.expression;
  const currentSegment = getCurrentNumberSegment(expression);
  if (currentSegment.includes('.')) {
    return { ...state, expression, justEvaluated: false };
  }
  const suffix = currentSegment === '' || currentSegment === '-' ? '0.' : '.';
  return { ...state, expression: expression + suffix, justEvaluated: false };
}

export function inputOperator(
  state: CalculatorState,
  operator: Operator,
): CalculatorState {
  let expression = state.expression;

  if (expression === '') {
    if (operator === '-') {
      return { ...state, expression: '-', justEvaluated: false };
    }
    expression = '0';
  }

  const lastChar = expression[expression.length - 1];
  expression = isOperatorChar(lastChar)
    ? expression.slice(0, -1) + operator
    : expression + operator;

  return { ...state, expression, justEvaluated: false };
}

export function toggleSign(state: CalculatorState): CalculatorState {
  const expression = state.expression;
  const segment = getCurrentNumberSegment(expression);
  const prefix = expression.slice(0, expression.length - segment.length);

  let next: string;
  if (segment === '' || segment === '-') {
    next = expression + '-';
  } else if (segment.startsWith('-')) {
    next = prefix + segment.slice(1);
  } else {
    next = prefix + '-' + segment;
  }

  return { ...state, expression: next, justEvaluated: false };
}

export function deleteLastCharacter(state: CalculatorState): CalculatorState {
  if (state.justEvaluated) {
    return createInitialCalculatorState();
  }
  return {
    ...state,
    expression: state.expression.slice(0, -1),
    justEvaluated: false,
  };
}

export function clearCalculator(): CalculatorState {
  return createInitialCalculatorState();
}

export function evaluateCalculatorExpression(
  state: CalculatorState,
): CalculatorState {
  if (state.expression === '') {
    return state;
  }

  const evaluation = evaluateArithmeticExpression(state.expression);
  const resultText = evaluation.ok
    ? formatEvaluationValue(evaluation.value)
    : 'Error';

  return {
    expression: evaluation.ok ? resultText : '',
    result: resultText,
    prevExpression: `${formatExpressionForDisplay(state.expression)} =`,
    justEvaluated: true,
  };
}

export function getCalculatorDisplayLines(
  state: CalculatorState,
): CalculatorDisplayLines {
  const topLine = state.justEvaluated
    ? state.prevExpression
    : formatExpressionForDisplay(state.expression) || ' ';

  const segment = getCurrentNumberSegment(state.expression);
  const bigLine = state.justEvaluated
    ? (state.result ?? '0')
    : segment && segment !== '-'
      ? segment
      : '0';

  const ansText = state.result !== null ? `ANS = ${state.result}` : ' ';

  return { topLine, bigLine, ansText };
}
