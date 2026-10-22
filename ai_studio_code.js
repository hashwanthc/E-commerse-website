/**
 * ShopEase - Core Interactive Frontend Application
 * Handles state management, dynamic rendering, cart operations with LocalStorage,
 * search/filter/sorting, modals, checkout validation, and simulated transactions.
 */

// ==========================================
// 1. DATA SOURCE (12+ Curated Products)
// ==========================================
const PRODUCTS = [
  {
    id: 1,
    name: "AeroTune Wireless Noise-Cancelling Headphones",
    category: "Electronics",
    price: 3499,
    originalPrice: 4999,
    rating: 4.8,
    reviewsCount: 312,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=700&q=80",
    description: "Immerse yourself in rich, studio-grade acoustics. Powered with 40-hour battery life, fast charging, and plush memory-foam earcups."
  },
  {
    id: 2,
    name: "UrbanPulse Smartwatch with AMOLED Display",
    category: "Electronics",
    price: 2899,
    originalPrice: 3999,
    rating: 4.6,
    reviewsCount: 198,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=700&q=80",
    description: "Track your health with real-time SpO2, heart rate telemetry, and 120+ active sports modes in a durable aerospace-grade aluminum casing."
  },
  {
    id: 3,
    name: "Minimalist Linen Overshirt – Olive Edition",
    category: "Fashion",
    price: 1499,
    originalPrice: 2299,
    rating: 4.7,
    reviewsCount: 86,
    image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=700&q=80",
    description: "Breathable 100% natural organic linen tailored with a modern relaxed fit. Perfect for casual weekend outings or smart office wear."
  },
  {
    id: 4,
    name: "All-Terrain Velocity Running Sneakers",
    category: "Shoes",
    price: 2799,
    originalPrice: 3899,
    rating: 4.9,
    reviewsCount: 420,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=700&q=80",
    description: "Engineered with responsive cloud-foam midsoles, breathable mesh upper, and high-traction rubber outsoles for peak endurance."
  },
  {
    id: 5,
    name: "Vintage Aviator Polarized Sunglasses",
    category: "Accessories",
    price: 899,
    originalPrice: 1499,
    rating: 4.4,
    reviewsCount: 140,
    image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=700&q=80",
    description: "UV400 anti-glare polarized lenses housed inside an ultra-light stainless steel framework. Timeless style meets everyday eye safety."
  },
  {
    id: 6,
    name: "Nordic Minimalist Warm LED Desk Lamp",
    category: "Home & Living",
    price: 1299,
    originalPrice: 1899,
    rating: 4.5,
    reviewsCount: 94,
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=700&q=80",
    description: "Sleek matte design with 3 adjustable color warmth settings and stepless touch dimming. Ideal for reading, studying, or bedside ambiance."
  },
  {
    id: 7,
    name: "Compact RGB Mechanical Gaming Keyboard",
    category: "Electronics",
    price: 2499,
    originalPrice: 3299,
    rating: 4.7,
    reviewsCount: 275,
    image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=700&q=80",
    description: "Hot-swappable tactile red mechanical switches, customizable per-key RGB backlighting, and sturdy braided detachable USB-C cable."
  },
  {
    id: 8,
    name: "Handcrafted Artisan Ceramic Mug Set (4-Piece)",
    category: "Home & Living",
    price: 999,
    originalPrice: 1499,
    rating: 4.9,
    reviewsCount: 110,
    image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=700&q=80",
    description: "Kiln-fired earthenware mugs with comfortable ergonomic handles. Microwave and dishwasher safe, glazed with earth-toned mineral pigments."
  },
  {
    id: 9,
    name: "Genuine Leather Handcrafted Everyday Tote",
    category: "Accessories",
    price: 2299,
    originalPrice: 3499,
    rating: 4.6,
    reviewsCount: 78,
    image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=700&q=80",
    description: "Spacious interior compartments with dedicated padded sleeve for up to a 14-inch laptop. Built with reinforced double-stitched leather handles."
  },
  {
    id: 10,
    name: "Classic Oxford Suede Formal Loafers",
    category: "Shoes",
    price: 2199,
    originalPrice: 3199,
    rating: 4.5,
    reviewsCount: 132,
    image: "https://images.unsplash.com/photo-1533867617858-e7b97e060509?auto=format&fit=crop&w=700&q=80",
    description: "Crafted with supple microfiber suede and cushioned memory insoles. Elegantly complements tailored trousers as well as dark denim."
  },
  {
    id: 11,
    name: "Relaxed Fit Cotton Floral Summer Dress",
    category: "Fashion",
    price: 1699,
    originalPrice: 2499,
    rating: 4.8,
    reviewsCount: 164,
    image: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=700&q=80",
    description: "Lightweight, pre-shrunk pure cotton adorned with botanical prints. Features a flattering flared hemline and convenient side pockets."
  },
  {
    id: 12,
    name: "Heavy-Duty Water-Resistant Commuter Backpack",
    category: "Accessories",
    price: 1899,
    originalPrice: 2699,
    rating: 4.7,
    reviewsCount: 305,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=700&q=80",
    description: "Weather-sealed 900D ballistic nylon with 25L packing volume, anti-theft hidden pocket, and luggage-strap pass-through for stress-free travel."
  }
];

