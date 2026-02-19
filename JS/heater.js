fetch('products.json')
.then(res => res.json())
.then(data => {

    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const container = document.getElementById("fridge_products");

    function renderProduct(product){
        const isInCart = cart.some(item => item.id === product.id);

        container.innerHTML += `
        <div class="product" data-id="${product.id}">
            <div class="img_product">
                <a href="product.html?id=${product.id}">
                    <img src="${product.img}" alt="${product.name}">
                </a>
            </div>

            <p class="name_product">${product.name}</p>

            <div class="price">
                <span>EGP ${product.price}</span>
            </div>

            <div class="icons">
                <span class="btn_add_cart ${isInCart ? 'active' : ''}" data-id="${product.id}">
                    <i class="fa-solid fa-cart-shopping"></i>
                    ${isInCart ? 'تمت الإضافة' : 'أضف للسلة'}
                </span>
            </div>
        </div>
        `;
    }
   
    const fridges = data.filter(p => p.catetory === "heaters");
    const small_ = document.getElementById("mobiles");

    fridges.forEach(product => renderProduct(product));
});
