export class GameDetails {
  constructor(detailsHolderSelector) {
    this.detailsHolder = document.querySelector(detailsHolderSelector);
  }

  // function to display details dynamically for a specific game
  displayDetails(game) {
    const detailsHTML = `
        <section class="details text-white py-4 position-absolute top-0 bottom-0 start-0 end-0 z-3">
          <div class="container">
            <header class="d-flex justify-content-between align-items-center py-5">
              <h2 class="mb-0">Details Game</h2>
              <i class="fa-solid fa-times close-details fs-2"></i>
            </header>
  
            <div class="row">
              <div class="col-12 col-md-4">
                <img src="${game.thumbnail}" class="w-100" alt="Game Image" />
              </div>
              <div class="col-12 col-md-8">
                <h3>Title: ${game.title}</h3>
                <div class="d-flex align-items-center justify-content-start gap-2 my-3">
                  <p class="mb-0">Category:</p>
                  <span class="badge text-bg-info d-flex align-items-center text-uppercase">${
                    game.genre
                  }</span>
                </div>
                <div class="d-flex align-items-center justify-content-start gap-2 my-3">
                  <p class="mb-0">Platform:</p>
                  <span class="badge text-bg-info d-flex align-items-center text-uppercase">${
                    game.platform
                  }</span>
                </div>
                <div class="d-flex align-items-center justify-content-start gap-2 my-3">
                  <p class="mb-0">Status:</p>
                  <span class="badge text-bg-info d-flex align-items-center text-uppercase">${
                    game.status || "Live"
                  }</span>
                </div>
                <p class="my-3">${game.short_description}</p>
                <a href="${
                  game.game_url
                }" class="btn btn-outline-warning">Show Game</a>
              </div>
            </div>
          </div>
        </section>
      `;

    this.detailsHolder.innerHTML = detailsHTML;

    document.body.style.overflow = "hidden";

    window.scrollTo({ top: 0, behavior: "instant" });

    const closeButton = this.detailsHolder.querySelector(".close-details");
    closeButton.addEventListener("click", () => {
      this.closeDetails();
      this.hideDetails();
    });
  }

  hideDetails() {
    this.detailsHolder.innerHTML = ""; // Clear the container
  }

  closeDetails() {
    this.detailsHolder.innerHTML = "";

    document.body.style.overflow = "auto";
  }
}
