var lpWidth = (window.innerWidth * 0.2);
var lpHeight = (window.innerHeight * 0.8);

var lpscene = new THREE.Scene();
var lpcamera = new THREE.OrthographicCamera(-lpWidth / 20, lpWidth / 20, lpHeight / 20, -lpHeight / 20, near, far);

var lprenderer = new THREE.WebGLRenderer();
lprenderer.setSize(lpWidth, lpHeight);
lprenderer.setClearColor(0x000000);

document.getElementById('leftpanel').appendChild(lprenderer.domElement);

// CUBO
var geometry = new THREE.BoxGeometry(6, 6, 6);
var material = new THREE.MeshLambertMaterial({
  color: 0xff444f,
});
var cube = new THREE.Mesh(geometry, material);
cube.position.set(0, 0, -20);
lpscene.add(cube);

// ESFERA
var geometry = new THREE.SphereGeometry(5, 25, 25);
var material = new THREE.MeshLambertMaterial({
  color: 0xfff444f,
});
var sphere = new THREE.Mesh(geometry, material);
sphere.position.set(0, 15, -20);
lpscene.add(sphere);

// OCTAEDRO
var geometry = new THREE.OctahedronGeometry(5, 0);
var material = new THREE.MeshLambertMaterial({
  color: 0xff444f,
});
var sphere2 = new THREE.Mesh(geometry, material);
sphere2.position.set(0, -15, -20);
lpscene.add(sphere2);

// LIGHT
var directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
directionalLight.position.z = 2;
lpscene.add(directionalLight);

// EventListeners
// Esfera
var lpDomEvents = new THREEx.DomEvents(lpcamera, lprenderer.domElement);
lpDomEvents.addEventListener(sphere, 'click', () => {
  sphere.material.wireframe = !sphere.material.wireframe;
})
// Cube
lpDomEvents.addEventListener(cube, 'click', () => {
  drawCubes(mainScene);
  console.log(mainScene);
})
// Octa
lpDomEvents.addEventListener(sphere2, 'click', () => {
  sphere2.material.wireframe = !sphere2.material.wireframe;
})

var animateLP = function () {
  requestAnimationFrame(animateLP);
  lprenderer.render(lpscene, lpcamera);
  cube.rotation.x += 0.005;
  cube.rotation.y += 0.005;
  sphere.rotation.x -= 0.005;
  sphere.rotation.y -= 0.005;
  sphere2.rotation.x -= 0.005;
  sphere2.rotation.y -= 0.005;
};

animateLP();