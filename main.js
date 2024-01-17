import * as THREE from "three";
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { camera, light, amblight } from "./cameraSceneLight.js";
import {floorPlane,roofPlane } from './floor.js'
import {CharacterControls,loading,changeLoading, userType,updateUserType, inputing,updateInputing} from './characterControls.js'
import { handleFormSubmission } from "./functions.js"
import { FBXLoader } from 'three/addons/loaders/FBXLoader.js';
import {FontLoader} from 'three/examples/jsm/loaders/FontLoader';
import {TextGeometry} from 'three/examples/jsm/geometries/TextGeometry';




export const canvas = document.querySelector(".webgl");
const renderer = new THREE.WebGLRenderer({canvas});
renderer.shadowMap.enabled= true;
renderer.shadowMap.type= THREE.PCFShadowMap;
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);






// Scene
export const scene = new THREE.Scene();
scene.add(camera);
scene.add(light);
scene.add( amblight );

LoadModel();
RAF();


// world
const loader= new THREE.CubeTextureLoader();
const texture= loader.load([  
  'src/res/Daylight Box_Right.bmp',
  'src/res/Daylight Box_Left.bmp',
  'src/res/Daylight Box_Top.bmp',
  'src/res/Daylight Box_Bottom.bmp',
  'src/res/Daylight Box_Front.bmp',
  'src/res/Daylight Box_Back.bmp',
]);
scene.background= texture;

//floor and roof Load using image texture
scene.add(floorPlane);
scene.add(roofPlane);


// CONTROLS
var orbitControls = new OrbitControls(camera, renderer.domElement);
// orbitControls.enableDamping = true;
orbitControls.minDistance = 135;
orbitControls.maxDistance = 165;
orbitControls.enablePan = false;
orbitControls.maxPolarAngle = Math.PI / 2 - 0.05;




// Add event listener to the parent element using event delegation
document.querySelector('.input').addEventListener("submit", function (event) {
    if (event.target && event.target.tagName.toLowerCase() === 'form') {
        // Only handle events on the 'form' element
        handleFormSubmission(event);
    }
});



var userTypeElements = document.querySelectorAll(".userTypes .type");

// Add click listener to each element
userTypeElements.forEach(function (element) {
    element.addEventListener("click", function () {
        // Display the clicked element's value
        var clickedValue = this.textContent; // or this.innerText
        updateUserType(clickedValue);
        updateInputing(true);
        document.querySelector('.userTypes').style.display='none';
    });
});


var characterControl;

