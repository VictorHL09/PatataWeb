async function cargarPost() {
  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');

  if (!id) {
    window.location.href = '../html/blog.html';
    return;
  }

  const res = await fetch(`../html/posts/${id}.html`);
  const html = await res.text();
  document.getElementById('post-contenido').innerHTML = html;
}

cargarPost();