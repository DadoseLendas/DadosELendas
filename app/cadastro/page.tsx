'use client'

import { useState } from 'react'
import { createClient } from '@supabase/supabase-js'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

// Inicializa o Supabase
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export default function SignupPage() {
  const router = useRouter()
  
  // Estados do Formulário
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    nickname: '',
    displayName: ''
  })
  
  const [loading, setLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)
  const [successMsg, setSuccessMsg] = useState<string | null>(null)

  // Função genérica para atualizar os inputs
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  // Validação de segurança da senha
  const isPasswordStrong = (pass: string) => {
    // Mínimo 8 caracteres, 1 maiúscula, 1 número, 1 caractere especial
    const strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})");
    return strongRegex.test(pass);
  }

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMsg(null)
    setLoading(true)

    // 1. Validações Locais
    if (formData.password !== formData.confirmPassword) {
      setErrorMsg("As senhas não coincidem.")
      setLoading(false)
      return
    }

    if (!isPasswordStrong(formData.password)) {
      setErrorMsg("A senha deve ter no mínimo 8 caracteres, incluindo uma letra maiúscula e um número.")
      setLoading(false)
      return
    }

    // 2. Envia para o Supabase
    // Note que passamos display_name e nickname nos 'options'
    const { data, error } = await supabase.auth.signUp({
      email: formData.email,
      password: formData.password,
      options: {
        data: {
          display_name: formData.displayName,
          nickname: formData.nickname,
          // avatar_url: '' // Podemos adicionar depois
        }
      }
    })

    if (error) {
      setErrorMsg(error.message)
      setLoading(false)
    } else {
      setSuccessMsg("Cadastro realizado com sucesso! Verifique seu email para confirmar a conta.")
      setLoading(false)
      // Opcional: Redirecionar após alguns segundos
      // setTimeout(() => router.push('/login'), 3000)
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-900 p-4 text-white">
      <div className="w-full max-w-md space-y-6 rounded-xl bg-slate-800 p-8 shadow-2xl border border-slate-700">
        
        <div className="text-center">
          <h1 className="text-3xl font-bold text-emerald-400">Crie sua Conta</h1>
          <p className="text-slate-400 text-sm mt-1">Junte-se à aventura em Dados & Lendas</p>
        </div>

        {/* Mensagens de Feedback */}
        {errorMsg && (
          <div className="rounded bg-red-500/20 p-3 text-sm text-red-200 border border-red-500/50">
            {errorMsg}
          </div>
        )}
        {successMsg && (
          <div className="rounded bg-green-500/20 p-3 text-sm text-green-200 border border-green-500/50">
            {successMsg}
          </div>
        )}

        {/* Formulário */}
        {!successMsg && (
          <form onSubmit={handleSignup} className="space-y-4">
            
            {/* Nickname e Display Name (Lado a Lado) */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Nickname (Único)</label>
                <input
                  name="nickname"
                  type="text"
                  required
                  placeholder="@gandalf"
                  onChange={handleChange}
                  className="w-full rounded bg-slate-900 border border-slate-600 p-2 text-sm focus:border-emerald-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Nome de Exibição</label>
                <input
                  name="displayName"
                  type="text"
                  required
                  placeholder="Mago Cinzento"
                  onChange={handleChange}
                  className="w-full rounded bg-slate-900 border border-slate-600 p-2 text-sm focus:border-emerald-500 outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Email</label>
              <input
                name="email"
                type="email"
                required
                onChange={handleChange}
                className="w-full rounded bg-slate-900 border border-slate-600 p-2 text-sm focus:border-emerald-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Senha</label>
              <input
                name="password"
                type="password"
                required
                onChange={handleChange}
                className="w-full rounded bg-slate-900 border border-slate-600 p-2 text-sm focus:border-emerald-500 outline-none"
              />
              <p className="text-[10px] text-slate-500 mt-1">Min. 8 caracteres, 1 maiúscula e 1 número.</p>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Confirmar Senha</label>
              <input
                name="confirmPassword"
                type="password"
                required
                onChange={handleChange}
                className={`w-full rounded bg-slate-900 border p-2 text-sm outline-none ${
                  formData.confirmPassword && formData.password !== formData.confirmPassword 
                    ? 'border-red-500' 
                    : 'border-slate-600 focus:border-emerald-500'
                }`}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-emerald-600 px-4 py-3 font-bold text-white transition hover:bg-emerald-700 disabled:opacity-50 mt-4"
            >
              {loading ? 'Criando Mago...' : 'Cadastrar'}
            </button>
          </form>
        )}

        <p className="text-center text-sm text-slate-500">
          Já tem uma conta? <Link href="/login" className="text-emerald-400 hover:underline">Faça Login</Link>
        </p>
      </div>
    </div>
  )
}