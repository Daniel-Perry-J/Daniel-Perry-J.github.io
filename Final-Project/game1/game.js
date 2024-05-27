let spaceship = null;
let score = 0;
let time = 0; // in seconds
let logger = false;
let gameover = false;
let bullets = [];
let enemies = [];

// called whenever we want to restart the game
function restartGame() {
    setup();
    gameover = false;
    bullets = [];
    enemies = [];
    score = 0;
    time = 0;
}

// called on first launch
function setup() {
    setOrientation();
    createCanvas(windowWidth, windowHeight);
    spaceship = new Spaceship();
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

// called every frame
function draw() {
    background(0);

    displayScore();
    displayTime();

    if (spaceship.lives < 1) {
        gameover = true;
    }

    if (gameover) {
        displayGameover();
        return;
    } else {
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

        checkCollisions()

        // Prevent player from escaping canvas
        if (spaceship.x <= spaceship.width) {
            spaceship.x = width - spaceship.width - 1;
        } else if (spaceship.x >= width - spaceship.width) {
            spaceship.x = spaceship.width + 1;
        }

        // Prevent enemies from leaving canvas
        for (let j = enemies.length-1; j >= 0; j--) {
            if (enemies[j].y >= height - enemies[j].height) {
                enemies[j].y = enemies[j].height + 1;
            }
        }

        // Delete any bullets leaving the canvas
        for (let i = bullets.length-1; i >= 0; i--) {
            if (bullets[i].y <= bullets[i].height) {
                bullets.splice(i, 1);
            }
        }

        // Spawn enemies randomly
        if (frameCount % 60 === 0) {
            time++;
            enemies.push(new Enemy());
            if (logger && frameCount % 300) {
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
                    score += 100;
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

// TODO : Add the following classes
// Hazards
// Projectiles sub class of Hazards
// Enemy should be a sub class of Hazards
// Player generated Projectiles should not be a hazard to the player
// Space Debris will be a Hazard
// Power ups can be collected from special Enemies or randomly if you are close to losing
// More ...