let num = 10;
let arr = [];

function setup() {
    createCanvas(windowWidth, windowHeight);
    for (let i = 0; i < num; i++) {
        // arr[i] = new f(random(width), random(height));
        arr[i] = new f(width / 2, height / 2);
    }
    //print(arr);
}

function draw() {
    background(0);
    for (let i = 0; i < arr.length; i++) {
        arr[i].display();
        arr[i].move();
    }
    // windowResized()
}

class f {
    constructor(x, y) {

        this.x = x;
        this.y = y;
        this.w = random(0, 5);
        this.h = random(0, 5);
        this.wX = random(200, width);
        this.hX = random(200, height);
        this.r = random(-0.01, 0.01);
        this.b = random(0.001, 0.01);
        this.num = floor(random(10, 50));
        this.col = floor(random(30, 70));
        this.degrees = 0;
        this.newDeg = 0;
        this.newDegR = random(0.01, 0.05);
        this.al = floor(random(2, 100));
        this.d = random(0, 180);
        this.ex = random(0, 10);
    }

    display() {
        noFill();
        colorMode(HSB, 100);
        // blendMode(MULTIPLY);

        stroke(100, this.al);
        strokeWeight(0.25);

    }

    move() {
        this.degrees = this.d;
        this.w = map(sin(this.r), -1, 1, 0, this.wX);
        this.h = map(sin(this.r + this.ex), -1, 1, 0, this.wX);

        for (let i = 0; i < this.num; i++) {
            push();
            translate(this.x, this.y);
            rotate(radians(this.degrees / TWO_PI));
            rotate(radians(this.newDeg));
            ellipse(0, 0, this.w, this.h);
            pop();
            this.degrees = this.degrees + 12;
        }
        this.newDeg = this.newDeg + this.newDegR;
        this.r = this.r + this.b;
    }

}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
  for (let i = 0; i < arr.length; i++) {
        // arr[i] = new f(random(width), random(height));
        arr[i].x=width/2;
        arr[i].y=height/2;
    }
    print("Resized");
}
