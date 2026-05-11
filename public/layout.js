/**
 *  F U N C T I O N S
 */

function initActiveLinks() {
  const pathname = window.location.pathname;
  [...document.querySelectorAll("a")].forEach((el) => {
    const elHref = el
      .getAttribute("href")
      .replace(".html", "")
      .replace("/public", "");

    if (pathname == "/") {
      if (elHref == "/" || elHref == "/index.html") el.classList.add("active");
    } else {
      if (window.location.href.includes(elHref)) el.classList.add("active");
    }
  });
}

function getNestingString() {
  const currentUrl = window.location.href
    .replace("http://", "")
    .replace("https://", "")
    .replace("/public/", "/");
  const numberOfSlahes = currentUrl.split("/").length - 1;
  if (numberOfSlahes == 1) return ".";
  if (numberOfSlahes == 2) return "..";
  return ".." + "/..".repeat(numberOfSlahes - 2);
}

/* ********************************* */

/**
 *  H T M L
 */

const nesting = getNestingString();

const headerEl = `
    <header>
        <img src="../img/patata1.gif">
        <img src="../img/logo.gif" class="logo">
        <img src="../img/patata1.gif">
    </header>
`;

const footerEl = `
    <footer>
        Hosting realizado gracias a neocities.org.
    </footer>
`;

const sidebarEl1 = `
    <aside class="barraizquierda">

        <div class="menu">

            <p>MENU</p>
                
            <nav>
                <ul>
                    <li>
                        <img src="../img/potatochip.gif">
                        &nbsp
                        <a href="../index.html">Inicio</a>
                    </li>
                    <li>
                        <img src="../img/potatochip.gif">
                        &nbsp
                        <a href="../index.html">Blog</a>
                    </li>
                    <li>
                        <img src="../img/potatochip.gif">
                        &nbsp
                        <a href="../html/galeria.html">Galería</a>
                    </li>
                    <li>
                        <img src="../img/potatochip.gif">
                        &nbsp
                        <a href="../index.html">Libro de visitas</a>
                    </li>
                </ul>
            </nav>

        </div>

    </aside>
`;

const sidebarEl2 = `
    <aside class="barraderecha">

        <fieldset class="asideembed" style="display: flex; justify-content: center;">

            <legend>
              PatataChat
              <img src="../img/chat.gif">
            </legend>

          <iframe src="https://www5.cbox.ws/box/?boxid=962863&amp;boxtag=rFbCUC" width="100%" height="250px" allowtransparency="yes" allow="autoplay" frameborder="0" marginheight="0" marginwidth="0" scrolling="auto"></iframe>

        </fieldset>

        <img src="../img/palito1divisor.png" style="width: 100%">

        <fieldset class="asideembed">
        
          <legend>
            Contador
            <img src="../img/!.gif">
          </legend>

        </fieldset>

        <img src="../img/palito2divisor.png" style="width: 100%">

        <fieldset class="asideembed">

          <legend>
            Actividad
            <img src="../img/hi.gif">
          </legend>

          <div id="statuscafe"></div>

          <hr>

          <ul class="actividad">
            
            <li>
              <img src="../img/tv.gif" style="height: 13px; width: auto">
              Shangri-La Frontier
            </li>

            <li>
              <img src="../img/gaming.gif" style="height: 13px; width: auto">
              Baldur's Gate 3
            </li>

            <li>
              <img src="../img/libro.gif" style="height: 13px; width: auto">
              -
            </li>

          </ul>

        </fieldset>

        <img src="../img/divider1.gif" style="width: 100%">

        <fieldset class="asideembed">

          <legend>
            Usuarios
            <img src="../img/usuarios.gif">
          </legend>

          <a class="enlinea" href="http://www.snazzyspace.com/generators/viewer-counter/" title="SnazzySpace.com Viewer Counter" target="_blank"><img src="http://www.snazzyspace.com/generators/viewer-counter/counter.php/fid=1778275838/style=4/counter.png" border="0"></a>

        </fieldset>

    </aside>
`;

/* ********************************* */

/**
 *  I N I T
 */

if (!document.body.classList.contains("no-layout")) {
  document.body.insertAdjacentHTML("afterbegin", headerEl);
  document.body.insertAdjacentHTML("beforeend", footerEl);

  const wrapperElement = document.querySelector(".container");
  if (wrapperElement) {
    wrapperElement.insertAdjacentHTML("afterbegin", sidebarEl1);
    wrapperElement.insertAdjacentHTML("beforeend", sidebarEl2);

    // STATUS CAFE
    fetch("https://status.cafe/users/patatasaurio/status.json", {
      cache: "no-store",
    })
      .then((res) => res.json())
      .then((data) => {
        const statusEl = document.getElementById("statuscafe");

        if (!statusEl) return;

        statusEl.innerHTML = `
          <div id="statuscafe-username">
            <a href="https://status.cafe/users/patatasaurio">
              @${data.author}${data.face || ""}
            </a>

            ${data.timeago || ""}
          </div>
          
          <div id="statuscafe-content">
            ${data.content}
          </div>
        `;
      })
      .catch(() => {
        const statusEl = document.getElementById("statuscafe");

        if (!statusEl) return;

        statusEl.innerHTML = `
          <div id="statuscafe-username">
            <a href="https://status.cafe/users/patatasaurio">
              @patatasaurio
            </a>
            offline
          </div>
          
          <div id="statuscafe-content">
            estados de status.cafe disponibles próximamente
          </div>
        `;
      });

  }

  initActiveLinks();
}

// Continuar código aqui.