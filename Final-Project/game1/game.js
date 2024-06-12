// globals

// variables
let spaceship = null;
let score = 0;
let highscore = 0;
let time = 0; // in seconds
let lastTime = 0;
let wave = 0;
let enemiesDefeated = 0;
let logger = false;
let gameover = false;

// currencies
let stardust = 0;
let starcores = 0;

// sprite lists
let bullets = [];
let enemies = [];
let powerups = [];

// modifiers
let baseMultiplier = 1.0;
let multiplier = 1.0;
let baseDifficulty = 1.0;
let difficulty = 1.0;
let speed = 1.0;
let lspeed = 1.0;
let playerSpeed = 1.0;

// constants

// states
let MENU = 0;
let GAME = 1;
let PAUSED = 2;
let SHOP = 3;
let UPGRADES = 4;
let STATS = 5;
let CUSTOM = 6;
let SETTINGS = 7;
let state = MENU;

// game speeds
const HYPER = 4.0;
const FAST = 2.0;
const NORMAL = 1.0;
const SLOW = 0.5;
const VERY_SLOW = 0.25;
const STOP = 0;


// called whenever we want to restart the game
function restartGame() {
    gameover = false;
    bullets = [];
    enemies = [];
    score = 0;
    time = 0;
    lastTime = 0;
    lastFrameFired = 0;
    wave = 0;
    enemiesDefeated = 0;
    multiplier = 1.0;
    difficulty = 1.0;
    speed = lspeed;
    spaceship = new Spaceship();
    // setup();
}

// called to load anything before launching
// DOM
let sfxVolumeSlider;
let musicVolumeSlider;
let sfxLabel;
let musicLabel;
// sound
let sfx = [];
let sfxPath = "";
let music = [];
let musicPath = "";
let numSFXs = 6;
let numMusic = 1;
// images
let bgImg = [];
let imgPath = "";
let imgX = 0;
let imgY = 0;
let numImgs = 14;
let topBuffer = 0;
let bottomBuffer = 0;
function preload() {
    // Display loading screen before p5.js loads in
    const container = document.getElementById("gameContainer");
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext('2d');

    canvas.width = windowWidth;
    canvas.height = windowHeight;

    // Draw dark background
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw white text
    ctx.fillStyle = '#fff';
    ctx.font = '24px Arial';
    ctx.fillText('Loading...', 50, 100);

    container.appendChild(canvas);

    for (let i = 0; i < numImgs; i++) {
        imgPath = "./assets/imgs/bgs/spacebg_" + i + ".png";
        bgImg[i] = loadImage(imgPath);
    }

    for (let i = 0; i < numSFXs; i++) {
        sfxPath = "./assets/sounds/sfx_" + i + ".wav";
        if (i > 1) {
            sfxPath = "./assets/sounds/sfx_" + i + ".mp3";
        }
        sfx[i] = loadSound(sfxPath);
    }

    for (let i = 0; i < numMusic; i++) {
        musicPath = "./assets/music/ambiance_" + i + ".mp3";
        music[i] = loadSound(musicPath);
    }
}

// called on first launch
function setup() {
    // background the first canvas
    const container = document.getElementById("gameContainer");
    if (container != null && container.className != "hidden") {
        container.className = "hidden";
        container.remove();
    }
    // setOrientation();
    if (windowWidth <= 650) {
        createCanvas(windowWidth, windowHeight);
    } else {
        createCanvas(windowWidth*0.6, windowHeight);
    }
    spaceship = new Spaceship();
    highscore = getHighScore();
    topBuffer = Math.floor(/*random(numImgs)*/0);
    bottomBuffer = Math.floor(/*random(numImgs)*/0);

    // play background music on repeat
    music[0].loop();
    // adjust volume
    music[0].setVolume(musicVolume);
    sfx.forEach((s) => s.setVolume(sfxVolume));

    // create DOM elements
    musicVolumeSlider = createSlider(0, 0.75, 0.25, 0.01);
    sfxVolumeSlider = createSlider(0, 0.5, 0.1, 0.01);
    musicLabel = createP("Music Volume");
    sfxLabel = createP("SFX Volume");
    musicVolumeSlider.style('z-index', -1);
    sfxVolumeSlider.style('z-index', -1);
    musicLabel.style('z-index', -1);
    sfxLabel.style('z-index', -1);
}

