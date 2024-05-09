let handpose;
let video;
let predictions = [];
let k = 0;
let sparkles = [];

function setup() {
    let canvasp5=createCanvas(640, 480);
    canvasp5.parent("canvasp5");
  video = createCapture(VIDEO);
  video.size(width, height);

  handpose = ml5.handpose(video, modelReady);

  handpose.on("predict", results => {
    predictions = results;
    k++;
    if (k == 255) k = 0;
    triggerSparkles();  
  });

  video.hide();
}

function modelReady() {
  console.log("Model ready!");
}

function draw() {
  image(video, 0, 0, width, height);
  drawKeypoints();
  updateAndDisplaySparkles();
}

function drawKeypoints() {
  for (let i = 0; i < predictions.length; i++) {
    const prediction = predictions[i];
    for (let j = 0; j < prediction.landmarks.length; j++) {
      const keypoint = prediction.landmarks[j];
      fill(k, 255 - k, k * 2);
      stroke(255, 150, 0);
      ellipse(keypoint[0], keypoint[1], 10, 10);
    }
  }
}


function triggerSparkles() {
  for (let i = 0; i < predictions.length; i++) {
    const prediction = predictions[i];
    for (let j = 0; j < prediction.landmarks.length; j++) {
      const keypoint = prediction.landmarks[j];
      
      
      for (let n = 0; n < 5; n++) {
        sparkles.push(new Sparkle(keypoint[0], keypoint[1]));
      }
    }
  }
}

function updateAndDisplaySparkles() {

  for (let i = sparkles.length - 1; i >= 0; i--) {
    sparkles[i].update();
    sparkles[i].display();
    if (sparkles[i].isFinished()) {
      sparkles.splice(i, 1);
      
      
    }
  }
}

class Sparkle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.lifetime = 185;
    this.vx = random(-2, 2);
    this.vy = random(-2, 2);
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.lifetime -= 4;
  }

  display() {
    noStroke();
    fill(255, this.lifetime);
    ellipse(this.x, this.y, 5);
  }

  isFinished() {
    return this.lifetime < 0;
  }
}

    for (let j = 0; j < predictions.landmarks; j += 1) {
      const keypoint = predictions.landmarks[j];
      fill(k,255-k,k*2);
      stroke(255,150,0);
      ellipse(keypoint[0], keypoint[1], 10, 10);
     
}
