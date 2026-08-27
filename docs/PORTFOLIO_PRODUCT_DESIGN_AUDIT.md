# Auditoria de Producto y Diseno del Portafolio

Fecha: 2026-06-07  
Perspectiva: Senior Product + Designer, con criterio de hiring, narrativa profesional y experiencia de usuario.

## Resumen ejecutivo

El portafolio ya tiene una base fuerte: comunica experiencia real, proyectos personales vivos, bilingüismo, trayectoria internacional y una mezcla poco comun de frontend, backend, producto, infraestructura casera y escritura tecnica. El problema principal no es falta de contenido; es que la presentacion no esta convirtiendo esa evidencia en una percepcion inmediata de seniority.

Hoy el sitio se siente mas como un CV web organizado por categorias que como una narrativa profesional intencional. Para alguien que llega en 30 a 60 segundos, especialmente un recruiter, hiring manager o tech lead, la pregunta clave deberia responderse rapido: "Por que Wilberto esta al nivel senior y que tipo de problemas puede liderar?". Esa respuesta existe en el contenido, pero esta dispersa entre bullets largos, secciones secundarias y proyectos que no siempre explican su impacto.

La mejora mas importante es reposicionar el portafolio como una historia de criterio senior: liderazgo tecnico, decisiones de arquitectura, impacto medible, ownership end-to-end, mentoring, producto, pragmatismo y capacidad de aprender/entregar en contextos ambiguos.

## Diagnostico general

### 1. El hero no vende seniority con suficiente precision

El hero actual dice "Ingeniero de Software" y una descripcion amplia sobre resolver desafios tecnicos complejos. Es correcto, pero suena generico. No diferencia a Wilberto de cientos de perfiles full stack.

Lo que deberia pasar:

- En los primeros 5 segundos debe quedar claro el posicionamiento.
- La propuesta profesional debe hablar de seniority, producto e impacto, no solo de tecnologias.
- El hero debe hacer evidente que no eres solo un implementador, sino alguien que lidera iniciativas, reduce deuda tecnica, mejora sistemas y construye productos reales.

Problema actual:

- "Ingeniero de Software" es demasiado neutral.
- "Desarrollador Web Full Stack bilingüe..." describe el perfil, pero no captura el nivel.
- La descripcion habla de "mi objetivo" en vez de presentar evidencia concreta.
- Los CTA "Ver Experiencia" y "Ver Habilidades" empujan hacia secciones tipo CV; para un senior conviene empujar hacia "Ver impacto" o "Ver proyectos".

Recomendacion:

Cambiar el hero hacia una narrativa mas senior:

> Software Engineer especializado en productos web y mobile, con 15+ anos construyendo, modernizando y liderando sistemas full stack para equipos de salud, plataformas internas y productos bilingues.

O mas directo:

> Senior-minded Software Engineer que combina frontend, backend y criterio de producto para convertir sistemas complejos en experiencias mas rapidas, mantenibles y utiles.

CTA recomendados:

- "Ver impacto profesional"
- "Ver productos construidos"
- "Descargar CV"

### 2. La jerarquia narrativa esta invertida

En el orden actual, el sitio presenta:

1. Acerca de
2. Experiencia
3. Habilidades
4. Portafolio
5. Educacion
6. Idiomas
7. Certificaciones

La estructura es logica para un CV, pero no necesariamente para un portafolio senior. Un perfil senior se evalua por impacto, juicio y proyectos, no por listas de skills ni certificaciones.

Problema:

- Las habilidades aparecen antes de los proyectos, pero las habilidades por si solas no prueban nivel.
- Idiomas y certificaciones ocupan demasiado peso visual en comparacion con su valor de decision.
- En las capturas, secciones como "Idiomas" y "Certificaciones" dominan grandes porciones de pantalla con baja densidad de evidencia profesional.

Recomendacion de orden:

1. Hero con posicionamiento senior
2. Impacto destacado / proof points
3. Experiencia seleccionada
4. Proyectos / productos propios
5. Stack tecnico contextualizado
6. Educacion, idiomas y certificaciones como soporte

Una seccion nueva de "Impacto destacado" podria incluir 4 metricas:

- 15+ anos construyendo software full stack
- Liderazgo tecnico en iniciativas para clientes enterprise
- Migraciones Ruby a Go, AngularJS a Vue, Snowplow a Amplitude
- Productos propios publicados en iOS y web

### 3. Hay demasiado espacio visual para contenido de baja conversion

En las capturas de "Idiomas" y "Certificaciones", la pagina usa mucho espacio vertical para informacion que no cambia drasticamente la percepcion de seniority. Los idiomas son importantes, pero dos tarjetas grandes con banderas no justifican tanto protagonismo.