function LoadModel(){

  const loader=new GLTFLoader();
  const fbxLoader = new FBXLoader();

  //load surroundings
  loader.load('src/modern_city_block (1).glb', (gltf)=>{
    gltf.scene.traverse(c=>{
      c.castShadow=true;
    });
    gltf.scene.position.set(0, 23, 0);
    scene.add(gltf.scene);
  },function(xhr) {

    document.querySelector('span').innerHTML=(xhr.loaded / xhr.total * 100)<10?String(xhr.loaded / xhr.total * 100).slice(0,1):(xhr.loaded / xhr.total * 100)<100?String(xhr.loaded / xhr.total * 100).slice(0,2):'100';
    if((xhr.loaded / xhr.total * 100 )==100){
       setTimeout(show, 3000);
          function show() {
            document.querySelector('.loading').style.display="none";
            canvas.style.display = "block";
            changeLoading(false);
          }

    }
  })

  //load main building
  loader.load('src/low_rise_wall_to_wall_office_building.glb', (gltf)=>{
    gltf.scene.traverse(c=>{
      c.castShadow=true;
    });
    gltf.scene.position.set(3300, -112, 10500);
    gltf.scene.scale.set(.6,.6,.6)
    scene.add(gltf.scene);


    const fontLoader=new FontLoader();
        fontLoader.load(
          'node_modules/three/examples/fonts/droid/droid_sans_bold.typeface.json',
          (droidFont)=>{
            const textGeometry= new TextGeometry("Rak Dao",{
              height:2,
              size:80,
              font:droidFont,
            });
            const textMaterial=new THREE.MeshNormalMaterial();
            const textMesh=new THREE.Mesh(textGeometry, textMaterial);
            textMesh.position.set(3100,80,11580);
            // textMesh.position.x=350;
            // textMesh.position.z=-120;
            scene.add(textMesh);
          }
        )       


  },function(xhr) {

    document.querySelector('span').innerHTML=(xhr.loaded / xhr.total * 100)<10?String(xhr.loaded / xhr.total * 100).slice(0,1):(xhr.loaded / xhr.total * 100)<100?String(xhr.loaded / xhr.total * 100).slice(0,2):'100';
    if((xhr.loaded / xhr.total * 100 )==100){
       setTimeout(show, 3000);
          function show() {
            document.querySelector('.loading').style.display="none";
            canvas.style.display = "block";
            changeLoading(false);
          }

    }
  })

  

  //another user model
  fbxLoader.load("./src/character.fbx", (fbx) => {
    const model = fbx;
      model.traverse( (object)=>{
          if(object.isMesh)
          {
              object.castShadow = true;
          }
      })

      model.position.set(3400, -112, 13600);
      model.scale.set(0.4, 0.4, 0.4);
      model.rotation.y = THREE.MathUtils.degToRad(-180);

      


      var animationmap=new Map();
      var mixer= new THREE.AnimationMixer(model);

      const anim= new FBXLoader();
      fbxLoader.load("./src/Breathing Idle.fbx", (anim) => {
        animationmap.set("Idle", mixer.clipAction(anim.animations[0]));
        mixer.clipAction(anim.animations[0]).play();
        mixer.update(clock.getDelta());      
      });

    // Load walk animation
    fbxLoader.load("./src/Walking.fbx", (walk) => {
      animationmap.set('Walk',mixer.clipAction(walk.animations[0]));
    });

    scene.add(model);
    characterControl = new CharacterControls( model, mixer, animationmap, orbitControls, camera, 'Idle');

  });

 


  //load reception model

  loader.load("./src/reception.glb", (gltf)=> {
    const model = gltf.scene
    model.traverse( (object)=>{
        if(object.isMesh)
        {
            object.castShadow = true;
        }
        model.position.set(3400, -112, 10620);
        model.scale.set(30, 30, 30);
        // model.rotation.y = THREE.MathUtils.degToRad(90);
        scene.add(model)

        const fontLoader=new FontLoader();
        fontLoader.load(
          'node_modules/three/examples/fonts/droid/droid_sans_bold.typeface.json',
          (droidFont)=>{
            const textGeometry= new TextGeometry("Register here",{
              height:2,
              size:30,
              font:droidFont,
            });
            const textMaterial=new THREE.MeshNormalMaterial();
            const textMesh=new THREE.Mesh(textGeometry, textMaterial);
            textMesh.position.set(3300,10,10620);
            // textMesh.position.x=350;
            // textMesh.position.z=-120;
            scene.add(textMesh);
          }
        )       

    })

    var repGltfanimations = gltf.animations // getting all gltf animation clips from gltf model
    var repMixer = new THREE.AnimationMixer(model) // will convert all animation clips into animation actions using mixer which helps into fading in or fading out animations for smooth animations transition
    var repAnimationClip = repGltfanimations[0];

    // Create an animation action
    var repAnimationAction = repMixer.clipAction(repAnimationClip);
    
    // Play the animation
    repAnimationAction.play();
    repMixer.update(clock.getDelta())
  })
}






// CONTROL KEYS

var keypressed = {}




// KEY DOWN EVENT
document.addEventListener('keydown', function(event) {
     keypressed[event.key.toLowerCase()] = true  // Setting the property of the object true on key press down
},false)



// KEY UP EVENT
document.addEventListener('keyup', function(event) {
   keypressed[event.key.toLowerCase()] = false // Setting the property of the object false on fey press up
},false)



window.addEventListener('resize',()=>{
  OnWindowResize();
},false);



function OnWindowResize(){
  camera.aspect=window.innerWidth/window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth,window.innerHeight);
};




// CLOCK
var clock = new THREE.Clock();


function RAF(){
  requestAnimationFrame(()=>{

    let mixerUpdateDelta = clock.getDelta()
   
    if( characterControl )
    {
      characterControl.update(mixerUpdateDelta, keypressed);
    }
  
    orbitControls.update();
    renderer.render(scene,camera);
    RAF();
  });
}

// // Helper to show axes
const axesHelper = new THREE.AxesHelper(5);
axesHelper.position.set(3400, -112, 13800);
scene.add(axesHelper);

