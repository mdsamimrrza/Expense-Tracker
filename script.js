document.addEventListener('DOMContentLoaded', () => {
    const products = [
        { id: 1, name: "Product 1", price: 29.99 },
        { id: 2, name: "Product 2", price: 19.99 },
        { id: 3, name: "Product 3", price: 39.99 },
    ];

    const cart = [];
    const productList = document.getElementById("product-list");
    const cartItems = document.getElementById("cart-items");
    const emptyCartMessage = document.getElementById("empty-cart");
    const cartTotalMessage = document.getElementById("cart-total");
    const totalPriceDisplay = document.getElementById("total-price");
    const checkoutBtn = document.getElementById("checkout-btn");

    products.forEach((product) => {
        const productDiv = document.createElement('div');
        productDiv.classList.add('product');
        productDiv.innerHTML = `
            <span>${product.name} - $${product.price.toFixed(2)}</span>
            <button data-id="${product.id}">Add to Cart</button>
        `;
        productList.appendChild(productDiv);
    });

    productList.addEventListener("click", (e) => {
        if (e.target.tagName === "BUTTON") {
            const productId = parseInt(e.target.getAttribute("data-id"));
            const product = products.find(p => p.id === productId);
            addToCart(product);
        }
    });

    function addToCart(product) {
        cart.push(product);
        renderCart();
    }

    function renderCart() {
        cartItems.innerHTML = ""; 
        let totalPrice = 0;

        if (cart.length > 0) {
            emptyCartMessage.classList.add('hidden');
            cartTotalMessage.classList.remove('hidden');

            cart.forEach((item, index) => {
                const cartItem = document.createElement('div');
                cartItem.classList.add('cart-item');
                cartItem.innerHTML = `
                    <span>${item.name} - $${item.price.toFixed(2)}</span>
                    <button data-index="${index}">Remove</button>
                `;
                cartItems.appendChild(cartItem);
                totalPrice += item.price;
            });

            totalPriceDisplay.textContent = `$${totalPrice.toFixed(2)}`;
        } else {
            emptyCartMessage.classList.remove('hidden');
            cartTotalMessage.classList.add('hidden');
            totalPriceDisplay.textContent = "$0.00"; 
        }
    }

    cartItems.addEventListener("click", (e) => {
        if (e.target.tagName === "BUTTON") {
            const itemIndex = parseInt(e.target.getAttribute("data-index"));
            cart.splice(itemIndex, 1); 
            renderCart(); 
        }
    });

    checkoutBtn.addEventListener("click", () => {
        if (cart.length > 0) {
            alert(`Thank you for your purchase! Total: ${totalPriceDisplay.textContent}`);
            cart.length = 0; 
            renderCart();
        } else {
            alert("Your cart is empty!");
        }
    });
});
