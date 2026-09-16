import { Check, CircleAlert, Clock3, Inbox, Search } from 'lucide-react';
import { AppShell } from '@/components/app-shell';

const items = [
  ['Competitor Scout','Concorrente lançou uma nova página de pricing','Encontramos alterações relevantes em pricing e posicionamento.','Needs review','8 min'],
  ['SEO Analyst','4 páginas perderam posição','As páginas /pricing, /features, /blog/seo e /compare caíram mais de 5 posições.','Alert','24 min'],
  ['Knowledge Agent','12 documentos foram indexados','A nova base já está disponível para respostas do Knowledge Agent.','Done','1 h'],
  ['QA Agent','18 cenários aguardam aprovação','Novos cenários para checkout, cupom e pagamento foram gerados.','Needs review','ontem'],
];

export default function InboxPage(){
  return <AppShell active="inbox" title="Inbox" primaryHref="/agents" primaryLabel="Run agent">
    <div className="wm-page">
      <section className="wm-heading wm-heading-top"><div><span className="wm-kicker">REVIEW QUEUE</span><h1>Inbox</h1><p>Everything your agents found that deserves your attention, approval or action.</p></div></section>
      <div className="wm-toolbar"><div className="wm-search-field"><Search size={15}/><input className="wm-input" placeholder="Search inbox..."/></div><div className="wm-filter-group"><span className="wm-badge">6 open</span><span className="wm-badge wm-badge-yellow">2 approvals</span></div></div>
      <section className="wm-section">
        <table className="wm-table"><thead><tr><th>Agent</th><th>Item</th><th>Status</th><th>When</th></tr></thead><tbody>
          {items.map(([agent,title,description,status,time])=><tr key={title}><td><strong>{agent}</strong></td><td><strong>{title}</strong><div style={{color:'#777b84',marginTop:4}}>{description}</div></td><td>{status==='Done'?<span className="wm-badge wm-badge-green"><Check size={11}/> {status}</span>:status==='Alert'?<span className="wm-badge wm-badge-red"><CircleAlert size={11}/> {status}</span>:<span className="wm-badge wm-badge-yellow"><Inbox size={11}/> {status}</span>}</td><td><Clock3 size={12} style={{verticalAlign:'middle',marginRight:5}}/>{time}</td></tr>)}
        </tbody></table>
      </section>
    </div>
  </AppShell>;
}
