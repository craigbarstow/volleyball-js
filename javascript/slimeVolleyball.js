'use strict'

$( document ).ready(function() {
  // Constants
  const
    canvasHeight = $("#slimeCanvas").height(),
    canvasWidth = $("#slimeCanvas").width(),
    canvasCenter = canvasWidth / 2,
    frameRate = 30,
    // Canvas Background Object Constants
    floorHeight = canvasHeight / 30,
    netHeight = canvasHeight / 3,
    netBase = canvasHeight - floorHeight,
    netWidth = canvasWidth / 60,
    // Color Constants
    backgroundColor = "#fcfeff",
    playerLeftColor = 'red',
    playerRightColor = 'blue',
    ballColor = 'white',
    // Object Constants
    playerRadius = 50,
    ballRadius = 40,
    ballStartPosition = canvasHeight * .5,
    // Collision Constants
    playerMinPosition =  canvasHeight - playerRadius - floorHeight,
    minPlayerLeftX = playerRadius,
    maxplayerLeftX = (canvasWidth *.5) - playerRadius - (netWidth * .5),
    minPlayerRightX = (canvasWidth *.5) + playerRadius + (netWidth * .5),
    maxPlayerRightX = canvasWidth - playerRadius;

  var
    ctx = document.getElementById("slimeCanvas").getContext("2d"),

    // Object Detection Variables
    Box = function(left, top, right, bottom) {
      this.left = left;
      this.top = top;
      this.right = right;
      this.bottom = bottom;
      this.contains = function(circleObj) {
        // If circleObj is in this box
        return true;
      };
    },

    leftBox = new Box(0, 0, canvasCenter-(netWidth/2), canvasHeight - floorHeight),
    netTopBox = new Box(canvasCenter - (netWidth/2), 0,
      canvasCenter + (netWidth/2), canvasHeight - floorHeight - netHeight),
    rightBox = new Box(canvasCenter + (netWidth/2), 0, canvasWidth, canvasHeight - floorHeight),

    ballStartsLeft = true,

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
    playerLeft = new Sphere(canvasWidth * .25, playerMinPosition, playerRadius, playerLeftColor),
    playerRight = new Sphere(canvasWidth * .75, playerMinPosition, playerRadius, playerRightColor),
    ball = new Sphere(ballStartsLeft ? canvasWidth * .75 : canvasWidth * .25, ballStartPosition, ballRadius, ballColor),

    renderCircle = function(circleObj, next) {
      ctx.fillStyle = circleObj.color;
      ctx.strokeStyle = 'black';
      ctx.beginPath();
      ctx.arc(circleObj.x, circleObj.y, circleObj.radius, 0, 2*Math.PI);
      ctx.stroke();
      ctx.closePath();
      ctx.fill();

      return next();
    },

    drawBackground = function(next) {
      // Set background color
      ctx.fillStyle = backgroundColor;
      ctx.fillRect(0, 0, canvasWidth, canvasHeight);

      // Set up the net
      ctx.fillStyle = "#707070";
      ctx.fillRect(canvasCenter-(netWidth/2), canvasHeight-netHeight, netWidth, netHeight-floorHeight);

      // Set up the floor
      ctx.fillStyle = "#906D4B";
      ctx.fillRect(0, canvasHeight-floorHeight, canvasWidth, canvasHeight);

      return next();
    },

    renderObjects = function(next) {
      async.waterfall([
        drawBackground,

        async.apply(renderCircle, playerLeft),
        async.apply(renderCircle, playerRight),
        async.apply(renderCircle, ball)
      ], function(err) {
        next(err);
      });
    },

    gameLoop = function() {
      async.waterfall([
        renderObjects
      ], function(err) {
        if (err) {
          console.log(err);
        }
      });
    };

  // Set up key bindings for moving the left player
  $(document).keydown(function(e) {
      switch(e.which) {
          case 87: // W, Up
          break;

          case 65: // A, Left
          playerLeft.x -= 20;
          break;

          case 68: // D, Right
          playerLeft.x += 20;
          break;

          default: return; // exit this handler for other keys
      }
  });

  // Start the game loop
  setInterval(gameLoop, 5000 / frameRate);
});
