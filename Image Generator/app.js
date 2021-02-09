// //API Key
const auth = "563492ad6f91700001000001b3f81d46d6394010b729200e2c9c1c27"; 

//Query Selectors
const gallery = document.querySelector(".gallery");
const searchInput = document.querySelector(".search-input");
const form = document.querySelector(".search-form");
const more = document.querySelector(".more");
let searchValue;
let page = 1;
let fetchLink;
let currentSearch;

//Event Listeners
searchInput.addEventListener("input", updateInput);
form.addEventListener("submit", e => {
  e.preventDefault();
  currentSearch = searchValue;
  searchPhotos(searchValue);
});
more.addEventListener("click", loadMore);

//Functions
function updateInput(e) {
  searchValue = e.target.value;
}

function generatePictures(data) {
    //Getting Each Image
    data.photos.forEach(photo => {
      const galleryImg = document.createElement("div");
      galleryImg.classList.add("gallery-img");
      //Giving Each Image it's Data
      galleryImg.innerHTML = `
        <div class="gallery-info">
        <p>${photo.photographer}</p>
        <a href=${photo.src.original}>Download</a>
        </div>
        <img src=${photo.src.large}></img>
        `;
        //Appending Child
        gallery.appendChild(galleryImg);
    });
}

function clear() {
    gallery.innerHTML = "";
    searchInput.value = "";
}

//Async Functions
async function fetchApi(url) {
    //Fetching API Key
    const dataFetch = await fetch(url, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: auth
    }
  });
  const data = await dataFetch.json();
  return data;
}

//For Random Photos
async function curatedPhotos() {
  fetchLink = "https://api.pexels.com/v1/curated?per_page=15&page=1";
  const data = await fetchApi(fetchLink);

  generatePictures(data);
}

//For Searched Photos
async function searchPhotos(query) {
  clear();
  fetchLink = `https://api.pexels.com/v1/search?query=${query}+query&per_page=15&page=1`;
  const data = await fetchApi(fetchLink);
  generatePictures(data);
}

async function loadMore() {
  page++;
  if (currentSearch) {
    fetchLink = `https://api.pexels.com/v1/search?query=${currentSearch}+query&per_page=15&page=${page}`;
  } else {
    fetchLink = `https://api.pexels.com/v1/curated?per_page=15&page=${page}`;
  }
  const data = await fetchApi(fetchLink);
  generatePictures(data);
}

curatedPhotos();
