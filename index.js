
// Set up array with images
var randomImage = [ "images/benSwolo.jpg",
                    "images/benSwolo.jpg",
                    "images/bigChungus.png",
                    "images/bigChungus.png",
                    "images/evilPatrick.jpg",
                    "images/evilPatrick.jpg",
                    "images/frodo.jpg",
                    "images/frodo.jpg",
                    "images/gandalfLaughing.jpg",
                    "images/gandalfLaughing.jpg",
                    "images/jarJarThanos.jpg",
                    "images/jarJarThanos.jpg",
                    "images/jesus.jpg",
                    "images/jesus.jpg",
                    "images/surprisedPikachu.png",
                    "images/surprisedPikachu.png" ];

// Get all the div elements with the item lass into a collection
var divs = document.querySelectorAll("div.pairCard");

// Convert the collection into an array so that we can loop with .forEach
var divArray = Array.prototype.slice.call(divs);

// Loop over the Array
divArray.forEach(function(div) {
  // Get a random number from 0 to the highest index in the array
  var randomNum = Math.floor(Math.random() * randomImage.length);
  // Set the backgroundImage property to the random image
  div.style.backgroundImage = "url(" + randomImage[randomNum] + ")";
  // Removes the random image from the array so it can't be duplicated
  randomImage.splice(randomNum, 1);
});

// 'Hides' the images after 1 secs
setTimeout(function(){ $("div.pairCard").css("background-size", "0"); }, 1000);

// Adds a click function which 'reveals' image
function revealCard (divNumber) {
  $("#div" + divNumber).click(function () {
    $("#div" + divNumber).css("background-size", "cover");
  });
}

// Loops through divs and adds the revealCard function
for ( x=1; x<=16; x++ ){
  revealCard(x);
}

var score = 0;
var tries = 0;
var firstGuess = [];
var secondGuess = [];
var clicks = 0;
var globalFirstIdGuess = " ";

$("#resetBtn").hide();

$('.pairCard').click(function() {
    if (clicks == 0) {
        // first click
            var firstUserGuess = $(this).css("background-image");
            var firstIdGuess = $(this).attr("id");
            // Store 'firstIdGuess' in global variable so it can be identified in checking
            globalFirstIdGuess = firstIdGuess;
            firstGuess.push(firstUserGuess);
            // Stops user from clicking on the same image
            $("#" + firstIdGuess).addClass("disable-click");
            console.log("First click: " + firstUserGuess);
            console.log("ID: " + firstIdGuess);
    } else {
        // second click
            var secondUserGuess = $(this).css("background-image");
            var secondIdGuess = $(this).attr("id");
            secondGuess.push(secondUserGuess);
            console.log("Second click: " + secondUserGuess);
            console.log("ID: " + secondIdGuess);
            // Stops spam clicking
            $(".pairCard").addClass("disable-click");
            setTimeout(function () {
              $(".pairCard").removeClass("disable-click");
            }, 1000);
              // Checks cards
              if (firstGuess[0] == secondGuess[0]) {
                console.log("success");
                // Adds 'matched class' which disables clicks
                $("#" + globalFirstIdGuess).addClass("matched");
                $("#" + secondIdGuess).addClass("matched");
                score++;
                $("#score").text("Score: " + score);
                resetGuesses();
                attempts();
              }
                else {
                  console.log("wrong");
                  setTimeout(function(){ $("#" + globalFirstIdGuess).css("background-size", "0"); }, 1000);
                  setTimeout(function(){ $("#" + secondIdGuess).css("background-size", "0"); }, 1000);
                  resetGuesses();
                  attempts();
                }
    }
    ++clicks;
    // Reset clicks after second click
    if (clicks == 2) {
      clicks = 0;
    }
});

// Reset guess arrays
function resetGuesses() {
  firstGuess = [];
  secondGuess = [];
}

// Displays message
var tryOrTries = "try";
function attempts() {
  tries++;
  if (tries > 1) {
    tryOrTries = "tries";
  }
  $("#score").text("You found " + score + " out of 8 pairs with " + tries + " " + tryOrTries + ".");
  if (score == 8) {
    $("#resetBtn").show();
    $("#score").text("You found all the pairs with " + tries + " " + tryOrTries + "!");
  }
}










































//
