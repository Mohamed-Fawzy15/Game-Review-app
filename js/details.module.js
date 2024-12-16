export class GameDetails {
  // constructor function that take the id of the element i want to show details in it but i take that id from the ui.module.js
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

    // when the details section appear the scroll bar will be disappear so that the user cant't scroll
    document.body.style.overflow = "hidden";

    // to scroll to the top when the user click on the card and the details section appear
    window.scrollTo({ top: 0, behavior: "instant" });

    const closeButton = this.detailsHolder.querySelector(".close-details");
    // event of the button to the user so that he can close the detials section
    closeButton.addEventListener("click", () => {
      this.closeDetails();
      this.hideDetails();
    });
  }

  // close button to make the details section disappear from the screen
  hideDetails() {
    this.detailsHolder.innerHTML = ""; // Clear the container
  }

  // close function to close the details and make it disappear, and make the user able to scroll again
  closeDetails() {
    this.detailsHolder.innerHTML = "";

    document.body.style.overflow = "auto";
  }
}
