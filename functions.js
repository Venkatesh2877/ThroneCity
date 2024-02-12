import { scene, canvas, lobbyCharacter } from "./main";
import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";
import { TTFLoader } from "three/examples/jsm/loaders/TTFLoader";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader";
import { updateShowingDetail, updateMovement } from "./characterControls";
import axios from "axios";

var formData = new FormData();
export var list = [
  {
    companyName: "SimplyFi",
    logo: "",
    id: "company0001",
    bankName: "Bank of America",
    legalStatus: "Legal",
    shareHolderName: "Vishwa",
    roleInCompany: "CTO",
    CertificateOfRegistration: "./src/assets/Certificate of registration.pdf",
    ESTABLISHMENTCARDMempac: "./src/assets/ESTABLISHMENT CARD Mempac 2020.pdf",
    MempacLicenseCertificate:
      "./src/assets/Mempac License Certificate 2020.pdf",
    SHARECERTIFICATE: "./src/assets/SHARE CERTIFICATE.pdf",
    MempacELicenseCertificate:
      "./src/assets/Mempac -E-License certificate0.pdf",
    MOA: "/src/assets/MOA.pdf",
  },

  {
    companyName: "Google",
    logo: "",
    id: "company0002",
    bankName: "SBI",
    legalStatus: "Illegal",
    shareHolderName: "Karthick",
    roleInCompany: "Associate",
    CertificateOfRegistration: "./src/assets/Certificate of registration.pdf",
    ESTABLISHMENTCARDMempac: "./src/assets/ESTABLISHMENT CARD Mempac 2020.pdf",
    MempacLicenseCertificate:
      "./src/assets/Mempac License Certificate 2020.pdf",
    SHARECERTIFICATE: "./src/assets/SHARE CERTIFICATE.pdf",
    MempacELicenseCertificate:
      "./src/assets/Mempac -E-License certificate0.pdf",
    MOA: "/src/assets/MOA.pdf",
  },

  {
    companyName: "ITC",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/ff/ITC_Limited_Logo.svg/983px-ITC_Limited_Logo.svg.png",
    id: "company0003",
    bankName: "Bank of Baroda",
    legalStatus: "Illegal",
    shareHolderName: "Ali",
    roleInCompany: "Manager",
    CertificateOfRegistration: "./src/assets/Certificate of registration.pdf",
    ESTABLISHMENTCARDMempac: "./src/assets/ESTABLISHMENT CARD Mempac 2020.pdf",
    MempacLicenseCertificate:
      "./src/assets/Mempac License Certificate 2020.pdf",
    SHARECERTIFICATE: "./src/assets/SHARE CERTIFICATE.pdf",
    MempacELicenseCertificate:
      "./src/assets/Mempac -E-License certificate0.pdf",
    MOA: "/src/assets/MOA.pdf",
  },

  {
    companyName: "Honda",
    logo: "https://w7.pngwing.com/pngs/540/52/png-transparent-honda-logo-car-honda-integra-toyota-honda-angle-text-rectangle.png",
    id: "company0004",
    bankName: "Canada Bank",
    legalStatus: "Legal",
    shareHolderName: "Vishnu",
    roleInCompany: "CTO",
    CertificateOfRegistration: "./src/assets/Certificate of registration.pdf",
    ESTABLISHMENTCARDMempac: "./src/assets/ESTABLISHMENT CARD Mempac 2020.pdf",
    MempacLicenseCertificate:
      "./src/assets/Mempac License Certificate 2020.pdf",
    SHARECERTIFICATE: "./src/assets/SHARE CERTIFICATE.pdf",
    MempacELicenseCertificate:
      "./src/assets/Mempac -E-License certificate0.pdf",
    MOA: "/src/assets/MOA.pdf",
  },
];

var dmcc_ids = ["Dmcc-1011", "Dmcc-1012"];
var dmcc_ids = [1101, 1102];
export var newList = [];

//function to make api call to get company details;
async function getCompanyDetailAndDocument(username, dmcc_id) {
  console.log(username, dmcc_id);
  let eachList = {};

  //get the certificates hash values for each company
  let response = await fetch(
    `http://20.25.46.73:8081/api/getCertificatesUploaded?username=${username}&dmccId_certs=dmcc-${dmcc_id}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  let jsonData = await response.json();
  eachList = { ...eachList, ...jsonData.data };

  response = await fetch(
    `http://20.25.46.73:8081/api/getOnBoardingDetailsAndShareHolding?DmccId=dmcc-${
      dmcc_id + 10
    }&username=${username}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  jsonData = await response.json();
  eachList = { ...eachList, ...jsonData.result };

  return eachList;
}

