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
// fetch with POST method
// url: /products/order
// Sends back a contact object, a
// product table and an orderId (string)
const orderUrl = "http://localhost:3000/api/order";
fetch(orderUrl, {
  method: "POST",
  body: formObject,
})
  .then((response) => {
    response.json();
  })
  .then((data) => {
    console.log(data);
  })
  .catch((err) => {
    console.error(err);
  });
