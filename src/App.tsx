import { useState, useEffect } from 'react';
import { COLORS as C } from './styles/tokens';
import { TABS, CODE } from './constants';
import { CodePanel } from './components/CodePanel';
import { LoginForm } from './forms/LoginForm';
import { AsyncForm } from './forms/AsyncForm';
import { DependentForm } from './forms/DependentForm';
import { ArrayForm } from './forms/ArrayForm';
import { EnterpriseForm } from './forms/EnterpriseForm';
import type { TabId } from './types';

const COMPONENTS: Record<TabId, React.ComponentType> = {
  login:      LoginForm,
  async:      AsyncForm,
  dependent:  DependentForm,
  array:      ArrayForm,
  enterprise: EnterpriseForm,
};

export default function App() {
  const [tab, setTab]           = useState<TabId>('login');
  const [showCode, setShowCode] = useState(false);

  const current = TABS.find((t) => t.id === tab)!;
  const isEnterprise = tab === 'enterprise';
  const Demo = COMPONENTS[tab];

  // Load fonts
  useEffect(() => {
    const link = document.createElement('link');
    link.rel  = 'stylesheet';
    link.href =
      'https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500&family=Outfit:wght@400;500;600;700;800&display=swap';
    document.head.appendChild(link);
  }, []);

  return (
    <div
      style={{
        background: C.bg, color: C.text, height: '100vh',
        display: 'flex', flexDirection: 'column',
        fontFamily: 'Outfit, system-ui, sans-serif', overflow: 'hidden',
      }}
    >
      {/* ── Header ─────────────────────────────────────────────────────────── */}
      <div
        style={{
          background: C.panel, borderBottom: `1px solid ${C.border}`,
          padding: '11px 20px', display: 'flex', alignItems: 'center',
          justifyContent: 'space-between', flexShrink: 0,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span
            style={{
              background: '#f9731620', border: '1px solid #f9731650',
              borderRadius: 6, padding: '3px 10px', color: C.ts,
              fontSize: 11, fontWeight: 700, letterSpacing: '0.07em',
            }}
          >
            🟠 LIVE DEMO
          </span>
          <span style={{ fontWeight: 800, fontSize: 15 }}>TanStack Form · Microsession</span>
          <span style={{ color: C.dim }}>·</span>
          <span style={{ color: current.color, fontSize: 13, fontWeight: 600 }}>
            {current.label}
          </span>
        </div>
        {!isEnterprise && (
          <button
            onClick={() => setShowCode((s) => !s)}
            style={{
              background: 'transparent', border: `1px solid ${C.border}`, color: C.muted,
              borderRadius: 7, padding: '6px 12px', cursor: 'pointer',
              fontSize: 12, fontWeight: 600,
            }}
          >
            {showCode ? '▼ Hide Code' : '▶ Show Code'}
          </button>
        )}
      </div>

      {/* ── Tab Bar ────────────────────────────────────────────────────────── */}
      <div
        style={{
          background: C.panel, borderBottom: `1px solid ${C.border}`,
          display: 'flex', overflowX: 'auto', flexShrink: 0,
        }}
      >
        {TABS.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            style={{
              background: 'transparent', border: 'none',
              borderBottom: `2px solid ${tab === t.id ? t.color : 'transparent'}`,
              padding: '11px 18px', cursor: 'pointer',
              color: tab === t.id ? t.color : C.muted,
              fontSize: 13, fontWeight: tab === t.id ? 700 : 500,
              whiteSpace: 'nowrap', transition: 'color 0.15s',
            }}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* ── Content ────────────────────────────────────────────────────────── */}
      <div style={{ flex: 1, display: 'flex', overflow: 'hidden', minHeight: 0 }}>

        {isEnterprise ? (
          <div style={{ flex: 1, overflow: 'auto' }}>
            <EnterpriseForm key="enterprise" />
          </div>
        ) : (
          <>
            {/* Left: Code panel */}
            {showCode && (
              <div
                style={{
                  width: '46%', flexShrink: 0, borderRight: `1px solid ${C.border}`,
                  display: 'flex', flexDirection: 'column', overflow: 'hidden', minHeight: 0,
                }}
              >
                <div
                  style={{
                    padding: '8px 16px', borderBottom: `1px solid ${C.border}`,
                    flexShrink: 0, display: 'flex', alignItems: 'center', gap: 8,
                  }}
                >
                  <span style={{ color: C.muted, fontSize: 10, fontWeight: 700, letterSpacing: '0.08em' }}>
                    TANSTACK FORM — CODE
                  </span>
                </div>
                <div style={{ flex: 1, overflow: 'hidden', minHeight: 0 }}>
                  <CodePanel code={CODE[current.code]} />
                </div>
              </div>
            )}

            {/* Right: Live form preview */}
            <div
              style={{
                flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', minHeight: 0,
              }}
            >
              <div
                style={{
                  padding: '8px 16px', borderBottom: `1px solid ${C.border}`,
                  flexShrink: 0, display: 'flex', alignItems: 'center', gap: 8,
                }}
              >
                <span style={{ color: C.muted, fontSize: 10, fontWeight: 700, letterSpacing: '0.08em' }}>
                  LIVE PREVIEW
                </span>
                <span
                  style={{
                    background: `${current.color}18`, color: current.color,
                    border: `1px solid ${current.color}35`, borderRadius: 99,
                    padding: '1px 8px', fontSize: 10, fontWeight: 700,
                  }}
                >
                  INTERACTIVE
                </span>
              </div>
              <div style={{ flex: 1, overflow: 'auto', minHeight: 0 }}>
                <Demo key={tab} />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
