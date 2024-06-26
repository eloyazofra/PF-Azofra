document.addEventListener('DOMContentLoaded', function() {
    
    // Definición de la clase Product
    class Product {
        constructor(id, nombre, categoria, precio) {
            this.id = id;
            this.nombre = nombre;
            this.categoria = categoria;
            this.precio = precio;
        }
    }

    // Definición de productos
    const products = [
        new Product('velador', 'Velador', 'madera', 300),
        new Product('baseLatas', 'Base Para Latas', 'madera', 400),
        new Product('veladorLed', 'Velador Led', 'madera', 500),
        new Product('destapador', 'Destapador', 'madera', 600),
        new Product('grabadolaser', 'Grabado Laser', 'grabados', 700),
        new Product('grabadoLaser2', 'Grabado Laser', 'grabados', 800),
        new Product('escritorioRebatible', 'Escritorio Rebatible', 'muebles', 900),
        new Product('mesaDeLuz', 'Mesa De Luz', 'muebles', 1000),
        new Product('mesaRatona', 'Mesa Ratona', 'muebles', 1100),
    ];    
    
    // Evento para aplicar FILTROS
    document.getElementById('applyFiltersButton').addEventListener('click', function() {
        var minPrice = parseInt(document.getElementById('priceMinInput').value) || 0;
        var maxPrice = parseInt(document.getElementById('priceMaxInput').value) || Infinity;
        
        var categories = [];
        if (document.getElementById('filterMadera').checked) categories.push('madera');
        if (document.getElementById('filterMuebles').checked) categories.push('muebles');
        if (document.getElementById('filterLaser').checked) categories.push('grabados');
        if (document.getElementById('filterMayorista').checked) categories.push('mayorista');

        var cards = document.querySelectorAll('.card');

        cards.forEach(function(card) {
            var price = parseInt(card.getAttribute('data-price'));
            var category = card.getAttribute('data-category');

            if ((price >= minPrice && price <= maxPrice) && (categories.length === 0 || categories.includes(category))) {
                card.style.display = 'block';
                card.style.width = '100%';
                card.style.maxWidth = '488px'; 
            } else {
                card.style.display = 'none';
            }
        });
    });
})