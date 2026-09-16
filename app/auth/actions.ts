'use server';

import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';

function loginUrl(key: 'error' | 'message', value: string) {
  const params = new URLSearchParams({ [key]: value });
  return `/login?${params.toString()}`;
}

export async function signIn(formData: FormData) {
  const email = String(formData.get('email') || '').trim();
  const password = String(formData.get('password') || '');

  if (!email || !password) {
    redirect(loginUrl('error', 'Email and password are required.'));
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) redirect(loginUrl('error', error.message));
  redirect('/');
}

export async function signUp(formData: FormData) {
  const email = String(formData.get('email') || '').trim();
  const password = String(formData.get('password') || '');
  const name = String(formData.get('name') || '').trim();

  if (!email || !password) {
    redirect(loginUrl('error', 'Email and password are required.'));
  }

  if (password.length < 8) {
    redirect(loginUrl('error', 'Password must have at least 8 characters.'));
  }

  const supabase = await createClient();
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${appUrl}/auth/callback`,
      data: name ? { name } : undefined,
    },
  });

  if (error) redirect(loginUrl('error', error.message));
  redirect(loginUrl('message', 'Account created. Check your email to confirm your account.'));
}

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect('/login');
}
