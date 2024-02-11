import * as THREE from "three";

const textureLoader = new THREE.TextureLoader();
const floorTexture = textureLoader.load("./src/res/floor.jpg");

// Set wrapping to repeat in both axes
floorTexture.wrapS = THREE.RepeatWrapping;
floorTexture.wrapT = THREE.RepeatWrapping;

// Set how many times the texture should repeat in each axis
floorTexture.repeat.set(50, 50);

const floorPlaneGeometry = new THREE.PlaneGeometry(1900, 1900); // Adjust the size as needed
const floorPlaneMaterial = new THREE.MeshBasicMaterial({ map: floorTexture });
const floorPlane = new THREE.Mesh(floorPlaneGeometry, floorPlaneMaterial);

floorPlane.rotation.x = -Math.PI / 2; // Rotate the plane to be horizontal
floorPlane.position.set(3300, -113, 10500);

const roofTexture = textureLoader.load("./src/res/roof.jpg");

// Set wrapping to repeat in both axes
roofTexture.wrapS = THREE.RepeatWrapping;
roofTexture.wrapT = THREE.RepeatWrapping;

// Set how many times the texture should repeat in each axis
roofTexture.repeat.set(50, 50);

const roofPlaneGeometry = new THREE.PlaneGeometry(1900, 1900); // Adjust the size as needed
const roofPlaneMaterial = new THREE.MeshBasicMaterial({
  map: roofTexture,
  side: THREE.DoubleSide,
}); // White color
const roofPlane = new THREE.Mesh(roofPlaneGeometry, roofPlaneMaterial);

roofPlane.rotation.x = -Math.PI / 2; // Rotate the plane to be horizontal
roofPlane.position.set(3300, 180, 10500);

export { floorPlane, roofPlane };
