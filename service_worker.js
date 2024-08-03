console.log("from background...");

// receive messages from all parts
chrome.runtime.onMessage.addListener(async function (
  request,
  sender,
  sendResponse
) {
  if (request.action === "automation") {
    console.log("chamei a funcao automation", request.Option)
    automation(request.Option);
  }
});

// send message to scripts
async function sendMessageToContentScript(_action, _content = null, _object = null) {
  return new Promise((resolve, reject) => {
    chrome.tabs.query(
      { active: true, currentWindow: true },
      async function (tabs) {
        chrome.tabs.sendMessage(
          tabs[0].id,
          {
            action: _action,
            Text: _content,
            Object: _object
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

// TODO: make an env for this path  
async function automation(_key) {
  fetch("dataBase/automationScriptsDb.json")
    .then((response) => response.json())
    .then(async (data) => {
      if (data[_key]) { // Check if data[_key] is defined
        for (let i = 0; i < data[_key].length; i++) {
          console.log("service_worker automationPers.:", data[_key][i]);
          await new Promise((resolve) => setTimeout(resolve, data[_key][i].timeOut));
          sendMessageToContentScript("automation", null, data[_key][i])
        }
      } else {
        console.error("Data for key", _key, "is undefined.");
      }
    });
}

