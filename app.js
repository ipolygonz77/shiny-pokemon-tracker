let pokemonList = [];

function getPokemonSprite(name) {
  if (!name) return "";
  return `https://img.pokemondb.net/sprites/black-white/shiny/${name.toLowerCase().replace(/\s/g, "-")}.png`;
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
