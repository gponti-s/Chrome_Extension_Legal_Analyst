var myColors = {
  0: 'lightgray',
  1: 'lightblue',
  2: 'lightgreen',
  3: 'lightyellow',
};

function refreshPage() {
    location.reload();
}

function getRows(){
    return Array.from(document.getElementsByTagName('tr'));
};

function getCells(){
    return Array.from(document.getElementsByTagName('td'));
};

function highlightRow(row, _background) {
  row.style.background = _background; // highlight only the row
  row.style.borderColor = "thick solid #0000FF";
}

function rowColorChange(){
    var i = 0;
    var rows = getRows()
    rows.forEach(row => highlightRow(row, myColors[i++]));
};


function cellTextChange() {
    var cells = getCells();
    var i = 0;
    cells.forEach(function (cel) {
        cel.innerText = i;
        i++;
    });
}

function boldTextChange() {
    var cells = getCells();
    cells.forEach(cell => {
        var boldElements = cell.getElementsByTagName('b');
        Array.from(boldElements).forEach(boldElement => {
            boldElement.style.background = 'red';
        });
    });
}

function linkTextChange() {
    var cells = getCells();
    cells.forEach(cell => {
        var boldElements = cell.getElementsByTagName('a');
        Array.from(boldElements).forEach(boldElement => {
            boldElement.style.background = 'pink';
        });
    });
}
