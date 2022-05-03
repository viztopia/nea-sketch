let w;
let columns;
let rows;
let board;
let pboard;
let next;
let fadeIn = 0;
let fadeOut = 255;
let runCount = 0;
let countBlack = 0;
let generateInverval = 600;

function setup() {
  noStroke();

  createCanvas(windowWidth, windowHeight);
  background(0);
  w = windowWidth/5;
  // Calculate columns and rows
  columns = floor(width / w);
  rows = floor(height / w);
  // Wacky way to make a 2D array is JS
  board = new Array(columns);
  for (let i = 0; i < columns; i++) {
    board[i] = new Array(rows);
  }
  // Going to use multiple 2D arrays and swap them
  next = new Array(columns);
  for (i = 0; i < columns; i++) {
    next[i] = new Array(rows);
  }
  init();
}

function draw() {
  // background(255);

  if (frameCount % generateInverval == 0) {
    fadeIn = 0;
    fadeOut = 255;
    pboard = board;
    generate();
  }

  // fade out previous board

  // draw new board
  if (pboard) {
    for (let i = 0; i < columns; i++) {
      for (let j = 0; j < rows; j++) {
        if (pboard[i][j] == board[i][j] && pboard[i][j] == 1) {
          // if both are white
          fill(255);
        } else if (pboard[i][j] != board[i][j] && pboard[i][j] == 1) {
          // if it used to be white
          fill(fadeOut);
        } else if (pboard[i][j] != board[i][j] && pboard[i][j] == 0) {
          // if it used to be black
          fill(fadeIn);
        } else {
          // if both are black
          fill(0);
        }
        noStroke();
        rect(i * w, j * w, w, w);
      }
    }
  } else {
    for (let i = 0; i < columns; i++) {
      for (let j = 0; j < rows; j++) {
        if (board[i][j] == 1) {
          fill(fadeIn);
        } else {
          fill(0);
        }
        noStroke();
        rect(i * w, j * w, w, w);
      }
    }
  }
  fadeIn += 1 * (600 / generateInverval);
  fadeOut -= 1 * (600 / generateInverval);
}

// reset board when mouse is pressed
function mousePressed() {
  init();
}

// Fill board randomly
function init() {
  for (let i = 0; i < columns; i++) {
    for (let j = 0; j < rows; j++) {
      // Lining the edges with 0s
      if (i == 0 || j == 0 || i == columns - 1 || j == rows - 1)
        board[i][j] = 0;
      // Filling the rest randomly
      else board[i][j] = floor(random(2));
      next[i][j] = 0;
    }
  }
}

// The process of creating the new generation
function generate() {
  console.log("generate");
  // Loop through every spot in our 2D array and check spots neighbors
  for (let x = 1; x < columns - 1; x++) {
    for (let y = 1; y < rows - 1; y++) {
      // Add up all the states in a 3x3 surrounding grid
      let neighbors = 0;
      for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
          neighbors += board[x + i][y + j];
        }
      }

      // A little trick to subtract the current cell's state since
      // we added it in the above loop
      neighbors -= board[x][y];
      // Rules of Life
      if (board[x][y] == 1 && neighbors < 2) next[x][y] = 0;
      // Loneliness
      else if (board[x][y] == 1 && neighbors > 3) next[x][y] = 0;
      // Overpopulation
      else if (board[x][y] == 0 && neighbors == 3) next[x][y] = 1;
      // Reproduction
      else next[x][y] = board[x][y]; // Stasis
    }
  }

  // Swap!
  let temp = board;
  board = next;
  next = temp;
}

function keyPressed() {
  // if user presses 1, decrease generate interval by 50 until it reaches 300, if user presses 2, increase generate interval by 50 until it reaches 900
  if (keyCode == 49) {
    if (generateInverval > 300) {
      generateInverval -= 50;
    }
  } else if (keyCode == 50) {
    if (generateInverval < 900) {
      generateInverval += 50;
    }
  }

  console.log("current generation interval: " + generateInverval);
}