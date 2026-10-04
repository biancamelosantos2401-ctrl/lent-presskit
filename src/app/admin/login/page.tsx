'use client';

import Image from 'next/image';
import { signIn } from 'next-auth/react';
import { FormEvent, useState } from 'react';

export default function LoginPage() {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setError(''); setLoading(true);
    const form = new FormData(event.currentTarget);
    const result = await signIn('credentials', { email: form.get('email'), password: form.get('password'), redirect: false });
    setLoading(false);
    if (result?.error) setError('E-mail ou senha inválidos.'); else window.location.href = '/admin';
  }

  return <main className="login-shell"><section className="login-card"><Image src="/brand/lent-logo.png" alt="LENT" width={240} height={150} priority /><h1>Painel do artista</h1><p>Gerencie o conteúdo do EPK sem alterar a identidade visual.</p><form className="login-form" onSubmit={submit}><div className="field"><label htmlFor="email">E-mail</label><input id="email" name="email" type="email" autoComplete="username" required /></div><div className="field"><label htmlFor="password">Senha</label><input id="password" name="password" type="password" autoComplete="current-password" required /></div>{error ? <span className="error-text">{error}</span> : null}<button className="primary-button" type="submit" disabled={loading}>{loading ? 'Entrando...' : 'Entrar'}</button></form></section></main>;
}
