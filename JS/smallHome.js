fetch('products.json')
.then(response => response.json())
.then(data => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    const swiper_heater = document.getElementById("swiper_heater");
    const swiper_shafat = document.getElementById("swiper_shafat");
    const swiper_small = document.getElementById("swiper_small");
    const swiper_colder = document.getElementById("swiper_colder");
    const swiper_iron = document.getElementById("swiper_iron");
    const swiper_filter = document.getElementById("swiper_filter");
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
                        <i class="fa-solid fa-cart-shopping"></i> ${isInCart ? 'تمت الإضافة' : 'أضف للسلة'}
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

            if (product.catetory === "heater") renderProduct(swiper_heater, product);
            if (product.catetory === "shafat") renderProduct(swiper_shafat, product);
            if (product.catetory === "small_") renderProduct(swiper_small, product);
            if (product.catetory === "colder") renderProduct(swiper_colder, product);
            if (product.catetory === "iron") renderProduct(swiper_iron, product);
            if (product.catetory === "filters") renderProduct(swiper_filter, product);
            if (product.catetory === "ice_tankk") renderProduct(swiper_tankk, product);
        } else {
            if (product.catetory === filter) {
                if (filter === "heater") renderProduct(swiper_heater, product);
                if (filter === "shafat") renderProduct(swiper_shafat, product);
                if (filter === "small_") renderProduct(swiper_small, product);
                if (filter === "colder") renderProduct(swiper_colder, product);
                if (filter === "iron") renderProduct(swiper_iron, product);
                if (filter === "filters") renderProduct(swiper_filter, product);
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
