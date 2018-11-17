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
        color: 0x055555,
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