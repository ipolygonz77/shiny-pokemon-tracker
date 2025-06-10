let pokemonList = [];

function getPokemonSprite(name) {
  if (!name) return "";

  name = name.trim().toLowerCase().replace(/[.']/g, "");

  const formPrefixes = {
    "alolan": "alola",
    "galarian": "galar",
    "hisuian": "hisui",
    "paldean": "paldea",
    "totem": "totem"
  };

  const specialForms = {
    // Mega Evolutions
    "mega charizard x": "charizard-mega-x",
    "mega charizard y": "charizard-mega-y",
    "mega mewtwo x": "mewtwo-mega-x",
    "mega mewtwo y": "mewtwo-mega-y",
    "mega lucario": "lucario-mega",
    "mega gardevoir": "gardevoir-mega",
    // Gigantamax
    "gigantamax pikachu": "pikachu-gmax",
    "gigantamax charizard": "charizard-gmax",
    "gigantamax gengar": "gengar-gmax",
    "gigantamax snorlax": "snorlax-gmax",
    "gigantamax lapras": "lapras-gmax",
    "gigantamax butterfree": "butterfree-gmax",
    // Totem Forms
    "totem raticate": "raticate-totem",
    "totem gumshoos": "gumshoos-totem",
    "totem marowak": "marowak-totem",
    "totem kommo-o": "kommoo-totem"
    // Add more as needed
  };

  // Handle Mega, Gigantamax, Totem, etc.
  if (specialForms[name]) {
    return `https://play.pokemonshowdown.com/sprites/ani-shiny/${specialForms[name]}.gif`;
  }

  // Handle regional form structure (e.g., Alolan Ninetales -> ninetales-alola)
  const parts = name.split(" ");
  if (parts.length > 1 && formPrefixes[parts[0]]) {
    const form = formPrefixes[parts[0]];
    const baseName = parts.slice(1).join("-").replace(/[.']/g, "");
    return `https://play.pokemonshowdown.com/sprites/ani-shiny/${baseName}-${form}.gif`;
  }

  // Default: regular Pokémon
  return `https://play.pokemonshowdown.com/sprites/ani-shiny/${name.replace(/\s+/g, "-")}.gif`;
}

function addPokemon(pokemon) {
  pokemonList.push(pokemon);
  renderTable();
}

function renderTable() {
  const tableBody = document.getElementById("pokemonTableBody");
  tableBody.innerHTML = "";

  pokemonList.forEach((pokemon) => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${pokemon.nickname}</td>
      <td>
        <img src="${getPokemonSprite(pokemon.name)}" alt="${pokemon.name}" /><br>
        ${pokemon.name}
      </td>
      <td>${pokemon.gender}</td>
    `;

    tableBody.appendChild(row);
  });
}

document.getElementById("pokemonForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const nickname = document.getElementById("nickname").value.trim();
  const name = document.getElementById("name").value.trim();
  const gender = document.getElementById("gender").value;

  if (!nickname || !name) {
    alert("Please fill out all required fields.");
    return;
  }

  addPokemon({ nickname, name, gender });
  this.reset();
});
