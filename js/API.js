function mostrarImagenesAPI() {
    
    const apiKey = '34087519-a65a6e2dd31e2d2e7aaf69be9';
    const endpoint = `https://pixabay.com/api/?key=${apiKey}&q=classic cars`;
  
    fetch(endpoint)
      .then(response => response.json())
      .then(data => {
        const gridContainer = document.querySelector('.image-grid');
      data.hits.forEach(image => {
        const img = document.createElement('img');
        img.src = image.webformatURL;
        gridContainer.appendChild(img);
        });
      })
      .catch(error => console.error(error));
  }
  