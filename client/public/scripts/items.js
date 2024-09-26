const renderitems = async () => {
    const response = await fetch('/items');
    const data = await response.json();
  
    const mainContent = document.getElementById('main-content');
    mainContent.innerHTML = ''; // Clear any existing content
  
    if (data) {
      data.map(item => {
        const card = document.createElement('div');
        card.classList.add('card');
  
        const topContainer = document.createElement('div');
        topContainer.classList.add('top-container');
        topContainer.style.backgroundImage = `url(${item.image})`;
  
        const bottomContainer = document.createElement('div');
        bottomContainer.classList.add('bottom-container');
  
        const name = document.createElement('h3');
        name.textContent = item.title;
        bottomContainer.appendChild(name);
  
        const category = document.createElement('p');
        category.textContent = 'Category: ' + item.category; // Use category instead of pricePoint or audience
        bottomContainer.appendChild(category);
  
        const link = document.createElement('a');
        link.textContent = 'Read More >';
        link.setAttribute('role', 'button');
        link.href = `/items/${item.id}`;
        bottomContainer.appendChild(link);
  
        card.appendChild(topContainer);
        card.appendChild(bottomContainer);
        mainContent.appendChild(card);
      });
    } else {
      const message = document.createElement('h2');
      message.textContent = 'No items Available 😞';
      mainContent.appendChild(message);
    }
  };
  
  // Get the portion of the URL after the "/"
  const requestedUrl = window.location.href.split('/').pop();
  
  // Check if the requested URL is valid
  if (requestedUrl && requestedUrl !== 'index.html') {
    // If the URL is invalid, redirect to the 404 page
    window.location.href = '../404.html';
  } else {
    // If the URL is valid, render the items
    renderitems();
  }
  