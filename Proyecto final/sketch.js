let sSlider; //altura de vuelo
let mSlider; //velocidad y dirección de vuelo
let pSlider // altura de montañas

var columnas, filas;
var escala = 20;
var w = 1200; //weight
var h = 1000; //height
var movimiento = 0;
var vaporwave = [];

function setup() {
  createCanvas(600, 600, WEBGL);
  
  columnas = w / escala;
  filas = h / escala;
  
  sSlider = createSlider(2.2, 7, 2.7, 0.1);
  mSlider = createSlider(-1.3, 1.3, 0.2, 0.01);
  
  pSlider = createSlider(10, 360, 150, 10);
  
  colorFg = createInput("#c71dd3", "color");
  colorGg = createInput("#031366", "color");
  colorHg = createInput("#18fbda", "color");

  for (var x = 0; x < columnas; x++) {
    vaporwave[x] = [];
    for (var y = 0; y < filas; y++) {
      vaporwave[x][y] = 0;
    }
  }
}

function draw() {
  movimiento -= mSlider.value();
  var yoff = movimiento;
  for (var y = 0; y < filas; y++) {
    var xoff = 0;
    for (var x = 0; x < columnas; x++) {
      vaporwave[x][y] = map(noise(xoff, yoff), 0, 1, -pSlider.value(), pSlider.value());
      
      xoff += 0.2;
    }
    yoff += 0.2;
  }

  background(colorFg.value());

  rotateX(PI / sSlider.value()); // rotación en ° según sSlider

  stroke(colorHg.value());
  translate(-w / 2, -h / 2); // mover al centro de la pantalla

  for (var y = 0; y < filas - 1; y++) {
    beginShape(TRIANGLE_STRIP); //malla de triángulos

    fill(colorGg.value());

    for (var x = 0; x < columnas; x++) {
      vertex(x * escala, y * escala, vaporwave[x][y]);
      vertex(x * escala, (y + 1) * escala, vaporwave[x][y + 1]);
    }

    endShape();
  }
}
