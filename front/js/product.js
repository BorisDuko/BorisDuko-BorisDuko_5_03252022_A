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
fetch(apiUrlId)
  .then((res) => {
    return res.json();
  })
  .then((productInfo) => {
    console.log("Array of product info: ⤵", productInfo);
  });
// ----- to see product info -----

// Render product page
fetch(apiUrlId)
  .then((response) => {
    return response.json();
  })
  .then((product) => {
    // try for loop for colors
    // console.log(product);
    // product.colors.forEach((element, index) => {
    //   const markup = `
    //   <option value="${element.colors}">${element.colors}</option>
    //   `;
    //     document
    //       .querySelector("select")
    //       .insertAdjacentHTML("beforeend", markup);
    // });
    // //////////////////
    const html = `
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

                    <option value="vert">green</option>
                    <option value="blanc">white</option>
                      
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
      .insertAdjacentHTML("beforeend", html);
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
      return res.json();
    })
    .then((productInfo) => {
      productInfo.forEach((element) => {
        const markup = `
        <option value="${element.colors}">${element.colors[0]}</option>
        `;

        document
          .querySelector("section")
          .insertAdjacentElement("beforeend", markup);
      });
    });
};
addColorToDropdown();
