import { useForm } from '@tanstack/react-form';
import { useState } from 'react';
import { COLORS as C } from '../styles/tokens';
import { FieldLabel } from '../components/FieldLabel';
import { SuccessScreen } from '../components/SuccessScreen';
import { StateChip } from '../components/StateChip';
import { RenderCounter } from '../components/RenderCounter';
import { TAKEN_EMAILS } from '../constants';
import { sleep } from '../utils';

export function AsyncForm() {
  const [done, setDone] = useState(false);
  const [submittedEmail, setSubmittedEmail] = useState('');

  const form = useForm({
    defaultValues: { email: '' },
    onSubmit: async ({ value }) => {
      setSubmittedEmail(value.email);
      setDone(true);
    },
  });

  const reset = () => { setDone(false); setSubmittedEmail(''); form.reset(); };

  if (done) {
    return <SuccessScreen icon="📧" title="Email Validated!" sub={`${submittedEmail} is available`} onReset={reset} />;
  }

  return (
    <div style={{ padding: '1.5rem', maxWidth: 380, margin: '0 auto' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
        <h3 style={{ fontWeight: 800, fontSize: 18, margin: 0 }}>Async Validation</h3>
        <RenderCounter label="parent renders" />
      </div>
      <p style={{ color: C.muted, fontSize: 13, marginBottom: '1.5rem' }}>
        onChangeAsyncDebounceMs built-in — parent doesn't re-render while typing
      </p>

      <form.Field
        name="email"
        validators={{
          onChange: ({ value }) =>
            !value ? 'Email is required'
            : !/^[^@]+@[^@]+\.[^@]+$/.test(value) ? 'Invalid email format'
            : undefined,
          onChangeAsync: async ({ value }) => {
            console.log("Async");
            await sleep(700);
            return TAKEN_EMAILS.includes(value) ? 'This email is already registered' : undefined;
          },
          onChangeAsyncDebounceMs: 500, // ← built-in, no lodash needed
        }}
      >
        {(field) => (
          <>
            <FieldLabel
              label="Email Address"
              error={field.state.meta.isTouched ? field.state.meta.errors[0] : null}
              hint={
                field.state.meta.isValidating ? '⏳  Checking availability…'
                : field.state.meta.isTouched && !field.state.meta.errors[0] && field.state.value ? '✅  Email is available!'
                : null
              }
              required
            >
              <input
                style={{
                  width: '100%', boxSizing: 'border-box', background: C.panel,
                  border: `1px solid ${
                    !field.state.meta.isTouched ? C.border
                    : field.state.meta.errors[0] ? C.red
                    : !field.state.meta.isValidating && field.state.value ? C.green
                    : C.border}`,
                  borderRadius: 8, padding: '11px 14px', color: C.text, fontSize: 14, outline: 'none', fontFamily: 'inherit',
                }}
                type="email"
                placeholder="try: test@test.com"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                onBlur={field.handleBlur}
              />
            </FieldLabel>

            <div style={{ background: C.surface, borderRadius: 8, padding: '10px 14px', marginBottom: '1rem', border: `1px solid ${C.border}` }}>
              <p style={{ color: C.muted, fontSize: 10, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 8 }}>
                field.state.meta — live state
              </p>
              <StateChip label="isValidating" value={field.state.meta.isValidating} />
              <StateChip label='errors[0]' value={field.state.meta.errors[0] ? `"${field.state.meta.errors[0]}"` : 'undefined'} />
              <StateChip label="isTouched" value={field.state.meta.isTouched} />
              <StateChip label="isDirty" value={field.state.meta.isDirty} />
            </div>
          </>
        )}
      </form.Field>

      {/* Quick-fill buttons */}
      <div style={{ background: C.panel, borderRadius: 8, padding: '10px 14px', marginBottom: '1.25rem', border: `1px solid ${C.border}` }}>
        <p style={{ color: C.muted, fontSize: 11, fontWeight: 600, marginBottom: 6 }}>🧪 Test with taken emails:</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          {TAKEN_EMAILS.map((e) => (
            <button key={e}
              onClick={() => { form.setFieldValue('email', e); form.setFieldMeta('email', (m) => ({ ...m, isTouched: true })); }}
              style={{ background: 'transparent', border: 'none', color: C.ts, cursor: 'pointer', fontSize: 12, padding: '2px 0', textAlign: 'left', fontFamily: "JetBrains Mono, monospace" }}>
              → {e}
            </button>
          ))}
        </div>
      </div>

      <form.Subscribe selector={(s) => ({ canSubmit: s.canSubmit, isValidating: s.isSubmitting })}>
        {({ canSubmit, isValidating }) => (
          <button
            disabled={!canSubmit}
            onClick={form.handleSubmit}
            style={{
              width: '100%', background: canSubmit ? C.yellow : C.card, color: canSubmit ? '#0a0d16' : C.muted,
              border: 'none', borderRadius: 8, padding: '12px', fontSize: 14, fontWeight: 700,
              cursor: canSubmit ? 'pointer' : 'not-allowed', transition: 'all 0.2s',
            }}
          >
            {isValidating ? '⏳  Validating…' : 'Validate & Continue →'}
          </button>
        )}
      </form.Subscribe>
    </div>
  );
}
