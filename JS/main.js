let category_nav_list = document.querySelector(".category_nav_list");

function Open_Categ_list(){
    category_nav_list.classList.toggle("active")

}

let nav_links = document.querySelector(".nav_links")

function open_Menu() {
    nav_links.classList.toggle("active")
}


var cart = document.querySelector('.cart');

function open_close_cart() {
    cart.classList.toggle("active")
}

fetch("products.json")

.then(response => response.json())
.then(data => {
    console.log(data);
    const addToCartButtons = document.querySelectorAll(".btn_add_cart")

    addToCartButtons.forEach(button =>{
        button.addEventListener("click", (event) => {
            const productId = event.target.getAttribute('data-id')
            const selcetedProduct = data.find(product => product.id == productId)
            

            addToCart(selcetedProduct)

            const allMatchingButtons = document.querySelectorAll(`.btn_add_cart[data-id="${productId}"]`)

            allMatchingButtons.forEach(btn =>{
                btn.classList.add("active")
                btn.innerHTML = `      <i class="fa-solid fa-cart-shopping"></i> تمت الإضافة`
            })
        })
    })
    
    
})


function addToCart(product) {

    let cart = JSON.parse(localStorage.getItem('cart')) || []

    cart.push({... product , quantity: 1})
    localStorage.setItem('cart' , JSON.stringify(cart))


    updateCart()
}


function updateCart() {
    const cartItemsContainer = document.getElementById("cart_items");
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const checkout_items = document.getElementById("checkout_items");

    const items_input = document.getElementById("items");
    const total_Price_input = document.getElementById("total_Price");
    const count_Items_input = document.getElementById("count_Items");

    const governorateSelect = document.getElementById("governorate");
    const shippingSpan = document.getElementById("shipping_price");

    if (checkout_items) {
        checkout_items.innerHTML = "";
        items_input.value = "";
        total_Price_input.value = "";
        count_Items_input.value = "";
    }

    let total_Price = 0;
    let total_count = 0;

    cartItemsContainer.innerHTML = "";

    cart.forEach((item, index) => {
        let total_Price_item = item.price * item.quantity;
        total_Price += total_Price_item;
        total_count += item.quantity;

        if (checkout_items) {
            items_input.value += `${item.name} --- price: ${total_Price_item} --- count: ${item.quantity}\n`;
            count_Items_input.value = total_count;
        }

        cartItemsContainer.innerHTML += `
            <div class="item_cart">
                <img src="${item.img}" alt="">
                <div class="content">
                    <h4>${item.name}</h4>
                    <p class="price_cart">EGP ${total_Price_item}</p>
                    <div class="quantity_control">
                        <button type="button" class="decrease_quantity" data-index=${index}>-</button>
                        <span class="quantity">${item.quantity}</span>
                        <button type="button" class="Increase_quantity" data-index=${index}>+</button>
                    </div>
                </div>
                <button class="delete_item" data-index="${index}">
                    <i class="fa-solid fa-trash-can"></i>
                </button>
            </div>
        `;

        if (checkout_items) {
            checkout_items.innerHTML += `
            <div class="item_cart">
                <div class="image_name">
                    <img src="${item.img}" alt="">
                    <div class="content">
                        <h4>${item.name}</h4>
                        <p class="price_cart">${total_Price_item}</p>
                        <div class="quantity_control">
                            <button type="button" class="decrease_quantity" data-index=${index}>-</button>
                            <span class="quantity">${item.quantity}</span>
                            <button type="button" class="Increase_quantity" data-index=${index}>+</button>
                        </div>
                    </div>
                </div>
                <button  class="delete_item" data-index="${index}">
                    <i class="fa-solid fa-trash-can"></i>
                </button>
            </div>
            `;
        }
    });

    const price_cart_total = document.querySelector('.price_cart_toral');
    const count_item_cart = document.querySelector('.Count_item_cart');
    const count_item_header = document.querySelector('.count_item_header');

    price_cart_total.innerHTML = `EGP ${total_Price}`;
    count_item_cart.innerHTML = total_count;
    count_item_header.innerHTML = total_count;




const cartBadgeMobile = document.querySelector('.cart-badge-mobile');
if (cartBadgeMobile) {
    cartBadgeMobile.innerHTML = total_count;
}



    // 🟢 حساب الشحن حسب المحافظة
    let shippingCost = 0;

    if (governorateSelect) {
        const value = governorateSelect.value;

        if (value === "الفيوم") {
            shippingCost = 50;
        } else if (value) {
            shippingCost = 70;
        }
    }

    if (checkout_items) {
        const subtotal_checkout = document.querySelector(".subtotal_checkout");
        const total_checkout = document.querySelector(".total_checkout");

        subtotal_checkout.innerHTML = `EGP ${total_Price}`;
        total_checkout.innerHTML = `EGP ${total_Price + shippingCost}`;

        if (shippingSpan) {
            shippingSpan.innerText = shippingCost;
        }

        total_Price_input.value = total_Price + shippingCost;
    }
}



