function mostrarImagenesAPI() {
    
    var API_KEY = '34087519-a65a6e2dd31e2d2e7aaf69be9';
    var URL = "https://pixabay.com/api/?key="+API_KEY+"&q="+encodeURIComponent('carros');
  
    fetch(endpoint)
      .then(response => response.json())
      .then(data => {
        data.hits.forEach(image => {
          const img = document.createElement('img');
          img.src = image.webformatURL;
          document.body.appendChild(img);
        });
      })
      .catch(error => console.error(error));
  }
  