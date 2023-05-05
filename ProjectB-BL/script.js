
function setup() {
  canvas = createCanvas(windowWidth, windowHeight);


}

function draw() {
  background('gray');
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
    this.size = random(55);
    this.degree = random(10);

  }

  createHeart() {
    push();
    translate(this.mx, this.my);
    rotate(PI * this.degree);
    noStroke();
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

let heartArr = [];
function setup() {
  var w = window.innerWidth
  var h = window.innerHeight
  createCanvas(w, h);

  for (i = 0; i < 150; i++) {
    heartArr.push(new Heart());
  }
}
/*calculation*/
window.onload = function () {
  let button = document.getElementById("calculate");
  button.addEventListener("click", calculateLove);
}

function calculateLove() {
  let yourName = document.getElementById("your-name").value;
  let crushName = document.getElementById("crush-name").value;

  if (yourName != "" && crushName != "") {
    let percentage = Math.floor(Math.random() * 101);
    document.getElementById("result-message").innerText = yourName + " and " + crushName + "'s chance of love:";
    document.getElementById("result-percentage").innerText = percentage.toString() + "%";
  }
}