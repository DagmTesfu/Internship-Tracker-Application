console.log("JS file connected");

const API_URL = "http://localhost:5000/api/application";

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

let editId = null;

async function loadApplications() {
  const response = await fetch(API_URL);
  application = await response.json();

  displayApplications();
}

// Application Object
form.addEventListener("submit", async function (event) {
  event.preventDefault();
  console.log("Form Submitted");

  // prevent empty applications from being added.
  if (companyInput.value.trim() === "") {
    alert("Please Enter Company Name");
    return;
  }

  if (positionInput.value.trim() === "") {
    alert("Please Enter Position Name");
    return;
  }

  const newApplication = {
    company: companyInput.value.trim(),
    position: positionInput.value.trim(),
    deadline: dealineInput.value,
    description: noteInput.value.trim(),
    status: statuss.value
  };

  if (editId === null) {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newApplication)
    });

    const savedApplication = await response.json();

    application.push(savedApplication);
  } else {
    const response = await fetch(`${API_URL}/${editId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newApplication)
    });

    const updatedApplication = await response.json();

    application = application.map(function (app) {
      if (app.id === editId) {
        return updatedApplication;
      }

      return app;
    });

    editId = null;
  }

  displayApplications();
  form.reset();

  console.log(application);
  console.log("Form submitted");
});

// Display Function
function displayApplications() {
  applicationsList.innerHTML = "";

  const selectedStatus = filterStatus.value;
  const searchText = searchInput.value.toLowerCase();

  const filteredApplications = application.filter(function (newApplication) {
    const matchesStatus =
      selectedStatus === "All" || newApplication.status === selectedStatus;

    const matchSearch =
      newApplication.company.toLowerCase().includes(searchText) ||
      newApplication.position.toLowerCase().includes(searchText);

    return matchesStatus && matchSearch;
  });

  if (filteredApplications.length === 0) {
    applicationsList.innerHTML = "<p> No Application Found. </p>";
    return;
  }

  filteredApplications.forEach(function (newApplication) {
    const card = document.createElement("div");

    card.innerHTML = `
      <h3>${newApplication.company}</h3>
      <p><strong>Role:</strong> ${newApplication.position}</p>
      <p><strong>Status:</strong> ${newApplication.status}</p>
      <p><strong>Deadline:</strong> ${newApplication.deadline}</p>
      <p><strong>Notes:</strong> ${newApplication.description}</p>
      <button onclick="deleteApplication(${newApplication.id})">Delete</button>
      <button onclick="editApplication(${newApplication.id})">Edit</button>
    `;

    applicationsList.appendChild(card);
  });
}

filterStatus.addEventListener("change", function () {
  displayApplications();
});

searchInput.addEventListener("input", function () {
  displayApplications();
});

// Delete Function
async function deleteApplication(id) {
  await fetch(`${API_URL}/${id}`, {
    method: "DELETE"
  });

  application = application.filter(function (newApplication) {
    return newApplication.id !== id;
  });

  displayApplications();
}

// Edit Function
function editApplication(id) {
  const applicationToEdit = application.find(function (newApplication) {
    return newApplication.id === id;
  });

  companyInput.value = applicationToEdit.company;
  positionInput.value = applicationToEdit.position;
  dealineInput.value = applicationToEdit.deadline;
  noteInput.value = applicationToEdit.description;
  statuss.value = applicationToEdit.status;

  editId = id;
}

loadApplications();