import React, { useEffect, useRef, useMemo } from 'react';
import { gsap } from 'gsap';
import './ScrambledText.css';

interface ScrambledTextProps {
  radius?: number;
  duration?: number;
  speed?: number;
  scrambleChars?: string;
  className?: string;
  style?: React.CSSProperties;
  children: string;
}

const ScrambledText: React.FC<ScrambledTextProps> = ({
  radius = 100,
  duration = 1.2,
  speed = 0.5,
  scrambleChars = '.:',
  className = '',
  style = {},
  children
}) => {
  const rootRef = useRef<HTMLDivElement>(null);
  const charsRef = useRef<(HTMLSpanElement | null)[]>([]);

  const characters = useMemo(() => children.split(''), [children]);

  useEffect(() => {
    const charsElements = charsRef.current;
    
    const handleMove = (e: PointerEvent) => {
      if (!rootRef.current) return;

      charsElements.forEach((charEl, idx) => {
        if (!charEl) return;
        
        const rect = charEl.getBoundingClientRect();
        const dx = e.clientX - (rect.left + rect.width / 2);
        const dy = e.clientY - (rect.top + rect.height / 2);
        const dist = Math.hypot(dx, dy);

        if (dist < radius) {
          if (charEl.dataset.animating === 'true') return;
          charEl.dataset.animating = 'true';

          const originalChar = characters[idx];
          const progress = { val: 0 };
          const animDuration = duration * (1 - dist / radius);
          
          gsap.to(progress, {
            val: 1,
            duration: animDuration,
            ease: 'none',
            onUpdate: () => {
              if (progress.val < 0.9) {
                const randomIdx = Math.floor(Math.random() * scrambleChars.length);
                charEl.innerText = scrambleChars[randomIdx];
              } else {
                charEl.innerText = originalChar;
              }
            },
            onComplete: () => {
              charEl.innerText = originalChar;
              charEl.dataset.animating = 'false';
            }
          });
        }
      });
    };

    const el = rootRef.current;
    if (el) {
      el.addEventListener('pointermove', handleMove);
    }

    return () => {
      if (el) {
        el.removeEventListener('pointermove', handleMove);
      }
    };
  }, [radius, duration, speed, scrambleChars, characters]);

  return (
    <div ref={rootRef} className={`scrambled-text-container ${className}`} style={style}>
      <p className="m-0 p-0 inline">
        {characters.map((char, i) => (
          <span
            key={`${children}-${i}`}
            ref={(el) => {
              charsRef.current[i] = el;
            }}
            className="char inline-block whitespace-pre"
            data-content={char}
          >
            {char}
          </span>
        ))}
      </p>
    </div>
  );
};

export default ScrambledText;