const CATEGORIES = [
  { name: "Electronics", icon: "fa-laptop" },
  { name: "Fashion", icon: "fa-shirt" },
  { name: "Shoes", icon: "fa-shoe-prints" },
  { name: "Accessories", icon: "fa-glasses" },
  { name: "Home & Living", icon: "fa-couch" }
];

// Fallback image in case an external image URL fails to load
const IMAGE_FALLBACK = "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=700&q=80";

// ==========================================
// 2. APPLICATION STATE
// ==========================================
const state = {
  products: [...PRODUCTS],
  selectedCategory: "All",
  searchQuery: "",
  sortBy: "featured",
  cart: JSON.parse(localStorage.getItem("shopease_cart")) || []
};

// ==========================================
// 3. DOM ELEMENT REFERENCES
// ==========================================
const DOM = {
  productGrid: document.getElementById("productGrid"),
  noProductsFound: document.getElementById("noProductsFound"),
  resultsCount: document.getElementById("resultsCount"),
  categoryCardsContainer: document.getElementById("categoryCardsContainer"),
  categoryPills: document.getElementById("categoryPills"),
  searchInput: document.getElementById("searchInput"),
  clearSearchBtn: document.getElementById("clearSearchBtn"),
  sortSelect: document.getElementById("sortSelect"),
  resetFiltersBtn: document.getElementById("resetFiltersBtn"),
  clearFilterActionBtn: document.getElementById("clearFilterActionBtn"),

  // Cart Drawer
  cartBtn: document.getElementById("cartBtn"),
  cartSidebar: document.getElementById("cartSidebar"),
  cartOverlay: document.getElementById("cartOverlay"),
  closeCartBtn: document.getElementById("closeCartBtn"),
  cartBadge: document.getElementById("cartBadge"),
  cartDrawerCount: document.getElementById("cartDrawerCount"),
  cartItemsList: document.getElementById("cartItemsList"),
  cartSubtotal: document.getElementById("cartSubtotal"),
  cartShipping: document.getElementById("cartShipping"),
  cartGrandTotal: document.getElementById("cartGrandTotal"),
  shippingNote: document.getElementById("shippingNote"),
  continueShoppingBtn: document.getElementById("continueShoppingBtn"),
  checkoutBtn: document.getElementById("checkoutBtn"),

  // Quick View Modal
  productModal: document.getElementById("productModal"),
  closeModalBtn: document.getElementById("closeModalBtn"),
  modalProductDetails: document.getElementById("modalProductDetails"),

  // Checkout Modal
  checkoutModal: document.getElementById("checkoutModal"),
  closeCheckoutBtn: document.getElementById("closeCheckoutBtn"),
  checkoutForm: document.getElementById("checkoutForm"),
  checkoutFormWrapper: document.getElementById("checkoutFormWrapper"),
  checkoutSubmitTotal: document.getElementById("checkoutSubmitTotal"),
  checkoutItemsPreview: document.getElementById("checkoutItemsPreview"),
  coSubtotal: document.getElementById("coSubtotal"),
  coShipping: document.getElementById("coShipping"),
  coTotal: document.getElementById("coTotal"),

  // Confirmation View
  orderSuccessScreen: document.getElementById("orderSuccessScreen"),
  confirmedOrderId: document.getElementById("confirmedOrderId"),
  confirmedCustomerName: document.getElementById("confirmedCustomerName"),
  confirmedOrderTotal: document.getElementById("confirmedOrderTotal"),
  successShopMoreBtn: document.getElementById("successShopMoreBtn"),

  // Mobile Navigation
  menuToggleBtn: document.getElementById("menuToggleBtn"),
  navMenu: document.getElementById("navMenu"),

  // Toast Container & Date
  toastContainer: document.getElementById("toastContainer"),
  currentYear: document.getElementById("currentYear")
};

