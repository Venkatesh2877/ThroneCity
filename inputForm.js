const newUserFormHTML = `
<div class="inputContainer">
  <label for="username">Username:</label>
  <input type="text" id="username" name="username" >
</div>

<div class="inputContainer">
  <label for="password">Password:</label>
  <input type="password" id="password" name="password" >
</div>

<div class="inputContainer">
  <label for="confirmPassword">Confirm Password:</label>
  <input type="password" id="confirmPassword" name="confirmPassword">
</div>

<button type="submit" class="btn btn-primary my-3">Submit</button>
`;

const clientUserFormHTML=`
<div class="inputContainer">
  <label for="Company ID">Company Id:</label>
  <input type="text" id="Company" name="Company required" >
</div>

<button type="submit" class="btn btn-primary my-3">Submit</button>
`;



const registerCompanyFormHTML=`
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
      <label for="FinancialYearOfTheComapny">Financial Year Of The Comapny:</label>
      <input type="text" id="FinancialYearOfTheComapny" name="FinancialYearOfTheComapny" >
    </div>

    <div class="inputContainer">
      <label for="ProposedBankOfTheCompany">Proposed Bank Of The Company:</label>
      <input type="text" id="ProposedBankOfTheCompany" name="ProposedBankOfTheCompany" >
    </div>

    <div class="inputContainer">
      <label for="ActivitiesOfTheDmccCompany">ActivitiesOfTheDmccCompany:</label>
      <input type="text" id="ActivitiesOfTheDmccCompany" name="ActivitiesOfTheDmccCompany" >
    </div>

    <div class="inputContainer">
      <label for="FacilityOfTheDmccCompany">FacilityOfTheDmccCompany:</label>
      <input type="text" id="FacilityOfTheDmccCompany" name="FacilityOfTheDmccCompany" >
    </div>

    <div class="inputContainer">
      <label for="LegalStatusOfTheCompany">LegalStatusOfTheCompany:</label>
      <input type="text" id="LegalStatusOfTheCompany" name="LegalStatusOfTheCompany" >
    </div>

    <div class="inputContainer">
      <label for="NameOfTheShareHolder">NameOfTheShareHolder:</label>
      <input type="text" id="NameOfTheShareHolder" name="NameOfTheShareHolder" >
    </div>
  </div>

  <div>
    <div class="inputContainer">
      <label for="ShareCapital">ShareCapital:</label>
      <input type="text" id="ShareCapital" name="ShareCapital" >
    </div>

    <div class="inputContainer">
      <label for="ShareHoldingPercentage">ShareHoldingPercentage:</label>
      <input type="text" id="ShareHoldingPercentage" name="ShareHoldingPercentage" >
    </div>

    <div class="inputContainer">
      <label for="SelectRoleOfTheCompany">SelectRoleOfTheCompany:</label>
      <input type="text" id="SelectRoleOfTheCompany" name="SelectRoleOfTheCompany" >
    </div>

    <div class="inputContainer">
      <label for="EmiratesId">EmiratesId:</label>
      <input type="text" id="EmiratesId" name="EmiratesId" >
    </div>

    <div class="inputContainer">
      <label for="OfficialMailAddress">OfficialMailAddress:</label>
      <input type="text" id="OfficialMailAddress" name="OfficialMailAddress" >
    </div>

    <div class="inputContainer">
      <label for="ContactNumber">ContactNumber:</label>
      <input type="text" id="ContactNumber" name="ContactNumber" >
    </div>

    <div class="inputContainer">
      <label for="AdditionalDetails">AdditionalDetails:</label>
      <input type="text" id="AdditionalDetails" name="AdditionalDetails" >
    </div>
  </div>

      
  <div>
      <label for="Incorporation">Incorporation:</label>
      <input type="file" id="Incorporation" name="Incorporation" >

      <label for="MoaAndAoa">MoaAndAoa:</label>
      <input type="file" id="MoaAndAoa" name="MoaAndAoa" >

      <label for="Incumberency">Incumberency:</label>
      <input type="file" id="Incumberency" name="Incumberency" >

      <label for="UndertakingLetterOfShareCapital">UndertakingLetterOfShareCapital:</label>
      <input type="file" id="UndertakingLetterOfShareCapital" name="UndertakingLetterOfShareCapital" >

      <label for="AuthorizationLetter">AuthorizationLetter:</label>
      <input type="file" id="AuthorizationLetter" name="AuthorizationLetter" >

      <label for="DeclerationOfUltimateBenefitialOwners">DeclerationOfUltimateBenefitialOwners:</label>
      <input type="file" id="DeclerationOfUltimateBenefitialOwners" name="DeclerationOfUltimateBenefitialOwners" >

      <label for="ValidPassportCopy">ValidPassportCopy:</label>
      <input type="file" id="ValidPassportCopy" name="ValidPassportCopy" >

      <label for="UtilityBillForAddressProof">UtilityBillForAddressProof:</label>
      <input type="file" id="UtilityBillForAddressProof" name="UtilityBillForAddressProof" >
  </div>

  <div>
      <label for="EmirateId">EmirateId:</label>
      <input type="file" id="EmirateId" name="EmirateId" >

      <label for="BussinessProfile">BussinessProfile:</label>
      <input type="file" id="BussinessProfile" name="BussinessProfile" >

      <label for="IncorporationOfSubsidaryInDmcc">IncorporationOfSubsidaryInDmcc:</label>
      <input type="file" id="IncorporationOfSubsidaryInDmcc" name="IncorporationOfSubsidaryInDmcc" >

  </div>
</div>

<button type="submit" class="btn btn-primary" style="margin:auto;">Submit</button>
`;

export  {newUserFormHTML,clientUserFormHTML,registerCompanyFormHTML};
