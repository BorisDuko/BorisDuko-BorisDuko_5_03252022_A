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

// async functions always return a promise ⤴
const catalog = fetchAllProducts();

// so need to use .then() again ⤵
catalog.then((catalog) => {
  // Nested loops to match items
  for (let chosenItem in cart) {
    for (let allItems in catalog) {
      // if Id in cart match item Id in catalog
      if (catalog[allItems]._id == cart[chosenItem].id) {
        // assign values
        const chosenProduct = cart[chosenItem];
        const productToDisplay = catalog[allItems];

        // render <article> for each element that have a match
        // html markup to render chosen items in cart
        const cartHTML = renderCartPage(chosenProduct, productToDisplay);
        cartItems.insertAdjacentHTML("beforeend", cartHTML);
        // get access to rendered DOM
        accessToDeleteBtn();
        accessToQuantityToggle();
        // ------------------

        // ------------------
      } // end if
    } // end for catalog
  } // end for cart
}); // end of catalog.then((catalog)

//  total price start>

const updateTotals = () => {
  catalog.then((catalog) => {
    // create variables for total
    let totalQuantity = 0;
    let totalProductsPrice = 0;
    // TODO get all the product from the cart
    for (let chosenItem in cart) {
      for (let allItems in catalog) {
        // TODO delete item that was selected
        // redo the line without the line is selected
        // empty localStorage
        // and rebuild page without the line was selected
        if (catalog[allItems]._id == cart[chosenItem].id) {
          // assign values
          const itemQuantity = cart[chosenItem].quantity;
          // total price of all products
          totalProductsPrice =
            totalProductsPrice + catalog[allItems].price * itemQuantity;
          // total quantity of all products in the cart
          totalQuantity = Number(totalQuantity) + Number(itemQuantity);
        } // end if
      } // end for (let allItems in catalog)
    } // end for (let chosenItem in cart)
    // inserting values into DOM
    document.getElementById("totalQuantity").innerText = totalQuantity;
    document.getElementById("totalPrice").innerText = totalProductsPrice;
  });
};

// call the function
// #TODO !
updateTotals();
// <end total price

// <--- Modifications or removals of products on the cart page --->

// ------------------------------------------------- ⤵
// testing quantity toggle

// testing quantity toggle
// ------------------------------------------------- ⤴

// load initial item
window.addEventListener("DOMContentLoaded", (event) => {
  console.log("DOM fully loaded and parsed");
});

// ========================================================
// Function detailed area start>
// ========================================================
function renderCartPage(chosenProduct, productToDisplay) {
  return `
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
}

function accessToDeleteBtn() {
  // return node list
  const deleteButtons = document.querySelectorAll(".deleteItem");

  deleteButtons.forEach((btn) => {
    btn.addEventListener("click", (event) => {
      // assign variables
      let deleteButtonClicked = event.currentTarget;
      let shopItem = deleteButtonClicked.closest(".cart__item");
      let shopItemId = shopItem.getAttribute("data-id");
      let shopItemColor = shopItem.getAttribute("data-color");
      // remove div
      shopItem.remove();
      // get cart from local storage / assign to variable
      const parsedCart = JSON.parse(localStorage.getItem("cart"));

      for (let i = 0; i < parsedCart.length; i++) {
        // item match id and color
        if (
          parsedCart[i].id === shopItemId &&
          parsedCart[i].color === shopItemColor
        ) {
          // .splice(removes index [i] that match , 1 item)
          parsedCart.splice(i, 1);
        } // end if
      } // end for
      // pushing new cart  back to local storage
      localStorage.setItem("cart", JSON.stringify(parsedCart));
      // update total article and price using reload page
      document.location.reload();
    });
  });
}

function accessToQuantityToggle() {
  const quantityToggle = document.querySelectorAll(".itemQuantity");
  quantityToggle.forEach((btn) => {
    btn.addEventListener("change", (e) => {
      let input = e.target;

      // input to be always number and not go less than 1
      if (isNaN(input.value) || input.value <= 0) {
        input.value = 1;
      }
      let deleteButtonClicked = e.currentTarget;
      let shopItem = deleteButtonClicked.closest(".cart__item");
      let shopItemId = shopItem.getAttribute("data-id");
      let shopItemColor = shopItem.getAttribute("data-color");
      // get cart from local storage / assign to variable
      const parsedCart = JSON.parse(localStorage.getItem("cart"));
      // console.log("this is parsed Cart:", parsedCart);
      for (let i = 0; i < parsedCart.length; i++) {
        if (
          parsedCart[i].id === shopItemId &&
          parsedCart[i].color === shopItemColor
        ) {
          console.log("found: " + shopItemId);

          parsedCart[i].quantity = input.value;
        } // end if
      } // end for
      // pushing new cart  back to local storage
      localStorage.setItem("cart", JSON.stringify(parsedCart));
      // update total article and price using reload page
      // document.location.reload();
      // --- to test ---
      // here i give a second to choose quantity
      setTimeout(() => {
        document.location.reload();
      }, 1000);
      // --- to test ---
    });
  });
}

// getLocalStorage function
/**
   const getLocalStorage = () => {
    return localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart"))
    : [];
};
console.log("Get local storage function: ", getLocalStorage());
 */

// ========================================================
// <end Function detailed area
// ========================================================

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

// ======================
/**
 * > validate input: names = names, email = email ... etc.
 * > create object - contains inputs
 * > order: like fetch
 */
