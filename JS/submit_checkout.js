
const scriptURL =
  "https://script.google.com/macros/s/AKfycbzaq6rxqXA6lKpX__DTRXPCXoI3j940dVVLZBZwDBOlLCUdrml5iwwCimI0yBS-rG7F/exec";
const form = document.getElementById("form_contact");
const imageInput = document.getElementById("proof-image");
const imageURLInput = document.getElementById("proof_image_url");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  try {
    // لو فيه صورة، ارفعها، لو لأ سيب القيمة فاضية
    if (imageInput.files[0]) {
      const imageURL = await uploadToCloudinary(imageInput.files[0]);
      imageURLInput.value = imageURL;
    } else {
      imageURLInput.value = ""; // صورة مش مطلوبة
    }

    fetch(scriptURL, {
      method: "POST",
      body: new FormData(form),
    })
      .then(() => {
        alert("تم إرسال الطلب بنجاح ");

        setTimeout(() => {
          localStorage.removeItem("cart");
          window.location.reload();
        }, 2000);
      });
  } catch (err) {
    alert("حدث خطأ أثناء رفع الصورة ");
    console.error(err);
  }
});

async function uploadToCloudinary(file) {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "proof_upload"); 

  const response = await fetch(
    "https://api.cloudinary.com/v1_1/dgkbwchw7/image/upload",
    {
      method: "POST",
      body: formData,
    }
  );

  const data = await response.json();
  return data.secure_url;
}
window.addEventListener("DOMContentLoaded", () => {
  const buyNowProduct = JSON.parse(localStorage.getItem("buyNowProduct"));
  if (buyNowProduct) {
    const checkoutItemsContainer = document.getElementById("checkout_items");
    const itemsInput = document.getElementById("items");
    const totalPriceInput = document.getElementById("total_Price");
    const countItemsInput = document.getElementById("count_Items");

    checkoutItemsContainer.innerHTML = `
      <div class="item_cart">
        <img src="${buyNowProduct.img}" alt="${buyNowProduct.name}">
        <div class="content">
          <h4>${buyNowProduct.name}</h4>
          <p class="price_cart">${buyNowProduct.price}</p>
          <div class="quantity_control">
            <span class="quantity">${buyNowProduct.quantity}</span>
          </div>
        </div>
      </div>
    `;

    if (itemsInput) itemsInput.value = `${buyNowProduct.name} --- price: ${buyNowProduct.price} --- count: ${buyNowProduct.quantity}`;
    if (totalPriceInput) totalPriceInput.value = buyNowProduct.price;
    if (countItemsInput) countItemsInput.value = buyNowProduct.quantity;

    localStorage.removeItem("buyNowProduct");
  }
});


