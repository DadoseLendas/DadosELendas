'use client'

import { useState } from 'react'
import { createClient } from '@supabase/supabase-js'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

// Inicializa o cliente Supabase com as chaves do seu .env.local
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)

  // Função de Login com Google
  const handleGoogleLogin = async () => {
    setLoading(true)
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${location.origin}/auth/callback`,
      },
    })
    if (error) setErrorMsg(error.message)
    // O redirecionamento acontece automaticamente pelo Supabase
  }

  // Função de Login com Email (Placeholder para o futuro)
  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      setErrorMsg(error.message)
      setLoading(false)
    } else {
      router.push('/menu') // Redireciona para o menu após sucesso
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-900 p-4 text-white">
      <div className="w-full max-w-md space-y-8 rounded-xl bg-slate-800 p-8 shadow-2xl border border-slate-700">
        
        {/* Cabeçalho */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-emerald-400 mb-2">Dados & Lendas</h1>
          <p className="text-slate-400">Entre para começar sua aventura</p>
        </div>

        {/* Mensagem de Erro */}
        {errorMsg && (
          <div className="rounded bg-red-500/20 p-3 text-sm text-red-200 border border-red-500/50">
            {errorMsg}
          </div>
        )}

        {/* Botão Google */}
        <button
          onClick={handleGoogleLogin}
          disabled={loading}
          className="flex w-full items-center justify-center gap-3 rounded-lg bg-white px-4 py-3 text-slate-900 font-bold transition hover:bg-slate-200 disabled:opacity-50"
        >
          <img 
            src="https://www.svgrepo.com/show/475656/google-color.svg" 
            alt="Google Logo" 
            className="h-5 w-5" 
          />
          {loading ? 'Carregando...' : 'Entrar com Google'}
        </button>

        <div className="relative flex items-center py-2">
          <div className="flex-grow border-t border-slate-600"></div>
          <span className="mx-4 flex-shrink text-slate-500 text-sm">OU</span>
          <div className="flex-grow border-t border-slate-600"></div>
        </div>

        {/* Formulário de Email */}
        <form onSubmit={handleEmailLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-300">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full rounded-lg bg-slate-900 border border-slate-600 p-2.5 text-white focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none"
              placeholder="seu@email.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300">Senha</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full rounded-lg bg-slate-900 border border-slate-600 p-2.5 text-white focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none"
              placeholder="••••••••"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-emerald-600 px-4 py-3 font-bold text-white transition hover:bg-emerald-700 disabled:opacity-50"
          >
            {loading ? 'Entrando...' : 'Entrar com Email'}
          </button>
        </form>

        <p className="text-center text-sm text-slate-500">
          Ainda não tem conta? <Link href="/cadastro" className="text-emerald-400 hover:underline">Cadastre-se</Link>
        </p>
      </div>
    </div>
  )
}