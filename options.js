//########################## Form Section ######################################

let sectionCount = 0;

function cloneNode() {
    sectionCount++;
    const originalSection = document.querySelector('.automation-section');
    const newSection = originalSection.cloneNode(true);
    newSection.id = 'automation' + sectionCount;

    const deleteIcon = newSection.querySelector('.bi-trash');
    deleteIcon.style.display = 'inline-block';

    deleteIcon.addEventListener('click', () => {
        newSection.remove();
    });
    
    document.getElementById('automation').appendChild(newSection);
}

document.getElementById("addNewLine").addEventListener('click', cloneNode);

function deleteLastNode(){
    const allSection = document.querySelectorAll('.automation-section');
    if (allSection.length > 1){
        const lastSection = allSection[allSection.length - 1];
        lastSection.parentNode.removeChild(lastSection);
    }
}

document.getElementById('deleteLine').addEventListener('click', deleteLastNode);

//########################## Push Section ######################################

document.getElementById("submit").addEventListener('click', (event) => {
    event.preventDefault();
    const sections = document.querySelectorAll('.automation-section');
    const data = [];

    sections.forEach(section => {
        const command = section.querySelector('.command').value;
        const selectorType = section.querySelector('.selector-type').value;
        const identifier = section.querySelector('.identifier').value;
        const innerText = section.querySelector('.inner-text').value;
        const input = section.querySelector('.input').value;
        const timeout = section.querySelector('.timeout').value;
        const color = section.querySelector('.color').value;

        data.push({ command, selectorType, identifier, innerText, input, timeout, color });
    });

    console.log(data);
    // Here you can send 'data' to your database
});