// ==========================================
// 4. INITIALIZATION
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
  if (DOM.currentYear) {
    DOM.currentYear.textContent = new Date().getFullYear();
  }

  renderCategoryCards();
  renderCategoryPills();
  applyFiltersAndRender();
  updateCartUI();
  setupEventListeners();
});

// ==========================================
// 5. RENDERING FUNCTIONS
// ==========================================

/**
 * Format numeric value to Indian Currency format (₹ XX,XXX)
 */
function formatCurrency(amount) {
  return "₹" + Number(amount).toLocaleString("en-IN", {
    maximumFractionDigits: 2,
    minimumFractionDigits: 0
  });
}

/**
 * Render category showcase cards
 */
function renderCategoryCards() {
  if (!DOM.categoryCardsContainer) return;
  DOM.categoryCardsContainer.innerHTML = CATEGORIES.map(cat => {
    const count = PRODUCTS.filter(p => p.category === cat.name).length;
    return `
      <div class="category-card" onclick="setCategoryFilter('${cat.name}')">
        <div class="cat-icon-wrap">
          <i class="fa-solid ${cat.icon}"></i>
        </div>
        <h3>${cat.name}</h3>
        <span>${count} Items Available</span>
      </div>
    `;
  }).join("");
}

/**
 * Render filter pills for quick tab filtering
 */
function renderCategoryPills() {
  if (!DOM.categoryPills) return;
  const categoriesWithAll = ["All", ...CATEGORIES.map(c => c.name)];
  
  DOM.categoryPills.innerHTML = categoriesWithAll.map(category => `
    <button 
      class="filter-pill ${state.selectedCategory === category ? 'active' : ''}" 
      onclick="setCategoryFilter('${category}')"
    >
      ${category}
    </button>
  `).join("");
}

/**
 * Main filtering and sorting engine
 */
function applyFiltersAndRender() {
  let filtered = PRODUCTS.filter(product => {
    const matchesCategory = 
      state.selectedCategory === "All" || 
      product.category.toLowerCase() === state.selectedCategory.toLowerCase();

    const matchesSearch = 
      product.name.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(state.searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  // Apply sorting
  switch (state.sortBy) {
    case "price-asc":
      filtered.sort((a, b) => a.price - b.price);
      break;
    case "price-desc":
      filtered.sort((a, b) => b.price - a.price);
      break;
    case "rating-desc":
      filtered.sort((a, b) => b.rating - a.rating);
      break;
    default:
      // Featured: default order
      break;
  }

  // Update UI Elements
  renderProducts(filtered);

  if (DOM.resultsCount) {
    DOM.resultsCount.textContent = `Showing ${filtered.length} of ${PRODUCTS.length} products`;
  }

  const isFiltered = state.selectedCategory !== "All" || state.searchQuery.trim() !== "";
  if (DOM.resetFiltersBtn) {
    DOM.resetFiltersBtn.style.display = isFiltered ? "inline-flex" : "none";
  }
}

/**
 * Render product cards inside the shop grid
 */
function renderProducts(products) {
  if (!DOM.productGrid) return;

  if (products.length === 0) {
    DOM.productGrid.style.display = "none";
    DOM.noProductsFound.style.display = "block";
    return;
  }

  DOM.productGrid.style.display = "grid";
  DOM.noProductsFound.style.display = "none";

  DOM.productGrid.innerHTML = products.map(product => {
    const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);

    return `
      <article class="product-card">
        <div class="product-thumb-wrap">
          <img 
            src="${product.image}" 
            alt="${product.name}" 
            class="product-thumb"
            loading="lazy"
            onerror="this.onerror=null; this.src='${IMAGE_FALLBACK}';"
          />
          <span class="discount-tag">${discount}% OFF</span>
          <span class="category-tag">${product.category}</span>
        </div>

        <div class="product-details">
          <div class="product-rating">
            <span class="stars"><i class="fa-solid fa-star"></i> ${product.rating.toFixed(1)}</span>
            <span class="rating-count">(${product.reviewsCount})</span>
          </div>

          <h3 class="product-title" title="${product.name}">${product.name}</h3>

          <div class="price-box">
            <span class="current-price">${formatCurrency(product.price)}</span>
            <span class="original-price">${formatCurrency(product.originalPrice)}</span>
          </div>

          <div class="product-card-actions">
            <button class="btn-card-cart" onclick="addToCart(${product.id}, 1)">
              <i class="fa-solid fa-cart-plus"></i> Add to Cart
            </button>
            <button class="btn-card-quickview" onclick="openProductModal(${product.id})" title="View Details">
              <i class="fa-regular fa-eye"></i>
            </button>
          </div>
        </div>
      </article>
    `;
  }).join("");
}

// ==========================================
// 6. SHOPPING CART LOGIC & PERSISTENCE
// ==========================================

/**
 * Add a product to the cart or increment quantity
 */
function addToCart(productId, quantity = 1) {
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return;

  const existingItem = state.cart.find(item => item.id === productId);

  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    state.cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      category: product.category,
      quantity: quantity
    });
  }

  saveCart();
  updateCartUI();
  showToast(`Added "${product.name.slice(0, 24)}..." to your bag!`, "success");
}

