import { EffectParticle } from '@/adapters/ui/calculator/fx-generator';

export interface ResultModalProps {
  prevExpression: string;
  result: string;
  particles: EffectParticle[];
  smoke: EffectParticle[];
  onDismiss: () => void;
}

export function ResultModal({
  prevExpression,
  result,
  particles,
  smoke,
  onDismiss,
}: ResultModalProps) {
  return (
    <div
      onClick={onDismiss}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 60,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 24,
        background: 'rgba(5,9,4,.62)',
        animation: 'overlayIn 220ms ease-out',
        cursor: 'pointer',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: '#fff',
          pointerEvents: 'none',
          animation: 'flashFade 460ms ease-out forwards',
        }}
      />
      <div
        style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          width: 0,
          height: 0,
          pointerEvents: 'none',
        }}
      >
        {smoke.map((puff) => (
          <div key={puff.id} style={puff.style} />
        ))}
        {particles.map((particle) => (
          <div key={particle.id} style={particle.style} />
        ))}
      </div>

      <div
        onClick={(event) => event.stopPropagation()}
        style={{
          position: 'relative',
          zIndex: 5,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 20,
          padding: '36px 42px',
          minWidth: 'min(78vw,360px)',
          maxWidth: '90vw',
          background: 'linear-gradient(#171d10,#10140b)',
          border: '6px solid var(--calc-accent, #a3e635)',
          borderRadius: 22,
          boxShadow:
            '12px 12px 0 rgba(0,0,0,.6), 0 0 70px var(--calc-glow, #a3e635)',
          animation: 'bounceIn 760ms cubic-bezier(.2,1.25,.4,1) both',
          cursor: 'default',
        }}
      >
        <div
          style={{
            fontFamily: "'Silkscreen'",
            fontSize: 20,
            letterSpacing: 3,
            color: '#ff3b6b',
            textShadow: '3px 3px 0 #111',
            animation: 'labelPop 500ms 120ms both',
          }}
        >
          ★ 정답 ★
        </div>
        <div
          style={{
            fontFamily: "'Silkscreen'",
            fontSize: 12,
            color: '#7f9a86',
            wordBreak: 'break-all',
            textAlign: 'center',
          }}
        >
          {prevExpression}
        </div>
        <div
          style={{
            fontFamily: "'DSEG7-Classic'",
            fontSize: 'clamp(40px,9vw,78px)',
            lineHeight: 1,
            color: 'var(--calc-accent, #a3e635)',
            textShadow: '0 0 22px var(--calc-glow, #a3e635)',
            wordBreak: 'break-all',
            textAlign: 'center',
          }}
        >
          {result}
        </div>
        <button
          type="button"
          onClick={onDismiss}
          style={{
            fontFamily: "'Silkscreen'",
            fontSize: 14,
            letterSpacing: 1,
            padding: '14px 30px',
            background: 'var(--calc-accent, #a3e635)',
            color: '#102606',
            border: '4px solid #111',
            borderRadius: 14,
            boxShadow: '0 7px 0 #111',
            cursor: 'pointer',
          }}
        >
          계속 (⏎)
        </button>
      </div>
    </div>
  );
}
