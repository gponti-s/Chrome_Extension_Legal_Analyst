//############################# Setup Center ####################################

let config = {};

// Function to ensure the service worker is active before sending a message
async function ensureServiceWorkerIsReady() {
  const registration = await navigator.serviceWorker.ready;
  return registration.active;
}


// Use this function before sending a message
document.addEventListener('DOMContentLoaded', async () => {
  try {
    const worker = await ensureServiceWorkerIsReady(); // Wait for service worker
    if (worker) {
      chrome.storage.local.get(['config'], function(response) {
        config = response.config;
        console.log(config);
        createButtons(); // Move createButtons inside the callback
        filterIconUpdate(); // Call filterIconUpdate after the config is loaded
      });
    }
  } catch (error) {
    console.error('Error loading configuration:', error);
  }
});


//############################# Message Center ####################################

async function sendMessageToServiceWorker(_action, _content = null, _option = null) {
  return new Promise((resolve, reject) => {
    chrome.runtime.sendMessage(
      { action: _action, Text: _content, Option: _option },
      function (response) {
        if (chrome.runtime.lastError) {
          reject(new Error(chrome.runtime.lastError.message));
        } else {
          resolve(response);
        }
      }
    );
  });
}

//############################# Icons Manager Center ####################################

// ####### Notification Icon #######
// TODO: Create dinamic notifications
document
  .getElementById("notificationIcon")
  .addEventListener("click", function () {
    chrome.notifications.create({
      type: "basic",
      iconUrl: "charge.png",
      title: "Notification Title",
      message: "Você não tem notificações",
    });
  });

  document.getElementById('gridIcon').addEventListener('click', function() {
    chrome.runtime.openOptionsPage();
});

// ####### Filter Icon #######
document.getElementById("filterIcon").addEventListener("click", async () => {
  _ = await sendMessageToServiceWorker("filterUpdate", null, null);
  _ = filterIconUpdate();
});

async function filterIconUpdate(){
  const filterValue = await sendMessageToServiceWorker("filterValue", null, null);
  const icon = document.getElementById("filterIcon");
  icon.className = filterValue.filter ? "bi bi-funnel-fill navegationIcons" : "bi bi-funnel navegationIcons";
  return true;
}

//############################# Dinamic Buttons ####################################

function createButtons() {
  sendMessageToServiceWorker(config.actions.fetchAutomationButtons)
    .then((response) => {
      // Check if response is valid
      if (response && typeof response === 'object') {
        const sortedEntries = Object.entries(response).sort((a, b) => {
          return a[1].textContent.localeCompare(b[1].textContent);
        });
        // Create buttons
        sortedEntries.forEach(function ([key, value]) {
          const newButton = document.createElement("button");
          newButton.type = "button";
          newButton.className = config.style.buttonClassName; // Add btn-spacing class
          newButton.id = key;
          newButton.textContent = value.textContent;
          document.getElementById(value.divIdToAppend).appendChild(newButton);
          newButton.addEventListener("click", async () => {
            sendMessageToServiceWorker(config.actions.automation, null, key);
          });
        });
      } else {
        console.error(config.errorMessages.popupMessageResponse, response);
      }
    })
    .catch((error) => {
      console.error(config.errorMessages.popupMessageResponse, error);
    });
}
