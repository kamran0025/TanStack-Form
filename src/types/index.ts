// ─── Tab Types ────────────────────────────────────────────────────────────────
export type TabId = 'login' | 'async' | 'dependent' | 'array' | 'enterprise';

export interface TabConfig {
  id: TabId;
  label: string;
  color: string;
  code: string;
}

// ─── Form Value Types ─────────────────────────────────────────────────────────
export interface LoginValues {
  email: string;
  password: string;
}

export interface AsyncValues {
  email: string;
}

export interface DependentValues {
  country: string;
  state: string;
  city: string;
}

export interface SkillItem {
  id: number;
  val: string;
}

export interface EnterpriseValues {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  department: string;
  role: string;
  startDate: string;
  systemAccess: string[];
  reportingManager: string;
}

// ─── Validation Types ─────────────────────────────────────────────────────────
export type FormErrors<T> = Partial<Record<keyof T, string>>;
export type TouchedFields<T> = Partial<Record<keyof T, boolean>>;

// ─── Component Prop Types ─────────────────────────────────────────────────────
export interface FLProps {
  label?: string;
  error?: string | false | null;
  hint?: string | null;
  required?: boolean;
  children: React.ReactNode;
}

export interface SuccessScreenProps {
  icon: string;
  title: string;
  sub: string;
  onReset: () => void;
}

export interface StateChipProps {
  label: string;
  value: boolean | string;
}

export interface CodePanelProps {
  code: string;
}
