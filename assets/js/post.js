function getPostSlug() {
  const params = new URLSearchParams(window.location.search);
  return params.get('slug');
}

async function resolvePostFromSlug(slug) {
  const response = await fetch(window.blogConfig.postsIndexPath);
  if (!response.ok) {
    throw new Error('No se encontró el índice de posts.');
  }

  const posts = await response.json();
  return posts.find((post) => post.slug === slug);
}

async function renderPost() {
  const root = document.getElementById('post-content');
  const slug = getPostSlug();

  if (!slug) {
    root.innerHTML = '<h1>Post no especificado</h1><p>Agrega ?slug=... a la URL.</p>';
    return;
  }

  try {
    const post = await resolvePostFromSlug(slug);

    if (!post) {
      root.innerHTML = '<h1>Post no encontrado</h1><p>Revisa el slug en posts/index.json.</p>';
      return;
    }

    const markdownResponse = await fetch(`${window.blogConfig.postsBasePath}${post.file}`);
    if (!markdownResponse.ok) {
      throw new Error('No se pudo cargar el archivo Markdown del post.');
    }

    const markdown = await markdownResponse.text();

    document.title = `${post.title} · Programming & Maths`;
    root.innerHTML = `
      <header>
        <h1>${post.title}</h1>
        <p class="post-meta">${post.date}</p>
      </header>
      ${marked.parse(markdown)}
    `;

    root.querySelectorAll('pre code').forEach((block) => hljs.highlightElement(block));
    enhanceRunnableBlocks(root);

    if (post.script) {
      const script = document.createElement('script');
      script.src = `${window.blogConfig.postsBasePath}${post.script}`;
      script.defer = true;
      root.appendChild(script);
    }
  } catch (error) {
    root.innerHTML = `<h1>Error</h1><p>${error.message}</p>`;
  }
}

renderPost();
