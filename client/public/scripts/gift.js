const renderGift = async () => {
    // Parse the ID from the URL
    const urlParams = new URLSearchParams(window.location.search);
    const requestedID = parseInt(urlParams.get('id'));
  
    // Fetch the gift data from the /gifts endpoint
    const response = await fetch('/gifts');
    const data = await response.json();
  
    // Get the gift-content element
    const giftContent = document.getElementById('gift-content');
  
    // Declare a variable for the gift
    let gift;
  
    // Check if data exists and find the matching gift by ID
    if (data) {
      gift = data.find(gift => gift.id === requestedID);
    }
  
    // Conditionally render the gift data or show "No Gifts Available" message
    if (gift) {
      document.getElementById('image').src = gift.image;
      document.getElementById('name').textContent = gift.name;
      document.getElementById('submittedBy').textContent = 'Submitted by: ' + gift.submittedBy;
      document.getElementById('submittedOn').textContent = 'Submitted on: ' + new Date(gift.submittedOn).toLocaleDateString();
      document.getElementById('pricePoint').textContent = 'Price: ' + gift.pricePoint;
      document.getElementById('audience').textContent = 'Great For: ' + gift.audience;
      document.getElementById('description').textContent = gift.description;
  
      // Set the page title to the gift's name
      document.title = `UnEarthed - ${gift.name}`;
    } else {
      // If no gift found, display a message
      const message = document.createElement('h2');
      message.textContent = 'No Gifts Available 😞';
      giftContent.appendChild(message);
    }
  };
  
  // Call the renderGift function
  renderGift();
  