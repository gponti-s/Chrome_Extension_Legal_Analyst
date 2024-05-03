console.log("from background...");

// receive messages from all parts
chrome.runtime.onMessage.addListener(async function (
  request,
  sender,
  sendResponse
) {
  if (request.action === "automation") {
    console.log("Message received:", request.action);
    _ = await testeAutomation();
    sendResponse({ Text: "Message received in background.js" });
  }
  if (request.action === "automationPersonalized") {
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

async function testeAutomation() {
  const linksDb = ["de juntada", "0010571-02.2002.8.16.0014"];

  for (let i = 0; i < linksDb.length; i++) {
    const response = await sendMessageToContentScript("automation", linksDb[i]);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    // const load = await sendMessageToContentScript("load");
    // while(!load.Boolean){
    //   await new Promise(resolve => setTimeout(resolve, 2000));
    //   load = await sendMessageToContentScript("load");
    // }
    // console.log(load.Boolean);
  }
}

// TODO: make an env for this path  
async function automation(_key) {
  fetch("dataBase/automationScriptsDb.json")
    .then((response) => response.json())
    .then(async (data) => {
      if (data[_key]) { // Check if data[_key] is defined
        for (let i = 0; i < data[_key].length; i++) {
          console.log("service_worker automationPers.:", data[_key][i]);
          sendMessageToContentScript("automation", null, data[_key][i])
          await new Promise((resolve) => setTimeout(resolve, 2000));
        }
      } else {
        console.error("Data for key", _key, "is undefined.");
      }
    });
}

