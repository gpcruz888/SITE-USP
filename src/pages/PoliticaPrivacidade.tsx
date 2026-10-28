import { useEffect } from 'react'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { WhatsAppFab } from '@/components/layout/WhatsAppFab'

export function PoliticaPrivacidade() {
  useEffect(() => {
    const previous = document.title
    document.title = 'Política de Privacidade | Gestcorp ECA-USP'
    return () => {
      document.title = previous
    }
  }, [])

  return (
    <>
      <a
        href="#conteudo-principal"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-sm focus:border focus:border-blue focus:bg-white focus:px-5 focus:py-3 focus:text-sm focus:font-medium focus:text-blue focus:shadow-md"
      >
        Ir para o conteúdo principal
      </a>
      <Header variant="solid" />
      <main id="conteudo-principal" className="bg-cream-light">
        <article className="container-site max-w-3xl pt-32 pb-20 md:pt-40 md:pb-28">
          <h1 className="text-title-md text-blue-deep">Política de Privacidade</h1>
          <p className="mt-4 text-sm text-graphite-muted">Última atualização: [data].</p>
          <p className="mt-6 text-[1.0625rem] leading-relaxed text-graphite-muted">
            Esta política explica como o Gestcorp, Especialização em Gestão Estratégica em Comunicação
            Organizacional e Relações Públicas da ECA-USP, coleta, usa, armazena e protege os dados
            pessoais de quem visita o site gestcorp.eca.usp.br, preenche nossos formulários ou fala com
            a nossa equipe pelo WhatsApp. Ela segue a Lei Geral de Proteção de Dados Pessoais (Lei nº
            13.709/2018).
          </p>

          <h2 className="mt-12 text-2xl font-semibold tracking-[-0.03em] text-blue-deep">
            1. Quem é responsável pelos seus dados
          </h2>
          <p className="mt-4 text-[1.0625rem] leading-relaxed text-graphite-muted">
            O controlador dos dados pessoais tratados neste site é [nome da instituição responsável, CNPJ
            e endereço]. Empresas parceiras que operam o site, o atendimento e as campanhas tratam os
            dados em nome do Gestcorp, seguindo as orientações desta política.
          </p>

          <h2 className="mt-12 text-2xl font-semibold tracking-[-0.03em] text-blue-deep">
            2. Quais dados coletamos
          </h2>
          <h3 className="mt-7 text-lg font-semibold text-blue-deep">Dados que você nos informa</h3>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-[1.0625rem] leading-relaxed text-graphite-muted">
            <li>Nome, e-mail e telefone ou WhatsApp</li>
            <li>O conteúdo das mensagens que você troca com a nossa equipe por WhatsApp ou e-mail</li>
            <li>No processo seletivo, o currículo e os documentos solicitados pela Secretaria</li>
          </ul>
          <h3 className="mt-7 text-lg font-semibold text-blue-deep">Dados coletados durante a navegação</h3>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-[1.0625rem] leading-relaxed text-graphite-muted">
            <li>Endereço IP, tipo de dispositivo e navegador</li>
            <li>Páginas visitadas, botões clicados, data e hora do acesso</li>
            <li>Origem da visita, como o anúncio, a busca ou o site de onde você veio</li>
          </ul>
          <p className="mt-4 text-[1.0625rem] leading-relaxed text-graphite-muted">
            Esses dados são coletados por meio de cookies e tecnologias semelhantes, explicados na seção
            6.
          </p>

          <h2 className="mt-12 text-2xl font-semibold tracking-[-0.03em] text-blue-deep">
            3. Para que usamos seus dados
          </h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-[1.0625rem] leading-relaxed text-graphite-muted">
            <li>Responder ao seu pedido de informações e conduzir o atendimento sobre a turma</li>
            <li>Conduzir o processo seletivo e a matrícula, quando você se candidatar</li>
            <li>Enviar informações sobre turmas, eventos e Masterclasses, se você autorizar</li>
            <li>Entender de onde vêm os interessados e medir o resultado das nossas campanhas</li>
            <li>Melhorar o funcionamento e o conteúdo do site</li>
            <li>Proteger o site contra fraudes e acessos automatizados</li>
            <li>Cumprir obrigações legais e regulatórias</li>
          </ul>

          <h2 className="mt-12 text-2xl font-semibold tracking-[-0.03em] text-blue-deep">
            4. Em que bases legais
          </h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-[1.0625rem] leading-relaxed text-graphite-muted">
            <li>
              Procedimentos preliminares a seu pedido (art. 7º, V, da LGPD): atendimento, processo
              seletivo e matrícula
            </li>
            <li>
              Consentimento (art. 7º, I): comunicações sobre turmas e eventos, cookies de publicidade e
              uso de imagem em eventos
            </li>
            <li>Legítimo interesse (art. 7º, IX): medição de campanhas, melhoria do site e segurança</li>
            <li>Cumprimento de obrigação legal (art. 7º, II): guarda de registros exigida por lei</li>
          </ul>

          <h2 className="mt-12 text-2xl font-semibold tracking-[-0.03em] text-blue-deep">
            5. Com quem compartilhamos
          </h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-[1.0625rem] leading-relaxed text-graphite-muted">
            <li>
              Secretaria, coordenação do Gestcorp e áreas da ECA-USP responsáveis pela inscrição e pela
              matrícula
            </li>
            <li>
              Fornecedores que operam o site, o atendimento e as campanhas, como [agência, hospedagem e
              sistema de CRM]
            </li>
            <li>
              Plataformas usadas no atendimento e na divulgação: WhatsApp e Meta (conversas e anúncios) e
              Google (medição, anúncios e reCAPTCHA)
            </li>
            <li>Autoridades públicas, quando houver exigência legal</li>
          </ul>
          <p className="mt-4 text-[1.0625rem] leading-relaxed text-graphite-muted">
            Não vendemos seus dados pessoais.
          </p>

          <h2 className="mt-12 text-2xl font-semibold tracking-[-0.03em] text-blue-deep">6. Cookies</h2>
          <p className="mt-4 text-[1.0625rem] leading-relaxed text-graphite-muted">
            Cookies são pequenos arquivos salvos no seu navegador. Usamos cookies necessários, que fazem
            o site funcionar, e cookies de medição e de publicidade, que mostram como o site é usado e
            ajudam a exibir anúncios do Gestcorp. Você pode aceitar, recusar ou ajustar os cookies não
            necessários no aviso que aparece ao entrar no site e nas configurações do seu navegador.
            Recusar esses cookies não impede o uso do site.
          </p>

          <h2 className="mt-12 text-2xl font-semibold tracking-[-0.03em] text-blue-deep">
            7. Por quanto tempo guardamos seus dados
          </h2>
          <p className="mt-4 text-[1.0625rem] leading-relaxed text-graphite-muted">
            Guardamos os dados pelo tempo necessário para o atendimento e o processo seletivo da turma.
            Se você autorizou o envio de comunicações, mantemos seu contato até que você cancele. Os
            dados de alunos matriculados seguem as regras de guarda da instituição. [Prazos definidos
            pela instituição.]
          </p>

          <h2 className="mt-12 text-2xl font-semibold tracking-[-0.03em] text-blue-deep">
            8. Como protegemos seus dados
          </h2>
          <p className="mt-4 text-[1.0625rem] leading-relaxed text-graphite-muted">
            Adotamos medidas técnicas e administrativas para proteger seus dados contra acesso não
            autorizado, perda e uso indevido, como conexão segura e acesso restrito às pessoas que
            precisam dos dados para o atendimento.
          </p>

          <h2 className="mt-12 text-2xl font-semibold tracking-[-0.03em] text-blue-deep">
            9. Seus direitos
          </h2>
          <p className="mt-4 text-[1.0625rem] leading-relaxed text-graphite-muted">
            A LGPD garante a você o direito de:
          </p>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-[1.0625rem] leading-relaxed text-graphite-muted">
            <li>Confirmar se tratamos seus dados e ter acesso a eles</li>
            <li>Corrigir dados incompletos, inexatos ou desatualizados</li>
            <li>
              Pedir a anonimização, o bloqueio ou a eliminação de dados desnecessários ou tratados em
              desconformidade com a lei
            </li>
            <li>Pedir a portabilidade dos seus dados</li>
            <li>Pedir a eliminação dos dados tratados com base no seu consentimento</li>
            <li>Saber com quem compartilhamos seus dados</li>
            <li>Saber que pode não consentir e quais as consequências disso</li>
            <li>Revogar seu consentimento a qualquer momento</li>
          </ul>
          <p className="mt-4 text-[1.0625rem] leading-relaxed text-graphite-muted">
            Para exercer esses direitos, escreva para [e-mail do encarregado de dados]. Respondemos nos
            prazos previstos na LGPD. Você também pode apresentar reclamação à Autoridade Nacional de
            Proteção de Dados (ANPD).
          </p>

          <h2 className="mt-12 text-2xl font-semibold tracking-[-0.03em] text-blue-deep">
            10. Como cancelar o recebimento de comunicações
          </h2>
          <p className="mt-4 text-[1.0625rem] leading-relaxed text-graphite-muted">
            Você pode cancelar quando quiser pelo link no fim dos nossos e-mails, respondendo [SAIR] no
            WhatsApp ou escrevendo para gestcorp@usp.br.
          </p>

          <h2 className="mt-12 text-2xl font-semibold tracking-[-0.03em] text-blue-deep">
            11. Menores de idade
          </h2>
          <p className="mt-4 text-[1.0625rem] leading-relaxed text-graphite-muted">
            O Gestcorp é destinado a pessoas com graduação concluída. Não coletamos intencionalmente
            dados de menores de 18 anos.
          </p>

          <h2 className="mt-12 text-2xl font-semibold tracking-[-0.03em] text-blue-deep">
            12. Alterações nesta política
          </h2>
          <p className="mt-4 text-[1.0625rem] leading-relaxed text-graphite-muted">
            Esta política pode ser atualizada. A data da última atualização aparece sempre no topo da
            página.
          </p>

          <h2 className="mt-12 text-2xl font-semibold tracking-[-0.03em] text-blue-deep">13. Contato</h2>
          <p className="mt-4 text-[1.0625rem] leading-relaxed text-graphite-muted">
            Encarregado pelo tratamento de dados pessoais: Blia Inteligência Criativa. Secretaria do
            Gestcorp: gestcorp@usp.br · Av. Prof. Lúcio Martins Rodrigues, 443, Cidade Universitária, São
            Paulo (SP).
          </p>
        </article>
      </main>
      <WhatsAppFab />
      <Footer />
    </>
  )
}
