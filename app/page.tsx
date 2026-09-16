import {
  Activity,
  Bot,
  BrainCircuit,
  ChevronDown,
  CircleDot,
  FolderKanban,
  Inbox,
  LayoutDashboard,
  Play,
  Plus,
  Search,
  Settings,
  Sparkles,
  Users,
} from 'lucide-react';

const agents = [
  { name: 'SEO Analyst', description: 'Monitora posições, páginas e oportunidades.', status: 'Ativo', runs: 128 },
  { name: 'Competitor Scout', description: 'Acompanha concorrentes e novas movimentações.', status: 'Ativo', runs: 82 },
  { name: 'Knowledge Agent', description: 'Responde usando a base interna da empresa.', status: 'Ativo', runs: 214 },
  { name: 'QA Agent', description: 'Analisa requisitos e sugere cenários de teste.', status: 'Pausado', runs: 41 },
];

const events = [
  ['Competitor Scout', 'Encontrou 3 mudanças em concorrentes', 'há 8 min'],
  ['SEO Analyst', 'Detectou queda de posição em 4 páginas', 'há 24 min'],
  ['Knowledge Agent', 'Concluiu análise de 12 documentos', 'há 1 h'],
];

export default function Home() {
  return (
    <main className="app-shell">
      <aside className="sidebar">
        <div className="workspace">
          <div className="logo"><Sparkles size={16} /></div>
          <div><strong>Acme Inc.</strong><span>Workspace</span></div>
          <ChevronDown size={14} className="workspace-chevron" />
        </div>

        <button className="search"><Search size={15} /><span>Buscar</span><kbd>⌘ K</kbd></button>

        <nav>
          <a className="active"><LayoutDashboard size={16} />Overview</a>
          <a><Inbox size={16} />Inbox<span className="badge">6</span></a>
          <a><Bot size={16} />Agentes</a>
          <a><Activity size={16} />Execuções</a>
          <a><FolderKanban size={16} />Projetos</a>
          <a><BrainCircuit size={16} />Knowledge</a>
        </nav>

        <div className="sidebar-section">
          <p>Workspace</p>
          <a><Users size={16} />Membros</a>
          <a><Settings size={16} />Configurações</a>
        </div>

        <div className="sidebar-footer">
          <div className="avatar">JC</div>
          <div><strong>João Centrone</strong><span>Founder</span></div>
        </div>
      </aside>

      <section className="content">
        <header className="topbar">
          <div><span>Acme Inc.</span><span>/</span><strong>Overview</strong></div>
          <button className="ghost"><Plus size={15} /> Novo agente</button>
        </header>

        <div className="page">
          <div className="page-heading">
            <div><p className="eyebrow">AGENTS OS</p><h1>Bom trabalho começa com contexto.</h1><p>Veja o que seus agentes estão fazendo, o que descobriram e onde precisam de você.</p></div>
            <button className="primary"><Play size={15} fill="currentColor" /> Executar agente</button>
          </div>

          <div className="stats">
            <div className="stat"><span>Execuções hoje</span><strong>37</strong><small>+18% vs. ontem</small></div>
            <div className="stat"><span>Agentes ativos</span><strong>3</strong><small>de 4 configurados</small></div>
            <div className="stat"><span>Itens na Inbox</span><strong>6</strong><small>2 precisam de aprovação</small></div>
            <div className="stat"><span>Créditos usados</span><strong>62%</strong><small>12.4k / 20k</small></div>
          </div>

          <div className="grid">
            <section className="panel agents-panel">
              <div className="panel-title"><div><h2>Agentes</h2><p>Seu time digital trabalhando em segundo plano.</p></div><button className="link-button">Ver todos</button></div>
              <div className="agent-list">
                {agents.map((agent) => (
                  <div className="agent-row" key={agent.name}>
                    <div className="agent-icon"><Bot size={17} /></div>
                    <div className="agent-copy"><strong>{agent.name}</strong><span>{agent.description}</span></div>
                    <span className={`status ${agent.status === 'Pausado' ? 'paused' : ''}`}><CircleDot size={12} />{agent.status}</span>
                    <span className="runs">{agent.runs} runs</span>
                    <button className="icon-button"><Play size={14} /></button>
                  </div>
                ))}
              </div>
            </section>

            <section className="panel activity-panel">
              <div className="panel-title"><div><h2>Atividade recente</h2><p>Últimas descobertas dos agentes.</p></div></div>
              <div className="timeline">
                {events.map(([agent, text, time]) => (
                  <div className="event" key={text}>
                    <div className="event-dot" />
                    <div><strong>{agent}</strong><p>{text}</p><span>{time}</span></div>
                  </div>
                ))}
              </div>
              <button className="inbox-button">Abrir Inbox <span>→</span></button>
            </section>
          </div>
        </div>
      </section>
    </main>
  );
}
