import Link from 'next/link';
import { Bot, FolderKanban, Plus, Search } from 'lucide-react';
import { AppShell } from '@/components/app-shell';

const projects=[
  ['Website Growth','SEO + competitor monitoring','3 agents','18 runs today','Active'],
  ['Checkout Quality','QA automation and regression planning','1 agent','7 runs today','Active'],
  ['Internal Knowledge','Company docs and internal answers','1 agent','12 runs today','Active'],
];

export default function ProjectsPage(){
  return <AppShell active="projects" title="Projects" primaryHref="/projects" primaryLabel="New project">
    <div className="wm-page">
      <section className="wm-heading wm-heading-top"><div><span className="wm-kicker">WORK CONTEXT</span><h1>Projects</h1><p>Group agents, knowledge and executions by product, client or business objective.</p></div><button className="wm-button wm-button-primary wm-run"><Plus size={15}/>New project</button></section>
      <div className="wm-toolbar"><div className="wm-search-field"><Search size={15}/><input className="wm-input" placeholder="Search projects..."/></div></div>
      <section className="wm-grid-3">
        {projects.map(([name,desc,agents,runs,status])=><article className="wm-card wm-card-pad" key={name}><div className="wm-agent-icon" style={{marginBottom:16}}><FolderKanban size={18}/></div><h3>{name}</h3><p>{desc}</p><div className="wm-divider" style={{margin:'18px 0'}}/><div className="wm-stat-row"><span><Bot size={12} style={{verticalAlign:'middle',marginRight:5}}/>{agents}</span><strong>{runs}</strong></div><div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginTop:14}}><span className="wm-badge wm-badge-green">{status}</span><Link className="wm-button wm-button-outline" href="/agents">Open</Link></div></article>)}
      </section>
    </div>
  </AppShell>;
}
