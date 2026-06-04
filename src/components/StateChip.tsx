import { COLORS as C } from '../styles/tokens';
import type { StateChipProps } from '../types';

export function StateChip({ label, value }: StateChipProps) {
  const isOn =
    value === true ||
    (typeof value === 'string' &&
      value.length > 0 &&
      value !== 'undefined');

  const color =
    value === true ? C.green : value === false ? C.red : C.blue;

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        fontSize: 12,
        fontFamily: "JetBrains Mono, 'Fira Code', monospace",
        padding: '3px 0',
      }}
    >
      <span style={{ color: C.muted }}>{label}</span>
      <span style={{ color: isOn ? color : C.red }}>
        {typeof value === 'boolean' ? String(value) : value}
      </span>
    </div>
  );
}
