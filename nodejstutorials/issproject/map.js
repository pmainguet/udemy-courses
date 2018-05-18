var fs = require('fs');
var Canvas = require('canvas');
var d3 = require('d3');
var topojson = require('topojson');


var width = 900,
    height = 500;

var Image = Canvas.Image
  , canvas = new Canvas(width, height)
  , context = canvas.getContext('2d');


var projection = d3.geoMercator();
var path = d3.geoPath()
  .projection(projection);


var data = JSON.parse(fs.readFileSync(__dirname +"/world-50m.json", 'utf8'));
var land = topojson.feature(data, data.objects.land);

  context.beginPath();
  context.rect(0, 0, 900, 500);
  context.fillStyle = "white";
  context.fill();
  
  context.strokeStyle = '#888';
  context.fillStyle = '#aaa';

  context.beginPath();
  path.context(context)(land);
  context.fill();

  context.beginPath();
  path.context(context)(land);
  context.stroke();


var out = fs.createWriteStream(__dirname + '/test.png');
var stream = canvas.pngStream();
stream.on('data', function(chunk){
  out.write(chunk);
});

stream.on('end', function(){
  console.log('saved png');
});