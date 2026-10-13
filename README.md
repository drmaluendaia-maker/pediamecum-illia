# Pediamécum Illia

Webapp responsiva para consulta de medicamentos, búsqueda por principio activo o marca, filtros por presentación, favoritos locales, cálculo por peso y copia del resultado. Incluye logo del Hospital Arturo Illia aportado por el usuario.

## Ejecutar

Requiere Node.js 20 o superior para pruebas/build. No tiene dependencias externas.

```sh
npm test
npm run build
npm start
```

Abrir http://localhost:8000. También puede servirse `dist/` con cualquier servidor estático. Abrir index.html con file:// no permite cargar el JSON en todos los navegadores.

## GitHub y Render

1. Crear un repositorio `pediamecum-illia` en GitHub.
2. Subir **el contenido de esta carpeta**, incluyendo public/, scripts/, tests/, package.json y render.yaml.
3. En Render seleccionar New → Static Site, conectar el repositorio y usar:
   - Build Command: `npm test && npm run build`
   - Publish Directory: `dist`
4. Alternativamente crear un Blueprint con el archivo render.yaml.

Render asignará la URL HTTPS. No necesita base de datos, variables secretas ni backend.

## Datos y cálculo

Los 168 registros se importaron el 13/10/2026 de https://miregistroclinico.com.ar/scripts/vademecumCalculos.js, vinculado desde https://miregistroclinico.com.ar/vademecum. medicamentos.json conserva cada campo original, URL, fecha y SHA-256 de la fuente. Los valores no se corrigieron ni validaron contra bibliografía, por decisión del usuario. El logo no implica aprobación institucional.

El cálculo ponderal es: mínimo(peso × mg/kg/día, máximo diario) / (24 / intervalo) / concentración. Se muestran mg por toma y mL; las gotas conservan el factor original de 20 gotas/mL. Los resultados se redondean a dos decimales en pantalla, sin redondear los cálculos intermedios. Las pautas Dosis y Especial1 muestran consulta manual: no se inventan instrucciones. Se conservan los nombres originales, incluidos sus textos y posibles inconsistencias.

Se eliminaron los umbrales de ocultamiento de comprimidos distintos según búsqueda y se reconstruyó la interfaz. No se usa el JavaScript de presentación original; únicamente se extrajeron sus registros mediante un importador acotado. Todos los medicamentos permanecen visibles al buscar; no se evalúan edad, indicación, función renal/hepática, alergias, interacciones o compatibilidad de vías. Revisar el registro completo y la presentación antes de administrar. No es una validación clínica automatizada.

Actualizar datos requiere obtener la nueva fuente y ejecutar `node scripts/import-source.mjs /ruta/al/archivo.js`, revisar los cambios y correr las pruebas. No hay sincronización automática silenciosa.

## Persistencia y privacidad

Solo se guardan IDs de favoritos en localStorage. El peso no se guarda. No se solicitan datos identificatorios ni se incluyen analíticas externas.

## Reutilización

El catálogo y el logo conservan los derechos de sus titulares; este proyecto no les asigna una licencia nueva. Confirmar condiciones de reutilización antes de una distribución pública del catálogo.

## Verificación

Pruebas del motor: conversiones, máximos, pesos inválidos, pautas manuales, búsqueda sin acentos y valores finitos de todos los registros ponderales. La comprobación visual en navegador no se realizó en este entorno.
