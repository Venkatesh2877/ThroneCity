import { scene, canvas } from "./main";
import * as THREE from "three";
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import {TextGeometry} from 'three/examples/jsm/geometries/TextGeometry';
import {TTFLoader} from 'three/examples/jsm/loaders/TTFLoader';
import {FontLoader} from 'three/examples/jsm/loaders/FontLoader';
import { updateShowingDetail } from "./characterControls";


var formData = new FormData();
export var list=[{companyName:"Company1", id:"company0001", bankName:"Bank of America",legalStatus:"Legal",shareHolderName:"Venkatesh", roleInCompany:"Associate", passport:"./src/assets/dummy.pdf", emirateID:"./src/assets/dummy.pdf", bankStatement:"./src/assets/dummy.pdf"},
{companyName:"Company2", id:"company0002", bankName:"SBI",legalStatus:"Illegal",shareHolderName:"Karthick", roleInCompany:"Associate", passport:"./src/assets/dummy.pdf", emirateID:"./src/assets/dummy.pdf", bankStatement:"./src/assets/dummy.pdf"},
{companyName:"Company3", id:"company0003", bankName:"Bank of Baroda",legalStatus:"Illegal",shareHolderName:"Ali", roleInCompany:"Manager", passport:"./src/assets/dummy.pdf", emirateID:"./src/assets/dummy.pdf", bankStatement:"./src/assets/dummy.pdf"},
{companyName:"Company4", id:"company0004", bankName:"Canada Bank",legalStatus:"Legal",shareHolderName:"Vishnu", roleInCompany:"CTO", passport:"./src/assets/dummy.pdf", emirateID:"./src/assets/dummy.pdf", bankStatement:"./src/assets/dummy.pdf"}]



function loadLobby(body){
    const loader = new GLTFLoader();
    console.log(body);
    // Load the 3D model
    loader.load("./src/office_cabin.glb",  (gltf)=> {
          gltf.scene.traverse(c=>{  
            c.castShadow=true;
          });

      if(body.companyId){
        const company= list.find((each)=>each.id==body.companyId);
        if(company){
          gltf.scene.position.set(2700, -112, 9040);
          gltf.scene.scale.set(30,40,40);
          gltf.scene.rotation.y= THREE.MathUtils.degToRad(180);
          scene.add(gltf.scene);

          const fontLoader=new FontLoader();
          fontLoader.load(
            'node_modules/three/examples/fonts/droid/droid_sans_bold.typeface.json',
            (droidFont)=>{
              const textGeometry= new TextGeometry(company.companyName,{
                height:2,
                size:30,
                font:droidFont,
              });
              const textMaterial=new THREE.MeshNormalMaterial();
              const textMesh=new THREE.Mesh(textGeometry, textMaterial);
              textMesh.position.set(2500,55,9900);
              // textMesh.position.x=350;
              // textMesh.position.z=-120;
              scene.add(textMesh);
            }
          )
        }
               

      }else if(body.userName){
        //  Create multiple instances of the model
        for (let i = 0  ; i < list.length; i++) {        
            const clonedModel = gltf.scene.clone();
            clonedModel.position.set((i * 350)+2700, -112, 9040);
            clonedModel.scale.set(30, 40, 40);
            clonedModel.rotation.y = THREE.MathUtils.degToRad(180);
            scene.add(clonedModel);
            const fontLoader=new FontLoader();
            fontLoader.load(
              'node_modules/three/examples/fonts/droid/droid_sans_mono_regular.typeface.json',
              (droidFont)=>{
                const textGeometry= new TextGeometry(list[i].companyName,{
                  height:2,
                  size:30,
                  font:droidFont,
                });
                const textMaterial=new THREE.MeshNormalMaterial();
                const textMesh=new THREE.Mesh(textGeometry, textMaterial);
                textMesh.position.set((i*350)+2500,55,9900);
                scene.add(textMesh);
              }
            ) 
        }
      } else if(body.task){
        gltf.scene.position.set((350*(list.length-1))+2700, -112, 9040);
        gltf.scene.scale.set(30,40,40);
        gltf.scene.rotation.y= THREE.MathUtils.degToRad(180);
        scene.add(gltf.scene);
        

        const fontLoader=new FontLoader();
        fontLoader.load(
          'node_modules/three/examples/fonts/droid/droid_sans_bold.typeface.json',
          (droidFont)=>{
            const textGeometry= new TextGeometry(list[list.length-1].companyName,{
              height:2,
              size:30,
              font:droidFont,
            });
            const textMaterial=new THREE.MeshNormalMaterial();
            const textMesh=new THREE.Mesh(textGeometry, textMaterial);
            textMesh.position.set((350*(list.length-1))+2500,55,9900);
            // textMesh.position.x=350;
            // textMesh.position.z=-120;
            scene.add(textMesh);
          }
        )       
      }    
    });
  
  }

  // Function to handle form submission
function handleFormSubmission(event) {
    event.preventDefault(); // Prevent the default form submission
    canvas.style.opacity = "1";
    document.querySelector('.input').style.display = "none";

    if(event.target.elements.Company){
      loadLobby({companyId:event.target.Company.value});
      console.log("company");
      sessionStorage.setItem("companyId", event.target.Company.value);
      sessionStorage.removeItem('username');

    }else if(event.target.elements.confirmPassword){
      //loadLobby({userName:event.target.username, password:event.target.password, confirmPassword:event.target.confirmPassword});
      console.log("new user",list);
      sessionStorage.removeItem('username');
      sessionStorage.removeItem('companyId');
      list=[];
      
    }else if(event.target.elements.companyName){
      console.log("register company");
      list.push({
        companyName:event.target.elements.companyName.value, id:event.target.elements.id.value, bankName:event.target.elements.bankName.value,
        legalStatus:event.target.elements.legalStatus.value, shareHolderName:event.target.elements.shareHolderName.value, 
        roleInCompany:event.target.elements.roleInCompany.value, passport:event.target.elements.passport.value, 
        emirateID:event.target.elements.emirateID.value, bankStatement:event.target.elements.bankStatement.value,
      });
      console.log(list);
      loadLobby({task:"newCompany"})

    }else{
      loadLobby({userName:event.target.username.value, password:event.target.password.value});
      console.log("old user");
      sessionStorage.setItem("username", event.target.username.value);
      sessionStorage.removeItem('companyId');
    }
}

var companyListElement = document.getElementById('displayCompanyDetail');

const handleCancel=()=>{
  console.log("clicked")
  canvas.style.opacity=1;
  companyListElement.innerHTML="";
  updateShowingDetail();
}


//display each company detail
function displayDetail(list){
  // Populate the company list

    canvas.style.opacity=0.2;
    companyListElement.innerHTML=`
    <h1>Company Name: ${list.companyName}</h1>
    <h2>Company Id: ${list.id}</h2>
    <h2>Bank Name: ${list.bankName}</h2>
    <h2>Legal Status: ${list.legalStatus}</h2>
    <h2>Share Holder Name: ${list.shareHolderName}</h2>
    <h2>Role In Company: ${list.roleInCompany}</h2>
    <div class="docLink"><a href="${list.passport}" target="_blank">Passport</a></div>
    <div class="docLink"><a href="${list.emirateID}" target="_blank">Emirate ID</a></div>
    <div class="docLink"><a href="${list.bankStatement}" target="_blank">Bank Statement</a></div>
  `;
  
   // Create a button element
   var button = document.createElement("button");
   button.textContent = "Cancel";

   button.onclick = handleCancel;

   // Append the button to the div
   companyListElement.appendChild(button);

}

export {handleFormSubmission, displayDetail};