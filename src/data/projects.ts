import { CreditCard, Globe, Home, LifeBuoy, PiggyBank, ShoppingBasket, Truck, Warehouse } from 'lucide-react'
import type { Project, ProjectCategory, TechFilter } from '../types'

export const categoryLabels: Record<ProjectCategory, string> = {
  profissional: 'Profissional',
  autoral: 'Projeto autoral',
  freelance: 'Freelance',
}

export const techFilters: TechFilter[] = ['React', 'Node.js', 'PostgreSQL', 'Supabase', 'Integrações', 'Mobile']

const INTERNAL_SYSTEM =
  'Sistema interno da Ceasa/PE: código, telas e endereços não são públicos. O diagrama é uma ilustração da arquitetura, não uma captura do sistema.'
const PRIVATE_REPO =
  'Repositório privado e sem capturas publicadas até o momento. O diagrama é uma ilustração da arquitetura, não uma captura do sistema.'

export const projects: Project[] = [
  {
    slug: 'central-de-chamados',
    name: 'Central de Chamados',
    tagline: 'Suporte técnico multiempresa com SLA, custos internos e relatórios separados por público.',
    category: 'autoral',
    kind: 'Sistema web de gestão',
    origin: '2026',
    status: 'Pronto para implantação',
    icon: LifeBuoy,
    accent: 'gold',
    summary:
      'Sistema de gestão de chamados de suporte técnico para várias empresas clientes, com hierarquia de organizações, permissões por usuário, custos internos de atendimento e relatórios distintos para a equipe e para o cliente.',
    problem:
      'Atender várias empresas no mesmo sistema sem que uma veja os dados da outra — e sem que o cliente veja o custo interno do atendimento.',
    highlights: [
      'Hierarquia livre de organizações (grupo › marca › unidade)',
      'SLA em horário comercial, com feriados e pausa em espera',
      'Custos internos invisíveis ao cliente em todas as camadas',
      '136 testes automatizados e CI com instalação em Docker',
    ],
    stack: ['TypeScript', 'NestJS', 'Prisma', 'PostgreSQL', 'React', 'Vite', 'Tailwind CSS', 'TanStack Query', 'Docker'],
    filters: ['React', 'Node.js', 'PostgreSQL'],
    links: {},
    screenshots: [],
    disclosure: PRIVATE_REPO,
    details: {
      context: [
        'Idealizei e conduzi o desenvolvimento deste sistema do levantamento de requisitos à preparação para produção. Ele atende uma operação de suporte técnico que presta serviço a várias empresas, cada uma com suas marcas e unidades.',
        'O sistema reúne portal do cliente, fila da equipe técnica, controle financeiro interno dos atendimentos, dashboards por perfil e relatórios exportáveis.',
      ],
      problem: [
        'Empresas diferentes compartilham a mesma instalação, então o isolamento de dados não pode depender da interface: precisa valer em toda consulta feita no servidor.',
        'O atendimento gera custos — deslocamento, combustível, peças — que são informação interna. O cliente acompanha o chamado, mas nunca pode receber esses valores, nem por engano em um campo do JSON.',
        'Os prazos de SLA precisam refletir o expediente real: fins de semana, feriados e o tempo em que o chamado fica parado aguardando o próprio cliente.',
      ],
      solution: [
        'Uma API stateless em NestJS concentra todas as regras; o frontend em React só decide o que exibir. Um único serviço percorre a hierarquia de organizações com CTE recursiva e transforma qualquer filtro em uma lista de ids já limitada ao que o usuário pode ver.',
        'Os dados financeiros ficam em tabelas próprias, fora da tabela de chamados, e o relatório do cliente é gerado por um serviço que nem tem acesso ao serviço de custos: ele não esconde valores, simplesmente não os carrega.',
        'Os prazos de SLA são calculados na abertura, com calendário de expediente e feriados, e gravados no chamado. Nos status de espera o prazo congela e é retomado com o tempo que faltava.',
      ],
      architecture: [
        { label: 'SPA React', detail: 'Vite, Tailwind, Radix, TanStack Query, React Hook Form' },
        { label: 'API NestJS', detail: 'Módulos por domínio, guards globais, validação com Zod' },
        { label: 'PostgreSQL', detail: 'Prisma, migrations versionadas, CTE recursiva' },
        { label: 'Docker Compose', detail: 'Caddy com HTTPS automático, backup e restauração' },
      ],
      architectureNotes: [
        'Monorepo com dois projetos (API e web) servidos sob o mesmo domínio.',
        'Camadas no backend: controller (rota, permissão, validação) → service (regra de negócio, transação) → Prisma.',
        'Autorização por permissão, nunca por nome de perfil: permissões do perfil mais concessões e negações individuais, recarregadas a cada requisição.',
        'Token de acesso JWT de curta duração guardado só em memória; refresh token opaco e rotativo em cookie httpOnly, com revogação da família de sessões em caso de reuso.',
      ],
      features: [
        'Abertura de chamados pelo cliente ou pela equipe, com anexos, categoria, tipo de equipamento e numeração amigável',
        'Prioridade calculada por matriz de impacto × urgência',
        'Fluxo de status com histórico: assumir, atribuir, transferir, resolver, fechar, reabrir e cancelar',
        'Conversa com mensagens públicas e notas internas, e linha do tempo filtrada por permissão',
        'Despesas por chamado e deslocamento calculado pelo consumo do veículo, com snapshot do preço do combustível',
        'Relatórios em PDF, CSV e Excel, em versões distintas para uso interno e para o cliente',
        'Dashboards de administrador, técnico e cliente, com produtividade por técnico',
        'Notificações no sistema e por e-mail, busca global e auditoria de ações',
        'Recuperação de senha por link de uso único e avaliação do atendimento pelo cliente',
      ],
      challenges: [
        {
          title: 'Sigilo financeiro em camadas independentes',
          description:
            'A regra "custo é interno" é aplicada no banco, na permissão, nas rotas, nos services, na serialização por lista branca, na linha do tempo e nos relatórios. Um invariante impede que um usuário externo carregue permissão financeira, mesmo que o banco contenha uma concessão indevida.',
        },
        {
          title: 'Isolamento multiempresa à prova de troca de id',
          description:
            'Toda consulta a chamados passa pelo mesmo filtro de visibilidade, inclusive as rotas filhas de mensagens, anexos e despesas. Os testes cobrem o isolamento entre empresas e tentativas de acesso por id alheio.',
        },
        {
          title: 'SLA em horário comercial com pausa',
          description:
            'Prazos em horas corridas ou de expediente por prioridade, feriados nacionais calculados e feriados locais, alerta de risco medido em tempo de expediente e pausa do prazo enquanto o chamado aguarda o cliente.',
        },
        {
          title: 'Instalação de produção verificada a cada envio',
          description:
            'O pipeline no GitHub Actions roda os testes, o build do frontend e uma instalação completa em Docker — HTTPS, criação do administrador, backup e restauração.',
        },
      ],
      results: [
        '136 testes automatizados da API: autenticação, autorização, sigilo financeiro, cálculos, relatórios, notificações e SLA',
        'Sondagem manual de segurança com 62 verificações (IDOR, tokens forjados, injeção, uploads, XSS, CORS, força bruta), todas aprovadas após duas correções',
        'Integração contínua validando testes, build e instalação de produção em Docker a cada envio para a branch principal',
        'Empacotamento com Docker Compose, Caddy e HTTPS automático preparado; a instalação em servidor ainda não foi feita',
      ],
    },
  },
  {
    slug: 'sistema-de-romaneio',
    name: 'Sistema de Romaneio',
    tagline: 'Movimentação de mercadorias e faturamento dos romaneios da central de abastecimento.',
    category: 'profissional',
    kind: 'Sistema de gestão em produção',
    origin: 'Ceasa/PE',
    status: 'Em produção',
    icon: Truck,
    accent: 'green',
    summary:
      'Atuo no desenvolvimento e na manutenção do sistema que controla a movimentação de mercadorias da Ceasa/PE e concentra o faturamento dos romaneios, com rotinas de veículos, produtos, permissionários e informações financeiras.',
    problem:
      'Manter em evolução um sistema essencial para a operação diária da central, usado por todos os permissionários, sem interromper o que já funciona.',
    highlights: [
      'Sincronização de permissionários por webservice',
      'Controle de contratos: vigência separada da situação financeira',
      'Relatórios financeiros e de fluxo de caixa',
      'Integração de pagamentos Pix com PagBank',
    ],
    stack: ['React', 'TypeScript', 'Node.js', 'AdonisJS', 'PostgreSQL', 'AWS'],
    filters: ['React', 'Node.js', 'PostgreSQL', 'Integrações'],
    links: {},
    screenshots: [],
    disclosure: INTERNAL_SYSTEM,
    details: {
      context: [
        'O Romaneio é o sistema que registra a movimentação de mercadorias da central de abastecimento e concentra o faturamento dos romaneios. É essencial para a operação e utilizado por todos os permissionários.',
        'Atuo nele desde 2024, como desenvolvedor full stack na Ceasa/PE, no desenvolvimento de novas rotinas e na manutenção das existentes.',
      ],
      problem: [
        'Um sistema em produção, com regras de negócio acumuladas ao longo do tempo, precisa continuar evoluindo: novas exigências da operação, correções e integrações com outros sistemas.',
        'Parte do trabalho é investigativa — entender por que um relatório diverge entre homologação e produção, ou por que um registro inválido conseguiu ser gravado.',
      ],
      solution: [
        'Evoluí a sincronização de permissionários por webservice e o controle de contratos, passando a distinguir a vigência do contrato de sua situação financeira.',
        'Mantenho os relatórios financeiros e de fluxo de caixa, analisando consultas, views e divergências entre os dados de homologação e de produção.',
        'Ajustei validações para impedir registros sem produtos e mantenho modelos, controladores, serviços e migrations da aplicação.',
      ],
      architecture: [
        { label: 'Interface React', detail: 'TypeScript, tabelas, formulários e painéis' },
        { label: 'API Node.js', detail: 'AdonisJS: modelos, controladores e serviços' },
        { label: 'PostgreSQL', detail: 'Migrations, consultas e views' },
        { label: 'Integrações', detail: 'Webservice de permissionários e Pix PagBank' },
      ],
      architectureNotes: ['Aplicação hospedada na AWS.', 'Integração de pagamentos Pix descrita em um projeto próprio neste portfólio.'],
      features: [
        'Rotinas de movimentação, veículos, produtos e permissionários',
        'Faturamento dos romaneios e informações financeiras',
        'Sincronização de permissionários por webservice',
        'Controle de contratos com vigência e situação financeira',
        'Relatórios financeiros e de fluxo de caixa',
      ],
      challenges: [
        {
          title: 'Evoluir sem interromper a operação',
          description:
            'Toda alteração entra em um sistema usado diariamente por todos os permissionários; mudanças em modelos e migrations precisam preservar os dados e as rotinas existentes.',
        },
        {
          title: 'Divergências entre homologação e produção',
          description:
            'Manutenção de relatórios financeiros a partir da análise de consultas e views, até localizar a origem da diferença entre os ambientes.',
        },
        {
          title: 'Vigência × situação financeira',
          description:
            'O controle de contratos tratava como uma coisa só dois estados diferentes; separá-los exigiu rever a regra e o que dependia dela.',
        },
      ],
      results: [
        'Sistema em produção, essencial para a operação da central e utilizado por todos os permissionários',
        'Pagamentos Pix integrados ao fluxo do romaneio',
        'Indicadores internos de volume não são divulgados neste portfólio',
      ],
    },
  },
  {
    slug: 'integracao-pix-pagbank',
    name: 'Integração Pix PagBank',
    tagline: 'Cobranças Pix vinculadas aos romaneios, com confirmação automática por webhook.',
    category: 'profissional',
    kind: 'Integração de pagamentos',
    origin: 'Ceasa/PE',
    status: 'Em produção',
    icon: CreditCard,
    accent: 'red',
    summary:
      'Integração entre o sistema da Ceasa/PE e o PagBank que vincula cada cobrança Pix a um romaneio e confirma o pagamento automaticamente, com tratamento de notificações duplicadas.',
    problem: 'Confirmar pagamentos Pix no sistema de Romaneio de forma automática e sem confirmações repetidas.',
    highlights: [
      'Cobrança Pix vinculada ao romaneio',
      'Recebimento de webhooks do PagBank',
      'Consulta de checkout e pedido antes de confirmar',
      'Tratamento de notificações duplicadas',
    ],
    stack: ['Node.js', 'API REST', 'Pix', 'Webhooks', 'PagBank'],
    filters: ['Node.js', 'Integrações'],
    links: {},
    screenshots: [],
    disclosure: INTERNAL_SYSTEM,
    details: {
      context: [
        'O sistema de Romaneio concentra o faturamento dos romaneios da central. A integração com o PagBank levou o pagamento por Pix para dentro desse fluxo.',
        'Desenvolvi a integração de ponta a ponta: a criação da cobrança, o recebimento da notificação e a confirmação no sistema da Ceasa.',
      ],
      problem: [
        'Cada cobrança precisa estar ligada ao romaneio correto, com os dados do cliente, a identificação do pedido e o valor exato.',
        'O provedor de pagamento pode enviar a mesma notificação mais de uma vez. Sem tratamento, o mesmo pagamento seria confirmado repetidamente.',
      ],
      solution: [
        'A cobrança Pix é criada com os dados do cliente, a identificação do pedido e o valor em centavos, o que evita erros de arredondamento.',
        'Ao receber o webhook, a integração consulta o checkout e o pedido no PagBank para verificar o pagamento antes de enviar a confirmação ao sistema da Ceasa.',
        'Notificações duplicadas são identificadas e descartadas, de modo que cada pagamento gera uma única confirmação.',
      ],
      architecture: [
        { label: 'Romaneio', detail: 'Solicita a cobrança do romaneio' },
        { label: 'API de integração', detail: 'Cria a cobrança e recebe os webhooks' },
        { label: 'PagBank', detail: 'Checkout Pix, pedido e notificações' },
        { label: 'Confirmação', detail: 'Pagamento verificado e baixado uma única vez' },
      ],
      architectureNotes: [
        'Valores trafegam em centavos inteiros.',
        'O webhook não é tratado como prova de pagamento: o status é sempre consultado no provedor.',
      ],
      features: [
        'Criação de cobranças Pix vinculadas a cada romaneio',
        'Recebimento de webhooks',
        'Consulta de checkout e de pedido para verificação do pagamento',
        'Envio da confirmação ao sistema da Ceasa',
        'Acompanhamento por logs e status de pagamento',
      ],
      challenges: [
        {
          title: 'Idempotência',
          description:
            'Tratamento de notificações duplicadas para que reenvios do provedor não gerem confirmações repetidas.',
        },
        {
          title: 'Do sandbox à produção',
          description:
            'Validação do fluxo completo nos dois ambientes, com acompanhamento de logs e do status dos pagamentos.',
        },
      ],
      results: [
        'Integração em produção, com alto volume de transações',
        'Confirmação automática do pagamento no sistema da Ceasa',
        'Indicadores internos de volume não são divulgados neste portfólio',
      ],
    },
  },
  {
    slug: 'gestao-de-fornecimento',
    name: 'Gestão de Fornecimento',
    tagline: 'Entregas, contas a receber, estoque e resultado para quem fornece produtos a terceiros.',
    category: 'autoral',
    kind: 'Sistema de gestão financeira',
    origin: '2026',
    status: 'Fase 1 concluída',
    icon: Warehouse,
    accent: 'green',
    summary:
      'Sistema de gestão para quem produz ou compra produtos e fornece para terceiros: entregas diárias, contas a receber, pagamentos, estoque, compras, despesas e lucro por cliente e por produto. Multiempresa desde o banco de dados.',
    problem:
      'Saber quanto cada cliente deve, quanto cada produto rende e qual é o resultado real do mês quando entrega e pagamento acontecem em datas diferentes.',
    highlights: [
      'Pagamentos distribuídos entre vários títulos, com estorno',
      'Estoque por movimentos e custo médio ponderado',
      'DRE, fluxo de caixa e ponto de equilíbrio',
      'Multiempresa: todo serviço filtra pela empresa da sessão',
    ],
    stack: ['Next.js', 'React', 'TypeScript', 'Drizzle ORM', 'PostgreSQL', 'Tailwind CSS', 'Zod', 'Vitest'],
    filters: ['React', 'Node.js', 'PostgreSQL'],
    links: {},
    screenshots: [],
    disclosure: PRIVATE_REPO,
    details: {
      context: [
        'Pequenos fornecedores — quem produz ou revende e entrega todos os dias para outros negócios — costumam controlar entregas e recebimentos em cadernos e planilhas.',
        'O sistema organiza esse ciclo completo: do produto e do estoque à entrega, do título a receber ao pagamento, e daí aos relatórios de resultado.',
      ],
      problem: [
        'A entrega acontece hoje e o pagamento vem depois, às vezes em partes, às vezes quitando várias entregas de uma vez. Tratar entrega e pagamento como a mesma coisa distorce o saldo de cada cliente.',
        'Preços e custos mudam. Se o histórico for recalculado com os valores atuais, o lucro de meses anteriores deixa de ser confiável.',
      ],
      solution: [
        'Cada entrega gera um título a receber; o pagamento é distribuído entre títulos em uma tabela própria de alocações — uma entrega, várias ou parte de uma.',
        'Cada item de entrega grava o preço e o custo do momento. O saldo de estoque só muda por movimentos, e as compras recalculam o custo médio ponderado.',
        'As regras de negócio ficam em módulos sem React; páginas e server actions cuidam apenas da interface e da leitura de formulários.',
      ],
      architecture: [
        { label: 'Next.js App Router', detail: 'Páginas e server actions, instalável como PWA' },
        { label: 'Módulos de negócio', detail: 'Vendas, financeiro, estoque, compras e relatórios' },
        { label: 'Drizzle ORM', detail: 'Schema tipado e migrations SQL' },
        { label: 'PostgreSQL', detail: 'PGlite embutido para desenvolvimento e testes' },
      ],
      architectureNotes: [
        'Toda função de serviço recebe a empresa, o usuário e o perfil; o identificador da empresa vem da sessão no servidor.',
        'Dinheiro em NUMERIC no banco e decimal.js no código, nunca ponto flutuante.',
        'Permissões checadas dentro dos serviços, não apenas no menu.',
        'Nada é apagado: entregas são canceladas, pagamentos são estornados e tudo fica registrado em auditoria.',
      ],
      features: [
        'Clientes com resumo, extrato, títulos e tabela de preços própria',
        'Entrega rápida, contas a receber e pagamentos com distribuição e estorno',
        'Despesas e contas a pagar, fixas e variáveis',
        'Compras, fornecedores e estoque com produção manual, perdas e ajuste',
        'Dashboard, alertas e busca global',
        'Relatórios: DRE, fluxo de caixa, ponto de equilíbrio, clientes, produtos, cliente × produto e perdas, com exportação CSV',
      ],
      challenges: [
        {
          title: 'Competência × caixa',
          description:
            'O faturamento conta na data da entrega e o recebimento na data do pagamento. Os relatórios mantêm as duas visões sem misturá-las.',
        },
        {
          title: 'Compra não é despesa',
          description:
            'A compra vira estoque e só entra no resultado como custo quando o produto é vendido — o que exige o custo médio ponderado correto a cada entrada.',
        },
        {
          title: 'Mesmo schema em dois bancos',
          description:
            'O sistema roda sem configuração com PostgreSQL embutido e usa o mesmo schema e as mesmas migrations em um PostgreSQL de verdade.',
        },
      ],
      results: [
        'Fase 1 implementada: do login aos relatórios e à instalação como PWA',
        'Testes automatizados das regras financeiras e de estoque, executados em PostgreSQL em memória',
        'Fases seguintes planejadas: ficha técnica, produção com baixa automática de insumos, pedidos recorrentes e portal do cliente',
      ],
    },
  },
  {
    slug: 'ninho',
    name: 'Ninho',
    tagline: 'Orçamento, compras e documentos de quem está montando ou reformando um imóvel.',
    category: 'autoral',
    kind: 'Aplicação web colaborativa',
    origin: '2026',
    status: 'Em evolução',
    icon: Home,
    accent: 'red',
    summary:
      'Organização financeira e de compras para quem está mobiliando ou reformando uma casa. Cada imóvel é um projeto compartilhado, com membros, cômodos, itens, compras, despesas, documentos e dashboard.',
    problem:
      'Várias pessoas decidindo e pagando as compras de um mesmo imóvel, cada uma com a própria conta e um nível de acesso diferente.',
    highlights: [
      'Papéis de dono, editor e leitor garantidos pelo banco (RLS)',
      'Convites por link de uso único',
      'Parcelas e histórico gerados por triggers',
      'Atualização em tempo real entre os membros',
    ],
    stack: ['React', 'TypeScript', 'Vite', 'Supabase', 'PostgreSQL', 'TanStack Query', 'Tailwind CSS', 'React Router'],
    filters: ['React', 'Supabase', 'PostgreSQL'],
    links: {},
    screenshots: [],
    disclosure: PRIVATE_REPO,
    details: {
      context: [
        'Montar um apartamento envolve dezenas de itens, orçamentos por cômodo, compras parceladas, notas fiscais e mais de uma pessoa decidindo.',
        'No Ninho, cada imóvel é um projeto com seus próprios membros e dados, e pode ser compartilhado com outras pessoas.',
      ],
      problem: [
        'Dados compartilhados entre contas diferentes exigem controle de acesso real. Esconder botões na interface não impede ninguém de chamar a API diretamente.',
        'Quem tem acesso a dois imóveis não pode, nem por erro, fazer um item de um apontar para o cômodo ou a compra do outro.',
      ],
      solution: [
        'A proteção está no banco, não no frontend: toda tabela tem Row Level Security, e um usuário só lê dados de um imóvel se for membro dele.',
        'Chaves estrangeiras compostas com o identificador do imóvel garantem a integridade entre imóveis. Parcelas e histórico são gravados apenas por triggers.',
        'No cliente, toda chave de cache fica sob o imóvel atual: uma mutação ou um evento em tempo real invalida a tela inteira de uma vez.',
      ],
      architecture: [
        { label: 'SPA React', detail: 'React Router, TanStack Query com atualização otimista' },
        { label: 'Supabase', detail: 'Auth, Storage com URLs assinadas e Realtime' },
        { label: 'PostgreSQL', detail: 'RLS, triggers e RPCs em schema privado' },
      ],
      architectureNotes: [
        'Privilégios mínimos: visitante sem acesso a nenhuma tabela; criação de imóvel e aceite de convite apenas por RPC.',
        'Bucket de anexos privado, com políticas que checam a participação no imóvel.',
        'Backend local de desenvolvimento com as mesmas migrations, para testar sem depender de um projeto Supabase.',
      ],
      features: [
        'Cômodos, categorias e itens com opções, favoritos e histórico de preço',
        'Compras e despesas com parcelas e valor comprometido',
        'Orçamento por imóvel, cômodo e categoria, com dashboard',
        'Checklist, documentos e anexos',
        'Membros com papéis e convites por link',
        'Busca, registro de atividades e exportação CSV',
      ],
      challenges: [
        {
          title: 'RLS sem recursão',
          description:
            'As políticas usam funções SECURITY DEFINER em um schema privado, não exposto pela API, para consultar a participação do usuário sem recursão.',
        },
        {
          title: 'Coerência entre item e compra',
          description:
            'Triggers impedem marcar um item como comprado sem registrar a compra, e desfazer a compra devolve o item ao estado anterior.',
        },
        {
          title: 'Testar segurança de banco',
          description:
            'Um teste roda as migrations reais em um PostgreSQL embutido e verifica RLS, papéis, convites, parcelas e exclusões em cascata.',
        },
      ],
      results: [
        '81 asserções no teste de banco, cobrindo RLS, papéis, convites, parcelas e cascatas',
        'Previsto e ainda não implementado: service worker para PWA, exportação em PDF e envio de convite por e-mail',
      ],
    },
  },
  {
    slug: 'casa-em-dia',
    name: 'Casa em Dia',
    tagline: 'Estoque da casa, lista de compras e histórico de preços, funcionando sem internet.',
    category: 'autoral',
    kind: 'Aplicativo Android',
    origin: '2026',
    status: 'Em desenvolvimento · fases 1 e 2 de 6',
    icon: ShoppingBasket,
    accent: 'gold',
    summary:
      'Aplicativo Android para controlar o que há em casa, a lista de compras, as feiras e os preços. A compra no supermercado acontece inteira no aparelho, sem depender de rede.',
    problem: 'Dentro do supermercado o sinal falha — e nenhuma ação da compra pode depender dele.',
    highlights: [
      'Fila offline com reenvio idempotente',
      'Finalização da feira em uma única transação SQL',
      'Regras de negócio em TypeScript puro, com testes',
      'RLS em todas as tabelas',
    ],
    stack: ['React Native', 'Expo', 'TypeScript', 'Supabase', 'PostgreSQL', 'TanStack Query', 'Zustand', 'Zod'],
    filters: ['Mobile', 'Supabase', 'PostgreSQL'],
    links: {},
    screenshots: [],
    disclosure: PRIVATE_REPO,
    details: {
      context: [
        'O aplicativo une o estoque da casa, a lista de compras, a feira no supermercado e o histórico de preços dos produtos.',
        'O desenvolvimento segue em fases: cada uma só começa com a anterior funcionando e testada no emulador. As fases 1 e 2 estão prontas.',
      ],
      problem: [
        'Marcar itens, quantidades e preços precisa funcionar sem rede. Quando a conexão volta, nada pode ser enviado duas vezes.',
        'Finalizar uma feira grava compra, itens, histórico de preços, promoções, estoque e baixa na lista. Se uma parte falhar, o banco não pode ficar pela metade.',
      ],
      solution: [
        'A feira em andamento vive em um store local persistido. Alterações de estoque e de lista são aplicadas na hora e entram em uma fila persistida, reenviada em ordem ao reconectar.',
        'Toda escrita leva um UUID gerado no aparelho, então reenviar a mesma operação não duplica nada.',
        'Operações compostas são funções SQL atômicas: ou tudo é salvo, ou nada.',
      ],
      architecture: [
        { label: 'Telas', detail: 'Expo Router, sem regra de negócio' },
        { label: 'Hooks', detail: 'TanStack Query: cache e fila de mutações persistidos' },
        { label: 'Domínio', detail: 'TypeScript puro: preços, estoque e parcelas' },
        { label: 'Supabase', detail: 'PostgreSQL, Auth, RLS e funções SQL' },
      ],
      architectureNotes: [
        'Dependência sempre no mesmo sentido: tela → hook → repositório → banco.',
        'Dinheiro em centavos inteiros e quantidades em milésimos inteiros; nenhum cálculo usa ponto flutuante.',
        'Cada item comprado guarda um snapshot de nome, marca, categoria, unidade e preços do dia.',
      ],
      features: [
        'Cadastro e login, produtos e categorias',
        'Estoque com histórico de movimentos e status (acabou, acabando, baixo, em estoque)',
        'Lista de compras com inclusão automática quando o produto acaba ou atinge o mínimo',
        'Feira com promoção por quantidade, descontos e economia calculada',
        'Histórico de feiras e de preços por produto, com gráfico',
        'Tema claro e escuro',
      ],
      challenges: [
        {
          title: 'Offline de verdade',
          description:
            'Leituras vêm do cache salvo no aparelho; a finalização feita sem internet aparece no histórico na hora e sobe uma única vez ao reconectar.',
        },
        {
          title: 'A regra em um só lugar',
          description:
            'O cliente calcula subtotais e parcelas com as funções de domínio; as funções SQL gravam tudo em uma transação e conferem as somas.',
        },
        {
          title: 'Testar o banco sem Docker',
          description:
            'As migrations reais são aplicadas em um PostgreSQL em memória para testar estoque, lista automática, RLS, finalização de feira e parcelas.',
        },
      ],
      results: [
        'Fases 1 e 2 prontas e testadas no emulador',
        '69 testes das regras de negócio e 15 testes de banco',
        'Ainda não implementado: dashboards e relatórios, telas de finanças e publicação na loja',
      ],
    },
  },
  {
    slug: 'folga',
    name: 'Folga',
    tagline: 'Finanças pessoais: quanto entra, quanto sai e o que já está comprometido nos próximos meses.',
    category: 'autoral',
    kind: 'Aplicação web de finanças',
    origin: '2026',
    status: 'Completo em modo demonstração',
    icon: PiggyBank,
    accent: 'green',
    summary:
      'Aplicação de organização financeira pessoal com lançamentos, cartões e faturas, parcelamentos, gastos fixos, orçamento, metas e relatórios — com todos os cálculos em funções puras cobertas por testes.',
    problem:
      'Enxergar não só o saldo de hoje, mas o que já está comprometido em faturas, parcelas e contas fixas dos próximos meses.',
    highlights: [
      'Faturas calculadas pelo fechamento e vencimento do cartão',
      'Parcelas sem perder centavos',
      'Realizado × previsto e saldo projetado',
      'Troca entre Supabase e armazenamento local por uma interface única',
    ],
    stack: ['React', 'TypeScript', 'Vite', 'React Router', 'TanStack Query', 'Tailwind CSS', 'Recharts', 'Supabase', 'Vitest'],
    filters: ['React', 'Supabase'],
    links: {
      github: 'https://github.com/ArnaldoHilarioConstantinoDosSantos/folga',
      demo: 'https://arnaldohilarioconstantinodossantos.github.io/folga/',
    },
    screenshots: [],
    disclosure:
      'Código aberto e demonstração publicada, em modo local: entre com qualquer e-mail e senha. O diagrama é uma ilustração da arquitetura.',
    details: {
      context: [
        'O Folga mostra quanto entra, quanto sai, para onde o dinheiro vai, quanto sobra e o que já está comprometido nos próximos meses.',
        'São mais de quinze telas, do dashboard ao calendário de vencimentos, além de onboarding, alertas e tema claro e escuro.',
      ],
      problem: [
        'Finanças pessoais têm muitas regras de borda: a compra feita depois do fechamento vai para a fatura seguinte, a parcela do dia 31 em um mês curto, a comparação de meio mês com um mês inteiro.',
        'Regras assim, espalhadas pelos componentes, ficam impossíveis de testar.',
      ],
      solution: [
        'Tudo o que aparece na tela — resumo do mês, faturas, saúde financeira, insights, alertas — sai de funções puras que recebem os dados e a data de hoje. São elas que os testes cobrem.',
        'Telas e cálculos só conhecem uma interface de acesso a dados. A escolha entre Supabase e armazenamento local acontece em um único ponto, e o driver local reproduz as regras de exclusão em cascata do schema SQL.',
      ],
      architecture: [
        { label: 'Telas', detail: 'Carregadas sob demanda, uma por rota' },
        { label: 'Funções puras', detail: 'Cálculos financeiros, insights e alertas' },
        { label: 'Driver de dados', detail: 'Interface única para leitura e escrita' },
        { label: 'Supabase ou localStorage', detail: 'RLS no banco; dados locais na demonstração' },
      ],
      architectureNotes: [
        'Valores monetários são inteiros em centavos.',
        'Sem biblioteca de datas nem de formulários.',
        'Cada tela é um módulo separado: a biblioteca de gráficos só é baixada quando uma tela com gráfico abre.',
      ],
      features: [
        'Dashboard com evolução, distribuição da renda, previsão do fim do mês e saúde financeira',
        'Lançamentos com busca e filtros; receitas, despesas e gastos fixos recorrentes',
        'Cartões, faturas com pagamento e reabertura, e parcelamentos gerados mês a mês',
        'Calendário de vencimentos e despesas futuras para 6 ou 12 meses',
        'Orçamento por categoria, metas e reserva de emergência',
        'Contas, transferências, patrimônio e relatórios comparativos',
      ],
      challenges: [
        {
          title: 'Centavos que não somem',
          description:
            'O total é dividido em centavos inteiros e os que sobram vão para as primeiras parcelas, então a soma é sempre exata.',
        },
        {
          title: 'Comparações honestas',
          description:
            'No mês em andamento, as comparações usam o mesmo período do mês anterior, e o indicador de economia usa a projeção para o fim do mês.',
        },
        {
          title: 'Dois backends, um comportamento',
          description:
            'O driver local replica as regras de exclusão do banco para que o modo demonstração e o modo conectado se comportem da mesma forma.',
        },
      ],
      results: [
        '20 testes automatizados sobre os cálculos financeiros',
        'Roteiro manual em navegador nas telas, em desktop e em largura de celular, no modo demonstração',
        'Limitação conhecida: a integração com Supabase está implementada, mas ainda não foi executada contra um projeto real',
      ],
    },
  },
  {
    slug: 'gold-defender',
    name: 'Site Institucional Gold Defender',
    tagline: 'Site estático de 13 páginas com SEO técnico e nota 100 no Lighthouse.',
    category: 'freelance',
    kind: 'Site institucional',
    origin: '2026',
    status: 'Entregue',
    icon: Globe,
    accent: 'red',
    summary:
      'Site institucional de uma empresa de consultoria, suporte DBA, monitoramento 24x7 e soluções Cloud para bancos de dados, desenvolvido como freelancer.',
    problem: 'Um site rápido e bem indexado, publicado em hospedagem compartilhada.',
    highlights: [
      '13 páginas estáticas com uma única fonte de conteúdo',
      'SEO técnico: canônicas, sitemap, Open Graph e Schema.org',
      'Nota 100 no Lighthouse em três categorias',
      'Formulário de contato em PHP com proteção contra spam',
    ],
    stack: ['Astro', 'TypeScript', 'HTML5', 'CSS3', 'PHP', 'Apache'],
    filters: [],
    links: {},
    screenshots: [],
    disclosure:
      'Projeto de cliente: o link e as capturas não foram incluídos neste portfólio. O diagrama é uma ilustração da arquitetura.',
    details: {
      context: [
        'A Gold Defender presta consultoria, suporte DBA, monitoramento 24x7 e soluções Cloud para bancos de dados Oracle, SQL Server, PostgreSQL e MySQL.',
        'Desenvolvi o site institucional da empresa como freelancer, do desenvolvimento à publicação.',
      ],
      problem: [
        'A hospedagem é compartilhada, com Apache e PHP: sem Node.js no servidor, o site precisa ser estático e ainda assim fácil de manter.',
        'Um site institucional vive de ser encontrado, então SEO técnico e desempenho fazem parte do requisito.',
      ],
      solution: [
        'Estruturei 13 páginas estáticas em Astro, com o conteúdo centralizado em uma única fonte de dados.',
        'Implementei URLs canônicas, sitemap, Open Graph e dados estruturados Schema.org.',
        'O formulário de contato é atendido por PHP, com validação no servidor, proteção contra spam e adequação à LGPD.',
      ],
      architecture: [
        { label: 'Astro', detail: 'Páginas estáticas geradas no build' },
        { label: 'Fonte única de dados', detail: 'Conteúdo centralizado em TypeScript' },
        { label: 'Apache', detail: 'HTTPS, cache, compressão e Content-Security-Policy' },
        { label: 'PHP', detail: 'Formulário de contato validado no servidor' },
      ],
      architectureNotes: ['Layout responsivo de 320px a 1920px.'],
      features: [
        '13 páginas institucionais',
        'SEO técnico completo',
        'Formulário de contato com validação e proteção contra spam',
        'Publicação em Apache com HTTPS, cache e compressão',
      ],
      challenges: [
        {
          title: 'Desempenho em hospedagem compartilhada',
          description: 'Carregamento em cerca de 1 segundo, obtido com páginas estáticas, cache e compressão no Apache.',
        },
        {
          title: 'Segurança de um site estático',
          description: 'Content-Security-Policy configurada no servidor e formulário validado no backend.',
        },
      ],
      results: [
        'Nota 100 no Lighthouse em Performance, Acessibilidade e Boas Práticas',
        'Carregamento em cerca de 1 segundo em hospedagem compartilhada',
      ],
    },
  },
]

export function getProject(slug: string | undefined): Project | undefined {
  return projects.find((project) => project.slug === slug)
}
