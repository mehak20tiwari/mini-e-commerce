document.addEventListener('DOMContentLoaded', function () {
  // VANTA Background
  VANTA.FOG({
    el: "#vanta-bg",
    mouseControls: true,
    touchControls: true,
    gyroControls: false,
    minHeight: 200.00,
    minWidth: 200.00,
    highlightColor: 0xebc7e8,
    midtoneColor: 0xebb2cf,
    lowlightColor: 0xf099f0,
    baseColor: 0xfcfcfc
  });

  // Cart logic
  let cart = [];
  const cartBtn = document.getElementById("cart-btn");
  const cartCountEl = document.getElementById("cart-count");
  const cartModal = document.getElementById("cart-modal");
  const closeCartBtn = document.getElementById("close-cart");
  const cartItemsEl = document.getElementById("cart-items");
  const totalPriceEl = document.getElementById("total-price");

  // Debug: Check if elements exist
  console.log("Cart button:", cartBtn);
  console.log("Close button:", closeCartBtn);
  console.log("Cart modal:", cartModal);

  const addToCartButtons = document.querySelectorAll(".add-to-cart");
  addToCartButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const productCard = btn.parentElement;
      const name = productCard.querySelector("h2").textContent;
      const price = parseInt(productCard.querySelector("p").textContent.replace("₹", ""));
      cart.push({ name, price });
      updateCartCount();
      
      // Visual feedback
      btn.textContent = "Added!";
      setTimeout(() => {
        btn.textContent = "Add to Cart";
      }, 1000);
    });
  });

  function updateCartCount() {
    cartCountEl.textContent = cart.length;
  }

  function updateCartModal() {
    cartItemsEl.innerHTML = "";
    let total = 0;

    if (cart.length === 0) {
      cartItemsEl.innerHTML = "<li style='text-align: center; color: #666;'>Your cart is empty</li>";
    } else {
      cart.forEach((item, index) => {
        const li = document.createElement("li");
        li.innerHTML = `
          <span>${item.name} - ₹${item.price}</span>
          <span class="remove-item" data-index="${index}">❌</span>
        `;
        cartItemsEl.appendChild(li);
        total += item.price;
      });
    }

    totalPriceEl.textContent = total;

    // Add remove listeners
    document.querySelectorAll(".remove-item").forEach(btn => {
      btn.addEventListener("click", () => {
        const index = parseInt(btn.getAttribute("data-index"));
        cart.splice(index, 1);
        updateCartCount();
        updateCartModal();
      });
    });
  }

  // Cart button click - open modal
  cartBtn.addEventListener("click", () => {
    console.log("Cart button clicked");
    updateCartModal();
    cartModal.classList.remove("hidden");
  });

  // Close button click - close modal
  closeCartBtn.addEventListener("click", (e) => {
    console.log("Close button clicked");
    e.preventDefault();
    e.stopPropagation();
    cartModal.classList.add("hidden");
  });

  // Click outside modal to close
  cartModal.addEventListener("click", (e) => {
    if (e.target === cartModal) {
      cartModal.classList.add("hidden");
    }
  });

  // Escape key to close modal
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !cartModal.classList.contains("hidden")) {
      cartModal.classList.add("hidden");
    }
  });
});