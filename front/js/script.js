console.log("Home Page ⤵");
// Get access to the DOM
const itemContainer = document.querySelector(".items");

// API URL
const apiURL = "http://localhost:3000/api/products";

// function to get all products from API and render it on home page
// fetch .then function START
function renderAllProducts() {
  fetch(apiURL)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      data.forEach((product) => {
        const homePageHTML = `
        <a href="./product.html?id=${product._id}">
          <article>
            <img src=${product.imageUrl} alt=${product.altTxt}>
            <h3 class="productName">${product.name}</h3>
            <p class="productDescription">${product.description}</p>
          </article>
        </a>
        `;
        itemContainer.insertAdjacentHTML("beforeend", homePageHTML);
      });
    });
}
renderAllProducts();
// END of fetch .then function

// console.log function to access api array START
const asyncAllProducts = async function () {
  const response = await fetch(apiURL);
  const data = await response.json();
  console.log("All products:", data);
};
asyncAllProducts();
// END async - await function

//
/**
 * p.s. both functions have same functionality but i wanted to try
 * two different approaches with .then and async
 */
