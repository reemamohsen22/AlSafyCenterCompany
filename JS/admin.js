// const api = "http://127.0.0.1:3000"; // بورت JSON Server
// const tbody = document.querySelector("#tableBody");

// // تحميل وعرض المنتجات
// async function loadProducts() {
//     const res = await fetch(api);
//     const products = await res.json(); // Array مباشر
//     tbody.innerHTML = "";

//     products.forEach(p => {
//         tbody.innerHTML += `
//             <tr>
//                 <td>${p.id}</td>
//                 <td><img src="${p.img}" alt=""></td>
//                 <td>${p.name}</td>
//                 <td>${p.price}</td>
//                 <td>${p.catetory}</td>
//                 <td>
//                     <button onclick="editProduct(${p.id})">تعديل</button>
//                     <button onclick="deleteProduct(${p.id})">حذف</button>
//                 </td>
//             </tr>
//         `;
//     });
// }

// // حذف منتج
// async function deleteProduct(id) {
//     await fetch(`${api}/${id}`, { method: "DELETE" });
//     loadProducts();
// }

// // تعديل منتج
// async function editProduct(id) {
//     const newName = prompt("أدخل الاسم الجديد:");
//     const newPrice = prompt("أدخل السعر الجديد:");
//     await fetch(`${api}/${id}`, {
//         method: "PATCH",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ name: newName, price: newPrice })
//     });
//     loadProducts();
// }

// // إضافة منتج جديد
// async function addProduct() {
//     const name = document.getElementById("name").value;
//     const price = document.getElementById("price").value;
//     const img = document.getElementById("img").value;
//     const catetory = document.getElementById("catetory").value || "غير مصنفة";

//     // جلب المنتجات الحالية لتحديد id جديد
//     const res = await fetch(api);
//     const products = await res.json();
//     const maxId = products.length ? Math.max(...products.map(p => p.id)) : 0;
//     const newId = maxId + 1;

//     await fetch(`${api}/${newId}`, {
//         method: "PUT", // Array مباشر → استخدم PUT على id جديد
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ id: newId, name, price, img, catetory })
//     });

//     loadProducts();
//     toggleAddForm();
// }

// // عرض/إخفاء فورم الإضافة
// function toggleAddForm() {
//     const form = document.getElementById("addForm");
//     form.style.display = form.style.display === "none" ? "block" : "none";
// }

// // تشغيل عند تحميل الصفحة
// loadProducts();








// const admins = [
//   { username: "reem", password: "1234" },
//   { username: "admin2", password: "5678" },
//   { username: "admin3", password: "9999" }
// ];

// function login() {
//   const user = document.getElementById("username").value;
//   const pass = document.getElementById("password").value;

//   const valid = admins.find(a => a.username === user && a.password === pass);

//   if (valid) {
//     document.getElementById("loginBox").style.display = "none";
//     document.getElementById("adminContent").style.display = "block";

//     // حفظ تسجيل الدخول
//     localStorage.setItem("isAdmin", "true");
//   } else {
//     document.getElementById("error").innerText = "بيانات غلط ❌";
//   }
// }







// window.onload = function () {
//   const isAdmin = localStorage.getItem("isAdmin");

//   if (isAdmin === "true") {
//     document.getElementById("loginBox").style.display = "none";
//     document.getElementById("adminContent").style.display = "block";
//   }
// };






// function logout() {
//   localStorage.removeItem("isAdmin");
//   location.reload();
// }









const firebaseConfig = {
  apiKey: "AIzaSyAfEQzxfnQwprQ3M6oFRRN8Kr6TUoamrL4",
  authDomain: "alsafy-admin.firebaseapp.com",
  projectId: "alsafy-admin",
  appId: "1:503327475942:web:30ca804c3cd49cf88b9327"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

function login() {
  const email = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  auth.signInWithEmailAndPassword(email, password)
    .then(() => {
      alert("تم تسجيل الدخول ✅");
      location.reload();
    })
    .catch((error) => {
      alert("بيانات غلط ❌");
      console.log(error);
    });
}

auth.onAuthStateChanged(user => {
  if (user) {
    document.getElementById("adminContent").style.display = "block";
    document.getElementById("loginBox").style.display = "none";

    // هنا نحمل المنتجات بعد ما يسجل دخول
    const apiURL = "http://127.0.0.1:3000/products";
const tbody = document.querySelector("#productsTable tbody");
const addForm = document.getElementById("addForm");

function toggleAddForm() {
  addForm.style.display = addForm.style.display === "none" ? "block" : "none";
}

// جلب المنتجات
async function loadProducts() {
  const res = await fetch(apiURL);
  const products = await res.json();

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
}

// إضافة منتج
async function addProduct() {
    
  const name = document.getElementById("name").value;
  const price = parseInt(document.getElementById("price").value, 10);
  const img = document.getElementById("img").value;
  const catetory = document.getElementById("catetory").value;
  const desc = document.getElementById("desc").value;

  const newProduct = {
    name,
    price,
    img,
    catetory,
    desc
  };

  // ❗ json-server بيعمل id تلقائي → مش محتاجة تحسبيه
  await fetch(apiURL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(newProduct)
  });

  loadProducts();
  toggleAddForm();
}

// حذف منتج
async function deleteProduct(id) {

  await fetch(`${apiURL}/${id}`, {
    method: "DELETE"
  });

  loadProducts();
}

// تعديل منتج
async function editProduct(id) {
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
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(updatedProduct)
  });

  loadProducts();
}

// تشغيل

    loadProducts();
  } else {
    document.getElementById("adminContent").style.display = "none";
    document.getElementById("loginBox").style.display = "block";
  }
});

function logout() {
  auth.signOut().then(() => {
    location.reload();
  });
}













