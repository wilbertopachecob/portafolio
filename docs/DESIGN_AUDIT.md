# Auditoria de diseno — Portfolio de Wilberto Pacheco Batista

**Perspectiva:** Senior Product Designer, criterio tipo Google: claridad, jerarquia, confianza, accesibilidad y conversion.  
**Objetivo del sitio:** Convertir a hiring managers, recruiters tecnicos y lideres de producto/ingenieria en una conversacion. El sitio debe comunicar rapidamente seniority, criterio de producto, modernizacion de sistemas, ownership end-to-end y capacidad bilingue.  
**Material revisado:** Capturas de `localhost:8080/portafolio`, estructura Vue, tokens CSS, componentes principales, assets, i18n y accesibilidad.  
**Fecha:** Junio 2026

---

## Resumen ejecutivo

El portfolio ya tiene una base fuerte: narrativa senior, arquitectura i18n limpia, buen uso de secciones, dark mode, skip link, CTAs claros y casos de producto mas curados que una lista de tecnologias. El problema principal no es la direccion, sino la ejecucion visual: la pagina se siente demasiado uniforme, con poco ritmo entre secciones, demasiada dependencia de bordes finos, algunas grillas con tarjetas huerfanas y una jerarquia visual que no siempre guia al recruiter hacia lo mas importante.

La recomendacion de alto nivel: hacer que el sitio parezca menos "template tecnico dark" y mas "producto personal de un senior engineer con criterio". Para lograrlo, conviene simplificar el hero, introducir una firma visual mas humana, ordenar las grillas, mejorar contraste/espaciado y usar los screenshots como evidencia de producto, no solo como thumbnails.

---

## P0 — Cambios que mas elevan percepcion senior

### 1. Simplificar el hero

**Problema:** El primer viewport carga demasiadas zonas: nombre, subtitulo, descripcion, email, ubicacion, iconos sociales y tres CTAs. La captura completa muestra una entrada visualmente limpia, pero cognitivamente densa.

**Riesgo:** En 5-8 segundos, un recruiter deberia entender "quien eres, que valor traes y que hago despues". Ahora compiten demasiadas acciones.

**Recomendacion:**

- Mantener: nombre, una propuesta de valor, descripcion corta, 2 CTAs maximo.
- Mover email/ubicacion al cierre/contacto.
- Usar `Ver impacto` como CTA primario y `Hablemos` o `LinkedIn` como secundario.
- Dejar `Descargar CV` en nav o seccion final, no como tercer CTA hero.

**Resultado esperado:** Menos ruido, mas seguridad, mayor conversion hacia las secciones que prueban seniority.

### 2. Agregar presencia humana

**Problema:** Existe `src/assets/img/profile_cropped.jpg`, pero el hero no muestra rostro. Para un portfolio personal senior, una foto bien integrada genera confianza inmediata.

**Recomendacion:**

- Agregar avatar circular de 112-140px en el hero.
- Aplicar borde sutil `1px solid var(--border-color)` y shadow suave.
- Evitar que parezca badge decorativo; debe verse como identidad profesional.

**Criterio:** Google-style product storytelling favorece confianza, claridad y memorabilidad. Una cara ayuda mas que otro gradiente.

### 3. Arreglar tarjetas huerfanas

**Problema:** En `Como trabajo` hay 5 tarjetas con `auto-fit`, lo que crea 4 arriba y 1 sola abajo en desktop. En `Capacidades tecnicas`, 4 categorias pueden terminar como 3+1 segun ancho.

**Recomendacion:**

- `Como trabajo`: usar layout 3+2 centrado o 2 columnas estables.
- `Capacidades tecnicas`: usar 2x2 en desktop.
- Evitar `auto-fit` para contenidos editoriales con cantidad fija.

**Impacto:** Este es uno de los detalles que mas rapidamente delata falta de direccion visual, aunque el codigo sea correcto.

### 4. Crear ritmo entre secciones

**Problema:** Casi todas las secciones viven sobre el mismo fondo oscuro. La pagina se lee como una columna continua; los cambios de tema dependen de titulos y cards.

**Recomendacion:**

