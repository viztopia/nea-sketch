let x1, x2;
let xspeed1, xspeed2;
let speed = 5;
let low = 0;
let high = 255;
let a = low;
let aspeed = 5; //changed from 0.5 for testing the rock
let bg = high;
let m = 120;
let thresW = 30;
let rockX = undefined;
let rockY;
let rockW = 20;
let rockH = 60;
let showRock = true;

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
  noCursor();
  randomSeed(0);
  reset();
}

function reset() {
  console.log("RESET");
  a = low;
  x1 = width * random(0.1, 0.5);
  x2 = width - x1;
  xspeed1 = random(-speed, speed); //random(1) > 0.5 ? -speed : speed;
  // Go the opposite way
  xspeed2 = random(-speed, speed); //xspeed1 > 0 ? -speed : speed;

  //randomize rock
  rockX = undefined;
  rockY = height/2 - rockH + random(-rockH * 3, rockH * 3);
  showRock = random(1) < 0.5;
}

function draw() {
  background(bg);
  // Is the background white or black?
  // Make it the oppposite color
  fill(bg > low ? low : high, a);
  rect(0, 0, x1, height);
  rect(x2, 0, width - x2, height);
  a += aspeed;
  // If fully faded in
  if (a > high + m || a < low - m) {
    x1 += xspeed1;
    x2 += xspeed2;

    // if left and right rects cross, show the rock
    if (showRock && x1>x2){
      if (rockX == undefined) rockX = x2;
      fill(bg);
      if (abs(xspeed2) < abs(xspeed1)) { //mid rect shrinking to the right, show rock on the right
        rect(rockX, rockY, x1-x2 < rockW ? x1-x2 : rockW, rockH);
      } else {
        rect(rockX-(x1-x2 < rockW ? x1-x2 : rockW), rockY, x1-x2 < rockW ? x1-x2 : rockW, rockH);
      }
    }

    if ((x1 > width || x1 < 0) && (x2 > width || x2 < 0)) {
      if (x1 > width || x2 < 0) {
        // If the background was white, make it black
        bg = bg > low ? low : high;
        console.log(bg);
      }
      reset();
    }
  }
}