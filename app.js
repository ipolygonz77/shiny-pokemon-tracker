const pokemonList = [];

window.addEventListener('DOMContentLoaded', function () {
  // Fetch Pokémon from PokéAPI
  
  fetch('https://pokeapi.co/api/v2/pokemon?limit=2000')
    .then(res => res.json())
    .then(data => {
      const options = data.results.map(p => {
        let name = p.name.replace(/-/g, " ").replace(/\b\w/g, l => l.toUpperCase());

        // Optional form renaming
        name = name
          .replace("Alola ", "Alolan ")
          .replace("Galar ", "Galarian ")
          .replace("Hisui ", "Hisuian ")
          .replace("Paldea ", "Paldean ")
          .replace("Gmax", "Gigantamax ")
          .replace("Totem ", "Totem ");

        return { value: name, text: name };
      });

      new TomSelect("#pokemonName", {
        options,
        create: false,
        placeholder: "Select a Pokémon..."
      });
    })
    .catch(error => console.error("Error loading Pokémon list:", error));

  // Fetch Abilities from PokéAPI
  fetch('https://pokeapi.co/api/v2/ability?limit=1000')
    .then(res => res.json())
    .then(data => {
      const abilityOptions = data.results.map(a => {
        const name = a.name.replace(/-/g, " ").replace(/\b\w/g, l => l.toUpperCase());
        return { value: name, text: name };
      });

      new TomSelect("#ability", {
        options: abilityOptions,
        create: false,
        placeholder: "Select an Ability..."
      });
    })
    .catch(error => console.error("Error loading abilities:", error));


  
  // Size dropdown
  new TomSelect("#size", {
    options: [
      { value: "XXS", text: "XXS" },
      { value: "XS", text: "XS" },
      { value: "S", text: "S" },
      { value: "M", text: "M" },
      { value: "L", text: "L" },
      { value: "XL", text: "XL" },
      { value: "XXL", text: "XXL" }
    ],
    create: false,
    placeholder: "Select size..."
  });
});

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

// Manually reset Tom Select fields
const tomSelectFields = ['pokemonName', 'size'];
tomSelectFields.forEach(id => {
  const select = document.getElementById(id);
  if (select && select.tomselect) {
    select.tomselect.clear(); // Clears the selected value
  }
});

  
});

document.getElementById('generationFilter').addEventListener('change', renderPokemonList);

function getBallSprite(ballType) {
  const ballMap = {
    "Poké Ball": "poke-ball",
    "Great Ball": "great-ball",
    "Ultra Ball": "ultra-ball",
    "Master Ball": "master-ball",
    "Premier Ball": "premier-ball",
    "Heal Ball": "heal-ball",
    "Net Ball": "net-ball",
    "Nest Ball": "nest-ball",
    "Dive Ball": "dive-ball",
    "Dusk Ball": "dusk-ball",
    "Luxury Ball": "luxury-ball",
    "Repeat Ball": "repeat-ball",
    "Timer Ball": "timer-ball",
    "Quick Ball": "quick-ball",
    "Cherish Ball": "cherish-ball",
    "Friend Ball": "friend-ball",
    "Level Ball": "level-ball",
    "Love Ball": "love-ball",
    "Lure Ball": "lure-ball",
    "Heavy Ball": "heavy-ball",
    "Fast Ball": "fast-ball",
    "Moon Ball": "moon-ball",
    "Dream Ball": "dream-ball",
    "Beast Ball": "beast-ball",

    // Hisuian and PLA ball variants
    "Feather Ball": "feather-ball",
    "Wing Ball": "wing-ball",
    "Jet Ball": "jet-ball",
    "Leaden Ball": "leaden-ball",
    "Gigaton Ball": "gigaton-ball"
  };

  const key = ballMap[ballType];
  if (!key) return "";

  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/${key}.png`;
}

function getMarkSprite(markName) {
  const markMap = {
    "Itemfinder Mark": "itemfinder",
    "Gourmet Mark": "gourmet",
    "Partner Mark": "partner",
    "Lunchtime Mark": "lunchtime",
    "Sleepy-Time Mark": "sleepy-time",
    "Rowdy Mark": "rowdy",
    "Absent-Minded Mark": "absent-minded",
    "Jittery Mark": "jittery",
    "Excited Mark": "excited",
    "Intense Mark": "intense",
    "Zoned-Out Mark": "zoned-out",
    "Joyful Mark": "joyful",
    "Angry Mark": "angry",
    "Teary Mark": "teary",
    "Pumped-Up Mark": "pumped-up",
    "Peeved Mark": "peeved",
    "Intellectual Mark": "intellectual",
    "Ferocious Mark": "ferocious",
    "Crafty Mark": "crafty",
    "Scowling Mark": "scowling",
    "Kindly Mark": "kindly",
    "Flustered Mark": "flustered",
    "Prideful Mark": "prideful",
    "Unsure Mark": "unsure",
    "Humble Mark": "humble",
    "Thorny Mark": "thorny",
    "Vigor Mark": "vigor",
    "Slump Mark": "slump",
    "Smiley Mark": "smiley"
  };

  const fileName = markMap[markName];
  if (!fileName) return "";

  return `https://raw.githubusercontent.com/msikma/pokesprite/master/items/mark/${fileName}.png`;
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
     
      <p>
  <strong>Marks:</strong>
  <img src="${getMarkSprite(pokemon.marks)}" alt="${pokemon.marks}" class="mark-sprite"/>
  ${pokemon.marks}
</p>
      
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
