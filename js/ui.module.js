import { GameDetails } from "./details.module.js";

export class Ui {
  // constructor function that take id of the row, class of the links and the id of the game details
  constructor(
    gameCardsHolder,
    navLinksHolder,
    detailsHolderSelector,
    loadingHolder
  ) {
    this.gameCardsHolder = document.querySelector(gameCardsHolder);
    this.navLinksHolder = document.querySelectorAll(navLinksHolder);
    this.detailsHolderSelector = detailsHolderSelector;
    // object of the details class so i can use displayDetails function and take the id of the game details
    this.detailsInstance = new GameDetails(detailsHolderSelector);

    this.loadingHolder = document.querySelector(loadingHolder);

    this.apiURL =
      "https://free-to-play-games-database.p.rapidapi.com/api/games?category=";
    this.apiKeyHolder = "4bb84e2800msheb3af5ee298996bp10f673jsnb3afb546c9d6";
    this.apiHostHolder = "free-to-play-games-database.p.rapidapi.com";

    this.init();
  }

  // function that get the value of the custom att i add to know what is the chosen category by user
  init() {
    this.navLinksHolder.forEach((link) => {
      const customAtt = link.getAttribute("data-bs-name");
      link.addEventListener("click", () => this.getData(customAtt));
    });
    // the default value when the user load the page
    this.getData("mmorpg");
  }

  // function that fetch the data from the api and take a string that string will be the category that user want
  async getData(category) {
    try {
      this.showLoading();
      const res = await fetch(`${this.apiURL}${category}`, {
        method: "GET",
        headers: {
          "x-rapidapi-key": this.apiKeyHolder,
          "x-rapidapi-host": this.apiHostHolder,
        },
      });

      const data = await res.json();
      this.displayGamesData(data);

      this.hideLoading();
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  }

  // function take the data from the api and in the end display every game in card
  displayGamesData(data) {
    let box = ``;
    data.forEach((game) => {
      box += `
        <div class="col-12 col-md-6 col-lg-3 game-card" data-id="${game.id}">
          <div class="card h-100  bg-transparent">
            <div class="card-body rounded rounded-5 overflow-hidden">
              <img src="${game.thumbnail}" alt="${
        game.title
      } image" class="w-100" />
              <div class="d-flex my-2 justify-content-between align-items-center">
                <p class="text-white mb-0 card-title">${game.title}</p>
                <span class="badge text-bg-primary d-flex align-items-center">Free</span>
              </div>
              <p class="text-center opacity-50 text-white">${this.truncateDescription(
                game.short_description,
                7
              )}</p>
            </div>
            <footer class="d-flex justify-content-between align-items-center">
              <span class="badge badge-color">${game.genre}</span>
              <span class="badge badge-color">${game.platform}</span>
            </footer>
          </div>
        </div>
      `;
    });
    this.gameCardsHolder.innerHTML = box;

    // card event so i when i click on the card the details page appear
    // and it will be here because if i do it before or in getData function it will equal to null because the card wasn't render at the time we call it
    const gameCards = this.gameCardsHolder.querySelectorAll(".game-card");
    gameCards.forEach((card, index) => {
      card.addEventListener("click", () => {
        this.detailsInstance.displayDetails(data[index]);
      });
    });
  }

  // function take a string and it will be the describtion and the number of word i want to show in the card
  truncateDescription(description, wordLimit) {
    const words = description.split(" ");
    return words.length > wordLimit
      ? words.slice(0, wordLimit).join(" ") + "..."
      : description;
  }

  showLoading() {
    this.loadingHolder.classList.remove("d-none");
  }

  hideLoading() {
    this.loadingHolder.classList.add("d-none");
  }
}
