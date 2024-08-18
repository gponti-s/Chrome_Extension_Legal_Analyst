//############################# Setup Center ####################################

// // Function to ensure the service worker is active before sending a message
// async function ensureServiceWorkerIsReady() {
//   const registration = await navigator.serviceWorker.ready;
//   return registration.active;
// }

// Use this function before sending a message
document.addEventListener("DOMContentLoaded", async () => {
  try {
      chrome.storage.local.get("filter").then((response) => {
        filterIconUpdate(response.filter);
  });
    createButtons(); // Move createButtons inside the callback
  } catch (error) {
    console.error("Error loading configuration:", error);
  }
});

//############################# Message Center ####################################

async function sendMessageToServiceWorker(
  _action,
  _content = null,
  _option = null
) {
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

// ------------- Notification Icon -------------
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

document.getElementById("gridIcon").addEventListener("click", function () {
  chrome.runtime.openOptionsPage();
});

// ------------- Filter Icon -------------
document.getElementById("filterIcon").addEventListener("click", async () => {
  let flag = await sendMessageToServiceWorker("filterUpdate", null, null);
  console.log("Popup - the icon was clicked ", flag)
  filterIconUpdate(flag);
});

async function filterIconUpdate(filterFlag) {
    const icon = document.getElementById("filterIcon");
    icon.className = filterFlag
      ? "bi bi-funnel-fill navegationIcons"
      : "bi bi-funnel navegationIcons";
}

//############################# Dinamic Buttons ####################################

function createButtons() {
  chrome.storage.local
    .get(["scripts", "config"])
    .then((response) => {
      // Check if response.scripts is valid
      if (response.scripts && typeof response.scripts === "object") {
        const sortedEntries = Object.entries(response.scripts).sort((a, b) => {
          return a[1].textContent.localeCompare(b[1].textContent);
        });
        // Create buttons
        sortedEntries.forEach(function ([key, value]) {
          const newButton = document.createElement("button");
          newButton.type = "button";
          newButton.className = response.config.style.buttonClassName; // Add btn-spacing class
          newButton.id = key;
          newButton.textContent = value.textContent;
          document.getElementById(value.divIdToAppend).appendChild(newButton);
          newButton.addEventListener("click", async () => {
            sendMessageToServiceWorker(
              response.config.actions.automation,
              null,
              key
            );
          });
        });
      } else {
        console.error(
          response.config.errorMessages.popupMessageresponse,
          response.scripts
        );
      }
    })
    .catch((error) => {
      console.error(response.config.errorMessages.popupMessageresponse, error);
    });
}
