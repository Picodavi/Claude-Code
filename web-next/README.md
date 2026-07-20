# Picodavi — web de producción

Esta es la versión que se publica en **picodavi.com**. Está hecha con Next.js y se
exporta como web estática para Hostinger. La carpeta `Picodavi/` de la raíz se
conserva como versión anterior y como fuente de las demos, pero no es la página
principal de producción.

## Trabajar en local

```bash
npm ci
npm run dev
```

Abre `http://localhost:3000`.

## Comprobaciones antes de publicar

```bash
npm test
npm run lint
npm run build
```

La compilación genera `out/`. Las fuentes se autoalojan mediante `next/font` y
las animaciones respetan la preferencia de movimiento reducido.

## Publicación

Un push a `main` que cambie `web-next/**`, las demos o el workflow activa
`.github/workflows/deploy.yml`. GitHub Actions ejecuta las pruebas, compila y
sube `out/` por FTPS a Hostinger. Las credenciales viven en GitHub Secrets; no
deben guardarse en el repositorio.

## Contenido y datos pendientes

- Los textos comerciales e idiomas están en `content/i18n.ts`.
- Los textos legales están en `content/legal.ts`.
- Antes de aceptar pagos o encargos hay que completar el alta, incorporar el NIF
  real y validar con una gestoría el tratamiento fiscal aplicable.
- Los precios públicos son importes base sin IVA; cada presupuesto debe mostrar
  base imponible, impuestos y total.
