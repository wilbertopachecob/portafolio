# Plan de ejecución — Rediseño visual del portafolio

> **Estado:** Dirección visual APROBADA por el dueño (Wilberto). 
> **Alcance:** Re-skin visual del sitio Vue existente. **No** se reescribe contenido, arquitectura de información, ni lógica.
> **Mockup de referencia (fuente de verdad visual):** `redesign/Portfolio Redesign Mockup.html` + `redesign/assets/mockup.css`
> **Repo objetivo:** proyecto Vue 3 + Vite (`portafolio/`).
> **Para la próxima IA / dev:** este documento es autosuficiente. Sigue las fases en orden. Cada fase es independiente y testeable.

---

## 0. Contexto y diagnóstico (por qué este cambio)

El sitio ya tiene **contenido, IA, accesibilidad e ingeniería de nivel senior** (ver `docs/PORTFOLIO_PRODUCT_DESIGN_AUDIT.md`, ya implementado). El único gap real es el **lenguaje visual genérico**, causado por 5 decisiones concretas en los tokens:

1. **Tipografía = Inter** → es la fuente por defecto de toda plantilla de dev. Mayor delator de "template".
2. **Dos acentos en conflicto** → `--primary-color: #2563eb` (azul) **y** `--accent-color: #f59e0b` (ámbar). El hero (`About.vue`) además superpone ambos como gradientes radiales.
3. **Hero 100% centrado** → simétrico = look de plantilla.
4. **Sombra + radius por todos lados** → estética "dashboard", no "editorial senior".
5. **Texto pequeño muy gris** → `--text-muted: #64748b` en eyebrows/captions = contraste flojo.

**Objetivo del rediseño:** editorial, plano, un solo acento, tipografía distintiva, hero asimétrico. Mismo contenido, percepción de seniority mucho mayor.

---

## 1. Lo que NO cambia (no tocar)

- Contenido y copys (`src/i18n/locales/es.json`, `en.json`).
- Estructura de secciones y orden (`src/config/sections.js`).
- i18n, ruteo, analytics, service worker, SEO, structured data, tests de lógica.
- Accesibilidad existente (skip-link, `:focus-visible`, `sr-only`, ARIA, `prefers-reduced-motion`). **Mantener y mejorar, nunca quitar.**
- Stack de build (Vite, Vue 3, vitest).

## 2. Lo que SÍ cambia (resumen)

| Área | Antes | Después |
|---|---|---|
| Tipografía | Inter | Space Grotesk (display) + Hanken Grotesk (body) + JetBrains Mono (labels) |
| Acento | azul **+** ámbar | **un solo** azul royal (oklch-tuned), claro + oscuro |
| Hero | centrado, gradiente doble | asimétrico izq., foto offset, 4 métricas inline, sin gradiente |
| Profundidad | sombras + radius grandes | casi plano: bordes hairline + espacio; sombra solo en mockups de dispositivos |
| Texto muted | `#64748b` | más oscuro (AA) |
| Tarjetas | sombra al hover | borde + translateY al hover, regla de acento superior |

---

## 3. Tokens de diseño (reemplazo en `src/assets/css/main.css` → bloque `:root` y `[data-theme="dark"]`)

> Sustituir los Custom Properties existentes por estos. **Mantener los mismos nombres** (`--primary-color`, etc.) donde sea posible para minimizar cambios en componentes; **añadir** los nuevos. Mapear ámbar → azul (eliminar uso de `--accent-color` ámbar).

