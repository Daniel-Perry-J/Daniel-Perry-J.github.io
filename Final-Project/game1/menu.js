
// Main menu of game
// TODO : add a in game shop and other ways to improve progression
// 

let timeout = 0;
let mouseDown = false;
let musicVolume = 0.75;
let sfxVolume = 0.25;

function displayMenu() {
    let menuOptions = ["Play Game", "Shop", "Upgrades", "Stats", "Customization", "Settings"];
    displayButtons(menuOptions, menuAction);
    initializeMarket();
}

function displayButtons(options, action) { 
    speed = STOP;
    let selectedOption = -1;
    let rectHeight = 50;
    let rectMargin = 20;
    let totalHeight = (rectHeight + rectMargin) * options.length;
    let startY = height / 2 - totalHeight / 2;
    let mouseOver = false;

    for (let i = 0; i < options.length; i++) {
        let y = startY + i * (rectHeight + rectMargin);
        // Check if the mouse is over the rectangle
        if (mouseX > width / 2 - 100 && mouseX < width / 2 + 100 &&
            mouseY > y && mouseY < y + rectHeight) {
            mouseOver = true;
            if (mouseOver) {
                sfx[4].play();
            }
            fill(100); // Hover color
            if (mouseIsPressed && timeout <= 0) {
                mouseDown = true;
                selectedOption = i; // Set the selected option on click
            }
            if (mouseDown) {
                mouseDown = false;
                sfx[5].play();
                action(selectedOption); // Perform the action associated with the option
                break;
            }
        } else {
            mouseOver = false;
            fill(255); // Default color
        }
        rect(width / 2 - 100, y, 200, rectHeight, 10);
        fill(0);
        textAlign(CENTER, CENTER);
        textSize(12);
        text(options[i], width / 2, y + rectHeight / 2);
    }
}

function menuAction(optionIndex) {
    timeout = 1;
    // Define actions based on the selected option index
    switch (optionIndex) {
        case 0:
            // code to start the game
            state = GAME;
            speed = lspeed;
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
        default:
            break;
    }
}

function displayShop() {
    // decide what to have in the shop
    let shopOptions = ["BACK", "Coming soon ..."];
    displayButtons(shopOptions, performShopAction);
}

function performShopAction(optionIndex) {
    timeout = 1;
    // Define actions based on the selected option index
    switch (optionIndex) {
        case 0:
            // go back to the menu
            state = MENU;
            break;
        case 1:
            // stay in shop
            state = SHOP;
            break;
        default:
            break;
    }
}

function displayUpgrades() {
    let upgradeOptions = ["BACK", "Damage\nCost : " + damageUpgrade.price + " stardust", "Life\nCost : " + healthUpgrade.price + " stardust", "Coming soon ..."];
    displayButtons(upgradeOptions, upgradeAction)
}

function upgradeAction(optionIndex) {
    timeout = 1;
    switch (optionIndex) {
        case 0: 
            state = MENU;
            break;
        case 1:
            if (stardust >= damageUpgrade.price) {
                stardust -= damageUpgrade.price;
                damageUpgrade.sell();
            }
            break;
        case 2:
            if (stardust >= healthUpgrade.price) {
                stardust -= healthUpgrade.price;
                healthUpgrade.sell();
            }
            break;
        default:
            break;
    }
}

function displayStats() {
    statOptions = ["Back", "Coming Soon..."];
    displayButtons(statOptions, statAction);
    // Also display stats
}

function statAction(optionIndex) {
    timeout = 1;
    if (optionIndex == 0) {
        state = MENU;
    }
}

function displayCustomizationMenu() {
    customizationOptions = ["Back", "Coming Soon..."];
    displayButtons(customizationOptions, customAction);
}

function customAction(optionIndex) {
    timeout = 1;
    if (optionIndex == 0) {
        state = MENU;
    }
}

function displaySettings() {
    settingOptions = ["Back", "Coming Soon..,"];
    musicLabel.position(width/2, height/2 + 150);
    musicVolumeSlider.position(width/2, height/2 + 200);
    sfxLabel.position(width/2, height/2 + 250);
    sfxVolumeSlider.position(width/2, height/2 + 300);
    musicVolume = musicVolumeSlider.value();
    sfxVolume = sfxVolumeSlider.value();
    musicVolumeSlider.style('z-index', 1);
    sfxVolumeSlider.style('z-index', 1);
    musicLabel.style('z-index', 1);
    musicLabel.style('color', '#fff');
    sfxLabel.style('z-index', 1);
    sfxLabel.style('color', '#fff');
    musicVolumeSlider.show();
    sfxVolumeSlider.show();
    musicLabel.show();
    sfxLabel.show();
    music[0].setVolume(musicVolume);
    sfx.forEach((s) => s.setVolume(sfxVolume));
    displayButtons(settingOptions, settingsAction);
}

function settingsAction(optionIndex) {
    timeout = 1;
    if (optionIndex == 0) {
        state = MENU;
        musicVolumeSlider.style('z-index', -1);
        sfxVolumeSlider.style('z-index', -1);
        musicLabel.style('z-index', -1);
        sfxLabel.style('z-index', -1);
        musicVolumeSlider.hide();
        sfxVolumeSlider.hide();
        musicLabel.hide();
        sfxLabel.hide();
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
