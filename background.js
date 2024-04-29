const loaded = false;


chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    console.log(sender.tab ?
                "from a content script:" + sender.tab.url :
                "from the extension");
    if (request.greeting === "hello")
      sendResponse({farewell: "goodbye"});
  }
);

async function pageLoad() {
  const [tab] = await chrome.tabs.query({active: true, lastFocusedWindow: true});
  const response = await chrome.tabs.sendMessage(tab.id, {action: "load"} );
  console.log("response: ",response);
  return response;
}

async function sendMessageToContentScript(_action, _content) {
  chrome.tabs.query({ active: true, currentWindow: true }, async function (tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {
      action: _action,
      Text: _content,
    });  
  });
}

//Automation
document.getElementById("automationButton").addEventListener("click", async function () {
  const linksDb = ["de juntada", "0071039-62.2021.8.16.0014"];
  for (let i = 0; i < linksDb.length; i++) {
      await sendMessageToContentScript("automation", linksDb[i]);
      await new Promise(resolve => setTimeout(resolve, 2000));
      //_ = await pageLoad();
      //await new Promise(resolve => setTimeout(resolve, 5000));
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
