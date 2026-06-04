import type { CSSProperties } from 'react';
import { COLORS as C } from '../styles/tokens';
import type { CodePanelProps } from '../types';

const MAC_DOTS = ['#f87171', '#fbbf24', '#4ade80'] as const;

const containerStyle: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  minHeight: 0,
};

const headerStyle: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: 8,
  padding: '9px 16px',
  background: '#060810',
  borderBottom: `1px solid ${C.border}`,
  flexShrink: 0,
};

const bodyStyle: CSSProperties = {
  flex: 1,
  overflow: 'auto',
  background: '#060810',
  minHeight: 0,
};

const preStyle: CSSProperties = {
  margin: 0,
  padding: '14px 0',
  fontFamily: "JetBrains Mono, 'Fira Code', monospace",
  fontSize: 12,
  lineHeight: 1.75,
  color: '#cdd6f4',
};

export function CodePanel({ code }: CodePanelProps) {
  const lines = (code || '').split('\n');

  return (
    <div style={containerStyle}>
      <div style={headerStyle}>
        <div style={{ display: 'flex', gap: 5 }}>
          {MAC_DOTS.map((color, i) => (
            <div
              key={i}
              style={{ width: 11, height: 11, borderRadius: '50%', background: color, opacity: 0.8 }}
            />
          ))}
        </div>
        <span
          style={{
            color: C.muted,
            fontSize: 11,
            fontFamily: 'JetBrains Mono, monospace',
            marginLeft: 6,
          }}
        >
          TanStack Form — Live Code
        </span>
      </div>

      <div style={bodyStyle}>
        <pre style={preStyle}>
          {lines.map((line, i) => (
            <div key={i} style={{ display: 'flex' }}>
              <span
                style={{
                  color: '#222c44',
                  fontSize: 11,
                  minWidth: 38,
                  textAlign: 'right',
                  paddingRight: 14,
                  userSelect: 'none',
                  flexShrink: 0,
                }}
              >
                {i + 1}
              </span>
              <span style={{ paddingRight: 16, whiteSpace: 'pre' }}>{line}</span>
            </div>
          ))}
        </pre>
      </div>
    </div>
  );
}