/**
 * Update quantity for an existing cart item
 */
function updateItemQuantity(productId, delta) {
  const item = state.cart.find(i => i.id === productId);
  if (!item) return;

  item.quantity += delta;
  if (item.quantity <= 0) {
    removeFromCart(productId, false);
    return;
  }

  saveCart();
  updateCartUI();
}

/**
 * Remove an item completely from the cart
 */
function removeFromCart(productId, notify = true) {
  const item = state.cart.find(i => i.id === productId);
  state.cart = state.cart.filter(i => i.id !== productId);
  saveCart();
  updateCartUI();

  if (notify && item) {
    showToast(`Removed "${item.name.slice(0, 24)}..." from bag`, "info");
  }
}

/**
 * Persist cart state to LocalStorage
 */
function saveCart() {
  localStorage.setItem("shopease_cart", JSON.stringify(state.cart));
}

/**
 * Calculate totals and refresh all cart indicators across the document
 */
function updateCartUI() {
  const totalItemCount = state.cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = state.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  
  // Free delivery threshold: Orders >= ₹999 get free shipping, else ₹99
  const shipping = subtotal === 0 ? 0 : (subtotal >= 999 ? 0 : 99);
  const grandTotal = subtotal + shipping;

  // Update Badges
  if (DOM.cartBadge) DOM.cartBadge.textContent = totalItemCount;
  if (DOM.cartDrawerCount) DOM.cartDrawerCount.textContent = `${totalItemCount} ${totalItemCount === 1 ? 'item' : 'items'}`;

  // Update Drawer Totals
  if (DOM.cartSubtotal) DOM.cartSubtotal.textContent = formatCurrency(subtotal);
  if (DOM.cartShipping) DOM.cartShipping.textContent = shipping === 0 ? "FREE" : formatCurrency(shipping);
  if (DOM.cartGrandTotal) DOM.cartGrandTotal.textContent = formatCurrency(grandTotal);

  if (DOM.shippingNote) {
    if (subtotal === 0) {
      DOM.shippingNote.textContent = "Free express shipping on orders above ₹999";
    } else if (subtotal >= 999) {
      DOM.shippingNote.textContent = "🎉 Congratulations! You unlocked FREE shipping.";
      DOM.shippingNote.style.color = "#10b981";
    } else {
      const diff = 999 - subtotal;
      DOM.shippingNote.textContent = `Add ${formatCurrency(diff)} more to claim FREE shipping!`;
      DOM.shippingNote.style.color = "var(--accent)";
    }
  }

  // Render Drawer Items List
  if (DOM.cartItemsList) {
    if (state.cart.length === 0) {
      DOM.cartItemsList.innerHTML = `
        <div class="cart-empty-view">
          <i class="fa-solid fa-cart-arrow-down"></i>
          <h4>Your bag is currently empty</h4>
          <p>Explore our trending catalog and discover great savings today.</p>
        </div>
      `;
      if (DOM.checkoutBtn) DOM.checkoutBtn.disabled = true;
    } else {
      if (DOM.checkoutBtn) DOM.checkoutBtn.disabled = false;
      DOM.cartItemsList.innerHTML = state.cart.map(item => `
        <div class="cart-item">
          <img 
            src="${item.image}" 
            alt="${item.name}" 
            class="cart-item-img"
            onerror="this.onerror=null; this.src='${IMAGE_FALLBACK}';"
          />
          <div class="cart-item-info">
            <h4 title="${item.name}">${item.name}</h4>
            <div class="cart-item-price">${formatCurrency(item.price)}</div>
            <div class="cart-qty-ctrl">
              <button class="qty-btn" onclick="updateItemQuantity(${item.id}, -1)" title="Decrease">
                <i class="fa-solid fa-minus"></i>
              </button>
              <span class="qty-val">${item.quantity}</span>
              <button class="qty-btn" onclick="updateItemQuantity(${item.id}, 1)" title="Increase">
                <i class="fa-solid fa-plus"></i>
              </button>
            </div>
          </div>
          <button class="cart-item-remove" onclick="removeFromCart(${item.id})" title="Remove item">
            <i class="fa-regular fa-trash-can"></i>
          </button>
        </div>
      `).join("");
    }
  }
}

