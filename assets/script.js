let car, gameArea, lastInstruction = '50x50', enableAPI = false;
const url = 'https://io.adafruit.com/api/v2/Ernane/feeds/remote/data?limit=2';
const apiKey = 'aio_yHzy72HnofKRjHlLQxaP3PfW4oax';

const SPEED_INCREMENT = 0.1;

document.addEventListener('DOMContentLoaded', function () {
  initializeElements();
  
  const lastData = document.getElementById('api-last-data');
  lastData.innerHTML = jsontohtml({
    "API": "Disabled"
  });

  gameArea.start();

  const apiDataCheckbox = document.getElementById('api-data-checkbox');
  apiDataCheckbox.addEventListener('change', function (e) {
    enableAPI = e.target.checked;
    if(enableAPI) {
      lastData.innerHTML = jsontohtml({
        "last-information": "Loading.."
      });
    }else{
      lastData.innerHTML = jsontohtml({
        "API": "Disabled"
      });
    }
  });

  document.addEventListener('keydown', function (e) {
    car.speedingUp = true;
    switch (e.key) {
      case "ArrowLeft":
        car.moveLeft();
        break;
      case "ArrowUp":
        car.moveUp();
        break;
      case "ArrowRight":
        car.moveRight();
        break;
      case "ArrowDown":
        car.moveDown();
        break;
    }
  });

  document.addEventListener('keyup', function (e) {
    car.speedingUp = false;
  });

  captureAPIData();
});

function initializeElements() {
  gameArea = {
    canvas: document.getElementById("board"),
    angle: 0,
    start: function () {
      this.context = this.canvas.getContext("2d");
      this.interval = setInterval(updateGameArea, 20);
    },
    clear: function () {
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
  }
  const randomWidth = Math.random() * (gameArea.canvas.width - 10) + 10;
  const randomHeight = Math.random() * (gameArea.canvas.height - 10) + 10;
  car = new component(100, 50, "white", randomWidth, randomHeight);
}

function component(width, height, color, x, y) {
  this.width = width;
  this.height = height;
  this.speedX = 0;
  this.speedY = 0;
  this.speedingUp = false;
  this.x = x;
  this.y = y;
  this.update = function () {
    gameArea.clear();

    ctx = gameArea.context;

    ctx.translate(this.x + this.width / 2, this.y + this.height / 2);
    ctx.rotate(gameArea.angle);
    ctx.translate(-(this.x + this.width / 2), -(this.y + this.height / 2));

    ctx.fillStyle = color;

    gameArea.context.drawImage(
      document.getElementById("car-r"), 
      this.x, this.y,
      this.width, this.height
    );

    ctx.setTransform(1, 0, 0, 1, 0, 0);
  }
  this.newPos = function () {
    if (this.x < 0) {
      this.x = (gameArea.canvas.width);
    } else if (this.x > (gameArea.canvas.width)) {
      this.x = 0;
    } else if (this.y < -this.height/2) {
      this.y = (gameArea.canvas.height);
    } else if (this.y > (gameArea.canvas.height)) {
      this.y = 0;
    } else {
      this.x += this.speedX;
      this.y += this.speedY;
    }
  }
  this.moveUp = function () {
    this.speedY -= SPEED_INCREMENT;
    gameArea.angle = Math.atan2(this.speedY, this.speedX);
  }
  this.moveDown = function () {
    this.speedY += SPEED_INCREMENT;
    gameArea.angle = Math.atan2(this.speedY, this.speedX);
  }
  this.moveLeft = function () {
    this.speedX -= SPEED_INCREMENT;
    gameArea.angle = Math.atan2(this.speedY, this.speedX);
  }
  this.moveRight = function () {
    this.speedX += SPEED_INCREMENT;
    gameArea.angle = Math.atan2(this.speedY, this.speedX);
  }
  this.stopWidth = function () {
    if(this.speedX < 0){
      this.speedX += SPEED_INCREMENT;
    }else if(this.speedX > 0){
      this.speedX -= SPEED_INCREMENT;
    }
  }
  this.stopHeight = function () {
    if(this.speedY < 0){
      this.speedY += SPEED_INCREMENT;
    }else if(this.speedY > 0){
      this.speedY -= SPEED_INCREMENT;
    }
  }
}

function updateGameArea() {
  byAPI();

  car.newPos();
  car.update();

  if(!car.speedingUp){
    car.stopHeight();
    car.stopWidth();
  }
}

function captureAPIData() {
  const sampleData = 1000;

  setInterval(() => {
    if(!enableAPI) return;
    const input = document.getElementById('api-data-input');
    const lastData = document.getElementById('api-last-data');
    fetch(url, {
      headers: {
        'X-AIO-Key': apiKey,
      },
    })
      .then(response => response.json())
      .then(data => {
        lastData.innerHTML = jsontohtml({
          "last-instruction": lastInstruction,
          "new-informations": {
            "x": data[1].value,
            "y": data[0].value
          },
          created_at: data[0].created_at
        });
        lastInstruction = `${data[1].value}x${data[0].value}`;
        input.value = `X: ${data[1].value} | Y: ${data[0].value}`;
      })
      .catch(error => {
        console.error('Erro:', error);
        input.value = "Error..";
      });
  }, sampleData);
}

function byAPI() {
  if(!enableAPI) return;

  car.speedingUp = true;
  
  let [x, y] = lastInstruction.split('x');
  x = parseInt(x);
  y = parseInt(y);

  console.log("x:",x,"y:", y)

  if(x >= 0 && x < 45){
    car.moveLeft();
  }else if(x >= 45 && x <= 50){
    car.stopWidth();
  }else if(x > 50){
    car.moveRight();
  }

  if(y >= 0 && y < 45){
    car.moveDown();
  }else if(y >= 45 && y <= 50){
    car.stopHeight();
  }else if(y > 50){
    car.moveUp();
  }
}