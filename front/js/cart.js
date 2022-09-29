// Get access to the DOM
const orderButton = document.getElementById("order");

console.log("-Cart Page-");

const cart = JSON.parse(localStorage.getItem("cart"));
console.log(cart);
// to delete - was trying something
// orderButton.addEventListener("click", () => {
//   let cartObject = JSON.parse(localStorage.getItem("productID"));
//   console.log("Parsed information form local storage", cartObject);
// });