### Light (`:root`)
```css
:root {
  /* Acento único (azul royal) — reemplaza azul+ámbar */
  --primary-color: #1d4ed8;        /* antes #2563eb */
  --primary-dark:  #1740b0;        /* hover/pressed */
  --accent-color:  #1d4ed8;        /* << ANTES #f59e0b. Unificado al azul. */
  --accent-tint:   rgba(29, 78, 216, 0.07);

  /* Neutrales (tono frío-neutro, paper editorial) */
  --bg-primary:    #ffffff;
  --bg-secondary:  #f5f6f8;
  --bg-tertiary:   #eceef2;
  --text-primary:  #15171c;
  --text-secondary:#41454f;
  --text-muted:    #5b606c;        /* antes #64748b — sube contraste AA */
  --border-color:  #d6d9e2;
  --border-light:  #e6e8ee;

  /* Tipografía */
  --font-primary: 'Hanken Grotesk', system-ui, -apple-system, sans-serif; /* body */
  --font-display: 'Space Grotesk', system-ui, sans-serif;                  /* NUEVO: títulos */
  --font-mono:    'JetBrains Mono', ui-monospace, monospace;               /* labels/eyebrows */

  /* Radius — bajar (más editorial, menos dashboard) */
  --radius-sm: 6px;
  --radius-md: 8px;
  --radius-lg: 14px;
  --radius-xl: 20px;

  /* Sombras — minimizar. Usar solo en device mockups. */
  --shadow-sm: none;
  --shadow-md: 0 4px 14px -8px rgb(20 23 30 / 0.18);
  --shadow-lg: 0 18px 40px -24px rgb(20 23 30 / 0.45);
  --shadow-xl: 0 20px 44px -28px rgb(20 23 30 / 0.55);
}
```

### Dark (`[data-theme="dark"]`)
```css
[data-theme="dark"] {
  --primary-color: #6d9bff;
  --primary-dark:  #87adff;
  --accent-color:  #6d9bff;
  --accent-tint:   rgba(109, 155, 255, 0.12);
  --bg-primary:    #0b0d12;
  --bg-secondary:  #11141b;
  --bg-tertiary:   #1a1e27;
  --text-primary:  #f3f5f9;
  --text-secondary:#c2c7d2;
  --text-muted:    #8b90a0;
  --border-color:  #2c313d;
  --border-light:  #20242e;
}
```

> **Nota oklch:** el azul `#1d4ed8` ≈ `oklch(0.49 0.21 264)`; el de dark `#6d9bff` ≈ `oklch(0.72 0.15 264)` — misma familia de matiz, solo sube luminosidad para contraste sobre fondo oscuro. Se puede migrar a `oklch()` literal si se desea; el hex equivalente funciona en todos los navegadores objetivo.

---

## 4. Fuentes (cargar / quitar)

**Quitar Inter.** En `index.html`, reemplazar el `<link>` de Google Fonts de Inter por:

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Hanken+Grotesk:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
```

- `JetBrains Mono` ya estaba referenciado en `--font-mono`; conservar.
- **Opcional / recomendado (performance):** self-host con [`@fontsource`](https://fontsource.org/) para evitar render-blocking y dependencia de Google:
  - `npm i @fontsource/space-grotesk @fontsource/hanken-grotesk @fontsource/jetbrains-mono`
  - importar los pesos usados en `src/main.js`. (Ver §8 "Paquetes".)
- Aplicar `font-family: var(--font-display)` a `h1,h2,h3,h4` y `.hero-title`, `.section-title`, `.impact-metric`, números. Body queda en `--font-primary` (Hanken).

---

## 5. Refactor por componente

> Orden de prioridad: **Hero → Impact → Portfolio** (mayor impacto visual), luego el resto. Cada uno tiene `<style scoped>`; ajustar ahí + apoyarse en tokens globales.

### 5.1 `src/assets/css/main.css` (global) — **Fase 1**
- Reemplazar tokens (§3).
- `body { font-size: 17px; }`, body en `--font-primary`.
- Títulos a `--font-display`, `letter-spacing` negativo (`-0.025em` en h2, `-0.035em` en h1).
- `.section-eyebrow`: usar `--font-mono`, `letter-spacing: 0.2em`, con guion previo (`::before` línea 22px). Ver `.eyebrow` en `mockup.css`.
- Quitar `box-shadow` de `.card`, `.timeline-content`, social links; sustituir hover por `border-color` + `transform: translateY(-3px)`.
- `.hero { background: var(--bg-primary); }` y **eliminar** `.hero::before` (gradientes radiales azul+ámbar) en `About.vue`.

### 5.2 `Navigation.vue` — **Fase 4**
- Brand en `--font-display`; opción de sufijo mono `// SWE`.
- Nav links `--font-body`, peso 500; quitar subrayado animado azul si se quiere look más plano (opcional).
- Theme + language toggles: estilo "pill" mono (ver `.pill-toggle`, `.icon-btn` en `mockup.css`).

