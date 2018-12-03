// Tarea 2
// Animación de cerámica
// Se utiliza la librería three.js de WebGL

// Arreglo de coordenadas para los círculos
var coords = [
   { x: 0, y: -120 },
   { x: 0, y: 120 },
   { x: 120, y: 0 },
   { x: -120, y: 0 },
   { x: 245, y: 120 },
   { x: 245, y: -120 },
   { x: -245, y: -120 },
   { x: -245, y: 120 },
   { x: 120, y: 245 },
   { x: -120, y: 245 },
   { x: 120, y: -245 },
   { x: -120, y: -245 }
]
// Contador de frames para controlar animaciones
// Default 60 f/s
var frameCounter = 0;
var fiestaFrameCounter = 0;

var colors = [
   { color: 0xf44242 },
   { color: 0xf4a341 },
   { color: 0xf4df41 },
   { color: 0x4cf441 },
   { color: 0x41f4e8 },
   { color: 0x4143f4 },
   { color: 0xd341f4 },
   { color: 0xf44194 }
];

// Crea un canvas de visualización y lo inserta en el html
// El tamaño del canvas es de 500x500. Lo defino de este tamaño
// dado que el canvas de mi tarea uno es de ese tamaño.
// Definimos el tamaño, color y la relación de aspecto de pixel.
var renderer = new THREE.WebGLRenderer();
document.body.appendChild(renderer.domElement);
renderer.setSize(500, 500);
renderer.setClearColor(0x1bc1c4);
renderer.setPixelRatio(window.devicePixelRatio);

// Definición de una cámara sin ángulo y una escena principal
var camera = new THREE.OrthographicCamera(-250, 250, 250, -250, 0.1, 1000);
var scene = new THREE.Scene();

// Iteramos sobre el array de coordenadas para crear cada círculo
coords.forEach(e => {
   // RingGeometry es un anillo creado por medio de triangle strip
   // Los parámetros son (radioInterior, radioExterior, númeroDeTriángulos)
   // Creamos los materiales por medio de MeshBasicMaterial (color, transparencia, etc)
   // Aplicamos los materiales a la geometría por medio de Mesh
   var ring = new THREE.RingGeometry(105, 130, 100);
   var ringMaterial = new THREE.MeshBasicMaterial({ 
      color: 0x004b4b, 
      transparent: true, 
      opacity: 0.7, 
      side: 2
   });
   var mesh = new THREE.Mesh(ring, ringMaterial);
   mesh.position.set(e.x, e.y, -100);
   mesh.scale.x = 50;
   mesh.scale.y = 50;

   var innerRing = new THREE.RingGeometry(105 * 0.1, 130 * 0.2, 80);
   var innerRingMaterial = new THREE.MeshBasicMaterial({ 
      color: 0x004b4b, 
      wireframe: true 
   });
   var mesh1 = new THREE.Mesh(innerRing, innerRingMaterial);
   mesh1.position.set(0, 0, -100);

   // Agrupamos cada par de geometrías para poder iterar fácilmente en las animaciones
   var group = new THREE.Group();
   group.add(mesh1);
   group.add(mesh);

   // Agregamos cada grupo a la escena
   scene.add(group);
});

//console.log(scene.children[0].children[0]);

// Animación inicial
function begin(){
   // En esta animacíon, cada elemeto del clip toma su lugar.
   scene.children[0].children[0].rotation.x += 0.1;
   scene.children[0].children[0].rotation.y += 0.06;

   // Iteramos sobre cada Group en la Escena.
   scene.children.forEach((group, index) => {
      group.children[0].rotation.z += 0.0008;
      if (group.children[0].position.x != coords[index].x ){
         if (coords[index].x < 0){
            group.children[0].position.x -= 0.5;
         }else{
            group.children[0].position.x += 0.5;
         }
      }
      if (group.children[0].position.y != coords[index].y) {
         if (coords[index].y < 0) {
            group.children[0].position.y -= 0.5;
         }else{
            group.children[0].position.y += 0.5;
         }
      }
      if (group.children[1].scale.x > 1) {
         group.children[1].scale.x -= 0.1;
         group.children[1].scale.y -= 0.1;
      }
   })
}

// Segunda escena
function party(){
   fiestaFrameCounter ++;
   renderer.setClearColor(0x222426);
   scene.children[0].children[0].rotation.x = 0;
   scene.children[0].children[0].rotation.y = 0;
   scene.children[0].children[0].material.color.setHex(0x4a7a70);
   scene.children[0].children[0].material.transparent = true;

   scene.children.forEach((group, index) => {
      group.children[0].rotation.x += 0.1;
      group.children[0].rotation.y += 0.03;
      if(fiestaFrameCounter <= 40){
         switch (fiestaFrameCounter) {
            case 5:
               group.children[1].material.color.setHex(colors[0].color);
               scene.children[0].children[0].scale.x += 0.01;
               scene.children[0].children[0].scale.y += 0.01;
            break;
            case 10:
               group.children[1].material.color.setHex(colors[1].color);
               scene.children[0].children[0].scale.x += 0.01;
               scene.children[0].children[0].scale.y += 0.01;
            break;
            case 15:
               group.children[1].material.color.setHex(colors[2].color);
               scene.children[0].children[0].scale.x += 0.01;
               scene.children[0].children[0].scale.y += 0.01;
            break;
            case 20:
               group.children[1].material.color.setHex(colors[3].color);
               scene.children[0].children[0].scale.x += 0.01;
               scene.children[0].children[0].scale.y += 0.01;
            break;
            case 25:
               group.children[1].material.color.setHex(colors[4].color);
               scene.children[0].children[0].scale.x -= 0.01;
               scene.children[0].children[0].scale.y -= 0.01;
            break;
            case 30:
               group.children[1].material.color.setHex(colors[5].color);
               scene.children[0].children[0].scale.x -= 0.01;
               scene.children[0].children[0].scale.y -= 0.01;
            break;
            case 35:
               group.children[1].material.color.setHex(colors[6].color);
               scene.children[0].children[0].scale.x -= 0.01;
               scene.children[0].children[0].scale.y -= 0.01;
            break;
            case 40:
               group.children[1].material.color.setHex(colors[7].color);
               scene.children[0].children[0].scale.x -= 0.01;
               scene.children[0].children[0].scale.y -= 0.01;
            break;
            default:
               break;
         }
      }else{
         fiestaFrameCounter = 0;
      }
   });
}

// Escena final. Regresa valores de rotación y color a los iniciales.
function end(){
   renderer.setClearColor(0x1bc1c4);
   scene.children.forEach((group, index) => {
      group.children[1].material.color.setHex(0x004b4b);
      group.children[0].material.color.setHex(0x004b4b);
      group.children[0].rotation.x = 0;
      group.children[0].rotation.y = 0;
   })
}

render();

console.log(renderer.getCurrentViewport());
console.log(renderer.getPixelRatio());

function render(){
   requestAnimationFrame(render);
   renderer.render(scene, camera);
   frameCounter++;
   
   if(frameCounter <= 800){
      begin();
   } else if (frameCounter <= 2000) {
      party();
   } else if (frameCounter <= 2800){
      end();
   }
}