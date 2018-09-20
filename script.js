var canvas,ctx;
var xDown,yDown;
var downTrigger = false;
var index = 0;

function renderGame() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  ctx.strokeStyle = "black";
  ctx.fillRect(0,0,canvas.width,canvas.height);
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
      document.getElementById("text").innerText = "left " + index;
      index++;
    } else {
      document.getElementById("text").innerText = "right";
    }
  } else {
    if ( yDiff > 0 ) {
      document.getElementById("text").innerText = "up";
    } else {
      document.getElementById("text").innerText = "down";
    }
  }
}

window.ontouchend = function(event) {
  if ( event.touches.length <= 0 ) downTrigger = false;
}

window.onload = function() {
  canvas = document.getElementById("canvas");
  ctx = canvas.getContext("2d");
}
