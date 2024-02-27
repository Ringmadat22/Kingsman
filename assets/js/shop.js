
  function filterItems(category) {
    const items = document.querySelectorAll('.shop-item');
    
    items.forEach(item => {
      const itemType = item.getAttribute('data-type');
      if (category === 'all' || itemType === category) {
        item.style.display = 'block';
      } else {
        item.style.display = 'none';
      }
    });
  }

