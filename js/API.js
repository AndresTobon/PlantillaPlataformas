let contadorPagina = 1;

function mostrarImagenesAPI() {
  const apiKey = '34087519-a65a6e2dd31e2d2e7aaf69be9';
  const queryTerms = 'classic cars';
  const perPage = 6;
  const endpoint = `https://pixabay.com/api/?key=${apiKey}&q=${queryTerms}&page=${contadorPagina}&per_page=${perPage}`;

  fetch(endpoint)
    .then(response => response.json())
    .then(data => {
      const gridContainer = document.querySelector('.image-grid');
      // Remueve todos los child nodes del grid container
      gridContainer.innerHTML = '';
      // Loop a través de las imagenes y se les hace un append al grid container
      data.hits.forEach(image => {
        const img = document.createElement('img');
        img.src = image.webformatURL;
        gridContainer.appendChild(img);
      });
    })
    .catch(error => console.error(error));
  
  // Incremento de contador de pagina
  contadorPagina++;
}

function vaciarImagenes() {
  const gridContainer = document.querySelector('.image-grid');
  gridContainer.innerHTML = ''; // Remover todos los hijos
}