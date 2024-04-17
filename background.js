chrome.commands.onCommand.addListener(function(command) {
    if (command === "executeGeneralScript") {
      chrome.tabs.executeScript({
        file: "General.js"
      });
    }
  });
  