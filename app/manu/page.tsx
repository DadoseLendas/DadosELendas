'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@supabase/supabase-js'
import { useRouter } from 'next/navigation'

// Inicializa Supabase
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export default function MenuPage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // 1. Verifica se tem usuário logado
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      
      if (!session) {
        router.push('/login') // Se não tiver sessão, chuta pro login
      } else {
        setUser(session.user)
        setLoading(false)
      }
    }

    checkUser()
  }, [router])

  // Função de Logout
  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/login')
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-900 text-emerald-500">
        <div className="animate-spin h-8 w-8 border-4 border-emerald-500 border-t-transparent rounded-full"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      {/* Navbar Simples */}
      <nav className="border-b border-slate-700 bg-slate-800 px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-emerald-400 tracking-wider">DADOS & LENDAS</h1>
        <div className="flex items-center gap-4">
          <span className="text-sm text-slate-400 hidden sm:block">
            {user?.email}
          </span>
          <button 
            onClick={handleLogout}
            className="text-sm bg-red-500/10 text-red-400 px-3 py-1.5 rounded hover:bg-red-500/20 transition"
          >
            Sair
          </button>
        </div>
      </nav>

      {/* Conteúdo Principal */}
      <main className="p-6 max-w-6xl mx-auto">
        <header className="mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">Painel do Aventureiro</h2>
          <p className="text-slate-400">Selecione uma ferramenta para começar sua sessão.</p>
        </header>

        {/* Grid de Ferramentas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* Card: Fichas */}
          <div className="group cursor-pointer rounded-xl bg-slate-800 p-6 border border-slate-700 hover:border-emerald-500 transition-all hover:shadow-lg hover:shadow-emerald-500/10">
            <div className="h-12 w-12 rounded-lg bg-emerald-500/20 flex items-center justify-center mb-4 text-emerald-400 group-hover:scale-110 transition">
              {/* Ícone de Ficha/Papel */}
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2 group-hover:text-emerald-400">Minhas Fichas</h3>
            <p className="text-slate-400 text-sm">Crie, edite e gerencie seus personagens e NPCs.</p>
          </div>

          {/* Card: Campanhas */}
          <div className="group cursor-pointer rounded-xl bg-slate-800 p-6 border border-slate-700 hover:border-purple-500 transition-all hover:shadow-lg hover:shadow-purple-500/10">
            <div className="h-12 w-12 rounded-lg bg-purple-500/20 flex items-center justify-center mb-4 text-purple-400 group-hover:scale-110 transition">
              {/* Ícone de Mapa */}
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2 group-hover:text-purple-400">Campanhas</h3>
            <p className="text-slate-400 text-sm">Gerencie suas mesas, mapas e convide jogadores.</p>
          </div>

          {/* Card: Rolagem */}
          <div className="group cursor-pointer rounded-xl bg-slate-800 p-6 border border-slate-700 hover:border-amber-500 transition-all hover:shadow-lg hover:shadow-amber-500/10">
            <div className="h-12 w-12 rounded-lg bg-amber-500/20 flex items-center justify-center mb-4 text-amber-400 group-hover:scale-110 transition">
              {/* Ícone de Dado (Cubo) */}
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2 group-hover:text-amber-400">Dados</h3>
            <p className="text-slate-400 text-sm">Rolador de dados 3D em tempo real.</p>
          </div>

        </div>
      </main>
    </div>
  )
}