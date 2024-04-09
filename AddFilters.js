const myFilters = {
  citacao: {
    label: "Citação",
    searchArg: [
      "Leitura de citação realizada",
      "EXPEDIÇÃO DE EDITAL/CITAÇÃO",
      "JUNTADA DE CITAÇÃO CUMPRIDA",
      "JUNTADA DE ANÁLISE DE DECURSO DE PRAZO",
    ],
    color: "lightgreen",
    flag: false,
  },
  sisbajud: {
    label: "Sisbajud/Bacenjud",
    searchArg: [
      "JUNTADA DE PENHORA REALIZADA BACENJUD",
      "EXPEDIÇÃO DE TRANSFERÊNCIA BACENJUD",
      "Resultado: Frutífero.",
      "Resultado: Parcialmente Frutífero.",
      "JUNTADA DE PENHORA REALIZADA sisbajud/SISBAJUD",
    ],
    color: "yellow",
    flag: false,
  },
  serasajud: {
    label: "Serasajud",
    searchArg: ["EXPEDIÇÃO DE OFÍCIO SERASAJUD (INCLUSÃO)"],
    color: "#FFEA00",
    flag: false,
  },
  cnib: {
    label: "cnib",
    searchArg: ["EXPEDIÇÃO DE BUSCA CNIB"],
    color: "#FFFF8F",
    flag: false,
  },
  termoDePenhora: {
    label: "Termo de Penhora",
    searchArg: ["TERMO DE PENHORA"],
    color: "#DBCEE1",
    flag: false,
  },
  sentenca: {
    label: "Sentença / Acórdão / Trânsito",
    searchArg: [
      "Registro em",
      "JUNTADA DE ACÓRDÃO",
      "TRANSITADO EM JULGADO EM",
      "JUNTADA DE ANOTAÇÃO DE BAIXA DEFINITIVA",
    ],
    color: "#lightblue",
    flag: false,
  },
};

function newButton(idName, _textContent, onClickFunction) {
  const newButton = document.createElement("button");
  newButton.id = idName;
  newButton.textContent = _textContent;
  newButton.addEventListener("click", function (event) {
    event.preventDefault();
    onClickFunction();
  });
  document.getElementById("informacoesProcessuais").appendChild(newButton);
}

function newCheckbox(idName, _innerText) {
  const newInput = document.createElement("input");
  const newLabel = document.createElement("label");
  newInput.type = "checkbox";
  newInput.checked = false;
  newInput.id = idName;
  newLabel.for = idName;
  newLabel.innerText = _innerText;
  newLabel.style.padding = "0.8vh";
  newLabel.style.fontWeight = "bold";
  document.getElementById("informacoesProcessuais").appendChild(newInput);
  document.getElementById("informacoesProcessuais").appendChild(newLabel);
  document
    .getElementById("informacoesProcessuais")
    .appendChild(document.createElement("br"));

  return newInput;
}

async function checkAll(checkbox) {
  checkbox.addEventListener("change", () => {
    Object.entries(myFilters).forEach(async function (key) {
      console.log(key);
      const item = document.getElementById(key[0]);
      item.checked = checkbox.checked === true;
      _ = await findEvents(item);
    });
  });
}

function addEvent(checkbox) {
  checkbox.addEventListener("change", () => {
    findEvents(checkbox);
  });
}

function changeBackgroundColor(color, _inputId) {
  Array.from(document.getElementsByClassName("masterBlockSubInfoHorz")).forEach(
    function (element) {
      if (_inputId.checked === true) {
        element.style.backgroundColor = color;
      } else {
        element.style.backgroundColor = "#F3F3E2";
      }
    }
  );
}

function clickIcon(row) {
  if (row.querySelector("b").innerText.includes("Realces")) {
    return;
  }
  var iconLink = row.querySelector('td a img[id^="iconmovimentacoes"]');
  if (iconLink) {
    iconLink.click();
  }
}

async function findEvents(checkbox) {
  const myElement = myFilters[checkbox.id];
  Array.from(document.getElementsByTagName("tr")).forEach(function (row) {
    const isOddRow = row.className.toLowerCase().includes("odd");
    const color = checkbox.checked
      ? myElement.color
      : isOddRow
      ? "#E6E1C6"
      : "#FFF";
    myElement.searchArg.forEach(function (arg) {
      if (row.innerText.toLowerCase().includes(arg.toLowerCase())) {
        clickIcon(row);
        myElement.flag = true;
        row.style.background = color;
      }
    });
  });
  return true;
}

function main() {
  Object.entries(myFilters).forEach(function ([key, value]) {
    const checkbox = newCheckbox(key, value.label);
    addEvent(checkbox);
  });
  checkAll(newCheckbox("checkAll", "TODOS"));
}

main();
//#E6E1C6 tr className: odd
// #FFF tr className: even
