import { GameDetails } from "./details.module.js";

export class Ui {
  constructor(gameCardsHolder, navLinksHolder, detailsHolderSelector) {
    this.gameCardsHolder = document.querySelector(gameCardsHolder);
    this.navLinksHolder = document.querySelectorAll(navLinksHolder);
    this.detailsHolderSelector = detailsHolderSelector;
    this.detailsInstance = new GameDetails(detailsHolderSelector);

    this.apiURL =
      "https://free-to-play-games-database.p.rapidapi.com/api/games?category=";
    this.apiKeyHolder = "4bb84e2800msheb3af5ee298996bp10f673jsnb3afb546c9d6";
    this.apiHostHolder = "free-to-play-games-database.p.rapidapi.com";

    this.init();
  }

  init() {
    this.navLinksHolder.forEach((link) => {
      const customAtt = link.getAttribute("data-bs-name");
      link.addEventListener("click", () => this.getData(customAtt));
    });

    this.getData("mmorpg"); // Load default category
  }

  async getData(category) {
    try {
      const res = await fetch(`${this.apiURL}${category}`, {
        method: "GET",
        headers: {
          "x-rapidapi-key": this.apiKeyHolder,
          "x-rapidapi-host": this.apiHostHolder,
        },
      });
      const data = await res.json();
      console.log(data);

      this.displayGamesData(data);
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  }

  displayGamesData(data) {
    let box = ``;
    data.forEach((game) => {
      box += `
        <div class="col-12 col-md-6 col-lg-3 h-100 game-card" data-id="${
          game.id
        }">
          <div class="card bg-transparent">
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
          </div>
        </div>
      `;
    });

    this.gameCardsHolder.innerHTML = box;

    // card event so i when i click on the card the details page appear
    const gameCards = this.gameCardsHolder.querySelectorAll(".game-card");
    gameCards.forEach((card, index) => {
      card.addEventListener("click", () => {
        this.detailsInstance.displayDetails(data[index]);
      });
    });
  }

  truncateDescription(description, wordLimit) {
    const words = description.split(" ");
    return words.length > wordLimit
      ? words.slice(0, wordLimit).join(" ") + "..."
      : description;
  }
}
