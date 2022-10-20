// retrieve form from Local Storage
const formObject = JSON.parse(localStorage.getItem("form"));
console.log(formObject);

for (key in formObject) {
  const markup = `
    <div>
    <span>${key}: ${formObject[key]}</span>
    </div>`;
  document.getElementById("limitedWidthBlock").innerHTML += markup;
}

// ------------------------------------
function validate() {
  var user = document.getElementById("e").value;
  var user2 = document.getElementById("e");
  var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (re.test(user)) {
    alert("done");
    return true;
  } else {
    user2.style.border = "red solid 3px";
    return false;
  }
}
// ------------------------------------
// fetch with POST method
// url: /products/order
// Sends back a contact object, a
// product table and an orderId (string)
