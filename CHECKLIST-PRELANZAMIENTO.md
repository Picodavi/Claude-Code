# Checklist de prelanzamiento — Picodavi

Usar esta lista antes de activar cobros o anunciar oficialmente la web. Una casilla técnica marcada no sustituye la evidencia indicada.

## 1. Bloqueantes legales y de negocio

- [ ] Alta censal/actividad completada y fecha efectiva confirmada.
- [ ] NIF publicado en Aviso legal y Privacidad.
- [ ] Domicilio profesional completo publicado o solución legal de domicilio validada.
- [ ] Confirmado por escrito que el titular es David Picoiu; resolver la referencia a “Laura” del briefing.
- [ ] Presupuesto/contrato revisado: alcance, hitos, impuestos, pagos, aceptación, revisiones, retrasos, impago, propiedad, licencias, dominio, soporte y cancelación.
- [ ] Condiciones del plan mensual: 60 minutos, revisión proactiva, SLA, horas extra, extras, no acumulación y baja.
- [ ] Condiciones del pago anual de 550 € y reembolsos/cancelación descritas sin ambigüedad.
- [ ] Revisión profesional si se contrata con consumidores: información previa y desistimiento/excepciones.
- [ ] Acuerdos/condiciones de tratamiento revisados para Hostinger, Google/Gmail, Meta/WhatsApp y futuros CMS.
- [ ] Registro de licencias y permisos de cada imagen, logo, mockup, testimonio y captura.
- [ ] Quitar el aviso “no se aceptarán pagos ni se formalizarán encargos” solo después de completar todo lo anterior.

## 2. Identidad, oferta y confianza

- [x] Propuesta de valor y público local visibles en el hero.
- [x] Un CTA primario claro y alternativa para ver trabajo real.
- [x] Total mínimo del plan recomendado: 780 €.
- [x] IVA indicado como no incluido y precio final por escrito.
- [x] Plan recurrente recomendado sin ocultar alternativas.
- [ ] Registrar el dominio del cliente a su nombre cuando se prometa propiedad.
- [ ] Añadir al menos dos casos reales con permiso y resultados verificables.
- [ ] Añadir testimonios solo con autorización y texto auténtico.
- [ ] Sustituir el Gmail por correo de dominio (`hola@picodavi.com`) cuando el buzón esté creado y probado.

## 3. Privacidad y analítica

- [x] Formulario describe que prepara WhatsApp y no almacena en servidor.
- [x] Política de cookies coincide con `picodavi-lang` y `picodavi-motion`.
- [x] No hay analítica, píxeles ni cookies no esenciales activas.
- [x] Eventos `dataLayer` no contienen nombre, necesidad ni mensaje.
- [ ] Si se activa analítica: bloquearla hasta consentimiento, Aceptar/Rechazar al mismo nivel y actualizar políticas.
- [ ] Definir responsable, acceso, retención y borrado del CRM/hoja de leads.
- [ ] Probar un procedimiento real para solicitudes de derechos RGPD.

## 4. Seguridad y cuentas

- [x] `npm audit` sin vulnerabilidades conocidas.
- [x] Sin secretos, `.env`, claves, sourcemaps o backups en la exportación.
- [x] HTTPS forzado y HSTS activo.
- [x] CSP, `nosniff`, política de referrer/permisos y anti-framing configurados.
- [x] Acciones de GitHub fijadas por commit.
- [ ] 2FA activado en GitHub, Hostinger, correo, dominio y Google Business Profile.
- [ ] Credenciales FTPS únicas, guardadas solo en GitHub Secrets y rotadas si se compartieron.
- [ ] Protección de rama `main`: revisión/estado obligatorio si se deja de hacer push directo.
- [ ] Contacto y procedimiento de seguridad de `SECURITY.md` comprobados.

## 5. Calidad técnica

- [ ] Ejecutar desde `web-next`: `npm ci`.
- [ ] Ejecutar `npm run lint`.
- [ ] Ejecutar `npm run typecheck`.
- [ ] Ejecutar `npm test`.
- [ ] Ejecutar `npm run build`.
- [ ] Ejecutar `npm run test:e2e:quick` con build actualizado.
- [ ] Ejecutar `npm run test:e2e:edge`.
- [ ] Ejecutar `npm run test:a11y`.
- [ ] Ejecutar `npm run test:performance`; registrar valores.
- [ ] Ejecutar `npm run test:performance:strict`; si falla, mantener incidencia abierta de LCP/long tasks.
- [ ] Revisar `git diff --check` y confirmar que `Picodavi.zip` no se incluye.

## 6. Navegadores y dispositivos

- [x] Firefox tiene fallback sin WebGL y prueba específica de cadencia/unión del portátil.
- [ ] Comprobar manualmente Chrome, Firefox, Safari y Edge en equipos reales.
- [ ] Comprobar iPhone y Android reales, vertical/horizontal y conexión lenta.
- [ ] Zoom 200 % y 400 %, texto grande del sistema y teclado completo.
- [ ] VoiceOver o NVDA: navegación, headings, formulario, errores, legales y CTA.
- [ ] Desactivar JavaScript y confirmar que propuesta, precios y contacto siguen siendo legibles.

## 7. SEO y activos externos

- [x] Canonical, robots, sitemap, OG/Twitter y JSON-LD generados.
- [x] Sitemap sin fecha falsa en cada build.
- [x] Proyecto real, Instagram y WhatsApp configurados responden.
- [ ] Verificar propiedad en Google Search Console y enviar `https://picodavi.com/sitemap.xml`.
- [ ] Revisar indexación/canonical/structured data en las herramientas de Google.
- [ ] Crear/verificar Google Business Profile con NAP idéntico a la web.
- [ ] Decidir arquitectura `/en/` y posible `/ca/` antes de intentar posicionar idiomas.
- [ ] Comprobar OG en WhatsApp, LinkedIn, X/Facebook y limpiar caché si conserva imagen antigua.

## 8. Hosting, backups y despliegue

- [x] Producción comprime HTML con gzip.
- [x] Chunks con caché y nueva regla inmutable para `_next/static`.
- [ ] Backup completo de la versión actual descargado y fechado.
- [ ] Restauración de prueba realizada en `/beta` o entorno aislado.
- [ ] Certificado TLS, renovación automática, dominio y DNS revisados.
- [ ] Push final realizado; GitHub Actions termina verde.
- [ ] Smoke test postdespliegue: portada, legales, robots, sitemap, proyecto, idioma, formulario y 404.
- [ ] Verificar en vivo nuevas cabeceras `X-Frame-Options: DENY`, `frame-ancestors 'none'` y caché de un chunk.
- [ ] Conservar al menos una vía de rollback; existe la rama `codex/pre-audit-360-2026-07-21`.

## 9. Go / no-go

Dar **GO comercial** solo si:

- no quedan P0 legales;
- la última compilación y pipeline están verdes;
- hay backup restaurable y rollback;
- el smoke test en producción pasa;
- teléfono, email y WhatsApp pertenecen al titular y se atienden;
- cualquier analítica activa tiene consentimiento y documentación.

Si falla uno de esos puntos, mantener la web como portfolio informativo y dar **NO-GO a cobros/encargos formalizados**.
