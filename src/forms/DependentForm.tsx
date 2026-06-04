import { useForm } from '@tanstack/react-form';
import { useState } from 'react';
import { COLORS as C } from '../styles/tokens';
import { FieldLabel } from '../components/FieldLabel';
import { SuccessScreen } from '../components/SuccessScreen';
import { StateChip } from '../components/StateChip';
import { RenderCounter } from '../components/RenderCounter';
import { STATES_MAP } from '../constants';

export function DependentForm() {
  const [done, setDone] = useState(false);
  const [result, setResult] = useState('');

  const form = useForm({
    defaultValues: { country: '', state: '', city: '' },
    onSubmit: ({ value }) => {
      setResult(`${value.state}, ${value.country}`);
      setDone(true);
    },
  });

  const reset = () => { setDone(false); setResult(''); form.reset(); };

  if (done) return <SuccessScreen icon="📍" title="Location Saved!" sub={result} onReset={reset} />;

  return (
    <div style={{ padding: '1.5rem', maxWidth: 380, margin: '0 auto' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
        <h3 style={{ fontWeight: 800, fontSize: 18, margin: 0 }}>Dependent Fields</h3>
        <RenderCounter label="parent renders" />
      </div>
      <p style={{ color: C.muted, fontSize: 13, marginBottom: '1.5rem' }}>
        form.Subscribe scopes re-renders — only the state dropdown re-renders when country changes
      </p>

      <form.Field name="country" validators={{ onChange: ({ value }) => !value ? 'Country is required' : undefined }}>
        {(countryField) => (
          <FieldLabel label="Country" error={countryField.state.meta.isTouched ? countryField.state.meta.errors[0] : null} required>
            <select
              style={{ width: '100%', boxSizing: 'border-box', background: C.panel, border: `1px solid ${countryField.state.meta.isTouched && countryField.state.meta.errors[0] ? C.red : C.border}`, borderRadius: 8, padding: '11px 14px', color: C.text, fontSize: 14, outline: 'none', fontFamily: 'inherit', cursor: 'pointer' }}
              value={countryField.state.value}
              onChange={(e) => {
                countryField.handleChange(e.target.value);
                form.setFieldValue('state', ''); // typed cross-field reset
              }}
              onBlur={countryField.handleBlur}
            >
              <option value="">Select country…</option>
              {Object.keys(STATES_MAP).map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </FieldLabel>
        )}
      </form.Field>

      {/* Subscribe scopes re-renders to country changes only — not the whole parent */}
      <form.Subscribe selector={(s) => s.values.country}>
        {(country) => (
          <form.Field name="state" validators={{ onChange: ({ value }) => !value ? 'State is required' : undefined }}>
            {(stateField) => (
              <FieldLabel label="State / Province" error={stateField.state.meta.isTouched ? stateField.state.meta.errors[0] : null} hint={!country ? 'Select a country first' : null} required>
                <select
                  style={{ width: '100%', boxSizing: 'border-box', background: C.panel, border: `1px solid ${stateField.state.meta.isTouched && stateField.state.meta.errors[0] ? C.red : C.border}`, borderRadius: 8, padding: '11px 14px', color: C.text, fontSize: 14, outline: 'none', fontFamily: 'inherit', cursor: !country ? 'not-allowed' : 'pointer', opacity: !country ? 0.45 : 1 }}
                  disabled={!country}
                  value={stateField.state.value}
                  onChange={(e) => stateField.handleChange(e.target.value)}
                  onBlur={stateField.handleBlur}
                >
                  <option value="">Select state…</option>
                  {STATES_MAP[country]?.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
              </FieldLabel>
            )}
          </form.Field>
        )}
      </form.Subscribe>

      <form.Field name="city">
        {(field) => (
          <FieldLabel label="City (Optional)">
            <input
              style={{ width: '100%', boxSizing: 'border-box', background: C.panel, border: `1px solid ${C.border}`, borderRadius: 8, padding: '11px 14px', color: C.text, fontSize: 14, outline: 'none', fontFamily: 'inherit' }}
              placeholder="Enter city…"
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
            />
          </FieldLabel>
        )}
      </form.Field>

      <div style={{ background: C.surface, borderRadius: 8, padding: '10px 14px', marginBottom: '1.25rem', border: `1px solid ${C.border}` }}>
        <p style={{ color: C.muted, fontSize: 10, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 8 }}>
          form.Subscribe — selected values
        </p>
        <form.Subscribe selector={(s) => s.values}>
          {(values) => (
            <>
              <StateChip label="values.country" value={values.country || 'undefined'} />
              <StateChip label="values.state"   value={values.state   || 'undefined'} />
              <StateChip label="values.city"    value={values.city    || 'undefined'} />
              <StateChip label="state options"  value={`${STATES_MAP[values.country]?.length ?? 0} available`} />
            </>
          )}
        </form.Subscribe>
      </div>

      <button
        onClick={form.handleSubmit}
        style={{ width: '100%', background: C.purple, color: 'white', border: 'none', borderRadius: 8, padding: '12px', fontSize: 14, fontWeight: 700, cursor: 'pointer' }}
      >
        Save Location →
      </button>
    </div>
  );
}
