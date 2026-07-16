# Remodelación 3D Picodavi — Plan de implementación (Fase 0 + Fase 1)

> **For agentic workers:** REQUIRED SUB-SKILL: superpowers:subagent-driven-development o superpowers:executing-plans. Los pasos usan checkbox (`- [ ]`).

**Goal:** Levantar el cimiento del rebuild: proyecto Next.js con exportación estática, tema Tailwind 100% propio (identidad Montseny, no plantilla), contenido/i18n/SEO a paridad con la web actual (incluida la traducción EN de las legales), y un deploy automático a una ruta de *staging* en Hostinger — sin tocar producción.

**Architecture:** Next.js (App Router, TS) con `output: 'export'` → HTML estático → FTP a `/beta/` en Hostinger. La web estática actual (`Picodavi/`) sigue intacta en producción. i18n por contexto React + diccionario portado. SEO por Metadata API + JSON-LD.

**Tech Stack:** Next.js, React, TypeScript, Tailwind (tema propio), Vitest (lógica), Playwright opcional (visual), GitHub Actions + FTP-Deploy-Action.

## Global Constraints

- Salida **estática** (`output: 'export'`) — sin SSR/ISR/rutas de servidor.
- **Coste €0**: Hostinger + FTP existente. Nada de servicios de pago.
- **Producción intacta**: nada de esto sube a la raíz del dominio hasta la Fase 5. Staging en `/beta/`.
- **No parecer plantilla de IA**: tokens de marca propios (verde pino `#15533B`, oro `#DE8E29`, blanco cálido `#FFFFFF`/`#F5F3EE`, tinta `#16130E`); fuentes Bricolage Grotesque / Hanken Grotesk / Space Mono; nada de Inter ni degradados morados ni componentes de librería sin tocar.
- **Bilingüe ES (default) / EN**, con `hreflang`.
- Rollback objetivo **< 1 min** (tag `original-estatica`).

---

## FASE 0 — Red de seguridad + scaffold

### Task 0.1: Tag de seguridad de la web actual

**Files:** (ninguno; operación git)

- [ ] **Step 1:** Crear el tag sobre el estado actual de producción.

```bash
git tag -a original-estatica -m "Web estatica original antes del rebuild 3D (rollback)"
git push origin original-estatica
```

- [ ] **Step 2:** Verificar.

Run: `git tag -l original-estatica` → Espera: `original-estatica`

### Task 0.2: Scaffold del proyecto Next en `web-next/`

**Files:**
- Create: `web-next/` (proyecto Next.js con App Router + TS + Tailwind)

- [ ] **Step 1:** Verificar Node ≥ 18.

Run: `node -v` → Espera: v18/20/22.

- [ ] **Step 2:** Crear el proyecto (no interactivo).

```bash
cd "<repo>"
npx --yes create-next-app@latest web-next --typescript --tailwind --app --eslint --no-src-dir --import-alias "@/*" --use-npm --yes
```

- [ ] **Step 3:** Verificar que arranca el build.

Run: `cd web-next && npm run build` → Espera: build OK.

- [ ] **Step 4:** Commit.

```bash
git add web-next .gitignore
git commit -m "Fase 0: scaffold Next.js (TS + Tailwind + App Router) en web-next/"
```

### Task 0.3: Configurar exportación estática

**Files:**
- Modify: `web-next/next.config.ts` (o `.mjs`)

- [ ] **Step 1:** Activar export estático.

```ts
// next.config.ts
import type { NextConfig } from "next";
const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true }, // sin optimizador de servidor en export
  trailingSlash: true,           // rutas como /beta/pagina/ sirven index.html en Hostinger
};
export default nextConfig;
```

- [ ] **Step 2:** Build y comprobar que se genera `out/` con HTML.

Run: `cd web-next && npm run build`
Espera: existe `web-next/out/index.html`.

- [ ] **Step 3:** Verificar contenido HTML exportado.

Run: `grep -c "<html" web-next/out/index.html` → Espera: `1` (HTML pre-renderizado, no SPA vacía).

- [ ] **Step 4:** Commit.

```bash
git add web-next/next.config.ts
git commit -m "Fase 0: exportacion estatica (output export) + imagenes unoptimized"
```

### Task 0.4: Tema Tailwind propio (tokens de marca, anti-plantilla)

**Files:**
- Modify: `web-next/tailwind.config.ts`
- Modify: `web-next/app/globals.css`
- Create: `web-next/app/tokens.css` (variables de marca)

- [ ] **Step 1:** Definir tokens de marca como CSS variables.

```css
/* web-next/app/tokens.css */
:root {
  --bg: #FFFFFF; --surface: #F5F3EE; --ink: #16130E; --text: #2C271F; --muted: #6E675F;
  --pine: #15533B; --pine-700: #0F3F2D; --gold: #DE8E29; --gold-800: #8F5410;
  --border: #E5E1D7;
}
```

- [ ] **Step 2:** Mapear tokens en Tailwind (colores/fuentes propias, NADA por defecto).

