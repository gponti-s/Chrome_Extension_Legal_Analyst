// document.getElementById("mainButton").addEventListener("click", function() {
//     chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
//         chrome.tabs.sendMessage(tabs[0].id, {message: "Hello from popup!"});
//     });
// });

document.getElementById("mainButton").addEventListener("click", function() {
    chrome.runtime.sendMessage({message: "Hello from popup!"});
});