### 5.3 `About.vue` (HERO) — **Fase 2 (prioridad alta)**
- **Cambiar layout a asimétrico**: grid `1.45fr 0.85fr` (texto izq / foto der). Quitar `text-align:center`, `align-items:center`, `min-height:100vh` centrado.
- Quitar `.hero::before` (gradiente doble).
- Añadir: chip de estado (`.status` con punto verde), `h1` grande en Space Grotesk (apellido en `--text-muted`, no en acento), línea de posicionamiento (subtitle) en display, descripción.
- **Mover las 4 métricas de Impact a una "proofbar" inline** al pie del hero (ver `.proofbar`/`.proof` en `mockup.css`): número en acento + label mono. (Impact section conserva la versión expandida.)
- Foto: cuadrada con radius `--radius-md`, borde hairline, `filter: grayscale(0.12)`, esquina de acento (`.portrait-rule`) y tag mono (`.portrait-tag`). Reemplaza el avatar circular centrado.
- Botones: ver `.btn / .btn-primary / .btn-ghost / .btn-text`.

### 5.4 `Impact.vue` — **Fase 3**
- Mantener grid 4 col. Tarjeta plana: borde hairline, **sin** `box-shadow` base; hover = `translateY(-3px)` + regla de acento superior (`::before`). Ver `.impact-card`.
- Número (`.impact-metric`) en `--font-display`, color acento.

### 5.5 `Portfolio.vue` + `PortfolioScreenshotGallery.vue` — **Fase 3**
- Destacados (CiudadanoUSA, Renderlog) como **case study** de 2 columnas (texto + screenshots). Alternar lado con modificador `.flip` (ver `mockup.css`).
- Texto: meta-chips (tipo, link), `h3`, lead, grid 2×2 Problema/Usuario/Solución/Mi rol (labels mono en acento), bloque Resultado con borde-izq de acento, tags mono.
- Screenshots mobile → marco `.phone` (aspect-ratio 1280/2856, la del medio con `translateY(-18px)`). Screenshots web/blog → marco `.browser` (barra con 3 puntos + url mono).
- Experimentos (4) → grid plano `.exp-card` (mono name + flecha + descripción + etag). Nota de infraestructura en mono (`.infra-note`).

### 5.6 `Experience.vue` — **Fase 5**
- Sustituir timeline con bolitas/línea por **tarjetas de rol** grid `220px 1fr`: aside (periodo mono en acento + empresa display + ubicación) | main (cargo, summary, scope-chips, logros con viñeta rómbica de acento, stack tags con borde superior). Ver `.role`, `.achieve li::before`.

### 5.7 `Skills.vue` — **Fase 5**
- 4 grupos `.cap` con header `01..04` mono + título; skills como **tags mono** (`.cap-tags .tag`), no tarjetas con icono+sombra. Quitar fondo/borde/animación por item; dejar wrap de chips. (Mantiene `observeInView` si se desea fade-in, respetando reduced-motion.)

### 5.8 `HowIWork.vue` — **Fase 5**
- 5 principios en grid 2 col con separador hairline (`.principles` / `.principle`), número mono de acento, título display, descripción. El 5º ocupa fila completa (`.solo`).

### 5.9 `Credentials.vue` — **Fase 6**
- Grid 2 col. Col A: Educación (row con logo UCI) + Idiomas (nota + chips "Español nativo / Inglés profesional"). Col B: Certificaciones como **rows compactas** (badge + título + meta + `conciseDescription`). Ver `.cred-*`. Mantener compacto — son soporte, no protagonistas.

### 5.10 `ContactClosing.vue` — **Fase 6**
- Cierre fuerte: eyebrow, titular grande display (headline existente), CTAs (`Hablemos` primary, `Ver LinkedIn` ghost, `Descargar CV` text). Ya alineado con el contenido actual.

### 5.11 `Footer.vue` — **Fase 6**
- Texto mono pequeño, dos columnas (copyright / "built with"). Borde superior hairline.

---

## 6. Accesibilidad (mantener y subir)

