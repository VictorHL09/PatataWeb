// initLayout() is called once the DOM (the HTML content of your website) has been loaded.
document.addEventListener("DOMContentLoaded", function () {
  // The layout will be loaded on all pages that do NOT have the "no-layout" class in the <body> element.
  if (!document.body.classList.contains("no-layout")) {
    // Inserting your header and footer:
    document.body.insertAdjacentHTML("afterbegin", headerEl);
    document.body.insertAdjacentHTML("beforeend", footerEl);

    // Inserting sidebars:
    const wrapperElement = document.querySelector(".container"); // you might have to change this selector to something like .my-wrapper
    if (wrapperElement) {
      wrapperElement.insertAdjacentHTML("afterbegin", sidebarEl1);
      wrapperElement.insertAdjacentHTML("beforeend", sidebarEl2);

    }

    initActiveLinks();
  }

  // add your own javascript code here...
});

/* ********************************* */

/**
 *  F U N C T I O N S
 */

function initActiveLinks() {
  // This function adds the class "active" to any link that links to the current page.
  // This is helpful for styling the active menu item.

  const pathname = window.location.pathname;
  [...document.querySelectorAll("a")].forEach((el) => {
    const elHref = el
      .getAttribute("href")
      .replace(".html", "")
      .replace("/public", "");

    if (pathname == "/") {
      // homepage
      if (elHref == "/" || elHref == "/index.html") el.classList.add("active");
    } else {
      // other pages
      if (window.location.href.includes(elHref)) el.classList.add("active");
    }
  });
}

function getNestingString() {
  // This function prepares the "nesting" variable for your header and footer (see below).
  // Only change this function if you know what you're doing.
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

/**
  Use ${nesting} to output a . or .. or ../.. etc according to the current page's folder depth.
  Example:
    <img src="${nesting}/images/example.jpg" />
  will output
  	 <img src="./images/example.jpg" /> on a page that isn't in any folder.
    <img src="../images/example.jpg" /> on a page that is in a folder.
    <img src="../../images/example.jpg" /> on a page that is in a sub-folder.
    etc.
 */

// Insert your header HTML inside these ``. You can use HTML as usual.
const headerEl = `
    <header>
        <img src="img/patata1.gif">
        <img src="img/logo.gif" class="logo">
        <img src="img/patata1.gif">
    </header>
`;

// Insert your footer HTML inside these ``. You can use HTML as usual.
// Remove all the content inside the `` if you don't have a footer.
const footerEl = `
	<footer>
		Hosting realizado gracias a neocities.org.
	</footer>
`;

// <img src="${nesting}/assets/img/layout/divider1.gif" alt="" aria-hidden="true"/>

// Insert your sidebar HTML inside these ``. You can use HTML as usual.
// Remove all the content inside the `` if you don't have a sidebar.
const sidebarEl1 = `
	<aside class="barraizquierda">

        <div class="menu">

            <p>MENU</p>
                
                <nav>
                    <ul>
                        <li>
                            <img src="img/potatochip.gif">
                            &nbsp
                            <a href="index.html">Inicio</a>
                        </li>
                        <li>
                            <img src="img/potatochip.gif">
                            &nbsp
                            <a href="index.html">Blog</a>
                        </li>
                        <li>
                            <img src="img/potatochip.gif">
                            &nbsp
                            <a href="index.html">Imágenes</a>
                        </li>
                        <li>
                            <img src="img/potatochip.gif">
                            &nbsp
                            <a href="index.html">Libro de visitas</a>
                        </li>
                    </ul>
                </nav>

        </div>

    </aside>
`;

// Insert your sidebar HTML inside these ``. You can use HTML as usual.
// Remove all the content inside the `` if you don't have a sidebar.
const sidebarEl2 = `
	<aside class="barraderecha">

        <fieldset class="asideembed" style="display: flex; justify-content: center; height: 300px">

            <legend>PatataChat
            <img src="img/earth.gif">
            </legend>

            <iframe
  src="https://github.com/VictorHL09/PatataWeb/blob/main/public/html/chat.html"
  style="width: 100%; height: 400px; border: none;"
  sandbox="allow-scripts allow-same-origin allow-forms allow-popups">
</iframe>
        </fieldset>

    </aside>
`;