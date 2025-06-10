const form = document.getElementById("shinyForm");
const tableBody = document.querySelector("#shinyTable tbody");
const generationFilter = document.getElementById("generationFilter");

let shinyList = JSON.parse(localStorage.getItem("shinies")) || [];

function getPokemonSprite(name) {
  if (!name) return "";
  return `https://img.pokemondb.net/sprites/black-white/shiny/${name.toLowerCase().replace(" ", "-")}.png`;
}

function renderTable(data) {
  tableBody.innerHTML = "";
  data.forEach((entry, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td> <img src="${getPokemonSprite(pokemon.name)}" alt="${pokemon.name}" style="width:48px;height:48px;"><br> ${pokemon.name} </td>
      /*<td>${entry.pokemonName}</td>*/
      <td>${entry.nickname}</td>
      <td>${entry.gameOrigin}</td>
      <td>${entry.level}</td>
      <td>${entry.generation}</td>
      <td>${entry.pokeBall}</td>
    `;
    tableBody.appendChild(row);
  });
}

function updateGenerationFilterOptions() {
  const generations = [...new Set(shinyList.map(e => e.generation))];
  generationFilter.innerHTML = '<option value="">All</option>';
  generations.forEach(gen => {
    const option = document.createElement("option");
    option.value = gen;
    option.textContent = gen;
    generationFilter.appendChild(option);
  });
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const entry = {
    nickname: document.getElementById("nickname").value.trim(),
    pokemonName: document.getElementById("pokemonName").value.trim(),
    generation: document.getElementById("generation").value.trim(),
    gameOrigin: document.getElementById("gameOrigin").value.trim(),
    level: document.getElementById("level").value.trim(),
    pokeBall: document.getElementById("pokeBall").value.trim()
  };
  shinyList.push(entry);
  localStorage.setItem("shinies", JSON.stringify(shinyList));
  renderTable(shinyList);
  updateGenerationFilterOptions();
  form.reset();
});

generationFilter.addEventListener("change", () => {
  const selected = generationFilter.value;
  if (!selected) {
    renderTable(shinyList);
  } else {
    const filtered = shinyList.filter(p => p.generation === selected);
    renderTable(filtered);
  }
});

// Initial render
renderTable(shinyList);
updateGenerationFilterOptions();
