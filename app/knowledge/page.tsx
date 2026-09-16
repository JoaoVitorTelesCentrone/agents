import { BrainCircuit, FileText, Link2, Plus, Search, Upload } from 'lucide-react';
import { AppShell } from '@/components/app-shell';

const docs=[
  ['Product requirements Q3.pdf','PDF','42 pages','Indexed','2 h'],
  ['Help center','URL','126 pages','Indexed','5 h'],
  ['Engineering handbook.md','Markdown','18 sections','Indexed','yesterday'],
  ['Sales playbook.docx','DOCX','31 pages','Processing','now'],
];

export default function KnowledgePage(){
  return <AppShell active="knowledge" title="Knowledge" primaryHref="/knowledge" primaryLabel="Add source">
    <div className="wm-page">
      <section className="wm-heading wm-heading-top"><div><span className="wm-kicker">COMPANY MEMORY</span><h1>Knowledge</h1><p>Give agents reliable context from documents, URLs and internal sources.</p></div><button className="wm-button wm-button-primary wm-run"><Upload size={15}/>Upload files</button></section>
      <section className="wm-grid-3" style={{marginTop:28}}>
        <article className="wm-card wm-card-pad"><div className="wm-agent-icon"><Upload size={18}/></div><h3 style={{marginTop:14}}>Upload files</h3><p>PDF, DOCX, Markdown, TXT and more.</p><button className="wm-button wm-button-outline" style={{marginTop:14}}><Plus size={14}/>Choose files</button></article>
        <article className="wm-card wm-card-pad"><div className="wm-agent-icon"><Link2 size={18}/></div><h3 style={{marginTop:14}}>Add website</h3><p>Crawl a public documentation or help center URL.</p><button className="wm-button wm-button-outline" style={{marginTop:14}}>Add URL</button></article>
        <article className="wm-card wm-card-pad"><div className="wm-agent-icon"><BrainCircuit size={18}/></div><h3 style={{marginTop:14}}>Knowledge status</h3><p>187 sources · 2,481 chunks · synced today.</p><div className="wm-progress" style={{marginTop:18}}><span style={{width:'82%'}}/></div></article>
      </section>
      <div className="wm-toolbar"><div className="wm-search-field"><Search size={15}/><input className="wm-input" placeholder="Search knowledge..."/></div></div>
      <section className="wm-section"><table className="wm-table"><thead><tr><th>Source</th><th>Type</th><th>Size</th><th>Status</th><th>Updated</th></tr></thead><tbody>{docs.map(([name,type,size,status,updated])=><tr key={name}><td><strong><FileText size={13} style={{verticalAlign:'middle',marginRight:7}}/>{name}</strong></td><td>{type}</td><td>{size}</td><td><span className={`wm-badge ${status==='Indexed'?'wm-badge-green':''}`}>{status}</span></td><td>{updated}</td></tr>)}</tbody></table></section>
    </div>
  </AppShell>;
}