// ==========================================
// 7. MODALS & SIDEBAR CONTROLS
// ==========================================

function openCart() {
  DOM.cartSidebar.classList.add("open");
  DOM.cartOverlay.classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeCart() {
  DOM.cartSidebar.classList.remove("open");
  DOM.cartOverlay.classList.remove("active");
  document.body.style.overflow = "";
}

/**
 * Open Quick View Modal with Full Product Details
 */
function openProductModal(productId) {
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return;

  const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);

  DOM.modalProductDetails.innerHTML = `
    <div class="modal-img-wrap">
      <img 
        src="${product.image}" 
        alt="${product.name}" 
        onerror="this.onerror=null; this.src='${IMAGE_FALLBACK}';"
      />
    </div>
    <div class="modal-info-wrap">
      <span class="modal-cat">${product.category}</span>
      <h2>${product.name}</h2>
      
      <div class="product-rating" style="margin-bottom: 12px;">
        <span class="stars"><i class="fa-solid fa-star"></i> ${product.rating.toFixed(1)}</span>
        <span class="rating-count">(${product.reviewsCount} customer reviews)</span>
      </div>

      <div class="price-box" style="margin-bottom: 12px;">
        <span class="current-price" style="font-size: 1.6rem;">${formatCurrency(product.price)}</span>
        <span class="original-price" style="font-size: 1.1rem;">${formatCurrency(product.originalPrice)}</span>
        <span class="discount-tag" style="position: static;">SAVE ${discount}%</span>
      </div>

      <p class="modal-desc">${product.description}</p>

      <div class="modal-qty-row">
        <label for="modalQtyInput">Quantity:</label>
        <div class="cart-qty-ctrl">
          <button class="qty-btn" onclick="adjustModalQty(-1)"><i class="fa-solid fa-minus"></i></button>
          <span class="qty-val" id="modalQtyDisplay">1</span>
          <button class="qty-btn" onclick="adjustModalQty(1)"><i class="fa-solid fa-plus"></i></button>
        </div>
      </div>

      <button class="btn btn-primary btn-block" onclick="addModalItemToCart(${product.id})">
        <i class="fa-solid fa-cart-shopping"></i> Add to Cart
      </button>
    </div>
  `;

  DOM.productModal.classList.add("active");
  document.body.style.overflow = "hidden";
}

let currentModalQty = 1;
function adjustModalQty(delta) {
  currentModalQty = Math.max(1, currentModalQty + delta);
  const display = document.getElementById("modalQtyDisplay");
  if (display) display.textContent = currentModalQty;
}

function addModalItemToCart(productId) {
  addToCart(productId, currentModalQty);
  currentModalQty = 1;
  closeProductModal();
  openCart();
}

function closeProductModal() {
  DOM.productModal.classList.remove("active");
  document.body.style.overflow = "";
  currentModalQty = 1;
}

