

const params = new URLSearchParams(window.location.search);
const productId = params.get("id");

fetch("products.json")
  .then(res => res.json())
  .then(data => {
    const product = data.find(p => p.id == productId);
    if (!product) return;

document.getElementById("productName").textContent = product.name;
document.getElementById("productPrice").textContent = product.price;
document.getElementById("productDesc").textContent =
  product.desc || "لا يوجد وصف";
document.getElementById("mainImage").src = product.img;

const oldPriceEl = document.getElementById("productOldPrice");
const discountEl = document.getElementById("productDiscount");

if (product.old_price) {
  oldPriceEl.textContent = `EGP ${product.old_price}`;
  oldPriceEl.style.display = "inline";

  const discount =
    Math.floor(
      ((product.old_price - product.price) / product.old_price) * 100
    );

  discountEl.textContent = `خصم ${discount}%`;
  discountEl.style.display = "inline";
} else {
  oldPriceEl.style.display = "none";
  discountEl.style.display = "none";
}

const specsContainer = document.getElementById("productSpecs");
specsContainer.innerHTML = "";

if (product.specifications) {
  Object.entries(product.specifications).forEach(([key, value]) => {
    specsContainer.innerHTML += `
      <li>
        <span class="spec-key">${key}</span>
        <span class="spec-value">${value}</span>
      </li>
    `;
  });
}

const additionalInfoContainer = document.getElementById(
  "productAdditionalInfo"
);
additionalInfoContainer.innerHTML = "";

if (product.additional_info) {
  product.additional_info.forEach(info => {
    additionalInfoContainer.innerHTML += `<li>${info}</li>`;
  });
}

const attachmentsContainer = document.getElementById("product_attachments");

if(product.attachments && product.attachments.length > 0){
    product.attachments.forEach(file => {
        attachmentsContainer.innerHTML += `
          <li>
            <a href="${file.file}" target="_blank">
               <i class="fa-solid fa-file-pdf pdf-icon"></i> ${file.name}
            </a>
          </li>
        `;
    });
} else {
    attachmentsContainer.innerHTML = "<li>لا توجد مرفقات لهذا المنتج</li>";
}

const accessoriesContainer = document.getElementById("productAccessories");
const accessoriesTabBtn = document.querySelector('[data-tab="accessories"]');

accessoriesContainer.innerHTML = "";

if (product.accessories) {
  if (typeof product.accessories === "string") {
    accessoriesContainer.innerHTML = `<li>${product.accessories}</li>`;
  }

  if (Array.isArray(product.accessories)) {
    product.accessories.forEach(item => {
      accessoriesContainer.innerHTML += `<li>${item}</li>`;
    });
  }
} else {
  accessoriesTabBtn.style.display = "none";
}


    const mainImage = document.getElementById("mainImage");
    const thumbnailContainer = document.getElementById("thumbnailContainer");

    if (product.images && product.images.length > 0) {
      mainImage.src = product.images[0]; 
      thumbnailContainer.innerHTML = ""; 
      product.images.forEach((imgSrc, index) => {
        const thumb = document.createElement("img");
        thumb.src = imgSrc;
        thumb.className = "thumbnail";
        thumb.alt = `${product.name} ${index + 1}`;

        thumb.addEventListener("click", () => {
          mainImage.src = imgSrc; 
        });

        thumbnailContainer.appendChild(thumb);
      });
    } else {
      mainImage.src = product.img;
    }

    const addToCartBtn = document.getElementById("addToCartBtn");
    addToCartBtn.setAttribute("data-id", product.id);

    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const alreadyInCart = cart.find(item => item.id == product.id);

    if (alreadyInCart) {
      addToCartBtn.classList.add("active");
      addToCartBtn.textContent = "تمت الإضافة";
    }

    addToCartBtn.addEventListener("click", () => {
      let cart = JSON.parse(localStorage.getItem("cart")) || [];
      const exists = cart.find(item => item.id == product.id);

      if (!exists) {
        cart.push({
          id: product.id,
          name: product.name,
          price: product.price,
          img: product.images ? product.images[0] : product.img,
          quantity: 1
        });

        localStorage.setItem("cart", JSON.stringify(cart));
        if (typeof updateCart === "function") updateCart();

        addToCartBtn.classList.add("active");
        addToCartBtn.textContent = "تمت الإضافة";
        showToast("تمت الإضافة إلى السلة!");
      }
    });

    document.addEventListener("cartUpdated", () => {
      let cart = JSON.parse(localStorage.getItem("cart")) || [];
      const exists = cart.find(item => item.id == product.id);

      if (!exists) {
        addToCartBtn.classList.remove("active");
        addToCartBtn.textContent = "أضف للسلة";
      }
    });

const buyNowBtn = document.getElementById("buyNowBtn");
buyNowBtn.addEventListener("click", () => {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const exists = cart.find(item => item.id == product.id);

  if (!exists) {
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      img: product.images ? product.images[0] : product.img,
      quantity: 1
    });

    localStorage.setItem("cart", JSON.stringify(cart));

    const addToCartBtn = document.getElementById("addToCartBtn");
    addToCartBtn.classList.add("active");
    addToCartBtn.textContent = "تمت الإضافة";

    if (typeof updateCart === "function") updateCart();
  }

  window.location.href = "checkout.html";
});

  });

function showToast(message, duration = 2500) {
  let toast = document.getElementById("toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "toast";
    toast.className = "toast";
    document.body.appendChild(toast);
  }

  toast.textContent = message;
  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, duration);
}

