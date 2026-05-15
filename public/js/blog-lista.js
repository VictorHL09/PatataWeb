const POR_PAGINA = 5;
let posts = [];
let paginaActual = 0;

async function iniciarBlog() {
    const res = await fetch('../html/posts/index.json');
    posts = await res.json();
    renderPagina();
}

function renderPagina() {
    const contenedor = document.getElementById('blog-lista');
    const totalPaginas = Math.ceil(posts.length / POR_PAGINA);
    const slice = posts.slice(
        paginaActual * POR_PAGINA,
        paginaActual * POR_PAGINA + POR_PAGINA
    );

    contenedor.innerHTML = `
    ${slice.map(post => `
        <div class="post-tarjeta">
            
            <a class="post-tarjeta-enlace" href="/blog/post.html?id=${post.id}">
                ${post.thumbnail ? `<img src="${post.thumbnail}" alt="${post.titulo}">` : ''}
                
                <div class="post-tarjeta-texto">
                    <h2>${post.titulo}</h2>
                    <time>${post.fecha}</time>
                    <p>${post.resumen}</p>
                </div>

            </a>

        </div>
        `).join('')}

    <nav class="paginacion">

        <img 
            src="../img/arrow.gif" 
            alt="Anterior"
            onclick="${paginaActual === 0 ? '' : 'cambiarPagina(-1)'}"
            class="${paginaActual === 0 ? 'paginacion-disabled' : 'paginacion-btn'}"
            style="transform: scaleX(-1)"
        >

        <span>${paginaActual + 1} / ${totalPaginas}</span>

        <img 
            src="../img/arrow.gif" 
            alt="Siguiente"
            onclick="${paginaActual >= totalPaginas - 1 ? '' : 'cambiarPagina(1)'}"
            class="${paginaActual >= totalPaginas - 1 ? 'paginacion-disabled' : 'paginacion-btn'}"
        >

    </nav>
  `;
}

function cambiarPagina(direccion) {
    paginaActual += direccion;
    renderPagina();
}

iniciarBlog();