```ts
// tailwind.config.ts (extract)
theme: {
  extend: {
    colors: {
      bg: "var(--bg)", surface: "var(--surface)", ink: "var(--ink)", text: "var(--text)",
      muted: "var(--muted)", pine: "var(--pine)", "pine-700": "var(--pine-700)",
      gold: "var(--gold)", "gold-800": "var(--gold-800)", border: "var(--border)",
    },
    fontFamily: {
      display: ["var(--font-bricolage)", "sans-serif"],
      sans: ["var(--font-hanken)", "sans-serif"],
      mono: ["var(--font-space-mono)", "monospace"],
    },
  },
}
```

- [ ] **Step 3:** Cargar fuentes con `next/font` en `app/layout.tsx` (self-host, sin FOUT) y exponer las variables `--font-*`. Importar `tokens.css` en `globals.css`.

- [ ] **Step 4:** Página de prueba usando `bg-bg text-ink font-display` con el verde pino y oro; build y ver que compila.

Run: `cd web-next && npm run build` → Espera: OK.

- [ ] **Step 5:** Commit.

```bash
git add web-next/tailwind.config.ts web-next/app/tokens.css web-next/app/globals.css web-next/app/layout.tsx
git commit -m "Fase 0: tema Tailwind propio (tokens Montseny + fuentes) anti-plantilla"
```

### Task 0.5: Workflow de deploy a staging (`/beta/`)

**Files:**
- Create: `.github/workflows/deploy-next-staging.yml`

**Interfaces:**
- Consume: secrets `FTP_HOST`, `FTP_USER`, `FTP_PASSWORD` (ya existen en el repo).
- Produce: la web Next servida en `https://picodavi.com/beta/`.

- [ ] **Step 1:** Crear el workflow (build + export + FTP a subcarpeta `/beta/`).

```yaml
name: Deploy Next (staging /beta)
on:
  push:
    branches: [next]
    paths: ["web-next/**", ".github/workflows/deploy-next-staging.yml"]
  workflow_dispatch: {}
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: 20, cache: npm, cache-dependency-path: web-next/package-lock.json }
      - run: cd web-next && npm ci && npm run build
      - name: FTP a /beta
        uses: SamKirkland/FTP-Deploy-Action@v4.3.5
        with:
          server: ${{ secrets.FTP_HOST }}
          username: ${{ secrets.FTP_USER }}
          password: ${{ secrets.FTP_PASSWORD }}
          local-dir: web-next/out/
          server-dir: /public_html/beta/   # AJUSTAR a la ruta real de Hostinger
```

- [ ] **Step 2:** Configurar `basePath`/`assetPrefix` para que los assets funcionen bajo `/beta/`.

```ts
// next.config.ts: en staging
basePath: process.env.STAGING ? "/beta" : "",
assetPrefix: process.env.STAGING ? "/beta/" : "",
```
(El workflow exporta con `STAGING=1`.)

- [ ] **Step 3:** Crear rama `next`, push, y verificar deploy verde + que `https://picodavi.com/beta/` carga.

- [ ] **Step 4:** Commit ya incluido en el push de la rama `next`.

---

## FASE 1 — Contenido + i18n + SEO a paridad

### Task 1.1: Portar el diccionario i18n

**Files:**
- Create: `web-next/content/i18n.ts` (dictionary ES/EN portado de `Picodavi/lib/manifest.js`)
- Create: `web-next/lib/i18n.tsx` (contexto + hook `useT`)
- Test: `web-next/lib/i18n.test.ts`

**Interfaces:**
- Produce: `useT()` → `(key: string) => string`; `LanguageProvider`; `useLang()` → `{ lang, setLang }`.

- [ ] **Step 1 (test):** Vitest — el resolver devuelve ES por defecto y EN al cambiar, y hace fallback a la clave si falta.

```ts
import { resolve } from "./i18n";
test("resuelve ES por defecto", () => { expect(resolve("es","hero.ctaPrimary")).toMatch(/Cuéntame/); });
test("resuelve EN", () => { expect(resolve("en","hero.ctaPrimary")).toMatch(/Tell me/); });
test("fallback a la clave", () => { expect(resolve("es","no.existe")).toBe("no.existe"); });
```

- [ ] **Step 2:** Run `cd web-next && npx vitest run lib/i18n.test.ts` → Espera: FAIL (no existe).
- [ ] **Step 3:** Portar el diccionario (copiar `i18n.es`/`i18n.en` de `manifest.js`) e implementar `resolve`, `LanguageProvider`, `useT`, `useLang` (persistencia en `localStorage`).
- [ ] **Step 4:** Run vitest → Espera: PASS.
- [ ] **Step 5:** Commit `feat(i18n): contexto y diccionario ES/EN portados`.

### Task 1.2: Layout raíz + navegación + toggle de idioma

**Files:**
- Modify: `web-next/app/layout.tsx`
- Create: `web-next/components/Nav.tsx`, `web-next/components/Footer.tsx`

