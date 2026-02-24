fetch('products.json')
.then(response => response.json())
.then(data => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    const swiper_fan_stand = document.getElementById("swiper_fan_stand");
    const swiper_fan_desk  = document.getElementById("swiper_fan_desk");
    const swiper_fan_roof = document.getElementById("swiper_fan_roof");
    const swiper_fan_wall = document.getElementById("swiper_fan_wall");

    function renderProduct(container, product) {
        const isInCart = cart.some(cartItem => cartItem.id === product.id);
        const old_price_Pargrahp = product.old_price ? `<p class="old_price">EGP ${product.old_price}</p>` : "";
        const percent_disc_div = product.old_price ? `<span class="sale_present">%${Math.floor((product.old_price - product.price) / product.old_price * 100)}</span>` : "";

        container.innerHTML += `
            <div class="swiper-slide product" data-id="${product.id}">
                ${percent_disc_div}
                <div class="img_product">
                    <a href="#" class="view-details" data-id="${product.id}">
                        <img src="${product.img}" alt="${product.name}" class="product-img">
                    </a>
                </div>

                <div class="stars">
                    <i class="fa-solid fa-star"></i>
                    <i class="fa-solid fa-star"></i>
                    <i class="fa-solid fa-star"></i>
                    <i class="fa-solid fa-star"></i>
                    <i class="fa-solid fa-star"></i>
                </div>

                <p class="name_product">
                    <a href="#" class="view-details" data-id="${product.id}">${product.name}</a>
                </p>

                <div class="price">
                    <p><span>EGP ${product.price}</span></p>
                    ${old_price_Pargrahp}
                </div>

                <div class="icons">
                    <span class="btn_add_cart ${isInCart ? 'active' : ''}" data-id="${product.id}">
                        <i class="fa-solid fa-cart-shopping"></i> ${isInCart ? 'تمت الإضافة' : 'إضافة إلي السلة'}
                    </span>
                    
            <span class="icon_product fav_btn" data-id="${product.id}">
            <i class="fa-regular fa-heart"></i>
            </span>


                </div>
            </div>
        `;
    }

   
    const urlParams = new URLSearchParams(window.location.search);
    const filter = urlParams.get('filter'); 

   
    data.forEach(product => {
        if (!filter || filter === "all") {
          
            if (product.catetory === "fan_stand") renderProduct(swiper_fan_stand, product);
            if (product.catetory === "fan_desk") renderProduct(swiper_fan_desk, product);
            if (product.catetory === "fan_roof") renderProduct(swiper_fan_roof, product);
            if (product.catetory === "fan_wall") renderProduct(swiper_fan_wall, product);

        } else {
            if (product.catetory === filter) {
                if (filter === "fan_stand") renderProduct(swiper_fan_stand, product);
                if (filter === "fan_desk") renderProduct(swiper_fan_desk, product);
                if (filter === "fan_roof") renderProduct(swiper_fan_roof, product);
                if (filter === "fan_wall") renderProduct(swiper_fan_wall, product);
                
            }
        }
    }
);
syncFavouriteIcons();
updateFavouriteCount();

    const modalHTML = `
        <div id="productModal" class="product-modal" style="display:none;">
            <div class="modal-content">
                <span id="closeModal" class="close">&times;</span>
                <img id="modalImg" src="" alt="">
                <h2 id="modalName"></h2>
                <p id="modalPrice"></p>
                <p id="modalDesc"></p>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modalHTML);

    const modal = document.getElementById("productModal");
    const closeModal = document.getElementById("closeModal");
    const modalImg = document.getElementById("modalImg");
    const modalName = document.getElementById("modalName");
    const modalPrice = document.getElementById("modalPrice");
    const modalDesc = document.getElementById("modalDesc");

    document.addEventListener("click", (e) => {
        const target = e.target.closest(".view-details");
        if (target) {
            e.preventDefault();
            const productId = target.dataset.id;
            window.location.href = `product.html?id=${productId}`;
        }
    });

    closeModal.onclick = () => modal.style.display = "none";
    window.onclick = (e) => { if (e.target == modal) modal.style.display = "none"; };
});








// fetch('products.json')
// .then(response => response.json())
// .then(data => {
//     const cart = JSON.parse(localStorage.getItem('cart')) || [];
//     const productsContainer = document.getElementById("products_container");

//     function renderProduct(container, product) {
//         const isInCart = cart.some(cartItem => cartItem.id === product.id);
//         const old_price_Pargrahp = product.old_price ? `<p class="old_price">EGP ${product.old_price}</p>` : "";
//         const percent_disc_div = product.old_price ? `<span class="sale_present">%${Math.floor((product.old_price - product.price) / product.old_price * 100)}</span>` : "";

//         container.innerHTML += `
//             <div class="product" data-id="${product.id}">
//                 ${percent_disc_div}
//                 <div class="img_product">
//                     <a href="product.html?id=${product.id}">
//                         <img src="${product.img}" alt="${product.name}">
//                     </a>
//                 </div>

//                 <p class="name_product">${product.name}</p>

//                 <div class="price">
//                     <span>EGP ${product.price}</span>
//                     ${old_price_Pargrahp}
//                 </div>

//                 <span class="btn_add_cart ${isInCart ? 'active' : ''}" data-id="${product.id}">
//                     <i class="fa-solid fa-cart-shopping"></i>
//                     ${isInCart ? 'تمت الإضافة' : 'أضف للسلة'}
//                 </span>
//             </div>
//         `;
//     }

//     // ✅ قراءة الفلتر من الرابط
//     const urlParams = new URLSearchParams(window.location.search);
//     const filter = urlParams.get('filter'); // mixers, kettles, blender ...

//     data.forEach(product => {
//         if (!filter || filter === "all") {
//             renderProduct(productsContainer, product);
//         } else {
//             if (product.catetory === filter) {
//                 renderProduct(productsContainer, product);
//             }
//         }
//     });
// });












// fetch('products.json')
// .then(res => res.json())
// .then(data => {

//     const cart = JSON.parse(localStorage.getItem('cart')) || [];


//     const swiper_fans_roof  = document.getElementById("swiper_fans_roof");




//     const container = document.getElementById("fridge_products");

//     function renderProduct(product){
//         const isInCart = cart.some(item => item.id === product.id);

//         container.innerHTML += `
//         <div class="product" data-id="${product.id}">
//             <div class="img_product">
//                 <a href="product.html?id=${product.id}">
//                     <img src="${product.img}" alt="${product.name}">
//                 </a>
//             </div>

//             <p class="name_product">${product.name}</p>

//             <div class="price">
//                 <span>EGP ${product.price}</span>
//             </div>

//             <div class="icons">
//                 <span class="btn_add_cart ${isInCart ? 'active' : ''}" data-id="${product.id}">
//                     <i class="fa-solid fa-cart-shopping"></i>
//                     ${isInCart ? 'تمت الإضافة' : 'أضف للسلة'}
//                 </span>
//             </div>
//         </div>
//         `;
//     }
   
//     const fridges = data.filter(p => p.catetory === "fans");
//     const small_ = document.getElementById("mobiles");

//     fridges.forEach(product => renderProduct(product));
// });


