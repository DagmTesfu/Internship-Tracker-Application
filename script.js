const form = document.getElementById("internship-form");
const companyInput = document.getElementById("company");
const positionInput = document.getElementById("position");
const noteInput = document.getElementById("notes");
const dealineInput = document.getElementById("deadline");
// const tableForm = document.getElementById("internship-table");
const statuss = document.getElementById("status");
const applicationsList = document.getElementById("applicationsList");
const filterStatus = document.getElementById("filterStatus");
const searchInput = document.getElementById("searchInput");


let application = [];

// Application Object
form.addEventListener("submit", function (event) {
  event.preventDefault();

  // prevent empty applications from being added.
  if(companyInput.value.trim() === ""){
    alert("Please Enter Company Name");
    return;
  }

  if(positionInput.value.trim() === ""){
    alert("Please Enter Position Name");
    return;
  }


  const newApplication = {

  id: Date.now(),
  company: companyInput.value,
  Position: positionInput.value,
  Deadline: dealineInput.value,
  Description: noteInput.value,
  Status: statuss.value

  };

  application.push(newApplication);
  displayApplications();
  saveApplication();
  console.log(application);
  form.reset();
  console.log("Form submitted");
});


// Display Function
function displayApplications() {
  applicationsList.innerHTML = "";

  const selectedStatus = filterStatus.value;
  const searchText = searchInput.value.toLowerCase();

  const filteredApplications = application.filter(function (newApplication){
      const matchesStatus = selectedStatus === "All" || newApplication.Status === selectedStatus

    const matchSearch =  newApplication.company.toLowerCase().includes(searchText) ||
      newApplication.Position.toLowerCase().includes(searchText);

      return matchesStatus && matchSearch;
   
  });




  filteredApplications.forEach(function (newApplication) {
    const card = document.createElement("div");

    card.innerHTML = `
      <h3>${newApplication.company}</h3>
      <p><strong>Role:</strong> ${newApplication.Position}</p>
      <p><strong>Status:</strong> ${newApplication.Status}</p>
      <p><strong>Deadline:</strong> ${newApplication.Deadline}</p>
      <p><strong>Notes:</strong> ${newApplication.Description}</p>
      <button onclick="deleteApplication(${newApplication.id})">Delete</button>
      <button onclick="editApplication(${newApplication.id})">Edit</button>
      
    `;

    applicationsList.appendChild(card);
  });
}

filterStatus.addEventListener("change", function () {
  displayApplications();
});

  
  searchInput.addEventListener("input", function (){
    displayApplications();
  })

// Delete  Function
function deleteApplication(id){
    application = application.filter(function (newApplication){
        return newApplication.id !== id;
    });

    displayApplications();
    saveApplication();
}


// Edit Function
function editApplication(id){
  const applicationToEdit = application.find(function (newApplication) {
    return newApplication.id == id;
  });

  companyInput.value = applicationToEdit.company;
  positionInput.value = applicationToEdit.Position;
  dealineInput.value = applicationToEdit.Deadline;
  noteInput.value = applicationToEdit.Description;
  statuss.value = applicationToEdit.Status;


  application = application.filter(function (newApplication) {
    return newApplication.id !== id;
  });

  saveApplication();
  displayApplications();
}


// Local-Storage Integration
function saveApplication(){
  localStorage.setItem("application", JSON.stringify(application));
}

function loadApplication(){
  const savedApplication = localStorage.getItem("application");

  // Saves The data on display
  if(savedApplication){
    application = JSON.parse(savedApplication);
  }
  else{
    console.log('User data not found in local storage');
  }

  displayApplications();
}

loadApplication();
