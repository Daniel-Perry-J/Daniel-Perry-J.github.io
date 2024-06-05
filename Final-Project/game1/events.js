let mouseLocked = false;

let keysDown = [0, 0];
// called whenever a key is pressed
function keyPressed() {
    //console.log(`keyDown = ${keyCode}`);
    if (timeout <= 0) {
        if (keyCode === RIGHT_ARROW || key === 'd') {
            spaceship.setDir(1);
            keysDown[0] = 1;
        } else if (keyCode === LEFT_ARROW || key === 'a') {
            spaceship.setDir(-1);
            keysDown[1] = 1;
        } else if (key === ' ') {
            bulletsHeld = true;
        } else if (keyCode === ESCAPE) {
            togglePauseMenu();
        } else if (key === 't') {
            gameover = true;
        } else if (key === 'l') {
            mouseLocked = !mouseLocked;
        }
    }
}

// called whenever a key is released
function keyReleased() {
    //console.log(`keyUP = ${keyCode}`);
    if (keyCode === RIGHT_ARROW || key === 'd') {
        spaceship.setDir(0);
        keysDown[0] = 0; 
    } else if (keyCode === LEFT_ARROW || key === 'a') {
        spaceship.setDir(0);
        keysDown[1] = 0;
    } else if (key === ' ') {
        bulletsHeld = false;
    }
}

// called when you click the mouse
function mousePressed() {
    //console.log(`mouseDown = ${mouseX}`);
    // delay next shot
    if (timeout <= 0) {
        bulletsHeld = true;
    }
}

let lastDrag = 0;
// called when you drag the mouse
function mouseDragged() {
    // console.log(`mouseDragged = ${mouseX}`);
    if (!mouseLocked) {
        lastDrag = frameCount;
        if (mouseX - 10 > spaceship.position.x) {
            spaceship.setDir(1);
        } else if (mouseX + 10 < spaceship.position.x) {
            spaceship.setDir(-1);
        } else {
            spaceship.setDir(0);
        }
    }
}

// called whenever the mouse cursor is moved
function mouseMoved() {
    // console.log(`mouseMoved = ${mouseX}`);
    if (mouseLocked) {
        if (mouseX - 10 > spaceship.position.x) {
            spaceship.setDir(1);
        } else if (mouseX + 10 < spaceship.position.x) {
            spaceship.setDir(-1);
        } else {
            spaceship.setDir(0);
        }
    } else {
        if (frameCount - lastDrag > 90) {
            spaceship.setDir(0);
        }
    }
}

// called when you lift your finger off the mouse
function mouseReleased() {
    //console.log(`mouseUp = ${mouseX}`);
    spaceship.setDir(0);
    bulletsHeld = false;
}

// called when you touch the screen
function touchStarted() {
    if (timeout <= 0) {
        // Handle shooting on touch start
        bulletsHeld = true;
    }
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
}

// called when you release your finger from the screen
function touchEnded() {
    // Stop the spaceship when the touch ends
    spaceship.setDir(0);
    bulletsHeld = false;
}

