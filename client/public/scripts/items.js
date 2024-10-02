// client/public/scripts/items.js

document.addEventListener('DOMContentLoaded', () => {
  const mainContent = document.getElementById('main-content');

  // Function to render all items or filtered search results
  const renderitems = async (searchTerm = '') => {
    try {
      // Fetch items with or without a search term using relative URL
      let url = '/api/items';
      if (searchTerm) {
        url += `?search=${encodeURIComponent(searchTerm)}`;
      }

      const response = await fetch(url);

      // Debugging: Log the response before parsing
      console.log('Raw response:', response);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      // Parse the response as JSON
      const data = await response.json();
      console.log('Parsed data:', data);

      mainContent.innerHTML = ''; // Clear any existing content

      if (Array.isArray(data)) { // Check if data is an array
        data.map(item => {
          const card = document.createElement('div');
          card.classList.add('card');

          const topContainer = document.createElement('div');
          topContainer.classList.add('top-container');
          topContainer.style.backgroundImage = `url(${item.image})`;

          const bottomContainer = document.createElement('div');
          bottomContainer.classList.add('bottom-container');

          const name = document.createElement('h3');
          name.textContent = item.title; // Ensure title exists in your database
          bottomContainer.appendChild(name);

          const category = document.createElement('p');
          category.textContent = 'Category: ' + item.category; // Assuming category is a field in your database
          bottomContainer.appendChild(category);

          const link = document.createElement('a');
          link.textContent = 'Read More >';
          link.setAttribute('role', 'button');
          link.href = `/items/${item.id}`; // Assuming each item has a unique ID
          bottomContainer.appendChild(link);

          card.appendChild(topContainer);
          card.appendChild(bottomContainer);
          mainContent.appendChild(card);
        });
      } else {
        // If data is not an array, show an error
        console.error('Data fetched is not an array:', data);
        const message = document.createElement('h2');
        message.textContent = 'No items Available 😞';
        mainContent.appendChild(message);
      }
    } catch (error) {
      console.error('Error fetching items:', error);
    }
  };

  // Add event listener for the search button
  document.getElementById('search-button').addEventListener('click', () => {
    const searchTerm = document.getElementById('search-input').value.trim();
    console.log('Search term:', searchTerm); // Debugging to see the search term
    renderitems(searchTerm); // Call renderitems with the search term
  });

  // Render items on page load
  renderitems();
});
