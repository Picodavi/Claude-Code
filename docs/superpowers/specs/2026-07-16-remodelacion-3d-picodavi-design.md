# Remodelación 3D de Picodavi — Documento de diseño

**Fecha:** 2026-07-16
**Autor:** David (Picodavi) + Claude
**Estado:** Aprobado el diseño; pendiente de convertir en plan de implementación

---

## 1. Contexto

`picodavi.com` es la web de marketing de David Picoiu, diseñador/desarrollador web freelance
en Catalunya que vende webs a negocios locales (restaurantes, hoteles, clínicas, comercios).

Stack actual: HTML/CSS/JavaScript vanilla estático, i18n por atributos `data-i18n` +
`lib/manifest.js`, GSAP + ScrollTrigger ya cargados, deploy por GitHub Actions → FTP a
Hostinger, SEO técnico cuidado (datos estructurados, sitemap, hreflang). Tema visual: blanco
cálido con acentos verde pino + oro (identidad Montseny).

La web actual funciona, es rápida y está bien posicionada. **No se toca hasta el final.**

## 2. Objetivo

Reconstruir la web con un salto de calidad visual ("wow") mediante **animaciones 3D reales,
scroll cinematográfico y micro-interacciones**, para (a) ganar y convencer clientes,
(b) diferenciarse de las webs de plantilla/IA, y (c) que David gane experiencia con un stack
profesional moderno (React/Next). Todo ello **sin perder velocidad, SEO ni seguridad**, con
coste €0 extra y con la web actual siempre disponible como red de seguridad.

### Motivación del cliente (por qué React y no seguir en estático)
1. Ganar experiencia real con React/Next (valor de carrera).
2. Más profesionalidad ante público técnico y para su portfolio.
3. Es más difícil de lograr que una estática → demuestra nivel y diferencia.

## 3. Criterios de éxito (medibles, sin falsas promesas)

- **Lighthouse móvil ≥ 90** en Rendimiento, SEO, Buenas prácticas y Accesibilidad.
- **LCP < 2,5 s** y **CLS < 0,1** en móvil (4G simulada).
- **Paridad o mejora de SEO** frente a la web actual: mismos o mejores metadatos, datos
  estructurados JSON-LD, `sitemap.xml`, `robots.txt`, canonical y hreflang ES/EN.
- El **WebGL no bloquea** la carga: se carga de forma diferida y con imagen de reserva; el
  TTI no empeora respecto al objetivo de rendimiento.
- **La web actual nunca cae**; rollback a la versión estática en **< 1 minuto**.
- **Coste €0 extra** (se mantiene Hostinger + FTP).

Nota honesta: esto es un proyecto de **varias semanas por fases**; cada fase entrega algo
verificable. No es un "de un día para otro".

## 4. Restricciones

- Sin coste adicional de hosting → se descarta Vercel de pago; se descarta el plan gratuito de
  Vercel por su restricción de uso comercial. **Hostinger + FTP** (ya pagado).
- Sin backend ni base de datos (se mantiene el formulario que abre WhatsApp).
- Debe seguir siendo bilingüe ES/EN.
- Debe conservar la identidad visual (blanco cálido, verde pino, oro, Montseny).

## 5. Decisiones de arquitectura

| Decisión | Elección | Motivo |
|---|---|---|
| Framework | **Next.js (App Router) con `output: 'export'`** | React de verdad, pero salida HTML estática → rápida, rastreable, desplegable por FTP |
| Hosting/deploy | **Hostinger + GitHub Actions → `next build` → FTP de `out/`** | €0 extra, reaprovecha el pipeline actual, sin tocar DNS |
| Animación (principal, por ahora) | **Framer Motion** (`motion-framer`) | Reveals, gestos, scroll-driven; stack abierto a más |
| Animación (compleja) | **GSAP + ScrollTrigger** (disponible) | Pinning/scrub complejos si Framer Motion se queda corto |
| 3D | **React-Three-Fiber + drei**, carga diferida (`next/dynamic`, `ssr:false`) | WebGL solo donde aporta, sin bloquear |
| Scroll suave | **Lenis** (ligero) | Suavidad sin coste de peso relevante |
| Inteligencia de diseño/UX | Skill **ui-ux-pro-max** | Paletas, pairings tipográficos, guías UX, patrones |
| i18n | Contexto React propio + diccionario portado de `manifest.js` | Simple, sin dependencias pesadas |
| Estilos | **Tailwind CSS con tema 100% personalizado** (tokens de marca: verde pino, oro, blanco cálido; fuentes Bricolage Grotesque / Hanken Grotesk / Space Mono ya en uso) | Rápido, buen CV para David, moderno — pero con tokens propios para NO parecer Tailwind de fábrica |

