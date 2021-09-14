// Test import of styles
import "@/styles/index.scss";
import Game from "./js/app/game";

const app = document.querySelector("#root");

const game = new Game();
game.init();
game.run(app);

//app.append(logo, heading);
