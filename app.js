// Sample Pokémon list for testing
let pokemonList = [];

// Helper: Get shiny Pokémon sprite URL
function getPokemonSprite(name) {
  if (!name) return "";
  return `https://img.pokemondb.net/sprites/black-white/shiny/${name.toLowerCase().replace(" ", "-")}.png`;
}

// Add a Pokémon to the list and re-render the table
function addPokemon(pokemon) {
  pokemonList.push(pokemon);
  renderTable();
}

// Render the Pokémon table
function renderTable() {
  const tableBody = document.getElementById("pokemonTableBody");
  tableBody.innerHTML = "";

  pokemonList.forEach((pokemon) => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${pokemon.nickname}</td>
      <td>
        <img src="${getPokemonSprite(pokemon.name)}" alt="${pokemon.name}" style="width:48px;height:48px;"><br>
        ${pokemon.name}
      </td>
      <td>${pokemon.gender}</td>
    `;

    tableBody.appendChild(row);
  });
}

// Form submission handler
document.getElementById("pokemonForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const nickname = document.getElementById("nickname").value;
  const name = document.getElementById("name").value;
  const gender = document.getElementById("gender").value;

  addPokemon({
    nickname: nickname,
    name: name,
    gender: gender,
  });

  this.reset();
});
