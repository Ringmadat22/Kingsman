'use strict';



/**
 * add event on element
 */

const addEventOnElem = function (elem, type, callback) {
  if (elem.length > 1) {
    for (let i = 0; i < elem.length; i++) {
      elem[i].addEventListener(type, callback);
    }
  } else {
    elem.addEventListener(type, callback);
  }
}



/**
 * navbar toggle
 */

const navTogglers = document.querySelectorAll("[data-nav-toggler]");
const navbar = document.querySelector("[data-navbar]");
const navbarLinks = document.querySelectorAll("[data-nav-link]");
const overlay = document.querySelector("[data-overlay]");

const toggleNavbar = function () {
  navbar.classList.toggle("active");
  overlay.classList.toggle("active");
}

addEventOnElem(navTogglers, "click", toggleNavbar);

const closeNavbar = function () {
  navbar.classList.remove("active");
  overlay.classList.remove("active");
}

addEventOnElem(navbarLinks, "click", closeNavbar);



/**
 * header sticky & back top btn active
 */

const header = document.querySelector("[data-header]");
const backTopBtn = document.querySelector("[data-back-top-btn]");

const headerActive = function () {
  if (window.scrollY > 150) {
    header.classList.add("active");
    backTopBtn.classList.add("active");
  } else {
    header.classList.remove("active");
    backTopBtn.classList.remove("active");
  }
}

addEventOnElem(window, "scroll", headerActive);

let lastScrolledPos = 0;

const headerSticky = function () {
  if (lastScrolledPos >= window.scrollY) {
    header.classList.remove("header-hide");
  } else {
    header.classList.add("header-hide");
  }

  lastScrolledPos = window.scrollY;
}

addEventOnElem(window, "scroll", headerSticky);



/**
 * scroll reveal effect
 */

const sections = document.querySelectorAll("[data-section]");

const scrollReveal = function () {
  for (let i = 0; i < sections.length; i++) {
    if (sections[i].getBoundingClientRect().top < window.innerHeight / 2) {
      sections[i].classList.add("active");
    }
  }
}

scrollReveal();

addEventOnElem(window, "scroll", scrollReveal);

const rangeInput = document.querySelectorAll(".range-input input"),
priceInput = document.querySelectorAll(".price-input input"),
range = document.querySelector(".slider .progress");
let priceGap = 1000;
priceInput.forEach(input =>{
    input.addEventListener("input", e =>{
        let minPrice = parseInt(priceInput[0].value),
        maxPrice = parseInt(priceInput[1].value);
        
        if((maxPrice - minPrice >= priceGap) && maxPrice <= rangeInput[1].max){
            if(e.target.className === "input-min"){
                rangeInput[0].value = minPrice;
                range.style.left = ((minPrice / rangeInput[0].max) * 100) + "%";
            }else{
                rangeInput[1].value = maxPrice;
                range.style.right = 100 - (maxPrice / rangeInput[1].max) * 100 + "%";
            }
        }
    });
});
rangeInput.forEach(input =>{
    input.addEventListener("input", e =>{
        let minVal = parseInt(rangeInput[0].value),
        maxVal = parseInt(rangeInput[1].value);
        if((maxVal - minVal) < priceGap){
            if(e.target.className === "range-min"){
                rangeInput[0].value = maxVal - priceGap
            }else{
                rangeInput[1].value = minVal + priceGap;
            }
        }else{
            priceInput[0].value = minVal;
            priceInput[1].value = maxVal;
            range.style.left = ((minVal / rangeInput[0].max) * 100) + "%";
            range.style.right = 100 - (maxVal / rangeInput[1].max) * 100 + "%";
        }
    });
});

// Get the search input element and the list of items
const searchInput = document.getElementById('search');
const searchInput2 = document.getElementById('search');
const itemList = document.getElementById('item-list');
const itemList2 = document.getElementById('items-list');

// Add an event listener to the search input for real-time filtering
searchInput.addEventListener('input', filterItems);

function filterItems() {
    const searchQuery = searchInput.value.toLowerCase();
    const items = itemList.getElementsByTagName('li');

    for (const item of items) {
        const itemText = item.textContent.toLowerCase();
        if (itemText.includes(searchQuery)) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    }
}
function sortProducts() {
  var selectElement = document.getElementById("sort-select");
  var selectedValue = selectElement.value;
  var productList = document.getElementById("product-list");
  var items = Array.from(productList.children);

  // Sort the items based on the selected option
  if (selectedValue === "highest") {
      items.sort((a, b) => {
          var priceA = parseFloat(a.querySelector(".span").textContent.replace("$", ""));
          var priceB = parseFloat(b.querySelector(".span").textContent.replace("$", ""));
          return priceB - priceA;
      });
  } else if (selectedValue === "lowest") {
      items.sort((a, b) => {
          var priceA = parseFloat(a.querySelector(".span").textContent.replace("$", ""));
          var priceB = parseFloat(b.querySelector(".span").textContent.replace("$", ""));
          return priceA - priceB;
      });
  }

  // Remove existing items from the list
  while (productList.firstChild) {
      productList.removeChild(productList.firstChild);
  }

  // Append sorted items back to the list
  items.forEach(item => {
      productList.appendChild(item);
  });
}
// Function to filter products based on price range
function filterProductsByPrice() {
  // Get the minimum and maximum price values from the input fields
  var minPrice = parseInt(document.querySelector('.input-min').value);
  var maxPrice = parseInt(document.querySelector('.input-max').value);

  // Get all product items
  var productItems = document.querySelectorAll('.scrollbar-item');

  // Loop through each product item
  productItems.forEach(function(item) {
      // Get the price of the current product item
      var price = parseInt(item.querySelector('.product').getAttribute('data-price'));

      // If the price falls within the selected range, display the product
      if (price >= minPrice && price <= maxPrice) {
          item.style.display = 'block';
      } else {
          // Otherwise, hide the product
          item.style.display = 'none';
      }
  });
}

// Add event listeners to input fields and range inputs for price filtering
document.querySelector('.input-min').addEventListener('input', filterProductsByPrice);
document.querySelector('.input-max').addEventListener('input', filterProductsByPrice);


document.addEventListener("DOMContentLoaded", function() {
  // Get all checkboxes
  var checkboxes = document.querySelectorAll('.material-checkbox input[type="checkbox"]');

  checkboxes.forEach(function(checkbox) {
      // Add event listener to each checkbox
      checkbox.addEventListener("change", function() {
          // Get the color value of the checkbox
          var color = checkbox.parentNode.textContent.trim();

          // Get all product items
          var productItems = document.querySelectorAll('.scrollbar-item');

          // Loop through each product item
          productItems.forEach(function(item) {
              var productColor = item.querySelector('.shop-card.product').dataset.color;

              // Check if the product item matches the selected color
              if (color === productColor || color === "Select Color") {
                  // Show the product item
                  item.style.display = "block";
              } else {
                  // Hide the product item
                  item.style.display = "none";
              }
          });
      });
  });
});
