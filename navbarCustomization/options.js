function isValidDomain(domain) {
    const domainRegex = /^[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return domainRegex.test(domain);
  }
  
  function escapeHTML(text) {
    return text.replace(/[&<>"']/g, function(match) {
      const escape = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;'
      };
      return escape[match];
    });
  }
  
  function saveOptions() {
    const domain = document.querySelector("#domain").value + ".qbench.net";
    const hostname = document.querySelector("#domain").value;
    if (!isValidDomain(domain)) {
      alert("Invalid domain format. Please enter a valid domain.");
      return;
    }
  
    // Optional: Check if domain is active
    fetch(`http://${domain}`, { mode: 'no-cors' })
      .then(() => {
        // Domain is reachable
        const newSetting = {
          hostname: hostname,
          domain: domain,
          backgroundColor: document.querySelector("#backgroundColor").value,
          color: document.querySelector("#color").value,
          text: escapeHTML(document.querySelector("#text").value)
        };
  
        browser.storage.sync.get('settings', function(data) {
          let settings = data.settings || [];
          let editIndex = document.querySelector("#options-form").getAttribute('data-edit-index');
  
          if (editIndex !== null) {
            // Update existing setting
            settings[editIndex] = newSetting;
          } else {
            // Add new setting
            settings.push(newSetting);
          }
  
          browser.storage.sync.set({settings: settings}, function() {
            if (browser.runtime.lastError) {
              console.error(`Error updating settings: ${browser.runtime.lastError}`);
            } else {
              displaySettings();
              document.querySelector("#options-form").reset();
              document.querySelector("#options-form").removeAttribute('data-edit-index');
            }
          });
        });
      })
      .catch(() => {
        alert("Domain is not reachable. Please enter an active domain.");
      });
  }
  
  function displaySettings() {
    browser.storage.sync.get('settings', function(data) {
      let settings = data.settings || [];
      let settingsList = document.querySelector("#settings-list");
      settingsList.innerHTML = '';
  
      settings.forEach(function(setting, index) {
        let settingDiv = document.createElement('div');
        settingDiv.textContent = `Domain: ${setting.domain}, Background: ${setting.backgroundColor}, Text Color: ${setting.color}, Text: ${setting.text}`;
  
        // Edit button
        let editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.onclick = function() { editSetting(index); };
  
        // Remove button
        let removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.onclick = function() { removeSetting(index); };
  
        settingDiv.appendChild(editButton);
        settingDiv.appendChild(removeButton);
        settingsList.appendChild(settingDiv);
      });
    });
  }
  
  function editSetting(index) {
    browser.storage.sync.get('settings', function(data) {
      let settings = data.settings || [];
      if (settings[index]) {
        document.querySelector("#domain").value = settings[index].hostname;
        document.querySelector("#backgroundColor").value = settings[index].backgroundColor;
        document.querySelector("#color").value = settings[index].color;
        document.querySelector("#text").value = settings[index].text;
  
        // Store the current index for saving later
        document.querySelector("#options-form").setAttribute('data-edit-index', index);
      }
    });
  }
  
  function removeSetting(index) {
    browser.storage.sync.get('settings', function(data) {
      let settings = data.settings || [];
      if (settings[index]) {
        settings.splice(index, 1);
        browser.storage.sync.set({settings: settings}, function() {
          displaySettings();
        });
      }
    });
  }
  // Script may not trigger depending on where it is in the loading order
  // Set it to either add an event listener if script loads before DOM
  // or else just run the script
  document.addEventListener('DOMContentLoaded', function() {
    document.querySelector("#add-setting").addEventListener("click", saveOptions);
    displaySettings();
  });
  
  