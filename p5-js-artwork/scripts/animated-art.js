let img = null;
let time = 0;
let offset = 1;

// function preload() {
//  // img = loadImage('assets/texture.jpg');
// }

BACKGROUND_COLOR = "rgba(44,32,63, 0.99)";
WHITE = "rgba(255, 255, 255, 0.5)";
YELLOW = "rgba(242,223,92,0.99)";
GOLD = "rgba(220, 165, 55, 0.99)";
RED = "rgba(238,0,0,0.5)";
RED_1 = "rgba(238,0,0,0.99)";
ORANGE = "rgba(199, 102, 60, 0.5)";
ORANGE_1 = "rgba(230,178,45,0.65)";
BROWN = "rgba(150, 87, 65, 0.99)";
TAN = "rgba(185, 168, 122, 0.5)";
BEIGE = "rgba(232, 223, 194, 0.9)";
DARKBLUE = "rgba(65,38,186,0.61)";
PINK = "rgba(229,148,240,0.5)";
PINK_1 = "rgba(202,179,215,0.9)";
PURPLE = "rgba(172, 170, 221, 0.5)";
BLACK = "rgba(0,0,0,0.65)";
BLACK_1 = "rgba(0,0,0,0.85)";
GREEN = "rgba(164,227,182,0.9)";
OLIVE = "rgba(46,97,94,0.23)";
BLUE = "rgba(71,155,190,0.72)";
BLUE_1 = "rgba(33,65,240,0.8)";
LIGHTBLUE = "rgba(54,223,229,0.45)";
MAGENTA = "rgba(207, 82, 119, 0.99)";
TEAL = "rgba(191, 239, 228, 0.99)";

function setup() {
  createCanvas(600, 600);

  // background
  background(BACKGROUND_COLOR);

  // circle glow
  sircle(TEAL, 85, 300, 245);
  sircle(TEAL, 40, 370, 130);
  sircle(TEAL, 25, 260, 395);

  // textures
  //   texture(img);
  //   textureMode(NORMAL);
  //   beginShape();
  //   vertex(-50, -50, 0, 0);
  //   vertex(50, -50, 1, 0);
  //   vertex(50, 50, 1, 1);
  //   vertex(-50, 50, 0, 1);
  //   endShape();
}

function draw() {
  // display info
  // background(BACKGROUND_COLOR);
  // stroke(20);
  // strokeWeight(5);
  // fill(255);
  // textSize(20);
  // text("time="+time, 50, 50);

  // layers
  layer1();
  layer2();
  layer3();
  layer4();

  // update time
  time += 0.005;
  time %= 2;

  // modify offsets
  if (time < 1) {
    offset = time;
  } else {
    offset = 1 - (time - 1);
  }
}

function layer1() {
  // two outter circles
  sircle(YELLOW, 8, 60, 61);
  sircle(PINK, 16, 74, 140);

  // center circle
  sircle(DARKBLUE, 80, 300, 245);

  // target circle
  sircle(LIGHTBLUE, 15, 75, 335);

  // overlapping group
  sircle(GOLD, 12, 151, 360);
  sircle(BROWN, 12, 161, 405);
  sircle(YELLOW, 12, 110, 395);

  // upper left circles
  sircle(WHITE, 13, 495, 100);
  sircle(YELLOW, 12, 495, 100);
  sircle(ORANGE, 10, 540, 140);
  sircle(RED, 8, 580, 90);

  // lower right circles
  sircle(WHITE, 9, 570, 350);
  sircle(BLUE_1, 8, 570, 350);
  sircle(PURPLE, 25, 530, 450);
  sircle(YELLOW, 5, 505, 515);
  sircle(RED, 7, 490, 555);
  sircle(BLUE, 6, 545, 575);

  // cluster
  sircle(LIGHTBLUE, 20, 375, 420);
  sircle(GOLD, 8, 350, 500);

  // lower left circles
  sircle(PINK, 8, 90, 460);
  sircle(BLUE, 12, 120, 511);
  sircle(YELLOW, 8, 78, 541);
}

function layer2() {
  // center circle
  sircle(PINK, 30, 370, 130);

  // little circles
  sircle(YELLOW, 4, 148, 298);
  sircle(BLACK, 4, 188, 368);
  sircle(PINK, 3, 222, 375);
  sircle(BLACK, 3, 245, 435);

  // target circle
  sircle(BLACK, 14, 75, 335);

  // overlapping group
  sircle(ORANGE, 12, 175, 385);
  sircle(RED, 12, 130, 403);

  // center cluster
  sircle(PURPLE, 18, 270, 403);
  sircle(GREEN, 18, 335, 275);
  sircle(OLIVE, 25, 485, 205);

  // lower left circle
  sircle(BLACK_1, 7.5, 78, 541);

  // lower right circles
  sircle(TAN, 10, 475, 425);
  sircle(BEIGE, 10, 505, 450);
  sircle(RED_1, 4, 530, 410);
  sircle(BLACK_1, 3, 545, 410);
  sircle(ORANGE_1, 5, 585, 450);
}

function layer3() {
  // Big black circle
  sircle(BLACK, 48, 250, 205);

  // little circles
  sircle(BLACK_1, 3, 148, 298);
  sircle(MAGENTA, 3, 188, 368);

  // center cluster
  sircle(ORANGE, 30, 385, 335);
  sircle(ORANGE_1, 15, 315, 340);
  sircle(PINK, 10, 420, 375);

  // lower right circles
  sircle(LIGHTBLUE, 8, 505, 450);

  // target circle
  sircle(PINK_1, 13, 75, 335);
  sircle(BLUE, 8, 485, 205);
}

function layer4() {
  // target circle
  sircle(BLACK_1, 5, 85, 325);
  sircle(BLACK_1, 7, 485, 205);

  // little circles
  sircle(BLACK_1, 3, 400, 385);

  // hole
  sircle(LIGHTBLUE, 8, 285, 285);
}

function sircle(c, scale, x, y) {
  // No stroke
  strokeWeight(0);

  newc = color(c);
  if (time != 0) {
    hexString = newc.toString("#rrggbbaa");
    let _color = parseInt(hexString.slice(1), 16);
    newc.setRed(getR(_color) * (offset+0.5));
    newc.setGreen(getG(_color) * (offset+0.5));
    newc.setBlue(getB(_color) * (offset+0.5));
  }

  // Fill with color
  fill(newc);

  // x, y, d
  circle(x, y, 4 * scale * offset);
}

// string format #rrggbbaa

function getR(c) {
  c /= 0xffffff;
  return c;
}

function getG(c) {
  c /= 0xffff;
  c %= 0xff;
  return c;
}

function getB(c) {
  c /= 0xff;
  c %= 0xff;
  return c;
}
