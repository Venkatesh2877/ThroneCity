import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader";
import { updateMovement, updateShowingDetail } from "./characterControls";
import { canvas, scene, lobbyCharacter } from "./main";

export var list = [
  {
    CompanyName: "SimplyFi",
    logo: "",
    DmccId: "company0001",
    FinancialYearOfTheComapny:"2024",
    ProposedBankOfTheCompany: "Bank of America",
    ActivitiesOfTheDmccCompany:"Tech",
    LegalStatusOfTheCompany: "Legal",
    FacilityOfTheDmccCompany:'Bangalore',
    ShareCapital: 100000,
    NameOfTheShareHolder: "Vishwa",
    SelectRoleOfTheCompany: "CTO",
    EmiratesId:'DC20',
    ShareHoldingPercentage:"20%",
    Incorporation: "./src/assets/Certificate of registration.pdf",
    Incumberency: "./src/assets/ESTABLISHMENT CARD Mempac 2020.pdf",
    StatusUndertakingLetterOfShareCapital:
      "./src/assets/Mempac License Certificate 2020.pdf",
      StatusIncorporationOfSubsidaryInDmcc: "./src/assets/SHARE CERTIFICATE.pdf",
      StatusBussinessProfile:
      "./src/assets/Mempac -E-License certificate0.pdf",
      MoaAndAoa: "/src/assets/MOA.pdf",
  },

  {
    CompanyName: "Google",
    logo: "",
    DmccId: "company0002",
    FinancialYearOfTheComapny:"2024",
    ProposedBankOfTheCompany: "SBI",
    ActivitiesOfTheDmccCompany:"Tech",
    LegalStatusOfTheCompany: "Legal",
    FacilityOfTheDmccCompany:"Bangalore",
    ShareCapital: 100000,
    NameOfTheShareHolder: "Karthick",
    SelectRoleOfTheCompany: "Associate",
    EmiratesId:"DC21",
    ShareHoldingPercentage:"20%",
    Incorporation: "./src/assets/Certificate of registration.pdf",
    Incumberency: "./src/assets/ESTABLISHMENT CARD Mempac 2020.pdf",
    StatusUndertakingLetterOfShareCapital:
      "./src/assets/Mempac License Certificate 2020.pdf",
      StatusIncorporationOfSubsidaryInDmcc: "./src/assets/SHARE CERTIFICATE.pdf",
      StatusBussinessProfile:
      "./src/assets/Mempac -E-License certificate0.pdf",
      MoaAndAoa: "/src/assets/MOA.pdf",
  },
];

var dmcc_ids = ["Dmcc-1011"];

export var newList = [];

//function to make api call to get company details;
async function getCompanyDetailAndDocument(username, password) {
  console.log(username, password);
  let eachList = {};
  let companies=[];

  //get the certificates hash values for each company
  let response = await fetch(
    `http://20.174.2.234:8084/api/login`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({username, password})
    }
  );
  console.log(response);
  let jsonData = await response.json();
  localStorage.setItem('username',jsonData?.data?.username);
  localStorage.setItem('userId', jsonData?.data?._id);
  localStorage.setItem('email',jsonData?.data?.email);
  localStorage.setItem('coded_password',jsonData?.data?.coded_password);
  localStorage.setItem('access_token',jsonData?.access_token);
  
 


  response = await fetch(
    `http://20.174.2.234:8084/api/${localStorage.getItem('userId')}/get_all_added_companies`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization:"Bearer "+localStorage.getItem('access_token'),
      },
    }
  );
  jsonData = await response.json();
  console.log(jsonData);
  jsonData?.data?.forEach((element) => {
    console.log(element)
    companies.push(element);
  })

  companies.map(async (element) => {
    response = await fetch(
      `http://20.174.2.234:8084/api/${localStorage.getItem('userId')}/company_documents/${element?._id}`,
      
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization:"Bearer "+localStorage.getItem('access_token'),
        },
      })
      jsonData = await response.json();
      element.documents=jsonData?.data
  })

  console.log(companies);
  // eachList = { ...eachList, ...jsonData.result };

  return companies;
}

//get the base64 from the hash value;
function getBase64( hashValue) {
  console.log( hashValue);
  const url = `https://gateway.pinata.cloud/ipfs/${hashValue}`;
  window.open(url, '_blank');
}


