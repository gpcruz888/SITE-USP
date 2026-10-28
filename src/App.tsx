import { lazy, Suspense } from 'react'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { WhatsAppFab } from '@/components/layout/WhatsAppFab'
import { StickyCta } from '@/components/layout/StickyCta'
import { HeroHighlight } from '@/components/layout/HeroHighlight'
import { Hero } from '@/sections/Hero'
import { OQueE } from '@/sections/OQueE'
import { UspEca } from '@/sections/UspEca'
import { ParaQuem } from '@/sections/ParaQuem'
import { PensamentoEstrategico } from '@/sections/PensamentoEstrategico'
import { ExperienciaPresencial } from '@/sections/ExperienciaPresencial'
import { Programa } from '@/sections/Programa'
import { CorpoDocente } from '@/sections/CorpoDocente'
import { Trajetoria } from '@/sections/Trajetoria'
import { Turma2027 } from '@/sections/Turma2027'
import { ProcessoSeletivo } from '@/sections/ProcessoSeletivo'
import { Faq } from '@/sections/Faq'
import { Encerramento } from '@/sections/Encerramento'
import { PoliticaPrivacidade } from '@/pages/PoliticaPrivacidade'

const AdminApp = lazy(() => import('@/admin/AdminApp'))
const PublicApplication = lazy(() => import('@/admin/PublicApplication'))

export default function App() {
  if (/^\/admin(?:\/|$)/.test(window.location.pathname)) return <Suspense fallback={<div role="status" style={{padding:40}}>Carregando…</div>}><AdminApp /></Suspense>
  if (window.location.pathname === '/inscricao') return <Suspense fallback={<div role="status" style={{padding:40}}>Carregando…</div>}><PublicApplication /></Suspense>
  if (window.location.pathname === '/politica-de-privacidade') return <PoliticaPrivacidade />
  return <PublicHome />
}

function PublicHome() {
  return (
    <>
      <a
        href="#conteudo-principal"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-sm focus:border focus:border-blue focus:bg-white focus:px-5 focus:py-3 focus:text-sm focus:font-medium focus:text-blue focus:shadow-md"
      >
        Ir para o conteúdo principal
      </a>
      <Header />
      <main id="conteudo-principal">
        <Hero />
        <HeroHighlight />
        <OQueE />
        <UspEca />
        <ParaQuem />
        <PensamentoEstrategico />
        <ExperienciaPresencial />
        <Programa />
        <CorpoDocente />
        {/* VideoPlaceholder volta quando o vídeo institucional estiver pronto. */}
        <Trajetoria />
        <Turma2027 />
        <ProcessoSeletivo />
        <Faq />
        <Encerramento />
      </main>
      <StickyCta />
      <WhatsAppFab />
      <Footer />
    </>
  )
}
