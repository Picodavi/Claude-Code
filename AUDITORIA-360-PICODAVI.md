# Auditoría final 360º de Picodavi

**Fecha:** 21 de julio de 2026

**Alcance:** código y exportación estática de `web-next`, configuración de GitHub Actions/Hostinger y comprobaciones pasivas sobre `https://picodavi.com`.

**Marco:** revisión comercial, diseño, UX/CRO, WCAG 2.2 AA, OWASP ASVS 5.0.0 nivel 1, privacidad/LSSI/RGPD preliminar, rendimiento, navegadores, SEO, contenido, código y analítica.

> Esta auditoría reduce riesgos y documenta evidencia. No constituye una certificación de seguridad, accesibilidad o asesoramiento jurídico. Las pruebas automáticas no sustituyen una revisión legal profesional, pruebas con tecnologías de asistencia reales ni un pentest autorizado.

## Los 5 problemas más importantes

| Prioridad | Hallazgo | Impacto | Estado |
|---|---|---|---|
| P0 | Faltan NIF, domicilio profesional completo, alta definitiva y revisión de contratos/encargados | Impide recomendar una apertura comercial con cobros y encargos formalizados | **Pendiente del titular**. La web avisa que todavía no acepta pagos ni formaliza encargos |
| P1 | El objetivo estricto de LCP móvil ≤2,5 s no es estable en laboratorio | Puede reducir conversión en móviles lentos | **Mejorado, no cerrado**: de 5,80 s a 2,91–3,59 s; CLS ≤0,011. Requiere reducir hidratación/JS |
| P1 | Prueba social limitada a un caso real y sin reseñas verificables | La oferta es clara, pero una empresa prudente aún tiene poca evidencia externa | **Pendiente comercial**: conseguir 2–3 casos, testimonios autorizados y resultados medibles |
| P1 | Inglés cambia en cliente sobre la misma URL; no existe versión catalana | El inglés no tiene URL indexable/hreflang y se desaprovecha afinidad local en Catalunya | **Pendiente de arquitectura/contenido**: `/en/` y, si se puede mantener bien, `/ca/` |
| P1 | Hay eventos de embudo en `dataLayer`, pero no un colector ni panel | No se pueden calcular conversión, origen o rendimiento real | **Pendiente de decisión**. No activar analítica no esencial sin consentimiento y política actualizada |

## Resumen ejecutivo y puntuación

| Área | Nota | Lectura |
|---|---:|---|
| Estrategia comercial y recurrencia | 8,1/10 | Oferta recurrente visible, precio total inicial transparente y propiedad del activo; falta prueba social |
| Diseño visual y coherencia | 8,6/10 | Identidad propia, buen ritmo, fondos y movimiento; se corrigieron contrastes y el 3D de Firefox |
| UX y CRO | 8,3/10 | CTA, comparación y formulario claros; contacto recuperable si falla el popup |
| Seguridad aplicable | 8,5/10 | Superficie pequeña, HTTPS/cabeceras, 0 vulnerabilidades npm y pipeline fijado; CSP aún necesita `unsafe-inline` |
| Legal y privacidad | 5,8/10 | Textos honestos y coherentes con el flujo real; faltan datos y contratos obligatorios antes de cobrar |
| Accesibilidad | 8,8/10 | 21 comprobaciones Axe/teclado/movimiento pasan en tres motores; falta validación manual con AT |
| Rendimiento | 7,0/10 | Gran mejora y CLS excelente; LCP estricto y tareas largas siguen pendientes |
| SEO y SEO local | 7,6/10 | Metadatos, canonical, sitemap y schema coherentes; faltan URLs de servicios/idiomas y activos locales externos |
| Código, pruebas y despliegue | 8,7/10 | Tipos, lint, unitarios y Playwright repetibles; despliegue reproducible y acciones fijadas |
| Analítica | 6,0/10 | Taxonomía sin PII implementada; falta destino de datos y cuadro de mando |

**Puntuación global orientativa: 7,8/10.** La web está técnicamente cerca del lanzamiento, pero la recomendación comercial es **lanzamiento condicionado**: no aceptar pagos ni formalizar encargos hasta completar el bloque legal P0.

## Correcciones aplicadas

