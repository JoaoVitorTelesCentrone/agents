import { CheckCircle2, Clock3, LoaderCircle, Play, Search, XCircle } from 'lucide-react';
import { AppShell } from '@/components/app-shell';

const runs = [
  ['#RUN-128','SEO Analyst','Completed','3.2s','4 findings','8 min'],
  ['#RUN-127','Competitor Scout','Completed','8.7s','3 findings','24 min'],
  ['#RUN-126','Knowledge Agent','Running','1m 12s','—','now'],
  ['#RUN-125','QA Agent','Failed','2.1s','—','yesterday'],
  ['#RUN-124','Knowledge Agent','Completed','22.8s','12 docs','yesterday'],
];

export default function RunsPage(){
  return <AppShell active="runs" title="Runs" primaryHref="/agents" primaryLabel="Run agent">
    <div className="wm-page">
      <section className="wm-heading wm-heading-top"><div><span className="wm-kicker">EXECUTION HISTORY</span><h1>Runs</h1><p>Inspect execution status, duration, outputs and failures for every agent run.</p></div><button className="wm-button wm-button-primary wm-run"><Play size={15} fill="currentColor"/>New run</button></section>
      <div className="wm-toolbar"><div className="wm-search-field"><Search size={15}/><input className="wm-input" placeholder="Search runs..."/></div><div className="wm-filter-group"><span className="wm-badge wm-badge-green">92% success</span></div></div>
      <section className="wm-section"><table className="wm-table"><thead><tr><th>Run</th><th>Agent</th><th>Status</th><th>Duration</th><th>Output</th><th>Started</th></tr></thead><tbody>
        {runs.map(([id,agent,status,duration,output,started])=><tr key={id}><td><strong>{id}</strong></td><td>{agent}</td><td>{status==='Completed'?<span className="wm-badge wm-badge-green"><CheckCircle2 size={11}/> {status}</span>:status==='Running'?<span className="wm-badge"><LoaderCircle size={11}/> {status}</span>:<span className="wm-badge wm-badge-red"><XCircle size={11}/> {status}</span>}</td><td><Clock3 size={12} style={{verticalAlign:'middle',marginRight:5}}/>{duration}</td><td>{output}</td><td>{started}</td></tr>)}
      </tbody></table></section>
    </div>
  </AppShell>;
}
