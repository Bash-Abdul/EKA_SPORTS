let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

    // function updateCartCount() {
    //   const cartCount = cart.reduce(
    //     (count, item) => count + item.quantity,
    //     0
    //   );
    //   document.querySelector(".cart_count").innerText = cartCount;
    // }

    // function updateFavoritesCount() {
    //   const heartCount = favorites.length;
    //   document.querySelector(".heart_count").innerText = heartCount;
    // }

    // function addToCart(product) {
    //   const cartItem = cart.find((ci) => ci.name === product.name);
    //   if (cartItem) {
    //     cartItem.quantity++;
    //   } else {
    //     cart.push({ ...product, quantity: 1 });
    //   }
    //   localStorage.setItem("cart", JSON.stringify(cart));
    //   updateCartCount();
    // }

    // function addToFavorites(product) {
    //   if (!favorites.some(fav => fav.id === product.id)) {
    //     favorites.push(product);
    //     localStorage.setItem("favorites", JSON.stringify(favorites));
    //     updateFavoritesCount();
    //     alert(`Added ${product.title} to favorites!`);
    //     document.querySelector(`.heart_2[data-id="${product.id}"]`).classList.add("active");
    //   } else {
    //     alert(`${product.title} is already in favorites!`);
    //   }
    // }

    function paginate(items, itemsPerPage, paginationContainer) {
      let currentPage = 1;
      const totalPages = Math.ceil(items.length / itemsPerPage);

      function showItems(page) {
        const startIndex = (page - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const pageItems = items.slice(startIndex, endIndex);

        let product_container = document.querySelector(".product_container");
        let display = "";

        pageItems.forEach((product) => {
          display += `
              <div class="product_items">
                <div class="product_banner">
                  <img src=${product.img} alt="">
                  <i class='bx bx-heart heart heart_2' data-id="${product.id
            }"                   onclick='addToFavorites(${JSON.stringify(product)})'></i>
                </div>
                <div class="product_content">
                  <p class="product_category">${product.category}</p>
                  <h1 class="product_title">${product.title}</h1>
                  <div class="content_low">
                    <div class="price_div">
                      <p class="new_price">$${product.new_price}</p>
                      <p class="old_price">$${product.old_price}</p>
                    </div>
                    <i class='bx bx-cart-alt cart' onclick='addToCart(${JSON.stringify(product)})'></i>
                  </div>
                </div>
              </div>
            `;
        });

        product_container.innerHTML = display;

        // Highlight the favorites on page load
        favorites.forEach(fav => {
          const heartIcon = document.querySelector(`.heart_2[data-id="${fav.id}"]`);
          if (heartIcon) {
            heartIcon.classList.add("active");
          }
        });
      }

      function showPagination() {
        let pagination = "";

        for (let i = 1; i <= totalPages; i++) {
          pagination += `<a href="#" class="page" data-page="${i}">${i}</a>`;
        }

        paginationContainer.innerHTML = pagination;

        paginationContainer.addEventListener("click", (e) => {
          if (e.target.classList.contains("page")) {
            const page = parseInt(e.target.getAttribute("data-page"));
            showItems(page);
          }
        });
      }

      showItems(currentPage);
      showPagination();
    }

    document.addEventListener("DOMContentLoaded", () => {
      fetch("product.json")
        .then((response) => response.json())
        .then((data) => {
          const itemsPerPage = 10;
          const paginationContainer = document.getElementById("pagination");
          paginate(data, itemsPerPage, paginationContainer);
        });

      updateCartCount();
      updateFavoritesCount();
    });
