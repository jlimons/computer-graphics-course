var width = window.innerWidth / 50;
var height = window.innerHeight / 50;
var near = 1;
var far = 1000;
var frustumSize = 1000;
var cubesIn = false;

var mainScene = new THREE.Scene();
var mainCamera = new THREE.OrthographicCamera(-width, width, height, -height, near, far);

var mainRenderer = new THREE.WebGLRenderer();
mainRenderer.setSize(window.innerWidth * 0.8, window.innerHeight * 0.8);
mainRenderer.setClearColor(0xffffff);

document.getElementById('main').appendChild(mainRenderer.domElement);

// LIGHT
var mainDirectionalLight = new THREE.DirectionalLight(0xffffff, 1);
mainDirectionalLight.position.z = 5;
mainScene.add(mainDirectionalLight);

drawLines(mainScene);

var animateMain = function () {
  requestAnimationFrame(animateMain);
  mainRenderer.render(mainScene, mainCamera);
  if (cubesIn) {
    mainScene.children[2].children.forEach(element => {
      element.rotation.x += 0.01;
      element.rotation.y += 0.01;
    });
  }
};

animateMain();