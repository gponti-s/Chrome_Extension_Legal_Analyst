


// Listen for messages from the background script
chrome.runtime.onMessage.addListener(async function (request, sender, sendResponse) {
    switch (request.action) {
      case "changeColor":
        if (request.Text === "yellow") {
          document.body.style.backgroundColor = request.Text;
        } else {
          document.body.style.color = request.Text;
        }
        // Send a synchronous response
        sendResponse("Color changed successfully");
        break;
      case "automation":
        let response = await clickLink(decodeURIComponent(request.Text));
        sendResponse(response);
        break;
      case "load":
        // Do not perform asynchronous operations here
        window.addEventListener("load", () => {
          sendResponse({ Boolean: true });
        });
        return true;
      default:
        // Handle unknown action
        console.error("Unknown action:", request.action);
        sendResponse(undefined);
    }
  });
  

async function clickLink(_link) {
  var links = document.querySelectorAll("a");
  console.log("_LIMKK: ", _link);
  for (var i = 0; i < links.length; i++) {
    if (links[i].innerText.toLocaleLowerCase().includes( _link.toLocaleLowerCase())) {
      links[i].click();
      return true;
    }
  }
  console.log("Link not found:", _link);
  return false;
}

window.addEventListener("load", async () => {
    console.log("sending message...");
    const response = await chrome.runtime.sendMessage({Text: "hello"});
    // do something with response here, not outside the function
    console.log(response);
  // Add a delay of 1 second (adjust as needed)
});

(async () => {
    const response = await chrome.runtime.sendMessage({greeting: "hello"});
    // do something with response here, not outside the function
    console.log(response);
  })();



