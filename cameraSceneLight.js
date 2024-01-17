// Camera
import * as THREE from "three";


const fov=60;
const aspect= window.innerWidth/window.innerHeight;
const near=1.00;
const far=100000.0;

const camera = new THREE.PerspectiveCamera(fov, aspect,near,far);
camera.position.set(100,100,0);


// // Light
const light = new THREE.DirectionalLight(0xffffff);
light.position.set(100, 100, 100);
light.target.position.set(0,0,0);
light.castShadow=true;
light.shadow.bias=-0.01;
light.shadow.mapSize.width=2048;
light.shadow.mapSize.height=2048;
light.shadow.camera.near=1.0;
light.shadow.camera.far=500;
light.shadow.camera.left=200;
light.shadow.camera.right=-200;
light.shadow.camera.top=200;
light.shadow.camera.bottom=-200;

//ambient Light
const amblight = new THREE.AmbientLight( 0xFFFFFF ); // soft white light

export { camera, light, amblight };
