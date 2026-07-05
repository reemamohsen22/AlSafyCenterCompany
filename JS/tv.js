fetch("products.json")

.then(res => res.json())
.then(data => {
console.log(data);
    products = data; 

    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const container = document.getElementById("fridge_products");

    function renderProduct(product){
        const isInCart = cart.some(item => item.id === product.id);
        const old_price_Pargrahp = product.old_price ? `<p class="old_price">EGP ${product.old_price}</p>` : "";
        const percent_disc_div = product.old_price ? `<span class="sale_present">%${Math.floor((product.old_price - product.price) / product.old_price * 100)}</span>` : "";

        container.innerHTML += `
        <div class="product" data-id="${product.id}">
         ${percent_disc_div}
            <div class="img_product">
                <a href="product.html?id=${product.id}">
                    <img src="${product.img}" alt="${product.name}">
                </a>
            </div>

            <p class="name_product">
            <a href="#" class="view-details" data-id="${product.id}">${product.name}</a>
            </p>

            <div class="price">
                <span>EGP ${product.price}</span>
                ${old_price_Pargrahp}
            </div>

            <div class="icons">
                <span class="btn_add_cart ${isInCart ? 'active' : ''}" data-id="${product.id}">
                    <i class="fa-solid fa-cart-shopping"></i>
                    ${isInCart ? 'تمت الإضافة' : 'أضف للسلة'}
                </span>


            <span class="icon_product fav_btn" data-id="${product.id}">
            <i class="fa-regular fa-heart"></i>
            </span>



            </div>
        </div>
        `;
    }
   
    const fridges = data.filter(p => p.catetory === "tv");
    const small_ = document.getElementById("mobiles");

    fridges.forEach(product => renderProduct(product));

    syncFavouriteIcons();
updateFavouriteCount();

});
