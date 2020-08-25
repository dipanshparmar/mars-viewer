// creating date aboject so that every day new images appear
const date = new Date();

// API data
const apiKey = "mnr61iWoRr4RamkPDxTvGsaaLnhjnB7Q2OKD21Il";
const URL = `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=${date.getFullYear()}-${date.getMonth()}-${date.getDate()}&api_key=`;
const completeURL = `${URL}${apiKey}`;

// all the array collection goes here
// creating an array to store the images
let images = [];
// creating an array to store the rover names
let roverNames = [];
// creating an array to store the camera names
let cameraNames = [];
// creating an array to store the rover status
let roverStatuses = [];

// creating index to access the array values
let index = 0;

// function to display the content
function displayContent() {
  // displaying the total images
  document.querySelector(".output-total-images").textContent = images.length;

  // displaying the current image number
  document.querySelector(".output-image-number").textContent = index + 1;

  // displaying the rover name
  document.querySelector(".output-rover-name").textContent = roverNames[index];

  // displaying the camera name
  document.querySelector(".output-camera-name").textContent =
    cameraNames[index];

  // displaying the rover status
  document.querySelector(".output-rover-status").textContent =
    roverStatuses[index];

  // displaying the image
  const img = `<img src="${images[index]}" alt="mars image">`;

  // appending the image to the body
  document.querySelector("#img").innerHTML = img;
}

// function to fetch the api details
async function getDataFromAPI(url) {
  const response = await fetch(url);
  const data = await response.json();

  // getting all the images
  data.photos.forEach((object) => {
    images.push(object.img_src);
  });

  // getting all the rover names
  data.photos.forEach((object) => {
    roverNames.push(object.rover.name);
  });

  // getting all the camera names
  data.photos.forEach((object) => {
    cameraNames.push(object.camera.name);
  });

  // getting rover statuses
  data.photos.forEach((object) => {
    roverStatuses.push(object.rover.status);
  });

  // calling the display content function
  displayContent();
}

// listening for next and previous button clicks
document.querySelector("#buttons").addEventListener("click", (event) => {
  // if clicked on previous button
  if (event.target.classList[0] === "previous") {
    if (index === 0) {
      index = images.length - 1;
    } else {
      --index;
    }

    // to update the content
    displayContent();
  } else if (event.target.classList[0] === "next") {
    if (index === images.length - 1) {
      index = 0;
    } else {
      ++index;
    }

    // to update the content
    displayContent();
  }
});

getDataFromAPI(completeURL);
