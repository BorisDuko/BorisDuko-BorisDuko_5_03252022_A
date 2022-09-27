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
