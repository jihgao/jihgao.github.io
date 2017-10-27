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
  options = options || {};
  var canvas = document.createElement("canvas");
  var CANVAS_WIDTH = options.radius || 10;
  var CANVAS_HEIGHT = options.radius || 10;
  var ctx = canvas.getContext("2d");
  var imageCanvas = ctx.createImageData(CANVAS_WIDTH, CANVAS_HEIGHT);

  this.colorA = options.color1 ? hexToRgba(options.color1) : [255, 255, 255, 255];
  this.colorB = options.color2 ? hexToRgba(options.color2) : [120, 120, 120, 255];
  this.fps = options.fps;
  this.ratio = options.ratio || 0.001;
  canvas.width = CANVAS_WIDTH;
  canvas.height = CANVAS_HEIGHT;
  this.canvas = canvas;
  this.ctx = ctx;
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

  this.ctx.putImageData(this.imageCanvas, 0, 0);
  document.body.style.background = "url(" + this.canvas.toDataURL("image/jpeg", 0.1) + ") repeat top left";
}
