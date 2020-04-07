function hexToRgba(text){
  var result = new Array(4), i = 0, partials = 0;
  if( Array.isArray(text) ){
    for( ;i<4;i++){
      if(text[i]){
        result[i] = text[i];
      }else{
        result[i] = 255;
      }
    }
  }else {
    partials = text.split(/([0-9a-f]{2})/i)
    if( partials.length === 7 ){
      result[0] = parseInt("0x" + partials[1], 16);
      result[1] = parseInt("0x" +  partials[3], 16);
      result[2] = parseInt("0x" +  partials[5], 16);
      result[3] = 255;
    }
  }
  return result;
}
function Noise(options){
  var CANVAS_WIDTH = window.innerWidth;
  var CANVAS_HEIGHT = window.innerHeight;

  options = options || {};

  if( !Noise.canvas ){
    Noise.canvas = document.createElement("canvas");
    Noise.canvas.setAttribute('id', 'noise-background');
    Noise.off_canvas = document.createElement("canvas");
    document.body.insertBefore(Noise.canvas, document.querySelector("#main"));
  }

  var canvas = Noise.canvas;
  var ctx = canvas.getContext("2d");
  var off_canvas = Noise.off_canvas;
  var off_canvas_ctx = off_canvas.getContext("2d");

  off_canvas.width = options.radius || 10;
  off_canvas.height = options.radius || 10;

  var imageCanvas = off_canvas_ctx.createImageData(off_canvas.width, off_canvas.height);

  this.colorA = options.color1 ? hexToRgba(options.color1) : [255, 255, 255, 255];
  this.colorB = options.color2 ? hexToRgba(options.color2) : [120, 120, 120, 255];
  this.fps = options.fps;
  this.ratio = options.ratio || 0.001;
  canvas.width = CANVAS_WIDTH;
  canvas.height = CANVAS_HEIGHT;
  this.canvas = canvas;
  this.ctx = ctx;
  this.off_canvas = off_canvas;
  this.off_canvas_ctx = off_canvas_ctx;
  this.imageCanvas = imageCanvas;
  this.imageData = imageCanvas.data;
  this.imageDataLength = this.imageData.length;
  this.draw();
  this.redraw = this.draw;
}


Noise.prototype.draw = function (){
  var colorSelected, i=3;
  for(; i<this.imageDataLength;i += 4){
          colorSelected = Math.random() > this.ratio ? this.colorA : this.colorB;
          this.imageData[i] = colorSelected[3];
          this.imageData[i - 1] = colorSelected[2];
          this.imageData[i - 2] = colorSelected[1];
          this.imageData[i - 3] = colorSelected[0];
  }

  this.off_canvas_ctx.putImageData(this.imageCanvas, 0, 0);
  this.ctx.fillStyle = this.ctx.createPattern(this.off_canvas, "repeat");
  this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
}
