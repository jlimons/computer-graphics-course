var colors = [0xf44242, 0xf4a341, 0xf4df41, 0x4cf441, 0x41f4e8, 0x4143f4, 0xd341f4, 0xf44194];

document.addEventListener("keypress", function onEvent(event) {
  if (event.key === "e" || event.key === "E") {
    scale = !scale
  } else if (event.key === "M" || event.key === "m") {
    move = !move
  } else if (event.key === "c" || event.key === "C") {
    color = !color
  } else if (event.key === "r" || event.key === "R") {
    rotate = !rotate
  } else if (event.key === "t" || event.key === "T") {
    transparency = !transparency
  } else if (event.key === "s" || event.key === "S") {
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
      var colorPicker = colors[Math.floor((Math.random() * 7))]
      var material = new THREE.MeshStandardMaterial({
        color: colorPicker,
      });
      var XplusOrMinus = Math.random() < 0.5 ? -1 : 1;
      var YplusOrMinus = Math.random() < 0.5 ? -1 : 1;
      var cube = new THREE.Mesh(geometry, material);
      var posX = (Math.floor((Math.random() * width - 3)) * XplusOrMinus);
      var posY = (Math.floor((Math.random() * height - 3)) * YplusOrMinus);
      var posZ = -Math.floor((Math.random() * 950) + 10);
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
      var colorPicker = colors[Math.floor((Math.random() * 7))]
      var material = new THREE.MeshStandardMaterial({
        color: colorPicker,
      });
      var XplusOrMinus = Math.random() < 0.5 ? -1 : 1;
      var YplusOrMinus = Math.random() < 0.5 ? -1 : 1;

      var sphere = new THREE.Mesh(geometry, material);

      var posX = (Math.floor((Math.random() * width - 3)) * XplusOrMinus);
      var posY = (Math.floor((Math.random() * height - 3)) * YplusOrMinus);
      var posZ = -Math.floor((Math.random() * 950) + 10);

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
      var colorPicker = colors[Math.floor((Math.random() * 7))]
      var material = new THREE.MeshStandardMaterial({
        color: colorPicker,
      });
      var XplusOrMinus = Math.random() < 0.5 ? -1 : 1;
      var YplusOrMinus = Math.random() < 0.5 ? -1 : 1;

      var octahedron = new THREE.Mesh(geometry, material);

      var posX = (Math.floor((Math.random() * width - 3)) * XplusOrMinus);
      var posY = (Math.floor((Math.random() * height - 3)) * YplusOrMinus);
      var posZ = -Math.floor((Math.random() * 950) + 10);

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
var z = [];
var xTranslate = [];
var yTranslate = [];
var zTranslate = [];
for (let index = 0; index < 8; index++) {
  up[index] = true;
  right[index] = true;
  z[index] = true;
  xTranslate[index] = Math.random() * 0.09;
  yTranslate[index] = Math.random() * 0.08;
  zTranslate[index] = Math.random() * 0.5;
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
    if (z[index]) {
      element.position.z += zTranslate[index]
      if (element.position.z >= near - 10) {
        z[index] = false;
      }
    } else if (!z[index]) {
      element.position.z -= zTranslate[index]
      if (element.position.z <= -far + 10) {
        z[index] = true;
      }
    }
  });
}

function changeColor(group){
    group.children.forEach((elem, index) => {
      rand=Math.floor(Math.random() * 8);
      elem.material.color.setHex(colors[rand]);
  })
}


function changeTrans(group){
  var num = prompt("Escoge un número entre 0 y 1")
  if (num != null && num != '') {
    if(isNaN(num)){
      alert('input inválido :(')
    }else{
      group.children.forEach((element, index) => {
        element.material.transparent = true;
        element.material.opacity = num;
      });
    }
  }
}

function scaleGeometry(group){
  var num = prompt("Escoge un número entre 0 y 5")
  if (num != null && num != '') {
    if(isNaN(num)){
      alert('input inválido :(')
    }else{
      group.children.forEach((element, index) => {
        element.scale.set(num, num, num);
      });
    }
  }
}
