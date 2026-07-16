'use client';

import { CSSProperties, useCallback, useEffect, useState } from 'react';

import { CalculatorDisplay } from '@/adapters/ui/calculator/calculator-display';
import { CalculatorKeypad } from '@/adapters/ui/calculator/calculator-keypad';
import '@/adapters/ui/calculator/calculator.css';
import {
  EqualsEffects,
  generateEqualsEffects,
} from '@/adapters/ui/calculator/fx-generator';
import { ResultModal } from '@/adapters/ui/calculator/result-modal';
import {
  CalculatorState,
  Operator,
  createInitialCalculatorState,
} from '@/domain/models/calculator';
import {
  clearCalculator,
  deleteLastCharacter,
  evaluateCalculatorExpression,
  getCalculatorDisplayLines,
  inputDecimalPoint,
  inputDigit,
  inputOperator,
  toggleSign,
} from '@/domain/services/calculator-engine';

const ACCENT_COLOR = '#a3e635';
const GLOW_COLOR = '#a3e635';
const BUTTON_RADIUS = '12px';
const FX_INTENSITY = 1;

type CSSPropertiesWithVars = CSSProperties & Record<`--${string}`, string>;

const rootStyle: CSSPropertiesWithVars = {
  position: 'relative',
  width: '100%',
  minHeight: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: 20,
  overflow: 'hidden',
  background: 'radial-gradient(circle at 50% -10%, #1b2a12 0%, #0b0e0a 62%)',
  backgroundColor: '#0b0e0a',
  fontFamily: "'Silkscreen', monospace",
  '--calc-accent': ACCENT_COLOR,
  '--calc-glow': GLOW_COLOR,
  '--calc-button-radius': BUTTON_RADIUS,
};

export function CalculatorApp() {
  const [state, setState] = useState<CalculatorState>(
    createInitialCalculatorState,
  );
  const [effects, setEffects] = useState<EqualsEffects | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);

  const dismissModal = useCallback(() => setShowModal(false), []);

  const handleEquals = useCallback(() => {
    setState((prev) => {
      if (prev.expression === '') {
        return prev;
      }
      const next = evaluateCalculatorExpression(prev);
      setEffects(generateEqualsEffects(FX_INTENSITY));
      setShowModal(true);
      return next;
    });
  }, []);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (showModal) {
        if (
          event.key === 'Enter' ||
          event.key === 'Escape' ||
          event.key === ' '
        ) {
          event.preventDefault();
          dismissModal();
        }
        return;
      }

      if (/^[0-9]$/.test(event.key)) {
        setState((prev) => inputDigit(prev, event.key));
      } else {
        switch (event.key) {
          case '.':
            setState((prev) => inputDecimalPoint(prev));
            break;
          case '+':
          case '-':
          case '*':
          case '/':
            setState((prev) => inputOperator(prev, event.key as Operator));
            break;
          case 'Enter':
          case '=':
            event.preventDefault();
            handleEquals();
            break;
          case 'Backspace':
            event.preventDefault();
            setState((prev) => deleteLastCharacter(prev));
            break;
          case 'Escape':
          case 'c':
          case 'C':
            setState(clearCalculator());
            break;
        }
      }
    }

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [showModal, dismissModal, handleEquals]);

  const displayLines = getCalculatorDisplayLines(state);

  return (
    <div style={rootStyle}>
      <div
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          backgroundImage:
            'linear-gradient(rgba(163,230,53,.055) 1px, transparent 1px), linear-gradient(90deg, rgba(163,230,53,.055) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          background:
            'radial-gradient(circle at 50% 45%, transparent 55%, rgba(0,0,0,.55) 100%)',
        }}
      />

      <div
        style={{
          position: 'relative',
          zIndex: 1,
          width: 'min(80vw, calc(80vh * 2 / 3))',
          aspectRatio: '2 / 3',
          containerType: 'size',
          display: 'flex',
          flexDirection: 'column',
          gap: '3cqw',
          padding: '4.5cqw',
          background: 'linear-gradient(#1a2013, #12160d)',
          border: 'max(4px,1.6cqw) solid var(--calc-accent, #a3e635)',
          borderRadius: '6cqw',
          boxShadow:
            'max(8px,2.4cqw) max(8px,2.4cqw) 0 rgba(0,0,0,.6), 0 0 9cqw rgba(163,230,53,.28)',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontSize: '3.6cqw',
            letterSpacing: '.4cqw',
            color: 'var(--calc-accent, #a3e635)',
            textShadow: '0 0 2cqw var(--calc-glow, #a3e635)',
          }}
        >
          <span>▤ GREEN·CALC</span>
          <span style={{ display: 'flex', gap: '1.4cqw' }}>
            <span
              style={{
                width: '2.6cqw',
                height: '2.6cqw',
                borderRadius: '50%',
                background: '#ff3b6b',
                boxShadow: '0 0 2cqw #ff3b6b',
              }}
            />
            <span
              style={{
                width: '2.6cqw',
                height: '2.6cqw',
                borderRadius: '50%',
                background: '#ffd23f',
                boxShadow: '0 0 2cqw #ffd23f',
              }}
            />
            <span
              style={{
                width: '2.6cqw',
                height: '2.6cqw',
                borderRadius: '50%',
                background: 'var(--calc-accent, #a3e635)',
                boxShadow: '0 0 2cqw var(--calc-glow, #a3e635)',
              }}
            />
          </span>
        </div>

        <CalculatorDisplay {...displayLines} />

        <CalculatorKeypad
          onDigit={(digit) => setState((prev) => inputDigit(prev, digit))}
          onDot={() => setState((prev) => inputDecimalPoint(prev))}
          onOperator={(operator) =>
            setState((prev) => inputOperator(prev, operator))
          }
          onToggleSign={() => setState((prev) => toggleSign(prev))}
          onBackspace={() => setState((prev) => deleteLastCharacter(prev))}
          onClear={() => setState(clearCalculator())}
          onEquals={handleEquals}
        />
      </div>

      {showModal && effects && state.result !== null && (
        <ResultModal
          prevExpression={state.prevExpression}
          result={state.result}
          particles={effects.particles}
          smoke={effects.smoke}
          onDismiss={dismissModal}
        />
      )}
    </div>
  );
}
