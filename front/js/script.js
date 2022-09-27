console.log("Beginning ⤵");
// Get access to the DOM
const itemContainer = document.querySelector(".items");

// API URL
const apiURL = "http://localhost:3000/api/products";

// fetch .then function START
function getAllProducts() {
  fetch(apiURL)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      // console.log(data);
      for (let i in data) {
        productName = data[i].name;
        productDescription =
          productName + " - Description: " + data[i].description;
        console.log(productName);
        console.log(productDescription);
      }
      // add here a function that render html
      // renderHTML(data[0]);
    });
}
// getAllProducts();
// END of fetch .then function

// async - await function START
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
    console.log(
      imageUrl +
        " - " +
        altTxt +
        ". " +
        "Name: " +
        productName +
        ". Described as: " +
        productDescription
    );
    // return ?what?
  }
};

asyncAllProducts();
// END async - await function

// Render html function START
// const renderMainPage = function (data) {
const renderMainPage = function (
  imageUrl,
  altTxt,
  productName,
  productDescription
) {
  const html = `
  <a href="./product.html?id=${data._id}"> example : product[imageUrl]
    <article>
      <img class="product-img" src="${data.imageUrl}" 
      alt="${data.altTxt}, ${data.name}">
      <h3 class="productName">${data.name}</h3>
      <p class="productDescription">${data.description}</p>
    </article>
  </a> */
  `;
  itemContainer.insertAdjacentHTML("beforeend", html);
};
// END Render html function
/*
let myCatalog = allProducts();
let myDiv = getElementById("catalog") // not sure it is the id - look into the code of welcome page 

for (item in myCatalog ){

myPrice = item.price;
mydesc = item.desc
etc.

let myItemHTML = ' <div>{$myPrice}</div>  ' // use the HTML in comment in the welcome page that represent one item  (repeat for each variable)
myDiv.appendChild(myItemHTML)


}// end loop for
*/

//while product in allProducts
//add product into HTML elements with items ID
/*
    <a href="./product.html?id=42"> example : product[imageUrl]
    <article>
      <img src=".../product01.jpg" alt="Lorem ipsum dolor sit amet, Kanap name1">
      <h3 class="productName">Kanap name1</h3>
      <p class="productDescription">Dis enim malesuada risus sapien gravida nulla nisl arcu. Dis enim malesuada risus sapien gravida nulla nisl arcu.</p>
    </article>
  </a> */

////////////////////////////
// testing insertAdjacentHTML
fetch(apiURL)
  .then((res) => {
    return res.json();
  })
  .then((data) => {
    data.forEach((product) => {
      const markup = `
      <a href="/${product._id}">
      <article>
      <img src=${product.imageUrl} alt=${product.altTxt}>
      <h3 class="productName">${product.name}</h3>
      <p class="productDescription">${product.description}</p>
      </article>
      </a>
      `;
      itemContainer.insertAdjacentHTML("beforeend", markup);
    });
  });

// <a href="/${product._id}"
// <a/>
