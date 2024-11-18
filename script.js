// Hardcoded children's clothing products
const products = [
    {
      id: 1,
      title: "Kids' T-Shirt",
      image: "https://via.placeholder.com/200x200.png?text=Kids+T-Shirt",
      price: 15.99,
      category: "Tops",
      description: "A comfortable and stylish t-shirt for kids, made from soft cotton.",
    },
    {
      id: 2,
      title: "Girls' Summer Dress",
      image: "https://via.placeholder.com/200x200.png?text=Summer+Dress",
      price: 29.99,
      category: "Dresses",
      description: "A vibrant and breezy dress perfect for summer days.",
    },
    {
      id: 3,
      title: "Boys' Denim Jacket",
      image: "https://via.placeholder.com/200x200.png?text=Denim+Jacket",
      price: 45.99,
      category: "Outerwear",
      description: "A rugged and durable denim jacket for boys, ideal for all seasons.",
    },
    {
      id: 4,
      title: "Toddler's Pajama Set",
      image: "https://via.placeholder.com/200x200.png?text=Pajama+Set",
      price: 19.99,
      category: "Sleepwear",
      description: "Soft and cozy pajama set for toddlers, perfect for bedtime.",
    },
    {
      id: 5,
      title: "Kids' Sneakers",
      image: "https://via.placeholder.com/200x200.png?text=Sneakers",
      price: 34.99,
      category: "Footwear",
      description: "Stylish and comfortable sneakers for kids, suitable for all-day wear.",
    },
  ];
  
  // Shopping cart and filter/search functionality
  let cart = [];
  let filteredProducts = products;
  
  function displayProducts() {
    const productsContainer = document.getElementById("products");
    productsContainer.innerHTML = "";
  
    filteredProducts.forEach((product) => {
      const productCard = document.createElement("div");
      productCard.className = "product-card";
      productCard.innerHTML = `
        <img src="${product.image}" alt="${product.title}">
        <h3>${product.title}</h3>
        <p>$${product.price.toFixed(2)}</p>
        <button onclick="viewProduct(${product.id})">View Details</button>
      `;
      productsContainer.appendChild(productCard);
    });
  }
  
  function viewProduct(productId) {
    const product = products.find((p) => p.id === productId);
    const productDetail = document.getElementById("product-detail");
    productDetail.style.display = "block";
    productDetail.innerHTML = `
      <h2>${product.title}</h2>
      <img src="${product.image}" alt="${product.title}">
      <p>${product.description}</p>
      <p>Price: $${product.price.toFixed(2)}</p>
      <button onclick="addToCart(${productId})">Add to Cart</button>
      <button onclick="closeProductDetail()">Close</button>
    `;
  }
  
  function closeProductDetail() {
    document.getElementById("product-detail").style.display = "none";
  }
  
  function addToCart(productId) {
    const product = products.find((p) => p.id === productId);
    cart.push(product);
    updateCartCount();
  }
  
  function updateCartCount() {
    const cartCount = document.getElementById("cart-count");
    cartCount.textContent = cart.length;
  }
  
  function toggleCartView() {
    const cartView = document.getElementById("cart-view");
    const overlay = document.getElementById("overlay");
  
    if (cartView.style.display === "block") {
      cartView.style.display = "none";
      overlay.style.display = "none";
    } else {
      const cartItems = document.getElementById("cart-items");
      cartItems.innerHTML = cart
        .map(
          (item, index) => `
          <div class="cart-item">
            <span>${item.title}</span>
            <span>$${item.price.toFixed(2)}</span>
            <button onclick="removeFromCart(${index})">Remove</button>
          </div>`
        )
        .join("");
  
      const cartTotal = document.getElementById("cart-total");
      cartTotal.textContent = cart.reduce((sum, item) => sum + item.price, 0).toFixed(2);
  
      cartView.style.display = "block";
      overlay.style.display = "block";
    }
  }
  
  function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartCount();
    toggleCartView();
    toggleCartView(); // Refresh view
  }
  
  function filterProducts() {
    const filterValue = document.getElementById("filter").value.toLowerCase();
    const searchValue = document.getElementById("search").value.toLowerCase();
  
    filteredProducts = products.filter(
      (product) =>
        (filterValue === "" || product.category.toLowerCase() === filterValue) &&
        (product.title.toLowerCase().includes(searchValue) || product.description.toLowerCase().includes(searchValue))
    );
  
    displayProducts();
  }
  
  document.getElementById("filter").addEventListener("change", filterProducts);
  document.getElementById("search").addEventListener("input", filterProducts);
  
  // Initialize
  displayProducts();
  