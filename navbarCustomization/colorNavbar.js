
function changeNavbarColor() {
  // Dictionary of styles for each QBench site. Current standard is to use
  // dark solid colors with white text for production and pastel colors with
  // black text for sandbox

  const domainStyles = {
    'origo.qbench.net': {'backgroundColor': '#03229c', 'text': 'CTS-IL PRODUCTION', 'color': 'white'},
    'origo-sandbox.qbench.net': {'backgroundColor': '#bac0f8', 'text': 'CTS-IL SANDBOX', 'color': 'black'},
    'smithers-ctsaz.qbench.net': {'backgroundColor': '#b22203', 'text': 'CTS-AZ PRODUCTION', 'color': 'white'},
    'sandbox-smithers-cts.qbench.net': {'backgroundColor': '#e09787', 'text': 'CTS-AZ SANDBOX', 'color': 'black'},
    'smithers-ctsoh.qbench.net': {'backgroundColor': '#3cb203', 'text': 'CTS-OH PRODUCTION', 'color': 'white'},
    'smithers-ctsoh-sandbox.qbench.net': {'backgroundColor': '#aae58e', 'text': 'CTS-OH SANDBOX', 'color': 'black'}
    // Add more domains and their associated colors here
  };

  const currentDomain = window.location.hostname;
  if (domainStyles[currentDomain]) {
    const navbar = document.querySelector('.topbar-main');
    if (navbar) {
      navbar.style.backgroundColor = domainStyles[currentDomain].backgroundColor;

    // Create a new element to display the location name
    const locationDisplay = document.createElement('div');
    locationDisplay.textContent = `${domainStyles[currentDomain].text}`;
    locationDisplay.style.color = 'white';
    locationDisplay.style.marginLeft = '24px';
    locationDisplay.style.fontSize = '14px';
    locationDisplay.style.paddingBottom = '10px';
    locationDisplay.style.fontWeight = 'bold';

    // Append the new element to the navbar
    navbar.appendChild(locationDisplay);

    // Change navbar text color for readability
    const children = navbar.querySelectorAll('*');
    children.forEach(child => {
        child.style.color = domainStyles[currentDomain].color;
    });

    // Adjust the padding on the first element below the navbar
    // Navbar floats on top of the container, so changing nav or container settings won't work
    // QBench really needs better class names...
    const mainContent = document.querySelector('.row');
    mainContent.style.paddingTop = '20px';
    }
  }
}

// Script may not trigger depending on where it is in the loading order
// Set it to either add an event listener if script loads before DOM
// or else just run the script
if (document.readyState === "loading") {
    document.addEventListener('DOMContentLoaded', changeNavbarColor);
} else {
    changeNavbarColor();
}