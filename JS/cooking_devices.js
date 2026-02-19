fetch('products.json')
.then(response => response.json())
.then(data => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    const swiper_air_fryer  = document.getElementById("swiper_air_fryer");
    const swiper_grill = document.getElementById("swiper_grill");
    const swiper_electric_oven = document.getElementById("swiper_electric_oven");
    const swiper_microwave = document.getElementById("swiper_microwave");
    const swiper_electric_flat_heater = document.getElementById("electric_flat_heater");


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
          
            if (product.catetory === "air_fryer") renderProduct(swiper_air_fryer, product);
            if (product.catetory === "grill") renderProduct(swiper_grill, product);
            if (product.catetory === "swiper_electric_oven") renderProduct(swiper_electric_oven, product);
            if (product.catetory === "swiper_microwave") renderProduct(swiper_microwave, product);
            if (product.catetory === "electric_flat_heater") renderProduct(electric_flat_heater, product);
        } else {
            if (product.catetory === filter) {
                if (filter === "yogurt") renderProduct(swiper_yogurt, product);
                if (filter === "air_fryer") renderProduct(swiper_air_fryer, product);
                if (filter === "grill") renderProduct(swiper_grill, product);
                if (filter === "electric_oven") renderProduct(swiper_electric_oven, product);
                if (filter === "microwave") renderProduct(swiper_microwave, product);
                if (filter === "electric_flat_heater") renderProduct(electric_flat_heater, product);
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
