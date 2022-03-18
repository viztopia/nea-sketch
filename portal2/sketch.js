class BlackRect {
  constructor(preset) {
    this.preset = preset;
    this.w = width * random(0.3, 0.7);
    this.h = height * random(0.3, 0.7);
    this.x = width * random(0.7);
    this.y = height * random(0.7);
    // switch (preset) {
    //   case 0: //from top
    //     this.x = (width - this.w) / 2;
    //     this.y = height - this.h;
    //     break;
    //   case 1: //from right
    //     this.x = 0;
    //     this.y = (height - this.h) / 2;
    //     break;
    //   case 2: //from bottom
    //     this.x = (width - this.w) / 2;
    //     this.y = 0;
    //     break;
    //   case 3: //from left
    //     this.x = width - this.w;
    //     this.y = (height - this.h) / 2;
    //     break;
    // }
  }
  draw() {
    fill(0);
    stroke(0);
    rect(this.x, this.y, this.w, this.h);
  }
}

let wArc, bRect;
let cValue, pValue;
let ps;

function setup() {
  createCanvas(400, 400);
  ps = floor(random(0, 4));
  
  bRect = new BlackRect(ps);
  pValue = sin(frameCount*0.005);
}

function draw() {
  background(0);
  // bRect.draw();
  cValue = sin(frameCount*0.005);

  // console.log(cValue);
  if (cValue<-0.99 && pValue > -0.99) {
    bRect = new BlackRect(ps);
  }
  pValue = cValue;

  push();
  translate(0, 0);
  rotate(-PI/4-cValue*PI/4);
  fill(255);
  stroke(0);
  triangle(0, 0, -30, height * 1.5, 30, height * 1.5);
  pop();
  bRect.draw();
}
