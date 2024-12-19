import { Ui as gameApp } from "./ui.module.js";
import { HomePage } from "./home.module.js";

window.addEventListener("load", function () {
  const Ui = new gameApp(
    "#gamesData",
    ".nav-link",
    ".detailsHolder",
    ".loading"
  );
  const homePage = new HomePage();

  homePage.setUp();

  Ui.getData("mmorpg");
});
