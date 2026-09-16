import type { ReactNode } from 'react';
import Link from 'next/link';
import {
  Activity,
  Bot,
  BrainCircuit,
  ChevronDown,
  Command,
  FileText,
  FolderKanban,
  Inbox,
  LayoutDashboard,
  Plus,
  Search,
  Settings,
  Sparkles,
  Users,
} from 'lucide-react';

type NavKey = 'overview' | 'inbox' | 'agents' | 'runs' | 'projects' | 'knowledge' | 'members' | 'settings';

type AppShellProps = {
  active: NavKey;
  title: string;
  children: ReactNode;
  primaryHref?: string;
  primaryLabel?: string;
};

const nav = [
  ['overview', '/', LayoutDashboard, 'Overview'],
  ['inbox', '/inbox', Inbox, 'Inbox'],
  ['agents', '/agents', Bot, 'Agents'],
  ['runs', '/runs', Activity, 'Runs'],
  ['projects', '/projects', FolderKanban, 'Projects'],
  ['knowledge', '/knowledge', BrainCircuit, 'Knowledge'],
] as const;

const manage = [
  ['members', '/members', Users, 'Members'],
  ['settings', '/settings', Settings, 'Settings'],
] as const;

export function AppShell({ active, title, children, primaryHref = '/agents/new', primaryLabel = 'New agent' }: AppShellProps) {
  return (
    <main className="wm-shell">
      <aside className="wm-sidebar">
        <Link href="/" className="wm-brand" style={{ textDecoration: 'none', color: 'inherit' }}>
          <div className="wm-brand-mark"><Sparkles size={17} /></div>
          <div className="wm-brand-copy"><strong>Agents OS</strong><span>AI workspace</span></div>
        </Link>

        <button className="wm-workspace" type="button">
          <div className="wm-workspace-icon">A</div>
          <div><strong>Acme Inc.</strong><span>Developer</span></div>
          <ChevronDown size={15} />
        </button>

        <button className="wm-search" type="button"><Search size={15} /><span>Search</span><kbd><Command size={11} />K</kbd></button>

        <nav className="wm-nav">
          <p>Workspace</p>
          {nav.map(([key, href, Icon, label]) => (
            <Link key={key} href={href} className={active === key ? 'active' : undefined}>
              <Icon size={17} /><span>{label}</span>{key === 'inbox' ? <b>6</b> : null}
            </Link>
          ))}
        </nav>

        <nav className="wm-nav wm-nav-secondary">
          <p>Manage</p>
          {manage.map(([key, href, Icon, label]) => (
            <Link key={key} href={href} className={active === key ? 'active' : undefined}>
              <Icon size={17} /><span>{label}</span>
            </Link>
          ))}
        </nav>

        <div className="wm-sidebar-footer">
          <div className="wm-avatar">JC</div>
          <div><strong>João Centrone</strong><span>Founder</span></div>
          <ChevronDown size={14} />
        </div>
      </aside>

      <section className="wm-stage">
        <div className="wm-app">
          <header className="wm-topbar">
            <div className="wm-breadcrumb"><span>Acme Inc.</span><span>/</span><strong>{title}</strong></div>
            <div className="wm-top-actions">
              <button className="wm-button wm-button-ghost" type="button"><FileText size={15} /> Docs</button>
              <Link className="wm-button wm-button-primary" href={primaryHref}><Plus size={15} /> {primaryLabel}</Link>
            </div>
          </header>
          {children}
        </div>
      </section>
    </main>
  );
}
