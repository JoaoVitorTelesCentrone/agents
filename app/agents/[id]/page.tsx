import { Bot, CircleDot, Play, Send, Settings2, Wrench } from 'lucide-react';
import { AppShell } from '@/components/app-shell';

const names: Record<string,string> = {
  'seo-analyst':'SEO Analyst',
  'competitor-scout':'Competitor Scout',
  'knowledge-agent':'Knowledge Agent',
  'qa-agent':'QA Agent',
};

export default async function AgentDetailPage({ params }: { params: Promise<{ id: string }> }){
  const { id } = await params;
  const name = names[id] ?? 'AI Agent';
  return <AppShell active="agents" title={name} primaryHref="/agents/new" primaryLabel="New agent">
    <div className="wm-page">
      <section className="wm-heading wm-heading-top"><div><span className="wm-kicker">AGENT DETAIL</span><h1>{name}</h1><p>Chat with the agent, inspect its configuration and review recent executions.</p></div><div className="wm-filter-group"><span className="wm-status"><CircleDot size={12}/>Active</span><button className="wm-button wm-button-primary wm-run"><Play size={15} fill="currentColor"/>Run now</button></div></section>
      <section className="wm-grid-3" style={{marginTop:26}}><article className="wm-card wm-card-pad"><span style={{fontSize:10,color:'#777b84'}}>RUNS</span><h3 style={{fontSize:26,marginTop:8}}>128</h3><p>92% success rate</p></article><article className="wm-card wm-card-pad"><span style={{fontSize:10,color:'#777b84'}}>LAST RUN</span><h3 style={{fontSize:18,marginTop:8}}>8 min ago</h3><p>4 findings generated</p></article><article className="wm-card wm-card-pad"><span style={{fontSize:10,color:'#777b84'}}>MODEL</span><h3 style={{fontSize:18,marginTop:8}}>GPT</h3><p>Provider configured in Settings</p></article></section>
      <section className="wm-grid-2" style={{marginTop:16,gridTemplateColumns:'minmax(0,1.5fr) minmax(280px,.6fr)'}}>
        <div className="wm-section wm-chat">
          <div className="wm-chat-stream">
            <div className="wm-message"><div className="wm-message-avatar"><Bot size={15}/></div><div className="wm-message-bubble">I’m ready. Ask me to analyze the project, review new data, or start a focused run.</div></div>
            <div className="wm-message user"><div className="wm-message-bubble">What changed since the last run?</div></div>
            <div className="wm-message"><div className="wm-message-avatar"><Bot size={15}/></div><div className="wm-message-bubble">I found four meaningful changes. Two require review, one is informational, and one can be turned into a task. The backend will replace this mock conversation with streamed model responses and persisted messages.</div></div>
          </div>
          <div className="wm-chat-composer"><div className="wm-composer-box"><textarea placeholder={`Message ${name}...`}/><button className="wm-icon-button" aria-label="Send"><Send size={15}/></button></div></div>
        </div>
        <div className="wm-stack">
          <div className="wm-card wm-card-pad"><div className="wm-section-title"><Settings2 size={17}/><h2>Configuration</h2></div><div className="wm-kv"><span>Status</span><span>Active</span></div><div className="wm-kv"><span>Project</span><span>Website Growth</span></div><div className="wm-kv"><span>Schedule</span><span>Every 6 hours</span></div></div>
          <div className="wm-card wm-card-pad"><div className="wm-section-title"><Wrench size={17}/><h2>Tools</h2></div><div className="wm-stat-row"><span>Web search</span><strong>Enabled</strong></div><div className="wm-stat-row"><span>Knowledge</span><strong>Enabled</strong></div><div className="wm-stat-row"><span>SEO API</span><strong>Enabled</strong></div></div>
          <div className="wm-code">agent_id: {id}\nworkspace: acme-inc\nmode: supervised</div>
        </div>
      </section>
    </div>
  </AppShell>;
}