const governorateSelect = document.getElementById("governorate");

if (governorateSelect) {
  governorateSelect.addEventListener("change", function () {
    updateCart();
  });
}






function increaseQuantity(index){
    let cart = JSON.parse(localStorage.getItem('cart')) || []
    cart[index].quantity += 1
    localStorage.setItem('cart' , JSON.stringify(cart))
    updateCart()
}

function decreaseQuantity(index){
    let cart = JSON.parse(localStorage.getItem('cart')) || []

    if (cart[index].quantity > 1){
        cart[index].quantity -= 1
    }
 
    localStorage.setItem('cart' , JSON.stringify(cart))
    updateCart()
}





function removeFromCart(index) {
    const cart = JSON.parse(localStorage.getItem('cart')) || []

    const removeProduct = cart.splice(index , 1)[0]
    localStorage.setItem('cart', JSON.stringify(cart))
    updateCart()
    updateButoonsState(removeProduct.id)

    document.dispatchEvent(new Event("cartUpdated"));

}


function updateButoonsState(productId) {
    const allMatchingButtons = document.querySelectorAll(`.btn_add_cart[data-id="${productId}"]`)
    allMatchingButtons.forEach(button =>{
        button.classList.remove('active');
        button.innerHTML = `      <i class="fa-solid fa-cart-shopping"></i> أضف للسلة`
    })
}



updateCart()

document.addEventListener("click", function(e) {
    const btn = e.target.closest(".btn_add_cart");
    if (!btn) return;

    const productId = btn.dataset.id;
    const product = products.find(p => p.id == productId);

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const existing = cart.find(item => item.id == productId);

    if (existing) {
        existing.quantity += 1; 
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    btn.classList.add("active");
    btn.innerHTML = `<i class="fa-solid fa-cart-shopping"></i> تمت الإضافة`;
});

document.addEventListener("click", function(e) {
    const btn = e.target.closest(".btn_add_cart");
    if (!btn) return;

    e.preventDefault();
    e.stopPropagation();

    // لو المنتج متضاف قبل كده ما نضيفوش تاني
    if (btn.classList.contains("active")) return;

    const productId = btn.dataset.id;

fetch("products.json")

    .then(res => res.json())
    .then(data => {
        console.log(data);
        const product = data.find(p => p.id == productId);

        if(product){
            addToCart(product);

            const allBtns = document.querySelectorAll(`.btn_add_cart[data-id="${productId}"]`);
            allBtns.forEach(b => {
                b.classList.add("active");
                b.innerHTML = `<i class="fa-solid fa-cart-shopping"></i> تمت الإضافة`;
            });
        }
    });
});

function open_Menu() {
  document.querySelector('.mobile_sidebar').classList.add('active');
}


document.addEventListener('click', function(e){
    // زيادة الكمية
    if(e.target.closest('.Increase_quantity')){
        const index = e.target.closest('.Increase_quantity').dataset.index;
        increaseQuantity(index);
    }

    // نقص الكمية
    if(e.target.closest('.decrease_quantity')){
        const index = e.target.closest('.decrease_quantity').dataset.index;
        decreaseQuantity(index);
    }

    // حذف العنصر
    if(e.target.closest('.delete_item')){
        const index = e.target.closest('.delete_item').dataset.index;
        removeFromCart(index);
    }

    
});


// تحميل المفضلة من التخزين
let favourites = JSON.parse(localStorage.getItem("favourites")) || [];

function updateFavouriteCount() {
    const favCount = document.querySelector(".count_favourite");
    if (favCount) {
        favCount.innerText = favourites.length;
    }
}

// تحديث شكل القلوب
function syncFavouriteIcons() {
    document.querySelectorAll(".fav_btn").forEach(btn => {
        const id = btn.dataset.id;
        const icon = btn.querySelector("i");

        if (favourites.includes(id)) {
            icon.classList.remove("fa-regular");
            icon.classList.add("fa-solid");
            icon.style.color = "red";
        } else {
            icon.classList.add("fa-regular");
            icon.classList.remove("fa-solid");
            icon.style.color = "";
        }
    });
}

// الضغط على القلب
document.addEventListener("click", function(e) {
    const favBtn = e.target.closest(".fav_btn");
    if (!favBtn) return;

    const productId = favBtn.dataset.id;

    if (favourites.includes(productId)) {
        favourites = favourites.filter(id => id !== productId);
    } else {
        favourites.push(productId);
    }

    localStorage.setItem("favourites", JSON.stringify(favourites));
    updateFavouriteCount();
    syncFavouriteIcons();
});
// عند تحميل الصفحة
document.addEventListener("DOMContentLoaded", function() {
    updateFavouriteCount();
    syncFavouriteIcons();
});
function open_close_fav(){
    document.querySelector(".favourites").classList.toggle("active");
}


