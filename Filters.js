const emoji = {
  crossMark: "\u274c",
  checkMark: "\u2713",
  alertMark: "\u26d4",
  arrow: "\u27a1",
  lightning: "\u26A1",
  ice: "🥶",
  hammer: "🧐",
};

// TODO: include renajud
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
        clickOn: true,
      },
      negativa: {
        searchFor: ["Devolução sem Leitura - Referente a CITAÇÃO"],
        searchForBold: [],
        color: "red",
        flag: false,
        clickOn: true,
      },
      citacaoMandado: {
        searchFor: ["Ato ordinatorio 2.7"],
        searchForBold: ["JUNTADA DE ANÁLISE DE DECURSO DE PRAZO"],
        color: "lightgreen",
        flag: false,
        clickOn: true,
      },
      peticaoInicial: {
        searchFor: [],
        searchForBold: ["JUNTADA DE PETIÇÃO DE INICIAL"],
        color: "",
        flag: false,
        clickOn: true,
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
        clickOn: true,
      },
      desbloqueioSisbajud: {
        searchFor: [],
        searchForBold: [
          "EXPEDIÇÃO DE DESBLOQUEIO SISBAJUD",
          "JUNTADA DE PENHORA SOLICITADA BACENJUD",
          "EXPEDIÇÃO DE BACENJUD - BLOQUEIO AUTOMATIZADO",
          "EXPEDIÇÃO DE BACENJUD BLOQUEIO - AUTOMATIZADO",
          "EXPEDIÇÃO DE SISBAJUD - BLOQUEIO AUTOMATIZADO",
          "EXPEDIÇÃO DE DESBLOQUEIO BACENJUD",
          "JUNTADA DE PENHORA NÃO REALIZADA BACENJUD/SISBAJUD",
          "JUNTADA DE PENHORA NÃO REALIZADA BACENJUD",
          "EXPEDIÇÃO DE BLOQUEIO BACENJUD",
        ],
        color: "#fefed2",
        flag: false,
        clickOn: true,
      },
      termoDePenhoraValores: {
        searchFor: [],
        searchForBold: ["EXPEDIÇÃO DE OFÍCIO PENHORA NO ROSTO DOS AUTOS"],
        color: "yellow",
        flag: false,
        clickOn: true,
      },
    },
  },
  serasajud: {
    label: "Serasajud",
    types: {
      inclusao: {
        searchFor: [],
        searchForBold: [
          "EXPEDIÇÃO DE OFÍCIO SERASAJUD (INCLUSÃO)",
          "EXPEDIÇÃO DE OFÍCIO SERAJUD (INCLUSÃO)",
        ],
        color: "#ff00b3",
        flag: false,
        clickOn: true,
      },
      oficioOutrosOrgaos: {
        searchFor: [],
        searchForBold: ["JUNTADA DE OFÍCIO DE OUTROS ÓRGÃOS"],
        color: "",
        flag: false,
        clickOn: true,
      },
      exclusao: {
        searchFor: [],
        searchForBold: ["OFÍCIO SERASAJUD (EXCLUSÃO)", "EXPEDIÇÃO DE OFÍCIO SERAJUD (EXCLUSÃO)"],
        color: "#f78dd8",
        flag: false,
        clickOn: false,
      },
    },
  },
  cnib: {
    label: "CNIB",
    types: {
      busca: {
        searchFor: [],
        searchForBold: ["EXPEDIÇÃO DE BUSCA CNIB", "EXPEDIÇÃO DE BLOQUEIO CNIB"],
        color: "#FFFF8F",
        flag: false,
        clickOn: true,
      },
    },
  },
  renajud: {
    label: "RENAJUD",
    types: {
      bloqueio: {
        searchFor: [],
        searchForBold: ["EXPEDIÇÃO DE BLOQUEIO RENAJUD", "JUNTADA DE RESTRIÇÃO REALIZADA NO RENAJUD"],
        color: "#a17a74",
        flag: false,
        clickOn: true,
      },
      busca: {
        searchFor: [],
        searchForBold: ["EXPEDIÇÃO DE BUSCA RENAJUD"],
        color: "#dbc4c1",
        flag: false,
        clickOn: true,
      },
      buscaEndereco: {
        searchFor: [],
        searchForBold: ["JUNTADA DE CONSULTA REALIZADA NO RENAJUD"],
        color: "",
        flag: false,
        clickOn: true,
      },
    },
  },
  penhroaDeImovel: {
    label: "Penhora de Imóveis",
    types: {
      termoDePenhora: {
        searchFor: [],
        searchForBold: ["TERMO DE PENHORA"],
        color: "#D0BBD9",
        flag: false,
        clickOn: true,
      },
      registroDaPenhora: {
        searchFor: ["LEITURA DE TERMO DE PENHORA REALIZADA"],
        searchForBold: ["Agente Delegado"],
        color: "",
        flag: false,
        clickOn: true,
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
        clickOn: true,
      },
    },
  },
  avaliador: {
    label: "Avaliador",
    types: {
      devolvido: {
        searchFor: [],
        searchForBold: ["JUNTADA DE LAUDO"],
        color: "#E8DAEF",
        flag: false,
        clickOn: true,
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
        clickOn: true,
      },
      acordao: {
        searchFor: [],
        searchForBold: ["JUNTADA DE ACÓRDÃO"],
        color: "lightblue",
        flag: false,
        clickOn: true,
      },
      transitoEmJulgado: {
        searchFor: [],
        searchForBold: ["TRANSITADO EM JULGADO EM"],
        color: "lightblue",
        flag: false,
        clickOn: true,
      },
      baixaDefinitiva: {
        searchFor: [],
        searchForBold: ["JUNTADA DE ANOTAÇÃO DE BAIXA DEFINITIVA"],
        color: "lightblue",
        flag: false,
        clickOn: true,
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
        clickOn: true,
      },
    },
  },
  suspensao: {
    label: "Suspensão",
    types: {
      devolvido: {
        searchFor: [],
        searchForBold: ["PROCESSO SUSPENSO"],
        color: "lightgray",
        flag: false,
        clickOn: false,
      },
    },
  },
  cartaPrecatoria: {
    label: "Carta Precatória",
    types: {
      devolvido: {
        searchFor: ["Análise de Retorno de Carta Eletrônica"],
        searchForBold: ["JUNTADA DE CARTA PRECATÓRIA", "JUNTADA DE DEVOLUÇÃO DE CARTA PRECATÓRIA"],
        color: "#ffdbbb",
        flag: false,
        clickOn: false,
      },
    },
  },
};


