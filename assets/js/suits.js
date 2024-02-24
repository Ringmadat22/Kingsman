function filterProducts() {
    var select = document.getElementById("sort-select");
    var selectedOption = select.options[select.selectedIndex].value;

    var products = document.querySelectorAll('.suits-item');

    var sortedProducts = Array.from(products).sort(function(a, b) {
        var priceA = parseFloat(a.querySelector('.span').textContent.replace('$', ''));
        var priceB = parseFloat(b.querySelector('.span').textContent.replace('$', ''));

        if (selectedOption === "highest") {
            return priceB - priceA;
        } else if (selectedOption === "lowest") {
            return priceA - priceB;
        } else {
            // Do nothing for other options or handle as needed
            return 0;
        }
    });

    // Clear the current product list
    var productList = document.getElementById('products');
    productList.innerHTML = '';

    // Append sorted products to the product list
    sortedProducts.forEach(function(product) {
        productList.appendChild(product);
    });
}



//PRICE FILTER


// JavaScript code for filtering items based on price range
document.addEventListener("DOMContentLoaded", function() {
    const minInput = document.querySelector(".input-min");
    const maxInput = document.querySelector(".input-max");
    const items = document.querySelectorAll(".suits-item");

    function filterItems() {
      const minPrice = parseFloat(minInput.value);
      const maxPrice = parseFloat(maxInput.value);
      
      items.forEach(item => {
        const itemPrice = parseFloat(item.querySelector(".price .span").textContent.slice(1));
        if (itemPrice >= minPrice && itemPrice <= maxPrice) {
          item.style.display = "block";
        } else {
          item.style.display = "none";
        }
      });
    }

    // Initial filter
    filterItems();

    // Event listeners for input changes
    minInput.addEventListener("input", filterItems);
    maxInput.addEventListener("input", filterItems);
  });
  
  // Add event listeners to input fields for price filtering
  document.querySelector('.input-min').addEventListener('input', filterProductsByPrice);
  document.querySelector('.input-max').addEventListener('input', filterProductsByPrice);
  
  // Call the filter function initially to ensure items are filtered on page load if needed
  filterProductsByPrice();
  


// COLOR FILTER
 document.addEventListener("DOMContentLoaded", function() {
        const checkboxes = document.querySelectorAll('.material-checkbox input[type="checkbox"]');
        const items = document.querySelectorAll('.suits-item');

        checkboxes.forEach(function(checkbox) {
            checkbox.addEventListener('change', filterItems);
        });

        function filterItems() {
            checkboxes.forEach(function(chk) {
                const checked = chk.checked;
                const color = chk.dataset.color;
                items.forEach(function(item) {
                    const itemColor = item.dataset.color;
                    if (!checked || itemColor === color) {
                        item.classList.remove('hidden');
                    } else {
                        item.classList.add('hidden');
                    }
                });
            });
        }
    });
