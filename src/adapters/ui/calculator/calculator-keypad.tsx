import { CSSProperties } from "react";
import { Operator } from "@/domain/models/calculator";

export interface CalculatorKeypadProps {
  onDigit: (digit: string) => void;
  onDot: () => void;
  onOperator: (operator: Operator) => void;
  onToggleSign: () => void;
  onBackspace: () => void;
  onClear: () => void;
  onEquals: () => void;
}

interface KeyDefinition {
  id: string;
  label: string;
  bg: string;
  fg: string;
  span?: number;
  isEquals?: boolean;
  onClick: () => void;
}

export function CalculatorKeypad({
  onDigit,
  onDot,
  onOperator,
  onToggleSign,
  onBackspace,
  onClear,
  onEquals,
}: CalculatorKeypadProps) {
  const numberKey = (digit: string): KeyDefinition => ({
    id: `digit-${digit}`,
    label: digit,
    bg: "#f4ead0",
    fg: "#141414",
    onClick: () => onDigit(digit),
  });

  const keys: KeyDefinition[] = [
    { id: "clear", label: "AC", bg: "#ff3b6b", fg: "#fff", onClick: onClear },
    { id: "sign", label: "±", bg: "#22c2a6", fg: "#052620", onClick: onToggleSign },
    { id: "backspace", label: "⌫", bg: "#22c2a6", fg: "#052620", onClick: onBackspace },
    { id: "divide", label: "÷", bg: "#ff7a29", fg: "#2a1204", onClick: () => onOperator("/") },
    numberKey("7"),
    numberKey("8"),
    numberKey("9"),
    { id: "multiply", label: "×", bg: "#ff7a29", fg: "#2a1204", onClick: () => onOperator("*") },
    numberKey("4"),
    numberKey("5"),
    numberKey("6"),
    { id: "subtract", label: "−", bg: "#ff7a29", fg: "#2a1204", onClick: () => onOperator("-") },
    numberKey("1"),
    numberKey("2"),
    numberKey("3"),
    { id: "add", label: "+", bg: "#ff7a29", fg: "#2a1204", onClick: () => onOperator("+") },
    { id: "digit-0", label: "0", bg: "#f4ead0", fg: "#141414", span: 2, onClick: () => onDigit("0") },
    { id: "dot", label: ".", bg: "#f4ead0", fg: "#141414", onClick: onDot },
    { id: "equals", label: "=", bg: "var(--calc-accent, #a3e635)", fg: "#10230a", isEquals: true, onClick: onEquals },
  ];

  return (
    <div
      style={{
        flex: 1,
        display: "grid",
        gridTemplateColumns: "repeat(4,1fr)",
        gridTemplateRows: "repeat(5,1fr)",
        gap: "2.8cqw",
      }}
    >
      {keys.map((key) => {
        const style: CSSProperties = {
          fontFamily: "'Silkscreen', monospace",
          fontWeight: 700,
          fontSize: key.isEquals ? "12cqw" : "9cqw",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          border: "max(3px,1cqw) solid #111",
          borderRadius: "var(--calc-button-radius, 12px)",
          boxShadow: "0 max(4px,1.4cqw) 0 #111",
          cursor: "pointer",
          color: key.fg,
          background: key.bg,
          userSelect: "none",
          gridColumn: key.span ? `span ${key.span}` : "auto",
          animation: key.isEquals ? "eqPulse 1.6s ease-in-out infinite" : undefined,
        };

        return (
          <button key={key.id} type="button" className="calculator-key" style={style} onClick={key.onClick}>
            {key.label}
          </button>
        );
      })}
    </div>
  );
}