- Alternar `--bg-primary` y `--bg-secondary` por seccion.
- Dar al hero y al CTA final un tratamiento mas editorial.
- Mantener los bloques de contenido con max-width consistente.

**Ejemplo:** Hero con fondo ligeramente elevado, Impacto en fondo base, Productos en fondo alterno, Experiencia en base, Skills en alterno.

---

## Layout, margenes y padding

### Observaciones

- El ancho central funciona bien, pero varias secciones tienen demasiado aire superior/inferior para la cantidad de contenido real.
- `Credenciales` y `Como trabajo` muestran cards muy altas con contenido relativamente corto, lo que se siente vacio.
- `Capacidades tecnicas` deja una zona vacia enorme a la derecha/inferior cuando la cuarta categoria cae sola.
- Las cards principales tienen buen padding, pero casi todas usan el mismo peso visual; no hay suficiente diferencia entre contenido primario, secundario y terciario.

### Sugerencias

- Reducir el padding vertical de secciones secundarias de `var(--space-3xl)` a una escala responsive mas compacta.
- Para cards con poco texto, usar layout horizontal o reducir min-height implicito.
- Mantener una regla de sistema:
  - Secciones principales: 96px desktop / 64px mobile.
  - Secciones secundarias: 72px desktop / 48px mobile.
  - Cards densas: 24px padding.
  - Cards editoriales: 32px padding.

---

## Tipografia

### Lo que funciona

- Inter es una buena eleccion: moderna, legible, compatible con producto.
- La escala general de H1/H2 funciona en desktop.
- La voz del copy comunica seniority: "modernizacion", "producto", "entrega", "contexto real".

### Lo que debe mejorar

- El H1 usa gradiente y luego `Batista` fuerza `-webkit-text-fill-color`. Visualmente parece un bug: una parte del nombre es gradiente y otra plana.
- Los subtitulos usan `--text-muted`; en dark mode se ven algo apagados para contenido que debe orientar.
- Los headings de todas las secciones tienen el mismo tratamiento; falta una firma visual por jerarquia.

### Sugerencias

- Decidir una sola logica para el nombre:
  - O todo el H1 con gradiente.
  - O nombre en blanco y apellido/acento en azul.
- Usar `--text-secondary` para subtitulos de seccion y reservar `--text-muted` para metadata.
- Reducir line length de textos centrados a 560-600px.
- Agregar un pequeno eyebrow o acento visual por seccion, por ejemplo `PRODUCTOS`, `EXPERIENCIA`, `CREDENCIALES`, pero sin sobrecargar.

---

## Color

### Diagnostico

La paleta dark es coherente, pero demasiado plana. El azul funciona como color principal, aunque se usa para demasiadas cosas: enlaces, badges, bullets, hover, timeline, CTAs y estados activos. Cuando todo es azul, nada es realmente prioritario.

### Problemas especificos

- `--accent-color` existe pero casi no se usa.
- Los bordes `#334155` contra `#0f172a` son muy sutiles; muchas cards dependen de un contorno dificil de percibir.
- Botones outline en dark mode se ven debiles.
- Los hovers azules en cards no interactivas sugieren que todo se puede clickear.

### Sugerencias

- Reservar azul fuerte para acciones y metricas clave.
- Usar el accent amber solo en pequenos momentos de energia: metricas de impacto, highlights o chips de "featured".
- Subir contraste de `--text-muted` en dark mode.
- Dar a `.btn-outline` un fondo sutil: `rgba(255,255,255,0.04)` y borde mas claro.
- En hover de cards no clickeables, usar elevacion o cambio de fondo, no borde azul.

---

## Cards y bordes

### Diagnostico

El sistema de cards es consistente, pero demasiado repetido. La pagina parece construida con la misma pieza una y otra vez. Eso da orden, pero tambien monotonia.

### Sugerencias

- Definir reglas:
  - `radius-lg` para cards principales.
  - `radius-md` para botones, chips y tags.
  - `radius-xl` solo para media/screenshot frames si se quiere un look mas premium.
- No usar `border-color: var(--primary-color)` en hover de cards informativas.
- Aumentar contraste de `.skill-item` con borde propio.
- Diferenciar cards featured de cards compactas con composicion, no solo borde/gradiente.

