import type { CSSProperties } from 'react';
import { COLORS as C } from '../styles/tokens';
import type { SuccessScreenProps } from '../types';

const buttonStyle: CSSProperties = {
  background: C.card,
  border: `1px solid ${C.border}`,
  color: C.text,
  borderRadius: 8,
  padding: '10px 20px',
  cursor: 'pointer',
  fontSize: 14,
  fontWeight: 600,
};

export function SuccessScreen({ icon, title, sub, onReset }: SuccessScreenProps) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 320,
        textAlign: 'center',
        padding: '2rem',
      }}
    >
      <div style={{ fontSize: 56, marginBottom: 16 }}>{icon}</div>
      <h3 style={{ color: C.green, fontSize: 22, fontWeight: 800, marginBottom: 8 }}>{title}</h3>
      <p style={{ color: C.muted, fontSize: 14, marginBottom: 24 }}>{sub}</p>
      <button onClick={onReset} style={buttonStyle}>↺ Reset Demo</button>
    </div>
  );
}
