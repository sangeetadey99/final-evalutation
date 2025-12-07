let loginBtn = document.getElementById("loginBtn");

if (loginBtn) {
  loginBtn.addEventListener("click", function () {
    let email = document.getElementById("email").value.trim();
    let pass = document.getElementById("password").value;

    if (email === "admin@gmail.com" && pass === "admin1234") {
      alert("Login success");
      window.location.href = "admin.html";
    } else {
      alert("Wrong email or password");
    }
  });
}

let vehicles = [];
const imageURL ="https://coding-platform.s3.amazonaws.com/dev/lms/tickets/5e80fcb6-3f8e-480c-945b-30a5359eb40e/JNmYjkVr3WOjsrbu.png"
let cardBox = document.getElementById("cardBox");
let addBtn = document.getElementById("addBtn");

if (addBtn) {
  addBtn.addEventListener("click", function () {
    let reg = document.getElementById("reg").value.trim();
    let cat = document.getElementById("cat").value;
    let driver = document.getElementById("driver").value.trim();
    let avail = document.getElementById("avail").checked;

    if (!reg || !driver) {
      alert("Please fill required fields");
      return;
    }

    let obj = {
      id: Date.now(),
      reg,
      cat,
      driver,
      avail,
      img: imageURL,
    };

    vehicles.push(obj);

    document.getElementById("reg").value = "";
    document.getElementById("driver").value = "";
    document.getElementById("avail").checked = true;

    display(vehicles);
  });
}

function display(arr) {
  cardBox.innerHTML = "";

  arr.forEach((v) => {
    let div = document.createElement("div");
    div.className = "card";

    div.innerHTML = `
      <img src="${v.img}">
      <p><b>${v.reg}</b></p>
      <p>Category: ${v.cat}</p>
      <p>Driver: ${v.driver}</p>
      <p>Status: ${v.avail ? "Available" : "Unavailable"}</p>
      <div class="btns">
        <button onclick="updateDriver(${v.id})">Update Driver</button>
        <button onclick="toggleAvail(${v.id})">Change Status</button>
        <button onclick="delFleet(${v.id})">Delete</button>
      </div>
    `;

    cardBox.appendChild(div);
  });
}

function updateDriver(id) {
  let newName = prompt("Enter new driver name");

  if (newName == null) return;

  newName = newName.trim();

  if (newName === "") {
    alert("Driver name cannot be empty");
    return;
  }

  vehicles = vehicles.map((v) => (v.id === id ? { ...v, driver: newName } : v));

  display(applyFilter());
}

function toggleAvail(id) {
  vehicles = vehicles.map((v) => (v.id === id ? { ...v, avail: !v.avail } : v));

  display(applyFilter());
}

function delFleet(id) {
  if (!confirm("Delete this vehicle?")) return;

  vehicles = vehicles.filter((v) => v.id !== id);

  display(applyFilter());
}

let filterCategory = document.getElementById("filterCategory");
let filterAvail = document.getElementById("filterAvail");
let clearFilter = document.getElementById("clearFilter");

if (filterCategory) {
  filterCategory.addEventListener("change", () => display(applyFilter()));
}
if (filterAvail) {
  filterAvail.addEventListener("change", () => display(applyFilter()));
}
if (clearFilter) {
  clearFilter.addEventListener("click", () => {
    filterCategory.value = "All";
    filterAvail.value = "All";
    display(vehicles);
  });
}

function applyFilter() {
  let cat = filterCategory.value;
  let av = filterAvail.value;

  return vehicles.filter((v) => {
    let c1 = cat === "All" || v.cat === cat;
    let c2 =
      av === "All" ||
      (av === "Available" && v.avail) ||
      (av === "Unavailable" && !v.avail);

    return c1 && c2;
  });
}
