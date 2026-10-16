import { Database, Layers, Plug, Wrench } from 'lucide-react'
import type { AboutPillar, NavItem, Profile } from '../types'

export const profile: Profile = {
  name: 'Arnaldo Hilario',
  role: 'Desenvolvedor Full Stack',
  location: 'Paulista, PE · Brasil',
  headline: 'Sistemas web que sustentam operações reais — de pagamentos Pix a plataformas multiempresa.',
  intro:
    'Desenvolvo e mantenho sistemas em produção na Ceasa/PE desde 2024, com React, TypeScript, Node.js e PostgreSQL: da regra de negócio e da integração com APIs de pagamento e ERP à sustentação do que já está no ar.',
  email: 'arnaldoohilarioo@gmail.com',
  linkedin: 'https://www.linkedin.com/in/arnaldo-hilario',
  github: 'https://github.com/ArnaldoHilarioConstantinoDosSantos',
  resumeUrl: '/cv/CV_Arnaldo_Hilario.pdf',
  resumeFileName: 'CV_Arnaldo_Hilario.pdf',
  highlights: [
    { value: 'Desde 2024', label: 'Full Stack na Ceasa/PE, em sistemas de produção' },
    { value: 'Pix · PagBank', label: 'integrado ao sistema de Romaneio, com webhooks' },
    { value: '136 testes', label: 'automatizados na Central de Chamados, com CI' },
  ],
}

export const aboutParagraphs: string[] = [
  'Sou desenvolvedor full stack, formado em Ciência da Computação. Desde junho de 2024 atuo na Ceasa/PE, onde desenvolvo, mantenho e integro os sistemas internos da central de abastecimento.',
  'Meu trabalho principal é a evolução do sistema de Romaneio, que controla a movimentação de mercadorias, concentra o faturamento dos romaneios e é usado por todos os permissionários. Foi nele que integrei os pagamentos Pix pela API do PagBank, com confirmação por webhook e tratamento de notificações duplicadas.',
  'Transito entre as camadas: interfaces em React, endpoints REST em Node.js, modelagem e consultas SQL, customizações no ERP Sankhya. Boa parte do que faço é entender uma rotina da operação — benefícios de refeição e estacionamento, contratos, fluxo de caixa — e transformá-la em sistema.',
  'Também cuido do que já existe: investigo incidentes, corrijo sistemas legados e apoio a infraestrutura Linux e Windows Server. Em paralelo, construo produtos próprios de ponta a ponta, como a Central de Chamados multiempresa, onde aprofundo arquitetura, segurança e testes automatizados.',
]

export const aboutPillars: AboutPillar[] = [
  {
    icon: Layers,
    title: 'Frontend e backend',
    description: 'Interfaces em React e TypeScript ligadas a APIs REST em Node.js, com a regra de negócio no servidor.',
  },
  {
    icon: Database,
    title: 'Banco de dados',
    description: 'Modelagem, migrations, views, procedures e otimização de consultas em bancos relacionais.',
  },
  {
    icon: Plug,
    title: 'APIs e integrações',
    description: 'Pagamentos Pix com PagBank, webhooks, webservices e customizações no ERP Sankhya.',
  },
  {
    icon: Wrench,
    title: 'Sustentação e evolução',
    description: 'Diagnóstico de incidentes e manutenção de sistemas legados sem interromper a operação.',
  },
]

export const navItems: NavItem[] = [
  { id: 'sobre', label: 'Sobre' },
  { id: 'tecnologias', label: 'Tecnologias' },
  { id: 'projetos', label: 'Projetos' },
  { id: 'experiencia', label: 'Experiência' },
  { id: 'formacao', label: 'Formação' },
  { id: 'contato', label: 'Contato' },
]
