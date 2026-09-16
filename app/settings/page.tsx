import { CreditCard, KeyRound, Plug, Save, Settings2 } from 'lucide-react';
import { AppShell } from '@/components/app-shell';

export default function SettingsPage(){
  return <AppShell active="settings" title="Settings" primaryHref="/settings" primaryLabel="Save changes">
    <div className="wm-page">
      <section className="wm-heading wm-heading-top"><div><span className="wm-kicker">WORKSPACE CONFIG</span><h1>Settings</h1><p>Configure workspace defaults, AI providers, integrations, usage and billing.</p></div><button className="wm-button wm-button-primary wm-run"><Save size={15}/>Save changes</button></section>
      <div className="wm-tabs" style={{marginTop:28}}><a className="active">General</a><a>AI providers</a><a>Integrations</a><a>Billing</a></div>
      <section className="wm-section" style={{marginTop:16}}>
        <div className="wm-card-pad">
          <div className="wm-section-title"><Settings2 size={18}/><h2>General</h2></div>
          <div className="wm-form-row"><div className="wm-form-label"><strong>Workspace name</strong><span>Displayed across the product.</span></div><div className="wm-form-control"><input className="wm-input" defaultValue="Acme Inc."/></div></div>
          <div className="wm-form-row"><div className="wm-form-label"><strong>Default timezone</strong><span>Used for schedules and run history.</span></div><div className="wm-form-control"><select className="wm-select" defaultValue="America/Sao_Paulo" style={{height:40,padding:'0 12px'}}><option>America/Sao_Paulo</option><option>UTC</option></select></div></div>
        </div>
      </section>
      <section className="wm-grid-3" style={{marginTop:16}}>
        <article className="wm-card wm-card-pad"><div className="wm-agent-icon"><KeyRound size={18}/></div><h3 style={{marginTop:14}}>AI providers</h3><p>OpenAI, Gemini and DeepSeek keys. Stored server-side only.</p><span className="wm-badge wm-badge-yellow" style={{display:'inline-block',marginTop:14}}>Not connected</span></article>
        <article className="wm-card wm-card-pad"><div className="wm-agent-icon"><Plug size={18}/></div><h3 style={{marginTop:14}}>Integrations</h3><p>Search, SEO data, Slack/webhooks and external APIs.</p><span className="wm-badge" style={{display:'inline-block',marginTop:14}}>0 connected</span></article>
        <article className="wm-card wm-card-pad"><div className="wm-agent-icon"><CreditCard size={18}/></div><h3 style={{marginTop:14}}>Billing</h3><p>Developer plan · 20k monthly credits · 62% used.</p><div className="wm-progress" style={{marginTop:16}}><span style={{width:'62%'}}/></div></article>
      </section>
      <div className="wm-note" style={{marginTop:16}}>Backend phase will wire these cards to environment variables and provider records. No secret will be committed to Git.</div>
    </div>
  </AppShell>;
}
