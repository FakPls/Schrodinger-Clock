let c1 = 1
let c2 = 2
let n1 = 1
let n2 = 1
let a = 1000
let h = 1
let m = 1
let t = 0
let numPoints = 1000


function get_E(n) {
  return (n*n)*(PI*PI)*(h*h)/2/m/a
}

function get_psi_num(n, x) {
  return Math.sqrt(2/a) * Math.sin(n*PI*x/a)
}

function get_psi(n1, n2, x, t) {
  let psi1 = get_psi_num(n1, x)
  let psi2 = get_psi_num(n2, x)
  let E1 = get_E(n1, a)
  let E2 = get_E(n2, a)
  return Math.pow(c1, 2)*Math.pow(psi1, 2) + Math.pow(c2, 2)*Math.pow(psi2, 2) + c1*c2*psi1*psi2*(2*Math.cos((E1 - E2)*t/h))
}

function makeArr(startValue, stopValue, cardinality) {
  var arr = [];
  var step = (stopValue - startValue) / (cardinality - 1);
  for (var i = 0; i < cardinality; i++) {
    arr.push(startValue + (step * i));
  }
  return arr;
}

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(35, 52, 69);

  stroke(255, 255, 255);
  strokeWeight(1);
  noFill();
  textSize(64);
  textFont(BOLD);
  textFont('Chivo')
  textAlign(CENTER, CENTER);

  translate(width/2 - a/2, height/2)



  let time = new Date()
  n1 = time.getHours()
  n2 = time.getMinutes()

  if(n1 >= 13) {
    n1 = n1 - 12;
  }
  else if (n1 == 0) {
    n1 = 12
  }

  display_time = n1 + ':' + n2.toString().padStart(2, '0')

  text(display_time, a/2, -300)

  let xPoints = makeArr(0, a, numPoints)
  
  let P = []

  for(let x of xPoints) {
    P.push(get_psi(n1, n2, x, t))
  }


  strokeWeight(3);
  beginShape();
  for(let i = 0; i < numPoints; i++) {
    vertex(xPoints[i], -P[i]*5000);
  }
  endShape();

  t += 0.01/(get_E(n1, a) - get_E(n2, a))
  //line(a/2, 0, a/2, height)

  if(((get_E(n1, a) - get_E(n2, a))*t/h) >= 2*PI) {
    t = 0
  }

}
