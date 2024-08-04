console.log("from popup...");

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

// TODO: change the dataUpdated to DOMContentLoaded
document.addEventListener('dataUpdated', createButtons);

function createButtons() {
  sendMessageToServiceWorker("fetchAutomationButtons")
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
          newButton.className = "btn btn-secondary btn-sm btn-spacing"; // Add btn-spacing class
          newButton.id = key;
          newButton.textContent = value.textContent;
          document.getElementById(value.divIdToAppend).appendChild(newButton);
          newButton.addEventListener("click", async () => {
            sendMessageToServiceWorker("automation", null, key);
          });
        });
      } else {
        console.error("Invalid response received from background script:", response);
      }
    })
    .catch((error) => {
      console.error("Error in sendMessageToServiceWorker:", error);
    });
}

document.dispatchEvent(new Event('dataUpdated'));