import * as THREE from "three";
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { camera, light, amblight } from "./cameraSceneLight.js";
import {plane} from './floor.js'
import {CharacterControls,loading,changeLoading, userType,updateUserType, inputing,updateInputing} from './characterControls.js'
import { handleFormSubmission } from "./functions.js"
import { FBXLoader } from 'three/addons/loaders/FBXLoader.js';


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

//floor Load using image texture
scene.add(plane);


// CONTROLS
var orbitControls = new OrbitControls(camera, renderer.domElement);
// orbitControls.enableDamping = true;
orbitControls.minDistance = 35;
orbitControls.maxDistance = 45;
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

  //load building
  const loader=new GLTFLoader();
  loader.load('src/office1.glb', (gltf)=>{
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

  //load the character
  const charLoader= new GLTFLoader();
    charLoader.load("./src/dist/model/Soldier.glb", (gltf)=> {
      const model = gltf.scene
      model.traverse( (object)=>{
          if(object.isMesh)
          {
              object.castShadow = true;
          }
          model.position.set(350, 0, -120);
          model.scale.set(12, 12, 12);
          model.rotation.y = THREE.MathUtils.degToRad(80);

          scene.add(model)
      })
      var gltfanimations = gltf.animations // getting all gltf animation clips from gltf model
      var mixer = new THREE.AnimationMixer(model) // will convert all animation clips into animation actions using mixer which helps into fading in or fading out animations for smooth animations transition
      var animationmap = new Map()

      gltfanimations=gltfanimations.filter( ( a )=> // This function filter out all animations which are not T-Pose
        a.name != "TPose"
      )
    
      gltfanimations.forEach( ( a )=> // For all of those animations which are filtered out and which are not T-Pose will be converted into AnimationClips  
      animationmap.set(a.name , mixer.clipAction(a))
      )
      
      // INSTANTIATING CHARACTERCONTROLS
      characterControl = new CharacterControls( model, mixer, animationmap, orbitControls, camera, 'Idle');
  })


  // //another user model
  // const fbxLoader = new FBXLoader();
  // fbxLoader.load("./src/character.fbx", (fbx) => {
  //   // fbx.scene.traverse(c=>{
  //   //   c.castShadow=true;
  //   // });
  //   // fbx.scene.position.set(300, 0, 120);
  //   // scene.add(fbx.scene);
  //   const model = fbx;
  //     model.traverse( (object)=>{
  //         if(object.isMesh)
  //         {
  //             object.castShadow = true;
  //         }
  //         model.position.set(350, 0, -120);
  //         model.scale.set(0.12, 0.12, 0.12);
  //         model.rotation.y = THREE.MathUtils.degToRad(-80);

  //         scene.add(model)
  //     })
      
  //     var animations=[];
  //     const idle = useFBX("./src/Breathing Idle.fbx");

  //     animations["idle"] = {
  //       clip: mixer.clipAction(idle.animations[0]),
  //     };
    
  //     const walk = useFBX("./src/Walking.fbx");
    
  //     animations["walk"] = {
  //       clip: mixer.clipAction(walk.animations[0]),
  //     };
    
  //   //   var mixer= new THREE.AnimationMixer(model);
  //   //   const animationAction = mixer.clipAction(
  //   //     fbx.animations[1]
  //   // );
  //   // console.log(animationAction);
  //   // mixer.addAction(animationAction);
  //   // animationAction.play();
  //     // idleModel.visible = !isWalking; // Initially show idle model
  // });

 


  //load reception model

  charLoader.load("./src/reception.glb", (gltf)=> {
    const model = gltf.scene
    model.traverse( (object)=>{
        if(object.isMesh)
        {
            object.castShadow = true;
        }
        model.position.set(-30, 0, -120);
        model.scale.set(10, 10, 10);
        model.rotation.y = THREE.MathUtils.degToRad(90);
        scene.add(model)
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
scene.add(axesHelper);

