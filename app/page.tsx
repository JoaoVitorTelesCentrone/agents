import Link from 'next/link';
import { Activity, Bot, CircleDot, FolderKanban, Play, Plus, Zap } from 'lucide-react';
import { AppShell } from '@/components/app-shell';

const agents = [
  { id: 'seo-analyst', name: 'SEO Analyst', description: 'Monitora rankings, páginas e oportunidades de crescimento.', status: 'Ativo', runs: 128, lastRun: 'há 8 min' },
  { id: 'competitor-scout', name: 'Competitor Scout', description: 'Acompanha concorrentes, lançamentos e mudanças relevantes.', status: 'Ativo', runs: 82, lastRun: 'há 24 min' },
  { id: 'knowledge-agent', name: 'Knowledge Agent', description: 'Responde usando documentos e contexto interno da empresa.', status: 'Ativo', runs: 214, lastRun: 'há 1 h' },
  { id: 'qa-agent', name: 'QA Agent', description: 'Analisa requisitos e sugere cenários e riscos de teste.', status: 'Pausado', runs: 41, lastRun: 'ontem' },
];

const activity = [
  ['Competitor Scout', 'Encontrou 3 mudanças importantes em concorrentes', '8 min'],
  ['SEO Analyst', 'Detectou queda de posição em 4 páginas', '24 min'],
  ['Knowledge Agent', 'Concluiu a análise de 12 documentos', '1 h'],
  ['QA Agent', 'Gerou 18 cenários para o fluxo de checkout', 'ontem'],
];

export default function Home() {
  return (
    <AppShell active="overview" title="Overview">
      <div className="wm-page">
        <section className="wm-heading">
          <div>
            <span className="wm-kicker">AGENTS OS</span>
            <h1>Your AI team, in one workspace.</h1>
            <p>Track what your agents are doing, review discoveries and launch new work without losing context.</p>
          </div>
          <Link className="wm-button wm-button-primary wm-run" href="/agents"><Play size={15} fill="currentColor" /> Run agent</Link>
        </section>

        <section className="wm-chips">
          <div className="wm-chip"><FolderKanban size={16} /><strong>Acme Inc.</strong></div>
          <div className="wm-chip"><Bot size={16} />4 agents</div>
          <div className="wm-chip"><Zap size={16} />Developer plan</div>
          <div className="wm-chip wm-chip-accent"><CircleDot size={15} />3 active now</div>
        </section>

        <div className="wm-divider" />

        <section className="wm-metrics">
          <article><span>Runs today</span><strong>37</strong><small>+18% vs. yesterday</small></article>
          <article><span>Active agents</span><strong>3</strong><small>of 4 configured</small></article>
          <article><span>Inbox</span><strong>6</strong><small>2 need approval</small></article>
          <article><span>Usage</span><strong>62%</strong><small>12.4k / 20k credits</small></article>
        </section>

        <section className="wm-content-grid">
          <div className="wm-section">
            <div className="wm-section-head">
              <div>
                <div className="wm-section-title"><Bot size={18} /><h2>Agents</h2><span className="wm-badge">4 total</span></div>
                <p>Your digital team and their latest execution state.</p>
              </div>
              <Link className="wm-button wm-button-outline" href="/agents/new"><Plus size={15} />Create agent</Link>
            </div>
            <div className="wm-list">
              {agents.map((agent) => (
                <article className="wm-agent" key={agent.name}>
                  <div className="wm-agent-icon"><Bot size={18} /></div>
                  <div className="wm-agent-copy">
                    <Link href={`/agents/${agent.id}`} style={{ color: 'inherit', textDecoration: 'none' }}><strong>{agent.name}</strong></Link>
                    <span>{agent.description}</span>
                    <div className="wm-agent-meta"><span>{agent.runs} runs</span><i /><span>Last run {agent.lastRun}</span></div>
                  </div>
                  <span className={`wm-status ${agent.status === 'Pausado' ? 'paused' : ''}`}><CircleDot size={12} />{agent.status}</span>
                  <Link className="wm-icon-button" href={`/agents/${agent.id}`} aria-label={`Open ${agent.name}`}><Play size={14} /></Link>
                </article>
              ))}
            </div>
          </div>

          <aside className="wm-activity-card">
            <div className="wm-section-head compact"><div><div className="wm-section-title"><Activity size={18} /><h2>Activity</h2></div><p>Latest discoveries from your workspace.</p></div></div>
            <div className="wm-timeline">
              {activity.map(([agent, text, time]) => (
                <div className="wm-event" key={text}><div className="wm-event-line"><span /></div><div><strong>{agent}</strong><p>{text}</p><small>{time}</small></div></div>
              ))}
            </div>
            <Link className="wm-button wm-button-outline wm-full" href="/inbox">Open Inbox <span>→</span></Link>
          </aside>
        </section>
      </div>
    </AppShell>
  );
}
