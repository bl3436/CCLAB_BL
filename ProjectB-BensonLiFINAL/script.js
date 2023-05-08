let heartArr = [];
let rickroll;
function setup() {
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent("p5-canvas-container");
  var w = window.innerWidth
  var h = window.innerHeight
  createCanvas(w, h);

  for (i = 0; i < 150; i++) {
    heartArr.push(new Heart());
  }
}

function draw() {
  background(211, 211, 211);
  heartArr.forEach(function (r) {
    r.createHeart();
    r.move();
  });
}

class Heart {
  constructor() {
    this.x = 0;
    this.y = 0;
    this.mx = random(0, width);
    this.my = random(0, height);
    this.speedRange = [-2, -1, 1, 2];
    this.xSpeed = random(this.speedRange);
    this.ySpeed = random(this.speedRange);
    this.size = random(70);
    this.degree = random(50);
  }

  createHeart() {
    push();
    translate(this.mx, this.my);
    rotate(PI * this.degree);
    noSmooth();
    fill(255, 192, 203);
    beginShape();
    vertex(this.x, this.y);
    bezierVertex(this.x - this.size / 2, this.y - this.size / 2, this.x - this.size, this.y + this.size / 3, this.x, this.y + this.size);
    bezierVertex(this.x + this.size, this.y + this.size / 3, this.x + this.size / 2, this.y - this.size / 2, this.x, this.y);
    endShape(CLOSE);
    pop();
  }

  move() {
    if (this.mx < 0 || this.mx > width) {
      this.xSpeed *= -1;
    }
    if (this.my < 0 || this.my > height) {
      this.ySpeed *= -1;
    }

    this.mx += this.xSpeed;
    this.my += this.ySpeed;
    this.degree = this.degree + 0.01;
  }
}

function love(array) {
  var hold = [],
    result,
    newArray;
  if (array.length > 2) {
    newArray = array.map(function (item, index, array) {
      return item + array[index + 1];
    });
    newArray.forEach(function (item) {
      if (typeof item === "number" && !isNaN(item)) {
        if (item < 10) {
          hold.push(item);
        } else if (item > 9) {
          console.log('Splitting' + item + " into " + item.toString()[0] + " and " + item.toString()[1]);
          hold.push(parseInt(item.toString()[0]));
          hold.push(parseInt(item.toString()[1]));
        }
      } else {
        console.log("failed number check: " + item);
      }
    });
    love(hold);
  } else {
    document.getElementById('result').textContent = array[0] + "" + array[1] + "%";
    result = array[0] + "" + array[1] + "%";
    return result;
  }
}

function calculate() {
  var inputs = document.getElementsByName('names'),
    loves = ["l", "o", "v", "e", "s"],
    countArray = [],
    count,
    names,
    jointNames;
  document.getElementById('warning').textContent = "";
  if (!inputs[0].value || !inputs[1].value) {
    document.getElementById('warning').textContent = "Please Enter Both Names!";
  } else {
    names = "" + inputs[0].value + "" + inputs[1].value + "";
    jointNames = names.toLowerCase();
    countArray = loves.map(function (item) {
      count = 0;
      for (var i = 0; i < jointNames.length; i += 1) {
        if (item === jointNames[i]) {
          count += 1;
        }
      }
      return count;
    });
    love(countArray);
  }
}

document.getElementById('submit').addEventListener('click', function (e) {
  e.preventDefault();
  calculate();
  play.rickroll();
}, false);

function preload() {
  rickroll = loadSound("Rick Roll Sound Effect.mp3");
}
