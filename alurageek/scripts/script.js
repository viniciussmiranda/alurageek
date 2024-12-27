// Selecionando elementos do DOM
const productForm = document.getElementById('product-form');
const productNameInput = document.getElementById('product-name');
const productPriceInput = document.getElementById('product-price');
const productImageInput = document.getElementById('product-image');
const productsContainer = document.getElementById('products-container');

// URL do json-server
const apiUrl = 'http://localhost:3000/products';

// Função para buscar os produtos do json-server
function fetchProducts() {
  fetch(apiUrl)
    .then(response => response.json())
    .then(products => {
      displayProducts(products);
    })
    .catch(error => console.error('Erro ao buscar produtos:', error));
}

// Função para exibir os produtos na página
function displayProducts(products) {
  productsContainer.innerHTML = ''; // Limpa o conteúdo atual

  products.forEach(product => {
    const productCard = document.createElement('div');
    productCard.classList.add('product-card');

    productCard.innerHTML = `
      <img src="${product.image}" alt="${product.name}" />
      <h3>${product.name}</h3>
      <p>R$ ${product.price.toFixed(2)}</p>
      <button onclick="deleteProduct(${product.id})">Remover</button>
    `;

    productsContainer.appendChild(productCard);
  });
}

// Função para adicionar um novo produto
productForm.addEventListener('submit', function(event) {
  event.preventDefault(); // Impede o envio do formulário

  const newProduct = {
    name: productNameInput.value,
    price: parseFloat(productPriceInput.value),
    image: productImageInput.value
  };

  fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(newProduct)
  })
  .then(response => response.json())
  .then(() => {
    fetchProducts(); // Recarrega a lista de produtos
    productForm.reset(); // Limpa o formulário
  })
  .catch(error => console.error('Erro ao adicionar produto:', error));
});

// Função para remover um produto
function deleteProduct(productId) {
  fetch(`${apiUrl}/${productId}`, {
    method: 'DELETE'
  })
  .then(() => {
    fetchProducts(); // Recarrega a lista de produtos
  })
  .catch(error => console.error('Erro ao remover produto:', error));
}

// Carregar os produtos ao iniciar a página
fetchProducts();
