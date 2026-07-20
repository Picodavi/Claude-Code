# Picodavi — tu web

> **Versión anterior.** La portada que se publica actualmente está en
> `../web-next/`. Esta carpeta se conserva como referencia y para las demos que
> el despliegue copia a producción.

Esta es la web de **Picodavi** (David). Es una web estática: solo archivos, sin
programas raros, sin instalar nada. Funciona arrastrándola a Hostinger tal cual.

Este README está pensado para leerse con calma. Si sabes abrir el Bloc de notas,
sabes editar tu web.

---

## 1. Ver la web en tu ordenador

**Doble clic en `index.html`.** Se abre en tu navegador (Chrome, Edge…) y ya está.
No necesitas internet para verla (salvo las tipografías, que se ven igual con
otra letra si estás sin conexión).

> ¿Lo ves todo blanco un segundo y luego aparece "PICODAVI"? Es la animación de
> entrada. Normal.

---

## 2. Subir la web a Hostinger (publicarla en internet)

1. Entra en **hPanel** de Hostinger → **Archivos** → **Administrador de archivos**.
2. Abre la carpeta **`public_html`** (ahí va tu web).
3. Arrastra **todo el contenido de esta carpeta** dentro de `public_html`:
   - `index.html`
   - `.htaccess`
   - las carpetas `css/`, `js/`, `lib/`, `assets/`
4. Espera a que suba. Entra en tu dominio y comprueba que se ve.

> **Importante:** sube el archivo `.htaccess` también. Empieza por un punto y a
> veces queda oculto; en el Administrador de archivos de Hostinger se sube sin
> problema. Hace que la web cargue más rápido.

Si no aparece nada, mira el punto **6** (cómo refrescar).

---

## 3. Editar tus datos (teléfono, email, textos, idiomas)

**Casi todo lo editable está en un solo archivo: `lib/manifest.js`.**

Ábrelo con el Bloc de notas, VS Code, o cualquier editor. Cambia lo que haya
**entre comillas** `" "` y guarda. No borres las comas ni las llaves `{ }`.

### Cambiar el número de WhatsApp
**Tu teléfono ya está puesto: 643 78 07 53.** No tienes que hacer nada más.

Si algún día lo quieres cambiar, busca en `lib/manifest.js` el campo `whatsapp`:

```js
whatsapp: "34643780753",
phoneDisplay: "643 78 07 53",
```

- `whatsapp` es el número con prefijo de país y **solo dígitos** (España = `34`).
- `phoneDisplay` es cómo se ve en pantalla (con espacios, bonito).

Cambiar `whatsapp` actualiza de golpe TODOS los enlaces de WhatsApp de la web:
el botón "Hablamos", el botón flotante verde del móvil, el panel de contacto,
el footer y los botones de las páginas de proyecto.

### Cambiar Instagram
Justo debajo, en **`// EDITAR: Instagram`**, pon tu usuario **sin la @**:

```js
instagram: "picodavi",
```

### Cambiar el email
En el mismo bloque `brand`:

```js
email: "picoiudavid@gmail.com",
```

### Cambiar precios y textos de servicios
Los textos visibles de las tarjetas y precios están en dos sitios:
- **`index.html`** → el texto que se ve (busca, por ejemplo, `650 €`).
- **`lib/manifest.js`** → dentro de `i18n` → `es` y `en` (las traducciones).

Para que un cambio salga en español **y** en inglés, edítalo en `index.html`
(versión española visible) y en `i18n.es` / `i18n.en` de `manifest.js`.

### Traducciones (Español / Inglés)
La web tiene un botón **ES / EN** arriba a la derecha. Todos los textos viven en
`lib/manifest.js`, dentro de `i18n`:

```js
i18n: {
  es: { "hero.title2": "trabajar.", ... },
  en: { "hero.title2": "work.",     ... }
}
```

Cada texto tiene una "clave" (por ejemplo `"hero.title2"`). Cambia el texto de la
derecha y guarda. Si dejas una clave vacía, se queda el texto en castellano.

---

## 4. Añadir un proyecto nuevo al portfolio

