import usp1 from '@/img/optimized/USP_1.jpg'
import usp2 from '@/img/optimized/USP_2.jpg'
import usp3 from '@/img/optimized/USP_3.jpg'
import usp4 from '@/img/optimized/USP_4.jpg'
import usp5 from '@/img/optimized/USP_5.jpg'
import usp6 from '@/img/optimized/USP_6.jpg'
import usp8 from '@/img/optimized/USP_8.jpg'
import usp9 from '@/img/optimized/USP_9.jpg'
import usp10 from '@/img/optimized/USP_10.jpg'
import usp11 from '@/img/optimized/USP_11.jpg'
import usp12 from '@/img/optimized/USP_12.jpg'
import turmaForm from '@/img/Estudo colaborativo no campus.png'
import trabalhoFinalFoto from '@/img/Estudo ao Entardecer com Design Vibrante.png'

import encerramentoNovo from '@/img/Estudo colaborativo na biblioteca iluminada - cópia.png'

/**
 * Fotografias das seções principais da home.
 * Retratos de docentes: ver `professoresFotos.ts`.
 */
export const banners = {
  hero: usp1,
  uspEca: usp2,
  experiencia: usp3,
  trajetoria: usp9,
  trabalhoFinal: trabalhoFinalFoto,
  turma: turmaForm,
  encerramento: encerramentoNovo,
  /** Reserva visual para seções futuras / galeria institucional */
  galeria: [usp6, usp4, usp5, usp8, usp10, usp11, usp12] as const,
} as const

export const bannerSlots = {
  hero: 'Imagem principal da Hero',
  uspEca: 'Fotografia institucional ECA-USP',
  pensamento: 'Pensamento estratégico',
  experiencia: 'Experiência presencial',
  trajetoria: 'Trajetória do Gestcorp',
  encerramento: 'Banner de encerramento',
} as const
