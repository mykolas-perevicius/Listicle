const renderitem = async () => {
    // Parse the ID from the URL
    const urlParams = new URLSearchParams(window.location.search);
    const requestedID = parseInt(urlParams.get('id'));
  
    // Fetch the item data from the /items endpoint
    const response = await fetch('/items');
    const data = await response.json();
  
    // Get the item-content element
    const itemContent = document.getElementById('item-content');
  
    // Declare a variable for the item
    let item;
  
    // Check if data exists and find the matching item by ID
    if (data) {
      item = data.find(item => item.id === requestedID);
    }
  
    // Conditionally render the item data or show "No items Available" message
    if (item) {
      document.getElementById('image').src = item.image;
      document.getElementById('name').textContent = item.name;
      document.getElementById('submittedBy').textContent = 'Submitted by: ' + item.submittedBy;
      document.getElementById('submittedOn').textContent = 'Submitted on: ' + new Date(item.submittedOn).toLocaleDateString();
      document.getElementById('pricePoint').textContent = 'Price: ' + item.pricePoint;
      document.getElementById('audience').textContent = 'Great For: ' + item.audience;
      document.getElementById('description').textContent = item.description;
  
      // Set the page title to the item's name
      document.title = `UnEarthed - ${item.name}`;
    } else {
      // If no item found, display a message
      const message = document.createElement('h2');
      message.textContent = 'No items Available 😞';
      itemContent.appendChild(message);
    }
  };
  
  // Call the renderitem function
  renderitem();
  