Los proyectos están en `index.html`, dentro de la sección
`<!-- 04 · PORTFOLIO -->`. Cada uno es un bloque `<article class="project">`.

La forma más fácil:

1. Copia un bloque `<article class="project"> … </article>` entero (de los que ya hay).
2. Pégalo justo debajo, dentro de `<div class="work__grid">`.
3. Cambia el **nombre**, el **tipo**, la **descripción** y el **estado**:
   - `class="status status--real"` → badge verde **"Proyecto real"**.
   - `class="status status--demo"` → badge gris **"Proyecto de ejemplo"**.
4. El dibujo de la pantalla (el `<svg>`) puedes dejarlo como está o ajustar los
   colores. No hace falta tocarlo para publicar.

> Mantén la honestidad: si un proyecto no es de un cliente real, déjalo como
> **"Proyecto de ejemplo"**. Es lo que genera confianza de verdad.

---

## 5. ¿Y las animaciones? (GSAP)

La web trae GSAP en la carpeta `lib/` (`gsap.min.js` y `ScrollTrigger.min.js`)
para las animaciones avanzadas (el carrusel horizontal de "Cómo funciona").

**No te preocupes por esto:** si esos archivos faltaran, la web sigue funcionando
y animada con efectos nativos del navegador. Nunca se rompe ni se queda a medias.

---

## 6. He hecho un cambio y NO se ve

El navegador guarda la web en memoria para ir más rápido. Para forzar que cargue
la última versión:

- **Windows:** `Ctrl` + `F5`
- **Mac:** `Cmd` + `Shift` + `R`

Si aún así no se ve y ya lo subiste a Hostinger, cambia el "número de versión" de
los archivos. En `index.html`, al final, verás cosas como:

```html
<link rel="stylesheet" href="css/styles.css?v=20260622" />
<script defer src="js/main.js?v=20260622"></script>
```

Sube ese número (por ejemplo a `?v=20260623`) **en todas las líneas** que tengan
`?v=` y vuelve a subir el `index.html`. Eso obliga a todos los navegadores a
descargar la versión nueva.

---

## 7. Estructura de archivos

```
.
├── index.html          La web (todo el contenido visible)
├── .htaccess           Configuración de Hostinger (velocidad y seguridad)
├── README.md           Este archivo
├── css/
│   └── styles.css      El diseño
├── js/
│   └── main.js         Las animaciones y el comportamiento
├── lib/
│   ├── manifest.js     TUS DATOS: contacto, servicios, proyectos, traducciones
│   ├── gsap.min.js     Librería de animación (opcional)
│   └── ScrollTrigger.min.js
├── proyectos/          Caso de estudio del proyecto real
│   └── xalet-la-coromina.html
└── assets/
    ├── credits.json    Origen y licencia de cada foto de stock
    └── img/            Las fotos (puedes sustituirlas por las tuyas)
```

---

## 8. Cambiar las fotos por las tuyas

Todas las fotos están en **`assets/img/`**. Para cambiar una por una tuya
(por ejemplo, una imagen que generes con Higgsfield, Midjourney, o una foto real):

1. Prepara tu imagen y **renómbrala con el mismo nombre exacto** que la que quieres
   sustituir (por ejemplo `sobre-mi.jpg`, `xalet.jpg`…).
2. Cópiala dentro de `assets/img/`, sustituyendo la que había.
3. Abre la web con `Ctrl+F5`. Tu foto aparece sola, sin tocar nada más.

> Truco: si pones una imagen con un nombre que la web espera pero aún no tienes,
> verás un recuadro gris con el nombre del archivo que falta. En cuanto guardes la
> foto con ese nombre, el recuadro desaparece y se ve tu imagen.

Fotos que usa la web (todas en `assets/img/`):

| Archivo | Dónde sale |
|---|---|
| `sobre-mi.jpg` | Sección "Sobre mí" |
| `xalet.jpg`, `xalet2.jpg` | Página del Xalet La Coromina |
| `hero.jpg`, `process.jpg` | De reserva (no se usan ahora; puedes aprovecharlas) |

