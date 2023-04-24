let particles = [];
let totalNum = 25;


function setup() {
  let canvas = createCanvas(500, 400);
  canvas.parent("canvasContainer");
  for (let i = 0; i < totalNum; i++) {
    particles[i] = new Particle(random(width), random(height));
  }


}

function draw() {
  background("#52A5C1");
  for (let i = 0; i < particles.length; i++) {
    particles[i].display();
    let p = particles[i];
    p.move();
    p.bounce();
    p.fall();
    p.enlarge();
  }


}

class Particle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.dia = 30;
    this.xSpd = random(-5, 5);
    this.ySpd = random(-5, 5);
    this.r = random(255);
    this.b = random(255);
    this.g = random(255);

  }

  move() {
    this.x += this.xSpd;
    this.y += this.ySpd;
  }

  display() {
    push();
    translate(this.x, this.y);
    noStroke();
    fill(this.r, this.g, this.b);
    circle(0, 0, this.dia);
    pop();
  }

  bounce() {
    if (this.x < 0) {
      this.x = 0;
      this.xSpd = this.xSpd * -1;
    }
    else if (this.x > width) {
      this.x = width;
      this.xSpd = this.xSpd * -1;
    }
    if (this.y < 0) {
      this.y = 0;
      this.ySpd = this.ySpd * -1;
    }
    else if (this.y > height) {
      this.y = height;
      this.ySpd = this.ySpd * -1;
    }
  }

  fall() {
    this.ySpd += 0.1;
  }

  enlarge() {
    this.dia += 0.5;
    this.dia = constrain(this.dia, 10, 150);
  }
}
