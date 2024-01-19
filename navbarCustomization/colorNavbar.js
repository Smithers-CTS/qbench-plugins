// Function to change navbar color and text
function updateNavbar(settings) {
  settings.forEach(setting => {
    const navbar = document.querySelector('.topbar-main');
    if (navbar && window.location.hostname.includes(setting.domain)) {
      navbar.style.backgroundColor = setting.backgroundColor;
  
      // Create a new element to display the location name
      const locationDisplay = document.createElement('div');
      locationDisplay.textContent = `${setting.text}`;
      locationDisplay.style.color = `${setting.color}`;
      locationDisplay.style.marginLeft = '24px';
      locationDisplay.style.fontSize = '14px';
      locationDisplay.style.paddingBottom = '10px';
      locationDisplay.style.fontWeight = 'bold';
      // Add text or other changes here
  
      // Append the new element to the navbar
      navbar.appendChild(locationDisplay);
  
      // Change navbar text color for readability
      const children = navbar.querySelectorAll('*');
      children.forEach(child => {
          child.style.color = setting.color;
      });
  
      // Adjust the padding on the first element below the navbar
      // Navbar floats on top of the container, so changing nav or container settings won't work
      // QBench really needs better class names...
      const mainContent = document.querySelector('.row');
      mainContent.style.paddingTop = '20px';
    }
  });
}
      
// Script may not trigger depending on where it is in the loading order
// Set it to either add an event listener if script loads before DOM
// or else just run the script
if (document.readyState === "loading") {
  document.addEventListener('DOMContentLoaded', function() {
    browser.storage.sync.get('settings', function(data) {
      if (data.settings) {
        updateNavbar(data.settings);
      }
    });
  });
} else {
  browser.storage.sync.get('settings', function(data) {
    if (data.settings) {
      updateNavbar(data.settings);
    }
  });
}
