import { CalculatorDisplayLines } from "@/domain/models/calculator";

export function CalculatorDisplay({ topLine, bigLine, ansText }: CalculatorDisplayLines) {
  return (
    <div
      style={{
        position: "relative",
        flex: "0 0 23%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "flex-end",
        gap: "1.4cqw",
        padding: "3cqw 4cqw",
        background: "#07120a",
        border: "max(3px,1cqw) solid #073d13",
        borderRadius: "3.5cqw",
        boxShadow: "inset 0 0 7cqw rgba(0,0,0,.85), inset 0 0 1cqw rgba(163,230,53,.15)",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          fontSize: "2.9cqw",
          letterSpacing: ".3cqw",
          color: "#3f7a2c",
          minHeight: "3cqw",
          whiteSpace: "nowrap",
          overflow: "hidden",
        }}
      >
        {ansText}
      </div>
      <div
        style={{
          width: "100%",
          fontSize: "4.4cqw",
          color: "#6fae3d",
          whiteSpace: "nowrap",
          overflow: "hidden",
          textAlign: "right",
        }}
      >
        {topLine}
      </div>
      <div
        style={{
          width: "100%",
          height: "15cqw",
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            fontFamily: "'DSEG7 Classic'",
            fontSize: "14cqw",
            lineHeight: 1,
            color: "var(--calc-accent, #a3e635)",
            textShadow: "0 0 3.5cqw var(--calc-glow, #a3e635)",
            whiteSpace: "nowrap",
          }}
        >
          {bigLine}
        </div>
      </div>
    </div>
  );
}
