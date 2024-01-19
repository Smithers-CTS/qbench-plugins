console.log("Navbar script loaded");

function changeNavbarColor() {
  console.log('DOM fully loaded and parsed');
  const domainStyles = {
    'origo.qbench.net': {'color': '#03229c', 'text': 'CTS-IL PRODUCTION'},
    'origo-sandbox.qbench.net': {'color': '#bac0f8', 'text': 'CTS-IL SANDBOX'},
    'smithers-ctsaz.qbench.net': {'color': '#b22203', 'text': 'CTS-AZ PRODUCTION'},
    'sandbox-smithers-cts.qbench.net': {'color': '#e09787', 'text': 'CTS-AZ SANDBOX'},
    'smithers-ctsoh.qbench.net': {'color': '#3cb203', 'text': 'CTS-OH PRODUCTION'},
    'smithers-ctsoh-sandbox.qbench.net': {'color': '#aae58e', 'text': 'CTS-OH SANDBOX'}
    // Add more domains and their associated colors here
  };

  const currentDomain = window.location.hostname;
  console.log(currentDomain);
  if (domainStyles[currentDomain]) {
    const navbar = document.querySelector('.topbar-main');
    if (navbar) {
      navbar.style.backgroundColor = domainStyles[currentDomain].color;

    // Create a new element to display the location name
    const locationDisplay = document.createElement('div');
    locationDisplay.textContent = `${domainStyles[currentDomain].text}`;
    locationDisplay.style.color = 'white'; // Set text color, you can customize this
    locationDisplay.style.marginLeft = '24px'; // Add some margin
    locationDisplay.style.fontSize = '14px';
    locationDisplay.style.paddingBottom = '10px';
    locationDisplay.style.fontWeight = 'bold';

    // Append the new element to the navbar
    navbar.appendChild(locationDisplay);
    if (currentDomain.includes('sandbox')) {
          const children = navbar.querySelectorAll('*');
          children.forEach(child => {
              child.style.color = 'black';
          });
      }

    const mainContent = document.querySelector('.row');
    mainContent.style.paddingTop = '20px';
    }
  }
}

if (document.readyState === "loading") {
    document.addEventListener('DOMContentLoaded', changeNavbarColor);
} else {
    changeNavbarColor();
}