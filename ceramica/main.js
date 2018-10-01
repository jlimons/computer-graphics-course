var renderer = new THREE.WebGLRenderer();
document.body.appendChild(renderer.domElement);

renderer.setSize(500, 500);
renderer.setClearColor(0x1bc1c4);
renderer.setPixelRatio(window.devicePixelRatio);

var camera = new THREE.OrthographicCamera(-250, 250, 250, -250, 0.1, 1000);
var scene = new THREE.Scene();

function drawCircle(innerRadius, outerRadius, phiSegments, x, y) {
   var ring = new THREE.RingGeometry(innerRadius, outerRadius, phiSegments);
   var ringMaterial = new THREE.MeshBasicMaterial({ color: 0x004b4b, transparent: true, opacity: 0.7 });
   var mesh = new THREE.Mesh(ring, ringMaterial);
   mesh.position.set(x, y, -100);
   scene.add(mesh);

   var innerRing = new THREE.RingGeometry(innerRadius * 0.1, outerRadius * 0.2, phiSegments);
   var innerRingMaterial = new THREE.MeshBasicMaterial({ color: 0x004b4b, wireframe: true });
   var mesh1 = new THREE.Mesh(innerRing, innerRingMaterial);
   mesh1.position.set(x, y, -100);
   scene.add(mesh1);
   mesh1.rotation.x += 0.1;
}

drawCircle(105, 130, 100, 0, -120);
drawCircle(105, 130, 100, 0, 120);
drawCircle(105, 130, 100, 120, 0);
drawCircle(105, 130, 100, -120, 0);
drawCircle(105, 130, 100, 245, 120);
drawCircle(105, 130, 100, 245, -120);
drawCircle(105, 130, 100, -245, -120);
drawCircle(105, 130, 100, -245, 120);
drawCircle(105, 130, 100, 120, 245);
drawCircle(105, 130, 100, -120, 245);
drawCircle(105, 130, 100, 120, -245);
drawCircle(105, 130, 100, -120, -245);

render();

function render(){
   renderer.render(scene, camera);
   requestAnimationFrame(render);
}