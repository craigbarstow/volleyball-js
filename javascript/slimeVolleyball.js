$( document ).ready(function() {
  var
    ctx = document.getElementById("slimeCanvas").getContext("2d");
    // General Canvas Variables
    canvasHeight = $("#slimeCanvas").height(),
    canvasWidth = $("#slimeCanvas").width(),
    canvasCenter = canvasWidth / 2,
    // Canvas Background Object Variables
    floorHeight = canvasHeight / 30,
    netHeight = canvasHeight / 3,
    netBase = canvasHeight - floorHeight,
    netWidth = canvasWidth / 60,
    // Object Variables
    playerRadius = 50,
    ballRadius = 40,
    ballStartPosition = canvasHeight * .5,
    ballStartsLeft = true,
    // Collision Variables
    playerMinPosition =  canvasHeight - playerRadius - floorHeight;
    minPlayerLeftX = playerRadius,
    maxplayerLeftX = (canvasWidth *.5) - playerRadius - (netWidth * .5),
    minPlayerRightX = (canvasWidth *.5) + playerRadius + (netWidth * .5),
    maxPlayerRightX = canvasWidth - playerRadius,

    // Functions
    Sphere = function(x, y, radius, color) {
      this.x = x;
      this.y = y;
      this.vx = 0;
      this.vy = 0;
      this.radius = radius;
      this.color = color;
    },

    // Create Player and Ball Objects
    playerLeft = new Sphere(canvasWidth * .25, playerMinPosition, playerRadius, 'red');
    playerRight = new Sphere(canvasWidth * .75, playerMinPosition, playerRadius, 'blue');
    ball = new Sphere(ballStartsLeft ? canvasWidth * .75 : canvasWidth * .25, ballStartPosition, ballRadius, 'white');

    renderCircle = function(circleObj) {
      ctx.fillStyle = circleObj.color;
      ctx.strokeStyle = 'black';
      ctx.beginPath();
      ctx.arc(circleObj.x, circleObj.y, circleObj.radius, 0, 2*Math.PI);
      ctx.stroke();
      ctx.closePath();
      ctx.fill();

      // return next();
    },

    clearCanvas = function(next) {
      context.clearRect(0, 0, canvas.width, canvas.height);
      return next();
    },

    drawBackground = function(next) {
      // Set background color
      // context.fillStyle = "#E6F5FF";
      ctx.fillStyle = "#fcfeff";
      ctx.fillRect(0, 0, canvasWidth, canvasHeight);

      // Set up the net
      ctx.fillStyle = "#707070";
      ctx.fillRect(canvasCenter-(netWidth/2), canvasHeight-netHeight, netWidth, netHeight-floorHeight);

      // Set up the floor
      ctx.fillStyle = "#906D4B";
      ctx.fillRect(0, canvasHeight-floorHeight, canvasWidth, canvasHeight);

      return next();
    },


  // Perform initial setup
  async.waterfall([
    drawBackground,
  ], function (err) {
    console.log(err);
    console.log('done');
  });

  renderCircle(playerLeft);
  renderCircle(playerRight);
  renderCircle(ball);


});


























