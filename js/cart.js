document.addEventListener('DOMContentLoaded', function() {
    let totalAmount = 0;
    const price = {
        velador: 300,
        baseLatas: 400,
        veladorLed: 500,
        destapador: 600,
        grabadolaser: 700,
        grabadoLaser2: 800,
        escritorioRebatible: 900,
        mesaDeLuz: 1000,
        mesaRatona: 1100,
    };

const buttons = document.querySelectorAll('.add-to-cart');
let cartItems = [];
let orderNumber = 1;

buttons.forEach(button => {
    button.addEventListener('click', () => {
        let productId;
        switch(button.getAttribute('id-product')) {
            case 'velador':
                productId = 'velador';
                productName = 'Velador';
                break;
            case 'baseLatas':
                productId = 'baseLatas';
                productName = 'Base Para Latas';
                break;
            case 'veladorLed':
                productId = 'veladorLed';
                productName = 'Velador Led';
                break;
            case 'destapador':
                productId = 'destapador';
                productName = 'Destapador';
                break;
            case 'grabadolaser':
                productId = 'grabadolaser';
                productName = 'Grabado Laser';
                break;
            case 'grabadoLaser2':
                productId = 'grabadoLaser2';
                productName = 'Grabado Laser';
                break;
            case 'escritorioRebatible':
                productId = 'escritorioRebatible';
                productName = 'Escritorio Rebatible';
                break;
            case 'mesaDeLuz':
                productId = 'mesaDeLuz';
                productName = 'Mesa De Luz';
                break;
            case 'mesaRatona':
                productId = 'mesaRatona';
                productName = 'Mesa Ratona';
                break;
            }
            
        totalAmount += price[productId];
        cartItems.push(productName + ' - Precio: $' + price[productId])

        let userChoice;
        while (userChoice !== '1' && userChoice !== '2' && userChoice !== '3') {
            const confirmMessage = 'Se agregó al carrito:\n' + cartItems.join('\n') + '\n\nPrecio total en el carrito: $' + totalAmount + '\n\n¿Qué deseas hacer?\n\n1. Seguir comprando\n2. Finalizar carrito\n3. Limpiar carrito';
            userChoice = prompt(confirmMessage);

            if (userChoice === '1') {
                alert('Puede seguir agregando items al carrito.');
                } else if (userChoice === '2') {
                alert('Compra finalizada. Gracias por su compra.\n\n' + cartItems.join('\n') + '\n\nNúmero de orden de compra: ' + orderNumber);
                orderNumber += 1
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
        });
    });
});