console.log("Beginning ⤵");
// Get access to the DOM
const itemContainer = document.querySelector(".items");

// API URL
const apiURL = "http://localhost:3000/api/products";

// fetch .then function START
function renderAllProducts() {
  fetch(apiURL)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      data.forEach((product) => {
        const html = `
        <a href="./product.html?id=${product._id}">
        <article>
        <img src=${product.imageUrl} alt=${product.altTxt}>
        <h3 class="productName">${product.name}</h3>
        <p class="productDescription">${product.description}</p>
        </article>
        </a>
        `;
        itemContainer.insertAdjacentHTML("beforeend", html);
      });
    });
}
renderAllProducts();
// END of fetch .then function

// console.log function to access api array START
const asyncAllProducts = async function () {
  const response = await fetch(apiURL);
  const data = await response.json();
  console.log(data);
  for (let i in data) {
    // productId = data[i]._id;
    imageUrl = data[i].imageUrl;
    altTxt = data[i].altTxt;
    productName = data[i].name;
    productDescription = data[i].description;
    // console.log(
    //   imageUrl +
    //     " - " +
    //     altTxt +
    //     ". " +
    //     "Name: " +
    //     productName +
    //     ". Described as: " +
    //     productDescription
    // );
    // return ?what?
  }
};
asyncAllProducts();
// END async - await function
