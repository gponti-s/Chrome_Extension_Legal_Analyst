console.log("from popup...");

async function sendMessageToContentScript(_action, _content = null, _option = null) {
  chrome.runtime.sendMessage(
    { action: _action, Option: _option , Text: _content },
    function (response) {
      console.log("Response from background.js:", response);
    }
  );
}

document
  .getElementById("automationButton")
  .addEventListener("click", async function () {
    sendMessageToContentScript("automationPersonalized", null, "secondPart");
  });

document.getElementById("openAllShowDetailsButton").addEventListener("click", async () => {
    sendMessageToContentScript("automationPersonalized", null, "openAllShowDetails");
});
