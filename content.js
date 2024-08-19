//############################# Setup Center ####################################

// TODO: return the errors as a sendResponse instead of console.log
// let pageLoaded = false;
// console.log("sarting....", pageLoaded);
// window.addEventListener("load", () => (pageLoaded = true));


// async function loadConfig() {
//   try {
//     const response = await fetch(chrome.runtime.getURL('config.json'));
//     if (!response.ok) {
//       throw new Error(`HTTP error! Status: ${response.status}`);
//     }
//     const config = await response.json();
//     console.log('Config from content.js:', config);
//   } catch (error) {
//     console.error('Error loading config in content.js:', error);
//   }
// }

// loadConfig();

//############################# Message Center ####################################

// Listen for messages from the service_worker script
chrome.runtime.onMessage.addListener(async function (
  request,
  sender,
  sendResponse
) {
  switch (request.action) {
    case "load": // TODO: check this case: probable there is none.
      sendResponse({ Text: "loaded", Boolean: pageLoaded });
      break;
    case "changeColor": // TODO: check this case: probable there is none.
      if (request.Text === "yellow") {
        document.body.style.backgroundColor = request.Text;
      } else {
        document.body.style.color = request.Text;
      }
      sendResponse("Color changed successfully");
      break;
    case "automation":
      let response = await automation(request.Object);
      sendResponse(response);
      break;
    default:
      // Handle unknown action
      console.error("Unknown action:", request.action);
      sendResponse(undefined);
  }
});

//############################# Operational Center ####################################

// TODO: check the return inside the if statement: change the logic > if (!elements || elements.length === 0)
async function findElementInFrames(selector) {
  let elementInCurrentDocument = document.querySelectorAll(selector);
  console.log("Element from Iframe - queryALL", elementInCurrentDocument);
  if (elementInCurrentDocument.length > 0) {
    //return elementInCurrentDocument;
  } else {
    elementInCurrentDocument = document.querySelector(selector);
    console.log("Element from Iframe - querySig", elementInCurrentDocument);
  }
  return elementInCurrentDocument;
}

// TODO: erase this function: Function to wait for an iframe to load  - NOT IN USE
function waitForIframeLoad(iframe) {
  return new Promise((resolve) => {
    iframe.onload = () =>
      resolve(iframe.contentDocument || iframe.contentWindow.document);
  });
}


// TODO: code a case for partial and regular selectors as a default. Include a Id case, insteade of defautl:
// case "id":
//  selector = `#"${identifier}"]`;
// default:
//  selector = `[{selectorType}*="${identifier}"]`;
async function selectElement(selectorType, identifier) {
  let selector = "";

  switch (selectorType) {
    case "class":
      selector = `.${identifier}`;
      break;
    case "tag":
      selector = identifier;
      break;
    case "partialId":
      selector = `[id*="${identifier}"]`;
      break;
    case "onclick":
      selector = `[onclick*="${identifier}"]`;
      break;
    case "title":
      selector = `[title="${identifier}"]`;
      break;
    default:
      // Default to selecting by id
      selector = `#${identifier}`;
      break;
  }
  return await findElementInFrames(selector);
}

async function automation(_object) {
  if (_object == undefined) {
    return undefined;
  }
  let elements = await selectElement(_object.selectorType, _object.identifier);
  switch (_object.command) {
    case "click":
      return await clickElement(_object, elements);
    case "delay":// TODO: ride off this case - not used
      return await delay(_object);
    case "select":
      return await selectOption(_object, elements);
    case "input":
      return await input(_object, elements);
    case "style":
      return await style(_object, elements);
    default:
      console.error("Unknown action:", request.action);
      sendResponse(undefined);
  }
  return false;
}

async function clickElement(_object, elements) {
  let elementClicked = false;

  if (_object.innerText) {
    for (let i = 0; i < elements.length; i++) {
      if (
        elements[i].innerText
          .toLocaleLowerCase()
          .includes(_object.innerText.toLocaleLowerCase())
      ) {
        elements[i].click();
        elementClicked = true;
      }
    }
  } else {
    for (let i = 0; i < elements.length; i++) {
      elements[i].click();
      elementClicked = true;
    }
  }
  return elementClicked;
}

// TODO: ride off this function - not used
async function delay(_object) {
  await new Promise((resolve) => setTimeout(resolve, _object.delay));
}

async function selectOption(_object, elements) {
  if (!elements || elements.length === 0) {
    console.error("No elements found to select");
    return;
  }

  elements.forEach((selectElement) => {
    if (selectElement) {
      let options = selectElement.options;
      for (let i = 0; i < options.length; i++) {
        if (
          options[i].innerText.toLocaleLowerCase() ===
          _object.innerText.toLocaleLowerCase()
        ) {
          options[i].setAttribute("selected", "selected");
          selectElement.dispatchEvent(new Event("change"));
          break;
        }
      }
    } else {
      console.error("Null element found in elements array");
    }
  });
}

async function input(_object, elements) {
  if (!elements || elements.length === 0) {
    console.error("No elements found to input value");
    return;
  }

  // Set the value of the first non-null element
  for (let i = 0; i < elements.length; i++) {
    if (elements[i]) {
      elements[i].value = _object.input;
      return; 
    }
  }
  console.error("All elements in elements array are null");
}

async function style(_object, elements) {
  if (!elements || elements.length === 0) {
    console.error("No elements found to select");
    return;
  }
}


async function style(_object, elements) {
  console.log("style", elements);
  let elementChanged = false;

  if (_object.identifier === 'tr') {
    for (let i = 0; i < elements.length; i++) {
      if (
        elements[i].innerText
          .toLocaleLowerCase()
          .includes(_object.innerText.toLocaleLowerCase())
      ) {
        const linkElements = elements[i].querySelectorAll("a");
        if (linkElements != null && linkElements.length > 0) {
          for (let z = 0; z < linkElements.length; z++) {
            if (
              linkElements[z].innerText &&
              linkElements[z].innerText
                .toLocaleLowerCase()
                .includes(_object.innerText.toLocaleLowerCase())
            ) {
              elements[i].style.backgroundColor = _object.color;
              elementChanged = true;
              console.log("BOLD ELEMENT..", linkElements[z]);
            }
          }
        }
      }
    }
  } else {
    for (let i = 0; i < elements.length; i++) {
      if (
        elements[i].innerText
          .toLocaleLowerCase()
          .includes(_object.innerText.toLocaleLowerCase())
      ){
        elements[i].style.backgroundColor = _object.color;
        elementChanged = true;
      }
    }
  }
  return elementChanged;
}
