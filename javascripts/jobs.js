let selectedHero = '';

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
        domString +=    `<a class="heroes" href="#" data-hero-id="${array[i].id}">${array[i].name}</a>`;
        domString += `</li>`
    }
    printToDom("awesome-dropdown", domString);
};

const selectHero = (e) => {
    selectedHero = e.target.dataset.heroId;
    document.getElementById('awesome-button').classList.add('hide');
    genericHeroRequest(loadFileforSingleHero);
};

const addHeroSelectionEventListeners = () => {
    const heroes = document.getElementsByClassName('heroes');
    for(let i=0; i<heroes.length; i++){
        heroes[i].addEventListener('click', selectHero);
    }
};

const displaySuperhero = (heroes) => {
    let domString = "";
    heroes.forEach(hero) => {
      if (hero.id === selectedHero) {
        domString += `<div class="row">`;
        domString += `<div class="col-sm-4">`;
        if (hero.gender === "Male") {
          domString += `<img class="charImage maleImage" src="${
            hero.image
          }">`;
        } else {
          domString += `<img class="charImage femaleImage" src="${
            hero.image
          }">`;
        }
        domString += `</div>`;
        domString += `<div class="col-sm-6">`;
        domString += `<h2>Selected Hero: ${hero.name}</h2>`;
        domString +=     `<p class='charDescription'>${hero.description}</p>`;
        domString += `</div>`;
      }
    });
    printToDom("selected-hero", domString);
  };

function loadFileforSingleHero() {
    const data = JSON.parse(this.responseText);
    displaySuperhero(data.superheroes);
}

// XHR REQUEST **************************************************

function executeThisCodeAfterFileLoaded(){
    const data = JSON.parse(this.responseText);
    buildDomString(data.superheroes);
    addHeroSelectionEventListeners();
};

function executeThisCodeAfterFileError(){
    console.log('Oops, Something went wrong.');
};

const genericHeroRequest = (successFunction) => {
    let myRequest = new XMLHttpRequest();
    myRequest.addEventListener("load", successFunction);
    myRequest.addEventListener("error", executeThisCodeAfterFileError);
    myRequest.open("GET", "../db/superheroes.json");
    myRequest.send();
};

const startApplication = () => {
    genericHeroRequest(executeThisCodeAfterFileLoaded);
};

startApplication();