Problema:

- La seccion de idiomas se siente visualmente infantil o de plantilla.
- Las banderas grandes no aportan evidencia de nivel profesional.
- Certificaciones tiene tarjetas grandes y mucho texto descriptivo generico.
- El footer aparece despues de una zona con bastante espacio muerto, lo que hace que el final se sienta plano.

Recomendacion:

- Convertir "Idiomas", "Educacion" y "Certificaciones" en una seccion compacta llamada "Credenciales".
- Mostrar idiomas como chips: "Español nativo", "Ingles profesional / bilingue".
- Mostrar certificaciones como filas compactas con issuer, titulo, fecha y link.
- Reducir las imagenes de insignias a un tamano menor o usarlas como detalle secundario.

Resultado esperado:

El sitio gana ritmo, se reduce friccion y las secciones importantes reciben mas atencion.

### 4. La experiencia contiene evidencia senior, pero los bullets son largos y dificiles de escanear

La experiencia en Included Health tiene muy buen material: liderazgo tecnico, Dependabot/security, refactors, migraciones, performance, LLM, feature flags, Vue, Node, Redis, React, Elasticsearch. Eso es exactamente lo que debe comunicar seniority.

Problema:

- Los bullets son extensos y mezclan varias ideas.
- La palabra "senior" aparece como declaracion, pero faltan pruebas visuales rapidas.
- No hay un resumen por rol que diga "Scope", "Impact", "Leadership", "Stack".
- Las metricas quedan enterradas dentro del texto.

Recomendacion:

Redisenar cada experiencia como una tarjeta con capas:

- Cargo, empresa, periodo
- Una frase de contexto: "Health tech platform serving care coordinators and members"
- 3 chips de scope: "Technical leadership", "Platform modernization", "Security"
- 3 logros maximos con metrica o resultado
- Stack usado

Ejemplo de reescritura:

**Included Health - Team Lead, Ingeniero Full Stack**

Rol de liderazgo tecnico en iniciativas de plataforma, seguridad y producto para herramientas internas de health tech.

- Lideré mejoras de seguridad y campañas Dependabot que elevaron la mantenibilidad del monolito y ayudaron a desbloquear un acuerdo enterprise.
- Modernicé flujos internos para Care Coordinators con Node.js, React, Redis y Elasticsearch, reduciendo tiempos de respuesta y dependencia de herramientas externas.
- Ejecuté migraciones criticas de Ruby a Go, Snowplow a Amplitude y AngularJS a Vue, reduciendo deuda tecnica y mejorando la capacidad de evolucionar producto.

Esto comunica mas decision, menos volumen.

### 5. Las habilidades estan presentadas como inventario, no como criterio

Una lista de tecnologias es util para ATS y escaneo, pero no demuestra seniority por si sola. Para un senior, importa mas como usa esas herramientas para tomar decisiones.

Problema:

- "Frontend", "Backend", "Bases de Datos" y "DevOps" son categorias esperadas.
- No hay distincion entre herramientas dominadas, usadas recientemente o exploradas.
- No se conectan skills con resultados concretos.

Recomendacion:

Cambiar el enfoque de "habilidades tecnicas" a "capacidades":

- Product engineering: discovery ligero, UX pragmatica, shipping, medicion.
- Frontend systems: React, Vue, performance, i18n, accessibility.
- Backend and platform: Node.js, Go, Redis, APIs, Supabase.
- Modernization: migrations, refactors, feature flags, observability.
- Independent shipping: mobile apps, App Store, RevenueCat, Cloudflare Tunnel.

Esto eleva la conversacion de "se usar herramientas" a "se resolver clases de problemas".

### 6. El portafolio es una fortaleza, pero necesita tratamiento de case studies

CiudadanoUSA y Renderlog son fuertes porque muestran iniciativa, producto, audiencia real, bilingüismo, dominio mobile/web y capacidad de entregar fuera del trabajo. Ahora mismo aparecen como tarjetas con highlights, pero podrian vender mucho mas.

Problema:

- Los proyectos no explican con claridad el problema, usuario, decision de producto, restricciones y resultado.
- Se mezclan proyectos fuertes con experimentos pequenos sin suficiente jerarquia.
- Algunos textos son simpaticos, pero pueden bajar la percepcion senior si no estan equilibrados con impacto.

Recomendacion:

Separar los proyectos en dos niveles:

**Productos destacados**

- CiudadanoUSA
- Renderlog
- micalpacheco.com si se quiere mostrar producto para cliente/familia

