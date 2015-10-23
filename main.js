


var c = document.getElementById('ballCanvas');
var ctx = c.getContext('2d');
var raf;
var running = false;

//ball object defined with ball properties 
	var ball = {
	  x: 100,
	  y: 100,
	  vx: 5,      // velocity added to ball to keep it moving
	  vy: 1,
	  radius: 50,
	  color: 'black',
	  draw: function() {    // arc method to draw circle on canvas
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2, true);
		ctx.closePath();
		ctx.fillStyle = this.color;
		ctx.fill();
	  }
};

function clear() {
  ctx.fillStyle = 'rgba(255,255,255,0.3)';       // fillrect is used to give trail effect to ball
  ctx.fillRect(0,0,ballCanvas.width,ballCanvas.height);     
}

function draw() {
  clear();
  ball.draw();
  ball.x += ball.vx;			// boundary restriction given to ball so it doesn't go outside canvas and strike back whenever
  ball.y += ball.vy;			// touches the boundries					

  if (ball.y + ball.vy > ballCanvas.height || ball.y + ball.vy < 0) {
    ball.vy = -ball.vy;
  }
  if (ball.x + ball.vx > ballCanvas.width || ball.x + ball.vx < 0) {
    ball.vx = -ball.vx;
  }

  raf = window.requestAnimationFrame(draw); // to callback animation whenever page refreshed
}

ballCanvas.addEventListener('mousemove', function(e){
  if (!running) {
    clear();
    ball.x = e.clientX;			//mouse event in which when we bring mouse on canvas, ball will follow the mouse in all axis
    ball.y = e.clientY;
    ball.draw();
  }
});

ballCanvas.addEventListener("click",function(e){
  if (!running) {
    raf = window.requestAnimationFrame(draw);  // in this mouse event when mouse clicked, ball animation recalled 
    running = true;
  }
});

ballCanvas.addEventListener("mouseout",function(e){
  window.cancelAnimationFrame(raf);    		// by moving mouse out of canvas the animation will not work as it is canceled on this event
  running = false;
});

ball.draw();