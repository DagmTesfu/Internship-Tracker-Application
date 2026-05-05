const form = document.getElementById("internship-form");
const companyInput = document.getElementById("company");
const positionInput = document.getElementById("position");
const noteInput = document.getElementById("notes");
// const tableForm = document.getElementById("internship-table");
const statuss = document.getElementById("status");

let application = [];

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const application = {

  company: companyInput.value,
  Position: positionInput.value,
  Description: noteInput.value,
  Status: statuss.value
  }


  console.log(application);
  
  console.log("Form submitted");
});