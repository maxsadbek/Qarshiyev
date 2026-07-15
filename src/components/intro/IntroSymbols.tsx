import { INTRO_COLORS } from './constants';

/** Floating futuristic UI symbols for Scene 3 */
export const INTRO_SYMBOLS = [
  { id: 'pi', x: -140, y: -100, content: 'π', size: 14 },
  { id: 'sum', x: 150, y: -80, content: '∑', size: 13 },
  { id: 'code', x: -160, y: 60, content: '</>', size: 11 },
  { id: 'ai', x: 130, y: 90, content: 'AI', size: 10 },
  { id: 'fn', x: 0, y: -130, content: 'f(x)', size: 11 },
  { id: 'circuit', x: -100, y: 130, content: '⬡', size: 12 },
  { id: 'book', x: 110, y: -120, content: '◈', size: 11 },
  { id: 'infinity', x: 170, y: 0, content: '∞', size: 13 },
] as const;

interface IntroSymbolsProps {
  className?: string;
}

/**
 * Minimal futuristic symbols that appear and disappear during Scene 3.
 */
export const IntroSymbols: React.FC<IntroSymbolsProps> = ({ className }) => {
  return (
    <div className={className} aria-hidden="true">
      {INTRO_SYMBOLS.map((sym) => (
        <span
          key={sym.id}
          className="intro-symbol absolute font-mono select-none pointer-events-none"
          data-symbol-id={sym.id}
          style={{
            left: `calc(50% + ${sym.x}px)`,
            top: `calc(50% + ${sym.y}px)`,
            fontSize: sym.size,
            color: INTRO_COLORS.primary,
            opacity: 0,
            willChange: 'opacity, transform',
          }}
        >
          {sym.content}
        </span>
      ))}
    </div>
  );
};