**Experimentos**

- Paint
- Tic Tac Toe
- Weather AI

Para CiudadanoUSA, crear un mini case study:

- Problema: preparacion de ciudadania para hispanohablantes esta fragmentada y muchas apps no resuelven el puente español-ingles.
- Usuario: inmigrantes que estudian civica y entrevista N-400.
- Solucion: app mobile bilingüe con simulacion, audio, autoridades por zip code y monetizacion Pro.
- Rol: producto, diseño, mobile engineering, backend, lanzamiento.
- Stack: React Native, Expo, Supabase, RevenueCat.
- Resultado: publicado en la App Store de iOS, producto real end-to-end.

Este proyecto por si solo puede demostrar seniority si se cuenta como producto, no solo como "app".

### 7. Falta una capa explicita de "decision-making"

Un senior no solo lista lo que hizo; explica por que tomo decisiones. El sitio deberia mostrar criterio:

- Por que migrar de AngularJS a Vue.
- Por que usar Supabase para CiudadanoUSA.
- Por que correr proyectos personales en Raspberry Pi con Cloudflare Tunnel.
- Como balanceas mantenibilidad, costo, velocidad y experiencia de usuario.
- Como decides cuando refactorizar y cuando entregar.

Recomendacion:

Agregar una seccion corta llamada "Como trabajo" o "Engineering principles":

- Ship small, learn fast.
- Prefiero sistemas simples, observables y mantenibles.
- Modernizo sin romper negocio.
- Diseño experiencias bilingues pensando en contexto real, no solo traduccion.
- Uso IA y automatizacion cuando reducen friccion real.

Esta seccion ayuda a que el visitante perciba seniority sin depender de titulos.

### 8. El lenguaje visual se siente competente, pero no distintivo

La interfaz es limpia, consistente y legible. Sin embargo, visualmente se acerca a una plantilla moderna generica: fondo oscuro, tarjetas claras, chips, sombras, navbar fija. No esta mal, pero no expresa una marca personal fuerte.

Problema:

- El contraste entre fondo oscuro y tarjetas blancas funciona, pero las tarjetas se sienten pesadas.
- Hay mucho radio, sombra y padding, lo cual hace el sitio mas "dashboard template" que "portfolio editorial senior".
- La paleta azul/naranja/marron no parece totalmente intencional: el azul del nav activo y el naranja de certificaciones compiten.
- Las secciones tienen demasiado aire vertical sin tension editorial.

Recomendacion visual:

- Elegir una direccion mas editorial y profesional: menos tarjetas grandes, mas secciones con layout tipografico.
- Usar una paleta mas contenida: navy, blanco, gris, un solo acento.
- Reducir sombras; usar bordes, grids y espaciado como sistema.
- Crear bloques de "evidencia" con numeros grandes y texto breve.
- Usar capturas reales de productos en el portafolio, no solo tarjetas de texto.

### 9. Falta evidencia visual de productos

Para un portafolio de producto/engineering, ver el producto importa. CiudadanoUSA deberia tener screenshots de la app, pantallas de entrevista, N-400, practica, audio, pricing o landing. Renderlog deberia mostrar preview del blog. micalpacheco.com podria mostrar la landing.

Problema:

- El visitante debe hacer clic fuera para ver evidencia.
- Las tarjetas de proyecto dependen demasiado del texto.
- No hay "antes/despues", screenshots, arquitectura o flujos.

Recomendacion:

Agregar imagenes o mockups reales en proyectos destacados:

- 2-3 screenshots por producto.
- Una captura del App Store si aplica.
- Un diagrama simple de arquitectura para CiudadanoUSA.
- Un bloque "What I owned" por proyecto.

Esto cambia la percepcion de "lista de proyectos" a "productos entregados".

### 10. La navegacion es completa, pero puede sentirse densa

El nav incluye siete elementos: Acerca de, Experiencia, Habilidades, Portafolio, Educacion, Idiomas, Certificaciones. En desktop se ve ordenado, pero transmite mentalmente "CV por secciones".

Recomendacion:

Reducir el nav a:

- Inicio
- Impacto
- Experiencia
- Productos
- Contacto

Educacion, idiomas y certificaciones pueden vivir dentro de "Credenciales" o cerca del footer. Menos navegacion da una sensacion mas curada y senior.

### 11. La seccion de certificaciones parece demasiado academica

Las certificaciones son validas, pero la tarjeta de AWS Cloud Practitioner de 2020 y un programa de 2016 no deberian ocupar tanto protagonismo en un perfil con 15+ anos de experiencia y productos reales.

Problema:

