import * as THREE from "three";
import {newUserFormHTML, clientUserFormHTML, registerCompanyFormHTML} from './inputForm.js';
import { canvas,scene } from "./main.js";
import { list,displayDetail, newList} from "./functions.js";

const DIRECTIONS = ['w', 'a', 's', 'd'];
var loading= true,right=true, left=true, faceXPos=false, faceXNeg=true, faceZPos=false, faceZNeg=false;

const changeLoading=(value)=>{
    loading=value;
}

var userType=null, inputing=false, showingDetail=true, moveCharacter=false;

const updateUserType=(value)=>{
    userType=value;
}

const updateInputing=(value)=>{
    inputing=value;
}


const updateShowingDetail=()=>{
  showingDetail=!showingDetail;
}

const updateMovement=(value)=>{
  moveCharacter=value;
}


const handleCancel=()=>{
  updateMovement(true);
  canvas.style.opacity=1;
  document.querySelector('.input').style.display='none';
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
        this.walkVelocity = 250
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
         
           if( directionPressed && moveCharacter)
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
            // console.log(this.model.position.x, this.model.position.z);
            if(moveCharacter){
              if(keysPressed['w']){
              
                if(faceXNeg){
                  this.model.position.z-=moveZ;
                }else if(faceXPos){
                  this.model.position.z+=moveZ;
                }else if(faceZNeg){
                  this.model.position.x+=moveX;
                }else{
                  this.model.position.x-=moveX;
                }
                left=true;
                right=true;
              }else if(keysPressed['s']){
                if(faceXNeg){
                  this.model.position.z+=moveZ;
                }else if(faceXPos){
                  this.model.position.z-=moveZ;
                }else if(faceZNeg){
                  this.model.position.x-=moveX;
                }else{
                  this.model.position.x+=moveX;
                }
                left=true;
                right=true;
              }else if(keysPressed['a']){
                
                if(left){
  
                  if(faceXNeg){
                    faceXNeg=false;
                    faceZPos=true;
                  }else if(faceZPos){
                    faceZPos=false;
                    faceXPos=true;
                  }else if(faceXPos){
                    faceXPos=false;
                    faceZNeg=true;
                  }else{
                    faceZNeg=false;
                    faceXNeg=true;
                  }
  
  
                  this.model.rotateY(+Math.PI / 2);
                  const distance = 10; // Adjust the distance from the model
                  const angle = this.model.rotation.y;
                  const offsetX = Math.sin(angle) * distance;
                  const offsetZ = Math.cos(angle) * distance;
      
                  // this.camera.position.x = this.model.position.x + offsetX;
                  // this.camera.position.z = this.model.position.z + offsetZ;
                  // this.camera.position.y = this.model.position.y + 2;
                  left=false;
                }
              }else if(keysPressed['d']){
                
                if(right){
  
                  if(faceXNeg){
                    faceXNeg=false;
                    faceZNeg=true;
                  }else if(faceZNeg){
                    faceZNeg=false;
                    faceXPos=true;
                  }else if(faceXPos){
                    faceXPos=false;
                    faceZPos=true;
                  }else{
                    faceZPos=false;
                    faceXNeg=true;
                  }
  
  
                this.model.rotateY(-Math.PI / 2);
                const distance = 10; // Adjust the distance from the model
                const angle = this.model.rotation.y;
                const offsetX = Math.sin(angle) * distance;
                const offsetZ = Math.cos(angle) * distance;
    
                // this.camera.position.x = this.model.position.x + offsetX;
                // this.camera.position.z = this.model.position.z + offsetZ;
                // this.camera.position.y = this.model.position.y + 2;
                right=false;
                }
              }
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
                var reception = scene.getObjectByName("reception");
                // var receptionText = scene.getObjectByName("receptionText");
                scene.remove(reception);
                const receptionObjects = scene.children.filter((obj) => obj.name === "receptionText");

                // Remove each object from the scene
                receptionObjects.forEach((obj) => {
                    scene.remove(obj);
                });
                // scene.remove(receptionText);
                console.log(scene);
                // console.log(selectedObject);
                inputing=false;
                document.querySelector('.input').style.display='block';
                var newForm = document.createElement("form");
                newForm.id = "myForm"; // Set the same ID as the original form
  
                // Add new content to the form
                newForm.innerHTML = clientUserFormHTML;
                document.querySelector('.input').replaceChildren(newForm);
              }
            }
  
            //move to reception page
            if(!loading && !sessionStorage.getItem('companyId') ){
              if((this.model.position.x>4100 && this.model.position.x<4150)&&(this.model.position.z>10600 && this.model.position.z<10700) ){
                updateMovement(false);
                canvas.style.opacity="0.2";
                document.querySelector('.input').style.display='block';
                var newForm = document.createElement("form");
                newForm.id = "myForm"; 
  
                // Add new content to the form
                newForm.innerHTML = registerCompanyFormHTML;
                document.querySelector('.input').replaceChildren(newForm);
                
                  // Create a button element
                var button = document.createElement("div");
                button.innerHTML = "Cancel";

                button.onclick = handleCancel;

                // Append the button to the div
                document.getElementById('myForm').appendChild(button);
                this.model.position.x-=10;
              }
            }
            
            //when moved into company building
            if(!loading){
              if(sessionStorage.getItem('companyId')){
                if((this.model.position.x>2600 && this.model.position.x<2700)&&(this.model.position.z>9650 && this.model.position.z<9700) && showingDetail){
                  updateMovement(false);
                  displayDetail(newList[0]);
                  showingDetail=false;
                  this.model.position.z+=55;
                }
              }else{
                const length=newList.length;
              // const length=4;
                for(var i=0;i<length;i++){
                  if((this.model.position.x>(i * 350)+2600 && this.model.position.x<(i * 350)+2700 )&&(this.model.position.z>9650 && this.model.position.z<9700) && showingDetail){
                    updateMovement(false);
                    displayDetail(newList[Math.floor((this.model.position.x-2600)/350)]);
                    showingDetail=false;
                    this.model.position.z+=55;
                }
              }
            }
          }

        }  
    return CharacterControls // Constructor function returning the definition of the class CharacterControls
  
  })();


  export {CharacterControls,loading,changeLoading, userType,updateUserType, inputing,updateInputing, updateShowingDetail,updateMovement};