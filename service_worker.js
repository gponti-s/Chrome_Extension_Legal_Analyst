console.log("from service_worker...");

//############################# Message Center ####################################

// Set up the onMessage listener
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "automation") {
    console.log("chamei a funcao automation", request.Option);
    automation(request.Option);
    sendResponse(true);
  } else if (request.action === "fetchAutomationButtons") {
    fetchAutomationButtons()
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

// TODO: make an env for this path
async function automation(_key) {
  fetch("dataBase/automationScriptsDb.json")
    .then((response) => response.json())
    .then(async (data) => {
      if (data[_key] && data[_key].script) {
        // Check if data[_key] and data[_key].script are defined
        const scriptArray = data[_key].script;
        for (let i = 0; i < scriptArray.length; i++) {
          console.log("service_worker automationPers.:", scriptArray[i]);
          await new Promise((resolve) =>
            setTimeout(resolve, scriptArray[i].timeOut || 0)
          );
          sendMessageToContentScript("automation", null, scriptArray[i]);
        }
      } else {
        console.error(
          "Data for key",
          _key,
          "or data[_key].script is undefined."
        );
      }
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
}

async function fetchAutomationButtons() {
  try {
    const response = await fetch("dataBase/automationScriptsDb.json");
    const data = await response.json();
    console.log("response", data);
    return data; // Assuming `data.Object` is the correct structure
  } catch (error) {
    console.error("Error fetching automation buttons:", error);
    throw new Error("Failed to fetch automation buttons");
  }
}