//get the base64 from the hash value;
function getBase64(username, dmcc_id, hashvalue) {
  console.log(username, hashvalue, dmcc_id);
  var b64;
  axios({
    method: "get",
    url: `http://20.25.46.73:8081/api/getfile?docId=${hashvalue}&dmccId_certs=${dmcc_id}&username=${username}`,
    // url:`http://20.25.46.73:8081/api/getfile?docId=QmUCVtEKaYnRfQ1YRtXkK6wAoKtFEuvUzbpgLRBFumcqEX&dmccId_certs=Dmcc-1011&username=Venkatesh`,
  })
    .then((response) => {
      console.log(response?.data?.data?.file, "base64");
      b64 = response?.data?.data?.file;
      // var bin = atob(b64);

      // Create a new window
      var pdfWindow = window.open("", "_blank");

      // Set the content of the new window with an embedded PDF object
      pdfWindow.document.write(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>PDF Viewer</title>
        </head>
        <body>
          <object style="width: 100%; height: 842pt;" type="application/pdf" data="data:application/pdf;base64,${b64}"></object>
        </body>
        </html>
      `);
    })
    .catch((error) => {
      console.error(error);
    });
}

//post the new company details
function addNewCompany(certBody, detailBody) {
  console.log("addNewCompany", certBody, detailBody);
  axios({
    method: "post",
    url: `http://20.25.46.73:8081/api/putCertificatesUploaded`,
    body: certBody,
  })
    .then((response) => {
      console.log(response.data, "post cert");
      files = response?.data?.datas;
    })
    .catch((error) => {
      console.error(error);
    });

  //get company details for each company
  axios({
    method: "post",
    url: `http://20.25.46.73:8081/api/storeOnboardingCompanyAndShareHolding`,
    body: detailBody,
  })
    .then((response) => {
      console.log(response.data, "post detail");
      files = response?.data?.data;
    })
    .catch((error) => {
      console.error(error);
    });
}

//function to load lobby
// function loadLobby(body){
//     const loader = new GLTFLoader();
//     console.log(body);
//     // Load the 3D model
//     loader.load("./src/office_cabin.glb",  (gltf)=> {
//           gltf.scene.traverse(c=>{
//             c.castShadow=true;
//           });

//       if(body.companyId){
//         const company= list.find((each)=>each.id==body.companyId);
//         if(company){
//           gltf.scene.position.set(2700, -112, 9040);
//           gltf.scene.scale.set(30,40,40);
//           gltf.scene.rotation.y= THREE.MathUtils.degToRad(180);
//           scene.add(gltf.scene);

//           const fontLoader=new FontLoader();
//           fontLoader.load(
//             'node_modules/three/examples/fonts/droid/droid_sans_bold.typeface.json',
//             (droidFont)=>{
//               const textGeometry= new TextGeometry(company.companyName,{
//                 height:2,
//                 size:30,
//                 font:droidFont,
//               });
//               const textMaterial=new THREE.MeshBasicMaterial({color:0xa6a6a6});
//               const textMesh=new THREE.Mesh(textGeometry, textMaterial);
//               textMesh.position.set(2530,55,9900);
//               scene.add(textMesh);
//             }
//           )

//           // Image
//           const textureLoader = new THREE.TextureLoader();
//           console.log(company.logo)
//           const imageTexture = textureLoader.load(company.logo); // Set the path to your image
//           const imageMaterial = new THREE.MeshBasicMaterial({ map: imageTexture, transparent: true });
//           const imageGeometry = new THREE.PlaneGeometry(50, 50); // Adjust the size as needed
//           const imageMesh = new THREE.Mesh(imageGeometry, imageMaterial);
//           imageMesh.position.set(2500,75,9900); // Adjust the position as needed

//           scene.add(imageMesh)
//         }

//       }else if(body.userName){
//         //  Create multiple instances of the model
//         for (let i = 0  ; i < list.length; i++) {
//             const clonedModel = gltf.scene.clone();
//             clonedModel.position.set((i * 350)+2700, -112, 9040);
//             clonedModel.scale.set(30, 40, 40);
//             clonedModel.rotation.y = THREE.MathUtils.degToRad(180);
//             scene.add(clonedModel);
//             const fontLoader=new FontLoader();
//             fontLoader.load(
//               'node_modules/three/examples/fonts/droid/droid_sans_mono_regular.typeface.json',
//               (droidFont)=>{
//                 const textGeometry= new TextGeometry(list[i].companyName,{
//                   height:2,
//                   size:30,
//                   font:droidFont,
//                 });
//                 const textMaterial=new THREE.MeshBasicMaterial({color:0xa6a6a6});
//                 const textMesh=new THREE.Mesh(textGeometry, textMaterial);
//                 textMesh.position.set((i*350)+2530,55,9900);
//                 scene.add(textMesh);
//               }
//             )

//                 // Image
//             const textureLoader = new THREE.TextureLoader();
//             console.log(list[i].logo)
//             const imageTexture = textureLoader.load(list[i]?.logo); // Set the path to your image
//             const imageMaterial = new THREE.MeshBasicMaterial({ map: imageTexture, transparent: true });
//             const imageGeometry = new THREE.PlaneGeometry(50, 50); // Adjust the size as needed
//             const imageMesh = new THREE.Mesh(imageGeometry, imageMaterial);
//             imageMesh.position.set((i*350)+2500,75,9900); // Adjust the position as needed

//             scene.add(imageMesh)
//               }

//       } else if(body.task){
//         gltf.scene.position.set((350*(list.length-1))+2700, -112, 9040);
//         gltf.scene.scale.set(30,40,40);
//         gltf.scene.rotation.y= THREE.MathUtils.degToRad(180);
//         scene.add(gltf.scene);

//         const fontLoader=new FontLoader();
//         fontLoader.load(
//           'node_modules/three/examples/fonts/droid/droid_sans_bold.typeface.json',
//           (droidFont)=>{
//             const textGeometry= new TextGeometry(list[list.length-1].companyName,{
//               height:2,
//               size:30,
//               font:droidFont,
//             });
//             const textMaterial=new THREE.MeshBasicMaterial({color:0xa6a6a6});
//             const textMesh=new THREE.Mesh(textGeometry, textMaterial);
//             textMesh.position.set((350*(list.length-1))+2530,55,9900);
//             // textMesh.position.x=350;
//             // textMesh.position.z=-120;
//             scene.add(textMesh);
//           }
//         )

//             // Image
//             const textureLoader = new THREE.TextureLoader();
//             const imageTexture = textureLoader.load(list[list.length-1].logo); // Set the path to your image
//             const imageMaterial = new THREE.MeshBasicMaterial({ map: imageTexture, transparent: true });
//             const imageGeometry = new THREE.PlaneGeometry(50, 50); // Adjust the size as needed
//             const imageMesh = new THREE.Mesh(imageGeometry, imageMaterial);
//             imageMesh.position.set((350*(list.length-1))+2500,75,9900); // Adjust the position as needed

//             scene.add(imageMesh)

//       }
//     });

//   }

// new lobby

function loadLobby(body) {
  const loader = new GLTFLoader();
  console.log(body);
  // Load the 3D model
  loader.load("./src/office_cabin.glb", (gltf) => {
    gltf.scene.traverse((c) => {
      c.castShadow = true;
    });

    for (let i = 0; i < body.length; i++) {
      const clonedModel = gltf.scene.clone();
      clonedModel.position.set(i * 350 + 2700, -112, 9040);
      clonedModel.scale.set(30, 40, 40);
      clonedModel.rotation.y = THREE.MathUtils.degToRad(180);
      scene.add(clonedModel);
      const fontLoader = new FontLoader();
      fontLoader.load(
        "node_modules/three/examples/fonts/droid/droid_sans_mono_regular.typeface.json",
        (droidFont) => {
          const textGeometry = new TextGeometry(body[i].CompanyName, {
            height: 2,
            size: 30,
            font: droidFont,
          });
          const textMaterial = new THREE.MeshBasicMaterial({ color: 0xa6a6a6 });
          const textMesh = new THREE.Mesh(textGeometry, textMaterial);
          textMesh.position.set(i * 350 + 2530, 55, 9900);
          scene.add(textMesh);
        }
      );

      // Image
      // const textureLoader = new THREE.TextureLoader();
      // // console.log(list[i].logo)
      // const imageTexture = textureLoader.load(list[i]?.logo); // Set the path to your image
      // const imageMaterial = new THREE.MeshBasicMaterial({ map: imageTexture, transparent: true });
      // const imageGeometry = new THREE.PlaneGeometry(50, 50); // Adjust the size as needed
      // const imageMesh = new THREE.Mesh(imageGeometry, imageMaterial);
      // imageMesh.position.set((i*350)+2500,75,9900); // Adjust the position as needed

      // scene.add(imageMesh)
    }
  });

  // lobbyCharacter(body);
}

// Function to handle form submission
async function handleFormSubmission(event) {
  event.preventDefault(); // Prevent the default form submission
  canvas.style.opacity = "1";
  document.querySelector(".input").style.display = "none";
  updateMovement(true);
    
  if (event.target.elements.Company) {
    sessionStorage.setItem("companyId", event.target.Company.value);
    sessionStorage.removeItem("username");

    const promiseArray = [
      getCompanyDetailAndDocument(
        "Venkatesh",
        sessionStorage.getItem("companyId")
      )
        .then((eachList) => {
          newList.push(eachList);
          return eachList;
        })
        .catch((error) => {
          console.error("Error:", error);
        }),
    ];

    Promise.all(promiseArray)
      .then((results) => {
        const newList = results.filter((eachList) => eachList); // Filter out undefined results
        console.log("load lobby", newList);
        loadLobby(newList);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  } else if (event.target.elements.confirmPassword) {
    //loadLobby({userName:event.target.username, password:event.target.password, confirmPassword:event.target.confirmPassword});
    sessionStorage.removeItem("username");
    sessionStorage.removeItem("companyId");
    const body = {
      username: event.target.username.value,
    };
    const response = await fetch(
      "http://20.25.46.73:8081/api/registerenrolluserdmcc",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }
    );
    const jsonData = await response.json();
    console.log(event.target.username.value, jsonData);
    dmcc_ids = [];
  } else if (event.target.elements.companyName) {
    console.log("register company", event.target.elements);
    var newCompanyDetails = {
      username: sessionStorage.getItem("username"),
      CompanyName: event.target.elements.companyName.value,
      // DmccId: `dmcc-${event.target.elements.DmccId.value}`,
      FinancialYearOfTheComapny:
        event.target.elements.FinancialYearOfTheComapny.value,
      ProposedBankOfTheCompany:
        event.target.elements.ProposedBankOfTheCompany.value,
      ActivitiesOfTheDmccCompany:
        event.target.elements.ActivitiesOfTheDmccCompany.value,
      FacilityOfTheDmccCompany:
        event.target.elements.FacilityOfTheDmccCompany.value,
      LegalStatusOfTheCompany:
        event.target.elements.LegalStatusOfTheCompany.value,
      NameOfTheShareHolder: event.target.elements.NameOfTheShareHolder.value,
      ShareCapital: event.target.elements.ShareCapital.value,
      ShareHoldingPercentage:
        event.target.elements.ShareHoldingPercentage.value,
      SelectRoleOfTheCompany:
        event.target.elements.SelectRoleOfTheCompany.value,
      EmiratesId: event.target.elements.EmiratesId.value,
      OfficialMailAddress: event.target.elements.OfficialMailAddress.value,
      ContactNumber: event.target.elements.ContactNumber.value,
      AdditionalDetails: event.target.elements.AdditionalDetails.value,
    };

    var newCompanyDoc = {
      Incorporation: event.target.elements.Incorporation.value,
      MoaAndAoa: event.target.elements.MoaAndAoa.value,
      Incumberency: event.target.elements.Incumberency.value,
      UndertakingLetterOfShareCapital:
        event.target.elements.UndertakingLetterOfShareCapital.value,
      AuthorizationLetter: event.target.elements.AuthorizationLetter.value,
      DeclerationOfUltimateBenefitialOwners:
        event.target.elements.DeclerationOfUltimateBenefitialOwners.value,
      ValidPassportCopy: event.target.elements.ValidPassportCopy.value,
      UtilityBillForAddressProof:
        event.target.elements.UtilityBillForAddressProof.value,
      EmirateId: event.target.elements.EmirateId.value,
      BussinessProfile: event.target.elements.BussinessProfile.value,
      IncorporationOfSubsidaryInDmcc:
        event.target.elements.IncorporationOfSubsidaryInDmcc.value,
      data: {
        username: sessionStorage.getItem("username"),
        DmccId_certs: `dmcc-${event.target.elements.DmccId.value - 10}`,
        StatusIncorporation: Incorporation ? true : false,
        StatusMoaAndAoa: MoaAndAoa ? true : false,
        StatusIncumberency: Incumberency ? true : false,
        StatusUndertakingLetterOfShareCapital: UndertakingLetterOfShareCapital
          ? true
          : false,
        StatusAuthorizationLetter: AuthorizationLetter ? true : false,
        StatusDeclerationOfUltimateBenefitialOwners: false,
        StatusValidPassportCopy: false,
        StatusUtilityBillForAddressProof: false,
        StatusEmirateId: false,
        StatusBussinessProfile: false,
        StatusIncorporationOfSubsidaryInDmcc: false,
      },
    };

    // list.push(newCompany);
    newList.push({ ...newCompanyDetails, ...newCompanyDoc });

    console.log(newList);

    // const response = await fetch(`http://20.25.46.73:8081/api/putCertificatesUploaded`, {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(body),
    // });
    // const jsonData= await response.json();
    // console.log(event.target.Company.value, jsonData);
    // loadLobby({task:"newCompany"})
    loadLobby(newList);
  } else {
    sessionStorage.setItem("username", event.target.username.value);
    sessionStorage.removeItem("companyId");

    const promiseArray = dmcc_ids.map((e) => {
      return Promise.resolve()
        .then(() =>
          getCompanyDetailAndDocument(sessionStorage.getItem("username"), e)
        )
        .then((eachList) => {
          newList.push(eachList);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    });

    Promise.all(promiseArray)
      .then(() => {
        console.log("load lobby", newList);
        loadLobby(newList);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }
}

var companyListElement = document.getElementById("displayCompanyDetail");

const handleCancel = () => {
  console.log("clicked");
  canvas.style.opacity = 1;
  companyListElement.innerHTML = "";
  updateShowingDetail();
  updateMovement(true);
};

//display each company detail
function displayDetail(list) {
  // Populate the company list
  console.log(list);
  canvas.style.opacity = 0.2;
  companyListElement.innerHTML = `
    <div class="title" style="margin-bottom:20px">
      <span style="padding: 5px;">Rak</span>
      <span style="height: 60px;"><img src="/src/res/rakdao.gif" alt="logo" width="50px" height="80px" style="padding: 0px;"></span>
      <span style="padding: 5px;">Dao</span>
    </div>

    <div style="display:flex;justify-content: space-between;width:80vw;margin:auto">
      <div>
        <div class="displayHeader">Company Details</div>        
        <div class="eachDetail">Company Name: <span class="eachDetailAnswer">${
          list.CompanyName || "nill"
        }</span></div>
        <div class="eachDetail">DmccId Id:  <span class="eachDetailAnswer"> ${
          list.DmccId || "nill"
        } </span></div>
        <div class="eachDetail">Financial Year Of The Company:  <span class="eachDetailAnswer"> ${
          list.FinancialYearOfTheComapny || "nill"
        }</span></div>
        <div class="eachDetail">Proposed Bank Of The Company:  <span class="eachDetailAnswer"> ${
          list.ProposedBankOfTheCompany || "nill"
        }</span></div>
        <div class="eachDetail">Activities Of The Dmcc Company:  <span class="eachDetailAnswer"> ${
          list.ActivitiesOfTheDmccCompany || "nill"
        }</span></div>
        <div class="eachDetail">Facility Of The Dmcc Company:  <span class="eachDetailAnswer"> ${
          list.FacilityOfTheDmccCompany || "nill"
        }</span></div>
        <div class="eachDetail">Legal Status Of The Company:  <span class="eachDetailAnswer"> ${
          list.LegalStatusOfTheCompany || "nill"
        }</span></div>
        <div class="eachDetail">Share Capital:  <span class="eachDetailAnswer"> ${
          list.ShareCapital || "nill"
        }</span></div>
        <div class="eachDetail">Name Of The ShareHolder:  <span class="eachDetailAnswer"> ${
          list.NameOfTheShareHolder || "nill"
        }</span></div>
        <div class="eachDetail">Select Role Of The Company:  <span class="eachDetailAnswer"> ${
          list.SelectRoleOfTheCompany || "nill"
        }</span></div>
        <div class="eachDetail">Emirates Id:  <span class="eachDetailAnswer"> ${
          list.EmiratesId || "nill"
        }</span></div>
        <div class="eachDetail"> Share Holding Percentage:  <span class="eachDetailAnswer"> ${
          list.ShareHoldingPercentage || "nill"
        }</span></div>
        <div class="eachDetail">Official Mail Address:  <span class="eachDetailAnswer"> ${
          list.OfficialMailAddress || "nill"
        }</span></div>
        <div class="eachDetail">Contact Number:  <span class="eachDetailAnswer"> ${
          list.ContactNumber || "nill"
        }</span></div>
        <div class="eachDetail">Additional Details:  <span class="eachDetailAnswer"> ${
          list.AdditionalDetails || "nill"
        }</span></div>
      </div>

      <div>
      <div class="displayHeader">Certificates</div>
        ${
          list.StatusIncorporation
            ? `<div class="docLink" hashValue=${list.Incorporation} dmcc_id=${
                list.DmccId_certs ?? list.DmccId
              }>Incorporation</div>`
            : ""
        }
        ${
          list.StatusMoaAndAoa
            ? `<div class="docLink" hashValue=${list.MoaAndAoa} dmcc_id=${
                list.DmccId_certs ?? list.DmccId
              }>MoaAndAoa</div>`
            : ""
        }
        ${
          list.StatusIncumberency
            ? `<div class="docLink" hashValue=${list.Incumberency} dmcc_id=${
                list.DmccId_certs ?? list.DmccId
              }>Incumberency</div>`
            : ""
        }
        ${
          list.StatusUndertakingLetterOfShareCapital
            ? `<div class="docLink" hashValue=${
                list.UndertakingLetterOfShareCapital
              } dmcc_id=${
                list.DmccId_certs ?? list.DmccId
              }>UndertakingLetterOfShareCapital</div>`
            : ""
        }
        ${
          list.StatusAuthorizationLetter
            ? `<div class="docLink" hashValue=${
                list.AuthorizationLetter
              } dmcc_id=${
                list.DmccId_certs ?? list.DmccId
              }>AuthorizationLetter</div>`
            : ""
        }

        ${
          list.StatusDeclerationOfUltimateBenefitialOwners
            ? `<div class="docLink" hashValue=${
                list.DeclerationOfUltimateBenefitialOwners
              } dmcc_id=${
                list.DmccId_certs ?? list.DmccId
              }>DeclerationOfUlti mateBenefitialOwners</div>`
            : ""
        }
        ${
          list.StatusValidPassportCopy
            ? `<div class="docLink" hashValue=${
                list.ValidPassportCopy
              } dmcc_id=${
                list.DmccId_certs ?? list.DmccId
              }>ValidPassportCopy</div>`
            : ""
        }
        ${
          list.StatusUtilityBillForAddressProof
            ? `<div class="docLink" hashValue=${
                list.UtilityBillForAddressProof
              } dmcc_id=${
                list.DmccId_certs ?? list.DmccId
              }>UtilityBillForAddressProof</div>`
            : ""
        }
        ${
          list.StatusEmirateId
            ? `<div class="docLink" hashValue=${list.EmirateId} dmcc_id=${
                list.DmccId_certs ?? list.DmccId
              }>EmirateId</div>`
            : ""
        }
        ${
          list.StatusBussinessProfile
            ? `<div class="docLink" hashValue=${
                list.BussinessProfile
              } dmcc_id=${
                list.DmccId_certs ?? list.DmccId
              }>BussinessProfile</div>`
            : ""
        }
        ${
          list.StatusIncorporationOfSubsidaryInDmcc
            ? `<div class="docLink" hashValue=${
                list.IncorporationOfSubsidaryInDmcc
              } dmcc_id=${
                list.DmccId_certs ?? list.DmccId
              }>IncorporationOfSubsidaryInDmcc</div>`
            : ""
        }
      </div>
    </div>
    
  `;

  // Create a button element
  var button = document.createElement("button");
  button.textContent = "Cancel";
  button.classList = "btn btn-danger";
  button.style.margin = "60px 0px 0px 1750px";

  button.onclick = handleCancel;

  // Append the button to the div
  companyListElement.appendChild(button);

  //on the click on the pdf files
  const links = document.querySelectorAll(".docLink");

  links.forEach((link) => {
    link.addEventListener("click", function (e) {
      console.log(
        "Link clicked!",
        e.target.getAttribute("hashValue"),
        e.target.getAttribute("dmcc_id")
      );
      getBase64(
        sessionStorage.getItem("username"),
        e.target.getAttribute("dmcc_id"),
        e.target.getAttribute("hashValue")
      );
    });
  });
}

export { handleFormSubmission, displayDetail };
