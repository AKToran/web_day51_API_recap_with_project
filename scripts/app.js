function removeActiveClass() {
  const activeBtns = document.getElementsByClassName("active");

  for (let btn of activeBtns) {
    btn.classList.remove("active");
  }
}

function loadCategories() {
  fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    .then((res) => res.json())
    .then((data) => displayCategories(data.categories));
}

function loadAllVideos() {
  fetch("https://openapi.programming-hero.com/api/phero-tube/videos")
    .then((res) => res.json())
    .then((data) => {
      removeActiveClass();
      const clickedButton = document.getElementById(`btn-all`);
      clickedButton.classList.add("active");
      displayVideos(data.videos);
    });
}

const loadCategoryVideos = (id) => {
  // showLoader();
  const url = `https://openapi.programming-hero.com/api/phero-tube/category/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      removeActiveClass();
      const clickedButton = document.getElementById(`btn-${id}`);
      clickedButton.classList.add("active");
      displayVideos(data.category);
    });
};

function displayCategories(categories) {
  const categoryContainer = document.getElementById("category-container");
  for (category of categories) {
    const div = document.createElement("div");

    div.innerHTML = `
    <button id="btn-${category.category_id}"  onclick="loadCategoryVideos(${category.category_id})" class="btn btn-sm hover:bg-[#FF1F3D]  hover:text-white">${category.category}</button>
    `;

    categoryContainer.appendChild(div);
  }
}

const displayVideos = (videos) => {
  const videoContainer = document.getElementById("video-container");

  if (videos.length == 0) {
    videoContainer.innerHTML = `
    <div class="py-20 col-span-full flex flex-col justify-center items-center text-center">
        <img class="w-[120px]" src="assets/Icon.png" alt="" />
        <h2 class="text-2xl font-bold">
          Oops!! Sorry, There is no content here
        </h2>
      </div>
    `;
    return;
  }

  videoContainer.innerHTML = ``;

  videos.forEach((video) => {
    const div = document.createElement("div");
    div.innerHTML = `
    <div class="card bg-base-100">
        <figure class="relative">
          <img class="h-[200px] w-full object-cover rounded-lg"
            src="${video.thumbnail}" />
            <span class="absolute bottom-2 right-2 bg-black px-2 rounded-sm text-sm text-white">3hrs 54min ago</span>
        </figure>

        <div class="card-body px-0 flex flex-row gap-4">

          <div class="profile">
            <div class="avatar">
              <div class="ring-primary px-0 ring-offset-base-100 w-12 rounded-full ring ring-offset-2">
                <img src="${video.authors[0].profile_picture}" />
              </div>
            </div>
          </div>

          <div class="info">
            <h2 class="card-title">${video.title}</h2>
            <p class="text-sm flex items-center gap-2 text-gray-600 font-semibold"> ${video.authors[0].profile_name} <img class="w-5 h-5" src="https://img.icons8.com/?size=100&id=102561&format=png&color=000000" alt=""> </p>
            <p class="text-sm text-gray-600"> ${video.others.views} views</p>
          </div>
          
        </div>
      </div>
    `;

    videoContainer.appendChild(div);
  });
};

loadCategories();
loadAllVideos();
