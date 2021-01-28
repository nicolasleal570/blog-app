/**
 * Obteniendo los elementos del HTML
 */
const menuContainer = document.getElementById('menuContainer');
const openMenuBtn = document.getElementById('btnMenu');
const closeMenuBtn = document.getElementById('closeBtn');
const headerContainer = document.getElementById('headerContainer');
const navbarContainer = document.getElementById('navbarContainer');
const postsSection = document.getElementById('postsSection');

// === HACIENDO EL MENÚ RESPONSIVE ===
/**
 * Esta es una función que retorna otra función a su vez. La vamos a utilizar para no duplicar
 * código innecesariamente y controlar cuando el navbar tiene que abrirse o cerrarse
 * @param handleOpen boolean
 * @returns
 */
const responsiveMenu = (handleOpen) => (event) => {
  if (handleOpen) {
    // Adjuntando la clase "menu-open" para que el menú se abra.
    menuContainer.classList.add('menu-open');
    // Escondemos el menú con CSS inline
    openMenuBtn.style = 'display: none;';

    // Escondemos el scroll del documento
    document.getElementsByTagName('html')[0].style = 'overflow: hidden;';

    // Termina de ejecutar la función sin importar lo que esté después.
    return;
  }

  // Quitamos la clase "menu-open" para que se esconda el menú.
  menuContainer.classList.remove('menu-open');

  // Limpiando el CSS inline para que se muestre el botón.
  openMenuBtn.style = '';

  // Limpiamos el CSS del document para que se vea de nuevo el scroll
  document.getElementsByTagName('html')[0].style = '';
};

// Agregando los eventos para abrir/cerrar el menú.
openMenuBtn.addEventListener('click', responsiveMenu(true));
closeMenuBtn.addEventListener('click', responsiveMenu(false));

/**
 * Evento para que cuando se reduzca/aumente el tamaño de la ventana
 * se esconda el menú y no permanezca abierto.
 */
window.addEventListener('resize', () => {
  const { innerWidth } = window;
  if (innerWidth > 768) return;
  responsiveMenu(false)();
});

// === Animando el menu cuando haces scroll ===
const handleScrollAnimation = (event) => {
  // Obtenemos el offset del scroll para saber su posición.
  const { pageYOffset } = window;

  // Obtenemos el alto del contenedor que tiene el gradiente.
  const { height } = headerContainer.getBoundingClientRect();

  // Si el scroll está a la altura del header - 200 píxeles...
  if (pageYOffset < height - 200) {
    // Se le quita la clase "scrolled"
    navbarContainer.classList.remove('scrolled');
    return;
  }

  // Se le adjunta la clase "scrolled"
  navbarContainer.classList.add('scrolled');
};

// Se le agrega el evento de Scroll a la ventana del navegador.
window.addEventListener('scroll', handleScrollAnimation);

// === Cargando dinamicamente los Posts ===

// Utilizamos fetch para hacer un request a la API de JSONPlaceholder
fetch('https://jsonplaceholder.typicode.com/posts')
  .then((res) => {
    // Transformamos los datos en un JSON
    return res.json();
  })
  .then((items) => {
    /**
     * Ahora simplemente filtramos y obtenemos los primeros 4 elementos.
     * Y luego los recorremos e imprimimos cada Post.
     */
    items
      .filter((_, id) => id < 4)
      .forEach((elem, idx) => {
        const isLarge = idx % 4 === 0;
        postsSection.innerHTML += `
          <div class="card-post ${isLarge ? 'large' : ''}">
            <div class="card-img">
              <img
                src="https://images.unsplash.com/photo-1472437774355-71ab6752b434?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1267&q=80"
                alt="Post Photo"
              />
            </div>
            <div class="card-body">
              <p class="tag">Javascript To React</p>
              <h3 class="title">
                ${elem.title}
              </h3>
              <p class="description">
                ${elem.body}
              </p>

              <div class="card-author">
                <div class="author-img">
                  <img
                    src="https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1350&q=80"
                    alt="Author Img"
                  />
                </div>
                <div class="author-info">
                  <p class="author-name">María Simmons</p>
                  <p class="author-cargo">UX Designer</p>
                </div>
              </div>
            </div>
          </div>
        `;
      });
  });
