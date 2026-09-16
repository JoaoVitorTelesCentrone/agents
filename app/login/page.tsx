import { Bot, LogIn, Sparkles, UserPlus } from 'lucide-react';
import { signIn, signUp } from '@/app/auth/actions';

type LoginPageProps = {
  searchParams: Promise<{ error?: string; message?: string }>;
};

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const params = await searchParams;

  return (
    <main className="wm-auth-page">
      <section className="wm-auth-card">
        <div className="wm-auth-brand">
          <div className="wm-brand-mark"><Bot size={18} /></div>
          <div>
            <strong>Agents OS</strong>
            <span>Your AI team, in one workspace.</span>
          </div>
        </div>

        <div className="wm-auth-copy">
          <span className="wm-kicker">WELCOME</span>
          <h1>Sign in to your workspace.</h1>
          <p>Run agents, review discoveries and keep company knowledge in one place.</p>
        </div>

        {params.error ? <div className="wm-auth-alert error">{params.error}</div> : null}
        {params.message ? <div className="wm-auth-alert success">{params.message}</div> : null}

        <div className="wm-auth-grid">
          <form action={signIn} className="wm-auth-form">
            <div className="wm-section-title"><LogIn size={17} /><h2>Sign in</h2></div>
            <label>
              <span>Email</span>
              <input className="wm-input" type="email" name="email" autoComplete="email" required />
            </label>
            <label>
              <span>Password</span>
              <input className="wm-input" type="password" name="password" autoComplete="current-password" required />
            </label>
            <button className="wm-button wm-button-primary" type="submit">Sign in</button>
          </form>

          <form action={signUp} className="wm-auth-form">
            <div className="wm-section-title"><UserPlus size={17} /><h2>Create account</h2></div>
            <label>
              <span>Name</span>
              <input className="wm-input" type="text" name="name" autoComplete="name" />
            </label>
            <label>
              <span>Email</span>
              <input className="wm-input" type="email" name="email" autoComplete="email" required />
            </label>
            <label>
              <span>Password</span>
              <input className="wm-input" type="password" name="password" minLength={8} autoComplete="new-password" required />
            </label>
            <button className="wm-button wm-button-outline" type="submit"><Sparkles size={15} />Create account</button>
          </form>
        </div>
      </section>
    </main>
  );
}
