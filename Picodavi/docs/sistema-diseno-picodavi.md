# 🎨 Sistema de diseño Picodavi

> Esto es la versión "a medida" de un skill de diseño UI/UX, pero para TU marca.
> El comando `/plugin` no funciona en este entorno, así que en vez de instalar un
> generador genérico, aquí tienes las reglas concretas de Picodavi. Dáselas a
> cualquier IA, diseñador o al plugin del otro PC y el resultado será Picodavi,
> no una plantilla genérica.
>
> Regla base: **si una decisión de diseño sirve para cualquier web, es la decisión
> equivocada.** Cada elección debe ser de Picodavi.

---

## 1. Esencia de marca

- **Qué es:** estudio de diseño y desarrollo web para negocios locales de Catalunya (restaurantes, hoteles, clínicas, comercios). Persona real: David, desde Viladrau (Montseny).
- **Idea central:** *taller digital del Montseny*. Oficio hecho a mano, no plantilla. Cercano, honesto, directo, sin humo.
- **Sensación objetivo:** que un dueño de negocio confíe y que un diseñador respete. Cálido pero serio; con carácter, no genérico.
- **Anti-marca (lo que NO somos):** startup tecnológica, agencia corporativa, "IA azul de siempre".

---

## 2. Color · tokens exactos

Definidos en `css/styles.css` (`:root`). Nota histórica: la variable se llama `--blue` pero su valor es **verde pino** (no renombrar para no romper referencias).

| Token | Hex | Uso |
|---|---|---|
| `--bg` | `#FFFFFF` | Fondo dominante |
| `--surface` | `#F3F1EC` | Piedra caliza cálida — bandas y tarjetas alternas |
| `--ink` | `#16130E` | Titulares (casi negro cálido) |
| `--text` | `#2C271F` | Cuerpo |
| `--muted` | `#6E675F` | Texto secundario (cumple AA sobre blanco) |
| `--blue` (pino) | `#15533B` | **Acento primario.** Botones, enlaces, activos, checks |
| `--blue-700` | `#0F3F2D` | Hover del acento |
| `--blue-tint` | `#E7EFEA` | Fondos de highlight suave |
| `--spark` (ámbar) | `#DE8E29` | **Chispa / "dopamina".** Detalles, hovers, acentos vivos. NUNCA texto sobre blanco (no cumple contraste) |
| `--spark-700` | `#B9701A` | Ámbar para texto/bordes si hace falta contraste |
| `--spark-tint` | `#FBEFD9` | Fondo ámbar muy suave |
| `--border` | `#E5E1D7` | Bordes cálidos |

**Reglas de color:**
- El **pino** manda; el **ámbar** es la sal, se usa con moderación (1-2 toques por pantalla).
- Prohibido el azul `#2563EB` y morados/degradados "IA". Si aparece azul, es un error.
- Sobre fondos de color, el texto usa el tono más oscuro de esa misma familia, nunca negro puro.
- Grounding: pino = bosque del Montseny; ámbar = la castaña de Viladrau (tu propio caso real). La paleta cuenta tu historia.

---

## 3. Tipografía

| Rol | Fuente | Pesos | Uso |
|---|---|---|---|
| Display | **Bricolage Grotesque** | 600 / 700 / 800 | Titulares. Con carácter, tamaño generoso, tracking ajustado |
| Cuerpo | **Hanken Grotesk** | 400 / 500 / 600 | Párrafos y UI. Cálida y legible |
| Utilidad | **Space Mono** | 400 / 700 | Eyebrows, datos, precios, etiquetas técnicas |

**Reglas:**
- Prohibida **Inter** (y Roboto, Poppins, system-ui como fuente "de marca"): son el delator nº 1 del look IA.
- Jerarquía por **tamaño y peso**, no por color. Un solo acento de color por bloque.
- Los precios y datos en Space Mono (refuerzan el aire "técnico honesto").
- Sentence case en titulares. Nada de MAYÚSCULAS gritando ni Title Case En Todo.

---

## 4. Espaciado, radios y layout

