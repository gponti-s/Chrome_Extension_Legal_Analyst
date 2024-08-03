console.log("from popup...");

//############################# Message Center ####################################

async function sendMessageToContentScript(
  _action,
  _content = null,
  _option = null
) {
  chrome.runtime.sendMessage(
    { action: _action, Text: _content, Option: _option },
    function (response) {
      console.log("Response from background.js:", response);
    }
  );
}

//############################# Notification Center ####################################

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

document.addEventListener('dataUpdated', createButtons);

async function createButtons() {
  fetch("dataBase/automationScriptsDb.json")
    .then((response) => response.json())
    .then((data) => {
      // Extract the entries, sort them by textContent
      const sortedEntries = Object.entries(data).sort((a, b) => {
        return a[1].textContent.localeCompare(b[1].textContent);
      });
      // create button
      sortedEntries.forEach(function ([key, value]) {
        const newButton = document.createElement("button");
        newButton.type = "button";
        newButton.className = "btn btn-secondary btn-sm btn-spacing"; // Add btn-spacing class
        newButton.id = key;
        newButton.textContent = value.textContent;
        document.getElementById(value.divIdToAppend).appendChild(newButton);
        newButton.addEventListener("click", async () => {
          sendMessageToContentScript("automation", null, key);
        });
      });
    })
    .catch((error) => {
      console.error('Error fetching data to build buttons', error);
    });
}

// Example trigger for dataUpdated event
document.dispatchEvent(new Event('dataUpdated'));
