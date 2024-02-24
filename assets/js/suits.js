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


// Function to filter products based on price range
function filterProductsByPrice() {
    // Get the minimum and maximum price values from the input fields
    var minPrice = parseInt(document.querySelector('.input-min').value);
    var maxPrice = parseInt(document.querySelector('.input-max').value);
  
    // Get all product items
    var productItems = document.querySelectorAll('.suits-item');
  
    // Variable to keep track if any item matches the price range
    var itemsFound = false;
  
    // Loop through each product item
    productItems.forEach(function(item) {
        // Get the price of the current product item
        var price = parseInt(item.querySelector('.shop-card.product').getAttribute('data-price'));
  
        // If the price falls within the selected range, display the product
        if (price >= minPrice && price <= maxPrice) {
            item.style.display = 'block';
            itemsFound = true;
        } else {
            // Otherwise, check if the price is almost near to the selected range
            if (price >= minPrice - 50 && price <= maxPrice + 50) {
                item.style.display = 'block';
                itemsFound = true;
            } else {
                // Hide the product
                item.style.display = 'none';
            }
        }
    });
  
    // If no items were found, display a message or handle the case as needed
    if (!itemsFound) {
      // For example, you can display a message:
      // alert('No items found within the selected price range.');
      // Or show a placeholder
      // document.getElementById('products').innerHTML = '<p>No items found within the selected price range.</p>';
    }
  }
  
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
