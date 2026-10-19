import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { readFileSync } from 'node:fs'
import { defineConfig, loadEnv, type Plugin } from 'vite'

/**
 * Gera robots.txt e sitemap.xml no build, com a página inicial e uma página por projeto.
 * Os endereços precisam ser absolutos, então só funciona com VITE_SITE_URL definido.
 */
function seoFiles(siteUrl: string | undefined): Plugin {
  return {
    name: 'seo-files',
    apply: 'build',
    generateBundle() {
      const base = siteUrl?.replace(/\/$/, '')
      const robots = ['User-agent: *', 'Allow: /']
      if (base) {
        const source = readFileSync('src/data/projects.ts', 'utf8')
        const slugs = [...source.matchAll(/^\s{4}slug: '([^']+)'/gm)].map((match) => match[1])
        const urls = ['/', ...slugs.map((slug) => `/projetos/${slug}`)]
        const sitemap = [
          '<?xml version="1.0" encoding="UTF-8"?>',
          '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
          ...urls.map((path) => `  <url><loc>${base}${path}</loc></url>`),
          '</urlset>',
          '',
        ].join('\n')
        this.emitFile({ type: 'asset', fileName: 'sitemap.xml', source: sitemap })
        robots.push('', `Sitemap: ${base}/sitemap.xml`)
      }
      this.emitFile({ type: 'asset', fileName: 'robots.txt', source: robots.join('\n') + '\n' })
    },
  }
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), 'VITE_')
  return {
    plugins: [react(), tailwindcss(), seoFiles(env.VITE_SITE_URL ?? process.env.VITE_SITE_URL)],
  }
})