Las fotos actuales son de **Unsplash** (uso libre). Su origen está documentado en
`assets/credits.json` por si lo necesitas.

---

## 9. Las páginas de cada proyecto

Cada proyecto del portfolio tiene su propia página de detalle (caso de estudio) en
la carpeta **`proyectos/`**. Los botones "Ver proyecto / Ver diseño" del portfolio
del `index.html` ya enlazan a ellas.

- **Editar el texto** de una página de proyecto: casi todo el texto está en
  `lib/manifest.js`, dentro de `i18n`. Las claves empiezan por:
  - `xa.` → Xalet La Coromina (proyecto real: xaletlacoromina.com)
  - `dp.` → textos comunes (títulos "El reto", "La solución", botones…)
- **Cambiar la foto** de una página: sustituye su archivo en `assets/img/`
  (ver punto 8).
- **Añadir un proyecto nuevo:** lo más fácil es **duplicar** uno de los archivos
  `.html` de `proyectos/`, renombrarlo (por ejemplo `mi-proyecto.html`), cambiar
  los textos dentro, y enlazarlo desde la tarjeta correspondiente en `index.html`.

> Honestidad: las páginas de la Clínica y el Hotel llevan un aviso visible de que
> son **proyectos de ejemplo** (no clientes reales) y hablan en condicional
> ("permitiría", "ayudaría"). El Xalet es un **proyecto real**. Mantén esa
> distinción siempre.

---

## 10. Editar "Sobre mí", las FAQ y los textos nuevos

Todo el texto de las secciones nuevas vive en `lib/manifest.js`, dentro de `i18n`
(en `es` para español y `en` para inglés). Busca la clave y cambia el texto:

- **Sobre mí** → claves que empiezan por `about.` (titular, párrafos, y los 4 datos
  destacados `about.stat1…stat4`).
- **Preguntas frecuentes (FAQ)** → claves `faq.q1`/`faq.a1`, `faq.q2`/`faq.a2`… (la
  pregunta es `q`, la respuesta es `a`). Para añadir o quitar una pregunta, copia
  o borra un bloque `<details class="faq__item">…</details>` en `index.html` y su
  par de claves en el manifest.
- **Qué incluye siempre** → claves `inc.1t`/`inc.1d`… (`t` = título, `d` = detalle).
- **Lo que tu negocio gana** (beneficios) → claves `val.1t`/`val.1d`…
- **¿A quién va dirigido?** → claves `aud.1t`/`aud.1d`… y `aud.close` / `aud.cta`.
- **Mi compromiso** → claves `comp.*` (las tres promesas firmadas).
- **Caso destacado y sectores** → claves `feat.*` y `sect.*`.
- **Barra de confianza** → claves `trust.1`…`trust.5`.
- **Garantías (en Precios)** → claves `guar.1`…`guar.4`.
- **Banda de tecnología** → claves `tech.heading` y `tech.text`.

Recuerda cambiar el texto en **`es` y en `en`** si quieres que salga bien en los
dos idiomas.

---

## 11. Páginas legales y datos por completar

La web incluye tres páginas legales en la carpeta **`legal/`**: `aviso-legal.html`,
`privacidad.html` y `cookies.html`. Están enlazadas desde el pie de todas las
páginas y desde el formulario de contacto.

> **Importante:** son plantillas orientativas. Dentro verás recuadros marcados con
> **`[COMPLETAR]`** (en amarillo). Sustitúyelos por tus datos reales antes de
> publicar en serio. Lo que tienes que rellenar:
>
> - Tu **nombre y apellidos** (titular de la marca personal «Picodavi»).
> - Tu **NIF / DNI**.
> - Tu **dirección** a efectos de notificaciones (o dejarla "bajo solicitud").
> - Confirmar tu **proveedor de hosting** (Hostinger u otro) en la privacidad.
> - Tu **localidad** para la jurisdicción del aviso legal.
>
> No he inventado ninguno de esos datos a propósito. Si tienes dudas, una gestoría
> o asesoría los revisa en 10 minutos. El email (picoiudavid@gmail.com) y el
> teléfono (643 78 07 53) ya están puestos.