- Firefox: la capa WebGL decorativa ya no se carga; se conserva el portátil CSS 3D y la animación de scroll. Se eliminó una perspectiva duplicada de la base.
- Movimiento: `prefers-reduced-motion` se respeta desde el inicio y el usuario puede cambiar la preferencia; el control se traduce ES/EN.
- Contacto: `nombre` y `necesidad` son obligatorios, hay límites de 80/160/500 caracteres, el popup se abre de forma segura y existe enlace alternativo si se bloquea.
- Privacidad de medición: eventos de embudo sin nombre, necesidad ni mensaje; prueba automática contra fuga de PII.
- Precios: se muestra el total mínimo de 780 € para los seis meses iniciales y se mantiene “IVA no incluido”.
- Contenido: retiradas afirmaciones no demostrables y compatibilidad absoluta; idiomas declarados ajustados a ES/EN.
- Legal: políticas sincronizadas con el formulario real, `localStorage`, ausencia de analítica y proveedores actuales.
- Accesibilidad: contraste corregido en numeración decorativa y token oliva; enlaces de salto, foco y modo reducido verificados.
- Seguridad: PostCSS actualizado por override a 8.5.10; `npm audit` pasa con 0 vulnerabilidades. Acciones de GitHub fijadas por commit.
- Servidor: framing bloqueado con `DENY`/`frame-ancestors 'none'`; caché inmutable para `_next/static` con hashes.
- SEO: sitemap deja de inventar una fecha `lastmod` en cada build; schema declara solo idiomas reales.
- Calidad: Playwright cubre Chromium, Firefox, WebKit, Edge, Pixel 7 e iPhone 15; CI incluye typecheck.

## 1. Negocio, posicionamiento, oferta y precios

### Fortalezas

- El hero explica público, resultado y modelo: web propia o cuidado mensual.
- “Cuidado Proactivo” es el plan recomendado sin convertir los demás en opciones artificialmente malas.
- El compromiso mínimo se entiende: 450 € + 6 × 55 € = 780 €.
- “Crecimiento local” sustituye la cuota de 55 € y suma gestión de Google por 89 €/mes; el ahorro de 15 € frente a 104 € es matemáticamente correcto.
- Se comunica por escrito alcance, impuestos, plazo y precio final; reduce objeciones y disputas.
- La propiedad de web/dominio es un buen elemento de confianza, siempre que el contrato y el registro del dominio lo garanticen de verdad.

### Riesgos y recomendaciones

1. Aclarar en contrato cuándo puede elegirse el pago anual de 550 € y qué ocurre con servicios no consumidos al cancelar.
2. Definir SLA del soporte prioritario, alcance de los 60 minutos, rollover o no, exclusiones y precio de dominios premium.
3. Conseguir autorización escrita para cada logo, captura, testimonio y resultado publicado.
4. Añadir dos casos reales con problema, solución, plazo y resultado verificable. No inventar métricas.
5. Mantener la revisión inicial como captación de calidad; documentar qué recibe el prospecto y plazo de respuesta.

## 2. Diseño, responsive, UX y CRO

- Jerarquía y CTA principal coherentes; precios se comparan sin duplicar una parrilla anterior.
- La identidad pino/lima, tipografía y composición no parecen una plantilla genérica.
- Los efectos aportan demostración de capacidad, pero la propuesta sigue legible con movimiento reducido o sin WebGL.
- 320 px no presenta overflow horizontal en prueba automatizada.
- Enlaces externos usan `noopener noreferrer`; legales e internos responden.
- El formulario no pierde el lead si el navegador bloquea `window.open`.

**Pendiente manual:** probar zoom 200/400 %, orientación horizontal, VoiceOver/TalkBack/NVDA, formularios con autocompletado real y dispositivos de gama baja. Safari necesita que el usuario active navegación completa para incluir enlaces en el ciclo de Tab; el foco programático y visual sí se verificó.

## 3. Seguridad — OWASP ASVS 5.0.0 L1

Se revisó el CSV oficial estable ASVS 5.0.0: **70 requisitos L1**. La aplicación es una web estática sin autenticación, sesiones, API propia, base de datos, pagos, subida de archivos ni operaciones de servidor. Por eso “no aplica” es el resultado correcto en gran parte del estándar, no “cumple”.

| Capítulo ASVS | L1 | Aplicación a Picodavi |
|---|---:|---|
| V1 Encoding and Sanitization | 8 | Aplicable a render y URLs. React escapa texto; WhatsApp usa `encodeURIComponent`; sin sinks dinámicos detectados |
| V2 Validation and Business Logic | 4 | Aplicable parcialmente al contacto: requeridos y longitudes. No hay decisión de negocio en servidor |
| V3 Web Frontend Security | 8 | HTTPS/HSTS, aislamiento de pestañas y CSP; CSRF/CORS/cookies de sesión no aplican |
| V4 API and Web Service | 2 | No aplica: no hay API propia |
| V5 File Handling | 4 | No aplica: no hay subida/descarga procesada por servidor |
| V6 Authentication | 13 | No aplica: no hay cuentas |
| V7 Session Management | 6 | No aplica: no hay sesiones |
| V8 Authorization | 4 | No aplica: no existen recursos protegidos |
| V9 Self-contained Tokens | 4 | No aplica: no hay tokens de aplicación |
| V10 OAuth and OIDC | 5 | No aplica |
| V11 Cryptography | 3 | Aplicación limitada: no hay criptografía de aplicación; TLS depende de Hostinger |
| V12 Secure Communication | 3 | Aplicable: HTTP→HTTPS, HSTS y recursos propios verificados |
| V13 Configuration | 1 | Aplicable: sin sourcemaps/copias/secretos públicos; 404 de marca |
| V14 Data Protection | 2 | Aplicable parcialmente: minimización del formulario y ausencia de almacenamiento propio |
| V15 Secure Coding and Architecture | 3 | Aplicable: lockfile, auditoría de dependencias, CI y acciones fijadas |

