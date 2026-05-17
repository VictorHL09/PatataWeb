const POR_PAGINA = 5;
let posts = [];
let postsFiltrados = [];
let paginaActual = 0;

async function iniciarBlog() {
    const res = await fetch('../html/posts/index.json');
    posts = await res.json();
    postsFiltrados = [...posts];
    rellenarFiltros();
    renderPagina();
}

function rellenarFiltros() {
    const años = [...new Set(posts.map(p => p.fecha.split('-')[0]))].sort().reverse();
    const meses = [...new Set(posts.map(p => p.fecha.split('-')[1]))].sort();

    const selectAño = document.getElementById('filtro-año');
    años.forEach(a => selectAño.innerHTML += `<option value="${a}">${a}</option>`);

    const selectMes = document.getElementById('filtro-mes');
    const nombresMes = ['Enero','Febrero','Marzo','Abril','Mayo','Junio',
                        'Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
    meses.forEach(m => {
        selectMes.innerHTML += `<option value="${m}">${nombresMes[parseInt(m)-1]}</option>`;
    });
}

function aplicarFiltros() {
    const q = document.getElementById('buscador').value.toLowerCase();
    const año = document.getElementById('filtro-año').value;
    const mes = document.getElementById('filtro-mes').value;

    postsFiltrados = posts.filter(post => {
        const [pAño, pMes] = post.fecha.split('-');
        return (
            (!q || post.titulo.toLowerCase().includes(q) || post.resumen.toLowerCase().includes(q)) &&
            (!año || pAño === año) &&
            (!mes || pMes === mes)
        );
    });

    paginaActual = 0;
    renderPagina();
}

function esNuevo(fecha) {
    const diasLimite = 30;
    const hoy = new Date();
    const fechaPost = new Date(fecha);
    const diferencia = (hoy - fechaPost) / (1000 * 60 * 60 * 24);
    return diferencia <= diasLimite;
}

function renderPagina() {
    const contenedor = document.getElementById('blog-lista');
    const totalPaginas = Math.ceil(postsFiltrados.length / POR_PAGINA);
    const slice = postsFiltrados.slice(
        paginaActual * POR_PAGINA,
        paginaActual * POR_PAGINA + POR_PAGINA
    );

    contenedor.innerHTML = `
        ${slice.length === 0 ? '<p>No se encontraron posts.</p>' : 
            slice.map(post => `
                <div class="post-tarjeta">
                    <a class="post-tarjeta-enlace" href="../html/post.html?id=${post.id}">
                        ${post.thumbnail ? `<img class="thumbnail" src="${post.thumbnail}" alt="${post.titulo}">` : ''}
                        <div class="post-tarjeta-texto">
                            ${esNuevo(post.fecha) ? '<img class="newpostgif" src="../img/new.gif" alt="new!">' : ''}
                            <h2>
                                ${post.titulo}
                            </h2>
                            <time>${post.fecha}</time>
                            <p>${post.resumen}</p>
                        </div>
                    </a>
                </div>
            `).join('')
        }

        <nav class="paginacion">
            <img 
                src="../img/arrow.gif" 
                alt="Anterior"
                onclick="${paginaActual === 0 ? '' : 'cambiarPagina(-1)'}"
                class="${paginaActual === 0 ? 'paginacion-disabled paginacion-btn-anterior' : 'paginacion-btn paginacion-btn-anterior'}"
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