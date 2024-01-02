
import * as THREE from "three";
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { FBXLoader } from 'three/addons/loaders/FBXLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';


const canvas = document.querySelector(".webgl");
const renderer = new THREE.WebGLRenderer({canvas});
renderer.shadowMap.enabled= true;
renderer.shadowMap.type= THREE.PCFShadowMap;
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);


var loading= true;
const DIRECTIONS = ['w', 'a', 's', 'd'];


// Scene
const scene = new THREE.Scene();


// Camera
const fov=60;
const aspect= window.innerWidth/window.innerHeight;
const near=1.00;
const far=10000.0;

const camera = new THREE.PerspectiveCamera(fov, aspect,near,far);
camera.position.set(100,100,0);
scene.add(camera);


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
scene.add(light);


const amblight = new THREE.AmbientLight( 0xFFFFFF ); // soft white light
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

//floor
const planeGeometry = new THREE.PlaneGeometry(1000, 1000, 1, 1);
const planeMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff });

// Load an image texture
const textureLoader = new THREE.TextureLoader();
const textur = textureLoader.load('./src/res/nasa--hI5dX2ObAs-unsplash.jpg'); // Replace with the actual path to your image
planeMaterial.map = textur;

const plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.castShadow=false;
plane.receiveShadow=true;
plane.rotation.x= -Math.PI/2;
scene.add(plane);


// CONTROLS
var orbitControls = new OrbitControls(camera, renderer.domElement);
orbitControls.enableDamping = true;
orbitControls.minDistance = 35;
orbitControls.maxDistance = 45;
orbitControls.enablePan = false;
orbitControls.maxPolarAngle = Math.PI / 2 - 0.05;



var CharacterControls = /** @class */( function () { // ES6 standard way of creating a class in javascript where the function followed by /** @class */ will be treated as a class and the function next to it will be a constructor function


  function CharacterControls(model,mixer,animationmap,orbitControl,camera,currentAction){

      // TEMPORARY DATA FOR MATH CALCULATION
      this.walkDirection = new THREE.Vector3()
      this.rotateAngle = new THREE.Vector3(0, 1 ,0)
      this.rotateQuaternion = new THREE.Quaternion()
      this.cameraTarget = new THREE.Vector3()

      // CONSTANT DATA
      this.fadeDuration = 0.2
      this.walkVelocity = 20
      this.currentAction=currentAction
      this.model = model
      this.mixer = mixer
      this.animationmap = animationmap
      this.animationmap.forEach( function( value,key ) {
          if( key == currentAction )
          {
              value.play()
          }
          
      })
      this.orbitControl = orbitControl
      this.camera = camera

  }



  CharacterControls.prototype.update = function( delta , keysPressed ) { // Method update which will be called every frame to update state with delta time and on the basis of the key pressed
        const directionPressed = DIRECTIONS.some( (key)=>  // To check if any of W,A,S,D key has been pressed
             keysPressed[key] == true
        )

        // TO DETERMINE WHETHER NEXT STATE MUST BE IDLE,WALK,RUN
        var play = ''
       
         if( directionPressed )
        {
          play = 'Walk'
        }
        else
        {
          play = 'Idle'
        }

        if( this.currentAction &&this.currentAction != play ) // To check if current state is same as that of the state just determined
        {

           const toPlay = this.animationmap.get(play) // current animation
           const current = this.animationmap.get(this.currentAction) // next animation

           current.fadeOut(this.fadeDuration) // Tell the current animation to fade out
           toPlay.reset().fadeIn(this.fadeDuration).play() // Tell the next animation to fade in

           this.currentAction = play // Store my new State

           // TILL NOW CHARACTER HAVE NO DIRECTION 
        }

        this.mixer.update( delta )


        // Walk Velocity
          const velocity =  this.walkVelocity;
          
           // move model
          const moveX =  velocity * delta
          const moveZ = velocity * delta
        
          if(keysPressed['w']){
            this.model.position.x-=moveX;
          }else if(keysPressed['s']){
            this.model.position.x+=moveX;
          }else if(keysPressed['a']){
            this.model.position.x-=moveX/2;
            this.model.position.z+=moveZ/2;
          }else if(keysPressed['d']){
            this.model.position.x-=moveX/2;
            this.model.position.z-=moveZ/2;
          }

          
          this.cameraTarget.x = this.model.position.x;
          this.cameraTarget.y = this.model.position.y + 1;
          this.cameraTarget.z = this.model.position.z;
          this.orbitControl.target = this.cameraTarget;


          function handleSubmit(e){
            e.preventDefault();
            console.log("submit");
            canvas.style.display="block";
          }
          //move to input page
          if(!loading){
            if((this.model.position.x>-430 && this.model.position.x<-420)&&(this.model.position.z>120 && this.model.position.z<160)){
              canvas.style.display='none';
              document.querySelector('.input').style.display='block';
            }
          }
          


        }  
  return CharacterControls // Constructor function returning the definition of the class CharacterControls

})();



var characterControl;;

function LoadModel(){

  //load building
  const loader=new GLTFLoader();
  loader.load('src/office1.glb', (gltf)=>{
    gltf.scene.traverse(c=>{
      c.castShadow=true;
    });
    gltf.scene.position.set(-350, 23, 0);
    scene.add(gltf.scene);
  },function(xhr) {

    document.querySelector('span').innerHTML=(xhr.loaded / xhr.total * 100)<10?String(xhr.loaded / xhr.total * 100).slice(0,1):(xhr.loaded / xhr.total * 100)<100?String(xhr.loaded / xhr.total * 100).slice(0,2):'100';
    if((xhr.loaded / xhr.total * 100 )==100){
       setTimeout(show, 3000);
          function show() {
            document.querySelector('.loading').style.display="none";
            canvas.style.display = "block";
            loading=false;
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
          model.position.set(0, 0, 120);
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


  //load reception model

  const fbxLoader = new FBXLoader();
  fbxLoader.load('./src/Sitting Idle.fbx', (fbx) => {
    fbx.scale.set(0.12, 0.12, 0.12);
    fbx.position.set(-450, 0, 140);
    fbx.castShadow= true;
    fbx.rotation.y=  THREE.MathUtils.degToRad(90); 
    console.log(fbx);
    // If the FBX model has animations, try to play the first one
    if (fbx.animations && fbx.animations.length > 0) {
      const mixer = new THREE.AnimationMixer(fbx);
      const animationAction = mixer.clipAction(fbx.animations[0]);
      animationAction.play();
    }

    scene.add(fbx);
  });
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

