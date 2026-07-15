import { forwardRef } from 'react';
import { INTRO_COLORS } from './constants';

/** Balanced network node positions — symmetrical knowledge graph layout */
export const NETWORK_NODES = [
  { id: 'center', x: 200, y: 200, r: 5, isHub: true },
  { id: 'n1', x: 200, y: 80, r: 3.5 },
  { id: 'n2', x: 304, y: 140, r: 3.5 },
  { id: 'n3', x: 304, y: 260, r: 3.5 },
  { id: 'n4', x: 200, y: 320, r: 3.5 },
  { id: 'n5', x: 96, y: 260, r: 3.5 },
  { id: 'n6', x: 96, y: 140, r: 3.5 },
  { id: 'n7', x: 252, y: 110, r: 2.5 },
  { id: 'n8', x: 290, y: 200, r: 2.5 },
  { id: 'n9', x: 252, y: 290, r: 2.5 },
  { id: 'n10', x: 148, y: 290, r: 2.5 },
  { id: 'n11', x: 110, y: 200, r: 2.5 },
  { id: 'n12', x: 148, y: 110, r: 2.5 },
] as const;

/** Connections between nodes — forms an intelligent geometric network */
export const NETWORK_CONNECTIONS: [string, string][] = [
  ['center', 'n1'],
  ['center', 'n2'],
  ['center', 'n3'],
  ['center', 'n4'],
  ['center', 'n5'],
  ['center', 'n6'],
  ['n1', 'n2'],
  ['n2', 'n3'],
  ['n3', 'n4'],
  ['n4', 'n5'],
  ['n5', 'n6'],
  ['n6', 'n1'],
  ['n1', 'n7'],
  ['n2', 'n7'],
  ['n2', 'n8'],
  ['n3', 'n8'],
  ['n3', 'n9'],
  ['n4', 'n9'],
  ['n4', 'n10'],
  ['n5', 'n10'],
  ['n5', 'n11'],
  ['n6', 'n11'],
  ['n6', 'n12'],
  ['n1', 'n12'],
  ['n7', 'n8'],
  ['n8', 'n9'],
  ['n9', 'n10'],
  ['n10', 'n11'],
  ['n11', 'n12'],
  ['n12', 'n7'],
];

const nodeMap = Object.fromEntries(NETWORK_NODES.map((n) => [n.id, n]));

interface IntroNetworkSvgProps {
  className?: string;
}

/**
 * SVG knowledge network — nodes and connections that morph into the logo.
 * Lines use stroke-dasharray for self-drawing animation via GSAP.
 */
export const IntroNetworkSvg = forwardRef<SVGSVGElement, IntroNetworkSvgProps>(
  ({ className }, ref) => {
    return (
      <svg
        ref={ref}
        className={className}
        viewBox="0 0 400 400"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ willChange: 'transform, opacity' }}
        aria-hidden="true"
      >
        <defs>
          <radialGradient id="nodeGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={INTRO_COLORS.primary} stopOpacity="0.8" />
            <stop offset="100%" stopColor={INTRO_COLORS.primary} stopOpacity="0" />
          </radialGradient>
          <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={INTRO_COLORS.primary} stopOpacity="0.6" />
            <stop offset="50%" stopColor={INTRO_COLORS.accent} stopOpacity="0.4" />
            <stop offset="100%" stopColor={INTRO_COLORS.primary} stopOpacity="0.6" />
          </linearGradient>
          <filter id="glowFilter" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <g className="intro-network-lines" opacity="0">
          {NETWORK_CONNECTIONS.map(([from, to], i) => {
            const a = nodeMap[from];
            const b = nodeMap[to];
            const length = Math.hypot(b.x - a.x, b.y - a.y);
            return (
              <line
                key={`line-${i}`}
                className="intro-network-line"
                data-from={from}
                data-to={to}
                x1={a.x}
                y1={a.y}
                x2={b.x}
                y2={b.y}
                stroke="url(#lineGrad)"
                strokeWidth="0.8"
                strokeLinecap="round"
                strokeDasharray={length}
                strokeDashoffset={length}
                opacity="0.7"
              />
            );
          })}
        </g>

        <g className="intro-network-nodes" opacity="0">
          {NETWORK_NODES.map((node) => (
            <g key={node.id} className="intro-network-node" data-node-id={node.id}>
              <circle
                cx={node.x}
                cy={node.y}
                r={node.r * 2.5}
                fill="url(#nodeGlow)"
                opacity="0.4"
              />
              <circle
                className="intro-node-core"
                cx={node.x}
                cy={node.y}
                r={node.r}
                fill={node.isHub ? INTRO_COLORS.primary : INTRO_COLORS.accent}
                filter="url(#glowFilter)"
              />
            </g>
          ))}
        </g>
      </svg>
    );
  },
);

IntroNetworkSvg.displayName = 'IntroNetworkSvg';