### Evidencia de producción

- `https://picodavi.com/`: 200; HTTP redirige 301 a HTTPS.
- HSTS, CSP, `nosniff`, protección de framing, política de referrer y permisos presentes.
- LiteSpeed sirve HTML con gzip: 97.977 bytes sin comprimir y 18.855 bytes transferidos.
- `/.env`, `/package.json`, `/Picodavi.zip` y `/.DS_Store`: 404; `/.git/config`: 403.
- No se encontraron firmas de token/clave, archivos sensibles versionados, sourcemaps ni backups en `out`.
- `npm audit`: 0 vulnerabilidades tras el override verificado de PostCSS.

### Riesgo residual

- La exportación estática de Next y los estilos/transformaciones actuales obligan a mantener `'unsafe-inline'` en `script-src` y `style-src`; una CSP con nonce/hash requeriría cambiar la arquitectura/servidor.
- No se realizó pentest activo ni escaneo intrusivo del hosting.
- Rotar credenciales FTPS si alguna vez se compartieron fuera de GitHub Secrets y activar 2FA en GitHub/Hostinger.

## 4. Legal y privacidad — revisión preliminar

La redacción actual coincide con el flujo real: el formulario prepara WhatsApp, no guarda el contenido en servidor; no hay analítica/cookies no esenciales; se describen `picodavi-lang` y `picodavi-motion`. Los precios indican IVA no incluido y encargo por presupuesto aceptado.

### Obligatorio antes de cobrar o formalizar encargos

- NIF y alta censal/epígrafe aplicable.
- Domicilio profesional completo a efectos de notificaciones.
- Confirmar nombre legal exacto del titular. El briefing menciona “Laura”, pero toda la web y la configuración identifican a **David Picoiu**; no se cambió sin autorización.
- Contrato/condiciones del servicio: alcance, hitos, aceptación, pagos, impuestos, propiedad intelectual, dominio, licencias, revisiones, soporte, cancelación, impago y responsabilidad.
- Contratos de encargado y garantías de transferencias con Hostinger, Google/Gmail, Meta/WhatsApp y cualquier CMS/analítica futura.
- Registro de licencias/autorizaciones de fotografías, mockups, logos y testimonios.
- Si se contrata con consumidores a distancia: revisión profesional de información precontractual, desistimiento/excepciones y jurisdicción.

La LSSI exige información identificativa accesible y reglas de precio; el RGPD exige la información del artículo 13 al recoger datos. La web no debería retirar el aviso de “sin pagos/encargos” hasta completar estos datos.

## 5. Accesibilidad WCAG 2.2 AA

**Resultado automatizado:** 21/21 comprobaciones aprobadas en Chromium, Firefox y WebKit para portada y las tres páginas legales, incluyendo Axe (impactos serious/critical), modo reducido, traducción del control, enlace de salto y foco.

Corregido durante la auditoría:

- Números de proceso: contraste grande ≥3:1.
- Numeración de promesas y etiquetas oliva: token ajustado a 4,99:1 sobre la superficie más exigente.
- Preferencia del sistema aplicada antes de crear canvas/animación.

**No certifica conformidad completa:** falta revisión manual de todos los criterios, lector de pantalla, reflow/zoom, dictado/voz y usuarios reales.

## 6. Rendimiento y Core Web Vitals

Perfil de laboratorio reproducible: 390×844, 1,6 Mbps, 150 ms RTT y CPU ×4, servidor gzip.

| Métrica | Antes | Mejor resultado repetido | Objetivo |
|---|---:|---:|---:|
| LCP | 5,80 s | 2,91–3,59 s | ≤2,50 s — **pendiente** |
| CLS | 0,008 | 0–0,011 | ≤0,10 — cumple en laboratorio |
| Transferencia | 1.268 KB sin compresión | ~456 KB con gzip | Seguir reduciendo |
| Tarea larga máx. | 1.264 ms | variable, hasta 2.412 ms con CPU ×4 | Minimizar — **pendiente** |