//load lobby
function loadLobby(body) {
  const loader = new GLTFLoader();
  console.log(body);
  // Load the 3D model
  loader.load("./src/office_cabin.glb", (gltf) => {
  // loader.load("./src/human_working.glb", (gltf) => {
    gltf.scene.traverse((c) => {
      c.castShadow = true;
    });

    for (let i = 0; i < body.length; i++) {
      console.log("lobby",i);
      const clonedModel = gltf.scene.clone();
      clonedModel.position.set(i * 350 + 2700, -112, 9040);
      // clonedModel.position.set(i * 350 + 2700, -112, 12600);
      clonedModel.scale.set(30, 40, 40);
      // clonedModel.scale.set(10, 10, 10);
      clonedModel.rotation.y = THREE.MathUtils.degToRad(180);
      scene.add(clonedModel);
      const fontLoader = new FontLoader();
      fontLoader.load(
        "node_modules/three/examples/fonts/droid/droid_sans_mono_regular.typeface.json",
        (droidFont) => {
          // const textGeometry = new TextGeometry(body[i].CompanyName, {
          const textGeometry = new TextGeometry(body[i].company_name, {
            height: 2,
            size: 30,
            font: droidFont,
          });
          const textMaterial = new THREE.MeshBasicMaterial({ color: 0xa6a6a6 });
          const textMesh = new THREE.Mesh(textGeometry, textMaterial);
          // textMesh.position.set(i * 350 + 2530, 55, 9900);
          textMesh.position.set(i * 350 + 2530, 95, 9560);
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

  if (event.target.elements.Company) {   //find company
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
  } else if (event.target.elements.email) {  //signup new user
    sessionStorage.removeItem("username");
    sessionStorage.removeItem("companyId");
    const body = {
      username: event.target.username.value,
      password:event.target.password.value,
      email:event.target.email.value
    };
    const response = await fetch(
      "http://20.174.2.234:8084/api/signUp",
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
    newList=[];
    getCompanyDetailAndDocument(event.target.username.value, event.target.password.value)
  } else if (event.target.elements.company_name) {// onboard a new company
    // console.log(event)
    // console.log("register company", event.target[14].files[0]);
    // console.log("register company", event.target.elements?.shareHolder_name?.value);

    const onBoard={
          company_bank:event.target?.elements?.company_bank?.value ,
          company_legal_status: event.target?.elements?.company_legal_status?.value,
          company_name: event.target?.elements?.company_name?.value,
          company_registration_date:event.target?.elements?.company_registration_date?.value,
          dt_company_activity:event.target?.elements?.dt_company_activity?.value,
          dt_company_facility:event.target?.elements?.dt_company_facility?.value,
          share_capital:event.target?.elements?.share_capital?.value,
    }

    let response = await fetch(`http://20.174.2.234:8084/api/onboard_company/${localStorage.getItem('userId')}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization":"Bearer "+localStorage.getItem('access_token'),

      },
      body: JSON.stringify(onBoard),
    });
    let jsonData= await response.json();
    console.log(jsonData);
    // var newData={...jsonData?.data};



    let formData = new FormData();

      formData.append('shareHolder_name', event.target?.elements?.shareHolder_name?.value);
      formData.append('role_in_company', event.target?.elements?.role_in_company?.value);
      formData.append('emirates_id',event.target?.elements?.emirates_id?.value);
      formData.append('share_holding', event.target?.elements?.share_holding?.value);
      formData.append('mail_address', event.target?.elements?.mail_address?.value);
      formData.append('contact_number', event.target?.elements?.contact_number?.value);
      formData.append('additional_details', event.target?.elements?.additional_details?.value);

      // Append files to FormData
      formData.append('ValidPassportCopy', event.target[14].files[0]??'');
      formData.append('EmirateId', event.target[16].files[0] ?? '');
      formData.append('NOC',  '');
      formData.append('UtilityBillForAddressProof', event.target[15].files[0] ?? '');
      formData.append('BussinessProfile', event.target[17].files[0] ?? '');
      formData.append('SpecimenSignature',  '');
      formData.append('ShareHolderResolution', '');
      formData.append('BankStatement', '');
      formData.append('DeclarationFromLebanese', '');

      console.log(formData);

    response = await fetch(`http://20.174.2.234:8084/api/${localStorage.getItem('userId')}/save_shareHolder_info/${jsonData?.data?._id}`, {
      method: "POST",
      headers: {
        // "Content-Type": "application/json",
        "Authorization":"Bearer "+localStorage.getItem('access_token'),
      },
      body:formData,
    });
    const jsonData2= await response.json();
    console.log(jsonData2);

    const companyDoc= new FormData();
    
    companyDoc.append('Incorporation',event.target[18].files[0] ??'');
    companyDoc.append('MoaAndAoa',event.target[19].files[0] ??'');
    companyDoc.append('Incumberency', event.target[20].files[0] ??'');
    companyDoc.append('IncorporationOfSubsidaryInDmcc',event.target[21].files[0] ??'');
    companyDoc.append('UndertakingLetterOfShareCapital',event.target[22].files[0] ??'');
    companyDoc.append('ManagementConsultancy',event.target[23].files[0] ??'');
    companyDoc.append('DeclerationOfUltimateBenefitialOwners',event.target[24].files[0] ??'');
    companyDoc.append('AuthorizationLetter',event.target[25].files[0] ??'');
    companyDoc.append('BusinessPlan',event.target[26].files[0] ??'');
    

    response = await fetch(`http://20.174.2.234:8084/api/${localStorage.getItem('userId')}/upload_company_documents/${jsonData?.data?._id}`, {
      method: "POST",
      headers: {
        "Authorization":"Bearer "+localStorage.getItem('access_token'),
      },
      body: companyDoc,
    });
    const jsonData3= await response.json();
    console.log(jsonData3);
    var newData={...jsonData?.data, 'documents':[
      {doc_name:'ValidPassportCopy',hash:jsonData2?.data?.ValidPassportCopy},
      {doc_name:'EmirateId',hash:jsonData2?.data?.EmirateId},
      {doc_name:'UtilityBillForAddressProof',hash:jsonData2?.data?.UtilityBillForAddressProof},
      {doc_name:'BussinessProfile',hash:jsonData2?.data?.BussinessProfile},
      {doc_name:'Incorporation',hash:jsonData3?.data?.Incorporation},
      {doc_name:'MoaAndAoa',hash:jsonData3?.data?.MoaAndAoa},
      {doc_name:'Incumberency',hash:jsonData3?.data?.Incumberency},
      {doc_name:'IncorporationOfSubsidaryInDmcc',hash:jsonData3?.data?.IncorporationOfSubsidaryInDmcc},
      {doc_name:'ManagementConsultancy',hash:jsonData3?.data?.ManagementConsultancy},
      {doc_name:'DeclerationOfUltimateBenefitialOwners',hash:jsonData3?.data?.DeclerationOfUltimateBenefitialOwners},
      {doc_name:'UndertakingLetterOfShareCapital',hash:jsonData3?.data?.UndertakingLetterOfShareCapital},
      {doc_name:'AuthorizationLetter',hash:jsonData3?.data?.AuthorizationLetter},
      {doc_name:'BusinessPlan',hash:jsonData3?.data?.BusinessPlan},
    ]};

    console.log(newData);
    newList.push(newData);
    loadLobby(newList);
  } else {
    sessionStorage.setItem("username", event.target.username.value);
    sessionStorage.removeItem("companyId");

    const promiseArray = dmcc_ids.map((e) => {
      return Promise.resolve()
        .then(() =>
          getCompanyDetailAndDocument( event.target.username.value,  event.target.password.value)
        )
        .then((eachList) => {
          console.log('eachList', eachList)
          newList=eachList;
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
      <span style="padding: 5px;"></span>
      <span style="height: 50px; width: 50px"><img src="/src/res/throne.png" alt="logo" width="100%" height="100%" style="padding: 0px;"></span>
      <span style="padding: 5px;">ThronePlus</span>
    </div>

    <div style="display:flex;justify-content: space-between;width:90vw;margin:auto">
      <div style="width:45%; height: 70vh;overflow-y: scroll">
        <div class="displayHeader">Company Details</div>        
        <div class="eachDetail">Company Name: <span class="eachDetailAnswer">${
          list.company_name || "nill"
        }</span></div>
        <div class="eachDetail">Transaction Id:  <span class="eachDetailAnswer" style="inline-size: 150px;overflow-wrap: break-word;"> ${
          list.txID || "nill"
        } </span></div>
        <div class="eachDetail">Registration Date Year Of The Company:  <span class="eachDetailAnswer"> ${
          list.company_registration_date || "nill"
        }</span></div>
        <div class="eachDetail">Proposed Bank Of The Company:  <span class="eachDetailAnswer"> ${
          list.company_bank || "nill"
        }</span></div>
        <div class="eachDetail">Activities Of The Dmcc Company:  <span class="eachDetailAnswer"> ${
          list.dt_company_activity || "nill"
        }</span></div>
        <div class="eachDetail">Facility Of The Dmcc Company:  <span class="eachDetailAnswer"> ${
          list.dt_company_facility || "nill"
        }</span></div>
        <div class="eachDetail">Legal Status Of The Company:  <span class="eachDetailAnswer"> ${
          list.company_legal_status || "nill"
        }</span></div>
        <div class="eachDetail">Share Capital:  <span class="eachDetailAnswer"> ${
          list.share_capital || "nill"
        }</span></div>
        <div class="eachDetail">ShareHolder ID:  <span class="eachDetailAnswer"> ${
          list?.documents[0]?.share_holder_id || "nill"
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

      <div style="width:45%; height: 70vh;overflow-y: scroll">
      <div class="displayHeader">Certificates</div>

      ${list.documents.map(item => {
        return `<div class="docLink" hashValue=${item.hash}>${item.doc_name}</div>`;
      }).join('')}
      </div>
    </div>
    
  `;

  // Create a button element
  var button = document.createElement("button");
  button.textContent = "Cancel";
  button.classList = "btn btn-danger";
  button.style.margin = "30px 0px 0px 50px";

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
      );
      getBase64(
        e.target.getAttribute("hashValue")
      );
    });
  });
}

export { displayDetail, handleFormSubmission };

