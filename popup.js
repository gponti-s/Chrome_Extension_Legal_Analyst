//############################# Setup Center ####################################

async function getDataFromStorage(_key) {
  return new Promise((resolve, reject) => {
    chrome.storage.local.get(_key, (result) => {
      if (chrome.runtime.lastError) {
        reject(chrome.runtime.lastError);
      } else {
        resolve(result);
      }
    });
  });
}


document.addEventListener("DOMContentLoaded", async () => {
  try {
    await filterIconUpdate();
    await initializeButtons();
  } catch (error) {
    console.error("Error during DOMContentLoaded execution:", error);
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
  _ = await sendMessageToServiceWorker("filterUpdate", null, null);
  await filterIconUpdate();
});

async function filterIconUpdate() {
  const response = await getDataFromStorage("filter");
  const icon = document.getElementById("filterIcon");
  icon.className = response.filter
    ? "bi bi-funnel-fill navegationIcons"
    : "bi bi-funnel navegationIcons";
}

//############################# Dinamic Buttons ####################################

function NewAutomationButton(_className, _key, _textContent) {
  const newButton = document.createElement("button");
  newButton.type = "button";
  newButton.className = _className; // Add btn-spacing class
  newButton.id = _key;
  newButton.textContent = _textContent;
  return newButton;
}

function createButtons(response) {
  if (response.automationButtons && typeof response.automationButtons === "object") {
    const sortedEntries = Object.entries(response.automationButtons).sort((a, b) => {
      return a[1].textContent.localeCompare(b[1].textContent);
    });
    sortedEntries.forEach(function ([key, value]) {
      const newButton = NewAutomationButton(
        response.config.style.buttonClassName,
        key,
        value.textContent
      );
      document.getElementById(value.automationClass).appendChild(newButton);
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
      response.automationButtons
    );
  }
}

async function initializeButtons() {
  try {
    const response = await getDataFromStorage(["config", "automationButtons"]);
    console.log(response.automationButtons);
    createButtons(response);
  } catch (error) {
    console.error("Error fetching data or creating buttons:", error);
  }
}
