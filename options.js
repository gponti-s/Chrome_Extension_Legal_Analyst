document.getElementById("submit").addEventListener("click", () => {
    let newLine = document.createElement('section');
    newLine.innerHTML = <button type="submit" class="btn btn-primary">Submit</button>
    document.getElementById("automation").appendChild(newLine);
})