Mejoras aplicadas: WebGL desactivado en móvil/Firefox, prioridad de imagen LCP corregida, imagen oculta de escritorio deja de precargarse en móvil, demo bajo el fold sin preload, gzip en servidor de prueba y caché estática ampliada.

Siguiente mejora recomendada: separar/hidratar bajo demanda las animaciones y secciones bajo el fold, y reducir la convivencia de GSAP + Framer Motion. Validar después con PageSpeed Insights y datos de campo (CrUX/RUM), no solo laboratorio local.

## 7. Navegadores y fallo 3D de Firefox

- Firefox: prueba específica comprueba que no existe canvas WebGL, portátil CSS 3D unido, transición final, ausencia de errores y huecos de frame bajo el presupuesto de 500 ms.
- Chromium/Firefox/WebKit: portada, legales, SEO y accesibilidad automatizados.
- Edge, Pixel 7 e iPhone 15: incluidos en la matriz Playwright repetible.
- El fallback conserva profundidad visual, planos, mockup y animación; no deja un hueco si WebGL falla.

## 8. SEO técnico, contenido y SEO local

Correcto: title/description, un H1, canonical absoluto, robots, sitemap, OG/Twitter, JSON-LD `ProfessionalService`/FAQ, enlaces legales, HTTPS y 404. El proyecto real, Instagram y WhatsApp configurados responden 200.

Pendiente:

- Crear URLs indexables propias para ES/EN y `hreflang`; valorar catalán solo si se puede mantener con calidad.
- Publicar páginas útiles por servicio/sector y una página de zona real (no páginas puerta duplicadas).
- Completar NAP y dirección cuando sea legalmente posible; alinear exactamente web, Google Business Profile y directorios.
- Verificar Google Business Profile, Search Console, sitemap enviado, indexación, reseñas y citaciones: requieren acceso externo y no se dieron por comprobados.
- Añadir casos reales y contenido que responda intención local; evitar texto generado sin experiencia demostrable.

## 9. Analítica y medición

Eventos existentes: `cta_clicked`, `pricing_viewed`, `lead_form_started`, `lead_form_submitted`, `lead_open_failed`, `contact_clicked`, `language_changed`. La prueba confirma que no incluyen nombre, necesidad ni mensaje.

Embudo recomendado: visita útil → vista de precios → inicio de formulario → WhatsApp preparado → lead cualificado → propuesta → ganado → alta mensual. Los dos últimos pasos deben vivir en un CRM/hoja segura, no inferirse del navegador.

No se recomienda activar GA/Meta Pixel “por si acaso”. Si se añade analítica no esencial, implementar consentimiento previo con **Aceptar/Rechazar al mismo nivel**, registro de consentimiento, bloqueo previo y políticas actualizadas.

## 10. Prioridades

### Antes de abrir encargos (P0)

1. Completar alta, NIF, domicilio y revisión jurídica/contractual.
2. Confirmar titular David vs. referencia “Laura” del briefing.
3. Revisar y firmar contratos con proveedores/encargados; activar 2FA y verificar backups.
4. Ejecutar checklist de prelanzamiento y smoke test tras despliegue.

### Primeros 30 días (P1)

1. Reducir hidratación/JS hasta que el test estricto de LCP pase con margen.
2. Publicar dos casos reales y solicitar reseñas verificables con permiso.
3. Configurar Search Console y Google Business Profile con NAP consistente.
4. Elegir analítica respetuosa o mantenerla desactivada; medir ventas en CRM.
5. Crear URLs de idioma y una landing de servicio/localidad realmente diferenciada.

### Después (P2)

- Tests visuales con baseline, monitorización de uptime/CWV y revisión trimestral legal/a11y.
- Política de backups probada mediante restauración, no solo existencia de copias.
- Sustituir progresivamente dos motores de animación por una capa más ligera.

## Fuentes normativas y técnicas

- [WCAG 2.2, W3C](https://www.w3.org/TR/WCAG22/)
- [OWASP ASVS 5.0.0](https://github.com/OWASP/ASVS/releases/tag/v5.0.0)
- [LSSI-CE, artículo 10 — BOE](https://www.boe.es/buscar/act.php?id=BOE-A-2002-13758)
- [RGPD, artículo 13 — EUR-Lex](https://eur-lex.europa.eu/legal-content/ES/TXT/?uri=CELEX:32016R0679)
- [Guía de cookies — AEPD](https://www.aepd.es/es/documento/guia-cookies.pdf)
- [Google: crear y enviar un sitemap](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap)
- [Google: sitios multirregionales y multilingües](https://developers.google.com/search/docs/specialty/international/managing-multi-regional-sites)
