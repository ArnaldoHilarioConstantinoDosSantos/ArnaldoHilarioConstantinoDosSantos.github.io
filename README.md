# Portfólio — Arnaldo Hilario

Site pessoal de portfólio com visual escuro e minimalista: apresentação, tecnologias, projetos com página de detalhes, experiência, formação e contato.

**Stack:** React 19 · TypeScript · Vite · Tailwind CSS 4 · Motion · Lucide · React Router.

## Como rodar

Requisito: Node.js 20 ou mais recente (desenvolvido com Node 24).

```bash
npm install
npm run dev        # http://localhost:5173
```

| Comando | O que faz |
| --- | --- |
| `npm run dev` | Servidor de desenvolvimento |
| `npm run build` | Checagem de tipos + build de produção em `dist/` |
| `npm run preview` | Serve `dist/` localmente, para conferir o build |
| `npm run typecheck` | Só a checagem de tipos |

## Estrutura

```
public/
  cv/                 currículo em PDF (botão "Baixar currículo")
  og.png              imagem de compartilhamento (1200×630)
  favicon.svg  robots.txt  _redirects
src/
  data/               TODO o conteúdo do site
    profile.ts          nome, frase de destaque, contatos, "Sobre mim", itens do menu
    skills.ts           tecnologias por grupo e nível
    projects.ts         projetos (card + página de detalhes)
    experience.ts       experiência, formação, idiomas e certificações
  types/              tipos do conteúdo
  components/
    ui/                 Button, Card, Section, Reveal, Tag, ícones de marca
    layout/             Header, Footer, BackToTop, ScrollManager
    projects/           ProjectCard, ProjectVisual (diagrama ilustrativo)
    sections/           uma seção da página inicial por arquivo
  hooks/              tema, seção ativa, copiar, título/descrição da página
  pages/              Home, ProjectPage (/projetos/:slug), NotFound
  index.css           tokens de cor (temas escuro e claro) e estilos de base
```

Os componentes não têm texto de conteúdo: tudo vem de `src/data`.

## Como personalizar

**Textos e contatos** — `src/data/profile.ts`.

**Currículo** — substitua `public/cv/CV_Arnaldo_Hilario.pdf`. Se mudar o nome do arquivo, ajuste `resumeUrl` e `resumeFileName` em `profile.ts`. Atenção: o PDF fica público; confira os dados pessoais que ele contém (telefone, bairro).

**Tecnologias** — `src/data/skills.ts`. Cada item tem um `level`: `principal`, `frequente` ou `complementar`.

**Projetos** — `src/data/projects.ts`. Cada objeto gera o card e a página `/projetos/<slug>`.

- *Link do GitHub ou demonstração:* preencha `links: { github: '…', demo: '…' }`. Os botões só aparecem quando há link.
- *Capturas de tela:* coloque as imagens em `public/projetos/<slug>/` e liste-as em `screenshots`:

  ```ts
  screenshots: [{ src: '/projetos/central-de-chamados/dashboard.webp', alt: 'Dashboard do administrador' }],
  ```

  A primeira vira a capa do card, e todas aparecem na página do projeto. Enquanto a lista estiver vazia, o site mostra um diagrama da arquitetura identificado como ilustração. Prefira WebP, com cerca de 1600 px de largura, e **não publique telas com dados reais de clientes**.
- *Filtros:* o campo `filters` define em quais filtros de tecnologia o projeto aparece.

**Certificações** — acrescente itens em `certifications` (`src/data/experience.ts`). O bloco só aparece quando a lista não está vazia.

**Cores e fontes** — variáveis no topo de `src/index.css`. O tema claro redefine as mesmas variáveis.

## Publicação

O build gera arquivos estáticos em `dist/`. Como o site usa rotas no navegador (`/projetos/…`), a hospedagem precisa devolver `index.html` para caminhos desconhecidos — isso já está configurado para as duas opções abaixo.

**Vercel** — importe o repositório. O Vite é detectado sozinho (build `npm run build`, saída `dist`), e o `vercel.json` cuida das rotas.

**Netlify** — build `npm run build`, pasta de publicação `dist`. O arquivo `public/_redirects` cuida das rotas.

Depois de saber o endereço final, defina `VITE_SITE_URL` (no arquivo `.env` ou nas variáveis de ambiente da hospedagem), sem barra no final, e publique de novo. Redes sociais exigem endereço absoluto na imagem de compartilhamento; sem essa variável, a prévia do link pode sair sem imagem.

## O que o site faz

- Tema escuro e claro: na primeira visita segue o do sistema; a escolha do visitante é lembrada e aplicada antes da primeira pintura.
- Barra de progresso de leitura no topo e menu flutuante com a seção ativa destacada.
- Cards com brilho que acompanha o ponteiro, entradas suaves ao rolar e faixa de tecnologias em movimento (tudo desligado para quem pede menos movimento no sistema).
- Menu com indicador da seção ativa, rolagem suave e versão para celular.
- Filtros de projetos por categoria e por tecnologia.
- Página de detalhes por projeto, com navegação anterior/próximo.
- Copiar e-mail, abrir o cliente de e-mail e baixar o currículo.
- Botão de voltar ao topo.
- Título, descrição e endereço canônico por página, Open Graph, dados estruturados (`Person`), `lang="pt-BR"`.
- `robots.txt` e `sitemap.xml` gerados no build (o sitemap só sai com `VITE_SITE_URL` definido).
- Navegação por teclado, link "Pular para o conteúdo", foco visível.
- Animações desligadas para quem pede movimento reduzido no sistema.

Não há formulário de contato: sem um serviço de envio, ele só simularia a entrega.
