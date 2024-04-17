// import emoji from './emojiDb.json';

const emoji = {
  crossMark: "\u274c",
  checkMark: "\u2713",
  alertMark: "\u26d4",
  arrow: "\u27a1",
};

const myFilters = {
  citacao: {
    label: "Citação",
    types: {
      positiva: {
        searchFor: ["Leitura de citação realizada"],
        searchForBold: [
          "EXPEDIÇÃO DE EDITAL/CITAÇÃO",
          "JUNTADA DE CITAÇÃO CUMPRIDA",
        ],
        color: "lightgreen",
        flag: false,
      },
      negativa: {
        searchFor: ["Devolução sem Leitura - Referente a CITAÇÃO"],
        searchForBold: [],
        color: "red",
        flag: false,
      },
      citacaoMandado: {
        searchFor: ["Ato ordinatorio 2.7"],
        searchForBold: ["JUNTADA DE ANÁLISE DE DECURSO DE PRAZO"],
        color: "lightgreen",
        flag: false,
      },
    },
  },
  penhoraDeValores: {
    label: "Penhora de Valores",
    types: {
      sisbajud: {
        searchFor: [
          "Resultado: Frutífero.",
          "Resultado: Parcialmente Frutífero.",
        ],
        searchForBold: [
          "JUNTADA DE PENHORA REALIZADA BACENJUD",
          "EXPEDIÇÃO DE TRANSFERÊNCIA BACENJUD",
          "JUNTADA DE PENHORA REALIZADA sisbajud/SISBAJUD",
        ],
        color: "yellow",
        flag: false,
      },
      termoDePenhoraValores: {
        searchFor: [],
        searchForBold: ["OFÍCIO DE PENHORA NO ROSTO DOS AUTOS"],
        color: "yellow",
        flag: false,
      },
    },
  },
  serasajud: {
    label: "Serasajud",
    types: {
      inclusao: {
        searchFor: [],
        searchForBold: ["EXPEDIÇÃO DE OFÍCIO SERASAJUD (INCLUSÃO)"],
        color: "#FFEA00",
        flag: false,
      },
    },
  },
  cnib: {
    label: "CNIB",
    types: {
      busca: {
        searchFor: [],
        searchForBold: ["EXPEDIÇÃO DE BUSCA CNIB"],
        color: "#FFFF8F",
        flag: false,
      },
    },
  },
  penhroaDeImovel: {
    label: "Penhora de Imóveis",
    types: {
      termoDePenhora: {
        searchFor: [],
        searchForBold: ["TERMO DE PENHORA"],
        color: "#DBCEE1",
        flag: false,
      },
      registroDaPenhora: {
        searchFor: ["Agente Delegado"],
        searchForBold: [],
        color: "",
        flag: false,
      },
    },
  },
  mandado: {
    label: "Mandados",
    types: {
      devolvido: {
        searchFor: [],
        searchForBold: ["MANDADO DEVOLVIDO"],
        color: "#DDF6DF",
        flag: false,
      },
    },
  },
  decisaoTerminativa: {
    label: "Sentença/Acórdão/Trânsito",
    types: {
      sentenca: {
        searchFor: ["Registro em"],
        searchForBold: [],
        color: "lightblue",
        flag: false,
      },
      acordao: {
        searchFor: [],
        searchForBold: ["JUNTADA DE ACÓRDÃO"],
        color: "lightblue",
        flag: false,
      },
      transitoEmJulgado: {
        searchFor: [],
        searchForBold: ["TRANSITADO EM JULGADO EM"],
        color: "lightblue",
        flag: false,
      },
      baixaDefinitiva: {
        searchFor: [],
        searchForBold: ["JUNTADA DE ANOTAÇÃO DE BAIXA DEFINITIVA"],
        color: "lightblue",
        flag: false,
      },
    },
  },
  precatorio: {
    label: "Precatório",
    types: {
      busca: {
        searchFor: [],
        searchForBold: [
          "EVOLUÍDA A CLASSE DE EXECUÇÃO FISCAL PARA CUMPRIMENTO DE SENTENÇA",
          "EVOLUÍDA A CLASSE DE EMBARGOS À EXECUÇÃO FISCAL PARA CUMPRIMENTO DE SENTENÇA",
          // "JUNTADA DE CUSTAS",
          "EXPEDIÇÃO DE PRECATÓRIO - REQUISITÓRIO",
        ],
        color: "lightpink",
        flag: false,
      },
    },
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
  document.getElementById("aac1").appendChild(newInput);
  document.getElementById("aac1").appendChild(newLabel);
  return newInput;
}

async function checkAll(checkbox) {
  checkbox.addEventListener("change", () => {
    document.getElementById("gruposRealceFiltroJUIZ").click();
    Object.entries(myFilters).forEach(async function (key) {
      const item = document.getElementById(key[0]);
      item.checked = checkbox.checked === true;
      _ = await searchFor(item);
    });
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

async function updateRow(checkbox, row, type, isOddRow) {
  clickIcon(row);
  type.flag = true;
  row.style.background = checkbox.checked
    ? type.color
    : isOddRow
    ? "#E6E1C6"
    : "#FFF";
  updateFilterLabel(checkbox);
}

function updateFilterLabel(checkbox) {
  const labels = document.getElementsByTagName("label");
  Array.from(labels).forEach((label) => {
    if (label.innerText === myFilters[checkbox.id].label) {
      label.style.color = "darkgreen";
      label.style.fontWeight = "bold";
      label.style.textDecoration = "underline";
      label.innerText = myFilters[checkbox.id].label + " " + emoji.checkMark;
    }
  });
}

async function checkCitacaoMandado(checkbox, row, type, isOddRow) {
  for (const hideElement of document.querySelectorAll('tr[id^="rowmovimentacoes"]')) {
    for (const links of hideElement.querySelectorAll('a')) {
      if (links.innerText.includes(type.searchFor[0])) {
        _ = await updateRow(checkbox, row, type, isOddRow);  type.flag = true;
        links.style.background = type.color;
        updateFilterLabel(checkbox);
        //clickIcon(row);
        return true;
      }
    }
  }
  return false;
}


// TODO - rewrite this function
function clickIcon(row) {
  // if (row.querySelector("b").innerText.includes("Realces")) {
  //   return true;
  // }
  let iconLink = row.querySelector('td a img[id^="iconmovimentacoes"]');
  if (iconLink) {
    iconLink.click();
  } else {
    //console.error("Icon link not found:", row);
  }
  return true;
}

async function searchFor(checkbox) {
  const filter = myFilters[checkbox.id];
  // const rows = document.querySelectorAll('[id^="mov1Grau,"]');
  // console.log("rowG: ", rows[0]);
  // for (const row of rows) {
  //   let cells = row.querySelectorAll("td")
  //   for (let cell of cells){
  //     //console.log("cell", cell);
  //     let iconLink = cell.querySelector('td a img[id^="iconmovimentacoes"]');
  //     //console.log("iconLink", iconLink);
  //     const boldElements = cell.querySelectorAll("b");
  //     for(let element of boldElements){
  //       //console.log("boldG: ", element.innerText);
  //     }
  //   }
  // }
  
  Array.from(document.querySelectorAll('tr[id^="mov1Grau"]')).forEach(async function (row) {    
    Array.from(row.querySelectorAll("b")).forEach(async function (boldElement) {
      const isOddRow = row.className.toLowerCase().includes("odd");
      for (const type of Object.values(filter.types)) {
        for (const arg of type.searchFor) {
          if (row.innerText.toLowerCase().includes(arg.toLowerCase())) {
            _ = await updateRow(checkbox, row, type, isOddRow);
          }
        }
        for (const arg of type.searchForBold) {
          if (
            boldElement.innerText
              .toLocaleLowerCase()
              .includes(arg.toLocaleLowerCase())
          ) {
            // TODO: review this if
            if (
              type.searchForBold[0] === "JUNTADA DE ANÁLISE DE DECURSO DE PRAZO"
            ) {
              clickIcon(row);
              setTimeout(async function () {
                await checkCitacaoMandado(checkbox, row, type, isOddRow) ? await updateRow(checkbox, row, type, isOddRow) : "";
              }, 500);
            } else {
              _ = await updateRow(checkbox, row, type, isOddRow);
            }
          }
        }
      }
    });
  });
  return true;
}

function addEvent(checkbox) {
  checkbox.addEventListener("change", () => {
    searchFor(checkbox);
  });
}
async function filtersTitle() {
  const filtersTitle = document.createElement("b");
  filtersTitle.innerText = "Filtros Personalizados: ";
  document.getElementById("aac1").appendChild(filtersTitle);
  document.getElementById("aac1").appendChild(document.createElement("span"));
  return;
}

async function main() {
  _ = await filtersTitle();
  Object.entries(myFilters).forEach(function ([key, value]) {
    const checkbox = newCheckbox(key, value.label);
    addEvent(checkbox);
  });
  checkAll(newCheckbox("checkAll", "TODOS"));
}

main();
