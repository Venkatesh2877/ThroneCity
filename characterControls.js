import * as THREE from "three";
import {newUserFormHTML, clientUserFormHTML, registerCompanyFormHTML} from './inputForm.js';
import { canvas } from "./main.js";


const DIRECTIONS = ['w', 'a', 's', 'd'];
var loading= true;

const changeLoading=(value)=>{
    loading=value;
}

var userType=null, inputing=false, registerinputing=true;

const updateUserType=(value)=>{
    userType=value;
}

const updateInputing=(value)=>{
    inputing=value;
}

const updateRegisterInputing=(value)=>{
    registerinputing=value;
}
var CharacterControls = /** @class */( function () { // ES6 standard way of creating a class in javascript where the function followed by /** @class */ will be treated as a class and the function next to it will be a constructor function


    function CharacterControls(model,mixer,animationmap,orbitControl,camera,currentAction){
  
        // TEMPORARY DATA FOR MATH CALCULATION
        this.walkDirection = new THREE.Vector3()
        this.rotateAngle = new THREE.Vector3(0, 1 ,0)
        this.rotateQuaternion = new THREE.Quaternion()
        this.cameraTarget = new THREE.Vector3()
  
        // CONSTANT DATA
        this.fadeDuration = 0.2
        this.walkVelocity = 40
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
              this.model.position.z+=moveZ;
            }else if(keysPressed['d']){
              this.model.position.x-=moveX/2;
              this.model.position.z-=moveZ;
            //   this.model.rotateY(Math.PI / 2);
            //   const distance = 10; // Adjust the distance from the model
            //   const angle = this.model.rotation.y;
            //   const offsetX = Math.sin(angle) * distance;
            //   const offsetZ = Math.cos(angle) * distance;
  
            //   this.camera.position.x = this.model.position.x + offsetX;
            //   this.camera.position.z = this.model.position.z + offsetZ;
            //   this.camera.position.y = this.model.position.y + 2;
            }
  
            
            this.cameraTarget.x = this.model.position.x;
            this.cameraTarget.y = this.model.position.y+2;
            this.cameraTarget.z = this.model.position.z;
            this.orbitControl.target = this.cameraTarget;
  
  
            //input for the user login 
            if(!loading){
              if(userType==null){
                canvas.style.opacity="0.2";
                document.querySelector('.userTypes').style.display='flex';
  
  
              }else if(userType=='User' && inputing){
                inputing=false;
                document.querySelector('.input').style.display='block';
  
  
              }else if(userType=='New User' && inputing){
                inputing=false;
                document.querySelector('.input').style.display='block';
                var newForm = document.createElement("form");
                newForm.id = "myForm"; // Set the same ID as the original form
  
                // Add new content to the form
                newForm.innerHTML = newUserFormHTML;
                document.querySelector('.input').replaceChildren(newForm);
  
  
              }else if(userType=='Client' && inputing){
                inputing=false;
                document.querySelector('.input').style.display='block';
                var newForm = document.createElement("form");
                newForm.id = "myForm"; // Set the same ID as the original form
  
                // Add new content to the form
                newForm.innerHTML = clientUserFormHTML;
                document.querySelector('.input').replaceChildren(newForm);
              }
            }
  
            //move to receiption page
            if(!loading ){
              if((this.model.position.x>-30 && this.model.position.x<-10)&&(this.model.position.z>-130 && this.model.position.z<-105) && registerinputing){
                registerinputing=false;
                canvas.style.opacity="0.2";
                document.querySelector('.input').style.display='block';
                var newForm = document.createElement("form");
                newForm.id = "myForm"; 
  
                // Add new content to the form
                newForm.innerHTML = registerCompanyFormHTML;
                document.querySelector('.input').replaceChildren(newForm);
              }
            }
            
  
  
          }  
    return CharacterControls // Constructor function returning the definition of the class CharacterControls
  
  })();


  export {CharacterControls,loading,changeLoading, userType,updateUserType, inputing,updateInputing,updateRegisterInputing};