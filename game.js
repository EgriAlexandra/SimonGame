var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;

// Detec when a kewboard has been pressed
$(document).keydown(function() {
// When the game will start, the title will change and will call the nextSequence function functionName
  if (!started) {
    $("#level-title").text("Level" + level);
    nextSequence();
    started = true;
  }
});
// Detect when any of the buttons is pressed
$(".btn").click(function() {
  //Store the id of the button that got clicked
  var userChosenColour = $(this).attr("id");
  // Add the contents of the variable userChosenColour to the end of the new userClickedPattern
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  //Call function checkAnswer for user clicks, passing of the last answer
  checkAnswer(userClickedPattern.length-1);
});


function nextSequence() {
  // level increase every time nextSequence is called
  userClickedPattern=[];
  level++;
  $("#level-title").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColors[randomNumber];
//Add the new randomChosenColour to the empty gamePattern array
  gamePattern.push(randomChosenColour);
//Select the button with the same id as the randomChosenColour and make it flash
  $("#" + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
// Add function playSound
  playSound(randomChosenColour);
}
//Create a function that play the sound for the color button slected
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}
// Create a new function to animate the user clicks
function animatePress(currentColor) {
  // Add and remove class pressed after 100ms
  $("#" + currentColor).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

// Create a function that check the answer for every level
function checkAnswer(currentLevel) {
//Check the most recent user answer
if(userClickedPattern[currentLevel]===gamePattern[currentLevel]){
  console.log("succes");
  //Check if they finished the sequence
  if(userClickedPattern.length===gamePattern.length){
    // Call the nextSequence function after 1s
    setTimeout(function(){
      nextSequence();
    },1000);
  }
}
else{
  // Play wrong audio
  var wrong = new Audio("sounds/wrong.mp3");
  wrong.play();
  // Add and remove game-over cass after 200ms
  $("body").addClass("game-over");
  setTimeout(function() {
    $("body").removeClass("game-over");
  }, 200);
  // Change the title
  $("#level-title").text("Game Over, Press Any Key to Restart");
  // Call function to restart the game
  startOvert();
}
}

// Create a funtion to restart the game
function startOvert(){
  // Rest function
  level=0;
  gamePattern=[];
  started=false;

}
