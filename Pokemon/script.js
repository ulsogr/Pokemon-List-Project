const bgcolor = {
  normal: "#929da3",
  poison: "#aa6bc8",
  bug: "#91c12f",
  fire: "#ff9d55",
  electric: " #f4d23c",
  dragon: " #0b6dc3",
  physical: "#ea5721",
  fighting: "#ce426b",
  ground: "#d97845",
  ghost: "#5269ad",
  dark: "#5a5465",
  water: "#5090D6",
  flying: "#8fa9de",
  psychic: "#fa7179",
  rock: " #c5b78c",
  steel: " #5a8ea2",
  grass: " #63bc5a",
  ice: " #73cec0",
  fairy: " #ec8fe6",
  dark: " #5a5465",
  unknown: " #68a090",
  special: " #1f4e94",
};

const poke_container = document.getElementById("container");
const search_input = document.getElementById("search-poke");
const search_btn = document.getElementById("search-btn");

async function getPokemon() {
  for (let i = 1; i <= 151; i++) {
    await fetchPokemon(i);
  }
}

async function fetchPokemon(id) {
  const url = `https://pokeapi.co/api/v2/pokemon/${id}`;

  const res = await fetch(url);
  const data = await res.json();

  createPokemonCard(data);
}

function createPokemonCard(d) {
  const poke_container = document.getElementById("container");
  const pokeId = d.id.toString().padStart(3, "0");
  const type = d.types[0].type.name;
  const typecolor = bgcolor[type];

  poke_container.innerHTML += `
      <div class="poke-card">
        <span>#${pokeId}</span>
        <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
          d.id
        }.png" />
        <div class="info" id="info" style="background-color:${typecolor};">
          <h2 class="pokename">${d.name}</h2> 
          <div id="my-chart">
            <table class="charts-css bar data-spacing-8 data-start">
              <tbody>
                <tr>
                  <td style="--size: calc(${d.stats[0].base_stat} / ${limit(
    d.stats[0].base_stat
  )})">&nbsp;Hp ${d.stats[0].base_stat}</td>
                </tr>
                <tr>
                  <td style="--size: calc(${d.stats[1].base_stat} / ${limit(
    d.stats[1].base_stat
  )})">&nbsp;Atc ${d.stats[1].base_stat}</td>
                </tr>
                <tr>
                  <td style="--size: calc(${d.stats[2].base_stat} / ${limit(
    d.stats[2].base_stat
  )})">&nbsp;Def ${d.stats[2].base_stat}</td>
                </tr>
                <tr>
                  <td style="--size: calc(${d.stats[5].base_stat} / ${limit(
    d.stats[3].base_stat
  )})">&nbsp;Spd ${d.stats[5].base_stat}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `;
}

function limit(point) {
  if (point > 100) {
    return point;
  } else {
    return 100;
  }
}

getPokemon();

search_input.addEventListener("input", (e) => {
  const searchValue = search_input.value.toLowerCase();
  const pokemonNames = document.querySelectorAll(".pokename");
  console.log(pokemonNames);

  pokemonNames.forEach((pokename) => {
    if (pokename.innerHTML.toLowerCase().includes(searchValue)) {
      pokename.parentElement.parentElement.style.display = "block";
    } else {
      pokename.parentElement.parentElement.style.display = "none";
    }
  });
});
