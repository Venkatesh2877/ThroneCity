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
<label for="companyName">Company Name:</label>
<input type="text" id="companyName" name="companyName" >

<label for="id">Company id:</label>
<input type="text" id="id" name="id" >

<label for="bankName">Bank Name:</label>
<input type="text" id="bankName" name="bankName" >

<label for="legalStatus">Legal status:</label>
<input type="text" id="legalStatus" name="legalStatus" >

<label for="shareHolderName">Share Holder Name:</label>
<input type="text" id="shareHolderName" name="shareHolderName" >

<label for="roleInCompany">Role In Company:</label>
<input type="text" id="roleInCompany" name="roleInCompany" >

<label for="passport">Passport:</label>
<input type="file" id="passport" name="passport" >

<label for="emirateID">Emirate ID:</label>
<input type="file" id="emirateID" name="emirateID" >

<label for="bankStatement">Bank Statement:</label>
<input type="file" id="bankStatement" name="bankStatement" >

<button type="submit">Submit</button>
`;

export  {newUserFormHTML,clientUserFormHTML,registerCompanyFormHTML};
