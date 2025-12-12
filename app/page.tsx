import Link from 'next/link'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col">
      
      {/* --- NAVBAR --- */}
      <header className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          
          {/* Logo */}
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-500 bg-clip-text text-transparent">
              DADOS & LENDAS
            </span>
          </div>

          {/* Links de Navegação (Desktop) */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
            <a href="#funcionalidades" className="hover:text-emerald-400 transition">Funcionalidades</a>
            <a href="#blog" className="hover:text-emerald-400 transition">Novidades</a>
            <a href="#" className="hover:text-emerald-400 transition">Sobre Nós</a>
          </nav>

          {/* Botões de Ação (AQUI ESTÁ A SUA RESPOSTA) */}
          <div className="flex items-center gap-4">
            {/* Botão Discreto para quem já é usuário */}
            <Link 
              href="/login" 
              className="text-sm font-semibold text-slate-300 hover:text-white transition"
            >
              Entrar
            </Link>

            {/* Botão Chamativo para novos usuários (CTA) */}
            <Link 
              href="/cadastro" 
              className="rounded-full bg-emerald-600 px-5 py-2 text-sm font-bold text-white transition hover:bg-emerald-500 hover:shadow-lg hover:shadow-emerald-500/20"
            >
              Criar Conta Grátis
            </Link>
          </div>
        </div>
      </header>

      {/* --- HERO SECTION (Apresentação) --- */}
      <section className="flex-1 flex flex-col items-center justify-center text-center px-4 py-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]">
        <div className="max-w-3xl space-y-6">
          <span className="inline-block px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-bold border border-emerald-500/20">
            BETA ABERTO DISPONÍVEL
          </span>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-white">
            Sua aventura começa <span className="text-emerald-400">aqui</span>.
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            A plataforma brasileira completa para mestres e jogadores. 
            Fichas, mapas, dados e histórias em um só lugar. Gratuito e em português.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link 
              href="/cadastro" 
              className="w-full sm:w-auto rounded-lg bg-emerald-600 px-8 py-4 text-lg font-bold text-white transition hover:bg-emerald-500"
            >
              Começar Aventura
            </Link>
            <Link 
              href="#funcionalidades" 
              className="w-full sm:w-auto rounded-lg border border-slate-700 bg-slate-800 px-8 py-4 text-lg font-bold text-white transition hover:bg-slate-700"
            >
              Saber mais
            </Link>
          </div>
        </div>
      </section>

      {/* --- FUNCIONALIDADES (Grid) --- */}
      <section id="funcionalidades" className="py-20 bg-slate-800/50">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Tudo o que você precisa</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="p-6 rounded-xl bg-slate-900 border border-slate-800 hover:border-emerald-500/50 transition">
              <div className="w-12 h-12 bg-emerald-500/10 rounded-lg flex items-center justify-center text-emerald-400 mb-4 text-2xl">
                📜
              </div>
              <h3 className="text-xl font-bold mb-2">Fichas Automatizadas</h3>
              <p className="text-slate-400">Crie personagens complexos em minutos. Cálculos automáticos e inventário inteligente.</p>
            </div>

            {/* Card 2 */}
            <div className="p-6 rounded-xl bg-slate-900 border border-slate-800 hover:border-purple-500/50 transition">
              <div className="w-12 h-12 bg-purple-500/10 rounded-lg flex items-center justify-center text-purple-400 mb-4 text-2xl">
                🎲
              </div>
              <h3 className="text-xl font-bold mb-2">Rolagem 3D</h3>
              <p className="text-slate-400">Dados realistas com física 3D sincronizados em tempo real para todos na mesa.</p>
            </div>

            {/* Card 3 */}
            <div className="p-6 rounded-xl bg-slate-900 border border-slate-800 hover:border-amber-500/50 transition">
              <div className="w-12 h-12 bg-amber-500/10 rounded-lg flex items-center justify-center text-amber-400 mb-4 text-2xl">
                🗺️
              </div>
              <h3 className="text-xl font-bold mb-2">Mapas Táticos</h3>
              <p className="text-slate-400">Grid de batalha interativo com tokens, medição de distância e Fog of War.</p>
            </div>
          </div>
        </div>
      </section>

      {/* --- BLOG / NOVIDADES --- */}
      <section id="blog" className="py-20">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
            <span className="w-2 h-8 bg-emerald-500 rounded-full"></span>
            Últimas do Blog
          </h2>

          <div className="space-y-6">
            {/* Post 1 */}
            <article className="flex flex-col md:flex-row gap-6 p-6 rounded-xl bg-slate-800/40 border border-slate-800 hover:bg-slate-800 transition cursor-pointer">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2 text-sm">
                  <span className="text-emerald-400 font-bold">Atualização</span>
                  <span className="text-slate-500">• 10 Dez 2025</span>
                </div>
                <h3 className="text-xl font-bold mb-2">O Beta Aberto chegou!</h3>
                <p className="text-slate-400">Estamos felizes em anunciar o lançamento oficial do beta. Teste agora as novas fichas de D&D 5e.</p>
              </div>
            </article>

            {/* Post 2 */}
            <article className="flex flex-col md:flex-row gap-6 p-6 rounded-xl bg-slate-800/40 border border-slate-800 hover:bg-slate-800 transition cursor-pointer">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2 text-sm">
                  <span className="text-purple-400 font-bold">Comunidade</span>
                  <span className="text-slate-500">• 08 Dez 2025</span>
                </div>
                <h3 className="text-xl font-bold mb-2">Dicas para Mestres Iniciantes</h3>
                <p className="text-slate-400">Confira nosso guia completo de como preparar sua primeira sessão sem estresse.</p>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="border-t border-slate-800 py-12 text-center text-slate-500 text-sm">
        <p>&copy; 2025 Dados & Lendas. Feito com ❤️ para a comunidade de RPG.</p>
      </footer>

    </div>
  )
}