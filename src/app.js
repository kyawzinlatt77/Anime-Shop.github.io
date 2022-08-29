
// search start

const searchInput = document.querySelector("#search-input");

const allSerieNameCollection = document.querySelectorAll(".shop-item");

searchInput.addEventListener("keyup", (event) => {
  const searchQuery = event.target.value.toLowerCase();

  for (let i = 0; i < allSerieNameCollection.length; i++) {
    const currenSerie = allSerieNameCollection[i].textContent.toLowerCase();
    if (currenSerie.includes(searchQuery)) {
      allSerieNameCollection[i].style.display = "block";
    } else {
      allSerieNameCollection[i].style.display = "none";
    }
  }
});

// search end

// sidebar start

function Open() {
  document.querySelector(".sidebar").classList.toggle("left-[-500px]");
}

// sidebar end

// add to cart start

if (document.readyState == "loading") {
  window.addEventListener("DOMContentLoaded", initUI);
} else {
  initUI();
}
function initUI() {
  var addToCartButtons = document.querySelectorAll(".shop-item-button");
  addToCartButtons.forEach((button) => {
    button.addEventListener("click", handleAddToCart);
  });

  function handleAddToCart(event) {
    const shopItem = event.target.closest(".shop-item");
    const title = shopItem.querySelector(".shop-item-title").textContent;
    const price = shopItem.querySelector(".shop-item-price").textContent;
    const img = shopItem.querySelector(".shop-item-image").src;
    addItemToCartUI(title, price, img);
  }
}

function addItemToCartUI(title, price, img) {
  const cartItems = document.querySelector(".cart-items");
  const cartRow = document.createElement("div");
  cartRow.classList.add("cart-row");
  const cartItemNames = document.querySelectorAll(".cart-item-title");
  for (let i = 0; i < cartItemNames.length; i++) {
    if (cartItemNames[i].innerText == title) {
      alert("Item already added");
      return;
    }
  }
  const cartRowContent = `
                            <div class='cart-item shadow-lg border p-5 m-5 flex justify-between items-center'>
                              <img
                              class='cart-img rounded-[50%] w-36'
                              src=${img}
                              alt=''
                              />
                              <div class=''>
                              <p class='cart-item-title text-2xl font-bold pr-4'>${title}</p>
                              <p class='cart-price text-gray-500 text-lg'>${price}</p>
                              </div>
                              <input class='cart-quantity-input w-16 border' type='number' min='1' value='0' />
                              <button class='cart-remove'><i class='fa-solid fa-trash-can fa-xl items-center pl-2'></i></button>
                            </div>`;

  cartRow.innerHTML = cartRowContent;
  cartItems.appendChild(cartRow);
  cartRow.querySelector(".cart-remove").addEventListener("click", removeItem);
  cartRow
    .querySelector(".cart-quantity-input")
    .addEventListener("change", handleQuantityChange);
}

function handleQuantityChange(event) {
  const input = event.target;
  if (input.value < 1) {
    input.value = 1;
  }
  updateCartTotal();
}

function removeItem(event) {
  const removeConfirm = confirm("Are you sure to remove?");
  if (removeConfirm) {
    const btnClicked = event.target;
    btnClicked.closest(".cart-row").remove();
    updateCartTotal();
  }
}
function updateCartTotal() {
  const cartItemsContainer = document.querySelector(".cart-items");
  const cartRows = cartItemsContainer.querySelectorAll(".cart-row");
  let total = 0;
  cartRows.forEach((row) => {
    const priceEl = row.querySelector(".cart-price");
    const quantityInput = row.querySelector(".cart-quantity-input");
    const price = parseFloat(priceEl.textContent);
    const quantity = quantityInput.value;

    total = total + price * quantity;
  });
  document.querySelector(".cart-total-price").textContent = total.toFixed(2);
}

// add to cart end
