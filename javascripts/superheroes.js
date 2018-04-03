const printToDom = (divId, string) => {
    document.getElementById(divId).innerHTML = string;
};

const buildDomString = (array) => {
    let domString = ''
    for (i=0; i<array.length; i++){
        let superhero = array[i];
        // domString += `<div>`;
        // domString +=    `<h3>${superhero.name}</h3>`;
        // domString += `</div>`;
        domString += `<div class="col-md-3">`;
        domString +=    `<div class="panel">`;
        domString +=      `<div class="panel-heading">`;
        domString +=         `<h3 class="panel-title">${superhero.name}</h3>`;
        domString +=      `</div>`;
        domString +=      `<div class="panel-body">`;
        domString +=         `<img class="charImage ${superhero.gender.toLowerCase()}CharImage" src="${superhero.image}">`;
        domString +=         `<p class="charDescription">${superhero.description}</p>`;
        domString +=     `</div>`;
        domString +=    `</div>`;
        domString += `</div>`;
    }
    printToDom("super-dudes", domString);
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