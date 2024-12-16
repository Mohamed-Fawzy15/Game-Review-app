export class HomePage {
  constructor() {
    this.navlinksHolder = document.querySelectorAll(".nav-link");
  }

  setUp() {
    this.setActiveLink("mmorpg");
    this.activeOnClick();
  }

  //   this function remove/add the active class from the link depend on the the data needed
  setActiveLink(category) {
    this.navlinksHolder.forEach((link) => {
      if (link.getAttribute("data-bs-name") === category) {
        link.classList.add("active");
      } else {
        link.classList.remove("active");
      }
    });
  }

  //   this function get the vlue of the custom att i add so i can change the active class
  activeOnClick() {
    this.navlinksHolder.forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        const category = link.getAttribute("data-bs-name");
        this.setActiveLink(category);
      });
    });
  }
}
