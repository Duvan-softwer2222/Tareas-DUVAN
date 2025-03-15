document.addEventListener("DOMContentLoaded", () => {
    const cardContainer = document.getElementById("card-container");
    const selectButton = document.getElementById("select");
    const eliminateButton = document.getElementById("eliminate");
    const fightButton = document.getElementById("fight");
    const selectList = document.getElementById("select-list"); 
    let characters = [];
    let currentIndex = 0;
    let selectedCharacter = []; 

    const powersBySpecies = {
        Human: ["Super inteligencia", "Estrategia avanzada", "Sigilo"],
        Alien: ["Rayos láser", "Manipulación del tiempo", "Regeneración"],
        Robot: ["Fuerza extrema", "Análisis táctico", "Autorreparación"],
        Cronenberg: ["Mutación acelerada", "Resistencia extrema", "Veneno tóxico"],
        Unknown: ["Poder misterioso", "Telepatía", "Energía oscura"]
    };

    function getPowers(species) {
        return powersBySpecies[species] || ["Habilidad desconocida", "Poder oculto"];
    }

    fetch("https://rickandmortyapi.com/api/character")
      .then((response) => response.json())
      .then((data) => {
        characters = data.results.map(char => ({
            ...char,
            powers: getPowers(char.species) 
        }));
        displayCharacter();
      });

    function displayCharacter() {
      if (currentIndex >= characters.length) {
        cardContainer.innerHTML = "<p class='text-xl'>No more characters!</p>";
        return;
      }

      const character = characters[currentIndex];
      const powersHTML = character.powers.map(p => `<li class="text-blue-300">${p}</li>`).join("");

      cardContainer.innerHTML = `
      <div class="swipe-animation absolute inset-0">
        <img src="${character.image}" alt="${character.name}" class="w-full h-3/4 object-cover rounded-t-2xl">
        <div class="p-4">
          <h2 class="text-xl font-semibold">${character.name}</h2>
          <p class="text-gray-400">${character.species}</p>
          <p class="text-gray-400">${character.status}</p>
          <h3 class="text-lg text-blue-500 mt-2">Poderes:</h3>
          <ul>${powersHTML}</ul>
        </div>
      </div>
    `;
    }

    function swipe(direction) {
      const card = cardContainer.firstElementChild;
      card.classList.add(direction === "select" ? "swipe-select" : "swipe-eliminate");

      setTimeout(() => {
        if (direction === "select" && characters[currentIndex]) {
            selectedCharacter.push(characters[currentIndex]); 
            updateSelectList();
        }
        currentIndex++;
        displayCharacter();
      }, 500);
    }

    function battle() {
      if (selectedCharacter.length < 2) {
        alert("Add at least two characters to start a battle!");
        return;
      }
      let fighter1 = selectedCharacter[Math.floor(Math.random() * selectedCharacter.length)];
      let fighter2 = selectedCharacter[Math.floor(Math.random() * selectedCharacter.length)];
      while (fighter1 === fighter2) {
        fighter2 = selectedCharacter[Math.floor(Math.random() * selectedCharacter.length)];
      }

      const power1 = fighter1.powers[Math.floor(Math.random() * fighter1.powers.length)];
      const power2 = fighter2.powers[Math.floor(Math.random() * fighter2.powers.length)];

      cardContainer.innerHTML = `
      <div class="battle-animation h-full">
        <div class="fighter text-center">
          <img src="${fighter1.image}" alt="${fighter1.name}" class="rounded-full w-32 h-32">
          <p>${fighter1.name}</p>
          <p class="text-yellow-400">⚡ ${power1}</p>
        </div>
        <p class="text-4xl">⚔️</p>
        <div class="fighter text-center">
          <img src="${fighter2.image}" alt="${fighter2.name}" class="rounded-full w-32 h-32">
          <p>${fighter2.name}</p>
          <p class="text-yellow-400">⚡ ${power2}</p>
        </div>
      </div>
    `;

      setTimeout(() => {
        document.querySelectorAll(".fighter")[Math.random() > 0.5 ? 0 : 1].classList.add("attack");
        setTimeout(() => {
          alert(`${Math.random() > 0.5 ? fighter1.name : fighter2.name} wins!`);
          displayCharacter();
        }, 500);
      }, 1000);
    }

    function updateSelectList() {
        selectList.innerHTML = selectedCharacter
        .map((c) => `<li class='text-green-400'>${c.name}</li>`)
        .join("");
    }

    selectButton.addEventListener("click", () => swipe("select"));
    eliminateButton.addEventListener("click", () => swipe("eliminate"));
    fightButton.addEventListener("click", battle);
});
