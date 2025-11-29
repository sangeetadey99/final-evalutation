let loginBtn = document.getElementById("loginBtn");
if(loginBtn){
    loginBtn.addEventListener("click", function(){
        let email = document.getElementById("email").value.trim();
        let pass = document.getElementById("password").value.trim();
        if(email === "admin@gmail.com" && pass === "admin1234"){
            alert("login successful");
            window.location.href = "admin.html"
        }else{
            alert("Wrong email or password")
        }
    });
}

let vehicles = [];
const imageURL = "https://coding-platform.s3.amazonaws.com/dev/lms/tickets/5e80fcb6-3f8e-480c-945b-30a5359eb40e/JNmYjkVr3WOjsrbu.png"
let cardBox = document.getElementById("cardBox");
let addBtn = document.getElementById("addBtn");
if(addBtn){
    addBtn.addEventListener("click", function(){
        let reg = document.getElementById("reg").value.trim();
        let cat = document.getElementById("cat").value
        let driver = document.getElementById("driver").value.trim();
        let avail = document.getElementById("avail").checked

if(!reg || !driver){
    alert("please fill required fields")
    return;
}
let obj = {
    id: Date.now(),
    reg,
    cat,
    driver,
    avail,
    img: imageURL
};
vehicles.push(obj);
document.getElementById("reg").value = "";
document.getElementById("driver").value = "";
document.getElementById("avail").checked = true;
 display(vehicles);
});
}

function display(arr){
    cardBox.innerHTML = "";
    arr.forEach((v)=>{
        let div = document.createElement("div");
        div.className = "card";
        div.innerHTML = `
        <img src="${v.img}">
        <p><b>${v.reg}</b></p>
        <p>Catagory:${v.cat}</p>
        <p>Driver:${v.driver}</p>
        <p>status:${v.avail ? "Available" : "Unavailable"}</p>
        <div class="btn">
        <button onclick="updateDriver(${v.id})">Update Driver</button>
        <button onclick="toggleAvaile(${v.id})">Change Status</button>
        <button onclick="delFleet(${v.id})">Delete</button>
        </div>
        `
    })
}