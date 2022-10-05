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
    console.log(response.status); // 200
    if (!response.ok) {
      // boolean true/false
      throw new Error(`HTTP error: ${response.status}`);
    }
    const data = await response.json();
    console.log("All products:", data);
    return data;
  } catch (error) {
    console.error(`Could not get products: ${error}`);
  }
};
// async functions always return a promise
const catalog = fetchAllProducts();
// so need to use .then() again
catalog.then((catalog) => {
  // Nested loops to match items
  for (let chosenItem in cart) {
    for (let allItems in catalog) {
      if (catalog[allItems]._id == cart[chosenItem].id) {
        // assign values
        const productToDisplay = catalog[allItems];
        const chosenProduct = cart[chosenItem];

        console.log("Product to display", productToDisplay);
        console.log(
          "display product IMAGE-URL:",
          productToDisplay.imageUrl
        );
        console.log("ALT TEXT FOR IMAGES:", productToDisplay.altTxt);
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
        // break; //get out of the loop
      } // end if
    }
  }
}); // end of catalog.then((catalog)
