import { Mail, Plus, ShieldCheck, Users } from 'lucide-react';
import { AppShell } from '@/components/app-shell';

const members=[
  ['JC','João Centrone','joao@acme.com','Owner','Active'],
  ['MV','Marina Vieira','marina@acme.com','Admin','Active'],
  ['RS','Rafael Silva','rafael@acme.com','Member','Active'],
];

export default function MembersPage(){
  return <AppShell active="members" title="Members" primaryHref="/members" primaryLabel="Invite member">
    <div className="wm-page">
      <section className="wm-heading wm-heading-top"><div><span className="wm-kicker">WORKSPACE ACCESS</span><h1>Members</h1><p>Manage who can access the workspace and what they are allowed to do.</p></div><button className="wm-button wm-button-primary wm-run"><Plus size={15}/>Invite member</button></section>
      <section className="wm-metrics" style={{marginTop:28}}><article><span>Total members</span><strong>3</strong><small>All active</small></article><article><span>Admins</span><strong>2</strong><small>Owner included</small></article><article><span>Pending invites</span><strong>1</strong><small>Expires in 5 days</small></article><article><span>Seats</span><strong>3/10</strong><small>Developer plan</small></article></section>
      <section className="wm-section" style={{marginTop:26}}><table className="wm-table"><thead><tr><th>Member</th><th>Email</th><th>Role</th><th>Status</th></tr></thead><tbody>{members.map(([initials,name,email,role,status])=><tr key={email}><td><div style={{display:'flex',alignItems:'center',gap:9}}><div className="wm-avatar">{initials}</div><strong>{name}</strong></div></td><td><Mail size={12} style={{verticalAlign:'middle',marginRight:5}}/>{email}</td><td><ShieldCheck size={12} style={{verticalAlign:'middle',marginRight:5}}/>{role}</td><td><span className="wm-badge wm-badge-green">{status}</span></td></tr>)}</tbody></table></section>
    </div>
  </AppShell>;
}
