const rowClasseProcessual = document.getElementsByClassName(
  "definitionClasseProcessual"
);

var classeProcessualExecucao = "1116 - Execução Fiscal";

const emoji = {
  crossMark: "\u274c",
  checkMark: "\u2705",
  alertMark: "\u26d4",
  arrow: "\u27a1",
};

const messages = {
  classeProcessualError: `${emoji.crossMark} Somente Execuções Fiscais são Analisadas\n`,
  citacaoError: `\n${emoji.alertMark} Procurar por:\n${emoji.arrow} Citação por Mandado mais Antigo\n${emoji.arrow} Decisão que Estende a Citação dos autos Principais\n${emoji.arrow} Parte Digitalizada dos autos\n${emoji.arrow} Citação por Carta Precatória`,
  citacao: `  Citação (carta, mandado, edital ou certidão)\n`,
  sisbajud: `  SisbaJud Frutífero\n`,
  termoDePenhora: `  Termo de Penhora\n`,
  sentenca: `  Sentenciado ou Com Baixa Definitiva\n`,
  acordao: `\n${emoji.alertMark}  Atenção - Acórdão nos autos\n`,
};

const myElements = {
  citacaoPositiva: {
    name: "Leitura de citação realizada",
    color: "lightgreen",
    textSize: "",
    boldTitle: false,
    flag: false,
  },
  citacaoNegativa: {
    name: "Devolução sem Leitura - Referente a CITAÇÃO",
    color: "red",
    textSize: "",
    boldTitle: false,
    flag: false,
  },
  citacaoEdital: {
    name: "EXPEDIÇÃO DE EDITAL/CITAÇÃO",
    color: "lightgreen",
    textSize: "",
    boldTitle: true,
    flag: false,
  },
  citacaoBalcao: {
    name: "JUNTADA DE CITAÇÃO CUMPRIDA",
    color: "lightgreen",
    textSize: "",
    boldTitle: true,
    flag: false,
  },
  citacaoMandado: {
    name: "JUNTADA DE ANÁLISE DE DECURSO DE PRAZO",
    color: "lightgreen",
    textSize: "",
    boldTitle: true,
    flag: false,
  },
  citacaoCartaPrecatoria: {
    name: "Análise de Retorno de Carta Eletrônica - Carta Precatória - Cumprimento: Positivo",
    color: "#d0fdd0",
    textSize: "",
    boldTitle: false,
    flag: false,
  },
  citacaoCartaPrecatoria1: {
    name: "JUNTADA DE DEVOLUÇÃO DE CARTA PRECATÓRIA",
    color: "#d0fdd0",
    textSize: "",
    boldTitle: true,
    flag: false,
  },
  sisbajud: {
    name: "JUNTADA DE PENHORA REALIZADA sisbajud/SISBAJUD",
    color: "yellow",
    textSize: "",
    boldTitle: true,
    flag: false,
  },
  termoDePenhora: {
    name: "TERMO DE PENHORA",
    color: "#DBCEE1",
    textSize: "",
    boldTitle: true,
    flag: false,
  },
  agenteDelegado: {
    name: "Agente Delegado",
    color: "",
    textSize: "",
    boldTitle: true,
    flag: false,
  },
  sentenca: {
    name: "Registro em",
    color: "lightblue",
    textSize: "",
    boldTitle: false,
    flag: false,
  },
  acordao: {
    name: "JUNTADA DE ACÓRDÃO",
    color: "lightblue",
    textSize: "",
    boldTitle: true,
    flag: false,
  },
  transitoJulgado: {
    name: "TRANSITADO EM JULGADO EM",
    color: "lightblue",
    textSize: "",
    boldTitle: true,
    flag: false,
  },
  baixaDefinitiva: {
    name: "JUNTADA DE ANOTAÇÃO DE BAIXA DEFINITIVA",
    color: "lightblue",
    textSize: "",
    boldTitle: true,
    flag: false,
  },
};

function clickIcon(row) {
  if (row.querySelector("b").innerText.includes("Realces")) {
    return;
  }
  var iconLink = row.querySelector('td a img[id^="iconmovimentacoes"]');
  if (iconLink) {
    iconLink.click();
  }
}

function changeBackgroundColor(color) {
  Array.from(document.getElementsByClassName("masterBlockSubInfoHorz")).forEach(
    function (element) {
      element.style.backgroundColor = color;
    }
  );
}

