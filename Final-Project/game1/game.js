// globals
let spaceship = null;
let score = 0;
let highscore = 0;
let time = 0; // in seconds
let logger = false;
let gameover = false;
// sprite lists
let bullets = [];
let enemies = [];
// modifiers
let multiplier = 1.0;
let difficulty = 1.0;
let speed = 1.0;

// constants
// game speeds
const HYPER = 4.0;
const FAST = 2.0;
const NORMAL = 1.0;
const SLOW = 0.5;
const VERY_SLOW = 0.25;

// called whenever we want to restart the game
function restartGame() {
    gameover = false;
    bullets = [];
    enemies = [];
    score = 0;
    time = 0;
    multiplier = 1.0;
    difficulty = 1.0;
    speed = NORMAL;
    setup();
}

// called to load anything before launching
let bgImg = null;
let imgPath = "";
let imgX = 0;
let imgY = 0;
function preload() {
    let n = Math.floor(Math.random() * 5);
    imgPath = "./assets/imgs/bgs/spacebg_" + n + ".png";
    bgImg = loadImage(imgPath);
}

// called on first launch
function setup() {
    setOrientation();
    createCanvas(windowWidth, windowHeight);
    spaceship = new Spaceship();
    highscore = getHighScore();
}

// forces the screen to landscape if possible
function setOrientation() {
    if (screen.orientation && screen.orientation.lock) {
        screen.orientation.lock('landscape').catch(err => {
            console.error('Orientation lock failed: ', err);
        });
    } else {
        console.warn('Orientation lock is not supported on this device.');
    }
}

// called whenever I resize the window
function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

// also called each frame
// creates an animated background
function drawBackground(frameCount) {
    // clear the canvas
    background(0);

    // set img coordinates
    image(bgImg, imgX, imgY-height, width, height);  // double imgs for smooth layering
    image(bgImg, imgX, imgY, width, height);

    // update positions
    imgY += speed * 1.5;
    imgY %= height;
}

// called every frame
function draw() {
    drawBackground(frameCount);

    displayScore();
    displayTime();
    displayLives();

    if (spaceship.lives < 1) {
        gameover = true;
    }

    if (gameover) {
        displayGameover();
        saveHighScore();
        return;
    } else {

        fireBullets();

        spaceship.show();
        spaceship.move();

        for (let bullet of bullets) {
            bullet.show();
            bullet.move();
        }

        for (let enemy of enemies) {
            enemy.show();
            enemy.move();
        }

        // update difficulty and multipliers
        difficulty = 1.0 + (0.1) * Math.floor(time/15);
        multiplier = 1.0 + (0.1) * Math.floor(time/60);

        checkCollisions()

        // Prevent player from escaping canvas
        if (spaceship.x <= spaceship.width) {
            spaceship.x = width - spaceship.width - 1;
        } else if (spaceship.x >= width - spaceship.width) {
            spaceship.x = spaceship.width + 1;
        }

        // Prevent enemies from leaving canvas
        for (let j = enemies.length - 1; j >= 0; j--) {
            if (enemies[j].y >= height - enemies[j].height) {
                enemies[j].y = enemies[j].height + 1;
            }
        }

        // Delete any bullets leaving the canvas
        for (let i = bullets.length - 1; i >= 0; i--) {
            if (bullets[i].y <= bullets[i].height) {
                bullets.splice(i, 1);
            }
        }

        // Spawn enemies randomly
        if (frameCount % 60 === 0) {
            time++;
            enemies.push(new Enemy());
            if (logger && frameCount % 500) {
                console.log(`Player Info`);
                console.log(`player_x = ${spaceship.x}`);
                console.log(`player_y = ${spaceship.y}`);
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

// handle collisions
function checkCollisions() {
    // Check for collisions between bullets and enemies
    for (let i = bullets.length - 1; i >= 0; i--) {
        for (let j = enemies.length - 1; j >= 0; j--) {
            if (!(bullets[i] === undefined) && !(enemies[j] === undefined)) {
                // bullets hits an enemy
                if (bullets[i].hits(enemies[j])) {
                    enemies.splice(j, 1);
                    bullets.splice(i, 1);
                    j--;
                    i--;
                    score += Math.floor(100 * multiplier);
                    break;
                }
            }
        }
    }

    // Check for collisions between the enemies and the player
    for (let j = enemies.length - 1; j >= 0; j--) {
        // enemy hits the player
        if (enemies[j].hits(spaceship)) {
            spaceship.lives--;
            enemies = [];
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
    if (bulletsHeld && frameCount - lastFrameFired > bulletCooldown) {
        bullets.push(new Bullet(spaceship.x, spaceship.y));
        frameCount = lastFrameFired;
    }
}

// TODO : Add the following classes
// Hazards
// Projectiles sub class of Hazards
// Enemy should be a sub class of Hazards
// Player generated Projectiles should not be a hazard to the player
// Space Debris will be a Hazard
// Power ups can be collected from special Enemies or randomly if you are close to losing
// More ...