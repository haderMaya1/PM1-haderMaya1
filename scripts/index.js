// let a = null;
// let b = "Texto1";
// let c = "Texto2";
// let d = undefined;

// let resultado = a ?? b ?? c ?? d;

// console.log (resultado);

("use strict");

// element toggle function
const elementToggleFunc = function (elem) {
  elem.classList.toggle("active");
};

// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () {
  elementToggleFunc(sidebar);
});

// testimonials variables
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// modal variable
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

// modal toggle function
const testimonialsModalFunc = function () {
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
};

// add click event to all modal items
for (let i = 0; i < testimonialsItem.length; i++) {
  testimonialsItem[i].addEventListener("click", function () {
    modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
    modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
    modalTitle.innerHTML = this.querySelector(
      "[data-testimonials-title]"
    ).innerHTML;
    modalText.innerHTML = this.querySelector(
      "[data-testimonials-text]"
    ).innerHTML;

    testimonialsModalFunc();
  });
}

// add click event to modal close button
modalCloseBtn.addEventListener("click", testimonialsModalFunc);
overlay.addEventListener("click", testimonialsModalFunc);

// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

select.addEventListener("click", function () {
  elementToggleFunc(this);
});

// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {
    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);
  });
}

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {
  for (let i = 0; i < filterItems.length; i++) {
    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
    } else if (selectedValue === filterItems[i].dataset.category) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }
  }
};

// add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {
  filterBtn[i].addEventListener("click", function () {
    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);

    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;
  });
}

// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// add event to all form input field
for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", function () {
    // check form validation
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }
  });
}

// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {
    for (let i = 0; i < pages.length; i++) {
      if (this.innerHTML.toLowerCase() === pages[i].dataset.page) {
        pages[i].classList.add("active");
        navigationLinks[i].classList.add("active");
        window.scrollTo(0, 0);
      } else {
        pages[i].classList.remove("active");
        navigationLinks[i].classList.remove("active");
      }
    }
  });
}

//Activities

// Clase Activity
class Activity {
  constructor(id, title, description, imgUrl) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.imgUrl = imgUrl;
  }
}

// Clase Repository
class Repository {
  constructor() {
    this.activities = JSON.parse(localStorage.getItem("activities")) || [];
  }

  getAllActivities() {
    return this.activities;
  }

  createActivity(title, description, imgUrl) {
    const id = this.activities.length + 1;
    const activity = new Activity(id, title, description, imgUrl);
    this.activities.push(activity);
    this.saveActivities();
    return activity;
  }

  // Método para eliminar una actividad por ID
  deleteActivity(id) {
    this.activities = this.activities.filter((activity) => activity.id !== id);
    this.saveActivities();
  }

  saveActivities() {
    localStorage.setItem("activities", JSON.stringify(this.activities));
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const repositories = new Repository();

  // Function to add an activity
  const addActivity = () => {
    const title = document.getElementById("activityTitle").value;
    const description = document.getElementById("activityDescription").value;
    const imgUrl = document.getElementById("activityImgUrl").value;

    if (!title || !description || !imgUrl) {
      alert("Faltan campos, por favor ingrese los datos");
      return;
    }

    repositories.createActivity(title, description, imgUrl);

    // Optional: Clear input fields after adding activity
    document.getElementById("activityTitle").value = "";
    document.getElementById("activityDescription").value = "";
    document.getElementById("activityImgUrl").value = "";

    // Render updated activities
    render();
  };

  // Event listener for the create activity button
  const createActivityButton = document.getElementById("createActivity");
  createActivityButton.addEventListener("click", addActivity);

  // Function to create activity card
  const createActivityCard = (activity) => {
    const card = document.createElement("div");
    card.className = "card-item boxes magic";

    const cardImage = document.createElement("img");
    cardImage.src = activity.imgUrl;
    cardImage.className = "card-img";

    const cardTitle = document.createElement("span");
    cardTitle.className = "card-title";
    cardTitle.innerText = activity.title;

    const cardDescription = document.createElement("p");
    cardDescription.innerText = activity.description;
    cardDescription.className = "card-text";

    const deleteButton = document.createElement("button");
    deleteButton.className = "delete-btn";
    deleteButton.innerText = "Delete";

    const deleteActivity = () => {
      repositories.deleteActivity(activity.id);
      render(); // Re-render activities after deletion
    };

    deleteButton.addEventListener("click", deleteActivity);

    card.appendChild(cardTitle);
    card.appendChild(cardImage);
    card.appendChild(cardDescription);
    card.appendChild(deleteButton);

    return card;
  };

  // Function to render activities
  const render = () => {
    const container = document.getElementById("activities-container");
    container.innerHTML = ""; // Clear previous content

    const activities = repositories.getAllActivities();

    activities.forEach((activity) => {
      const card = createActivityCard(activity);
      container.appendChild(card);
    });
  };

  // Initial rendering of activities
  render();
});

// Function to render activities
const renderActivities = (activities) => {
  // Assuming 'activities' is an array of activity objects
  activities.forEach((activity) => {
    const card = createActivityCard(activity);
    document.getElementById("activities-container").appendChild(card);
  });
};
