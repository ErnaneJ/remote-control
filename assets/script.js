let car, gameArea, lastInstruction = 'R', enableAPI = false;
const url = 'https://io.adafruit.com/api/v2/Ernane/feeds/welcome-feed/data?limit=1';
const apiKey = 'aio_yHzy72HnofKRjHlLQxaP3PfW4oax';
const imageCars = {
  "R": document.getElementById("car-r"),
  "L": document.getElementById("car-l"),
  "U": document.getElementById("car-u"),
  "D": document.getElementById("car-d"), 
}

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
    switch (e.key) {
      case "ArrowLeft":
        lastInstruction = "L";
        car.moveLeft();
        break;
      case "ArrowUp":
        lastInstruction = "U";
        car.moveUp();
        break;
      case "ArrowRight":
        lastInstruction = "R";
        car.moveRight();
        break;
      case "ArrowDown":
        lastInstruction = "D";
        car.moveDown();
        break;
    }
  });

  document.addEventListener('keyup', function (e) {
    switch (e.key) {
      case "ArrowRight":
      case "ArrowLeft":
        car.stopWidth();
        break;
      case "ArrowUp":
      case "ArrowDown":
        car.stopHeight();
        break;
    }
  });

  captureAPIData();
});

function initializeElements() {
  gameArea = {
    canvas: document.getElementById("board"),
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
  this.x = x;
  this.y = y;
  this.update = function () {
    ctx = gameArea.context;
    ctx.fillStyle = color;
    gameArea.context.drawImage(
      imageCars[lastInstruction], 
      this.x, this.y, 
      ['L', 'R'].includes(lastInstruction) ? this.width : this.height,
      ['L', 'R'].includes(lastInstruction) ? this.height : this.width
    );
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
    this.speedY = -2;
  }
  this.moveDown = function () {
    this.speedY = 2;
  }
  this.moveLeft = function () {
    this.speedX = -2;
  }
  this.moveRight = function () {
    this.speedX = 2;
  }
  this.stopWidth = function () {
    this.speedX = 0;
  }
  this.stopHeight = function () {
    this.speedY = 0;
  }
}

function updateGameArea() {
  byAPI();

  gameArea.clear();
  car.newPos();
  car.update();
}

function captureAPIData() {
  const sampleData = 3000;
  const instructions = {
    "L": "Left",
    "U": "Up",
    "R": "Right",
    "D": "Down",
  }
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
        const translate = ['_', 'L', 'U', 'R', 'D'];
        lastInstruction = translate[parseInt(data[0].value)];
        input.value = instructions[lastInstruction] || "Error..";
        lastData.innerHTML = jsontohtml(data[0]);
      })
      .catch(error => {
        console.error('Erro:', error);
        input.value = "Error..";
      });
  }, sampleData);
}

function byAPI() {
  if(!enableAPI) return;

  car.stopHeight();
  car.stopWidth();

  switch (lastInstruction) {
    case "L":
      car.moveLeft();
      break;
    case "U":
      car.moveUp();
      break;
    case "R":
      car.moveRight();
      break;
    case "D":
      car.moveDown();
      break;
  }
}