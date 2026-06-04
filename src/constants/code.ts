// ─── Code Snippets for the Demo Panels ───────────────────────────────────────
export const CODE: Record<string, string> = {
  login:
`// npm i @tanstack/react-form
import { useForm } from "@tanstack/react-form";

const form = useForm({
  defaultValues: { email: "", password: "" },
  onSubmit: async ({ value }) => {
    await loginUser(value); // ✅ Fully typed
  },
});

// Render prop — field is fully self-contained
<form.Field name="email">
  {(field) => (
    <div>
      <input
        value={field.state.value}
        onChange={(e) => field.handleChange(e.target.value)}
        onBlur={field.handleBlur}
      />
      {field.state.meta.errors.map((err) => (
        <span key={err}>{err}</span>
      ))}
    </div>
  )}
</form.Field>

// Subscribe ONLY re-renders when canSubmit changes ✅
<form.Subscribe selector={(s) => s.canSubmit}>
  {(canSubmit) => (
    <button
      disabled={!canSubmit}
      onClick={form.handleSubmit}
    >
      Sign In
    </button>
  )}
</form.Subscribe>`,

  async:
`// ✅ Multi-trigger validator pipeline
<form.Field
  name="email"
  validators={{
    // Sync: fires immediately on change
    onChange: ({ value }) =>
      !value
        ? "Required"
        : !/^[^@]+@[^@]+$/.test(value)
        ? "Invalid email format"
        : undefined,

    // Async: only runs when sync passes ✅
    onChangeAsync: async ({ value }) => {
      const exists = await checkEmailExists(value);
      return exists
        ? "Email already registered"
        : undefined;
    },

    // Built-in debounce — no lodash needed ✅
    onChangeAsyncDebounceMs: 500,
  }}
>
  {(field) => (
    <div>
      <input
        value={field.state.value}
        onChange={(e) => field.handleChange(e.target.value)}
      />

      {/* Free loading state ✅ */}
      {field.state.meta.isValidating && (
        <span>Checking availability...</span>
      )}

      {field.state.meta.errors.join(", ")}
    </div>
  )}
</form.Field>`,

  dependent:
`// Country resets dependent state field ✅
<form.Field name="country">
  {(countryField) => (
    <select
      value={countryField.state.value}
      onChange={(e) => {
        countryField.handleChange(e.target.value);
        // Typed cross-field reset ✅
        form.setFieldValue("state", "");
      }}
    >
      {COUNTRIES.map((c) => (
        <option key={c}>{c}</option>
      ))}
    </select>
  )}
</form.Field>

{/* ONLY re-renders when country changes ✅ */}
<form.Subscribe selector={(s) => s.values.country}>
  {(country) => (
    <form.Field name="state">
      {(stateField) => (
        <select
          disabled={!country}
          value={stateField.state.value}
          onChange={(e) =>
            stateField.handleChange(e.target.value)
          }
        >
          {STATES[country]?.map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>
      )}
    </form.Field>
  )}
</form.Subscribe>`,

  array:
`// mode="array" enables array operations ✅
<form.Field name="skills" mode="array">
  {(skillsField) => (
    <div>
      {skillsField.state.value.map((_, i) => (
        <form.Field
          key={i}
          name={\`skills[\${i}]\`}
          validators={{
            onChange: ({ value }) =>
              value.length < 2
                ? "Min 2 characters"
                : undefined,
          }}
        >
          {(field) => (
            <div style={{ display: "flex", gap: 8 }}>
              <input
                value={field.state.value}
                onChange={(e) =>
                  field.handleChange(e.target.value)
                }
              />
              {/* Built-in remove ✅ */}
              <button onClick={() =>
                skillsField.removeValue(i)
              }>
                Remove
              </button>
            </div>
          )}
        </form.Field>
      ))}

      {/* Built-in add ✅ */}
      <button onClick={() => skillsField.pushValue("")}>
        + Add Skill
      </button>
    </div>
  )}
</form.Field>`,

  enterprise:
`// ✅ One FormApi — shared across all steps
const form = useForm<EmployeeForm>({
  defaultValues: {
    firstName: "", lastName: "", email: "",
    department: "", role: "", startDate: "",
    systemAccess: [], reportingManager: "",
  },
  onSubmit: async ({ value }) => {
    try {
      await createEmployee(value);
      router.push("/success");
    } catch (error) {
      // ✅ Map server errors back to fields
      Object.entries(error.fieldErrors).forEach(
        ([field, msg]) =>
          form.setFieldMeta(field, (meta) => ({
            ...meta, errors: [msg],
          }))
      );
    }
  },
});

// Each step receives the same form instance
{step === 1 && <PersonalInfoStep form={form} />}
{step === 2 && <RoleStep form={form} />}
{step === 3 && <AccessStep form={form} />}

// ✅ Validate only current step's fields
const advance = async () => {
  const e1 = await form.validateField("email","change");
  const e2 = await form.validateField("firstName","change");
  if (!e1 && !e2) setStep((s) => s + 1);
};`,
};
