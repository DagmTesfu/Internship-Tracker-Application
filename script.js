console.log("JS file connected");

const API_URL = "http://localhost:5000/api/application";

const form = document.getElementById("internship-form");
const companyInput = document.getElementById("company");
const positionInput = document.getElementById("position");
const noteInput = document.getElementById("notes");
const dealineInput = document.getElementById("deadline");
const statuss = document.getElementById("status");
const applicationsList = document.getElementById("applicationsList");
const filterStatus = document.getElementById("filterStatus");
const searchInput = document.getElementById("searchInput");
const submitButton = form.querySelector("button[type='submit']");

let application = [];
let editId = null;

function showMessage(message) {
  alert(message);
}

// Load applications from backend
async function loadApplications() {
  try {
    const response = await fetch(API_URL);
    const data = await response.json();

    if (!response.ok) {
      showMessage(data.message || "Failed to load applications");
      return;
    }

    application = data;
    displayApplications();
  } catch (error) {
    showMessage("Cannot connect to backend server");
    console.log(error);
  }
}

// Form submit: add or edit application
form.addEventListener("submit", async function (event) {
  event.preventDefault();

  console.log("Form Submitted");

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

  try {
    // ADD new application
    if (editId === null) {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(newApplication)
      });

      const data = await response.json();

      if (!response.ok) {
        showMessage(data.message || "Failed to add application");
        return;
      }
    }

    // EDIT existing application
    else {
      const response = await fetch(`${API_URL}/${editId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(newApplication)
      });

      const data = await response.json();

      if (!response.ok) {
        showMessage(data.message || "Failed to update application");
        return;
      }

      editId = null;
    }

    form.reset();
    submitButton.textContent = "Add Internship";

    await loadApplications();
  } catch (error) {
    showMessage("Cannot connect to backend server");
    console.log(error);
  }
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
    applicationsList.innerHTML = "<p>No Application Found.</p>";
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

      <button type="button" onclick="editApplication(${newApplication.id})">Edit</button>
      <button type="button" onclick="deleteApplication(${newApplication.id})">Delete</button>
    `;

    applicationsList.appendChild(card);
  });
}

// Filter Function
filterStatus.addEventListener("change", function () {
  displayApplications();
});

// Search Function
searchInput.addEventListener("input", function () {
  displayApplications();
});

// Delete Function
async function deleteApplication(id) {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "DELETE"
    });

    const data = await response.json();

    if (!response.ok) {
      showMessage(data.message || "Failed to delete application");
      return;
    }

    await loadApplications();
  } catch (error) {
    showMessage("Cannot connect to backend server");
    console.log(error);
  }
}

// Edit Function
function editApplication(id) {
  const applicationToEdit = application.find(function (newApplication) {
    return newApplication.id === id;
  });

  if (!applicationToEdit) {
    alert("Application not found");
    return;
  }

  companyInput.value = applicationToEdit.company;
  positionInput.value = applicationToEdit.position;
  dealineInput.value = applicationToEdit.deadline;
  noteInput.value = applicationToEdit.description;
  statuss.value = applicationToEdit.status;

  editId = id;
  submitButton.textContent = "Update Internship";

  console.log("Editing application with id:", editId);
}

// Start app
loadApplications();