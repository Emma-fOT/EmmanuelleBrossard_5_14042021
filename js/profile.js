// "ShowPortfolio" reads the data from the json file to create the media cards in the photographer profile page
// function showPortfolio(jsonObj) {
// const listOfMedia = jsonObj.media;
// }

// "findID" reads the data from the json file to create the photographer profile page
function findID() {
  const queryString = window.location.search;
  const urlParameters = new URLSearchParams(queryString);
  return urlParameters.get("id");
}

// "ShowProfile" reads the data from the json file to create the photographer profile page

function showProfile(jsonObj) {
  const photographerID = findID();
  const listOfPhotographers = jsonObj.photographers;
  let i = 0;
  while (listOfPhotographers[i].id.toString() !== photographerID) {
    i += 1;
  }

  document.getElementById("name").textContent = listOfPhotographers[i].name;
  document.getElementById(
    "location"
  ).textContent = `${listOfPhotographers[i].city}, ${listOfPhotographers[i].country}`;
  document.getElementById("tagline").textContent =
    listOfPhotographers[i].tagline;

  const tagsOfPhotographers = listOfPhotographers[i].tags;
  const tags = document.createElement("ul");
  for (let j = 0; j < tagsOfPhotographers.length; j += 1) {
    const listItem = document.createElement("li");
    const listLink = document.createElement("a");
    listLink.textContent = `#${tagsOfPhotographers[j]}`;
    listLink.href = "#";
    listItem.appendChild(listLink);
    tags.appendChild(listItem);
    document.getElementById("tags").appendChild(tags);
    listItem.classList.add("filter", tagsOfPhotographers[j]); // Add the tag of this link and the "filter class" in order to filter the cards easily
  }

  document.getElementById(
    "profilePicture"
  ).src = `../images/Sample Photos/Photographers ID Photos/${listOfPhotographers[i].portrait}`;

  //  const photographerProfile = jsonObj.photographers.yes;
  //  showPortfolio();
}

// "LoadModal"
function LoadModal() {
  const modal = document.getElementById("modalWindow");
  const btn = document.getElementById("modalBtn");
  const span = document.getElementById("modalClose");

  btn.onclick = function showModal() {
    modal.style.display = "block";
  };

  span.onclick = function closeModal() {
    modal.style.display = "none";
  };

  window.onclick = function escapeModal(event) {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  };

  const modalTitle = document.getElementById("name").innerHTML;
  document.getElementById("myModalTitle").innerHTML += `<br/>${modalTitle}`;
}

function validate(event) {
  event.preventDefault();
  const fname = document.forms.modalForm.fname.value;
  const lname = document.forms.modalForm.lname.value;
  const email = document.forms.modalForm.email.value;
  const message = document.forms.modalForm.message.value;
  console.log(fname);
  console.log(lname);
  console.log(email);
  console.log(message);
  document.forms.modalForm.reset();
  document.getElementById("modalWindow").style.display = "none";
}

// Loading of the profile page
document.addEventListener("DOMContentLoaded", () => {
  const PageLoad = new Promise((resolve) => {
    const requestURL = "../mockdata/FishEyeData.json";
    const request = new XMLHttpRequest();
    request.open("GET", requestURL);
    request.responseType = "json";
    request.send();
    // other possibility : fetch
    request.onload = function loadDataInHTML() {
      const dbphoto = request.response;
      resolve(showProfile(dbphoto));
    };
  });
  PageLoad.then(() => {
    const listOfFilters = document.getElementsByClassName("filter");
    for (let i = 0; i < listOfFilters.length; i += 1) {
      // listOfFilters[i].addEventListener("click", filterCards);
    }
    LoadModal();
  });
});
