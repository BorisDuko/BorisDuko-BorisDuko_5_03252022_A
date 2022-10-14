console.log("-Cart Page-");
// Get access to the DOM
const cartItems = document.getElementById("cart__items");
const orderButton = document.getElementById("order");

// API URL
const apiURL = "http://localhost:3000/api/products";

// get info from LS if null creates empty array
const cart = JSON.parse(localStorage.getItem("cart")) || [];
console.log("Parsed cart items:", cart);

// function to create "catalog" of all products
const fetchAllProducts = async () => {
  try {
    const response = await fetch(apiURL);
    console.log("response.status:", response.status); // 200
    console.log("response.ok:", response.ok); // true
    if (!response.ok) {
      // boolean true/false
      throw new Error(`HTTP error: ${response.status}`);
    }
    const data = await response.json();
    // console.log("All products:", data);
    return data;
  } catch (error) {
    console.error(`Could not get products: ${error}`);
  }
}; // end of fetchAllProducts()

// async functions always return a promise
const catalog = fetchAllProducts();
// so need to use .then() again
catalog.then((catalog) => {
  // Nested loops to match items
  for (let chosenItem in cart) {
    for (let allItems in catalog) {
      // if Id in cart match item Id in catalog
      if (catalog[allItems]._id == cart[chosenItem].id) {
        // assign values
        /**
         * ================
         * Button creation
         * ================
         */

        // =================
        const productToDisplay = catalog[allItems];
        const chosenProduct = cart[chosenItem];
        // render <article> for each element that have a match
        // html markup to render chosen items in cart
        const cartHTML = `
          <article
          class="cart__item"
          data-id="${chosenProduct.id}"
          data-color="${chosenProduct.color}">
          <div class="cart__item__img">
            <img src="${productToDisplay.imageUrl}" 
            alt="${productToDisplay.altTxt}" />
          </div>
          <div class="cart__item__content">
            <div class="cart__item__content__description">
              <h2>${productToDisplay.name}</h2>
              <p>${chosenProduct.color}</p>
              <p>€${productToDisplay.price}</p>
            </div>
            <div class="cart__item__content__settings">
              <div class="cart__item__content__settings__quantity">
                <p>Quantity: ${chosenProduct.quantity}</p>
                <input
                  type="number"
                  class="itemQuantity"
                  name="itemQuantity"
                  min="1"
                  max="100"
                  value="${chosenProduct.quantity}" />
              </div>
              <div class="cart__item__content__settings__delete">
                <p class="deleteItem">Delete</p>
              </div>
            </div>
          </div>
        </article>
        `;
        cartItems.insertAdjacentHTML("beforeend", cartHTML);
        // get access to rendered DOM
        accessToDeleteBtn();
        accessToQuantityToggle();
        // break; //get out of the loop
      } // end if
    } // end for catalog
  } // end for cart
}); // end of catalog.then((catalog)

// <--- Modifications or removals of products on the cart page --->

// load initial item
window.addEventListener("DOMContentLoaded", (event) => {
  console.log("DOM fully loaded and parsed");
});

function accessToDeleteBtn() {
  // return node list
  const deleteButtons = document.querySelectorAll(".deleteItem");
  // console.log("buttons collection is HERE:", deleteButtons);
  // loop through node list of buttons
  // and listen onclick to each button
  deleteButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      // console.log(e.currentTarget.classList);
      // console.log(e.btn);
      alert("I ma CLICKED");
    });
  });
}

// now works :)  ⤵
function accessToQuantityToggle() {
  const quantityToggle = document.querySelectorAll(".itemQuantity");
  quantityToggle.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      console.log(e.currentTarget);
      console.log(e.currentTarget.classList);
      console.log(e.btn);
      alert("Qty toggle");
    });
  });
}

// === some testing functions ===
/*
// sum of array test function start>
const arrayOfNumbers = [1, 2, 3, 4, 5];
// const letters = ["a", "b", "c", "d", "e"];
const arrSum = (anyArray) => {
  // create variable with value 0
  let sum = 0;
  // loop trough array
  anyArray.forEach((number) => {
    // add each array item (each number) to sum
    sum += number;
    console.log(sum);
    // return result
    return sum; // 15
  });
};
arrSum(arrayOfNumbers);
// arrSum(letters);
// <end sum of array test function

const doubleNum = arrayOfNumbers.map((value) => {
  return value * 2;
});
console.log(doubleNum);
arrSum(doubleNum);
*/
