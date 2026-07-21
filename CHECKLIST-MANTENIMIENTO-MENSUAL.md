# Checklist mensual de mantenimiento — Picodavi

Registrar fecha, responsable, evidencia y acción pendiente. No marcar una copia como válida sin probar una restauración periódica.

## Cada semana

- [ ] Portada, legales, WhatsApp, email y proyecto real responden.
- [ ] Revisar GitHub Actions, errores de despliegue y caducidad TLS.
- [ ] Revisar leads sin respuesta y tiempo hasta primera contestación.
- [ ] Comprobar que no hay spam, suplantaciones o cambios no autorizados en dominio/GBP.

## Cada mes — técnico y seguridad

- [ ] `npm audit` y revisión de advisories de dependencias directas.
- [ ] `npm outdated`; actualizar en rama, nunca paquetes mayores a ciegas.
- [ ] Lint, typecheck, unitarios, build y Playwright completos.
- [ ] Firefox 3D, accesibilidad y presupuesto de rendimiento guardados.
- [ ] Revisar cabeceras HTTPS/CSP/HSTS/anti-framing y rutas `/.env`, `/.git/config`, `/package.json`.
- [ ] Revisar accesos y sesiones de GitHub, Hostinger, dominio, correo y Google; retirar usuarios antiguos.
- [ ] Confirmar 2FA y códigos de recuperación almacenados de forma segura.
- [ ] Rotar credenciales si hay exposición, baja de colaborador o actividad sospechosa.
- [ ] Descargar backup y comprobar integridad; restaurar una muestra al menos trimestralmente.
- [ ] Revisar errores 404 y enlaces externos rotos.

## Cada mes — rendimiento y UX

- [ ] PageSpeed/CrUX móvil y escritorio: LCP, INP y CLS; comparar con el mes anterior.
- [ ] Ejecutar `npm run test:performance:strict`; mantener plan para cualquier fallo.
- [ ] Revisar peso de HTML, CSS, JS e imágenes y nuevos preloads.
- [ ] Probar formulario y popup bloqueado en móvil/desktop.
- [ ] Revisar a 320 px, zoom 200 %, teclado y movimiento reducido.
- [ ] Comprobar visualmente Chrome, Firefox, Safari y Edge actuales.

## Cada mes — comercial y CRO

- [ ] Visitas útiles → precios → formulario → lead → propuesta → venta → plan mensual.
- [ ] Tasa de contacto, propuesta, cierre y adhesión mensual; registrar fuente.
- [ ] Motivos de no compra y objeciones reales; no rediseñar por una opinión aislada.
- [ ] Comparar ingresos únicos, MRR, churn y horas consumidas por cada plan.
- [ ] Verificar rentabilidad de 55 €/mes y 89 €/mes con tiempo real invertido.
- [ ] Añadir o mejorar un caso real con permiso y evidencia.
- [ ] Revisar CTA/precios solo si hay datos suficientes; documentar cualquier test A/B.

## Cada mes — SEO local y contenido

- [ ] Search Console: cobertura, consultas, CTR, canonical, sitemap y acciones manuales.
- [ ] Google Business Profile: datos, horario, categorías, mensajes, fotos y publicaciones.
- [ ] Responder reseñas con tono humano; no incentivar reseñas engañosas.
- [ ] Comprobar NAP idéntico en web, GBP y directorios principales.
- [ ] Publicar contenido/caso basado en experiencia real e intención de cliente.
- [ ] Revisar title, description, headings, enlaces internos y schema al cambiar servicios.
- [ ] Revisar que ES/EN (y CA si se incorpora) estén sincronizados en contenido y legales.

## Cada trimestre

- [ ] Restauración completa de backup en entorno aislado.
- [ ] Auditoría manual WCAG con lector de pantalla y dispositivos reales.
- [ ] Revisión de políticas, proveedores, encargados, retención y transferencias.
- [ ] Revisión de precios, impuestos, contrato, SLA y condiciones del plan mensual.
- [ ] Revisión de licencias/autorizaciones de activos y testimonios.
- [ ] Revisar CSP y posibilidad de eliminar `'unsafe-inline'` con una arquitectura futura.
- [ ] Revisar acciones fijadas de GitHub y actualizar a commits oficiales nuevos.

## Registro mínimo

| Fecha | Responsable | Tests | Backup/restauración | CWV móvil | Leads/ventas/MRR | Incidencias | Próxima acción |
|---|---|---|---|---|---|---|---|
| AAAA-MM-DD |  |  |  |  |  |  |  |