//TODO:
// Inicializer at refresh to check Filter building
// send a menssage to worker server to get the filterFlagValue
// if true, build Filter (Object: constructor ?)

// Move the Myfilters to chrome storage;
// get data from the worker server

// Update function to build and destroy (delete) Filter

//############################# Setup Center ####################################




//############################# Message Center ####################################

chrome.runtime.onMessage.addListener(async function (
  request,
  sender,
  sendResponse
) {
  switch (request.action) {
    case "filterUpdatetrue":
      //main();
      console.log("message received by filter");
      break;
    default:
      console.error("Unknown action:", request.action);
      sendResponse(undefined);
  }
});


//############################# Building Center ####################################

// function newButton(idName, _textContent, onClickFunction) {
//   const newButton = document.createElement("button");
//   newButton.id = idName;
//   newButton.textContent = _textContent;
//   newButton.addEventListener("click", function (event) {
//     event.preventDefault();
//     onClickFunction();
//   });
//   document.getElementById("informacoesProcessuais").appendChild(newButton);
// }

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

function addEvent(checkbox) {
  checkbox.addEventListener("change", () => {
    searchFor(checkbox);
  });
}
async function filtersTitle() {
  const filtersTitle = document.createElement("b");
  filtersTitle.innerText = `${emoji.lightning}Filtros Personalizados:`;
  filtersTitle.title = `${emoji.alertMark}Atenção${emoji.alertMark}\nEstes filtros não fazem parte originalmente do Projudi, foram inseridos pela Extensão do Chrome chamada Proudji - Filtros Personalizados.`;
  document.getElementById("aac1").appendChild(filtersTitle);
  document.getElementById("aac1").appendChild(document.createElement("span"));
  return;
}


