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


function sortProducts() {
  var selectBox = document.getElementById("sort-select");
  var selectedValue = selectBox.options[selectBox.selectedIndex].value;
  var productsContainer = document.getElementById("products");
  var productItems = Array.from(productsContainer.getElementsByClassName("scrollbar-item"));

  if (selectedValue === "highest") {
      productItems.sort(function(a, b) {
          return b.querySelector('.product').dataset.price - a.querySelector('.product').dataset.price;
      });
  } else if (selectedValue === "lowest") {
      productItems.sort(function(a, b) {
          return a.querySelector('.product').dataset.price - b.querySelector('.product').dataset.price;
      });
  }

  // Append sorted products back into the container
  productItems.forEach(function(item) {
      productsContainer.appendChild(item);
  });
}


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

function filterColor(color) {
  var items = document.getElementsByClassName("suits-item");
  if (color == "all") {
    for (var i = 0; i < items.length; i++) {
      showItem(items[i]);
    }
  } else {
    for (var i = 0; i < items.length; i++) {
      if (items[i].getAttribute("data-color") === color) {
        showItem(items[i]);
      } else {
        hideItem(items[i]);
      }
    }
  }
}

// Function to hide an item
function hideItem(item) {
  item.style.display = "none";
}

// Function to show an item
function showItem(item) {
  item.style.display = "block";
}

// Add active class to the current button (highlight it)
var colorFilterContainer = document.getElementById("myColorFilterContainer");
var colorBtns = colorFilterContainer.getElementsByClassName("color-btn");
for (var i = 0; i < colorBtns.length; i++) {
  colorBtns[i].addEventListener("click", function(){
    var current = colorFilterContainer.getElementsByClassName("active");
    current[0].className = current[0].className.replace(" active", "");
    this.className += " active";
  });
}

// MATERIAL TYPE 


// Function to filter items by material
function filterMaterial(material) {
  var items = document.getElementsByClassName("suits-item");
  for (var i = 0; i < items.length; i++) {
    if (material === "all" || items[i].getAttribute("data-material") === material) {
      showItem(items[i]);
    } else {
      hideItem(items[i]);
    }
  }
}

// Function to hide an item
function hideItem(item) {
  item.style.display = "none";
}

// Function to show an item
function showItem(item) {
  item.style.display = "block";
}




// SIZE FILTER
function filterSize(c) {
  var items = document.getElementsByClassName('suits-item');
  for (var i = 0; i < items.length; i++) {
    var item = items[i];
    var dataSize = item.getAttribute('data-size');
    if (c === 'all' || dataSize === c) {
      item.style.display = '';
    } else {
      item.style.display = 'none';
    }
  }
}
