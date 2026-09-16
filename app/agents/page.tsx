import Link from 'next/link';
import { Bot, CircleDot, Play, Plus, Search, SlidersHorizontal } from 'lucide-react';
import { AppShell } from '@/components/app-shell';

const agents = [
  ['seo-analyst', 'SEO Analyst', 'Monitora rankings, páginas e oportunidades.', 'Ativo', '128', '8 min'],
  ['competitor-scout', 'Competitor Scout', 'Acompanha concorrentes, releases e mudanças.', 'Ativo', '82', '24 min'],
  ['knowledge-agent', 'Knowledge Agent', 'Responde com a base de conhecimento interna.', 'Ativo', '214', '1 h'],
  ['qa-agent', 'QA Agent', 'Analisa requisitos, riscos e cenários de teste.', 'Pausado', '41', 'ontem'],
];

export default function AgentsPage() {
  return (
    <AppShell active="agents" title="Agents">
      <div className="wm-page">
        <section className="wm-heading wm-heading-top">
          <div><span className="wm-kicker">DIGITAL TEAM</span><h1>Agents</h1><p>Create specialized agents, define their tools and keep every execution observable.</p></div>
          <Link className="wm-button wm-button-primary wm-run" href="/agents/new"><Plus size={15}/>Create agent</Link>
        </section>
        <div className="wm-toolbar">
          <div className="wm-search-field"><Search size={15}/><input className="wm-input" placeholder="Search agents..." /></div>
          <div className="wm-filter-group"><button className="wm-button wm-button-outline"><SlidersHorizontal size={14}/>Filters</button><span className="wm-badge wm-badge-green">3 active</span></div>
        </div>
        <section className="wm-section">
          <div className="wm-list">
            {agents.map(([id,name,description,status,runs,lastRun]) => (
              <article className="wm-agent" key={id}>
                <div className="wm-agent-icon"><Bot size={18}/></div>
                <div className="wm-agent-copy"><Link href={`/agents/${id}`} style={{color:'inherit',textDecoration:'none'}}><strong>{name}</strong></Link><span>{description}</span><div className="wm-agent-meta"><span>{runs} runs</span><i/><span>Last run {lastRun}</span></div></div>
                <span className={`wm-status ${status === 'Pausado' ? 'paused' : ''}`}><CircleDot size={12}/>{status}</span>
                <Link className="wm-icon-button" href={`/agents/${id}`}><Play size={14}/></Link>
              </article>
            ))}
          </div>
        </section>
      </div>
    </AppShell>
  );
}