## 6. Experiencia 3D y de scroll (el "wow")

Principio: **variedad y creatividad** — cada sección tiene su propio gesto, no se repite el
mismo efecto. WebGL pesado **solo en el hero**; el resto es Framer Motion + CSS 3D
(transform/opacity, sobre GPU).

1. **Hero — secuencia protagonista (único WebGL pesado).**
   Unos **bloques 3D se ensamblan → forman una ventana de navegador → que muestra una web real
   (el Xalet)**. Reacciona al ratón (orbita/inclina con profundidad). Acentos de luz verde
   pino + oro (bloom sutil). **Móvil / `prefers-reduced-motion`: imagen de alta resolución**
   (póster) en lugar del WebGL.
2. **Hero → sectores (scrollytelling anclado).** Al bajar, la pantalla del navegador **muta
   entre sectores**: restaurante → clínica → hotel → comercio. Un solo objeto, el oficio en
   todos los sectores.
3. **Servicios / "lo que ganas".** Tarjetas con **inclinación 3D** (CSS perspective) y
   aparición escalonada (Framer Motion); hover magnético.
4. **Proceso (3 pasos).** **Línea de tiempo en profundidad Z**: cada paso avanza hacia el
   usuario con el scroll.
5. **Proyecto real (Xalet).** Navegador con la captura real, tilt 3D al pasar el ratón, CTA
   "Visitar la web".
6. **Precios.** **Freno deliberado del 3D**: prioridad legibilidad; solo apariciones suaves.
7. **Cierre / CTA.** Último gesto 3D (aura pino-oro) + botón magnético.

Hilo transversal: scroll suave (Lenis), barra de progreso, contadores animados, revelado de
texto. Todo respeta `prefers-reduced-motion`.

## 6.5 Diseño distintivo — que NO parezca una plantilla de IA (requisito clave)

Regla rectora: cada decisión visual debe sentirse **intencionada y propia de Picodavi**, no un
default. Responde directamente al "cookie-cutter template que parece de todos" del crítico.

**Evitar (el look "IA/SaaS genérico"):**
- Degradados morados/azules, glassmorphism por defecto, neón sobre oscuro.
- Fuente Inter/otra genérica; hero centrado + tres tarjetas idénticas con iconitos sueltos.
- Componentes de librería (shadcn, etc.) usados **con sus estilos de fábrica**.
- Ilustraciones/fotos de stock genéricas, viñetas con emoji, simetría perfecta en todo.
- Espaciado uniforme sin ritmo, sombras por defecto, esquinas redondeadas iguales en todo.

**Buscar (sello propio):**
- Sistema visual anclado a la marca: **blanco cálido + verde pino + oro**, Montseny (curvas de
  nivel, texturas de bosque) como motivo recurrente propio.
- **Tipografía editorial con carácter**: Bricolage Grotesque para display con jerarquía real,
  tamaños grandes y contraste; Space Mono para detalles técnicos/etiquetas.
- **Asimetría intencionada** y rejilla que se rompe con criterio; whitespace con ritmo.
- **Detalles dibujados a mano** (SVG propios) y el 3D como pieza única, en vez de stock.
- Un **motivo de interacción con firma** (p. ej. el ensamblado del navegador, el aura pino-oro)
  repetido con coherencia.
- Contenido **real** (proyecto Xalet, textos ya pulidos), nunca lorem ni placeholders.
- Movimiento con punto de vista: contenido, no decoración; siempre con `reduced-motion`.

Fuente de criterio: skills **frontend-design** y **ui-ux-pro-max** (paletas, pairings, guías UX)
durante la implementación.

## 7. SEO, rendimiento y seguridad

**SEO (portar + mejorar):**
- Metadata por página (Next Metadata API), JSON-LD (`ProfessionalService`/`LocalBusiness`,
  `FAQPage`, `BreadcrumbList`, `CreativeWork`), `sitemap.xml`, `robots.txt`, canonical,
  **hreflang ES/EN**, Open Graph / Twitter cards.
- **Keyword research** real del sector + comarca, integrado en títulos, H1 y metadescripciones
  (responde al "no keyword research" del crítico).
- Preparación para buscadores con IA/LLMs: contenido semántico claro, schema rico y `llms.txt`.

**Rendimiento:**
- Presupuesto: Lighthouse móvil ≥ 90; LCP < 2,5 s; CLS < 0,1.
- 3D perezoso + póster de reserva; `next/font` self-host (sin FOUT); imágenes AVIF/WebP con
  tamaños correctos; code-splitting; Lenis ligero. El WebGL nunca en la ruta crítica de carga.

