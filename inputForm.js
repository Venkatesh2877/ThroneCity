const newUserFormHTML = `
<div class="inputContainer">
  <label for="username">Username:</label>
  <input type="text" id="username" name="username" >
</div>

<div class="inputContainer">
  <label for="email">Email:</label>
  <input type="email" id="email" name="email">
</div>

<div class="inputContainer">
  <label for="password">Password:</label>
  <input type="password" id="password" name="password" >
</div>

<button type="submit" class="btn btn-primary my-3">Submit</button>
`;

const clientUserFormHTML = `
<div class="inputContainer">
  <label for="Company ID">Company Id:</label>
  <input type="text" id="Company" name="Company required" >
</div>

<button type="submit" class="btn btn-primary my-3">Submit</button>
`;

const registerCompanyFormHTML = `
<div style="display:flex;justify-content: space-between;">
  <div>
    <div class="inputContainer">
      <label for="DmccId">DmccId:</label>
      <input type="text" id="DmccId" name="DmccId" >
    </div>

    <div class="inputContainer">
      <label for="companyName">Company Name:</label>
      <input type="text" id="companyName" name="companyName" >
    </div>

    <div class="inputContainer">
      <label for="Financial Year Of The Comapny">Financial Year Of The Comapny:</label>
      <input type="text" id="FinancialYearOfTheComapny" name="FinancialYearOfTheComapny" >
    </div>

    <div class="inputContainer">
      <label for="Proposed Bank Of The Company">Proposed Bank Of The Company:</label>
      <input type="text" id="ProposedBankOfTheCompany" name="ProposedBankOfTheCompany" >
    </div>

    <div class="inputContainer">
      <label for="Activities Of The Dmcc Company">Activities Of The Dmcc Company:</label>
      <input type="text" id="ActivitiesOfTheDmccCompany" name="ActivitiesOfTheDmccCompany" >
    </div>

    <div class="inputContainer">
      <label for="Facility Of The Dmcc Company">Facility Of The Dmcc Company:</label>
      <input type="text" id="FacilityOfTheDmccCompany" name="FacilityOfTheDmccCompany" >
    </div>

    <div class="inputContainer">
      <label for="Legal Status Of The Company">Legal Status Of The Company:</label>
      <input type="text" id="LegalStatusOfTheCompany" name="LegalStatusOfTheCompany" >
    </div>

    <div class="inputContainer">
      <label for="Name Of The ShareHolder">Name Of The Share Holder:</label>
      <input type="text" id="NameOfTheShareHolder" name="NameOfTheShareHolder" >
    </div>
  </div>

  <div>
    <div class="inputContainer">
      <label for="Share Capital">Share Capital:</label>
      <input type="text" id="ShareCapital" name="ShareCapital" >
    </div>

    <div class="inputContainer">
      <label for="Share Holding Percentage">Share Holding Percentage:</label>
      <input type="text" id="ShareHoldingPercentage" name="ShareHoldingPercentage" >
    </div>

    <div class="inputContainer">
      <label for="Select Role Of The Company">Select Role Of The Company:</label>
      <input type="text" id="SelectRoleOfTheCompany" name="SelectRoleOfTheCompany" >
    </div>

    <div class="inputContainer">
      <label for="EmiratesId">Emirates Id:</label>
      <input type="text" id="EmiratesId" name="EmiratesId" >
    </div>

    <div class="inputContainer">
      <label for="Official Mail Address">Official Mail Address:</label>
      <input type="text" id="OfficialMailAddress" name="OfficialMailAddress" >
    </div>

    <div class="inputContainer">
      <label for="Contact Number">Contact Number:</label>
      <input type="text" id="ContactNumber" name="ContactNumber" >
    </div>

    <div class="inputContainer">
      <label for="Additional Details">Additional Details:</label>
      <input type="text" id="AdditionalDetails" name="AdditionalDetails" >
    </div>
  </div>

      
  <div>
      <label for="Incorporation">Incorporation:</label>
      <input type="file" id="Incorporation" name="Incorporation" >

      <label for="MoaAndAoa">Moa And Aoa:</label>
      <input type="file" id="MoaAndAoa" name="MoaAndAoa" >

      <label for="Incumberency">Incumberency:</label>
      <input type="file" id="Incumberency" name="Incumberency" >

      <label for="Undertaking Letter Of Share Capital">Undertaking Letter Of Share Capital:</label>
      <input type="file" id="UndertakingLetterOfShareCapital" name="UndertakingLetterOfShareCapital" >

      <label for="AuthorizationLetter">Authorization Letter:</label>
      <input type="file" id="AuthorizationLetter" name="AuthorizationLetter" >

      <label for="Decleration Of Ultimate Benefitial Owners">Decleration Of Ultimate Benefitial Owners:</label>
      <input type="file" id="DeclerationOfUltimateBenefitialOwners" name="DeclerationOfUltimateBenefitialOwners" >

      <label for="ValidPassportCopy">Valid Passport Copy:</label>
      <input type="file" id="ValidPassportCopy" name="ValidPassportCopy" >

      <label for="Utility Bill For Address Proof">Utility Bill For Address Proof:</label>
      <input type="file" id="UtilityBillForAddressProof" name="UtilityBillForAddressProof" >
  </div>

  <div>
      <label for="EmirateId">Emirate Id:</label>
      <input type="file" id="EmirateId" name="EmirateId" >

      <label for="BussinessProfile">Bussiness Profile:</label>
      <input type="file" id="BussinessProfile" name="BussinessProfile" >

      <label for="IncorporationOfSubsidaryInDmcc">Incorporation Of Subsidary In Dmcc:</label>
      <input type="file" id="IncorporationOfSubsidaryInDmcc" name="IncorporationOfSubsidaryInDmcc" >

  </div>
</div>

<button type="submit" class="btn btn-primary" style="margin:auto;">Submit</button>
`;

export { newUserFormHTML, clientUserFormHTML, registerCompanyFormHTML };
