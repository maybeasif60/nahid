import { initializeApp } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js";

import {
getFirestore,
collection,
onSnapshot,
deleteDoc,
doc
} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js";

/* FIREBASE */
const firebaseConfig = {
apiKey: "YOUR_API_KEY",
authDomain: "YOUR_AUTH_DOMAIN",
projectId: "YOUR_PROJECT_ID",
appId: "YOUR_APP_ID"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const usersDiv = document.getElementById("users");
const count = document.getElementById("count");
const search = document.getElementById("search");

let users = [];

/* RENDER */
function render(filter=""){

usersDiv.innerHTML = "";

let filtered = users.filter(u =>
(u.name || "").toLowerCase().includes(filter.toLowerCase()) ||
(u.email || "").toLowerCase().includes(filter.toLowerCase())
);

filtered.forEach(u => {

const div = document.createElement("div");
div.className = "card";

div.innerHTML = `
<div class="name">${u.name || "No Name"}</div>
<div class="email">${u.email || "No Email"}</div>
<button class="btn" onclick="delUser('${u.id}')">Delete</button>
`;

usersDiv.appendChild(div);

});

}

/* DELETE */
window.delUser = async(id)=>{
await deleteDoc(doc(db,"users",id));
};

/* REALTIME */
onSnapshot(collection(db,"users"), snap=>{

users = [];

snap.forEach(d=>{
users.push({
id:d.id,
...d.data()
});
});

count.innerText = users.length;

render(search.value);

});

/* SEARCH */
search.addEventListener("input",(e)=>{
render(e.target.value);
});