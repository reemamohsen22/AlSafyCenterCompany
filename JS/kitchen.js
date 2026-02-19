fetch('products.json')
.then(response => response.json())
.then(data => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    const swiper_mixers = document.getElementById("swiper_mixers");
    const swiper_Kabbat  = document.getElementById("swiper_Kabbat");
    const swiper_rackets = document.getElementById("swiper_rackets");
    const swiper_blender = document.getElementById("swiper_blender");
    const swiper_Food = document.getElementById("swiper_Food");
    const swiper_stand_mixer = document.getElementById("swiper_stand_mixer");
    const swiper_tankk = document.getElementById("swiper_tankk");


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
                    <span class="icon_product"><i class="fa-regular fa-heart"></i></span>
                </div>
            </div>
        `;
    }

   
    const urlParams = new URLSearchParams(window.location.search);
    const filter = urlParams.get('filter'); 

   
    data.forEach(product => {
        if (!filter || filter === "all") {
          
            if (product.catetory === "mixers") renderProduct(swiper_mixers, product);
            if (product.catetory === "Kabbat") renderProduct(swiper_Kabbat, product);
            if (product.catetory === "rackets") renderProduct(swiper_rackets, product);
            if (product.catetory === "blender") renderProduct(swiper_blender, product);
            if (product.catetory === "Food") renderProduct(swiper_Food, product);
            if (product.catetory === "stand_mixer") renderProduct(swiper_stand_mixer, product);
            if (product.catetory === "ice_tankk") renderProduct(swiper_tankk, product);
        } else {
            if (product.catetory === filter) {
                if (filter === "mixers") renderProduct(swiper_mixers, product);
                if (filter === "Kabbat") renderProduct(swiper_Kabbat, product);
                if (filter === "rackets") renderProduct(swiper_rackets, product);
                if (filter === "blender") renderProduct(swiper_blender, product);
                if (filter === "Food") renderProduct(swiper_Food, product);
                if (filter === "stand_mixer") renderProduct(swiper_stand_mixer, product);
                if (filter === "ice_tankk") renderProduct(swiper_tankk, product);
            }
        }
    });

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
