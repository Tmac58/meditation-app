let newPost = document.getElementById("newPost")
let previousPosts = document.getElementById("previousPosts")
let showAnimals = document.getElementById("showAnimals")
let postImage = document.getElementById("postImage")
let joinButton = document.getElementById("joinButton")


//list images of spirit animal on community post
function listAnimals() {
  showAnimals.innerHTML =
  `<div>
    <div class="animalThumbnail" onclick="displayAnimal('lion')"> <img src="images/lion.png"> </img></div>
    <div class="animalThumbnail" onclick="displayAnimal('llama')"> <img src="images/llama.png"/> </div>
    <div class="animalThumbnail" onclick="displayAnimal('owl')"> <img src="images/owl.png"/> </div>
    <div class="animalThumbnail"onclick="displayAnimal('turtle')"> <img src="images/turtle.png"/> </div>
  </div>`
}

//update animal image
function displayAnimal(animal) {
  imageChoice.innerHTML = `<img id="postImage" src="images/${animal}.png"></img>`
  showAnimals.innerHTML = ""
 
}

//function to save post information from community page to Firebase
function getInfo() {

  let messageTB = document.getElementById("messageTB")
  let image = document.getElementById("postImage").src
  let postContent = messageTB.value

  savePost(image, postContent)
  messageTB.value = messageTB.defaultValue
}

//function to save post to firestore
function savePost(image, message) {
  let date = Date() 
  db.collection("posts").add({ 
    date: date,
    name: "Guest",
    image: image,
    message: message,
  })
    .then(function (docRef) {
      console.log("updated post to firestore")
      listPreviousPosts() //will update list of previous posts
    })
    .catch(function (error) {
      console.log("error loading to post")
    })
}

//update list of previous posts 
function listPreviousPosts() {
  previousPosts.innerHTML = ""

  db.collection("posts").orderBy("date").get().then((snapshot) => { 
    snapshot.forEach((doc) => {
      let post = doc.data()
      let postDetail =
        `<div class="postListPosts">
           <div class="postListImage"> <img src=${post.image}></img></div>
           <div class="postListPosting"> ${post.name}: ${post.message} </div>
        </div>`
        
        previousPosts.insertAdjacentHTML("afterbegin", postDetail)
    })
    
  })
}

//post meditation information to Firestore

function postMeditation(theme) {
  let message = `just started meditating to the sounds of the ${theme}`
  let date = Date() 

  if (theme == "Rain") {
    var image = "images/Rain.png"
  } else if (theme == "Ocean") {
    var image = "images/Ocean.png"
  } else {
    var image = "images/Forest.png"
  }

    db.collection("posts").add({
      
      date: date, 
      name: "A community member",
      image: image,
      message: message,
    })
      .then(function (docRef) {
        console.log("updated post to firestore")
        listPreviousPosts() //will update list of previous posts
      })
      .catch(function (error) {
        console.log("error loading to post")
      })
}

function enterSite() {
  location.href = "meditation.html"
}


const app = () => {

  // Get the elements
  const song = document.querySelector(".song");
  const play = document.querySelector(".play");
  const outline = document.querySelector(".moving-outline circle");
  const video = document.querySelector(".vid-container video");

  // Sounds
  const sounds = document.querySelectorAll(".sound-picker button");

  // Time Display
  const timeDisplay = document.querySelector(".time-display");
  const timeSelect = document.querySelectorAll(".time-select button");

  // Get the length of the outline
  const outlineLength = outline.getTotalLength();

  // Duration
  let fakeDuration = 600;

  outline.style.strokeDasharray = outlineLength;
  outline.style.strokeDashoffset = outlineLength;

  // Pick different sounds
  sounds.forEach(sound => {
      sound.addEventListener("click", function () {
          song.src = this.getAttribute("data-sound");
          
          let p = this.firstElementChild.alt
          if (p == "rain") {
            var theme = "Rain"
          } else if (p == "Ocean") {
            var theme = "Ocean"
          } else {
            var theme = "Forest"
          }

          checkPlaying(song);
          postMeditation(theme)
      });
  });

  // Play sound
  play.addEventListener("click", () => {
      checkPlaying(song);
  });

  // Select sound
  timeSelect.forEach(option => {
      option.addEventListener('click', function () {
          fakeDuration = this.getAttribute("data-time");
          timeDisplay.textContent = `${Math.floor(fakeDuration / 60)}:${Math.floor(fakeDuration % 60)}`;
      })
  });


  // Function for stop and play sound
  const checkPlaying = song => {
      if (song.paused) {
          song.play();
          play.src = "svg/pause.svg";
      } else {
          song.pause();
          play.src = "svg/play.svg";
      }
  }

  // We can animate the circle
  song.ontimeupdate = () => {
      let currentTime = song.currentTime;
      let elapsed = fakeDuration - currentTime;
      let seconds = Math.floor(elapsed % 60);
      let minutes = Math.floor(elapsed / 60);

      // Animate the circle
      let progress = outlineLength - (currentTime / fakeDuration) * outlineLength;
      outline.style.strokeDashoffset = progress;

      // Animate the text
      timeDisplay.textContent = `${minutes}:${seconds}`;

      if (currentTime >= fakeDuration) {
          song.pause();
          song.currentTime = 0;
          play.src = "svg/play.svg";
      }
  }
};

app();