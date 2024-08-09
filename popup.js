//############################# Setup Center ####################################

document.addEventListener('DOMContentLoaded', async () => {
  try {
    await loadConfig();
    createButtons();
  } catch (error) {
    console.error('Error loading configuration:', error);
  }
});

let config = {};


//TODO: Refactor this function. Change fetch to sendMessage. The work_server should do the fetch
async function loadConfig() {
  try {
    const response = await fetch(chrome.runtime.getURL('config.json'));
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    config = await response.json();
  } catch (error) {
    console.error('Failed to load config:', error);
    throw error;  // Re-throw the error to ensure createButtons isn't called
  }
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

  document.getElementById('gridIcon').addEventListener('click', function() {
    chrome.runtime.openOptionsPage();
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
