class WhiteRect {
  constructor(preset) {
    this.preset = preset;
    this.out = false;
    this.speed = random(0.1, 1) * 3;
    switch (preset) {
      case 0: //from top
        this.w = width;
        this.h = height * random(0.1, 1);
        this.x = 0;
        this.y = -this.h;
        this.dirX = 0;
        this.dirY = 1;
        break;
      case 1: //from right
        this.w = width * random(0.1, 1);
        this.h = height;
        this.x = width;
        this.y = 0;
        this.dirX = -1;
        this.dirY = 0;
        break;
      case 2: //from bottom
        this.w = width;
        this.h = height * random(0.1, 1);
        this.x = 0;
        this.y = height + this.h;
        this.dirX = 0;
        this.dirY = -1;
        break;
      case 3: //from left
        this.w = width * random(0.1, 1);
        this.h = height;
        this.x = -this.w;
        this.y = 0;
        this.dirX = 1;
        this.dirY = 0;
        break;
    }
  }

  isOut() {
    switch (this.preset) {
      case 0: //from top
        if (this.y > height) this.out = true;
        break;
      case 1: //from right
        if (this.x < -this.w) this.out = true;
        break;
      case 2: //from bottom
        if (this.y < -this.h) this.out = true;
        break;
      case 3: //from left
        if (this.x > width) this.out = true;
        break;
    }
  }
  move() {
    this.x += this.dirX * this.speed;
    this.y += this.dirY * this.speed;
  }
  draw() {
    fill(255);
    stroke(255);
    rect(this.x, this.y, this.w, this.h);
  }
}

class BlackRect {
  constructor(preset) {
    this.preset = preset;
    this.w = width * random(0.1, 0.9);
    this.h = height * random(0.1, 0.9);
    switch (preset) {
      case 0: //from top
        this.x = (width - this.w) / 2;
        this.y = height - this.h;
        break;
      case 1: //from right
        this.x = 0;
        this.y = (height - this.h) / 2;
        break;
      case 2: //from bottom
        this.x = (width - this.w) / 2;
        this.y = 0;
        break;
      case 3: //from left
        this.x = width - this.w;
        this.y = (height - this.h) / 2;
        break;
    }
  }
  draw() {
    fill(0);
    stroke(0);
    rect(this.x, this.y, this.w, this.h);
  }
}

let wRect;
let bRect;
let ps;

function setup() {
  createCanvas(400, 400);
  ps = floor(random(0, 4));
  wRect = new WhiteRect(ps);
  bRect = new BlackRect(ps);
  
}

function draw() {
  background(0);
  wRect.move();
  wRect.draw();
  bRect.draw();
  wRect.isOut();
  if (wRect.out) {
    ps = floor(random(0, 4));
    wRect = new WhiteRect(ps);
    bRect = new BlackRect(ps);
  }
}
