//############################# Setup Center ####################################


let config = {};

async function loadConfig() {
  config = chrome.storage.local.get(['config'], (result)=>{
    config = result.config;
    console.log("Worker - Config", config);
  });
}

async function initializeStorage() {
  // Check if initialization has already been done
  chrome.storage.local.get(['initialized'], (result) => {
    //TODO: change result.initialized to !result.initialized
    if (result.initialized) {
      
      storeConfigAndScripts();

      chrome.storage.local.set({ initialized: true }, () => {
        console.log('Storage initialized for the first time.');
      });
    } else {
      console.log('Storage already initialized.');
    }
  });
  loadConfig();
}

async function storeConfigAndScripts() {
  try {
    // Fetch the config.json
    const configResponse = await fetch(chrome.runtime.getURL('dataBase/config.json'));
    if (!configResponse.ok) {
      throw new Error(`Failed to fetch config.json: ${configResponse.statusText}`);
    }
    const config = await configResponse.json();

    // Fetch the script.json
    const scriptResponse = await fetch(chrome.runtime.getURL('dataBase/automationScriptsDb.json'));
    if (!scriptResponse.ok) {
      throw new Error(`Failed to fetch script.json: ${scriptResponse.statusText}`);
    }
    const scripts = await scriptResponse.json();
    
    // Fetch the script.json
    const automationButtonsResponse = await fetch(chrome.runtime.getURL('dataBase/automationButtonsDb.json'));
    if (!automationButtonsResponse.ok) {
      throw new Error(`Failed to fetch script.json: ${automationButtonsResponse.statusText}`);
    }
    const automationButtons = await automationButtonsResponse.json();

    // Store config and scripts in chrome.storage.local
    chrome.storage.local.set({ config, scripts, automationButtons }, (result) => {
      console.log('Config and scripts stored successfully.', result);
    });
    
  } catch (error) {
    console.error('Error storing config and scripts:', error);
  }
}

chrome.runtime.onInstalled.addListener(() => {
  initializeStorage();
});

//############################# Message Center ####################################

// Set up the onMessage listener
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  config = chrome.storage.local.get(['config'], (result)=>{
    config = result.config;
    console.log("Worker - Config", config);
    switch (request.action) {
      case "filterUpdate":
        chrome.storage.local.get(['filter'], function(result) {
          chrome.storage.local.set({ filter: !result.filter }, async function() {
            sendMessageToContentScript(request.action + !result.filter, null, null);
            sendResponse(!result.filter);
        });
        });
        return true; 
      case "filterValue":
        chrome.storage.local.get(['filter'], function(response) {
          sendResponse(response);
        });
  
        return true; // Keep the message channel open for async operation
  
      case config.actions.automation:
        automationRunScript(request.Option, config);
        sendResponse(true);
        return true;
  
      case config.actions.fetchAutomationButtons:
        fetchAutomationData()
          .then((data) => {
            sendResponse(data); // Send the fetched data
          })
          .catch((error) => {
            sendResponse({ error: error.message });
          });
  
        return true; // Indicate that sendResponse will be called asynchronously
  
      default:
        console.warn("Unhandled action:", request.action);
        sendResponse({ error: "Unknown action" });
        break;
    }
  });
  return true;
  
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

sendMessageToContentScript("main", null, null);

//############################# Fetch Center ####################################

async function automationRunScript(_key, config) {
  fetchAutomationData(config).then(async (data) => {
    if (data[_key] && data[_key].script) {
      // Check if data[_key] and data[_key].script are defined
      const scriptArray = data[_key].script;
      for (let i = 0; i < scriptArray.length; i++) {
        await new Promise((resolve) =>
          setTimeout(resolve, scriptArray[i].timeOut || 0)
        );
        sendMessageToContentScript(
          config.actions.automation,
          null,
          scriptArray[i]
        );
      }
    } else {
      console.error("Data for key", _key, "or data[_key].script is undefined.");
    }
  });
}

async function fetchAutomationData(config) {
  try {
    const response = await fetch(config.api.databaseUrlAutomation);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(config.errorMessages.fetchingAutomation, error);
    throw new Error(config.errorMessages.fetchingAutomation);
  }
}
