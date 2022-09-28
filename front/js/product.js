// Get access to the DOM
const itemContainer = document.querySelector(".item");

const colorDropdown = document.querySelector("#colors");

// URL Search Params
const productKeyValue = window.location.search;
const productUrlParams = new URLSearchParams(productKeyValue);
const productParamId = productUrlParams.get("id");

// API URL: / + product Id
const apiUrlId = "http://localhost:3000/api/products/" + productParamId;

// ----- to see product info -----
// fetch(apiUrlId)
//   .then((res) => {
//     return res.json();
//   })
//   .then((productInfo) => {
//     console.log("Array of product info: ⤵", productInfo);
//   });
// ----- to see product info -----

// Render product page
fetch(apiUrlId)
  .then((response) => {
    return response.json();
  })
  .then((product) => {
    // try for loop for colors
    // console.log(product);

    // create a function to render colors to dropdown
    const addColorToDropdown = () => {
      fetch(apiUrlId)
        .then((response) => {
          return response.json();
        })
        .then((productInfo) => {
          console.log("This is product colors:", productInfo.colors);
          const productColors = productInfo.colors;
          // forEach loop
          productColors.forEach((color, index) => {
            console.log(`${index + 1} Color: ${color}`);
            // html render for dropdown
            const dropdownMarkup = `
            <option value="${color}">${color}</option>
            `;
            document
              .querySelector("#colors")
              .insertAdjacentHTML("beforeend", dropdownMarkup);
          });
        });
    };
    // call this function inside productPageHTML ⤵
    // //////////////////
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
                    //////////////////////////////
                    ${addColorToDropdown()}
                    /////////////////////////////////
                  </select>
                </div>

                <div class="item__content__settings__quantity">
                  <label for="itemQuantity"
                    >Number of articles (1-100):</label
                  >
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
  });

// forEach method order example
// const movements = [200, 450, -400, 300, -650, -130, 70, 1300];
// movements.forEach((element, index, arr) => {
//   if (element > 0) {
//     console.log(`Movement #${index + 1}: ${element}`);
//   } else {
//     console.log(`#${index + 1} Withdraw: ${Math.abs(element)}`);
//   }
// });

const addColorToDropdown = () => {
  fetch(apiUrlId)
    .then((res) => {
      console.log("This is json response", res);
      return res.json();
    })
    .then((productInfo) => {
      console.log("This is product colors:", productInfo.colors);
      const productColors = productInfo.colors;
      productColors.forEach((element, index) => {
        console.log(`${index + 1} Color: ${element}`);
      });
    });
};
// addColorToDropdown();

// product info loop ->
// productInfo.forEach((element) => {
//     console.log("Returning colors", element.colors);

// const markup = `
// <option value="${element.colors}">${element.colors}</option>
// `;

// document
//   .querySelector("section")
//   .insertAdjacentElement("beforeend", markup);
//   });
