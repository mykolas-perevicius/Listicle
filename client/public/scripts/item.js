// client/public/scripts/item.js

document.addEventListener('DOMContentLoaded', () => {
  const renderItem = async () => {
    // Get the item ID from the URL (e.g., /items/1)
    const pathParts = window.location.pathname.split('/');
    const itemId = pathParts[pathParts.length - 1];

    console.log('Path parts:', pathParts);
    console.log('Extracted itemId:', itemId);
    console.log('Item ID:', itemId); // Debugging

    try {
      // Fetch the item data from the backend
      console.log(window.location.pathname) 
      const fetchURL = `/api/items/${itemId}`; // Using relative URL due to Vite proxy
      console.log('Fetch URL:', fetchURL); // Debugging

      const response = await fetch(fetchURL);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const item = await response.json();
      console.log('Fetched item:', item); // Debugging

      if (item && item.id) { // Ensure item has expected properties
        document.getElementById('image').src = `/public/${item.image}`;
        document.getElementById('name').textContent = item.title;
        document.getElementById('submittedBy').textContent = 'Submitted by: ' + item.submittedBy;
        document.getElementById('submittedOn').textContent = 'Submitted on: ' + new Date(item.submittedOn).toLocaleDateString();
        document.getElementById('description').textContent = item.description;
        document.getElementById('category').textContent = 'Category: ' + item.category;

        // Set the page title to the item's name
        document.title = `Listicle - ${item.title}`;
      } else {
        // If no item found, display a message
        const itemContent = document.getElementById('item-content');
        const message = document.createElement('h2');
        message.textContent = 'No item found 😞';
        itemContent.appendChild(message);
      }
    } catch (error) {
      console.error('Error fetching item:', error);
      // Optionally, display an error message to the user
      const itemContent = document.getElementById('item-content');
      const message = document.createElement('h2');
      message.textContent = 'Failed to load item. Please try again later.';
      itemContent.appendChild(message);
    }
  };

  // Render the item on page load
  renderItem();
});
