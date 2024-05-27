
// called whenever a key is pressed
function keyPressed() {
    if(gameover) {
        restartGame(); 
    }
    if (keyCode === RIGHT_ARROW) {
        spaceship.setDir(1);
    } else if (keyCode === LEFT_ARROW) {
        spaceship.setDir(-1);
    } else if (key === ' ') {
        bullets.push(new Bullet(spaceship.x, spaceship.y));
    }
}

// called whenever a key is released
function keyReleased() {
    if (keyCode === RIGHT_ARROW || keyCode === LEFT_ARROW) {
        spaceship.setDir(0);
    }
}

// called when you click the mouse
function mousePressed() {
    // delay next shot
    if(gameover) {
        restartGame(); 
    }
}

// called when you drag the mouse
function mouseDragged() {}

// called when you lift your finger off the mouse
function mouseClicked() {
    bullets.push(new Bullet(spaceship.x, spaceship.y))
}

// called when you touch the screen
function touchStarted() {
    if(gameover) {
        restartGame(); 
    }
    // Handle shooting on touch start
    bullets.push(new Bullet(spaceship.x, spaceship.y));
    return false;
}

// called if you hold down on the screen
function touchMoved() {
    for (let touch of touches) {
        // Handle spaceship movement based on touch position
        if (touch.x > width / 2) {
            spaceship.setDir(1);
        } else {
            spaceship.setDir(-1);
        }
    }
    return false;
}

// called when you release your finger from the screen
function touchEnded() {
    // Stop the spaceship when the touch ends
    spaceship.setDir(0);
    return false;
}
