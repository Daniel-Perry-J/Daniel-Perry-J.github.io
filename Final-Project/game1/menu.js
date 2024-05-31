
// Main menu of game
// TODO : add a in game shop and other ways to improve progression
// 

let menuOptions = ["Play Game", "Shop", "Upgrades", "Stats", "Customization", "Settings"];
let selectedOption = -1;

function displayMenu() {
  let rectHeight = 50;
  let rectMargin = 20;
  let totalHeight = (rectHeight + rectMargin) * menuOptions.length;
  let startY = height / 2 - totalHeight / 2;

  for (let i = 0; i < menuOptions.length; i++) {
    let y = startY + i * (rectHeight + rectMargin);
    // Check if the mouse is over the rectangle
    if (mouseX > width / 2 - 100 && mouseX < width / 2 + 100 &&
        mouseY > y && mouseY < y + rectHeight) {
      fill(100); // Hover color
      if (mouseIsPressed) {
        selectedOption = i; // Set the selected option on click
        performAction(selectedOption); // Perform the action associated with the option
      }
    } else {
      fill(255); // Default color
    }
    rect(width / 2 - 100, y, 200, rectHeight, 10);
    fill(0);
    textAlign(CENTER, CENTER);
    text(menuOptions[i], width / 2, y + rectHeight / 2);
  }
}

function performAction(optionIndex) {
  // Define actions based on the selected option index
  switch (optionIndex) {
    case 0:
      // code to start the game
      state = GAME;
      break;
    case 1:
      // code to open the shop
      state = SHOP;
      break;
    case 2:
      // code for upgrades menu
      state = UPGRADES;
      break;
    case 3:
      // code to show stats
      state = STATS;
      break;
    case 4:
        // code for customization
        state = CUSTOM;
        break;
    case 5:
      // code for settings
      state = SETTINGS;
      break;
  }
}

function togglePauseMenu() {
    if (state == GAME) {
        speed = STOP;
        state = PAUSED;
    } else if (state == PAUSED) {
        speed = lspeed;
        state = GAME;
    }
}