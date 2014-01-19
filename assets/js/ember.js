// Generated by CoffeeScript 1.3.1

/*
	A canvas wallpaper that shows pixaleted flames.
	@Author: Jose Padilla
*/


(function() {
  var ANIMATION_SPEED, Draw, MAX_DROPS, Rain, TIMER_SPEED, Update, addDrop, anim, animation, blank, bufferCanvas, bufferContext, canvas, context, flareDropsArray, init, shape, stop, timer;

  $(function() {
    return init();
  });

  $(function() {
    return $('#canvaSquare').click(function() {
      stop();
    });
  });

  shape = canvas = context = bufferCanvas = bufferContext = timer = anim = null;

  flareDropsArray = [];

  ANIMATION_SPEED = 5;

  /*
   Functions
  */


  init = function() {
    shape = document.getElementById('canvaSquare').dataset['shape'];
    motion = document.getElementById('canvaSquare').dataset['motion'];
    if(motion === 'ember') {
      MAX_DROPS = 500;
      TIMER_SPEED = 15;
    }
    else
    {
      MAX_DROPS = 100;
      TIMER_SPEED = 5;
    }
    canvas = document.getElementById('canvaSquare');
    context = canvas.getContext('2d');
    context.canvas.width = window.innerWidth;
    context.canvas.height = window.innerHeight;
    bufferCanvas = document.createElement('canvas');
    bufferContext = bufferCanvas.getContext('2d');
    bufferContext.canvas.width = context.canvas.width;
    bufferContext.canvas.height = context.canvas.height;
    timer = setInterval(addDrop, TIMER_SPEED);
    Draw(shape);
    anim = setInterval(animation, ANIMATION_SPEED);
  };

  Rain = function() {
    var RAIN_OPACITY, RAIN_SPEED_AMOUNT, RAIN_WIDTH;
    RAIN_SPEED_AMOUNT = 1.05;
    RAIN_OPACITY = 0.8;
    RAIN_WIDTH = 10;
    this.x = Math.round(Math.random() * canvas.width);
    this.y = Math.round(Math.random() * canvas.height);
    this.speed = Math.random() * RAIN_SPEED_AMOUNT;
    this.opacity = Math.random() * RAIN_OPACITY;
    this.width = (Math.random() * RAIN_WIDTH) + 1;
    this.height = this.width;
  };

  addDrop = function() {
    flareDropsArray[flareDropsArray.length] = new Rain();
    if (flareDropsArray.length === MAX_DROPS) {
      clearInterval(timer);
      clearInterval(anim);
    }
  };

  animation = function() {
    Update(motion);
    Draw(shape);
  };

  blank = function() {
    bufferContext.fillStyle = '#2A2B3D';
    bufferContext.fillRect(0, 0, bufferContext.canvas.width, bufferContext.canvas.height);
  };

  Update = function(m) {
    var RAINDROPS_ARRAY_WIDTH, e, i, _i, _len;
    RAINDROPS_ARRAY_WIDTH = 1.001;

    if (m === 'ember')
    {
      for (i = _i = 0, _len = flareDropsArray.length; _i < _len; i = ++_i) {
        e = flareDropsArray[i];
        if (flareDropsArray[i].y >= 0 - flareDropsArray[i].width) {
          flareDropsArray[i].y -= Math.random() * 0.20 + flareDropsArray[i].speed;
          flareDropsArray[i].height = RAINDROPS_ARRAY_WIDTH;
          flareDropsArray[i].height -= flareDropsArray[i].width;
        } else {
          flareDropsArray[i].x = -1 * flareDropsArray[i].width;
        }
      }
    }
    else
    {
      for (i = _i = 0, _len = flareDropsArray.length; _i < _len; i = ++_i) {
        e = flareDropsArray[i];
        if (flareDropsArray[i].x <= canvas.width + flareDropsArray[i].width) {
          flareDropsArray[i].width += RAINDROPS_ARRAY_WIDTH;
          flareDropsArray[i].height = flareDropsArray[i].width;
        } else {
          flareDropsArray[i].x = -1 * flareDropsArray[i].width;
        }
      }
    }
  };

  Draw = function(s) {
    var LINE_WIDTH, e, i, _i, _j, _len, _len1;
    context.save();
    blank();
    if (s === 'circle') {
      LINE_WIDTH = 0.5;
      for (i = _i = 0, _len = flareDropsArray.length; _i < _len; i = ++_i) {
        e = flareDropsArray[i];
        bufferContext.beginPath();
        bufferContext.arc(flareDropsArray[i].x, flareDropsArray[i].y, flareDropsArray[i].width / 2, 0, 2 * Math.PI, false);
        bufferContext.fillStyle = "rgba(81,83,107," + flareDropsArray[i].opacity + ")";
        bufferContext.fill();
        bufferContext.lineWidth = LINE_WIDTH;
        bufferContext.strokeStyle = 'rgba(60,50,103,0.5)';
        bufferContext.stroke();
      }
      context.drawImage(bufferCanvas, 0, 0, bufferCanvas.width, bufferCanvas.height);
      context.restore();
    }
    if (s === 'square') {
      for (i = _j = 0, _len1 = flareDropsArray.length; _j < _len1; i = ++_j) {
        e = flareDropsArray[i];
        bufferContext.fillStyle = "rgba(81,83,107," + flareDropsArray[i].opacity + ")";
        bufferContext.fillRect(flareDropsArray[i].x, flareDropsArray[i].y, flareDropsArray[i].width, flareDropsArray[i].height);
      }
      context.drawImage(bufferCanvas, 0, 0, bufferCanvas.width, bufferCanvas.height);
      context.restore();
    }
  };

  stop = function() {
    clearInterval(timer);
    clearInterval(addDrop);
    clearInterval(anim);
  };

}).call(this);