var imageContainer = document.getElementById("imageContainer");
var photoLinks = [];

// Fetch the photo links from the '/photos/' URL
var photosUrl = window.location.origin + '/photos/';
fetchPhotoLinks(photosUrl)
  .then(function(links) {
    photoLinks = links;
    // Display a random image immediately
    displayImage();

    // Shuffle the images every 5 seconds
    setInterval(shuffleImages, 9000);
  })
  .catch(function(error) {
    console.error("Error fetching photo links:", error);
  });

// Function to fetch the photo links from the specified URL
function fetchPhotoLinks(url) {
  return fetch(url)
    .then(function(response) {
      if (response.ok) {
        return response.text();
      } else {
        throw new Error("Error fetching photo links");
      }
    })
    .then(function(html) {
      var parser = new DOMParser();
      var doc = parser.parseFromString(html, "text/html");
      var links = Array.from(doc.querySelectorAll("a[href]")).map(function(element) {
        return element.href;
      });
      return links;
    });
}

// Function to display a random image
function displayImage() {
  var randomIndex = Math.floor(Math.random() * photoLinks.length);
  var image = document.createElement("img");
  image.src = photoLinks[randomIndex];
  image.style.opacity = 0;
  imageContainer.appendChild(image);
  
  // Trigger reflow to ensure opacity transition works
  image.offsetHeight;
  
  image.style.opacity = 1;
  
  setTimeout(function() {
    fadeOutImage(image);
  }, 9000);
}

// Function to fade out the current image
function fadeOutImage(image) {
  image.style.opacity = 0;
  setTimeout(function() {
    removePreviousImage();
    displayImage();
  }, 1000);
}

// Function to remove the previous image
function removePreviousImage() {
  var images = imageContainer.querySelectorAll("img");
  if (images.length > 1) {
    imageContainer.removeChild(images[0]);
  }
}