import {
  Activity,
  Bot,
  BrainCircuit,
  ChevronDown,
  CircleDot,
  Command,
  FileText,
  FolderKanban,
  Inbox,
  LayoutDashboard,
  Play,
  Plus,
  Search,
  Settings,
  Sparkles,
  Users,
  Zap,
} from 'lucide-react';

const agents = [
  {
    name: 'SEO Analyst',
    description: 'Monitora rankings, páginas e oportunidades de crescimento.',
    status: 'Ativo',
    runs: 128,
    lastRun: 'há 8 min',
  },
  {
    name: 'Competitor Scout',
    description: 'Acompanha concorrentes, lançamentos e mudanças relevantes.',
    status: 'Ativo',
    runs: 82,
    lastRun: 'há 24 min',
  },
  {
    name: 'Knowledge Agent',
    description: 'Responde usando documentos e contexto interno da empresa.',
    status: 'Ativo',
    runs: 214,
    lastRun: 'há 1 h',
  },
  {
    name: 'QA Agent',
    description: 'Analisa requisitos e sugere cenários e riscos de teste.',
    status: 'Pausado',
    runs: 41,
    lastRun: 'ontem',
  },
];

const activity = [
  ['Competitor Scout', 'Encontrou 3 mudanças importantes em concorrentes', '8 min'],
  ['SEO Analyst', 'Detectou queda de posição em 4 páginas', '24 min'],
  ['Knowledge Agent', 'Concluiu a análise de 12 documentos', '1 h'],
  ['QA Agent', 'Gerou 18 cenários para o fluxo de checkout', 'ontem'],
];

export default function Home() {
  return (
    <main className="wm-shell">
      <aside className="wm-sidebar">
        <div className="wm-brand">
          <div className="wm-brand-mark"><Sparkles size={17} /></div>
          <div className="wm-brand-copy">
            <strong>Agents OS</strong>
            <span>AI workspace</span>
          </div>
        </div>

        <button className="wm-workspace" type="button">
          <div className="wm-workspace-icon">A</div>
          <div>
            <strong>Acme Inc.</strong>
            <span>Developer</span>
          </div>
          <ChevronDown size={15} />
        </button>

        <button className="wm-search" type="button">
          <Search size={15} />
          <span>Search</span>
          <kbd><Command size={11} />K</kbd>
        </button>

        <nav className="wm-nav">
          <p>Workspace</p>
          <a className="active"><LayoutDashboard size={17} /><span>Overview</span></a>
          <a><Inbox size={17} /><span>Inbox</span><b>6</b></a>
          <a><Bot size={17} /><span>Agents</span></a>
          <a><Activity size={17} /><span>Runs</span></a>
          <a><FolderKanban size={17} /><span>Projects</span></a>
          <a><BrainCircuit size={17} /><span>Knowledge</span></a>
        </nav>

        <nav className="wm-nav wm-nav-secondary">
          <p>Manage</p>
          <a><Users size={17} /><span>Members</span></a>
          <a><Settings size={17} /><span>Settings</span></a>
        </nav>

        <div className="wm-sidebar-footer">
          <div className="wm-avatar">JC</div>
          <div>
            <strong>João Centrone</strong>
            <span>Founder</span>
          </div>
          <ChevronDown size={14} />
        </div>
      </aside>

      <section className="wm-stage">
        <div className="wm-app">
          <header className="wm-topbar">
            <div className="wm-breadcrumb">
              <span>Acme Inc.</span>
              <span>/</span>
              <strong>Overview</strong>
            </div>
            <div className="wm-top-actions">
              <button className="wm-button wm-button-ghost" type="button">
                <FileText size={15} /> Docs
              </button>
              <button className="wm-button wm-button-primary" type="button">
                <Plus size={15} /> New agent
              </button>
            </div>
          </header>

          <div className="wm-page">
            <section className="wm-heading">
              <div>
                <span className="wm-kicker">AGENTS OS</span>
                <h1>Your AI team, in one workspace.</h1>
                <p>Track what your agents are doing, review discoveries and launch new work without losing context.</p>
              </div>
              <button className="wm-button wm-button-primary wm-run" type="button">
                <Play size={15} fill="currentColor" /> Run agent
              </button>
            </section>

            <section className="wm-chips">
              <div className="wm-chip"><FolderKanban size={16} /><strong>Acme Inc.</strong></div>
              <div className="wm-chip"><Bot size={16} />4 agents</div>
              <div className="wm-chip"><Zap size={16} />Developer plan</div>
              <div className="wm-chip wm-chip-accent"><CircleDot size={15} />3 active now</div>
            </section>

            <div className="wm-divider" />

            <section className="wm-metrics">
              <article>
                <span>Runs today</span>
                <strong>37</strong>
                <small>+18% vs. yesterday</small>
              </article>
              <article>
                <span>Active agents</span>
                <strong>3</strong>
                <small>of 4 configured</small>
              </article>
              <article>
                <span>Inbox</span>
                <strong>6</strong>
                <small>2 need approval</small>
              </article>
              <article>
                <span>Usage</span>
                <strong>62%</strong>
                <small>12.4k / 20k credits</small>
              </article>
            </section>

            <section className="wm-content-grid">
              <div className="wm-section">
                <div className="wm-section-head">
                  <div>
                    <div className="wm-section-title"><Bot size={18} /><h2>Agents</h2><span className="wm-badge">4 total</span></div>
                    <p>Your digital team and their latest execution state.</p>
                  </div>
                  <button className="wm-button wm-button-outline" type="button"><Plus size={15} />Create agent</button>
                </div>

                <div className="wm-list">
                  {agents.map((agent) => (
                    <article className="wm-agent" key={agent.name}>
                      <div className="wm-agent-icon"><Bot size={18} /></div>
                      <div className="wm-agent-copy">
                        <strong>{agent.name}</strong>
                        <span>{agent.description}</span>
                        <div className="wm-agent-meta"><span>{agent.runs} runs</span><i /> <span>Last run {agent.lastRun}</span></div>
                      </div>
                      <span className={`wm-status ${agent.status === 'Pausado' ? 'paused' : ''}`}><CircleDot size={12} />{agent.status}</span>
                      <button className="wm-icon-button" type="button" aria-label={`Run ${agent.name}`}><Play size={14} /></button>
                    </article>
                  ))}
                </div>
              </div>

              <aside className="wm-activity-card">
                <div className="wm-section-head compact">
                  <div>
                    <div className="wm-section-title"><Activity size={18} /><h2>Activity</h2></div>
                    <p>Latest discoveries from your workspace.</p>
                  </div>
                </div>

                <div className="wm-timeline">
                  {activity.map(([agent, text, time]) => (
                    <div className="wm-event" key={text}>
                      <div className="wm-event-line"><span /></div>
                      <div>
                        <strong>{agent}</strong>
                        <p>{text}</p>
                        <small>{time}</small>
                      </div>
                    </div>
                  ))}
                </div>

                <button className="wm-button wm-button-outline wm-full" type="button">Open Inbox <span>→</span></button>
              </aside>
            </section>
          </div>
        </div>
      </section>
    </main>
  );
}
