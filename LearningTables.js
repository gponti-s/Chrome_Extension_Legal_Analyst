var myElements = {
    sentenca: {name: "EXTINTA A EXECUÇÃO OU O CUMPRIMENTO DA SENTENÇA", color: "lightblue", textSize: ''},
    termoDePenhora: {name: "Termo de Penhora", color: "lightred", textSize: ''}

}

function changeBackgroundColor (color) {
    Array.from(document.getElementsByClassName('masterBlockSubInfoHorz')).forEach(function(element) {
        element.style.backgroundColor = color;
    });    
};

function highlightRow (row, _background){
    row.style.background = _background; // highlight only the row
    row.style.borderColor = "thick solid #0000FF";
};


Array.from(document.getElementsByTagName('tr')).forEach(function(row) {
    var i = 0;
    Array.from(row.querySelectorAll('td')).forEach(function(cel){
        i++;
        //console.log("Cel",i, cel.innerText.split()); // Cells
        //console.log(cel.querySelector('b')); // Bold
        //console.log(cel.querySelector('a')); // links
        if (cel.innerText.includes(myElements.sentenca.name)){
            highlightRow(row, myElements.sentenca.color);
            changeBackgroundColor('blue');
            //alert('sentenca');       
        };
    });
});
