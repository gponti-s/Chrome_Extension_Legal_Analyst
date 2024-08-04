//############################# Setup Center ####################################

document.addEventListener('DOMContentLoaded', () => {
  loadConfig().then(createButtons);
});

let config = {};

async function loadConfig() {
  const response = await fetch(chrome.runtime.getURL('config.json'));
  config = await response.json();
}

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

//############################# Notification Center ####################################

// TODO: Create dinamic notifications
document
  .getElementById("notificationIcon")
  .addEventListener("click", function () {
    chrome.notifications.create({
      type: "basic",
      iconUrl: "charge.png",
      title: "Notification Title",
      message: "Notification Message",
    });
  });


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