// ==========================================
// 8. CHECKOUT PROCESS & FORM VALIDATION
// ==========================================

function openCheckoutModal() {
  if (state.cart.length === 0) {
    showToast("Your cart is empty! Add items before proceeding.", "warning");
    return;
  }

  closeCart();

  // Reset to form view if previously shown success view
  DOM.checkoutFormWrapper.style.display = "block";
  DOM.orderSuccessScreen.style.display = "none";
  DOM.checkoutForm.reset();
  clearFormErrors();

  const subtotal = state.cart.reduce((s, i) => s + (i.price * i.quantity), 0);
  const shipping = subtotal >= 999 ? 0 : 99;
  const total = subtotal + shipping;

  // Render Checkout Breakdown
  DOM.coSubtotal.textContent = formatCurrency(subtotal);
  DOM.coShipping.textContent = shipping === 0 ? "FREE" : formatCurrency(shipping);
  DOM.coTotal.textContent = formatCurrency(total);
  DOM.checkoutSubmitTotal.textContent = formatCurrency(total);

  // Render Items Summary inside Checkout
  DOM.checkoutItemsPreview.innerHTML = state.cart.map(item => `
    <div class="checkout-item-row">
      <span class="co-item-name">${item.name} × ${item.quantity}</span>
      <strong>${formatCurrency(item.price * item.quantity)}</strong>
    </div>
  `).join("");

  DOM.checkoutModal.classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeCheckoutModal() {
  DOM.checkoutModal.classList.remove("active");
  document.body.style.overflow = "";
}

function clearFormErrors() {
  document.querySelectorAll(".error-msg").forEach(el => el.textContent = "");
}

/**
 * Handle checkout submission with full frontend field validation
 */
function handleCheckoutSubmit(e) {
  e.preventDefault();
  clearFormErrors();

  const name = document.getElementById("custName").value.trim();
  const email = document.getElementById("custEmail").value.trim();
  const phone = document.getElementById("custPhone").value.trim();
  const address = document.getElementById("custAddress").value.trim();
  const city = document.getElementById("custCity").value.trim();
  const pincode = document.getElementById("custPincode").value.trim();

  let isValid = true;

  if (name.length < 3) {
    document.getElementById("nameError").textContent = "Please enter your full name (minimum 3 characters).";
    isValid = false;
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    document.getElementById("emailError").textContent = "Please provide a valid email address.";
    isValid = false;
  }

  const phonePattern = /^[6-9]\d{9}$/;
  if (!phonePattern.test(phone.replace(/\D/g, ''))) {
    document.getElementById("phoneError").textContent = "Please enter a valid 10-digit Indian phone number.";
    isValid = false;
  }

  if (address.length < 8) {
    document.getElementById("addressError").textContent = "Please provide a complete street address.";
    isValid = false;
  }

  if (city.length < 2) {
    document.getElementById("cityError").textContent = "Please provide your city name.";
    isValid = false;
  }

  const pinPattern = /^\d{6}$/;
  if (!pinPattern.test(pincode)) {
    document.getElementById("pincodeError").textContent = "Please enter a valid 6-digit PIN code.";
    isValid = false;
  }

  if (!isValid) return;

  // Calculate simulated receipt details
  const subtotal = state.cart.reduce((s, i) => s + (i.price * i.quantity), 0);
  const shipping = subtotal >= 999 ? 0 : 99;
  const grandTotal = subtotal + shipping;

  // Generate an authentic looking simulated order number
  const simulatedOrderId = `#SE-${Math.floor(100000 + Math.random() * 900000)}`;

  DOM.confirmedOrderId.textContent = simulatedOrderId;
  DOM.confirmedCustomerName.textContent = name;
  DOM.confirmedOrderTotal.textContent = formatCurrency(grandTotal);

  // Switch to confirmation view
  DOM.checkoutFormWrapper.style.display = "none";
  DOM.orderSuccessScreen.style.display = "block";

  // Clear cart and storage
  state.cart = [];
  saveCart();
  updateCartUI();

  showToast("Order placed successfully!", "success");
}

// ==========================================
// 9. TOAST NOTIFICATION ENGINE
// ==========================================

function showToast(message, type = "info") {
  if (!DOM.toastContainer) return;

  const icons = {
    success: "fa-circle-check",
    info: "fa-circle-info",
    warning: "fa-triangle-exclamation",
    error: "fa-circle-xmark"
  };

  const toast = document.createElement("div");
  toast.className = `toast ${type}`;
  toast.innerHTML = `
    <i class="fa-solid ${icons[type] || 'fa-bell'}"></i>
    <span>${message}</span>
  `;

  DOM.toastContainer.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateY(20px)";
    toast.style.transition = "all 0.3s ease";
    setTimeout(() => toast.remove(), 300);
  }, 3200);
}

