import { useForm } from '@tanstack/react-form';
import { useState, useRef } from 'react';
import { COLORS as C } from '../styles/tokens';
import { FieldLabel } from '../components/FieldLabel';
import { DEPARTMENTS, ROLES_MAP, SYSTEMS } from '../constants';
import { sleep, isValidEmailLoose } from '../utils';
import type { EnterpriseValues } from '../types';

type Step = 1 | 2 | 3;
const STEP_LABELS = ['Personal Info', 'Role Details', 'System Access'] as const;

export function EnterpriseForm() {
  const [step, setStep] = useState<Step>(1);
  const [status, setStatus] = useState<'success' | 'server_error' | null>(null);
  const [emailOk, setEmailOk] = useState(false);
  const [checking, setChecking] = useState(false);
  const emailTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const form = useForm({
    defaultValues: {
      firstName: '', lastName: '', email: '', phone: '',
      department: '', role: '', startDate: '', systemAccess: [], reportingManager: '',
    },
    onSubmit: async () => {
      await sleep(1800);
      if (Math.random() < 0.3) {
        form.setFieldMeta('email', (meta) => ({ ...meta, errors: ['This email already exists in the system'], errorMap: { ...meta.errorMap, onChange: 'This email already exists in the system' } }));
        setStatus('server_error');
        setStep(1);
      } else {
        setStatus('success');
      }
    },
  });

  const handleEmailChange = (v: string) => {
    setEmailOk(false);
    if (emailTimer.current) clearTimeout(emailTimer.current);
    if (!v || !isValidEmailLoose(v)) { setChecking(false); return; }
    setChecking(true);
    emailTimer.current = setTimeout(async () => {
      await sleep(600); setChecking(false); setEmailOk(true);
    }, 500);
  };

  const advance = async () => {
    const stepFields: (keyof EnterpriseValues)[][] = [
      ['firstName', 'lastName', 'email', 'phone'],
      ['department', 'role', 'startDate'],
      ['systemAccess', 'reportingManager'],
    ];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const results = await Promise.all(stepFields[step - 1].map((f) => form.validateField(f as any, 'change')));
    const hasErrors = results.some((r) => r && r.length > 0);
    if (!hasErrors) setStep((s) => (s + 1) as Step);
  };

  const inputSty = (err?: string | false | null) => ({
    width: '100%', boxSizing: 'border-box' as const, background: C.panel,
    border: `1px solid ${err ? C.red : C.border}`, borderRadius: 8,
    padding: '11px 14px', color: C.text, fontSize: 14, outline: 'none', fontFamily: 'inherit',
  });
  const selectSty = (err?: string | false | null, disabled?: boolean) => ({
    ...inputSty(err), cursor: disabled ? 'not-allowed' : 'pointer', opacity: disabled ? 0.45 : 1,
  });

  const vals = form.state.values;

  if (status === 'success') {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: 480, textAlign: 'center', padding: '2rem' }}>
        <div style={{ fontSize: 60, marginBottom: 16 }}>🎉</div>
        <h3 style={{ color: C.green, fontSize: 22, fontWeight: 800, marginBottom: 6 }}>Employee Onboarded!</h3>
        <p style={{ color: C.muted, fontSize: 14, marginBottom: 2 }}>{vals.firstName} {vals.lastName}</p>
        <p style={{ color: C.muted, fontSize: 13, marginBottom: 20 }}>{vals.role} · {vals.department}</p>
        <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 12, padding: '1rem 1.5rem', marginBottom: 24, textAlign: 'left', minWidth: 280 }}>
          <p style={{ color: C.muted, fontSize: 10, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 10 }}>Systems Provisioned</p>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            {vals.systemAccess.map((s) => (
              <span key={s} style={{ background: '#4ade8018', color: C.green, border: '1px solid #4ade8030', borderRadius: 99, padding: '3px 10px', fontSize: 12 }}>{s}</span>
            ))}
          </div>
        </div>
        <button onClick={() => { setStep(1); setStatus(null); form.reset(); }} style={{ background: C.card, border: `1px solid ${C.border}`, color: C.text, borderRadius: 8, padding: '10px 24px', cursor: 'pointer', fontSize: 14, fontWeight: 600 }}>↺ Run Demo Again</button>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 580, margin: '0 auto', padding: '1.5rem' }}>
      {/* Stepper */}
      <div style={{ display: 'flex', alignItems: 'flex-start', marginBottom: '2rem' }}>
        {STEP_LABELS.map((label, i) => {
          const n = (i + 1) as Step; const isDone = step > n; const isActive = step === n;
          return (
            <div key={i} style={{ display: 'flex', alignItems: 'center', flex: i < 2 ? 1 : 'auto' }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5 }}>
                <div style={{ width: 34, height: 34, borderRadius: '50%', background: isDone ? C.green : isActive ? C.ts : C.card, border: `2px solid ${isDone ? C.green : isActive ? C.ts : C.dim}`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: isDone ? '#07090f' : isActive ? 'white' : C.muted, fontSize: 13, fontWeight: 700, transition: 'all 0.3s' }}>
                  {isDone ? '✓' : n}
                </div>
                <span style={{ color: isDone ? C.green : isActive ? C.ts : C.muted, fontSize: 11, fontWeight: 600, whiteSpace: 'nowrap' }}>{label}</span>
              </div>
              {i < 2 && <div style={{ flex: 1, height: 2, margin: '0 8px', marginBottom: 20, background: step > n ? C.green : C.dim, transition: 'background 0.3s' }} />}
            </div>
          );
        })}
      </div>

      {status === 'server_error' && (
        <div style={{ background: '#f8717112', border: '1px solid #f8717140', borderRadius: 8, padding: '10px 14px', marginBottom: '1.25rem', color: C.red, fontSize: 13 }}>
          ⚠  Server returned validation errors — review highlighted fields.
        </div>
      )}

      {step === 1 && (
        <div>
          <h3 style={{ fontWeight: 800, fontSize: 17, marginBottom: 4 }}>Personal Information</h3>
          <p style={{ color: C.muted, fontSize: 13, marginBottom: '1.5rem' }}>Basic profile details</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 .75rem' }}>
            <form.Field name="firstName" validators={{ onChange: ({ value }) => !value.trim() ? 'Required' : undefined }}>
              {(f) => <FieldLabel label="First Name" error={f.state.meta.isTouched ? f.state.meta.errors[0] : null} required><input style={inputSty(f.state.meta.isTouched && f.state.meta.errors[0])} value={f.state.value} placeholder="Jane" onChange={(e) => f.handleChange(e.target.value)} onBlur={f.handleBlur} /></FieldLabel>}
            </form.Field>
            <form.Field name="lastName" validators={{ onChange: ({ value }) => !value.trim() ? 'Required' : undefined }}>
              {(f) => <FieldLabel label="Last Name" error={f.state.meta.isTouched ? f.state.meta.errors[0] : null} required><input style={inputSty(f.state.meta.isTouched && f.state.meta.errors[0])} value={f.state.value} placeholder="Smith" onChange={(e) => f.handleChange(e.target.value)} onBlur={f.handleBlur} /></FieldLabel>}
            </form.Field>
          </div>
          <form.Field name="email" validators={{ onChange: ({ value }) => !value.trim() ? 'Required' : !isValidEmailLoose(value) ? 'Invalid email' : undefined }}>
            {(f) => (
              <FieldLabel label="Work Email" error={f.state.meta.isTouched ? f.state.meta.errors[0] : null} hint={checking ? '⏳ Validating…' : emailOk && !f.state.meta.errors[0] ? '✅ Email looks good' : null} required>
                <input style={{ ...inputSty(f.state.meta.isTouched && f.state.meta.errors[0]), borderColor: f.state.meta.errors[0] ? C.red : emailOk && !checking ? C.green : C.border }} type="email" value={f.state.value} placeholder="jane.smith@company.com" onChange={(e) => { f.handleChange(e.target.value); handleEmailChange(e.target.value); }} onBlur={f.handleBlur} />
              </FieldLabel>
            )}
          </form.Field>
          <form.Field name="phone" validators={{ onChange: ({ value }) => !value.trim() ? 'Required' : undefined }}>
            {(f) => <FieldLabel label="Phone" error={f.state.meta.isTouched ? f.state.meta.errors[0] : null} required><input style={inputSty(f.state.meta.isTouched && f.state.meta.errors[0])} value={f.state.value} placeholder="+91 98765 43210" onChange={(e) => f.handleChange(e.target.value)} onBlur={f.handleBlur} /></FieldLabel>}
          </form.Field>
        </div>
      )}

      {step === 2 && (
        <div>
          <h3 style={{ fontWeight: 800, fontSize: 17, marginBottom: 4 }}>Role & Department</h3>
          <p style={{ color: C.muted, fontSize: 13, marginBottom: '1.5rem' }}>Reporting structure and role details</p>
          <form.Field name="department" validators={{ onChange: ({ value }) => !value ? 'Required' : undefined }}>
            {(f) => (
              <FieldLabel label="Department" error={f.state.meta.isTouched ? f.state.meta.errors[0] : null} required>
                <select style={selectSty(f.state.meta.isTouched && f.state.meta.errors[0])} value={f.state.value} onChange={(e) => { f.handleChange(e.target.value); form.setFieldValue('role', ''); }} onBlur={f.handleBlur}>
                  <option value="">Select department…</option>
                  {DEPARTMENTS.map((d) => <option key={d} value={d}>{d}</option>)}
                </select>
              </FieldLabel>
            )}
          </form.Field>
          <form.Subscribe selector={(s) => s.values.department}>
            {(dept) => (
              <form.Field name="role" validators={{ onChange: ({ value }) => !value ? 'Required' : undefined }}>
                {(f) => (
                  <FieldLabel label="Role / Title" error={f.state.meta.isTouched ? f.state.meta.errors[0] : null} hint={!dept ? 'Select department first' : null} required>
                    <select style={selectSty(f.state.meta.isTouched && f.state.meta.errors[0], !dept)} disabled={!dept} value={f.state.value} onChange={(e) => f.handleChange(e.target.value)} onBlur={f.handleBlur}>
                      <option value="">Select role…</option>
                      {ROLES_MAP[dept]?.map((r) => <option key={r} value={r}>{r}</option>)}
                    </select>
                  </FieldLabel>
                )}
              </form.Field>
            )}
          </form.Subscribe>
          <form.Field name="startDate" validators={{ onChange: ({ value }) => !value ? 'Required' : undefined }}>
            {(f) => <FieldLabel label="Start Date" error={f.state.meta.isTouched ? f.state.meta.errors[0] : null} required><input style={inputSty(f.state.meta.isTouched && f.state.meta.errors[0])} type="date" value={f.state.value} onChange={(e) => f.handleChange(e.target.value)} onBlur={f.handleBlur} /></FieldLabel>}
          </form.Field>
        </div>
      )}

      {step === 3 && (
        <div>
          <h3 style={{ fontWeight: 800, fontSize: 17, marginBottom: 4 }}>System Access</h3>
          <p style={{ color: C.muted, fontSize: 13, marginBottom: '1.25rem' }}>Grant access to required tools</p>
          {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
          <form.Field name={"systemAccess" as any} validators={{ onChange: ({ value }: { value: unknown }) => !(value as string[]).length ? 'Select at least one system' : undefined }}>
            {(f) => (
              <FieldLabel label="Systems to Provision" error={f.state.meta.isTouched ? f.state.meta.errors[0] : null} required>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 4 }}>
                  {SYSTEMS.map((sys) => {
                    const on = (f.state.value as string[]).includes(sys);
                    return (
                      <label key={sys} style={{ display: 'flex', alignItems: 'center', gap: 10, background: on ? '#0e1e30' : C.panel, border: `1px solid ${on ? C.blue + '50' : C.border}`, borderRadius: 8, padding: '10px 12px', cursor: 'pointer', transition: 'all 0.15s' }}>
                        <input type="checkbox" checked={on} style={{ accentColor: C.blue }} onChange={(e) => {
                          const next = e.target.checked ? [...(f.state.value as string[]), sys] : (f.state.value as string[]).filter((s) => s !== sys);
                          // eslint-disable-next-line @typescript-eslint/no-explicit-any
                          (f.handleChange as any)(next);
                        }} />
                        <span style={{ color: on ? C.blue : '#8892a8', fontSize: 13, fontWeight: on ? 600 : 400 }}>{sys}</span>
                      </label>
                    );
                  })}
                </div>
              </FieldLabel>
            )}
          </form.Field>
          <form.Field name="reportingManager" validators={{ onChange: ({ value }) => !value.trim() ? 'Required' : undefined }}>
            {(f) => <FieldLabel label="Reporting Manager" error={f.state.meta.isTouched ? f.state.meta.errors[0] : null} required><input style={inputSty(f.state.meta.isTouched && f.state.meta.errors[0])} value={f.state.value} placeholder="Manager's full name or email" onChange={(e) => f.handleChange(e.target.value)} onBlur={f.handleBlur} /></FieldLabel>}
          </form.Field>
          {/* Summary */}
          <div style={{ background: C.surface, borderRadius: 8, padding: '12px 14px', marginBottom: '1.25rem', border: `1px solid ${C.border}` }}>
            <p style={{ color: C.muted, fontSize: 10, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 10 }}>Onboarding Summary</p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6, fontSize: 12 }}>
              {([['Name', `${vals.firstName} ${vals.lastName}`.trim() || '—'], ['Email', vals.email || '—'], ['Department', vals.department || '—'], ['Role', vals.role || '—'], ['Start Date', vals.startDate || '—'], ['Systems', vals.systemAccess.length ? `${vals.systemAccess.length} selected` : '—']] as [string, string][]).map(([l, v]) => (
                <div key={l}><span style={{ color: C.muted }}>{l}: </span><span style={{ color: v === '—' ? C.dim : C.text }}>{v}</span></div>
              ))}
            </div>
          </div>
        </div>
      )}

      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.5rem' }}>
        {step > 1 ? <button onClick={() => setStep((s) => (s - 1) as Step)} style={{ background: 'transparent', border: `1px solid ${C.border}`, color: C.text, borderRadius: 8, padding: '10px 20px', cursor: 'pointer', fontSize: 13, fontWeight: 600 }}>← Back</button> : <div />}
        {step < 3
          ? <button onClick={advance} style={{ background: C.ts, color: 'white', border: 'none', borderRadius: 8, padding: '10px 24px', cursor: 'pointer', fontSize: 14, fontWeight: 700 }}>Next: {(STEP_LABELS as readonly string[])[step] ?? 'Finish'} →</button>
          : <form.Subscribe selector={(s) => s.isSubmitting}>
              {(isSubmitting) => (
                <button onClick={form.handleSubmit} disabled={isSubmitting} style={{ background: isSubmitting ? C.card : C.ts, color: isSubmitting ? C.muted : 'white', border: 'none', borderRadius: 8, padding: '10px 24px', fontSize: 14, fontWeight: 700, cursor: isSubmitting ? 'not-allowed' : 'pointer', transition: 'all 0.2s' }}>
                  {isSubmitting ? '⏳  Creating employee…' : '✅  Complete Onboarding'}
                </button>
              )}
            </form.Subscribe>
        }
      </div>
    </div>
  );
}
