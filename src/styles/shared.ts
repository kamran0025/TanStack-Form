import type { CSSProperties } from 'react';
import { COLORS as C } from './tokens';

export const inputStyle = (error?: string | false | null, disabled?: boolean): CSSProperties => ({
  width: '100%',
  boxSizing: 'border-box',
  background: C.panel,
  border: `1px solid ${error ? C.red : C.border}`,
  borderRadius: 8,
  padding: '11px 14px',
  color: C.text,
  fontSize: 14,
  outline: 'none',
  opacity: disabled ? 0.45 : 1,
  fontFamily: 'inherit',
  transition: 'border-color 0.15s',
  cursor: disabled ? 'not-allowed' : 'text',
});

export const selectStyle = (error?: string | false | null, disabled?: boolean): CSSProperties => ({
  ...inputStyle(error, disabled),
  cursor: disabled ? 'not-allowed' : 'pointer',
});
