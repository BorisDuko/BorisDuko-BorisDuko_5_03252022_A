console.log("-Cart Page-");
// cart array
// const cartArray = [(productID = ""), (quantity = number), (color = "")];
let myObj = {
  quantity: 2,
  color: "white",
};

let myObj_serialized = JSON.stringify(myObj);
console.log("serialized Oject:", myObj_serialized);

localStorage.setItem("keyName", myObj_serialized);
console.log("My local storage ");
console.log(localStorage);

let myOdj_deserialized = JSON.parse(localStorage.getItem("keyName"));

console.log(myOdj_deserialized);
localStorage.clear();
//////////////////////////////
const CART = {
  id: "productId",
  color: "productColor",
  quantity: "productQuantity",
};
