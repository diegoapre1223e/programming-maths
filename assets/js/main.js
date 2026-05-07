async function loadPosts() {
  const list = document.getElementById('posts-list');

  try {
    const response = await fetch(window.blogConfig.postsIndexPath);
    if (!response.ok) {
      throw new Error('No se pudo cargar el índice de posts.');
    }

    const posts = await response.json();

    if (!Array.isArray(posts) || posts.length === 0) {
      list.innerHTML = '<p>No hay posts todavía.</p>';
      return;
    }

    list.innerHTML = posts
      .map(
        (post) => `
          <article class="post-card">
            <h3><a href="./post.html?slug=${encodeURIComponent(post.slug)}">${post.title}</a></h3>
            <p class="post-meta">${post.date}</p>
            <p>${post.description || ''}</p>
          </article>
        `
      )
      .join('');
  } catch (error) {
    list.innerHTML = `<p>Error cargando posts: ${error.message}</p>`;
  }
}

loadPosts();
