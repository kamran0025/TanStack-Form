import { useForm } from '@tanstack/react-form';
import { useState } from 'react';
import { COLORS as C } from '../styles/tokens';
import { FieldLabel } from '../components/FieldLabel';
import { SuccessScreen } from '../components/SuccessScreen';
import { StateChip } from '../components/StateChip';
import { RenderCounter } from '../components/RenderCounter';
import { sleep } from '../utils';

export function LoginForm() {
  const [done, setDone] = useState(false);
  const [submittedEmail, setSubmittedEmail] = useState('');

  const form = useForm({
    defaultValues: { email: '', password: '' },
    onSubmit: async ({ value }) => {
      await sleep(1200);
      setSubmittedEmail(value.email);
      setDone(true);
    },
  });

  const reset = () => {
    setDone(false);
    setSubmittedEmail('');
    form.reset();
  };

  if (done) {
    return <SuccessScreen icon="✅" title="Login Successful!" sub={`Welcome back, ${submittedEmail}`} onReset={reset} />;
  }

  return (
    <div style={{ padding: '1.5rem', maxWidth: 380, margin: '0 auto' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
        <h3 style={{ fontWeight: 800, fontSize: 18, margin: 0 }}>Sign In</h3>
        <RenderCounter label="parent renders" />
      </div>
      <p style={{ color: C.muted, fontSize: 13, marginBottom: '1.5rem' }}>
        Render-prop fields — parent stays still while fields update themselves
      </p>

      <form.Field
        name="email"
        validators={{
          onBlur: ({ value }) => !value ? 'Email is required' : !/^[^@]+@[^@]+/.test(value) ? 'Invalid email' : undefined,
        }}
      >
        {(field) => (
          <FieldLabel label="Email Address" error={field.state.meta.isTouched ? field.state.meta.errors[0] : null} required>
            <input
              style={{
                width: '100%', boxSizing: 'border-box', background: C.panel,
                border: `1px solid ${field.state.meta.isTouched && field.state.meta.errors[0] ? C.red : C.border}`,
                borderRadius: 8, padding: '11px 14px', color: C.text, fontSize: 14, outline: 'none', fontFamily: 'inherit',
              }}
              type="email"
              placeholder="you@company.com"
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
              onBlur={field.handleBlur}
            />
          </FieldLabel>
        )}
      </form.Field>

      <form.Field
        name="password"
        validators={{
          onBlur: ({ value }) => !value ? 'Password is required' : value.length < 6 ? 'Minimum 6 characters' : undefined,
        }}
      >
        {(field) => (
          <FieldLabel label="Password" error={field.state.meta.isTouched ? field.state.meta.errors[0] : null} required>
            <input
              style={{
                width: '100%', boxSizing: 'border-box', background: C.panel,
                border: `1px solid ${field.state.meta.isTouched && field.state.meta.errors[0] ? C.red : C.border}`,
                borderRadius: 8, padding: '11px 14px', color: C.text, fontSize: 14, outline: 'none', fontFamily: 'inherit',
              }}
              type="password"
              placeholder="Min. 6 characters"
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
              onBlur={field.handleBlur}
            />
          </FieldLabel>
        )}
      </form.Field>

      {/* form.Subscribe — only re-renders this slice */}
      <div style={{ background: C.surface, borderRadius: 8, padding: '10px 14px', marginBottom: '1.25rem', border: `1px solid ${C.border}` }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
          <p style={{ color: C.muted, fontSize: 10, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', margin: 0 }}>
            form.Subscribe — form state
          </p>
          <form.Subscribe selector={(s) => s.values.email}>
            {() => <RenderCounter label="subscribe renders" />}
          </form.Subscribe>
        </div>
        <form.Subscribe selector={(s) => ({ canSubmit: s.canSubmit, isSubmitting: s.isSubmitting, values: s.values })}>
          {({ canSubmit, isSubmitting, values }) => (
            <>
              <StateChip label="canSubmit" value={canSubmit} />
              <StateChip label="isSubmitting" value={isSubmitting} />
              <StateChip label="email.length" value={`${values.email.length} chars`} />
              <StateChip label="password.length" value={`${values.password.length} chars`} />
            </>
          )}
        </form.Subscribe>
      </div>

      <form.Subscribe selector={(s) => ({ canSubmit: s.canSubmit, isSubmitting: s.isSubmitting })}>
        {({ canSubmit, isSubmitting }) => (
          <button
            disabled={isSubmitting}
            onClick={form.handleSubmit}
            style={{
              width: '100%', background: canSubmit ? C.ts : C.card, color: canSubmit ? 'white' : C.muted,
              border: 'none', borderRadius: 8, padding: '12px', fontSize: 14, fontWeight: 700,
              cursor: canSubmit ? 'pointer' : 'not-allowed', transition: 'all 0.2s',
            }}
          >
            {isSubmitting ? '⏳  Signing in…' : '→  Sign In'}
          </button>
        )}
      </form.Subscribe>
    </div>
  );
}
