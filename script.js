const planets = getDivsForPlanets();
addStarItemtoGrid();

//Loopar igenom alla planet-element och skickar med dess id för att hämta information från api och skriva ut det på sidan
planets.forEach((div) => {
  div.addEventListener("click", () => {
    let id = div.id;
    const planet = fetchPlanetInfo(id);
    planet.then((planet) => {
      changeElements(planet);
    });
  });
});

//Hämtar data från api
async function fetchPlanetInfo(id) {
  try {
    const respons = await fetch(
      "https://majazocom.github.io/Data/solaris.json"
    );
    const result = await respons.json();
    return result[id];
  } catch (error) {
    console.log(error);
  }
}

//Ändrar innehåll i html-taggar för planetens information
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

//Hämtar ut alla planet-element samt solen
function getDivsForPlanets() {
  const div1 = document.getElementById("0");
  const planetDivs = document
    .getElementById("planets-container")
    .getElementsByTagName("div");
  const planets = [div1, ...planetDivs];
  return planets;
}

//Lägger till olika grid-items i griden för att skapa en osymetrisk stjärnhimmel
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
