// Get access to the DOM
const itemContainer = document.querySelector(".item");
const colorDropdown = document.querySelector("#colors");
const addToCartButton = document.getElementById("addToCart");
// const chosenColor = document.getElementById("colors");
// const chosenQuantity = document.getElementById("quantity");

// --- URL Search Params ---
// get product key search location
const productKeyValue = window.location.search;
// create url parameter for individual product
const productUrlParams = new URLSearchParams(productKeyValue);
// get() return value with given search parameter `?id=`
const productParamId = productUrlParams.get("id");

// API URL: / + product Id
// using search params from get() add it to apiUrl with slash
const apiUrlId = "http://localhost:3000/api/products/" + productParamId;

// Render product page
fetch(apiUrlId)
  .then((response) => {
    return response.json();
  })
  .then((product) => {
    const productPageHTML = `
      <article>
            <div class="item__img">
            <img src=${product.imageUrl} alt=${product.altTxt}>
            </div>
            <div class="item__content">
              <div class="item__content__titlePrice">
                <h1 id="title">${product.name}</h1>
                <p>
                  Price : <span id="price">${product.price}</span>€
                </p>
              </div>

              <div class="item__content__description">
                <p class="item__content__description__title">
                  Description:
                </p>
                <p id="description">
                  ${product.description}
                </p>
              </div>

              <div class="item__content__settings">
                <div class="item__content__settings__color">
                  <label for="color-select">Chose your color:</label>
                  <select name="color-select" id="colors">
                    <option value="">--Please, select a color --</option>
                    ${addColorsToDropdown()}
                  </select>
                </div>

                <div class="item__content__settings__quantity">
                  <label for="itemQuantity"
                    >Number of articles (1-100):</label>
                  <input
                    type="number"
                    name="itemQuantity"
                    min="1"
                    max="100"
                    value="0"
                    id="quantity" />
                </div>
              </div>

              <div class="item__content__addButton">
                <button id="addToCart">Add to cart</button>
              </div>
            </div>
          </article>
      `;
    // itemContainer.insertAdjacentHTML("beforeend", html);
    document
      .querySelector("section")
      .insertAdjacentHTML("beforeend", productPageHTML);
    // adding event listener to the "Add to cart" button
    // .calling it here because need to wait for page to render
    document.getElementById("addToCart").addEventListener("click", () => {
      addToLocalStorage();
    });
  });

// create a function to render colors to dropdown menu
// call this function inside productPageHTML ⤴
const addColorsToDropdown = () => {
  fetch(apiUrlId)
    .then((response) => {
      return response.json();
    })
    .then((productInfo) => {
      console.log("This is product colors:", productInfo.colors);
      const productColors = productInfo.colors;
      // forEach loop to go through colors
      productColors.forEach((color, index) => {
        console.log(`${index + 1} Color: ${color}`);
        // html render for each color in dropdown menu
        const dropdownMarkup = `
        <option value="${color}">${color}</option>
        `;
        document
          .querySelector("#colors")
          .insertAdjacentHTML("beforeend", dropdownMarkup);
      });
    });
};

// <--- Local Storage --->
console.log("Product ID:", productParamId);

// get info from local storage if not - create empty array
// I choose "let" because otherwise it's store values in memory
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Function - add productID with chosen color and quantity to local storage
const addToLocalStorage = () => {
  // get values from from inputs
  let chosenId = productParamId;
  let chosenColor = document.getElementById("colors").value;
  let chosenQuantity = document.getElementById("quantity").value;

  // if values are NOT valid
  if (!chosenColor || chosenQuantity <= 0) {
    // notify user
    alert("Please choose color and quantity");
    return;
  }

  // if values are valid

  // read localStorage before for loop
  // if cart is empty - create new object with given values
  if (cart.length == 0) {
    cart.push({
      id: chosenId,
      color: chosenColor,
      quantity: chosenQuantity,
    });
  } else {
    let isUpdated = false;
    // for loop to check matching values inside cart
    for (let i in cart) {
      if (cart[i].id == chosenId && cart[i].color == chosenColor) {
        // turn cart[i].quantity into number, assign it's value to variable
        let cartQuantity = Number(cart[i].quantity);
        // add new value (as number) to previous value
        cartQuantity += Number(chosenQuantity);
        // update new quantity value
        cart[i].quantity = cartQuantity; // updating
        isUpdated = true; // to end loop if updated
      } // end if for duplicate
    } // end for

    // if no match - then push new values to the cart
    if (isUpdated == false) {
      // push new values in cart array as object
      cart.push({
        id: chosenId,
        color: chosenColor,
        quantity: chosenQuantity,
      });
    } // end if isUpdated
  } // end if cart.length

  // save values in the local storage (as a string)
  localStorage.setItem("cart", JSON.stringify(cart));
}; // end addToLocalStorage() function