---

## Imagenes y screenshots

### Lo que funciona

- Los screenshots de CiudadanoUSA y Renderlog son la evidencia mas fuerte del portfolio.
- Los proyectos se presentan como productos/casos, no solo como repositorios.

### Problemas

- Falta una imagen humana en el primer viewport.
- Algunos logos institucionales con fondo blanco se sienten pegados sobre dark mode.
- Los screenshots pueden verse como imagenes encajadas en cards, no como artefactos de producto cuidadosamente presentados.
- PNG/JPG podria optimizarse a WebP/AVIF.

### Sugerencias

- Usar `profile_cropped.jpg` en hero.
- Convertir assets grandes a WebP con fallback si se desea compatibilidad amplia.
- Dar a screenshots aspect ratios consistentes:
  - Mobile: `9 / 19.5`.
  - Desktop: `16 / 9`.
- Evitar crops impredecibles con `object-fit: cover` si el contenido de la pantalla es importante.
- Para logos con fondo blanco, crear un contenedor intencional: fondo blanco, padding consistente, border radius y alt text claro.
- Considerar una composicion mas editorial para CiudadanoUSA: mockups con mayor tamano y una jerarquia clara del problema/resultado.

---

## Iconos

### Diagnostico

Los iconos ayudan, pero hay ruido visual. En el sitio se mezclan iconos sociales, iconos de tecnologia, iconos de metadata, bullets azules y chips. El resultado es correcto, pero podria sentirse mas premium con menos elementos.

### Sugerencias

- Reemplazar banderas de idioma por toggle textual `ES | EN`. Las banderas representan paises, no idiomas.
- Unificar tamano visual de iconos de skills a 16-18px.
- Remover iconos redundantes de fecha/ubicacion en experiencia si el texto ya es claro.
- Mantener iconos solo donde aceleran escaneo o mejoran reconocimiento.

---

## Accesibilidad

### Lo que funciona

- Existe skip link.
- Hay soporte de `prefers-reduced-motion`.
- Se usan labels/aria en varios controles.
- El sitio ya piensa en i18n y navegacion por secciones.

### Riesgos y mejoras

- El `<html lang>` deberia actualizarse con el idioma activo (`es`/`en`).
- Hay headings `sr-only` dentro de componentes que ya reciben heading visible desde `App.vue`; esto puede producir redundancia para screen readers.
- Varias listas usan `div role="list"` y `div role="listitem"`. Funciona, pero `<ul>/<li>` nativo es mas robusto.
- `--text-muted` pasa contraste por poco en dark mode; subirlo reduce fatiga visual.
- El menu desktop usa `role="menubar"` para navegacion normal. Ese rol implica patrones de teclado de menu de aplicacion; para nav web suele bastar `<nav><ul><li><a>`.

### Recomendaciones

- En `App.vue` o watcher de i18n: `document.documentElement.lang = this.$i18n.locale`.
- Quitar headings `sr-only` duplicados en `Skills` y `Portfolio` si la seccion ya tiene `aria-labelledby`.
- Migrar grids informativos a listas nativas.
- Revisar foco visible de botones outline y toggles en dark mode.
- Confirmar con `jest-axe` despues de cambios semanticos.

---

## Navegacion

### Observaciones

- La nav es completa, pero larga para un portfolio de conversion rapida.
- "Inicio" apunta al hero/about, pero la etiqueta podria sentirse generica.
- El orden actual prioriza Impacto y Productos antes de Experiencia; esto es bueno si quieres vender producto primero, pero debe estar alineado con el objetivo laboral.

### Sugerencia de orden

1. Impacto
2. Productos
3. Experiencia
4. Capacidades
5. Como trabajo
6. Contacto

`Credenciales` puede existir en pagina, pero no necesariamente ocupar espacio en nav principal. Es soporte, no argumento principal.

---

## Motion e interacciones

### Problemas

- Las animaciones `fadeInUp` de skills se disparan al montar, no al entrar en viewport.
- Botones con `translateY(-2px)` pueden sentirse nerviosos.
- Cards no clickeables reaccionan como interactivas.

