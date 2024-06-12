// OBJETOS

class product {
    constructor(id, nombre, categoria, precio) {
        this.id = id;
        this.nombre = nombre;
        this.categoria = categoria;
        this.precio = precio;
    }
}

const products = [
    new product('velador', 'Velador', 'madera', 300),
    new product('baseLatas', 'Base Para Latas', 'madera', 400),
    new product('veladorLed', 'Velador Led', 'madera', 500),
    new product('destapador', 'Destapador', 'madera', 600),
    new product('grabadolaser', 'Grabado Laser', 'grabados', 700),
    new product('grabadoLaser2', 'Grabado Laser', 'grabados', 800),
    new product('escritorioRebatible', 'Escritorio Rebatible', 'muebles', 900),
    new product('mesaDeLuz', 'Mesa De Luz', 'muebles', 1000),
    new product('mesaRatona', 'Mesa Ratona', 'muebles', 1100),
];

//FILTROS

document.addEventListener('DOMContentLoaded', function() {
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
});

//CARRITO

document.addEventListener('DOMContentLoaded', function() {
    let totalAmount = 0;
    let cartItems = [];
    let orderNumber = 1;

    const buttons = document.querySelectorAll('.add-to-cart');

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            let productId = button.getAttribute('id-product');
            let product = products.find(p => p.id === productId);
            
            if (product) {
                totalAmount += product.precio;
                cartItems.push(`${product.nombre} - Precio: $${product.precio}`);

                let userChoice;
                while (userChoice !== '1' && userChoice !== '2' && userChoice !== '3') {
                    const confirmMessage = `Se agregó al carrito:\n${cartItems.join('\n')}\n\nPrecio total en el carrito: $${totalAmount}\n\n¿Qué deseas hacer?\n\n1. Seguir comprando\n2. Finalizar carrito\n3. Limpiar carrito`;
                    userChoice = prompt(confirmMessage);

                    if (userChoice === '1') {
                        alert('Puede seguir agregando items al carrito.');
                    } else if (userChoice === '2') {
                        alert(`Compra finalizada. Gracias por su compra.\n\n${cartItems.join('\n')}\n\nNúmero de orden de compra: ${orderNumber} \n\nImporte total de la compra: $${totalAmount}`);
                        orderNumber += 1;
                        cartItems = [];
                        totalAmount = 0;
                    } else if (userChoice === '3') {
                        cartItems = [];
                        totalAmount = 0;
                        alert('Hemos eliminado los items del carrito. Muchas gracias.');
                    } else {
                        alert('Opción no válida. Por favor, selecciona 1, 2 o 3.');
                    }
                }
            }
        });
    });
});