//############################# Processing Center ####################################

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
  if (type.clickOn == true) {
    clickIcon(row);
  }
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
  for (const hideElement of document.querySelectorAll(
    'tr[id^="rowmovimentacoes"]'
  )) {
    for (const links of hideElement.querySelectorAll("a")) {
      if (links.innerText.includes(type.searchFor[0])) {
        _ = await updateRow(checkbox, row, type, isOddRow);
        type.flag = true;
        links.style.background = type.color;
        updateFilterLabel(checkbox);
        //clickIcon(row);
        return true;
      }
    }
  }
  return false;
}

//TODO: implement Try/Catch in this function
async function checkPendencias() {
  pendencia = document.getElementById("quadroPendencias");
  if (pendencia.innerText.toLocaleLowerCase().includes("suspensão")) {
    pendencia.style.color = "red";
    pendencia.style.fontWeight = "bold";
    //alert(`${emoji.alertMark}Atenção${emoji.alertMark}\n${emoji.ice} Processo Suspenso`);
  } else if (
    pendencia.innerText.toLocaleLowerCase().includes("hasta") ||
    pendencia.innerText.toLocaleLowerCase().includes("leilão")
  ) {
    pendencia.style.color = "red";
    pendencia.style.fontWeight = "bold";

    //       alert(`${emoji.alertMark}Atenção${emoji.alertMark}\n${emoji.hammer} Leilão Designado \n\nConfira as datas em:
    // https://docs.google.com/spreadsheets/d/1L8QdCiRvhWyDBfe2xtcVJFcK_zA1NLc14_wjUvWlwjc/edit?usp=sharing`);
  }
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


//############################# Search Engine Center ####################################

function searchBoldText(_innerText, color){
  let result = false;
  // TODO: need to check the iframe
  let rows = document.querySelectorAll('table.resultTable > tbody > tr');
  
  rows.forEach((row) => {
      let tds = row.querySelectorAll('td > b');  
      let found = Array.from(tds).filter(el => el.innerText.toLocaleLowerCase() === _innerText.toLocaleLowerCase());
      
      if(found.length > 0) {
          row.style.backgroundColor = color;
          result = true;
      }
  });
  return result;  
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

  Array.from(document.querySelectorAll('tr[id^="mov1Grau"]')).forEach(
    async function (row) {
      Array.from(row.querySelectorAll("b")).forEach(async function (
        boldElement
      ) {
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
                type.searchForBold[0] ===
                "JUNTADA DE ANÁLISE DE DECURSO DE PRAZO"
              ) {
                clickIcon(row);
                setTimeout(async function () {
                  (await checkCitacaoMandado(checkbox, row, type, isOddRow))
                    ? await updateRow(checkbox, row, type, isOddRow)
                    : "";
                }, 500);
              } else {
                _ = await updateRow(checkbox, row, type, isOddRow);
              }
            }
          }
        }
      });
    }
  );
  return true;
}


//############################# Management Center ####################################

async function main() {
  chrome.storage.local.get(['filter'], async function(result) {
    const filterFlag = result.filter; // Assuming 'filter' is the key in storage
    console.log('Filter flag:', filterFlag);
    if(filterFlag == true){
    _ = await filtersTitle();
    Object.entries(myFilters).forEach(function ([key, value]) {
      const checkbox = newCheckbox(key, value.label);
      addEvent(checkbox);
    });
    const newCheckAll = newCheckbox("checkAll", "TODOS")
    checkAll(newCheckAll);
    //_ = await checkPendencias();
    //TODO: temporary => to keep the checkAll checked
    newCheckAll.click();
  } else{
    //newCheckAll.click();
  }
  });

}

main();
