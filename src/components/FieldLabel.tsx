import type { CSSProperties } from 'react';
import { COLORS as C } from '../styles/tokens';
import type { FLProps } from '../types';

const labelStyle: CSSProperties = {
  display: 'block',
  color: '#788099',
  fontSize: 11,
  fontWeight: 700,
  letterSpacing: '0.08em',
  textTransform: 'uppercase',
  marginBottom: 6,
};

export function FieldLabel({ label, error, hint, required, children }: FLProps) {
  return (
    <div style={{ marginBottom: '1rem' }}>
      {label && (
        <label style={labelStyle}>
          {label}
          {required && <span style={{ color: C.red, marginLeft: 3 }}>*</span>}
        </label>
      )}
      {children}
      {hint && <p style={{ color: C.muted, fontSize: 12, marginTop: 5 }}>{hint}</p>}
      {error && <p style={{ color: C.red, fontSize: 12, marginTop: 5 }}>⚠ {error}</p>}
    </div>
  );
}