- La certificacion AWS Cloud Practitioner es foundational; en un perfil senior no debe competir con liderazgo tecnico real.
- El texto de descripcion suena copiado del issuer, no personalizado.
- El ITEC ocupa una tarjeta grande con descripcion historica, pero no conecta con el presente profesional.

Recomendacion:

Mantenerlas, pero compactar y contextualizar:

- "AWS Cloud Practitioner - base formal para trabajo con cloud y arquitectura."
- "ITEC Multimedia & Web Design - formacion internacional temprana en diseño web."

La certificacion debe apoyar la historia, no liderarla.

### 12. Bilingüismo: oportunidad subutilizada

El sitio es bilingüe y eso es una gran ventaja. Tambien tienes productos en español e ingles. Pero el bilingüismo se presenta como "Idiomas que hablo y escribo", no como una ventaja de producto.

Recomendacion:

Reformular:

- "Construyo productos bilingües para usuarios reales, no solo interfaces traducidas."
- "Experiencia diseñando contenido y flujos español/ingles para contextos sensibles como inmigracion y salud."

Esto conecta idiomas con valor profesional y producto.

### 13. Copy: hay momentos humanos buenos, pero deben usarse con mas control

El texto de proyectos personales tiene personalidad: ideas a las 11pm, necesidades familiares, Raspberry Pi, hija usando la app. Eso es memorable. Pero en un portafolio senior hay que equilibrarlo con señales de rigor.

Riesgo:

- Si el humor aparece antes que el impacto, puede parecer hobby-first.
- "Mi hija lo uso cinco minutos" es humano, pero puede hacer que el proyecto parezca menor.

Recomendacion:

Mantener calidez, pero estructurar cada proyecto asi:

1. Que problema resolvia
2. Que construiste
3. Que decisiones tecnicas/producto tomaste
4. Un detalle humano al final

Ejemplo:

> Experimento de dibujo en Canvas API para explorar interacciones tactiles simples en navegador. Lo use como ejercicio de UX para niños: controles grandes, respuesta inmediata y cero friccion. Bonus: fue la actividad favorita de mi hija durante cinco gloriosos minutos.

### 14. Falta un cierre fuerte

El footer actual dice copyright y "Construido con Vue.js y tecnologias web modernas". Es correcto, pero desaprovecha el final.

Recomendacion:

Agregar una seccion final antes del footer:

**Busco equipos donde pueda ayudar a convertir sistemas complejos en productos claros, rapidos y mantenibles.**

CTA:

- "Hablemos"
- "Ver LinkedIn"
- "Descargar CV"

El final debe convertir, no solo cerrar.

## Priorizacion recomendada

### P0 - Cambios de mayor impacto

1. Reescribir el hero con posicionamiento senior y evidencia concreta.
2. Agregar una seccion de "Impacto destacado" con metricas y proof points.
3. Convertir CiudadanoUSA y Renderlog en mini case studies.
4. Compactar idiomas, educacion y certificaciones en "Credenciales".
5. Reducir bullets largos de experiencia y transformarlos en logros escaneables.

### P1 - Mejoras importantes

1. Reordenar navegacion y secciones alrededor de impacto/productos.
2. Agregar screenshots reales de productos.
3. Crear seccion "Como trabajo" para mostrar criterio senior.
4. Mejorar consistencia visual de colores, tarjetas y espaciado.
5. Cambiar "Habilidades" por "Capacidades tecnicas".

### P2 - Pulido

1. Ajustar microcopy de proyectos pequenos para equilibrar humor e impacto.
2. Mejorar cierre con CTA de contacto.
3. Revisar labels y fechas de certificaciones.
4. Reducir la cantidad de chips repetitivos.
5. Asegurar que todos los textos bilingües tengan el mismo nivel editorial.

## Propuesta de nueva arquitectura

### 1. Inicio

Hero con posicionamiento:

> Software Engineer con 15+ anos creando productos full stack, modernizando sistemas heredados y liderando iniciativas tecnicas para equipos de salud, plataformas internas y productos bilingues.

Proof bar:

- 15+ anos de experiencia
- Health tech + productos propios
- Web, mobile, backend y cloud
- Ingles / Español

CTA:

- Ver impacto
- Ver productos
- Descargar CV

### 2. Impacto

Cuatro bloques:

- Liderazgo tecnico: Team Lead en iniciativas de plataforma y producto.
- Modernizacion: Ruby a Go, AngularJS a Vue, Snowplow a Amplitude.
- Producto end-to-end: CiudadanoUSA publicado en la App Store de iOS.
- Calidad y seguridad: Dependabot, vulnerabilidades, testing, linting, bundle size.