// forces the screen to landscape if possible
// function setOrientation() {
//     if (screen.orientation && screen.orientation.lock) {
//         screen.orientation.lock('landscape').catch(err => {
//             console.error('Orientation lock failed: ', err);
//         });
//     } else {
//         console.warn('Orientation lock is not supported on this device.');
//     }
// }

// called whenever I resize the window
function windowResized() {
    if (windowWidth <= 650) {
        resizeCanvas(windowWidth, windowHeight);
    } else {
        resizeCanvas(windowWidth*0.6, windowHeight);
    }
    updateDisplays();
}

// also called each frame
// creates an animated background
function drawBackground() {
    // clear the canvas
    background(0);

    // choose a new random img
    if (imgY + speed * 1.25 * state >= height) {
        bottomBuffer = topBuffer;
        topBuffer = Math.floor(/*random(numImgs)*/0);
    } else {
        // set img coordinates
        image(bgImg[topBuffer], imgX, imgY-height, width, height);  // double imgs for smooth layering
        image(bgImg[bottomBuffer], imgX, imgY, width, height);
    }

    // update positions
    imgY += speed * 1.25 * state;
    imgY %= height;
}

// called every frame
function draw() {
    drawBackground();
    updateDisplays();

    // Prevent Clicking to fast because it causes problems
    if (frameCount % 60 == 0 && timeout > 0) {
        timeout--;
    }

    if (state == MENU) {
        displayMenu();
    } else if (state == SHOP) {
        displayShop();
        displayCurrency();
    } else if (state == UPGRADES) {
        displayUpgrades();
        displayCurrency();
    } else if (state == STATS) {
        displayStats();
    } else if (state == CUSTOM) {
        displayCustomizationMenu();
    } else if (state == SETTINGS) {
        displaySettings();
    } else if (state == GAME || state == PAUSED) {
        if (state == PAUSED)
            displayPauseMenu();
        displayScore();
        displayTime();
        displayLives();
        displayCurrency();

        if (spaceship.lives < 1) {
            gameover = true;
        }

        if (gameover) {
            displayGameover();
            saveHighScore();
        } else {
            // runs when !gameover
            fireBullets();

            if (touches.length == 0 && windowWidth <= 600)
                spaceship.setDir(0);
            if (windowWidth > 600) {
                if (keysDown[0] == 1) {
                    spaceship.setDir(1);
                } else if (keysDown[1] == 1) {
                    spaceship.setDir(-1);
                }
            }

            spaceship.show();
            spaceship.move();

            if (bullets.length > 0) {
                bullets.forEach((bullet) => bullet.move());
                bullets.forEach((bullet) => bullet.show());
            }
            if (enemies.length > 0) {
                enemies.forEach((enemy) => enemy.move());
                enemies.forEach((enemy) => enemy.show());
            }

            // update difficulty and multipliers
            difficulty = baseDifficulty + (0.1) * time + wave/2;
            multiplier = baseMultiplier + (0.1) * Math.floor(time/15);

            // improve player speed with time
            playerSpeed = (0.1) * time + 1.0;

            // update wave number based on time or kills
            if (wave < 10) {
                if (enemiesDefeated > 5) {
                    enemiesDefeated = 0;
                    wave++;
                    lastTime = time;
                } else if (time - lastTime > 5) {
                    wave++;
                    lastTime = time;
                }
            } else {
                if (enemiesDefeated > difficulty * 7) {
                    enemiesDefeated = 0;
                    wave+=5;
                    lastTime = time;
                } else if (time - lastTime > 20) {
                    wave++;
                    lastTime = time;
                }
            }

            checkCollisions();

            playerWarp();

            cleanup();

            // Spawn enemies randomly (every second)
            if (Math.floor(frameCount/speed) % Math.floor(60) === 0)
                spawn_enemies(difficulty);

            // code to run every 60 frames
            if ((Math.floor(frameCount/speed) % 60 === 0) && (state == GAME)) {
                time++;
                if (Math.floor(random(120)) == 1) {
                    powerups.push(new Powerup());
                }
                if (logger && frameCount % 500) {
                    console.log(`Player Info`);
                    console.log(`player_x = ${spaceship.position.x}`);
                    console.log(`player_y = ${spaceship.position.y}`);
                    console.log(`player_lives : ${spaceship.lives}`);

                    console.log(`Sprite Info`);
                    console.log(`Bullets : = ${bullets.length}`);
                    console.log(`Bullets : = ${bullets}`);
                    console.log(`Enemies : = ${enemies.length}`);
                    console.log(`Enemies : = ${enemies}`);
                }
            }
        }
    }
}

