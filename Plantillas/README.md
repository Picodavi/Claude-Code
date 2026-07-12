# Plantillas Picodavi

Plantillas premium listas para personalizar por cliente. Cada una es **un solo
archivo HTML** (CSS y JS incluidos): se abre con doble clic, se edita el texto
y se publica. Sin dependencias, sin build.

| Plantilla | Sector | Firma visual |
|---|---|---|
| `restaurante-brasa/` | Restaurante de brasa / cocina de producto | Plato 3D que sigue al cursor, ascuas subiendo, carta con inclinación 3D |

## Reglas de la casa (aprendidas a base de feedback)

- **Tipografías con carácter**, nunca las de plantilla IA (fuera Syne, Inter,
  Space Mono, Playfair, Fraunces…). Cada plantilla lleva su propia pareja.
- **Paleta propia por sector** — nada de cremas por defecto ni negro plano.
- **Una firma 3D por plantilla** (no efectos dispersos): algo que haga decir
  "¿cómo está hecho esto?".
- Grano de película sutil; `prefers-reduced-motion` SIEMPRE respetado;
  contenido visible sin JavaScript.
- Marcadas `noindex` hasta que se personalicen para un cliente real.

## Cómo usar una plantilla con un cliente

1. Copia la carpeta y renómbrala (`restaurante-brasa` → `can-roig`).
2. Cambia textos, teléfono y WhatsApp (buscar `wa.me/34600000000`).
3. Sustituye los SVG por fotos reales del cliente cuando las tengas.
4. Quita `<meta name="robots" content="noindex" />` al publicar de verdad.

> Nota: esta carpeta NO se despliega a picodavi.com (el robot solo sube
> `Picodavi/`). Si algún día quieres demos públicas (p. ej.
> `picodavi.com/plantillas/brasa/`), se mueven dentro de `Picodavi/` y listo.
