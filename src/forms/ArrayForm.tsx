import { useForm } from '@tanstack/react-form';
import { useState } from 'react';
import { COLORS as C } from '../styles/tokens';
import { SuccessScreen } from '../components/SuccessScreen';
import { StateChip } from '../components/StateChip';
import { RenderCounter } from '../components/RenderCounter';

export function ArrayForm() {
  const [done, setDone] = useState(false);
  const [saved, setSaved] = useState<string[]>([]);

  const form = useForm({
    defaultValues: { skills: [{ val: '' }] },
    onSubmit: ({ value }) => {
      setSaved(value.skills.map((s) => s.val).filter(Boolean));
      setDone(true);
    },
  });

  const reset = () => { setDone(false); setSaved([]); form.reset(); };

  if (done) return <SuccessScreen icon="🛠️" title="Skills Saved!" sub={saved.join(' · ')} onReset={reset} />;

  return (
    <div style={{ padding: '1.5rem', maxWidth: 380, margin: '0 auto' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
        <h3 style={{ fontWeight: 800, fontSize: 18, margin: 0 }}>Array Fields</h3>
        <RenderCounter label="parent renders" />
      </div>
      <p style={{ color: C.muted, fontSize: 13, marginBottom: '1.5rem' }}>
        mode="array" on form.Field — pushValue / removeValue built-in
      </p>

      <form.Field name="skills" mode="array">
        {(skillsField) => (
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', color: '#788099', fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 10 }}>
              Skills
              <span style={{ color: C.ts, marginLeft: 8, fontWeight: 600 }}>
                ({skillsField.state.value.length} item{skillsField.state.value.length !== 1 ? 's' : ''})
              </span>
            </label>

            {skillsField.state.value.map((_, i) => (
              <form.Field
                key={i}
                name={`skills[${i}].val`}
                validators={{
                  onChange: ({ value }) => value.length > 0 && value.length < 2 ? 'Min 2 characters' : undefined,
                }}
              >
                {(field) => (
                  <div style={{ display: 'flex', gap: 8, marginBottom: 8, alignItems: 'flex-start' }}>
                    <div style={{ flex: 1 }}>
                      <input
                        style={{ width: '100%', boxSizing: 'border-box', background: C.panel, border: `1px solid ${field.state.meta.errors[0] ? C.red : C.border}`, borderRadius: 8, padding: '11px 14px', color: C.text, fontSize: 14, outline: 'none', fontFamily: 'inherit' }}
                        placeholder="e.g. React, Node.js, Python"
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                      />
                      {field.state.meta.errors[0] && (
                        <p style={{ color: C.red, fontSize: 11, marginTop: 3 }}>⚠ {field.state.meta.errors[0]}</p>
                      )}
                    </div>
                    <button
                      onClick={() => skillsField.removeValue(i)}
                      disabled={skillsField.state.value.length === 1}
                      style={{ background: '#1a0e14', border: '1px solid #3a1a24', color: C.red, borderRadius: 8, padding: '11px 12px', cursor: skillsField.state.value.length === 1 ? 'not-allowed' : 'pointer', flexShrink: 0, opacity: skillsField.state.value.length === 1 ? 0.35 : 1, fontSize: 13 }}
                    >✕</button>
                  </div>
                )}
              </form.Field>
            ))}

            <button
              onClick={() => skillsField.pushValue({ val: '' })}
              style={{ width: '100%', background: 'transparent', border: `1px dashed ${C.dim}`, color: C.muted, borderRadius: 8, padding: '10px', fontSize: 13, fontWeight: 600, cursor: 'pointer', marginBottom: '1rem' }}
            >
              + Add Skill  (pushValue)
            </button>

            <div style={{ background: C.surface, borderRadius: 8, padding: '10px 14px', marginBottom: '1.25rem', border: `1px solid ${C.border}` }}>
              <p style={{ color: C.muted, fontSize: 10, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 8 }}>
                skills.state — array field
              </p>
              <StateChip label="length" value={`${skillsField.state.value.length}`} />
              <div style={{ marginTop: 6, paddingLeft: 4, fontFamily: 'JetBrains Mono, monospace', fontSize: 11 }}>
                {skillsField.state.value.map((sk, i) => (
                  <div key={i} style={{ color: sk.val ? '#a3c68c' : C.dim, lineHeight: 1.75 }}>
                    [{i}] &quot;{sk.val}&quot;
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </form.Field>

      <button
        onClick={form.handleSubmit}
        style={{ width: '100%', background: C.blue, color: 'white', border: 'none', borderRadius: 8, padding: '12px', fontSize: 14, fontWeight: 700, cursor: 'pointer' }}
      >
        Save Skills →
      </button>
    </div>
  );
}
