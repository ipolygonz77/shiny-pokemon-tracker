const pokemonList = [];

document.getElementById('shinyForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const pokemon = {
    name: document.getElementById('pokemonName').value,
    nickname: document.getElementById('nickname').value,
    generation: document.getElementById('generation').value,
    gender: document.getElementById('gender').value,
    ballType: document.getElementById('ballType').value,
    gameOrigin: document.getElementById('gameOrigin').value,
    size: document.getElementById('size').value,
    level: document.getElementById('level').value,
    ot: document.getElementById('ot').value,
    id: document.getElementById('id').value,
    ability: document.getElementById('ability').value,
    teraType: document.getElementById('teraType').value,
    originalNature: document.getElementById('originalNature').value,
    mintedNature: document.getElementById('mintedNature').value,
    ivs: document.getElementById('ivs').value,
    marks: document.getElementById('marks').value,
    ribbons: document.getElementById('ribbons').value,
    location: document.getElementById('location').value,
    notes: document.getElementById('notes').value,
    obtainment: document.getElementById('obtainment').value,
    rule3: `${document.getElementById('ot').value} / ${document.getElementById('id').value} / ${document.getElementById('obtainment').value || 'Not Tradeable'}`
  };

  pokemonList.push(pokemon);
  renderPokemonList();
  e.target.reset();
});

document.getElementById('generationFilter').addEventListener('change', renderPokemonList);

function getBallSprite(ballType) {
  const ballMap = {
    "Poké Ball": "poke",
    "Great Ball": "great",
    "Ultra Ball": "ultra",
    "Master Ball": "master",
    "Premier Ball": "premier",
    "Heal Ball": "heal",
    "Net Ball": "net",
    "Nest Ball": "nest",
    "Dive Ball": "dive",
    "Dusk Ball": "dusk",
    "Luxury Ball": "luxury",
    "Repeat Ball": "repeat",
    "Timer Ball": "timer",
    "Quick Ball": "quick",
    "Cherish Ball": "cherish",
    "Friend Ball": "friend",
    "Level Ball": "level",
    "Love Ball": "love",
    "Lure Ball": "lure",
    "Heavy Ball": "heavy",
    "Fast Ball": "fast",
    "Moon Ball": "moon",
    "Dream Ball": "dream",
    "Beast Ball": "beast",

    // Legends Arceus & variants (mapped to closest base sprite)
    "Poké Ball (Hisuian)": "poke",
    "Great Ball (Hisuian)": "great",
    "Ultra Ball (Hisuian)": "ultra",
    "Feather Ball": "feather",
    "Wing Ball": "wing",
    "Jet Ball": "jet",
    "Heavy Ball (Hisuian)": "heavy",
    "Leaden Ball": "leaden",
    "Gigaton Ball": "gigaton"
  };

  const key = ballMap[ballType];
  if (!key) return "";

  return `https://raw.githubusercontent.com/msikma/pokesprite/master/items/balls/${key}-ball.png`;
}

function renderPokemonList() {
  const container = document.getElementById('pokemonList');
  const filterGen = document.getElementById('generationFilter').value;
  container.innerHTML = '';

  const filtered = filterGen ? pokemonList.filter(p => p.generation === filterGen) : pokemonList;

  filtered.forEach(pokemon => {
    const spriteUrl = getPokemonSprite(pokemon.name);
    const card = document.createElement('div');
    card.className = 'pokemon-card';
    card.innerHTML = `
      <h2>${pokemon.nickname || pokemon.name}</h2>
      <img src="${spriteUrl}" alt="${pokemon.name}" class="sprite"/>

<p>
  <strong>Poké Ball:</strong>
  <img src="${getBallSprite(pokemon.ballType)}" alt="${pokemon.ballType}" class="ball-sprite"/>
  ${pokemon.ballType}
</p>
      
      <p><strong>Gender:</strong> ${pokemon.gender}</p>
      <p><strong>Game Origin:</strong> ${pokemon.gameOrigin}</p>
      <p><strong>Size:</strong> ${pokemon.size}</p>
      <p><strong>Level:</strong> ${pokemon.level}</p>
      <p><strong>OT / ID:</strong> ${pokemon.ot} / ${pokemon.id}</p>
      <p><strong>Ability:</strong> ${pokemon.ability}</p>
      <p><strong>Tera Type:</strong> ${pokemon.teraType}</p>
      <p><strong>Nature:</strong> ${pokemon.originalNature} (Minted: ${pokemon.mintedNature})</p>
      <p><strong>IVs:</strong> ${pokemon.ivs}</p>
      <p><strong>Marks:</strong> ${pokemon.marks}</p>
      <p><strong>Ribbons:</strong> ${pokemon.ribbons}</p>
      <p><strong>Location:</strong> ${pokemon.location}</p>
      <p><strong>Notes:</strong> ${pokemon.notes}</p>
      <p><strong>Obtainment:</strong> ${pokemon.obtainment}</p>
      <p><strong>Rule 3:</strong> ${pokemon.rule3}</p>
    `;
    container.appendChild(card);
  });
}

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
    "mega charizard x": "charizard-mega-x",
    "mega charizard y": "charizard-mega-y",
    "mega mewtwo x": "mewtwo-mega-x",
    "mega mewtwo y": "mewtwo-mega-y",
    "mega lucario": "lucario-mega",
    "mega gardevoir": "gardevoir-mega",
    "gigantamax pikachu": "pikachu-gmax",
    "gigantamax charizard": "charizard-gmax",
    "gigantamax gengar": "gengar-gmax",
    "gigantamax snorlax": "snorlax-gmax",
    "gigantamax lapras": "lapras-gmax",
    "gigantamax butterfree": "butterfree-gmax",
    "totem raticate": "raticate-totem",
    "totem gumshoos": "gumshoos-totem",
    "totem marowak": "marowak-totem",
    "totem kommo-o": "kommoo-totem"
  };

  if (specialForms[name]) {
    return `https://play.pokemonshowdown.com/sprites/ani-shiny/${specialForms[name]}.gif`;
  }

  const parts = name.split(" ");
  if (parts.length > 1 && formPrefixes[parts[0]]) {
    const form = formPrefixes[parts[0]];
    const baseName = parts.slice(1).join("-").replace(/[.']/g, "");
    return `https://play.pokemonshowdown.com/sprites/ani-shiny/${baseName}-${form}.gif`;
  }

  return `https://play.pokemonshowdown.com/sprites/ani-shiny/${name.replace(/\s+/g, "-")}.gif`;
}
