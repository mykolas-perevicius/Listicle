document.addEventListener("DOMContentLoaded", () => {
    const header = document.querySelector('header');
  
    // Create header container
    const headerContainer = document.createElement('div');
    headerContainer.className = 'header-container';
  
    // Create header left section (logo + title)
    const headerLeft = document.createElement('div');
    headerLeft.className = 'header-left';
  
    const headerLogo = document.createElement('img');
    headerLogo.src = '/logo.png'; // path to your logo
    headerLogo.alt = 'Unearthed Logo';
  
    const headerTitle = document.createElement('h1');
    headerTitle.textContent = 'UnEarthed';
  
    headerLeft.appendChild(headerLogo);
    headerLeft.appendChild(headerTitle);
  
    // Create header right section (Home button)
    const headerRight = document.createElement('div');
    headerRight.className = 'header-right';
  
    const headerButton = document.createElement('button');
    headerButton.textContent = 'Home';
    headerButton.addEventListener('click', function handleClick(event) {
      window.location = '/';
    });
  
    headerRight.appendChild(headerButton);
  
    // Append left and right sections to the header container
    headerContainer.appendChild(headerLeft);
    headerContainer.appendChild(headerRight);
  
    // Append the header container to the header element
    header.appendChild(headerContainer);
  });
  