**Seguridad ("antihackeo"):**
- Cabeceras por `.htaccess` en Hostinger: **CSP estricta, HSTS, X-Frame-Options,
  X-Content-Type-Options, Referrer-Policy, Permissions-Policy**.
- Dependencias fijadas (`package-lock`) + Dependabot. Sin backend → sin inyección/DB que atacar.

## 8. i18n

Se porta el diccionario ES/EN actual (ya pulido) a un contexto de React. Toggle de idioma
persistente (localStorage), `lang`/`hreflang` correctos, y export de ambas variantes de rutas
para que el HTML estático sea rastreable en los dos idiomas.

## 9. Estrategia de migración por fases

| Fase | Entregable | Riesgo |
|---|---|---|
| **0** | Scaffold Next en rama `next`; tag `original-estatica`; CI de build+FTP a ruta de staging | Cero (no toca producción) |
| **1** | Contenido + i18n + SEO portados (paridad, sin 3D). Verificar HTML rastreable | Cero |
| **2** | Sistema de diseño + Framer Motion (reveals, tilt, magnético) → **ya enseñable** | Bajo |
| **3** | Hero WebGL (bloques→navegador→sectores) + scrollytelling → **el wow** | Medio (aislado) |
| **4** | Auditoría Lighthouse + cabeceras de seguridad + pulido responsive/reduced-motion | Bajo |
| **5** | "Cambiazo": el deploy de producción pasa a la nueva; la vieja queda etiquetada | Controlado |

La web actual sirve clientes durante **todas** las fases. El cambio a producción solo ocurre
en la Fase 5, tras verificación y visto bueno del cliente.

## 10. Backup y rollback

- Antes de empezar: tag `original-estatica` sobre el estado actual de `Picodavi/`.
- El desarrollo vive en la rama `next` (y se despliega a una ruta/subdominio de staging, no a la
  raíz de producción).
- La web estática actual permanece intacta en `main`/producción hasta la Fase 5.
- Rollback = redeploy del tag `original-estatica` (o revertir el workflow a subir `Picodavi/`).
  Objetivo: **< 1 minuto**.

## 11. Estructura del repositorio (propuesta)

```
/Picodavi/            ← web estática actual (producción, intacta hasta Fase 5)
/web-next/            ← nuevo proyecto Next.js (rama next)
  /app, /components, /lib, /public, /content(i18n)
/docs/superpowers/specs/  ← este documento
/.github/workflows/   ← deploy actual + nuevo workflow de build+export+FTP
```

## 12. Riesgos y mitigaciones

- **Peso de React/hidratación** → export estático + code-splitting + 3D diferido; presupuesto
  Lighthouse como puerta.
- **WebGL lento en móvil** → no se carga WebGL en móvil; póster estático + Framer Motion.
- **Regresión de SEO** → Fase 1 verifica paridad de HTML/metadatos antes de añadir efectos.
- **Ciclo romper-reconstruir** → fases pequeñas, cada una verificada; producción intacta hasta
  el final.
- **Complejidad de mantenimiento para un solo dev** → mantener dependencias mínimas y bien
  fijadas; documentar el flujo de deploy.

## 13. Fuera de alcance (YAGNI)

- Sin CMS, sin backend, sin base de datos, sin e-commerce, sin autenticación.
- Sin pasarela de pago (el contacto sigue por WhatsApp/email).
- Sin migración de dominio ni cambio de hosting.

## 14. Criterios de aceptación

- La nueva web replica todo el contenido y SEO de la actual, en ES y EN.
- Lighthouse móvil ≥ 90 en las cuatro categorías.
- El hero muestra la secuencia 3D en escritorio y el póster en móvil/reduced-motion.
- Cabeceras de seguridad presentes y verificadas.
- Deploy automático por push funcionando (build + export + FTP).
- Rollback a la versión estática probado y documentado (< 1 min).
- **No parece una plantilla de IA/SaaS genérica**: diseño distintivo según la sección 6.5
  (identidad Montseny, tipografía editorial, asimetría intencionada, detalles propios).

## 15. Decisiones tomadas de forma autónoma (por encargo del cliente)

El cliente pidió avanzar sin consultar cada detalle. Decisiones que asumo:
- **Estilos: Tailwind con tema personalizado** (ver sección 5).
- **Fase 1 = paridad exacta** de contenido/SEO antes de añadir 3D (garantiza no perder
  posicionamiento). Confirmado.
- **Staging:** el rebuild se sirve en una subcarpeta/subdominio de staging en Hostinger hasta la
  Fase 5; producción intacta.
- Cualquier duda no legal y que esté en mi mano se resuelve informándome y con criterio propio.
