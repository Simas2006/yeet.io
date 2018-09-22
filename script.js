var canvas,ctx;
var xDown,yDown;
var downTrigger = false;
var energyIndex = 0;
var energyOverride = [-1,-1];
var energyTick = 0;
var energyMode = -1;

function renderGame() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  ctx.fillStyle = "#222222";
  ctx.fillRect(0,0,canvas.width,canvas.height);
  ctx.strokeStyle = "black";
  ctx.strokeRect(0,0,canvas.width,canvas.height);
  ctx.lineWidth = 20;
  var positions = [[0,-2],[1,-1],[2,0],[1,1],[0,2],[-1,1],[-2,0],[-1,-1]];
  ctx.strokeStyle = "black";
  var min = Math.min(canvas.width,canvas.height);
  for ( var i = 0; i < 8; i++ ) {
    ctx.fillStyle = ["#c60000","orange","green","#000090","purple","black","white","#8b4513"][i];
    ctx.beginPath();
    ctx.arc(canvas.width / 2 + positions[i][0] * (canvas.width * 0.19),canvas.height / 2 + positions[i][1] * (canvas.height * 0.19),min / 10,0,2 * Math.PI);
    ctx.fill();
    ctx.stroke();
  }
  ctx.lineWidth = 2;
  var red = energyTick;
  var green = energyTick;
  var redMultiplier = -1;
  var size = canvas.width / 30;
  for ( var i = Math.round(size); i > 0; i-- ) {
    ctx.strokeStyle = `rgb(${red},${green},0)`;
    red += (256 / size) * redMultiplier;
    if ( red < 200 ) redMultiplier = 1;
    ctx.beginPath();
    ctx.arc(energyOverride[0] <= -1 ? (canvas.width / 2 + positions[energyIndex][0] * (canvas.width * 0.19)) : energyOverride[0],energyOverride[0] <= -1 ? (canvas.height / 2 + positions[energyIndex][1] * (canvas.height * 0.19)) : energyOverride[1],i,0,2 * Math.PI);
    ctx.stroke();
  }
  if ( energyTick <= 0 ) energyMode = 1;
  if ( energyTick >= 256 ) energyMode = -1;
  energyTick += 7 * energyMode;
}

function moveEnergy(index) {
  var positions = [[0,-2],[1,-1],[2,0],[1,1],[0,2],[-1,1],[-2,0],[-1,-1]];
  var oldPos = [canvas.width / 2 + positions[energyIndex][0] * (canvas.width * 0.19),canvas.height / 2 + positions[energyIndex][1] * (canvas.height * 0.19)];
  var newPos = [canvas.width / 2 + positions[index][0] * (canvas.width * 0.19),canvas.height / 2 + positions[index][1] * (canvas.height * 0.19)];
  energyOverride = oldPos;
  var xDiff = newPos[0] - oldPos[0];
  var yDiff = newPos[1] - oldPos[1];
  var interval = setInterval(function() {
    energyOverride[0] += xDiff / 100;
    energyOverride[1] += yDiff / 100;
    if ( Math.abs(energyOverride[0] - newPos[0]) < 2.5 && Math.abs(energyOverride[1] - newPos[1]) < 2.5 ) {
      energyIndex = index;
      energyOverride[0] = -1;
      clearInterval(interval);
    }
  },10);
}

window.ontouchstart = function(event) {
  xDown = event.touches[0].clientX;
  yDown = event.touches[0].clientY;
}

window.ontouchmove = function(event) {
  if ( ! xDown || ! yDown || downTrigger ) return;
  downTrigger = true;
  var xUp = event.touches[0].clientX;
  var yUp = event.touches[0].clientY;
  var xDiff = xDown - xUp;
  var yDiff = yDown - yUp;
  if ( Math.abs(xDiff) > Math.abs(yDiff) ) {
    if ( xDiff > 0 ) {

    } else {

    }
  } else {
    if ( yDiff > 0 ) {

    } else {

    }
  }
}

window.ontouchend = function(event) {
  if ( event.touches.length <= 0 ) downTrigger = false;
}

window.onload = function() {
  canvas = document.getElementById("canvas");
  ctx = canvas.getContext("2d");
  setInterval(renderGame,10);
}
