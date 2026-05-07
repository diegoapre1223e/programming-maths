# programming-maths

Plantilla de blog estático (frontend-only) para publicar contenido de programación y matemáticas en GitHub Pages.

## Objetivo

Poder crear posts en Markdown sin copiar HTML y mantener una estructura clara para aprender cómo está construida la web.

## Estructura del proyecto

- `index.html`: listado de posts
- `post.html`: renderizado de un post individual
- `about.html`: explicación de la arquitectura
- `assets/css/styles.css`: diseño global (modo oscuro)
- `assets/js/main.js`: carga y render de tarjetas de posts
- `assets/js/post.js`: carga de un post por `slug`
- `assets/js/markdown.js`: render Markdown, syntax highlight y bloques `runnable`
- `posts/index.json`: índice de posts
- `posts/*.md`: contenido de las entradas
- `posts/scripts/*.js`: scripts opcionales por post

## Crear un nuevo post

1. Crea tu archivo Markdown en `posts/`, por ejemplo `mi-post.md`.
2. Añade una entrada en `posts/index.json`:

```json
{
  "slug": "mi-post",
  "title": "Mi nuevo post",
  "description": "Resumen corto",
  "date": "2026-05-07",
  "file": "mi-post.md",
  "script": "scripts/mi-post.js"
}
```

> `script` es opcional. Úsalo para añadir interactividad específica del post.

3. Abre `post.html?slug=mi-post`.

## Markdown y código

Soporta títulos, listas, negrita, cursiva, imágenes y bloques de código.

- Bloque normal con resaltado:

````markdown
```javascript
console.log('hola');
```
````

- Bloque ejecutable en sandbox (botón Run):

````markdown
```javascript runnable
console.log('se ejecuta en iframe sandbox');
```
````

## Visualizaciones matemáticas (2D/3D)

La arquitectura ya permite cargar scripts personalizados por post, por lo que puedes integrar librerías como Three.js o canvas 2D dentro de `posts/scripts/*.js` sin cambiar la base.

## Despliegue en GitHub Pages

1. Sube el repositorio.
2. En GitHub: **Settings → Pages**.
3. En **Build and deployment**, selecciona **Deploy from a branch**.
4. Elige la rama principal y carpeta `/ (root)`.

No requiere backend.
