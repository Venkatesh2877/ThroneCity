import * as THREE from "three";

const planeGeometry = new THREE.PlaneGeometry(10000, 10000, 1, 1);
const planeMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff });

const textureLoader = new THREE.TextureLoader();
const textur = textureLoader.load('./src/res/nasa--hI5dX2ObAs-unsplash.jpg'); // Replace with the actual path to your image
planeMaterial.map = textur;

const plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.castShadow=false;
plane.receiveShadow=true;
plane.rotation.x= -Math.PI/2;

export { plane };
