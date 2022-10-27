console.log("-Cart Page-");
// Get access to the DOM
const cartItems = document.getElementById("cart__items");

// API URL
const apiURL = "http://localhost:3000/api/products";

// get info from LS if null creates empty array
// use LET to dynamically update quantity !important
let cart = JSON.parse(localStorage.getItem("cart")) || [];
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
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
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
      } // end if
    } // end for catalog
  } // end for cart
}); // end of catalog.then((catalog)

// update total price & quantity start>
const updateTotals = () => {
  catalog.then((catalog) => {
    // create variables for total
    let totalQuantity = 0;
    let totalProductsPrice = 0;
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    for (let chosenItem in cart) {
      for (let allItems in catalog) {
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
updateTotals();
// <end total price & quantity update

// <--- Modifications or removals of products on the cart page --->

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
                <p>Quantity: </p>
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
  // loop trough returned node list to access each button
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
      // call update to recalculate total
      updateTotals();
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

      for (let i = 0; i < parsedCart.length; i++) {
        if (
          parsedCart[i].id === shopItemId &&
          parsedCart[i].color === shopItemColor
        ) {
          parsedCart[i].quantity = input.value;
        } // end if
      } // end for

      // pushing new cart  back to local storage
      localStorage.setItem("cart", JSON.stringify(parsedCart));
      // call update to recalculate total
      updateTotals();
    });
  });
}
// ========================================================
// <end Function detailed area
// ========================================================

// <--- RegExp  --->

// DOM access to form
const form = document.getElementById("form");
// DOM access to order button
const orderButton = document.getElementById("order");
// DOM access to input fields
const firstName = document.getElementById("firstName");
const lastName = document.getElementById("lastName");
const address = document.getElementById("address");
const city = document.getElementById("city");
const email = document.getElementById("email");
// error messages access
const firstNameErrorMsg = document.getElementById("firstNameErrorMsg");
const lastNameErrorMsg = document.getElementById("lastNameErrorMsg");
const addressErrorMsg = document.getElementById("addressErrorMsg");
const cityErrorMsg = document.getElementById("cityErrorMsg");
const emailErrorMsg = document.getElementById("emailErrorMsg");

// create RegExp tests for the inputs fields
const validate = () => {
  let validString = /(^[a-zA-Z][a-zA-Z\s]{0,20}[a-zA-Z]$)/;
  let validAddress = /\w+(\s\w+){2,}/;
  let validEmail =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  // if (regex.exec === null) {"you didn't have a match"}
  if (!validString.test(firstName.value)) {
    firstNameErrorMsg.innerHTML = "Please, enter your name";
    // set input to empty string or leave it  with bad input? #TODO
    // firstName.value = "";
    return false;
  } else if (!validString.test(lastName.value)) {
    lastNameErrorMsg.innerHTML = "Please, enter valid last name";
    return false;
  } else if (!validAddress.test(address.value)) {
    addressErrorMsg.innerHTML = "Please, enter valid address";
    return false;
  } else if (!validString.test(city.value)) {
    cityErrorMsg.innerHTML = "Please, enter valid city";
    return false;
  } else if (!validEmail.test(email.value)) {
    emailErrorMsg.innerHTML = "Please, enter correct email address";
    return false;
  } else {
    return true;
  }
};

// =================================
// POST request field
form.addEventListener("submit", (e) => {
  // without prevent doesn't redirect to confirmation page
  e.preventDefault();

  // calling RegExp function here ⤵
  validate();

  // if validate function is true
  if (validate() === true) {
    // create object
    const contactObject = {
      contact: {
        firstName: form.firstName.value,
        lastName: form.lastName.value,
        address: form.address.value,
        city: form.city.value,
        email: form.email.value,
      },
      products: [],
    };

    // loop to push chosen products into object.products by id
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    // do not send request to the server if cart is empty
    if (cart.length === 0) {
      // alert user
      alert("Cart is empty - nothing to order");
      // exit function
      throw new Error("Cart is empty");
    }
    // loop to push items in cart to object products
    for (let i in cart) {
      contactObject.products.push(cart[i].id);
    } // end for in cart

    // alert("Thank you for your order");
    // call 'POST' function
    console.log("Ordered - POST in action ⤵");
    postRequest(contactObject);
  } else {
    // if validate is false do not update page, notify user
    e.preventDefault();
    // alert("Error in validation form");
  }
});

// function to POST user's input values in object
// and get order Id back from server
function postRequest(contactObject) {
  fetch("http://localhost:3000/api/products/order", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(contactObject),
  })
    .then((response) => {
      // guard clause
      if (!response.ok) {
        console.error("Problem");
        return;
      }
      return response.json();
    })
    .then((data) => {
      console.log("Success");
      console.log("Server response:", data);
      console.log("orderId:", data.orderId);

      // clear localStorage after submitting
      localStorage.clear();
      // send user to conformation page
      window.location.href = `confirmation.html?orderId=${data.orderId}`;
      // with replace() so user can not go back and make changes on cart
      // window.location.replace(`confirmation.html?orderId=${data.orderId}`);
      // - no need replace because LS.clean()
    })
    .catch((err) => {
      console.error(err);
    });
}
// end POST request field
// =================================
