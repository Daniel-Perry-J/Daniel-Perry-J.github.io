
// called whenever a key is pressed
function keyPressed() {
    if(gameover) {
        restartGame(); 
    }
    if (keyCode === RIGHT_ARROW || key === 'd') {
        spaceship.setDir(1);
    } else if (keyCode === LEFT_ARROW || key === 'a') {
        spaceship.setDir(-1);
    } else if (key === ' ') {
        bulletsHeld = true;
    } else if (keyCode === ESCAPE) {
        togglePauseMenu();
    }
}

// called whenever a key is released
function keyReleased() {
    if (keyCode === RIGHT_ARROW || keyCode === LEFT_ARROW) {
        spaceship.setDir(0);
    } else if (key === ' ') {
        bulletsHeld = false;
    }
}

// called when you click the mouse
function mousePressed() {
    // delay next shot
    if(gameover) {
        restartGame(); 
    }
    bulletsHeld = true;
}

// called when you drag the mouse
function mouseDragged() {
    if (mouse.x > spaceship.position.x) {
        spaceship.setDir(1);
    } else {
        spaceship.setDir(-1);
    }
}

// called whenever the mouse cursor is moved
// function mouseMoved() {
//     if (mouse.x > spaceship.x) {
//         spaceship.setDir(1);
//     } else {
//         spaceship.setDir(-1);
//     }
// }

// called when you lift your finger off the mouse
function mouseReleased() {
    spaceship.setDir(0);
    bulletsHeld = false;
}

// called when you touch the screen
function touchStarted() {
    if(gameover) {
        restartGame(); 
    }
    // Handle shooting on touch start
    bulletsHeld = true;
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
    bulletsHeld = false;
    return false;
}