- **Ritmo de sección:** `--section-y: clamp(4.5rem, 9vw, 8rem)` arriba y abajo. **Todas** las secciones lo respetan (consistencia = profesionalidad). Excepción justificada: una sección puede llevar `padding-bottom: 0` solo si la banda siguiente es del mismo color y forman un bloque continuo.
- **Ancho máximo:** `--wrap: 1200px`. Gutter fluido `clamp(1.25rem, 5vw, 4rem)`.
- **Radios:** `14px` general, `10px` pequeño, `22px` grande. Coherencia: no mezclar radios al azar.
- **Rejilla:** asimetría intencionada mejor que centrado perfecto en todo. El hero puede romper el grid; el resto, disciplinado.

---

## 5. Movimiento e interacción

Filosofía: **un momento orquestado vale más que mil efectos.** Demasiada animación también huele a IA.

Lo que hay (y por qué):
- **Splash de entrada** (PICODAVI letra a letra + barra pino→ámbar): un solo momento memorable al cargar.
- **Cursor personalizado** con etiqueta contextual: firma de marca, sensación "hecho a mano".
- **Reveal al hacer scroll** (`.reveal`): sutil, corto, con `--ease` exponencial. Sin rebotes.
- **Tilt/parallax** (`initTilt`) en la maqueta del hero: responde al ratón, da vida sin cansar.
- **Marquee** de sectores: movimiento ambiental continuo.

**Reglas de movimiento:**
- Duración hover 150–300 ms. Easing `cubic-bezier(.22,1,.36,1)` (ease-out, sin bounce).
- Respetar SIEMPRE `prefers-reduced-motion` (ya contemplado en el CSS).
- El ámbar aparece en los hovers/activos: ahí va la "dopamina".
- Nada de animaciones que bloqueen la lectura o se repitan en bucle llamativo.

---

## 6. Componentes

- **Botón primario:** fondo pino, texto claro, hover a `--blue-700` con leve realce. CTA principal único por pantalla.
- **Botón secundario:** contorno, sin relleno.
- **Tarjeta:** fondo `--surface` o blanco, borde `--border`, radio 12–14px. Hover: leve elevación + acento pino/ámbar. Sin sombras pesadas ni glassmorphism.
- **Badge "Recomendado":** fondo pino claro / texto pino oscuro. Destacar solo lo que de verdad recomiendas.
- **Eyebrow de sección:** Space Mono, pequeño, con número si —y solo si— la sección es de verdad una secuencia (el proceso 01/02/03 sí; una lista de ventajas no).

---

## 7. Voz y tono (el copy también delata la IA)

- Claro, directo, humano. Frases cortas. Cero relleno.
- Nada de lenguaje de gurú ("desbloquea tu potencial", "soluciones a medida de 360°").
- Habla desde el lado del cliente: "tu web siempre al día", no "gestión de mantenimiento continuo".
- Honestidad de marca: distinguir proyecto real de ejemplo, precio cerrado, sin letra pequeña.
- Español natural: evitar traducciones literales del inglés y construcciones raras ("pone fácil que…").

---

## 8. Anti-patrones · lo que hace que "huela a IA" (evitar siempre)

1. ❌ Azul `#2563EB` + Inter + degradado morado. El combo genérico por excelencia.
2. ❌ Animar absolutamente todo con fade-up. Elige pocos momentos.
3. ❌ Espaciados inconsistentes entre secciones (todas a `--section-y`).
4. ❌ Numerar 01/02/03 cosas que no son una secuencia.
5. ❌ Copy de relleno, adjetivos vacíos, "júzgalo tú mismo" y frases forzadas.
6. ❌ Tres secciones distintas diciendo lo mismo (confianza, cercanía, trato directo) — fusiona.
7. ❌ Emojis como iconos. Usa SVG de línea coherentes.

---

## 9. Checklist antes de publicar cualquier página

- [ ] ¿Usa pino + ámbar + neutros cálidos? ¿Cero azul genérico?
- [ ] ¿Bricolage en titulares, Hanken en cuerpo, Space Mono en datos?
- [ ] ¿Todas las secciones con el mismo ritmo vertical?
- [ ] ¿Un solo CTA primario por pantalla?
- [ ] ¿Máximo 1–2 toques de ámbar por vista?
- [ ] ¿Movimiento sutil y `prefers-reduced-motion` respetado?
- [ ] ¿Copy claro, humano, sin relleno ni traducción literal?
- [ ] ¿Se ve bien en móvil (375px), tablet (768px) y escritorio?
- [ ] ¿Foco de teclado visible? ¿Contraste AA en textos?
- [ ] Test final: ¿esta pantalla podría ser de cualquiera, o es inconfundiblemente Picodavi?
