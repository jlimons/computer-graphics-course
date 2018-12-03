/*
 * Variables globales
 */
var width = window.innerWidth / 50;
var height = window.innerHeight / 50;
var near = 1;
var far = 1000;
var frustumSize = 1000;
var cubesIn = false;
var shperesIn = false;
var octahedronsIn = false;
var frameCounter = 0;

var rotate = false;
var escape = false;
var move = false;
var color = false;
var transparency = false;
var transLevel = 0;
var scale = false;

var clicked = '';

/*
 * Creación de render principal
 */
var mainScene = new THREE.Scene();
var mainCamera = new THREE.OrthographicCamera(-width, width, height, -height, near, far);

var mainRenderer = new THREE.WebGLRenderer();
mainRenderer.setSize(window.innerWidth * 0.8, window.innerHeight * 0.8);
mainRenderer.setClearColor(0xffffff);

document.getElementById('main').appendChild(mainRenderer.domElement);

/*
 * Iluminación de punto para la escena principal
 */
var mainDirectionalLight = new THREE.SpotLight(0xffffff, 1);
mainDirectionalLight.position.z = 10;
mainScene.add(mainDirectionalLight);

drawLines(mainScene);

/*
 * Animación de escena principal
 */
var animateMain = function () {
  frameCounter ++;
  requestAnimationFrame(animateMain);
  mainRenderer.render(mainScene, mainCamera);
  if (rotate){
    switch (clicked) {
      case 'cubes':
        rotateGeometry(mainScene.children.find(elem => {
          return elem.name == 'cubes'
        }))
      break;
      case 'octahedrons':
        rotateGeometry(mainScene.children.find(elem => {
          return elem.name == 'octahedrons'
        }))
      break;
    }
  }
  if(move){
    switch (clicked) {
      case 'cubes':
        moveGeometry(mainScene.children.find(elem => {
          return elem.name == 'cubes'
        }))
      break;
      case 'spheres':
        moveGeometry(mainScene.children.find(elem => {
          return elem.name == 'spheres'
        }))
      break;
      case 'octahedrons':
        moveGeometry(mainScene.children.find(elem => {
          return elem.name == 'octahedrons'
        }))
      break;
      default:
        break;
    }
  }
  if(color){
    color=false
    switch (clicked) {
      case 'cubes':
        changeColor(mainScene.children.find(elem => {
          return elem.name == 'cubes'
        }))
      break;
      case 'spheres':
        changeColor(mainScene.children.find(elem => {
          return elem.name == 'spheres'
        }))
      break;
      case 'octahedrons':
        changeColor(mainScene.children.find(elem => {
          return elem.name == 'octahedrons'
        }))
      break;

      default:
        break;
    }
  }
  if(transparency){
    transparency=false
    switch (clicked) {
      case 'cubes':
        changeTrans(mainScene.children.find(elem => {
          return elem.name == 'cubes'
        }))
      break;
      case 'spheres':
        changeTrans(mainScene.children.find(elem => {
          return elem.name == 'spheres'
        }))
      break;
      case 'octahedrons':
        changeTrans(mainScene.children.find(elem => {
          return elem.name == 'octahedrons'
        }))
      break;

      default:
        break;
    }
  }
  if(scale){
    scale=false
    switch (clicked) {
      case 'cubes':
        scaleGeometry(mainScene.children.find(elem => {
          return elem.name == 'cubes'
        }))
      break;
      case 'spheres':
        scaleGeometry(mainScene.children.find(elem => {
          return elem.name == 'spheres'
        }))
      break;
      case 'octahedrons':
        scaleGeometry(mainScene.children.find(elem => {
          return elem.name == 'octahedrons'
        }))
      break;

      default:
        break;
    }
  }
   if (escape) {
     escape = false
     mainScene.remove(mainScene.children.find(elem => {
       return elem.name == 'octahedrons'
     }))
     mainScene.remove(mainScene.children.find(elem => {
       return elem.name == 'spheres'
     }))
     mainScene.remove(mainScene.children.find(elem => {
       return elem.name == 'cubes'
     }))
     cubesIn = false;
     shperesIn = false;
     octahedronsIn = false;
   }
};

animateMain();
