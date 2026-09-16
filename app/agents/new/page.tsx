import { Bot, BrainCircuit, Globe2, Save, Wrench } from 'lucide-react';
import { AppShell } from '@/components/app-shell';

export default function NewAgentPage(){
  return <AppShell active="agents" title="New agent" primaryHref="/agents" primaryLabel="Back to agents">
    <div className="wm-page">
      <section className="wm-heading wm-heading-top"><div><span className="wm-kicker">CREATE AGENT</span><h1>Build a specialized agent.</h1><p>Define the role, instructions, model, tools and knowledge this agent can use.</p></div><button className="wm-button wm-button-primary wm-run"><Save size={15}/>Create agent</button></section>
      <section className="wm-grid-2" style={{marginTop:28}}>
        <div className="wm-section"><div className="wm-card-pad"><div className="wm-section-title"><Bot size={18}/><h2>Identity</h2></div>
          <div className="wm-form-row"><div className="wm-form-label"><strong>Name</strong><span>Short, clear and task-oriented.</span></div><div className="wm-form-control"><input className="wm-input" placeholder="e.g. SEO Analyst"/></div></div>
          <div className="wm-form-row"><div className="wm-form-label"><strong>Description</strong><span>What this agent is responsible for.</span></div><div className="wm-form-control"><textarea className="wm-textarea" placeholder="Monitor search visibility and identify growth opportunities."/></div></div>
          <div className="wm-form-row"><div className="wm-form-label"><strong>System instructions</strong><span>The agent's permanent behavior and boundaries.</span></div><div className="wm-form-control"><textarea className="wm-textarea" style={{minHeight:180}} placeholder="You are an SEO analyst for..."/></div></div>
        </div></div>
        <div className="wm-stack">
          <div className="wm-card wm-card-pad"><div className="wm-section-title"><BrainCircuit size={18}/><h2>Model</h2></div><p>Provider and model will be wired in the backend phase.</p><select className="wm-select" style={{height:40,padding:'0 12px',marginTop:14}} defaultValue="openai"><option value="openai">OpenAI · GPT</option><option value="gemini">Google · Gemini</option><option value="deepseek">DeepSeek</option></select></div>
          <div className="wm-card wm-card-pad"><div className="wm-section-title"><Wrench size={18}/><h2>Tools</h2></div><p>Select capabilities the agent may invoke.</p><label className="wm-stat-row"><span><Globe2 size={13} style={{verticalAlign:'middle',marginRight:6}}/>Web search</span><input className="wm-checkbox" type="checkbox" defaultChecked/></label><label className="wm-stat-row"><span>Knowledge base</span><input className="wm-checkbox" type="checkbox" defaultChecked/></label><label className="wm-stat-row"><span>SEO data API</span><input className="wm-checkbox" type="checkbox"/></label></div>
          <div className="wm-note">No API key belongs in this form. Secrets will live in environment/provider configuration only.</div>
        </div>
      </section>
    </div>
  </AppShell>;
}
