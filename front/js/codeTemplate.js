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


// dropdown items
<option value="vert">${product.colors[0]}</option>
<option value="blanc">${product.colors[1]}</option>
