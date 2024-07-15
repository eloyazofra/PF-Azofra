document.addEventListener('DOMContentLoaded', function() {
    let orderNumber = 12085;
    let cartItems = JSON.parse(localStorage.getItem('cart')) || {};
    let totalAmount = JSON.parse(localStorage.getItem('totalAmount')) || 0;
    let cartCount = JSON.parse(localStorage.getItem('cart-count')) || 0;

    const cartContainer = document.getElementById('cart-container');
    const cartList = document.getElementById('cart-list');
    const totalAmountElement = document.getElementById('total-amount');
    const finalizePurchaseButton = document.getElementById('finalize-purchase');
    const clearCartButton = document.getElementById('clear-cart');

    // Modales
    let purchaseModal;
    let thankYouModal;

    // Cargar productos desde products.json
    fetch('../data/products.json')
    .then(response => {
        if (!response.ok) {
            throw new Error('No se encuentra el archivo en la ruta definida.');
        }
        return response.json();
    })
    .then(products => {
        // Event listeners para botones de agregar al carrito
        document.querySelectorAll('.add-to-cart').forEach(button => {
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
                    localStorage.setItem('cart', JSON.stringify(cartItems));
                    localStorage.setItem('totalAmount', totalAmount);
                    localStorage.setItem('cart-count', cartCount);
                }
            });
        });

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
    })
    .catch(error => {
        console.error('Error fetching products:', error);
    });

    // Event listener para el botón de finalizar compra
    finalizePurchaseButton.addEventListener('click', handleFinalizePurchase);

    // Event listener manejar la eliminación del carrito
    clearCartButton.addEventListener('click', handleClearCart);

    // Función para manejar la finalización de la compra
    function handleFinalizePurchase() {
        if (cartCount > 0) {
            const purchaseSummary = generateCartSummary();
            const purchaseDetailsElement = document.getElementById('purchaseDetails');
            purchaseDetailsElement.textContent = purchaseSummary;
            const purchaseModalElement = document.getElementById('purchaseModal');
            purchaseModal = new bootstrap.Modal(purchaseModalElement);
            purchaseModal.show();

            // Manejar el evento de confirmación de compra
            document.getElementById('confirmPurchaseButton').addEventListener('click', handleConfirmPurchase);
        }
    }

    // Función para manejar la eliminación del carrito
    function handleClearCart() {
        if (cartCount > 0) {
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
        finalizePurchaseButton.disabled = cartCount === 0;
        cartContainer.style.display = cartCount === 0 ? 'none' : 'block';
    }

    // Función para mostrar el modal de agradecimiento
    function showThankYouModal(orderNumber) {
        const thankYouDetailsElement = document.getElementById('thankYouDetails');
        thankYouDetailsElement.textContent = `¡Gracias por su compra!\n\nNúmero de orden de compra: ${orderNumber}`;
    
        const thankYouModalElement = document.getElementById('thankYouModal');
        thankYouModal = new bootstrap.Modal(thankYouModalElement);
    
        // Mostrar el modal de agradecimiento
        thankYouModal.show();
    
        // Agregar el event listener al botón de cerrar del modal de agradecimiento
        document.getElementById('closeThankYouModalButton').addEventListener('click', handleCloseThankYouModal);
    }

    // Función para manejar el cierre del modal de agradecimiento
    function handleCloseThankYouModal() {
        thankYouModal.hide();
        if (purchaseModal && purchaseModal._isShown) {
            purchaseModal.hide();
        }
        document.getElementById('closeThankYouModalButton').removeEventListener('click', handleCloseThankYouModal);
    }

    // Función inicial para actualizar el estado del botón de finalizar compra
    updateFinalizeButtonState();
    updateCart();
});