function highlightRow(row, _background) {
  row.style.background = _background;
  //row.style.borderColor = "thick solid #0000FF";
}

async function checkFlags() {
  changeBackgroundColor("lightgreen");

  if (myElements.sentenca.flag || myElements.baixaDefinitiva.flag) {
    changeBackgroundColor("lightblue");
  } else if (
    !myElements.citacaoPositiva.flag &&
    !myElements.citacaoEdital.flag &&
    !myElements.citacaoBalcao.flag &&
    !myElements.citacaoMandado.flag
  ) {
    changeBackgroundColor("red");
  }
  alertMessage();
}

async function alertMessage() {
  var emojiCitacao = emoji.checkMark;
  var emojiTermoDePenhora = emoji.checkMark;
  var emojiSisbaJud = emoji.checkMark;
  var emojiSentenca = emoji.checkMark;
  var citacaoTip = false;
  var acordaoTip = false;

  if (
    !myElements.citacaoPositiva.flag &&
    !myElements.citacaoEdital.flag &&
    !myElements.citacaoBalcao.flag &&
    !myElements.citacaoMandado.flag
  ) {
    emojiCitacao = emoji.crossMark;
    citacaoTip = true;
  }
  if (!myElements.sentenca.flag && !myElements.baixaDefinitiva.flag) {
    emojiSentenca = emoji.crossMark;
  }
  if (!myElements.termoDePenhora.flag) {
    emojiTermoDePenhora = emoji.crossMark;
  }
  if (!myElements.sisbajud.flag) {
    emojiSisbaJud = emoji.crossMark;
  }
  var standardText =
    emojiCitacao +
    messages.citacao +
    emojiSisbaJud +
    messages.sisbajud +
    emojiTermoDePenhora +
    messages.termoDePenhora +
    emojiSentenca +
    messages.sentenca;
  if (citacaoTip) {
    alert(standardText + messages.citacaoError);
  } else if (myElements.acordao.flag) {
    alert(standardText + messages.acordao);
  } else {
    alert(standardText);
  }
}

// TODO - Understand why junda de analise de prazo is turning green - 0060560-44.2020.8.16.0014
async function checkCitacaoMandado(row, _color) {
  Array.from(document.querySelectorAll("a")).forEach(function (link) {
    if (link.innerText.includes("Ato ordinatorio 2.7")) {
      myElements.citacaoMandado.flag = true;
      highlightRow(link, _color);
      highlightRow(row, _color);
      return;
    }
  });
}

async function findClasseProcessual() {
  var types = rowClasseProcessual;
  for (let type of types) {
    if (type.innerText) {
      return type;
    }
  }
  return null;
}

async function main() {
  document.getElementById("gruposRealceFiltroJUIZ").click();

  const classeProcessual = await findClasseProcessual();
  if (classeProcessual.innerText != classeProcessualExecucao) {
    alert(classeProcessual.innerText + "\n" + messages.classeProcessualError);
    highlightRow(classeProcessual, "#FFAEAE");
    return messages.classeProcessualError;
  } else {
    highlightRow(classeProcessual, "lightgreen");
  }

  Array.from(document.getElementsByTagName("tr")).forEach(function (row) {
    Array.from(row.querySelectorAll("td")).forEach(function (cel) {
      Object.keys(myElements).forEach(function (arg) {
        if (
          cel.innerText
            .toLowerCase()
            .includes(myElements[arg].name.toLowerCase())
        ) {
          if (myElements[arg].boldTitle) {
            Array.from(row.querySelectorAll("b")).forEach(function (bold) {
              if (
                bold.innerText
                  .toLowerCase()
                  .includes(myElements[arg].name.toLowerCase())
              ) {
                clickIcon(row);
                if (arg === "citacaoMandado") {
                  setTimeout(async function () {
                    checkCitacaoMandado(row, myElements[arg].color);
                  }, 1000);
                } else {
                  myElements[arg].flag = true;
                  highlightRow(row, myElements[arg].color);
                }
              }
            });
          } else {
            clickIcon(row);
            myElements[arg].flag = true;
            highlightRow(row, myElements[arg].color);
          }
        }
      });
    });
  });
  setTimeout(function () {
    checkFlags();
  }, 2000);
}

main();
