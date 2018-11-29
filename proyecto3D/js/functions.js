document.addEventListener("keypress", function onEvent(event) {
  if (event.key === "e" || event.key === "E") {
    console.log('Escalar')
    scale = !scale
  } else if (event.key === "M" || event.key === "m") {
    console.log('Mover')
    move = !move
  } else if (event.key === "c" || event.key === "C") {
    console.log('Cambia color')
    color = !color
  } else if (event.key === "r" || event.key === "R") {
    console.log('Rotar')
    rotate = !rotate
  } else if (event.key === "t" || event.key === "T") {
    transparency = !transparency
  } else if (event.key === "s" || event.key === "S") {
    console.log('Salir')
    escape = !escape
  }
});

function drawLines(scene){
  var group = new THREE.Group();
  group.name = 'lines';
  var currentX = -width;
  while (currentX <= width) {
    var rect = new THREE.PlaneGeometry(1, height * 2);
    var rectMaterial = new THREE.MeshBasicMaterial({
      color: 0x000000,
      side: THREE.DoubleSide
    });
    var plane = new THREE.Mesh(rect, rectMaterial);
    plane.position.set(currentX, 0, -far / 2);
    group.add(plane);
    scene.add(group);
    currentX += 1.5;
  }
}

function drawCubes(scene) {
  var group = new THREE.Group();
  group.name = 'cubes';
  if (!cubesIn) {
    for (let index = 0; index < 8; index++) {
      var geometry = new THREE.BoxGeometry(4, 4, 4);
      var material = new THREE.MeshLambertMaterial({
        color: 0xf49441,
      });
      var XplusOrMinus = Math.random() < 0.5 ? -1 : 1;
      var YplusOrMinus = Math.random() < 0.5 ? -1 : 1;
      var cube = new THREE.Mesh(geometry, material);
      var posX = (Math.floor((Math.random() * width - 3)) * XplusOrMinus);
      var posY = (Math.floor((Math.random() * height - 3)) * YplusOrMinus);
      var posZ = - Math.floor((Math.random() * 1000) - 1);
      cube.position.set(posX, posY, posZ);
      group.add(cube);
    }
    scene.add(group);
    cubesIn = true;
  }
}

function drawSpheres(scene){
  var group = new THREE.Group();
  group.name = 'spheres';
  if(!shperesIn){
    for (let index = 0; index < 8; index++) {
      var geometry = new THREE.SphereGeometry(2.5, 25, 25);
      var material = new THREE.MeshLambertMaterial({
        color: 0xf44158,
      });
      var XplusOrMinus = Math.random() < 0.5 ? -1 : 1;
      var YplusOrMinus = Math.random() < 0.5 ? -1 : 1;

      var sphere = new THREE.Mesh(geometry, material);

      var posX = (Math.floor((Math.random() * width - 3)) * XplusOrMinus);
      var posY = (Math.floor((Math.random() * height - 3)) * YplusOrMinus);
      var posZ = -Math.floor((Math.random() * 1000) - 1);

      sphere.position.set(posX, posY, posZ);
      group.add(sphere);
    }
    scene.add(group);
    shperesIn = true;
  }
}

function drawOctahedrons(scene){
  var group = new THREE.Group();
  group.name = 'octahedrons';
  if(!octahedronsIn){
    for (let index = 0; index < 8; index++) {
      var geometry = new THREE.OctahedronGeometry(3, 0);
      var material = new THREE.MeshLambertMaterial({
        color: 0x41f4f1,
      });
      var XplusOrMinus = Math.random() < 0.5 ? -1 : 1;
      var YplusOrMinus = Math.random() < 0.5 ? -1 : 1;

      var octahedron = new THREE.Mesh(geometry, material);

      var posX = (Math.floor((Math.random() * width - 3)) * XplusOrMinus);
      var posY = (Math.floor((Math.random() * height - 3)) * YplusOrMinus);
      var posZ = -Math.floor((Math.random() * 1000) - 1);

      octahedron.position.set(posX, posY, posZ);
      group.add(octahedron);
    }
    scene.add(group);
    octahedronsIn = true;
  }
}

function rotateGeometry(group) {
  var arrX = [];
  var arrY = [];
  for (let i = 0; i < 8; i++) {
    if (i % 2 == 0) {
      arrY[i] = Math.random() * -0.02;
    } else {
      arrY[i] = Math.random() * 0.03;
    }
    arrX[i] = Math.random() * 0.01;
  }
  group.children.forEach((element, index) => {
    element.rotation.x += arrX[index];
    element.rotation.y += arrY[index];
  });
}

var up = [];
var right = [];
var xTranslate = [];
var yTranslate = [];
for (let index = 0; index < 8; index++) {
  up[index] = true;
  right[index] = true;
  xTranslate[index] = Math.random() * 0.15;
  yTranslate[index] = Math.random() * 0.1;
}

function moveGeometry(group){
  group.children.forEach((element, index) => {
    if(up[index]){
      element.position.y += yTranslate[index];
      if (element.position.y >= height-3){
        up[index] = false;
      }
    } else if (!up[index]) {
      element.position.y -= yTranslate[index];
      if (element.position.y <= -height+3){
        up[index] = true;
      }
    }
    if (right[index]) {
      element.position.x += xTranslate[index]
      if (element.position.x >= width-3) {
        right[index] = false;
      }
    } else if (!right[index]) {
      element.position.x -= xTranslate[index]
      if (element.position.x <= -width+3) {
        right[index] = true;
      }
    }
  });
}

var colors = [ 0xf44242, 0xf4a341, 0xf4df41, 0x4cf441, 0x41f4e8, 0x4143f4, 0xd341f4, 0xf44194 ];

function changeColor(group){
    group.children.forEach((elem, index) => {
      rand=Math.floor(Math.random() * 8);
      elem.material.color.setHex(colors[rand]);
  })
}


function changeTrans(group){
  group.children.forEach((element,index)=>{
    element.material.transparent=true;
    element.material.opacity= Math.random();
  });
}

function scaleGeometry(group){
  var num = prompt("Escoge un numero real entre 0 y 5")
  if(num!=null){
    group.children.forEach((element, index) => {
      element.scale.set(num,num,num);
    });
  }
}