// ==========================================
// 10. FILTER & SEARCH HANDLERS
// ==========================================

function setCategoryFilter(category) {
  state.selectedCategory = category;
  renderCategoryPills();
  applyFiltersAndRender();

  // Smooth scroll down to products view if user clicked from the top category cards
  const productsSection = document.getElementById("products");
  if (productsSection) {
    productsSection.scrollIntoView({ behavior: "smooth" });
  }
}

function handleSearchInput(e) {
  state.searchQuery = e.target.value;
  DOM.clearSearchBtn.style.display = state.searchQuery.length > 0 ? "block" : "none";
  applyFiltersAndRender();
}

function clearSearch() {
  state.searchQuery = "";
  DOM.searchInput.value = "";
  DOM.clearSearchBtn.style.display = "none";
  applyFiltersAndRender();
  DOM.searchInput.focus();
}

function resetAllFilters() {
  state.selectedCategory = "All";
  state.searchQuery = "";
  state.sortBy = "featured";
  if (DOM.searchInput) DOM.searchInput.value = "";
  if (DOM.clearSearchBtn) DOM.clearSearchBtn.style.display = "none";
  if (DOM.sortSelect) DOM.sortSelect.value = "featured";
  renderCategoryPills();
  applyFiltersAndRender();
}

// ==========================================
// 11. EVENT LISTENERS SETUP
// ==========================================

function setupEventListeners() {
  // Search
  DOM.searchInput.addEventListener("input", handleSearchInput);
  DOM.clearSearchBtn.addEventListener("click", clearSearch);

  // Sorting
  DOM.sortSelect.addEventListener("change", (e) => {
    state.sortBy = e.target.value;
    applyFiltersAndRender();
  });

  // Filter Reset buttons
  DOM.resetFiltersBtn.addEventListener("click", resetAllFilters);
  DOM.clearFilterActionBtn.addEventListener("click", resetAllFilters);

  // Cart Drawer
  DOM.cartBtn.addEventListener("click", openCart);
  DOM.closeCartBtn.addEventListener("click", closeCart);
  DOM.cartOverlay.addEventListener("click", closeCart);
  DOM.continueShoppingBtn.addEventListener("click", closeCart);

  // Checkout Open/Close
  DOM.checkoutBtn.addEventListener("click", openCheckoutModal);
  DOM.closeCheckoutBtn.addEventListener("click", closeCheckoutModal);
  DOM.checkoutForm.addEventListener("submit", handleCheckoutSubmit);
  DOM.successShopMoreBtn.addEventListener("click", () => {
    closeCheckoutModal();
    const productsSection = document.getElementById("products");
    if (productsSection) productsSection.scrollIntoView({ behavior: "smooth" });
  });

  // Modal quick-view close
  DOM.closeModalBtn.addEventListener("click", closeProductModal);
  DOM.productModal.addEventListener("click", (e) => {
    if (e.target === DOM.productModal) closeProductModal();
  });
  DOM.checkoutModal.addEventListener("click", (e) => {
    if (e.target === DOM.checkoutModal) closeCheckoutModal();
  });

  // Mobile Menu Toggle
  DOM.menuToggleBtn.addEventListener("click", () => {
    DOM.navMenu.classList.toggle("open");
  });

  // Close mobile nav when clicking any nav link
  document.querySelectorAll(".nav-link").forEach(link => {
    link.addEventListener("click", () => {
      DOM.navMenu.classList.remove("open");
      document.querySelectorAll(".nav-link").forEach(l => l.classList.remove("active"));
      link.classList.add("active");
    });
  });

  // Keyboard accessibility: ESC key closes open modals and drawer
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeCart();
      closeProductModal();
      closeCheckoutModal();
    }
  });
}