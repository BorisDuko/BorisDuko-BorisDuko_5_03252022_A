console.log("-Cart Page-");
// Get access to the DOM
const cartItems = document.getElementById("cart__items");
const orderButton = document.getElementById("order");

// API URL
const apiURL = "http://localhost:3000/api/products";

// get info from LS if null creates empty array
const cart = JSON.parse(localStorage.getItem("cart"));

console.log(cart);

cart.forEach((product) => {
  const html = `
        <article class="cart__item" data-id="${product.id}" 
        data-color="${product.color}">
                <div class="cart__item__img">
                <img src="../images/product01.jpg" alt="Photo of a sofa">
                </div>
                <div class="cart__item__content">
                  <div class="cart__item__content__description">
                    <h2>Name of the product</h2>
                    <p>Green</p>
                    <p>€42.00</p>
                  </div>
                  <div class="cart__item__content__settings">
                    <div class="cart__item__content__settings__quantity">
                      <p>Quantity : </p>
                      <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="42">
                    </div>
                    <div class="cart__item__content__settings__delete">
                      <p class="deleteItem">Delete</p>
                    </div>
                  </div>
                </div>
              </article>
        `;
  cartItems.insertAdjacentHTML("beforeend", html);
});
