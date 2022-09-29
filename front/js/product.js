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
                    ${addColorToDropdown()}
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
const addColorToDropdown = () => {
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

// Function - add productID with chosen color and quantity to local storage
const addToLocalStorage = () => {
  // get values from from inputs
  let productId = productParamId;
  let color = document.getElementById("colors").value;
  let quantity = document.getElementById("quantity").value;
  // console.log(productId);
  // console.log(color);
  // console.log(quantity);

  // if values are NOT valid
  if (!color || quantity <= 0) {
    // notify user
    alert("Please choose color and quantity");
    return;
  }

  // if values are valid

  // create CART object
  let cart = {
    id: productId,
    color: color,
    quantity: quantity,
  };

  // save values in the local storage
  localStorage.setItem("cart", JSON.stringify(cart));
};
