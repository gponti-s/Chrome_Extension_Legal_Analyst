//############################# Setup Center ####################################

//TODO: reveiw this function and global variable - get rid of them
let config = {};

async function loadConfig() {
  config = chrome.storage.local.get(["config"], (result) => {
    config = result.config;
  });
}

async function initializeStorage() {
  try {
    await new Promise((resolve, reject) => {
      chrome.storage.local.clear(() => {
        if (chrome.runtime.lastError) {
          reject(new Error(`Error clearing local storage: ${chrome.runtime.lastError}`));
        } else {
          console.log("Local storage cleared successfully.");
          resolve();
        }
      });
    });

    const { initialized } = await getDataFromStorage(["initialized"]);

    if (!initialized) {
      await storeConfigAndScripts();

      await new Promise((resolve, reject) => {
        chrome.storage.local.set({ initialized: true }, () => {
          console.log("Storage initialized for the first time.");
          resolve();
        });
      });
    } else {
      console.log("Storage already initialized.");
    }

    //await loadConfig();

  } catch (error) {
    console.error("Error in initializeStorage:", error);
  }
}

//TODO: refactor this function 
async function storeConfigAndScripts() {
  try {
    // Fetch the config.json
    const configResponse = await fetch(
      chrome.runtime.getURL("dataBase/config.json")
    );
    if (!configResponse.ok) {
      throw new Error(
        `Failed to fetch config.json: ${configResponse.statusText}`
      );
    }
    const config = await configResponse.json();

    // Fetch the script.json
    const scriptResponse = await fetch(
      chrome.runtime.getURL("dataBase/automationScriptsDb.json")
    );
    if (!scriptResponse.ok) {
      throw new Error(
        `Failed to fetch script.json: ${scriptResponse.statusText}`
      );
    }
    const scripts = await scriptResponse.json();

    // Fetch the automationButtons.json
    const automationButtonsResponse = await fetch(
      chrome.runtime.getURL("dataBase/automationButtonsDb.json")
    );
    if (!automationButtonsResponse.ok) {
      throw new Error(
        `Failed to fetch script.json: ${automationButtonsResponse.statusText}`
      );
    }
    const automationButtons = await automationButtonsResponse.json();

    // Fetch the automationModel.json
    const ordenacaoModelResponse = await fetch(
      chrome.runtime.getURL("dataBase/ordenacaoModelDb.json")
    );
    if (!ordenacaoModelResponse.ok) {
      throw new Error(
        `Failed to fetch script.json: ${ordenacaoModelResponse.statusText}`
      );
    }
    const ordenacaoModel = await ordenacaoModelResponse.json();

    // Fetch the automationScripts.json
    const ordenacaoScriptsResponse = await fetch(
      chrome.runtime.getURL("dataBase/ordenacaoScriptsDb.json")
    );
    if (!ordenacaoScriptsResponse.ok) {
      throw new Error(
        `Failed to fetch script.json: ${ordenacaoScriptsResponse.statusText}`
      );
    }
    const ordenacaoScripts = await ordenacaoScriptsResponse.json();

    // Fetch the remessaModel.json
    const remessaModelResponse = await fetch(
      chrome.runtime.getURL("dataBase/remessaModelDb.json")
    );
    if (!remessaModelResponse.ok) {
      throw new Error(
        `Failed to fetch script.json: ${remessaModelResponse.statusText}`
      );
    }
    const remessaModel = await remessaModelResponse.json();

    // Fetch the remessaScripts.json
    const remessaScriptsResponse = await fetch(
      chrome.runtime.getURL("dataBase/remessaScriptsDb.json")
    );
    if (!remessaScriptsResponse.ok) {
      throw new Error(
        `Failed to fetch script.json: ${remessaScriptsResponse.statusText}`
      );
    }
    const remessaScripts = await remessaScriptsResponse.json();

    chrome.storage.local.set(
      {
        config,
        scripts,
        automationButtons,
        ordenacaoModel,
        ordenacaoScripts,
        remessaModel,
        remessaScripts,
      },
      (result) => {
        console.log("Config and scripts stored successfully.", result);
      }
    );
  } catch (error) {
    console.error("Error storing config and scripts:", error);
  }
}

