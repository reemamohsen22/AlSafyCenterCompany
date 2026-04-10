// ---------------- Firebase ----------------
const firebaseConfig = {
  apiKey: "AIzaSyAfEQzxfnQwprQ3M6oFRRN8Kr6TUoamrL4",
  authDomain: "alsafy-admin.firebaseapp.com",
  projectId: "alsafy-admin",
  appId: "1:503327475942:web:30ca804c3cd49cf88b9327"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();
// ---------------- Login ----------------
window.login = function () {
  const email = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  auth.signInWithEmailAndPassword(email, password)
    .then(() => {
      alert("تم تسجيل الدخول ✅");
      location.reload();
    })
    .catch(() => {
      alert("بيانات غلط ❌");
    });
};

// ---------------- Logout ----------------
window.logout = function () {
  auth.signOut().then(() => location.reload());
};

// ---------------- DOM Ready ----------------
document.addEventListener("DOMContentLoaded", function () {

  const apiURL = "http://127.0.0.1:3000/products";
  const tbody = document.querySelector("#productsTable tbody");
  const addForm = document.getElementById("addForm");

  // ---------------- Auth ----------------
  auth.onAuthStateChanged(user => {
    if (user) {
      document.getElementById("adminContent").style.display = "block";
      document.getElementById("loginBox").style.display = "none";

      loadProducts(); // 👈 هنا بس
    } else {
      document.getElementById("adminContent").style.display = "none";
      document.getElementById("loginBox").style.display = "block";
    }
  });

  // ---------------- UI ----------------
  window.toggleAddForm = function () {
    addForm.style.display = addForm.style.display === "none" ? "block" : "none";
  };

  // ---------------- Load ----------------
  window.loadProducts = async function () {
    try {
      const res = await fetch(apiURL);
      const products = await res.json();

      if (!tbody) {
        console.log("❌ tbody مش موجود");
        return;
      }

      tbody.innerHTML = "";

      products.forEach(p => {
        tbody.innerHTML += `
          <tr>
            <td>${p.id}</td>
            <td>${p.name}</td>
            <td>${p.price}</td>
            <td><img src="${p.img}" width="50"></td>
            <td>
              <button onclick="editProduct('${p.id}')">تعديل</button>
              <button onclick="deleteProduct('${p.id}')">حذف</button>
            </td>
          </tr>
        `;
      });

    } catch (error) {
      console.log("ERROR:", error);
    }
  };

  // ---------------- Add ----------------
  window.addProduct = async function () {
    const name = document.getElementById("name").value;
    const price = parseInt(document.getElementById("price").value, 10);
    const img = document.getElementById("img").value;
    const catetory = document.getElementById("catetory").value;
    const desc = document.getElementById("desc").value;

    const newProduct = { name, price, img, catetory, desc };

    await fetch(apiURL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newProduct)
    });

    loadProducts();
    toggleAddForm();
  };

  // ---------------- Delete ----------------
  window.deleteProduct = async function (id) {
    await fetch(`${apiURL}/${id}`, { method: "DELETE" });
    loadProducts();
  };

  // ---------------- Edit ----------------
  window.editProduct = async function (id) {
    const newName = prompt("الاسم الجديد:");
    const newPrice = parseInt(prompt("السعر الجديد:"), 10);

    const res = await fetch(`${apiURL}/${id}`);
    const product = await res.json();

    const updatedProduct = {
      ...product,
      name: newName || product.name,
      price: newPrice || product.price
    };

    await fetch(`${apiURL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedProduct)
    });

    loadProducts();
  };

});