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
        searchFor: [
          "Leitura de citação realizada",
          "EXPEDIÇÃO DE EDITAL/CITAÇÃO",
          "JUNTADA DE CITAÇÃO CUMPRIDA",
          "JUNTADA DE ANÁLISE DE DECURSO DE PRAZO",
        ],
        color: "lightgreen",
        flag: false,
      },
      negativa: {
        searchFor: ["Devolução sem Leitura - Referente a CITAÇÃO"],
        color: "red",
        flag: false,
      },
    },
  },
  penhoraDeValores: {
    label: "Penhora de Valores",
    types: {
      sisbajud: {
        searchFor: [
          "JUNTADA DE PENHORA REALIZADA BACENJUD",
          "EXPEDIÇÃO DE TRANSFERÊNCIA BACENJUD",
          "Resultado: Frutífero.",
          "Resultado: Parcialmente Frutífero.",
          "JUNTADA DE PENHORA REALIZADA sisbajud/SISBAJUD",
        ],
        color: "yellow",
        flag: false,
      },
      termoDePenhoraValores: {
        searchFor: ["OFÍCIO DE PENHORA NO ROSTO DOS AUTOS"],
        color: "yellow",
        flag: false,
      },
    },
  },
  serasajud: {
    label: "Serasajud",
    types: {
      inclusao: {
        searchFor: ["EXPEDIÇÃO DE OFÍCIO SERASAJUD (INCLUSÃO)"],
        color: "#FFEA00",
        flag: false,
      },
    },
  },
  cnib: {
    label: "CNIB",
    types: {
      busca: {
        searchFor: ["EXPEDIÇÃO DE BUSCA CNIB"],
        color: "#FFFF8F",
        flag: false,
      },
    },
  },
  penhroaDeImovel: {
    label: "Penhora de Imóveis",
    types: {
      termoDePenhora: {
        searchFor: ["TERMO DE PENHORA"],
        color: "#DBCEE1",
        flag: false,
      },
      registroDaPenhora: {
        searchFor: ["Agente Delegado"],
        color: "#DBCEE1",
        flag: false,
      },
    },
  },
  decisaoTerminativa: {
    label: "Sentença/Acórdão/Trânsito",
    types: {
      sentenca: {
        searchFor: ["Registro em"],
        color: "#lightblue",
        flag: false,
      },
      acordao: {
        searchFor: ["JUNTADA DE ACÓRDÃO"],
        color: "#lightblue",
        flag: false,
      },
      transitoEmJulgado: {
        searchFor: ["TRANSITADO EM JULGADO EM"],
        color: "#lightblue",
        flag: false,
      },
      baixaDefinitiva:{
        searchFor: ["JUNTADA DE ANOTAÇÃO DE BAIXA DEFINITIVA"],
        color: "#lightblue",
        flag: false,
      }
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
    Object.entries(myFilters).forEach(async function (key) {
      console.log(key);
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

async function updateRow(checkbox, row, filter, isOddRow){
  for (const type of Object.values(filter.types)) {
    for (const arg of type.searchFor) {
      if (row.innerText.toLowerCase().includes(arg.toLowerCase())) {
        _ = await clickIcon(row);
        type.flag = true;
        row.style.background = checkbox.checked
        ? type.color
        : isOddRow
        ? "#E6E1C6"
        : "#FFF";
        const labels = document.getElementsByTagName('label')
        Array.from(labels).forEach((label) =>{
          if (label.innerText === myFilters[checkbox.id].label) {
            label.style.color = "darkgreen";
            label.style.fontWeight = 'bold';
            label.style.textDecoration = "underline";
            label.innerText = myFilters[checkbox.id].label + " "+ emoji.checkMark;
          }
        })
      }
    }
  }
}

// TODO - rewrite this function
async function clickIcon(row) {
  if (row.querySelector("b").innerText.includes("Realces")) {
    return;
  }
  var iconLink = row.querySelector('td a img[id^="iconmovimentacoes"]');
  if (iconLink) {
    iconLink.click();
  }
  return true;
}

async function searchFor(checkbox) {
  const filter = myFilters[checkbox.id];
  Array.from(document.getElementsByTagName("tr")).forEach(async function (row) {
    const isOddRow = row.className.toLowerCase().includes("odd");
          _ = await updateRow(checkbox, row, filter, isOddRow)

  });
  return true;
}

function addEvent(checkbox) {
  checkbox.addEventListener("change", () => {
    searchFor(checkbox);
  });
}
async function filtersTitle(){
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