- Contraste: con `--text-muted: #5b606c` (light) los labels 0.72–0.875rem pasan AA. Verificar pares texto/fondo (objetivo **AA**, ideal AAA en body).
- Conservar `:focus-visible` con `outline` de acento (ya existe). Verificar que el outline de acento contrasta en ambos temas.
- Mantener `prefers-reduced-motion`: las animaciones de entrada deben tener **estado final visible como base** y animar solo con clase `.ready` (patrón usado en `mockup.css` → `.reveal`). Nunca dejar `opacity:0` sin JS.
- `alt` en imágenes (perfil, screenshots, logo UCI) — ya presentes en i18n; conservar.
- Targets táctiles ≥ 44px en nav/botones móviles.

---

## 7. Orden de ejecución (fases) y criterios de aceptación

1. **Fase 1 — Tokens + fuentes** (`main.css`, `index.html`, `main.js`). ✅ cuando el sitio carga con Space/Hanken/Mono, sin Inter, un solo azul, y `npm run test` pasa.
2. **Fase 2 — Hero** (`About.vue`). ✅ hero asimétrico, sin gradiente doble, proofbar inline, foto offset; responsive < 880px apila.
3. **Fase 3 — Impact + Portfolio**. ✅ tarjetas planas, case studies con phone/browser frames, experimentos en grid.
4. **Fase 4 — Navigation/Footer**. ✅ toggles pill, brand display.
5. **Fase 5 — Experience + Skills + HowIWork**. ✅ roles en tarjetas, capacidades en chips, principios en grid.
6. **Fase 6 — Credentials + Contact**. ✅ credenciales compactas, cierre fuerte.
7. **Fase 7 — QA**: contraste AA (axe / Lighthouse), `prefers-reduced-motion`, dark mode en todas las secciones, móvil 360px, impresión, `npm run test` + `npm run build` limpios.

**Definición de hecho global:** paridad de contenido con el sitio actual + match visual con `redesign/Portfolio Redesign Mockup.html` en claro y oscuro, sin regresiones de tests/a11y/SEO.

---

## 8. Paquetes nuevos

- **Requeridos:** ninguno. Funciona con Google Fonts vía `<link>` (cambio en `index.html`).
- **Recomendado (performance / offline):**
  - `@fontsource/space-grotesk`, `@fontsource/hanken-grotesk`, `@fontsource/jetbrains-mono` (self-host de fuentes; quita render-blocking de Google). Importar pesos en `main.js` y borrar el `<link>`.
- **Opcional:** ninguno. No se requieren librerías de UI ni de animación; todo es CSS.

---

## 9. Mapa de archivos del mockup → repo

| Mockup | Implementar en |
|---|---|
| `:root` / `[data-theme]` de `mockup.css` | `src/assets/css/main.css` (tokens §3) |
| `.topbar/.brand/.nav/.pill-toggle/.icon-btn` | `Navigation.vue` |
| `.hero*/.portrait*/.proofbar/.proof` | `About.vue` |
| `.impact-*` | `Impact.vue` |
| `.case/.case-*/.phone/.browser/.exp-*/.infra-note` | `Portfolio.vue`, `PortfolioScreenshotGallery.vue` |
| `.timeline/.role/.scope/.achieve/.stack` | `Experience.vue` |
| `.cap/.cap-*` | `Skills.vue` |
| `.principles/.principle` | `HowIWork.vue` |
| `.cred-*/.lang-*` | `Credentials.vue` |
| `.closing/.closing-actions` | `ContactClosing.vue` |
| `.foot/.foot-inner` | `Footer.vue` |
| `.btn*`, `.chip`, `.tag`, `.eyebrow` | utilidades en `main.css` (compartidas) |

---

## 10. Notas finales para quien continúe

- El mockup usa clases utilitarias; en Vue, preferir **tokens globales en `main.css`** + `<style scoped>` por componente (no copiar `mockup.css` tal cual). El mockup es referencia de **resultado**, no de arquitectura CSS.
- El toggle ES/EN del mockup es **visual only**; el sitio ya tiene i18n real — no tocar esa lógica.
- Mantener el patrón de animación de entrada seguro (estado base visible + `.ready`), porque el sitio prerenderiza/hidrata.
- Si quedan dudas de spacing/tamaños exactos, abrir `redesign/Portfolio Redesign Mockup.html` y leer `redesign/assets/mockup.css` (valores en px/rem ahí).