### 3. Experiencia

Timeline mas compacto, con resultados principales y stack.

### 4. Productos

Case studies:

- CiudadanoUSA
- Renderlog
- micalpacheco.com

Experimentos:

- Paint
- Tic Tac Toe
- Weather AI

### 5. Capacidades

Agrupar por problemas que puedes resolver:

- Product engineering
- Frontend architecture
- Backend/platform
- Modernization
- Independent shipping

### 6. Credenciales

Educacion, idiomas y certificaciones compactas.

### 7. Contacto

Cierre con intencion profesional y CTA.

## Recomendaciones de contenido especificas

### Hero actual

Problema:

> Desarrollador Web Full Stack bilingüe con un título en Ciencias de la Computación...

Mejora:

> Software Engineer bilingüe con 15+ anos de experiencia construyendo productos full stack, modernizando plataformas heredadas y liderando iniciativas tecnicas en health tech, web y mobile. Combino criterio de producto, arquitectura pragmatica y ejecucion end-to-end.

### Experiencia

Agregar frase de seniority:

> Mi fortaleza esta en tomar sistemas existentes, entender sus restricciones reales y moverlos hacia una version mas rapida, mantenible y util sin detener el negocio.

### Portafolio

Cambiar subtitulo:

Actual:

> Proyectos que construyo fuera del trabajo...

Mejora:

> Productos y experimentos que muestran como pienso: detectar una necesidad, diseñar una solucion simple, construirla end-to-end y ponerla en manos de usuarios reales.

### Idiomas

Actual:

> Idiomas que hablo y escribo

Mejora:

> Trabajo y construyo productos en español e ingles, con sensibilidad por usuarios bilingües y contextos multiculturales.

### Certificaciones

Actual:

> Certificaciones profesionales y logros

Mejora:

> Credenciales que complementan una trayectoria construida principalmente en producto, sistemas y entrega real.

## Recomendaciones visuales especificas desde las capturas

### Captura de Idiomas

Observaciones:

- Mucho espacio vertical vacio antes y despues de las tarjetas.
- Las tarjetas de banderas son demasiado grandes para el valor informativo.
- La seccion "Certificaciones" aparece parcialmente debajo, generando una transicion rara.
- El titulo "Idiomas" es enorme para una seccion de soporte.

Acciones:

- Convertir a fila compacta dentro de "Credenciales".
- Reducir las banderas o eliminarlas.
- Usar texto con valor profesional: "Español nativo", "Ingles profesional".
- Evitar que esta seccion ocupe casi un viewport completo.

### Captura de Certificaciones

Observaciones:

- La tarjeta de certificacion domina demasiado.
- El contenido parece mas academico que profesional.
- Los chips de habilidades repiten conceptos similares.
- El badge visual esta bien, pero podria ser secundario.

Acciones:

- Reducir a lista compacta.
- Reescribir descripcion con relevancia personal.
- Evitar usar certificaciones como bloque principal de conversion.

### Captura final de Certificaciones/Footer

Observaciones:

- El final del sitio se siente abrupto y administrativo.
- Hay demasiado aire oscuro antes del footer.
- No hay CTA final ni invitacion profesional.

Acciones:

- Insertar cierre con mensaje de disponibilidad/interes.
- Agregar CTA de contacto.
- Usar footer solo para metadata, no como final narrativo.

## Criterio de exito

El rediseño debe lograr que una persona entienda en menos de un minuto:

- Que Wilberto tiene trayectoria senior, con rol formal de Team Lead, Ingeniero Full Stack.
- Que ha liderado iniciativas, no solo implementado tickets.
- Que puede trabajar end-to-end: producto, frontend, backend, mobile, infraestructura, lanzamiento.
- Que tiene criterio para modernizar sistemas existentes sin perder pragmatismo.
- Que su bilingüismo y experiencia multicultural son una ventaja de producto.
- Que sus proyectos personales son productos reales y no solo demos.

## Conclusion

El portafolio no necesita mas contenido; necesita mejor curadoria. La materia prima es fuerte: experiencia larga, impacto medible, liderazgo tecnico, productos publicados, bilingüismo y narrativa humana. El trabajo de producto y diseño consiste en subir esa evidencia a la superficie, darle jerarquia y eliminar peso visual de las secciones que no ayudan a tomar una decision.

La meta no deberia ser "mostrar todo lo que puedo hacer". La meta deberia ser: "en pocos minutos, que alguien senior piense: esta persona entiende producto, sabe operar con sistemas reales, toma buenas decisiones y puede liderar trabajo importante".
