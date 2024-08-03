console.log("from popup...");

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

document
  .getElementById("pendenciaButton")
  .addEventListener("click", async () => {
    sendMessageToContentScript("automation", null, "analiseJuntada");
  });

  document
  .getElementById("classeProcessualButton")
  .addEventListener("click", async () => {
    sendMessageToContentScript("automation", null, "anlterarClasseProcessual");
  });

document
  .getElementById("automationButton")
  .addEventListener("click", async function () {
    sendMessageToContentScript("automation", null, "ordenacaoMadado");
  });

  document
  .getElementById("editalButton")
  .addEventListener("click", async function () {
    sendMessageToContentScript("automation", null, "ordenacaoEditalIntimacao");
  });

document
  .getElementById("openAllShowDetailsButton")
  .addEventListener("click", async () => {
    sendMessageToContentScript("automation", null, "openAllShowDetails");
  });


  document
  .getElementById("styleButton")
  .addEventListener("click", async () => {
    sendMessageToContentScript("automation", null, "style");
  });
