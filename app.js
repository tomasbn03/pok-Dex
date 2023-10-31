const pokemonList = document.getElementById("pokemonList");
const traerPokemon = document.getElementById("traerPokemon");
const buscarPokemon = document.getElementById("buscarPokemon");

// Función para mandar a traer los detalles de un Pokémon según el nombre
function getPokemon(name) {
  fetch(`https://pokeapi.co/api/v2/pokemon/${name}/`)
    .then((response) => response.json())
    .then((apiData) => {
      mostrarPokemon(apiData);
    })
    .catch((error) => {
      console.error("Error en la solicitud:", error);
    });
}

// Event listener para el botón buscarPokemon
buscarPokemon.addEventListener("click", () => {
  const pokemonName = traerPokemon.value.toLowerCase();
  pokemonList.innerHTML = "";
  getPokemon(pokemonName);
});


// Función para mandar a traer la lista de todos los Pokémon
function getAllPokemon() {
  fetch("https://pokeapi.co/api/v2/pokemon/?limit=1000") 
    .then((response) => response.json())
    .then((data) => {
      const pokemonArray = data.results;
      pokemonArray.forEach((pokemon) => {
        const pokemonName = pokemon.name;
        getPokemon(pokemonName);
      });
    })
    .catch((error) => {
      console.error("Error en la solicitud:", error);
    });
}

// Función que sirve para mostrar el Pokémon
function mostrarPokemon(apiData) {
  const article = document.createElement("article");
  article.innerHTML = `
    <br>
    <div class="pokemon-card">
      <img src="${apiData.sprites.front_default}" alt="${apiData.name}">
      <div class="pokemon-info">
        <h2>${apiData.name}</h2>
        <p><strong>Tipo:</strong> ${apiData.types.map((type) => type.type.name).join(", ")}</p>
        <p><strong>HP:</strong> ${apiData.stats[0].base_stat}</p>
        <p><strong>Nivel:</strong> ${apiData.base_experience}</p>
      </div>
    </div>
  `;
  
  let currentGroup = document.querySelector(".div-article");

  if (!currentGroup || currentGroup.children.length >= 3) {
    currentGroup = document.createElement("div");
    currentGroup.classList.add("div-article");
    pokemonList.appendChild(currentGroup);
  }

  currentGroup.appendChild(article);
}

// Función para crear botones de los tipos
function createTypeA() {
  const tipoA = document.getElementById("tipoA");
  const tipos = [
    "normal",
    "fire",
    "water",
    "grass",
    "electric",
    "ice",
    "fighting",
    "poison",
    "ground",
    "flying",
    "psychic",
    "bug",
    "rock",
    "ghost",
    "steel",
    "fairy",
    "dragon",
    "dark",
  ];

  tipos.forEach((tipo) => {
    const button = document.createElement("button");
    button.textContent = tipo.charAt(0).toUpperCase() + tipo.slice(1);
    button.value = tipo;
    button.classList.add(`tipo-${tipo}`);
    
    // Event listener para los botones de tipo
    button.addEventListener("click", () => {
      filterByType(tipo);
    });

    tipoA.appendChild(button);
  });
}

// Función para filtrar Pokémon por tipo
function filterByType(type) {
  fetch(`https://pokeapi.co/api/v2/type/${type}/`)
    .then((response) => response.json())
    .then((data) => {
      const pokemonNombres = data.pokemon.map((entry) => entry.pokemon.name);
      pokemonList.innerHTML = "";
      pokemonNombres.forEach((nombre) => {
        getPokemon(nombre);
      });
    });
}

createTypeA();
getAllPokemon();
