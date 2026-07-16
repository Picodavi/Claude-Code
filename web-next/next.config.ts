import type { NextConfig } from "next";

// Exportación estática: `next build` genera HTML plano en `out/`,
// desplegable por FTP a Hostinger (sin servidor Node). Ver docs:
// node_modules/next/dist/docs/01-app/02-guides/static-exports.md
const nextConfig: NextConfig = {
  output: "export",
  // Sin optimizador de imágenes de servidor (no existe en export estático).
  images: { unoptimized: true },
  // /ruta -> /ruta/index.html : Hostinger sirve carpetas con index.html.
  trailingSlash: true,
};

export default nextConfig;
