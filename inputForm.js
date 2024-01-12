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
<input type="text" id="Company" name="Company" >
<button type="submit">Submit</button>
`;

const registerCompanyFormHTML=`
<label for="companyName">Company Name:</label>
<input type="text" id="companyName" name="companyName" >

<label for="document">Company document:</label>
<input type="file" id="document" name="document" >

<button type="submit">Submit</button>
`;

export  {newUserFormHTML,clientUserFormHTML,registerCompanyFormHTML};
