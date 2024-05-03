let pageLoaded = false;
console.log("sarting....", pageLoaded);
window.addEventListener("load", () => (pageLoaded = true));

// Listen for messages from the background script
chrome.runtime.onMessage.addListener(async function (
  request,
  sender,
  sendResponse
) {
  switch (request.action) {
    case "load":
      sendResponse({ Text: "loaded", Boolean: pageLoaded });
      console.log("pageLoad: ", pageLoaded);
      break;
    case "changeColor":
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

function selectElement(selectorType, identifier) {
  let selector = "";

  switch (selectorType) {
    case "class":
      selector = `.${identifier}`;
      break;
    case "tag":
      selector = identifier; // Select by tag name
      break;
    case "partialId":
      selector = `[id*="${identifier}"]`;
      break;
    case "onclick":
      selector = `[onclick*="${identifier}"]`;
      break;
    case "title":
      selector = `[title="${identifier}"]`;
    default:
      // Default to selecting by id
      selector = `#${identifier}`;
      break;
  }
  return selector;
}

async function automation(_object) {
  if (_object == undefined) {
    return undefined;
  }
  let seletor = selectElement(_object.selectorType, _object.identifier);
  switch (_object.command) {
    case "click":
      return await clickElement(_object, seletor);
    case "delay":
      return await delay(_object);
    case "select":
      return await selectOption(_object, seletor);
      case "input":
        return await input(_object, seletor);
    default:
      // Handle unknown action
      console.error("Unknown action:", request.action);
      sendResponse(undefined);
  }
  return false;
}

async function clickElement(_object, selector) {
  console.log("selector", selector);
  const elements = document.querySelectorAll(selector);
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

async function delay(_object) {
  await new Promise((resolve) => setTimeout(resolve, _object.delay));
}

async function selectOption(_object, selector) {
  let selectElement = document.querySelector(selector);

  let options = selectElement.options;
  for (let i = 0; i < options.length; i++) {
    if (options[i].innerText.toLocaleLowerCase() === _object.innerText.toLocaleLowerCase()) {
      //options[i].selected = "selected";
      options[i].setAttribute('selected', 'selected');
      selectElement.dispatchEvent(new Event('change'));
      break;
    }
  }
}

async function input(_object, selector) {
  let inputElement = document.querySelector(selector);
  console.log("input:", inputElement);
  inputElement.value = _object.input;
}

// async function clickLink(_link) {
//   var links = document.querySelectorAll("a");
//   console.log("_LIMKK: ", _link);
//   for (var i = 0; i < links.length; i++) {
//     if (
//       links[i].innerText.toLocaleLowerCase().includes(_link.toLocaleLowerCase())
//     ) {
//       links[i].click();
//       return true;
//     }
//   }
//   console.log("Link not found:", _link);
//   return false;
// }
