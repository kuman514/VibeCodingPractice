import type { CSSProperties } from "react";

type CSSPropertiesWithVars = CSSProperties & Record<`--${string}`, string | number>;

export interface EffectParticle {
  id: string;
  style: CSSPropertiesWithVars;
}

export interface EqualsEffects {
  particles: EffectParticle[];
  smoke: EffectParticle[];
}

const PARTICLE_COLORS = ["#ff5c38", "#ffd23f", "#22d3aa", "#ff3b6b", "#a3e635", "#ffffff", "#7cf3ff"];

export function generateEqualsEffects(intensity = 1): EqualsEffects {
  const particleCount = Math.max(6, Math.round(32 * intensity));
  const smokeCount = Math.max(3, Math.round(11 * intensity));

  const particles: EffectParticle[] = Array.from({ length: particleCount }, (_, i) => {
    const angle = Math.random() * Math.PI * 2;
    const distance = 100 + Math.random() * 240;
    const tx = Math.cos(angle) * distance;
    const ty = Math.sin(angle) * distance - 30;
    const size = 8 + Math.random() * 22;
    const shapeRoll = Math.random();
    const borderRadius = shapeRoll < 0.34 ? "50%" : shapeRoll < 0.67 ? "2px" : "3px";

    return {
      id: `p${i}`,
      style: {
        position: "absolute",
        left: "50%",
        top: "50%",
        width: `${size}px`,
        height: `${size}px`,
        background: PARTICLE_COLORS[i % PARTICLE_COLORS.length],
        border: "2px solid #111",
        borderRadius,
        "--tx": `${tx.toFixed(0)}px`,
        "--ty": `${ty.toFixed(0)}px`,
        "--rot": `${(Math.random() * 900 - 450).toFixed(0)}deg`,
        opacity: 0,
        zIndex: 3,
        animation: `particleFly ${(720 + Math.random() * 560).toFixed(0)}ms ${(Math.random() * 130).toFixed(0)}ms cubic-bezier(.15,.7,.25,1) forwards`,
      },
    };
  });

  const smoke: EffectParticle[] = Array.from({ length: smokeCount }, (_, i) => {
    const tx = Math.random() * 280 - 140;
    const size = 80 + Math.random() * 110;

    return {
      id: `s${i}`,
      style: {
        position: "absolute",
        left: "50%",
        top: "58%",
        width: `${size}px`,
        height: `${size}px`,
        borderRadius: "50%",
        background:
          "radial-gradient(circle at 42% 40%, rgba(225,232,222,.92), rgba(150,168,150,.4) 58%, rgba(150,168,150,0) 72%)",
        "--tx": `${tx.toFixed(0)}px`,
        opacity: 0,
        zIndex: 2,
        filter: "blur(2px)",
        animation: `smokeRise ${(950 + Math.random() * 550).toFixed(0)}ms ${(Math.random() * 170).toFixed(0)}ms ease-out forwards`,
      },
    };
  });

  return { particles, smoke };
}
