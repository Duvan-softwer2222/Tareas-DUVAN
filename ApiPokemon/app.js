const typeBackgrounds = {
    fire: "bg-red-400",
    water: "bg-blue-400",
    grass: "bg-green-400",
    electric: "bg-yellow-400",
    ice: "bg-blue-200",
    fighting: "bg-orange-600",
    poison: "bg-purple-600",
    ground: "bg-yellow-600",
    flying: "bg-indigo-400",
    psychic: "bg-pink-400",
    bug: "bg-green-600",
    rock: "bg-gray-600",
    ghost: "bg-purple-800",
    dragon: "bg-indigo-700",
    dark: "bg-gray-800",
    steel: "bg-gray-400",
    fairy: "bg-pink-300",
    normal: "bg-gray-300",
};

async function fetchPokemonList() {
    const pokemonSections = {
        legendary: document.getElementById("legendaryPokemon"),
        mythical: document.getElementById("mythicalPokemon"),
        normal: document.getElementById("normalPokemon"),
    };

    const loadingMessage = document.getElementById("loadingMessage");
    const pokemonContainer = document.getElementById("pokemonContainer");

    try {
        const pokemonPromises = Array.from({ length: 151 }, (_, i) =>
            fetch(`https://pokeapi.co/api/v2/pokemon/${i + 1}`).then(res => res.json())
        );

        const pokemonData = await Promise.all(pokemonPromises);

        const speciesPromises = pokemonData.map(pokemon =>
            fetch(pokemon.species.url).then(res => res.json())
        );

        const speciesData = await Promise.all(speciesPromises);

        pokemonData.forEach((pokemon, index) => {
            const species = speciesData[index];

            const descriptionEntry = species.flavor_text_entries.find(entry => entry.language.name === "es") ||
                                     species.flavor_text_entries.find(entry => entry.language.name === "en");
            const description = descriptionEntry ? descriptionEntry.flavor_text.replace(/\n|\f/g, ' ') : "Sin descripción disponible.";

            const types = pokemon.types.map(type => type.type.name);
            const typesText = types.join(" / ");
            const primaryType = types[0] || "normal"; 
            const bgClass = typeBackgrounds[primaryType] || "bg-gray-300";

            const attack = pokemon.stats[1].base_stat;
            const defense = pokemon.stats[2].base_stat;

            let category = "normal";
            if (species.is_legendary) category = "legendary";
            if (species.is_mythical) category = "mythical";

            const card = document.createElement("div");
            card.className = `pokemon-card ${bgClass} text-white rounded-lg p-4 shadow-lg hover:scale-105 transition-transform duration-300`;
            card.setAttribute("data-name", pokemon.name);
            card.innerHTML = `
                <img src="${pokemon.sprites.other["official-artwork"].front_default}" alt="${pokemon.name}" class="w-32 mx-auto mb-4 rounded-lg shadow-md" />
                <h2 class="text-xl font-bold capitalize">${pokemon.name}</h2>
                <p><strong>Tipo:</strong> ${typesText}</p>
                <p class="italic text-gray-100 text-sm">"${description}"</p>
                <p><strong>Ataque:</strong> <img src="https://cdn-icons-png.flaticon.com/512/2876/2876826.png" class="stat-icon" /> <span>${attack}</span></p>
                <p><strong>Defensa:</strong> <img src="https://cdn-icons-png.flaticon.com/512/2876/2876841.png" class="stat-icon" /> <span>${defense}</span></p>
            `;

            pokemonSections[category].appendChild(card);
        });

        loadingMessage.style.display = "none";
        pokemonContainer.classList.remove("hidden");

    } catch (error) {
        console.error("Error al obtener Pokémon:", error);
        loadingMessage.innerText = "Error al cargar los datos.";
    }
}

function filterPokemon() {
    const searchInput = document.getElementById("searchInput").value.toLowerCase();
    const cards = document.querySelectorAll("#pokemonContainer div[data-name]");

    cards.forEach(card => {
        const name = card.getAttribute("data-name");
        card.classList.toggle("hidden", !name.includes(searchInput));
    });
}

fetchPokemonList();
