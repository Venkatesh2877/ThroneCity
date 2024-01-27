const newUserFormHTML = `
  <label for="username">Username:</label>
  <input type="text" id="username" name="username" >

  <label for="password">Password:</label>
  <input type="password" id="password" name="password" >

  <label for="confirmPassword">Confirm Password:</label>
  <input type="password" id="confirmPassword" name="confirmPassword">

  <button type="submit">Submit</button>
`;

const clientUserFormHTML=`
<label for="Company ID">Company Id:</label>
<input type="text" id="Company" name="Company required" >
<button type="submit">Submit</button>
`;



const registerCompanyFormHTML=`
<label for="DmccId">DmccId:</label>
<input type="text" id="DmccId" name="DmccId" >

<label for="companyName">Company Name:</label>
<input type="text" id="companyName" name="companyName" >

<label for="FinancialYearOfTheComapny">Financial Year Of The Comapny:</label>
<input type="text" id="FinancialYearOfTheComapny" name="FinancialYearOfTheComapny" >

<label for="ProposedBankOfTheCompany">Proposed Bank Of The Company:</label>
<input type="text" id="ProposedBankOfTheCompany" name="ProposedBankOfTheCompany" >

<label for="ActivitiesOfTheDmccCompany">ActivitiesOfTheDmccCompany:</label>
<input type="text" id="ActivitiesOfTheDmccCompany" name="ActivitiesOfTheDmccCompany" >

<label for="FacilityOfTheDmccCompany">FacilityOfTheDmccCompany:</label>
<input type="text" id="FacilityOfTheDmccCompany" name="FacilityOfTheDmccCompany" >

<label for="LegalStatusOfTheCompany">LegalStatusOfTheCompany:</label>
<input type="text" id="LegalStatusOfTheCompany" name="LegalStatusOfTheCompany" >

<label for="NameOfTheShareHolder">NameOfTheShareHolder:</label>
<input type="text" id="NameOfTheShareHolder" name="NameOfTheShareHolder" >

<label for="ShareCapital">ShareCapital:</label>
<input type="text" id="ShareCapital" name="ShareCapital" >

<label for="ShareHoldingPercentage">ShareHoldingPercentage:</label>
<input type="text" id="ShareHoldingPercentage" name="ShareHoldingPercentage" >

<label for="SelectRoleOfTheCompany">SelectRoleOfTheCompany:</label>
<input type="text" id="SelectRoleOfTheCompany" name="SelectRoleOfTheCompany" >

<label for="EmiratesId">EmiratesId:</label>
<input type="text" id="EmiratesId" name="EmiratesId" >

<label for="OfficialMailAddress">OfficialMailAddress:</label>
<input type="text" id="OfficialMailAddress" name="OfficialMailAddress" >

<label for="ContactNumber">ContactNumber:</label>
<input type="text" id="ContactNumber" name="ContactNumber" >

<label for="AdditionalDetails">AdditionalDetails:</label>
<input type="text" id="AdditionalDetails" name="AdditionalDetails" >




        
 

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

<label for="EmirateId">EmirateId:</label>
<input type="file" id="EmirateId" name="EmirateId" >

<label for="BussinessProfile">BussinessProfile:</label>
<input type="file" id="BussinessProfile" name="BussinessProfile" >

<label for="IncorporationOfSubsidaryInDmcc">IncorporationOfSubsidaryInDmcc:</label>
<input type="file" id="IncorporationOfSubsidaryInDmcc" name="IncorporationOfSubsidaryInDmcc" >

<button type="submit">Submit</button>
`;

export  {newUserFormHTML,clientUserFormHTML,registerCompanyFormHTML};
