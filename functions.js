import { scene, canvas } from "./main";
import * as THREE from "three";
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
// import { FontLoader } from 'three/addons/loaders/FontLoader.js';
// import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';
import {TextGeometry} from 'three/examples/jsm/geometries/TextGeometry';
import {TTFLoader} from 'three/examples/jsm/loaders/TTFLoader';
import {FontLoader} from 'three/examples/jsm/loaders/FontLoader';


var count=0;
var formData = new FormData();
var list=[{companyName:"Company1", id:"company0001", bankName:"Bank of America",legalStatus:"Legal",shareHolderName:"Venkatesh", roleInCompany:"Associate", passport:"", emirateID:"", bankStatement:""},
{companyName:"Company2", id:"company0002", bankName:"SBI",legalStatus:"Illegal",shareHolderName:"Karthick", roleInCompany:"Associate", passport:"", emirateID:"", bankStatement:""},
{companyName:"Company3", id:"company0003", bankName:"Bank of Baroda",legalStatus:"Illegal",shareHolderName:"Ali", roleInCompany:"Manager", passport:"", emirateID:"", bankStatement:""},
{companyName:"Company4", id:"company0004", bankName:"Canada Bank",legalStatus:"Legal",shareHolderName:"Vishnu", roleInCompany:"CTO", passport:"", emirateID:"", bankStatement:""}]



function loadLobby(body){
    const loader = new GLTFLoader();
    console.log(body);
    // Load the 3D model
    loader.load("./src/mersus_office.glb",  (gltf)=> {
          gltf.scene.traverse(c=>{  
            c.castShadow=true;
          });

      if(body.companyId){
        const company= list.find((each)=>each.id==body.companyId);
        gltf.scene.position.set(200, 0, -240);
        gltf.scene.scale.set(10,10,10);
        gltf.scene.rotation.y= THREE.MathUtils.degToRad(-80);
        scene.add(gltf.scene);
        

        const fontLoader=new FontLoader();
        fontLoader.load(
          'node_modules/three/examples/fonts/droid/droid_sans_bold.typeface.json',
          (droidFont)=>{
            const textGeometry= new TextGeometry(company.companyName,{
              height:2,
              size:5,
              font:droidFont,
            });
            const textMaterial=new THREE.MeshNormalMaterial();
            const textMesh=new THREE.Mesh(textGeometry, textMaterial);
            textMesh.position.set(200,35,-180);
            // textMesh.position.x=350;
            // textMesh.position.z=-120;
            scene.add(textMesh);
          }
        )       

      }else if(body.userName){
        //  Create multiple instances of the model
        for (let i = 1  ; i <= list.length; i++) {        
            const clonedModel = gltf.scene.clone();
            clonedModel.position.set(i * 200, 0, -240);
            clonedModel.scale.set(10, 10, 10);
            clonedModel.rotation.y = THREE.MathUtils.degToRad(-80);
            scene.add(clonedModel);

            console.log(list[i-1])
            const fontLoader=new FontLoader();
            fontLoader.load(
              'node_modules/three/examples/fonts/droid/droid_sans_mono_regular.typeface.json',
              (droidFont)=>{
                const textGeometry= new TextGeometry(list[i-1].companyName,{
                  height:2,
                  size:5,
                  font:droidFont,
                });
                const textMaterial=new THREE.MeshNormalMaterial();
                const textMesh=new THREE.Mesh(textGeometry, textMaterial);
                textMesh.position.set((i*200),35,-180);
                // textMesh.position.x=350;
                // textMesh.position.z=-120;
                scene.add(textMesh);
              }
            ) 
        }
      } else if(body.task){
        gltf.scene.position.set(200*list.length, 0, -240);
        gltf.scene.scale.set(10,10,10);
        gltf.scene.rotation.y= THREE.MathUtils.degToRad(-80);
        scene.add(gltf.scene);
        

        const fontLoader=new FontLoader();
        fontLoader.load(
          'node_modules/three/examples/fonts/droid/droid_sans_bold.typeface.json',
          (droidFont)=>{
            const textGeometry= new TextGeometry(list[list.length-1].companyName,{
              height:2,
              size:5,
              font:droidFont,
            });
            const textMaterial=new THREE.MeshNormalMaterial();
            const textMesh=new THREE.Mesh(textGeometry, textMaterial);
            textMesh.position.set(200*list.length,35,-180);
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
      count=1;
      loadLobby({companyId:event.target.Company.value});
      console.log("company");
    }else if(event.target.elements.confirmPassword){
      count=0;
      //loadLobby({userName:event.target.username, password:event.target.password, confirmPassword:event.target.confirmPassword});
      console.log("new user");
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
      count=4;
      loadLobby({userName:event.target.username, password:event.target.password});
      console.log("old user");

    }
}

export {handleFormSubmission};