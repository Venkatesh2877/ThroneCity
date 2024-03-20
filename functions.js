import { updateMovement, updateShowingDetail } from "./characterControls";
import { canvas } from "./main";

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


// Function to handle form submission
async function handleFormSubmission(event) {
  event.preventDefault(); // Prevent the default form submission
  canvas.style.opacity = "1";
  document.querySelector(".input").style.display = "none";
  updateMovement(true);

  if (event.target.elements.Company) {   //find company
    sessionStorage.setItem("companyId", event.target.Company.value);
    sessionStorage.removeItem("username");

  } else if (event.target.elements.email) {  //signup new user
    sessionStorage.removeItem("username");
    sessionStorage.removeItem("companyId");
   
  } else if (event.target.elements.company_name) {// onboard a new company
    // console.log(event)
    // console.log("register company", event.target[14].files[0]);
    // console.log("register company", event.target.elements?.shareHolder_name?.value);
  } else {
    sessionStorage.setItem("username", event.target.username.value);
    sessionStorage.removeItem("companyId");

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
      <span style="padding: 5px;">ThroneCity</span>
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

