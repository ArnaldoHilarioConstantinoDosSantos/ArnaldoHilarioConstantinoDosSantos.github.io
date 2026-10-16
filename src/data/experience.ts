import type { Certification, Education, Experience, Language } from '../types'

export const experiences: Experience[] = [
  {
    company: 'Ceasa/PE',
    role: 'Desenvolvedor Full Stack',
    period: 'Jun 2024 — Atual',
    location: 'Pernambuco · Híbrido',
    current: true,
    responsibilities: [
      'Desenvolvo, mantenho e integro os sistemas internos, incluindo customizações no ERP Sankhya para atender às regras de negócio e às rotinas operacionais.',
      'Atuo na evolução do sistema de Romaneio, essencial para a operação da central e utilizado por todos os permissionários, e integrei a ele os pagamentos Pix pela API PagBank.',
      'Desenvolvo soluções que automatizam o controle de benefícios de refeição e estacionamento, com integrações com restaurantes, lançamentos, painéis administrativos e relatórios.',
      'Crio endpoints REST, interfaces em React, tabelas e formulários; trabalho com bancos relacionais e MongoDB e otimizo consultas SQL.',
      'Investigo incidentes e corrijo sistemas legados — incluindo uma falha crítica que interrompeu a emissão de boletos para todos os permissionários — e apoio a infraestrutura Linux e Windows Server.',
    ],
    stack: ['React', 'TypeScript', 'Node.js', 'AdonisJS', 'PostgreSQL', 'PagBank', 'ERP Sankhya', 'AWS'],
  },
  {
    company: 'Imune Kids',
    role: 'Desenvolvedor Frontend · Estágio',
    period: 'Out 2020 — Out 2021',
    location: 'João Pessoa, PB',
    responsibilities: ['Atuei no desenvolvimento frontend de aplicações web, com HTML5 e CSS.'],
    stack: ['HTML5', 'CSS'],
  },
  {
    company: 'Sete/Cetec',
    role: 'Professor de Robótica · Estágio',
    period: 'Fev 2020 — Jun 2020',
    location: 'Recife, PE',
    responsibilities: [
      'Ministrei formação em robótica para alunos da rede pública do Recife, com EV3, NXT, NAO, Arduino e pilotagem de drones.',
      'Participei de atividades e competições como OBR, FLL e WRO.',
    ],
    stack: ['Arduino', 'LEGO EV3 · NXT', 'NAO'],
  },
]

export const education: Education[] = [
  {
    title: 'Bacharelado em Ciência da Computação',
    institution: 'UNIFG — Centro Universitário dos Guararapes',
    period: 'Concluído em junho de 2022',
  },
]

export const languages: Language[] = [{ name: 'Inglês', level: 'Intermediário avançado (B2)' }]

/** Acrescente aqui cursos e certificações. O bloco só aparece no site quando houver itens. */
export const certifications: Certification[] = []
