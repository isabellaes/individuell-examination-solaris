const planetinfoDiv = document.getElementById("planet-info");
const startDiv = document.getElementById("planet-overview");

async function fetchPlanetInfo(id) {
  const respons = await fetch("https://majazocom.github.io/Data/solaris.json");
  const result = await respons.json();
  return result[id];
}

function createTags(planet) {
  const name = document.getElementById("name");
  name.innerHTML = planet.name;
  const latinName = document.getElementById("latinName");
  latinName.innerHTML = planet.latinName;
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
    console.log(planet.moons);
    moons.innerHTML = planet.moons.toString();
  }
}

function getDivsForPlanets() {
  const div1 = document.getElementById("0");
  const planetDivs = document
    .getElementById("solaris-planet")
    .getElementsByTagName("div");
  const planets = [div1, ...planetDivs];
  return planets;
}

const planets = getDivsForPlanets();

planets.forEach((div) => {
  div.addEventListener("click", () => {
    let id = div.id;
    const planet = fetchPlanetInfo(id);
    planet.then((planet) => {
      createTags(planet);
    });
  });
});

/* const imgplanetinfodiv = document.getElementById("img-planet-info");
imgplanetinfodiv.addEventListener("click", () => {
  startDiv.style.display = "flex";
  planetinfoDiv.style.display = "none";
}); */
