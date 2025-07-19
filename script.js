const accessKey = "IgF62zMH_GBJmdpr6yvJvqq1kriqeMwUIDPfnGuplZY";
const searchForm = document.querySelector(".material-symbols");
const searchInput = document.querySelector(".search-input");
const imagesContainer = document.querySelector(".images-container");
const loadMoreBtn = document.querySelector(".loadMoreBtn");

let page = 1;
// Function to fetch images using UnSplash API
const fetchImages = async function (query, pageNo) {
  try {
    if (page === 1) {
      imagesContainer.innerHTML = "";
    }

    const url = `https://api.unsplash.com/search/photos/?query=${query}&per_page=28&page=${pageNo}&client_id=${accessKey}`;

    const response = await fetch(url);
    const data = await response.json();

    if (data.results.length > 0) {
      data.results.forEach((photo) => {
        //Creating image div
        const imageElement = document.createElement("div");
        imageElement.classList.add("imageDiv");
        imageElement.innerHTML = `<img src="${photo.urls.regular}"></img>`;

        //Creating Overlay
        const overlayElement = document.createElement("div");
        overlayElement.classList.add("overlay");

        //Creating Overlay Text
        const overlayText = document.createElement("h3");
        overlayText.innerText = `${photo.alt_description}`;

        overlayElement.appendChild(overlayText);

        imageElement.appendChild(overlayElement);

        imagesContainer.appendChild(imageElement);
      });

      if (data.total_pages === pageNo) {
        loadMoreBtn.style.display = "none";
      } else {
        loadMoreBtn.style.display = "block";
      }
    } else {
      imagesContainer.innerHTML = `<h2>No Image Found.</h2>`;
      if (loadMoreBtn.style.display === "block") {
        loadMoreBtn.style.display === "none";
      }
    }
  } catch (error) {
    imagesContainer.innerHTML = `<h2>Failed to fetch images. Please try again later.</h2>`;
  }
};

//Adding Event Listener to search form
searchForm.addEventListener("click", (e) => {
  e.preventDefault();
  const inputText = searchInput.value.trim();
  if (inputText !== "") {
    page = 1;
    fetchImages(inputText, page);
  } else {
    imagesContainer.innerHTML = `<h2>Please enter a search query.</h2>`;
    if (loadMoreBtn.style.display === "block") {
      loadMoreBtn.style.display === "none";
    }
  }
});

//Adding Event Listener to load more button to fetch more images
loadMoreBtn.addEventListener("click", (e) => {
  fetchImages(searchInput.value.trim(), ++page);
});
