// ─── Async Helpers ────────────────────────────────────────────────────────────
export const sleep = (ms: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms));

// ─── Validation Helpers ───────────────────────────────────────────────────────
export const isValidEmail = (value: string): boolean =>
  /^[^@]+@[^@]+\.[^@]+$/.test(value);

export const isValidEmailLoose = (value: string): boolean =>
  /^[^@]+@[^@]+/.test(value);
