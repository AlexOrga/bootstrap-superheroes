const printToDom = (divId, string) => {
    document.getElementById(divId).innerHTML = string;
};

const buildDomString = (array) => {
    let domString = ''
    for (i=0; i<array.length; i++){
        // domString += `<div>`;
        // domString +=    `<h3>${superhero.name}</h3>`;
        // domString += `</div>`;
        domString += `<li>`;
        domString +=    `<a href="#" data-hero-id="${array[i].id}">${array[i].name}</a>`;
        domString += `</li>`
    }
    printToDom("awesome-dropdown", domString);
};

// XHR REQUEST **************************************************

function executeThisCodeAfterFileLoaded(){
    const data = JSON.parse(this.responseText);
    buildDomString(data.superheroes);
};

function executeThisCodeAfterFileError(){
    console.log('Oops, Something went wrong.');
};

const startApplication = () => {
    let myRequest = new XMLHttpRequest();
    myRequest.addEventListener("load", executeThisCodeAfterFileLoaded);
    myRequest.addEventListener("error", executeThisCodeAfterFileError);
    myRequest.open("GET", "../db/superheroes.json");
    myRequest.send();
};

startApplication();