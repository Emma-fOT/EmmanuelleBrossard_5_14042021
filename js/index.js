// "Showcards" reads the data from the json file to create the photographer cards

function showCards(jsonObj) {
  const placeForCards = document.querySelector("main div");
  const listOfPhotographers = jsonObj.photographers;

  for (let i = 0; i < listOfPhotographers.length; i += 1) {
    const card = document.createElement("article");
    const link = document.createElement("a");
    const portrait = document.createElement("img");
    const name = document.createElement("h2");
    const place = document.createElement("p");
    const tagline = document.createElement("p");
    const price = document.createElement("p");
    const tags = document.createElement("ul");

    portrait.src = `/images/Sample Photos/Photographers ID Photos/${listOfPhotographers[i].portrait}`;
    name.textContent = listOfPhotographers[i].name;
    link.setAttribute("aria-label", name.textContent);
    link.href = `/${name.textContent.replaceAll(" ", "")}`;
    link.classList.add("photographer");
    link.appendChild(portrait);
    link.appendChild(name);

    place.textContent = `${listOfPhotographers[i].city}, ${listOfPhotographers[i].country}`;
    tagline.textContent = listOfPhotographers[i].tagline;
    price.textContent = `${listOfPhotographers[i].price} €/jour`;

    const tagsOfPhotographers = listOfPhotographers[i].tags;
    for (let j = 0; j < tagsOfPhotographers.length; j += 1) {
      const listItem = document.createElement("li");
      const listLink = document.createElement("a");
      listLink.textContent = `#${tagsOfPhotographers[j]}`;
      listLink.href = "#";
      listItem.appendChild(listLink);
      tags.appendChild(listItem);
      card.classList.add(tagsOfPhotographers[j]); // Add the tags as a class of the article in order to filter the cards easily
      listItem.classList.add("filter", tagsOfPhotographers[j]); // Add the tag of this link and the "filter class" in order to filter the cards easily
    }

    card.appendChild(link);
    card.appendChild(place);
    card.appendChild(tagline);
    card.appendChild(price);
    card.appendChild(tags);

    placeForCards.appendChild(card);
  }
}

// "FilterCards" creates a filter based on the tags to show only the photographers having this tag

function filterCards() {
  const listOfCards = document.querySelectorAll("article");
  const filterName = this.classList[1]; // the first html class is "filter" (the filter type itself), the second one is the name of the filter
  for (let i = 0; i < listOfCards.length; i += 1) {
    if (!listOfCards[i].classList.contains(filterName)) {
      listOfCards[i].style.display = "none";
    } else {
      listOfCards[i].style.display = "block";
    }
  }
}

// "OpenPhotographerPage" creates the DOM of the new page (the page of the photographer)

function openPhotographerPage() {}

// Loading of the main page

document.addEventListener("DOMContentLoaded", () => {
  const PageLoad = new Promise((resolve) => {
    const requestURL = "mockdata/FishEyeData.json";
    const request = new XMLHttpRequest();
    request.open("GET", requestURL);
    request.responseType = "json";
    request.send();
    // other possibility : fetch
    request.onload = function loadDataInHTML() {
      const dbphoto = request.response;
      resolve(showCards(dbphoto));
    };
  });
  PageLoad.then(() => {
    const listOfFilters = document.getElementsByClassName("filter");
    for (let i = 0; i < listOfFilters.length; i += 1) {
      listOfFilters[i].addEventListener("click", filterCards);
    }
    const listOfPhotographers = document.getElementsByClassName("photographer");
    for (let i = 0; i < listOfPhotographers.length; i += 1) {
      listOfPhotographers[i].addEventListener("click", openPhotographerPage);
    }
  });
});
