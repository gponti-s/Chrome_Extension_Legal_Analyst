console.log("From background");

let state = {
  currentLinkIndex: 0,
  linksDb: [],
};

// Load the state from chrome.storage when the extension starts
chrome.storage.local.get("state", function(data) {
  if (data.state) {
    state = data.state;
  }
});



//TODO: delete this function
window.addEventListener("load", async (event) => {
  console.log("Popup listening...");
  event.preventDefault();
});

// Listen for messages from content.js
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action === "contentMessage") {
      console.log("Message from content.js:", request.Text);
      // Send a response back to content.js
      sendResponse({ Text: "Message received in background.js" });
  }
});


async function mainPageLoad(){
  chrome.tabs.query({ active: true, currentWindow: true }, async function (tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {
      action: "load",
      Text: "Extension listening...",
    }, function(response) {
      console.log("Response from content script:", response.Boolean);
      return response.Boolean;
    }); 
  });
}


async function sendMessageToContentScript(_action, _content = null) {
  chrome.tabs.query({ active: true, currentWindow: true }, async function (tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {
      action: _action,
      Text: _content,
    }, function (response){
      return response
    });  
  });
}

//Automation
// document.getElementById("automationButton").addEventListener("click", async function () {
//   const linksDb = ["de juntada", "0010571-02.2002.8.16.0014"];
//   const maxTimeout = 10000;

//   for (let i = 0; i < linksDb.length; i++) {
//     const startTime = Date.now();
    
//     await sendMessageToContentScript("automation", linksDb[i]);
    
//     await new Promise(resolve => setTimeout(resolve, 1000));
//     let loaded = await mainPageLoad();
//     console.log("mainloaded: ", loaded);
//     console.log("loaded: ", sendMessageToContentScript("load"));
//     while (!loaded) {
//       if (Date.now() - startTime >= maxTimeout) {
//         throw new Error("Timeout reached while waiting for page load.");
//       }
//       await new Promise(resolve => setTimeout(resolve, 2000));
//     }
//   }
// });
document.getElementById("automationButton").addEventListener("click", async function () {
  const linksDb = ["de juntada", "0010571-02.2002.8.16.0014"];
  state.linksDb = linksDb;
  const currentLinkIndex = state.currentLinkIndex;

  for (let i = currentLinkIndex; i < linksDb.length; i++) {
      await sendMessageToContentScript("automation", linksDb[i]);
      if (mainPageLoad() != true){
        console.log("awaiting for page load");
        await new Promise(resolve => setTimeout(resolve, 2000));
      }
  }
});



// Colors
document.getElementById("mainButton").addEventListener("click", function () {
  console.log("changed color");
  fetch(chrome.runtime.getURL("dataBase/color.json"))
    .then((response) => response.json())
    .then((data) => {
      Object.keys(data).forEach((keys) => {
        //console.log(data);
        const color = data[keys].color;
        sendMessageToContentScript("changeColor", color);

        //Send the color to the content script
        // chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        //   chrome.tabs.sendMessage(tabs[0].id, {
        //     action: "changeColor2",
        //     color: color,
        //   });
        // });
      });
    })
    .catch((error) => console.error("Error fetching color.json:", error));
});

// Notification
document
  .getElementById("notificationButton")
  .addEventListener("click", function () {
    chrome.notifications.create({
      type: "basic",
      iconUrl: "charge.png",
      title: "Notification Title",
      message: "Notification Message",
    });
  });