### Sugerencias

- Usar IntersectionObserver para animaciones de entrada.
- En botones, preferir shadow/fondo sobre movimiento fisico.
- En cards informativas, usar hover minimo o ninguno.
- Aplicar `prefers-reduced-motion` tambien a cualquier animacion nueva.

---

## Mobile

### Observaciones

- La arquitectura responsive esta bien encaminada.
- El hero puede volverse largo si conserva contacto + redes + tres CTAs.
- Skills a una columna en pantallas pequenas desperdicia espacio con palabras cortas como `Go`, `Redis`, `AWS`.

### Sugerencias

- Mantener skills en 2 columnas hasta ~340px.
- Reducir drawer mobile de `86vw` a `80vw` o max `320px`.
- Priorizar un CTA principal visible sin scroll excesivo.
- Revisar que tarjetas de experiencia no queden demasiado densas por bullet length.

---

## Performance y deuda visual/tecnica

### Hallazgos

- `App.vue` importa Bootstrap, pero el sitio parece usar un sistema propio.
- `Navigation.vue` contiene muchos `!important`, probablemente por conflicto con Bootstrap.
- `tweaks.css` parece legado.
- `Main.vue`, `Sidebar.vue` y `DarkModeToggle.vue` podrian ser componentes historicos si no estan en uso.

### Recomendaciones

- Remover Bootstrap si no hay dependencia real.
- Eliminar `!important` despues de retirar Bootstrap.
- Auditar y borrar CSS/componentes muertos.
- Mantener un unico sistema de layout/tokens.

---

## Roadmap recomendado

### Sprint 1 — Percepcion y conversion

- Simplificar hero.
- Agregar foto profesional.
- Reducir a 2 CTAs.
- Arreglar tarjetas huerfanas.
- Alternar fondos de seccion.
- Mejorar contraste de subtitulos y outline buttons.

### Sprint 2 — Sistema visual

- Normalizar radius, padding y hovers.
- Ajustar cards no interactivas.
- Mejorar screenshots y aspect ratios.
- Reemplazar banderas por toggle `ES | EN`.
- Usar accent color con intencion.

### Sprint 3 — Accesibilidad y calidad

- Actualizar `<html lang>`.
- Remover headings `sr-only` duplicados.
- Usar listas nativas.
- Revisar roles de navegacion.
- Correr `npm run test:run`, `npm run build`, `npm run lint:check`.

### Sprint 4 — Performance y limpieza

- Remover Bootstrap si no se usa.
- Eliminar `!important` innecesarios.
- Borrar CSS/componentes muertos.
- Convertir assets pesados a WebP/AVIF.

---

## Quick wins

| Prioridad | Mejora | Impacto | Esfuerzo |
|---|---|---:|---:|
| P0 | Simplificar hero a 2 CTAs | Alto | Bajo |
| P0 | Usar foto de perfil | Alto | Bajo |
| P0 | Corregir grillas huerfanas | Alto | Bajo |
| P0 | Mejorar contraste de outline/muted text | Alto | Bajo |
| P1 | Alternar fondos por seccion | Medio | Bajo |
| P1 | Normalizar cards y hovers | Medio | Medio |
| P1 | Aspect ratios para screenshots | Medio | Bajo |
| P1 | Actualizar `<html lang>` | Alto accesibilidad | Bajo |
| P2 | Reemplazar banderas por `ES | EN` | Medio | Bajo |
| P2 | Remover Bootstrap/deuda CSS | Alto tecnico | Medio |

---

## Norte de diseno

El sitio debe sentirse como una conversacion con un ingeniero senior que sabe transformar sistemas complejos en productos claros. Cada decision visual deberia apoyar esa idea:

- Menos decoracion, mas evidencia.
- Menos cantidad, mas curadoria.
- Menos "stack list", mas criterio aplicado.
- Mas humanidad en el primer viewport.
- Mas contraste entre lo principal y lo secundario.
- Mas confianza en el espacio en blanco.

El portfolio esta cerca. La siguiente mejora grande no es agregar mas contenido; es darle mas direccion visual al contenido que ya existe.
