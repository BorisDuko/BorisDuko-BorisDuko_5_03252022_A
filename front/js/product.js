// Get access to the DOM
const itemContainer = document.querySelector(".item");

const productId = "415b7cacb65d43b2b5c1ff70f3393ad1";

// API URL
const apiURL = "http://localhost:3000/api/products/" + productId;
console.log(apiURL);

// Render product page
fetch(apiURL)
  .then((response) => {
    return response.json();
  })
  .then((product) => {
    const html = `
      <article>
            <div class="item__img">
              <!-- <img src="../images/logo.png" alt="Photo of a sofa"> -->
            </div>
            <div class="item__content">
              <div class="item__content__titlePrice">
                <h1 id="title">${product.name}</h1>
                <p>
                  Prix : <span id="price">${product.price}</span>€
                </p>
              </div>

              <div class="item__content__description">
                <p class="item__content__description__title">
                  Description:
                </p>
                <p id="description">
                  <!-- Dis enim malesuada risus sapien gravida nulla nisl arcu. -->
                </p>
              </div>

              <div class="item__content__settings">
                <div class="item__content__settings__color">
                  <label for="color-select">Chose your color:</label>
                  <select name="color-select" id="colors">
                    <option value="">--Please, select a color --</option>
                    <!--                       <option value="vert">green</option>
                      <option value="blanc">white</option> -->
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
    itemContainer.insertAdjacentHTML("beforeend", html);
  });
