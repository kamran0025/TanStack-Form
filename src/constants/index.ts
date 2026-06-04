import type { TabConfig } from '../types';
import { COLORS } from '../styles/tokens';
import { CODE } from './code';

// ─── Static Data ──────────────────────────────────────────────────────────────
export const STATES_MAP: Record<string, string[]> = {
  India:  ['Maharashtra', 'Karnataka', 'Delhi', 'Tamil Nadu', 'Gujarat', 'Rajasthan'],
  USA:    ['California', 'New York', 'Texas', 'Florida', 'Washington', 'Colorado'],
  UK:     ['England', 'Scotland', 'Wales', 'Northern Ireland'],
  Canada: ['Ontario', 'Quebec', 'British Columbia', 'Alberta'],
};

export const TAKEN_EMAILS: string[] = [
  'test@test.com',
  'admin@company.com',
  'demo@tanstack.com',
];

export const DEPARTMENTS: string[] = [
  'Engineering', 'Product', 'Design', 'Marketing', 'Sales', 'HR',
];

export const ROLES_MAP: Record<string, string[]> = {
  Engineering: ['Frontend Dev', 'Backend Dev', 'DevOps', 'Engineering Manager'],
  Product:     ['Product Manager', 'Product Analyst', 'Head of Product'],
  Design:      ['UI Designer', 'UX Researcher', 'Design Lead'],
  Marketing:   ['Marketing Manager', 'Content Writer', 'SEO Specialist'],
  Sales:       ['Account Executive', 'Sales Manager', 'SDR'],
  HR:          ['HR Manager', 'Recruiter', 'People Ops'],
};

export const SYSTEMS: string[] = [
  'GitHub', 'Jira', 'Confluence', 'Slack', 'AWS Console', 'Figma', 'HubSpot', 'Notion',
];

// ─── Tabs Config ──────────────────────────────────────────────────────────────
export const TABS: TabConfig[] = [
  { id: 'login',      label: '1. Login Form',       color: COLORS.green,  code: 'login' },
  { id: 'async',      label: '2. Async Validation',  color: COLORS.yellow, code: 'async' },
  { id: 'dependent',  label: '3. Dependent Fields',  color: COLORS.purple, code: 'dependent' },
  { id: 'array',      label: '4. Array Fields',      color: COLORS.blue,   code: 'array' },
  { id: 'enterprise', label: '5. Enterprise Form',   color: COLORS.ts,     code: 'enterprise' },
];

export { CODE };