- [ ] **Step 1:** `layout.tsx` envuelve en `<LanguageProvider>`, fija `<html lang>`, fuentes, `tokens.css`.
- [ ] **Step 2:** `Nav` y `Footer` con los enlaces actuales y el botón EN/ES (usa `useLang`).
- [ ] **Step 3:** Build OK y verificación en navegador (nav visible, toggle cambia textos).
- [ ] **Step 4:** Commit `feat: layout, nav y footer con i18n`.

### Task 1.3: Secciones de la home (contenido real, sin animaciones aún)

**Files:**
- Create: `web-next/components/sections/*.tsx` (Hero, Servicios, Proceso, Proyecto, Precios, FAQ, Contacto…)
- Modify: `web-next/app/page.tsx`

- [ ] **Step 1:** Portar el contenido real de `Picodavi/index.html` a componentes JSX semánticos, usando `useT` para los textos. Sin Framer Motion todavía (eso es Fase 2). HTML limpio y accesible.
- [ ] **Step 2:** Build → `out/index.html`. Verificar presencia de textos clave en ES.

Run: `grep -c "les resulte fácil reservar" web-next/out/index.html` → Espera: ≥1.

- [ ] **Step 3:** Commit `feat: home con contenido real a paridad (sin animaciones)`.

### Task 1.4: SEO — metadata, JSON-LD, sitemap, robots, hreflang

**Files:**
- Modify: `web-next/app/layout.tsx` y cada `page.tsx` (Metadata API)
- Create: `web-next/app/sitemap.ts`, `web-next/app/robots.ts`
- Create: `web-next/components/JsonLd.tsx`

- [ ] **Step 1:** Metadata por página (title, description, canonical, OpenGraph, hreflang ES/EN) portando lo actual.
- [ ] **Step 2:** JSON-LD: `ProfessionalService`, `FAQPage`, `BreadcrumbList`, `CreativeWork` (Xalet) — portar de `index.html`.
- [ ] **Step 3:** `sitemap.ts` y `robots.ts` (equivalentes a los actuales).
- [ ] **Step 4:** Build y verificar tags en el HTML exportado.

Run: `grep -c "application/ld+json" web-next/out/index.html` → Espera: ≥1.
Run: `grep -c "hreflang" web-next/out/index.html` → Espera: ≥1.

- [ ] **Step 5:** Commit `feat(seo): metadata, JSON-LD, sitemap, robots, hreflang`.

### Task 1.5: Páginas legales en React CON traducción EN (arregla el bug pendiente)

**Files:**
- Create: `web-next/app/legal/aviso-legal/page.tsx`, `.../privacidad/page.tsx`, `.../cookies/page.tsx`
- Add: claves legales al diccionario `content/i18n.ts` (ES + **EN**)

- [ ] **Step 1:** Portar el cuerpo legal a componentes, con TODO el texto vía `useT` y claves nuevas en ES y **EN** (el fallo actual era que las legales no se traducían).
- [ ] **Step 2:** Build y verificar que en EN el cuerpo sale en inglés.

Run: `grep -c "Privacy policy\|Legal notice" web-next/out/legal/privacidad/index.html` (versión EN) → Espera: ≥1.

- [ ] **Step 3:** Commit `feat(legal): paginas legales en React con traduccion EN`.

### Task 1.6: Auditoría de paridad (SEO + rendimiento)

**Files:** (verificación; sin código nuevo salvo ajustes)

- [ ] **Step 1:** Lighthouse (móvil) sobre `/beta/`. Objetivo ≥ 90 en las 4 categorías. Ajustar si falla.
- [ ] **Step 2:** Checklist de paridad: mismos textos, títulos, metadatos, structured data, ES/EN, legales traducidas.
- [ ] **Step 3:** Commit de ajustes `chore: ajustes de paridad SEO/rendimiento fase 1`.

---

## Self-Review (cobertura de la spec)

- Arquitectura (Next export, Hostinger+FTP, staging): Tasks 0.2, 0.3, 0.5. ✓
- Tema propio / anti-plantilla: Task 0.4 + criterio en cada componente. ✓
- i18n ES/EN: Tasks 1.1, 1.2. ✓
- Contenido a paridad: Task 1.3. ✓
- SEO (metadata/JSON-LD/sitemap/hreflang): Task 1.4. ✓
- Legales EN (bug pendiente): Task 1.5. ✓
- Rendimiento/seguridad: Task 1.6 (rendimiento); cabeceras `.htaccess` y CSP → Fase 4.
- Backup/rollback: Task 0.1. ✓
- 3D / Framer Motion / scrollytelling → **Fase 2-3 (plan aparte)**.

**Fuera de este plan (siguientes):** Fase 2 (sistema de diseño distintivo + Framer Motion), Fase 3 (hero WebGL R3F + scrollytelling), Fase 4 (seguridad `.htaccess`/CSP + auditoría), Fase 5 (cambiazo a producción).
