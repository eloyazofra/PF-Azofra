document.addEventListener('DOMContentLoaded', function() {
    let orderNumber = 12085;
    let cartItems = JSON.parse(localStorage.getItem('cart')) || {};
    let totalAmount = JSON.parse(localStorage.getItem('totalAmount')) || 0;
    let cartCount = JSON.parse(localStorage.getItem('cart-count')) || 0;

    const buttons = document.querySelectorAll('.add-to-cart');
    const cartContainer = document.getElementById('cart-container');
    const cartList = document.getElementById('cart-list');
    const totalAmountElement = document.getElementById('total-amount');
    const finalizePurchaseButton = document.getElementById('finalize-purchase');
    const clearCartButton = document.getElementById('clear-cart');

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

    // Modales
    var purchaseModal;
    var thankYouModal;

    // Event listeners para botones de agregar al carrito
    buttons.forEach(button => {
        button.addEventListener('click', () => {

            let productId = button.getAttribute('id-product');
            let product = products.find(p => p.id === productId);
            
            if (product) {
                totalAmount += product.precio;
                
                if (cartItems[productId]) {
                    cartItems[productId].cantidad++;
                } else {
                    cartItems[productId] = { ...product, cantidad: 1 };
                }

                cartCount++;
                updateCart();
                updateFinalizeButtonState();
                localStorage.setItem('cart',JSON.stringify(cartItems));
                localStorage.setItem('totalAmount',totalAmount);
                localStorage.setItem('cart-count',cartCount);
            }
        });
    });

    // Mostrar/ocultar carrito al hacer clic en el ícono del carrito
    document.getElementById('cart-img').addEventListener('click', () => {
        cartContainer.style.display = cartContainer.style.display === 'none' ? 'block' : 'none';
    });

    // Event listener para el botón de finalizar compra
    finalizePurchaseButton.addEventListener('click', handleFinalizePurchase);


    // Función para manejar la finalización de la compra
    function handleFinalizePurchase() {
        if (cartCount > 0) {
            const purchaseSummary = generateCartSummary();
            const purchaseDetailsElement = document.getElementById('purchaseDetails');
            purchaseDetailsElement.textContent = purchaseSummary;
            var purchaseModalElement = document.getElementById('purchaseModal');
            purchaseModal = new bootstrap.Modal(purchaseModalElement);
            purchaseModal.show();
            
            // Manejar el evento de confirmación de compra
            document.getElementById('confirmPurchaseButton').addEventListener('click', handleConfirmPurchase);
        }
    }

    // Event listener manejar la eliminación del carrito

    clearCartButton.addEventListener('click', handleClearCart);
    function handleClearCart(){
        if (cartCount > 0){
            cartItems = {}; // Limpiar carrito
            totalAmount = 0; // Reiniciar totalAmount
            cartCount = 0; // Reiniciar contador de elementos en carrito
            localStorage.clear();
            updateCart(); // Actualizar visualización del carrito
            updateFinalizeButtonState();
        }
    }

    // Función para manejar la confirmación de la compra
    function handleConfirmPurchase() {
        orderNumber += 1; 
        cartItems = {}; 
        totalAmount = 0;
        cartCount = 0; 
        localStorage.clear();
        document.getElementById('cart-count').textContent = cartCount;
        updateCart();
        updateFinalizeButtonState(); 
        purchaseModal.hide(); 
        showThankYouModal(orderNumber);
        document.getElementById('confirmPurchaseButton').removeEventListener('click', handleConfirmPurchase);
    }

    // Función para actualizar el contenido del carrito
    function updateCart() {
        cartList.innerHTML = '';
        for (let id in cartItems) {
            let item = cartItems[id];
            let listItem = document.createElement('li');
            listItem.textContent = ` ${item.cantidad} x - ${item.nombre} - Precio: $${item.precio} `;
            cartList.appendChild(listItem);
        }
        document.getElementById('cart-count').textContent = cartCount;
        totalAmountElement.textContent = `Total: $${totalAmount}`;
    }

    // Función para generar el resumen del carrito
    function generateCartSummary() {
        return Object.values(cartItems).map(item => ` ${item.cantidad}x - ${item.nombre} - Precio: $${item.precio}`).join('\n') + '\n\n' + `Total: $${totalAmount}`;

    }

    // Función para actualizar el estado del botón de finalizar compra
    function updateFinalizeButtonState() {
        if (cartCount === 0) {
            finalizePurchaseButton.disabled = true;
            cartContainer.style.display = 'none';
        } else {
            finalizePurchaseButton.disabled = false;
            cartContainer.style.display = 'block';
        }
    }
    updateFinalizeButtonState();
    
    // Función para mostrar el modal de agradecimiento
    function showThankYouModal(orderNumber) {
        const thankYouDetailsElement = document.getElementById('thankYouDetails');
        thankYouDetailsElement.textContent = `¡Gracias por su compra!\n\nNúmero de orden de compra: ${orderNumber}`;
    
        var thankYouModalElement = document.getElementById('thankYouModal');
        thankYouModal = new bootstrap.Modal(thankYouModalElement);
    
        // Mostrar el modal de agradecimiento
        thankYouModal.show();
    
        // Agregar el event listener al botón de cerrar del modal de agradecimiento
        document.getElementById('closeThankYouModalButton').addEventListener('click', handleCloseThankYouModal);
    }

    // Función para manejar el cierre del modal de agradecimiento
    function handleCloseThankYouModal() {
        thankYouModal.hide();
        if (purchaseModal._isShown) {
            purchaseModal.hide();
        }
        document.getElementById('closeThankYouModalButton').removeEventListener('click', handleCloseThankYouModal);
    }
    updateCart();
});
