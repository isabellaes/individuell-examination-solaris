//Loopar igenom alla planet-element och lägger till en eventlistener som triggas vid klick
const planets = getDivsForPlanets();
planets.forEach((div) => {
  div.addEventListener("click", () => {
    let id = div.id;
    fetchPlanetInfo(id);
  });
});

/* Hämtar ut alla planet-element samt solen. 
Jag valde att sätta id på alla divar som är planeter/sol med samma index som 
planeterna har när de hämtas från apiet. 
Detta för att enklare komma åt informationen till rätt planet. */
function getDivsForPlanets() {
  const div1 = document.getElementById("0");
  const planetDivs = document
    .getElementById("planets-container")
    .getElementsByTagName("div");
  const planets = [div1, ...planetDivs];
  return planets;
}

//Hämtar data från api och anropar funktion som skriver ut info om planeten på sidan
async function fetchPlanetInfo(id) {
  try {
    const respons = await fetch(
      "https://majazocom.github.io/Data/solaris.json"
    );
    const result = await respons.json().then((planet) => planet[id]);
    changeElements(result);
  } catch (error) {
    console.log(error);
  }
}

//Ändrar innehåll i html-taggar för planetens information
/* Har valt att skapa upp de html-taggar som behövs och sedan ändra innehållet när man klickar på en planet.
Detta för att minska onödig kod. Alternativt hade jag kunnat skapa upp element vid klick, men sedan behöva ta bort dem. */
function changeElements(planet) {
  const name = document.getElementById("name");
  name.innerHTML = planet.name.toUpperCase();
  const latinName = document.getElementById("latinName");
  latinName.innerHTML = planet.latinName.toUpperCase();
  const desc = document.getElementById("desc");
  desc.innerHTML = planet.desc;
  const circumference = document.getElementById("circumference");
  circumference.innerHTML = planet.circumference;
  const tempDay = document.getElementById("temp-day");
  tempDay.innerHTML = planet.temp.day;
  const tempNight = document.getElementById("temp-night");
  tempNight.innerHTML = planet.temp.night;
  const distance = document.getElementById("distance");
  distance.innerHTML = planet.distance;
  if (planet.moons.length > 0) {
    const moons = document.getElementById("moons");
    moons.innerHTML = planet.moons.join(", ");
  }
}

/*Lägger till olika grid-items i griden för att skapa en stjärnhimmel.
Valde att lägga detta i en funktion för att delvis undvika att ha många divar i index filen, 
och för att lättare kunna rita ut den slumpmässigt. Det gör också att koden blir mer ren och läsbar.

För slumpmässigt utförande har jag använt mig av lite olika uträkningar samt blandat styleade divar med tomma.
*/

function addStarItemtoGrid() {
  const grid = document.getElementById("stars-grid");

  for (let index = 0; index < 77; index++) {
    if (index > 8 && index % 3 === 0) {
      const element = document.createElement("div");
      element.classList.add("star-item-small");
      grid.appendChild(element);
    } else if ((index > 8 && index % 2 === 0) || (index > 8 && index > 75)) {
      const element = document.createElement("div");
      element.classList.add("star-item");
      grid.appendChild(element);
    } else {
      const element = document.createElement("div");
      element.style.margin = "2em";
      grid.appendChild(element);
    }
  }
}

addStarItemtoGrid();