chrome.runtime.onInstalled.addListener(() => {
  initializeStorage();
});

//############################# Message Center ####################################

// Set up the onMessage listener
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  config = chrome.storage.local.get(["config"], (result) => {
    config = result.config;
    switch (request.action) {
      case "filterUpdate":
        chrome.storage.local.get(["filter"], function (result) {
          chrome.storage.local.set(
            { filter: !result.filter },
            async function () {
              sendMessageToContentScript(
                request.action + !result.filter,
                null,
                null
              );
              sendResponse(!result.filter);
            }
          );
        });
        return true;
      case "filterValue":
        chrome.storage.local.get(["filter"], function (response) {
          sendResponse(response);
        });

        return true; 

      case config.actions.automation:
        automationParsing(request.Option, config);
        sendResponse(true);
        return true;

      case config.actions.fetchAutomationButtons:
        fetchAutomationData()
          .then((data) => {
            sendResponse(data); 
          })
          .catch((error) => {
            sendResponse({ error: error.message });
          });

        return true; 

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

// --------------------------------- Testing - running scripts ------------------------------------------------
async function getDataFromStorage(_key) {
  return new Promise((resolve, reject) => {
    chrome.storage.local.get(_key, (result) => {
      if (chrome.runtime.lastError) {
        reject(chrome.runtime.lastError);
      } else {
        resolve(result);
      }
    });
  });
}

async function ordenacaoRunScript(_modelObj, _scriptObj, config) {
  const orderedKeys = config.mapping.ordenacaoModel;
  for (const key of orderedKeys) {
    const value = _modelObj[key];
    if (_scriptObj[key] !== false && _scriptObj[key] !== null) {
      Object.values(config.mapping.ordenacaoModelEspecialCase).forEach(
        (Element) => {
          if (key === Element) {
            value.innerText = _scriptObj[key];
            value.input = _scriptObj[key];
          }
        }
      );

      await new Promise((resolve) => setTimeout(resolve, value.timeOut || 0));

      sendMessageToContentScript(config.actions.automation, null, value);
    }
  }
  return true;
}

async function remessaRunScript(_modelObj, _scriptObj, config) {
  const orderedKeys = config.mapping.remessaModel;
  for (const key of orderedKeys) {
    const value = _modelObj[key];
    if (_scriptObj[key] !== false && _scriptObj[key] !== null) {
      Object.values(config.mapping.remessaModelEspecialCase).forEach(
        (Element) => {
          if (key === Element) {
            value.innerText = _scriptObj[key];
            value.input = _scriptObj[key];
          }
        }
      );

      await new Promise((resolve) => setTimeout(resolve, value.timeOut || 0));
      console.log("value ####", value)
      sendMessageToContentScript(config.actions.automation, null, value);
    }
  }
  return true;
}

async function automationParsing(_key, config) {
  const buttons = await getDataFromStorage("automationButtons");
  const automationClass = buttons.automationButtons[_key].automationClass;

  let script = await getDataFromStorage(`${automationClass}Scripts`);

  let model = await getDataFromStorage(`${automationClass}Model`);
  
  //TODO: review this code
  if (model && script) {
    // const automationClassModel = `${automationClass}Model`;
    // const modelObj = model[automationClassModel];
    // const scriptObj = script[`${automationClass}Scripts`][_key]

    switch (automationClass) {
      case "ordenacao":
        const automationClassModel = `${automationClass}Model`;
        const modelObj = model[automationClassModel];
        const scriptObj = script[`${automationClass}Scripts`][_key];
        return await ordenacaoRunScript(modelObj, scriptObj, config);
      case "remessa":
        
        const remessaClassModel = `${automationClass}Model`;
        const modelObj2 = model[remessaClassModel];
        const scriptObj2 = script[`${automationClass}Scripts`][_key];
        return await remessaRunScript(modelObj2, scriptObj2, config);
      case "analise":
        return await automationRunScript(_key, config);
    }
  }
}