// Removes any excess sprites from the sprite lists
function cleanup() {
    // Delete any enemies leaving the canvas
    for (let j = enemies.length - 1; j >= 0; j--) {
        if (enemies[j].position.y >= height - enemies[j].size.y) {
            //enemies[j].position.y = enemies[j].size.y + 1;
            enemies.splice(j, 1);
        }
    }

    // Delete any bullets leaving the canvas
    for (let i = bullets.length - 1; i >= 0; i--) {
        if (bullets[i].position.y <= bullets[i].size.y) {
            bullets.splice(i, 1);
        }
    }
}

// Warps the player to the other side of the screen
function playerWarp() {
    // Prevent player from escaping canvas
    if (spaceship.position.x <= spaceship.size.x) {
        spaceship.position.x = width - spaceship.size.x - 1;
    } else if (spaceship.position.x >= width - spaceship.size.x) {
        spaceship.position.x = spaceship.size.x + 1;
    }
}

// handle collisions
function checkCollisions() {
    // Check for collisions between bullets and enemies
    for (let i = bullets.length - 1; i >= 0; i--) {
        for (let j = enemies.length - 1; j >= 0; j--) {
            if (!(bullets[i] === undefined) && !(enemies[j] === undefined)) {
                // bullets hits an enemy
                if (bullets[i].hits(enemies[j])) {
                    if (enemies[j].lives - 1 < 1) {
                        enemies.splice(j, 1);
                        bullets.splice(i, 1);
                        j--;
                        i--;
                        score += Math.floor(100 * multiplier);
                        sfx[1].play();
                    } else {
                        enemies[j].lives -= 1;
                        enemies[j].difficulty -= 5;
                        score += Math.floor(10 * multiplier);
                    }
                    break;
                }
            }
        }
    }

    // Check for collisions between the enemies and the player
    for (let j = enemies.length - 1; j >= 0; j--) {
        // enemy hits the player
        if (enemies[j].hits(spaceship)) {
            spaceship.lives -= (Math.floor(enemies[j].difficulty / 5) + 1) * 5;
            if (spaceship.lives < 1) {
                timeout = 5;
            }
            enemies = [];
            bullets = [];
            sfx[2].play();
            break;
        }
    }
}

// save high score if needed
function saveHighScore() {
    // save the highscore
    let cookie = getCookie("highscore");
    if (!(cookie === "")) {
        if (cookie.valueOf() < score) {
            setCookie("highscore", score, 100);
        }
    } else {
        setCookie("highscore", score, 100);
    }
}

// get high score if saved 
function getHighScore() {
    let cookie = getCookie("highscore");
    if (!(cookie === "")) {
        return cookie.valueOf();
    }
    return 0;
}

// cookie frame work
function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    let expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}
  
function getCookie(cname) {
let name = cname + "=";
let ca = document.cookie.split(';');
for(let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
    c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
    return c.substring(name.length, c.length);
    }
}
return "";
}

function checkCookie() {
let user = getCookie("username");
if (user != "") {
    alert("Welcome again " + user);
} else {
    user = prompt("Please enter your name:", "");
    if (user != "" && user != null) {
    setCookie("username", user, 365);
    }
}
}

// bullets
let lastFrameFired = 0;
let bulletCooldown = 20/speed;  // 20 frames
let bulletsHeld = false;

function fireBullets() {
    if (state == GAME && !gameover) {
        if (bulletsHeld && frameCount - lastFrameFired > bulletCooldown) {
            bullets.push(new Bullet(spaceship.position.x, spaceship.position.y, new Vector(0, -7.5)));
            lastFrameFired = frameCount;
            sfx[0].play();
        }
    }
}
