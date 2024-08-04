//############################# Setup Center ####################################

let config = {};

async function loadConfig() {
  const response = await fetch(chrome.runtime.getURL('config.json'));
  config = await response.json();
}

loadConfig();


//############################# Message Center ####################################

// Set up the onMessage listener
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === config.actions.automation) {
    automationRunScript(request.Option);
    sendResponse(true);
  } else if (request.action === config.actions.fetchAutomationButtons) {
    fetchAutomationData()
      .then((data) => {
        sendResponse(data); // Send the fetched data
      })
      .catch((error) => {
        sendResponse({ error: error.message });
      });
    return true; // Indicate that sendResponse will be called asynchronously
  }
});


// send message to scripts
async function sendMessageToContentScript(
  _action,
  _content = null,
  _object = null
) {
  return new Promise((resolve, reject) => {
    chrome.tabs.query(
      { active: true, currentWindow: true },
      async function (tabs) {
        chrome.tabs.sendMessage(
          tabs[0].id,
          {
            action: _action,
            Text: _content,
            Object: _object,
          },
          function (response) {
            // Resolve the promise with the response
            resolve(response);
          }
        );
      }
    );
  });
}

//############################# Fetch Center ####################################

async function automationRunScript(_key) {
  fetchAutomationData()
    .then(async (data) => {
      if (data[_key] && data[_key].script) {
        // Check if data[_key] and data[_key].script are defined
        const scriptArray = data[_key].script;
        for (let i = 0; i < scriptArray.length; i++) {
          await new Promise((resolve) =>
            setTimeout(resolve, scriptArray[i].timeOut || 0)
          );
          sendMessageToContentScript(config.actions.automation, null, scriptArray[i]);
        }
      } else {
        console.error(
          "Data for key",
          _key,
          "or data[_key].script is undefined."
        );
      }
    })
}

async function fetchAutomationData() {
  try {
    const response = await fetch(config.api.databaseUrlAutomation);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(config.errorMessages.fetchingAutomation, error);
    throw new Error(config.errorMessages.fetchingAutomation);
  }
}