El **banner de cookies** aparece solo la primera vez y se acepta con un clic. La
web no usa cookies de seguimiento ni analítica, así que es informativo.

---

## 12. Reseñas: qué hay ahora y qué hacer cuando las tengas

La web **no muestra reseñas** (no inventamos opiniones). En su lugar hay una
sección **«Mi compromiso»** con tres promesas firmadas por ti — genera confianza
sin mentir. Cuando tengas reseñas reales de clientes, dímelo y montamos la
sección de reseñas con opiniones verdaderas (idealmente enlazadas a Google).

## 13. Notas honestas (importante)

- La marca es **Picodavi** (marca personal de David). **No** es una S.L. ni una
  agencia: no lo pongas en ningún sitio, porque no lo es.
- Las **páginas legales** (aviso legal, privacidad, cookies) que se entregan son
  **plantillas básicas orientativas**. La revisión legal final la hace el cliente
  o su gestoría. Esto está escrito así en la web a propósito, para protegerte.
- El **mantenimiento** incluye **hasta 60 min de cambios al mes**. Está dicho en
  la web para que no haya malentendidos.
- Las webs incluyen **una ronda de revisión**; cambios extra se presupuestan aparte.

---

## 14. Antes de publicar (resumen)

Lo que **ya está hecho**:

- **Precios** actualizados: Landing Express 390 €, Web profesional 650 €, Web + Cuidado 450 € + 55 €/mes y Crecimiento Local 89 €/mes.
- **Datos legales provisionales** rellenados (David Picoiu · Viladrau · Hostinger).
  Antes de aceptar pagos o encargos hay que completar el alta e incorporar el NIF
  real al aviso legal de la versión de producción.
- **Favicon** (el iconito de la pestaña) e **imagen para compartir**
  (`assets/og-image.png`) creados.
- Sección **"Antes y después"** (deslizable) y **FAQ de objeciones** añadidas.

Lo que **tienes que hacer tú**:

1. **⚠️ Pon tu dominio.** La web trae el dominio de ejemplo `picodavi.com` en el SEO
   (canonical, sitemap, imagen al compartir y datos estructurados). **Si tu dominio
   es OTRO**, abre estos archivos y reemplaza `https://picodavi.com` por tu dominio
   real: `index.html`, `proyectos/*.html`, `robots.txt` y `sitemap.xml`. (En el Bloc
   de notas: *Edición → Reemplazar*.) Si tu dominio sí es picodavi.com, no toques nada.
2. **SSL** — al subir a Hostinger, activa el certificado SSL (gratis) y descomenta
   el bloque "Forzar HTTPS" del `.htaccess`.
3. (Opcional) Que una **gestoría** revise las páginas legales para tu caso.

---

## 15. SEO técnico (qué lleva y qué te toca a ti)

La web sale con **SEO técnico avanzado de serie** (esto es lo que controla el código):

- **Datos estructurados (JSON-LD):** ficha de negocio (`ProfessionalService`) y FAQ
  marcada, para que Google entienda quién eres, tu zona, tus servicios y tus dudas
  frecuentes (pueden salir como resultados enriquecidos).
- **`sitemap.xml`** y **`robots.txt`** en la raíz.
- **`canonical`** y **Open Graph** (`og:url`, `og:image`) en cada página.
- Títulos y descripciones únicos por página, un solo `<h1>`, textos `alt`, estructura
  semántica y carga muy rápida.

**Lo que mueve el ranking de verdad lo haces tú** (esto NO es código):

1. **Google Business Profile** (gratis) — lo más importante para negocio local.
   Date de alta como "Picodavi · Diseño web", zona Viladrau / Barcelona.
2. **Google Search Console** — añade tu web y envía el `sitemap.xml`.
3. **Reseñas reales** y aparecer en **directorios locales**.

> Honestidad: el código está impecable, pero estar el nº 1 en Google lleva semanas o
> meses de eso de arriba. Nadie serio te promete "primero en una semana".

---

Hecho con cuidado. Si algo no funciona, lo más probable es un `Ctrl+F5` (punto 6).
