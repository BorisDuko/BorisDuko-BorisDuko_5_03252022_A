// fetch template
fetch(apiURL)
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    console.log(data);
    const html = `
        
        `;
    itemContainer.insertAdjacentHTML("beforeend", html);
  });

// Rendering main page with insertAdjacentHTML fetch(apiURL)
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

// URL Search Params example
console.log("Window Location:", window.location);

const myKeyValue = window.location.search;
console.log("Keys & Values:", myKeyValue);

const urlParams = new URLSearchParams(myKeyValue);

const paramId = urlParams.get("id");

console.log("Id:", paramId);

// forEach method order example
const movements = [200, 450, -400, 300, -650, -130, 70, 1300];
movements.forEach((element, index, arr) => {
  if (element > 0) {
    console.log(`Movement #${index + 1}: ${element}`);
  } else {
    console.log(`#${index + 1} Withdraw: ${Math.abs(element)}`);
  }
});

// ----- to see product info -----
fetch(apiUrlId)
  .then((res) => {
    return res.json();
  })
  .then((productInfo) => {
    console.log("Array of product info: ⤵", productInfo);
  });
// ----- to see product info -----

// dropdown items
// create a function to render colors to dropdown
const addColorToDropdown = () => {
  fetch(apiUrlId)
    .then((res) => {
      console.log("This is json response", res);
      return res.json();
    })
    .then((productInfo) => {
      console.log("This is product colors:", productInfo.colors);
      const productColors = productInfo.colors;
      productColors.forEach((color, index) => {
        console.log(`${index + 1} Color: ${color}`);
        const dropdownMarkup = `
        <option value="${color}">${color}</option>
        `;
        document
          .querySelector("#colors")
          .insertAdjacentHTML("beforeend", dropdownMarkup);
      });
    });
};

// forEach method order example
// const movements = [200, 450, -400, 300, -650, -130, 70, 1300];
// movements.forEach((element, index, arr) => {
//   if (element > 0) {
//     console.log(`Movement #${index + 1}: ${element}`);
//   } else {
//     console.log(`#${index + 1} Withdraw: ${Math.abs(element)}`);
//   }
// });

// <--- Local Storage --->
// local storage example
const inpKey = document.getElementById("inputKey");
const inpValue = document.getElementById("inputValue");
const btnInserts = document.getElementById("btnInserts");
const localStorageOutput = document.getElementById("lsOutput");

btnInserts.onclick = () => {
  // .value - returns given object's value
  const key = inpKey.value;
  const value = inpValue.value;

  //   console.log(key);
  //   console.log(value);

  if (key && value) {
    // setItem(key, value) – store key/value pair
    localStorage.setItem(key, value);
    location.reload();
  }
};
for (let i = 0; i < localStorage.length; i++) {
  // key(index) – get the key on a given position
  const key = localStorage.key(i);
  // getItem(key) – get the value by key
  const value = localStorage.getItem(key);

  // append to html
  localStorageOutput.innerHTML += `${key}: ${value} <br />`;
}

// page loaded indicator
function pageLoaded() {
  window.addEventListener("load", (event) => {
    console.log("page is fully loaded - load event");
  });
  window.onload = (event) => {
    console.log("page is fully loaded - onload");
  };
}
pageLoaded();

// --- LOCAL STORAGE ---

// put string with product info into local storage
// and create cart array
function addDataToLocalStorage() {
  fetch(apiUrlId)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      localStorage.setItem("product", JSON.stringify(data));
      // as a test adding id and colors[]
      localStorage.setItem("id", JSON.stringify(data._id));
      localStorage.setItem("colors", JSON.stringify(data.colors));
      // to see if it works
      if (!localStorage.getItem("cart")) {
        localStorage.setItem("cart", "[]");
      }
    });
}
// setItems to local storage with key-value
const stringifyId = JSON.stringify(productParamId);
const productLocalStorageId = localStorage.setItem("id", productParamId);

console.log("Product ID as a string", stringifyId);
console.log("product ID in the local storage:", productParamId);

// JSON.parse variables from local storage
const product = JSON.parse(localStorage.getItem("product"));
const cart = JSON.parse(localStorage.getItem("cart"));
// ----------------------------------
