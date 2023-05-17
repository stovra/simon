var gamePattern = [];
var buttonColors = ['red', 'blue', 'green', 'yellow'];
var userClickedPattern = [];
var level = 0;
var isStarted= false;

$(".btn").on("click", function(){
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length-1);
});

function nextSequence() {
  userClickedPattern = [];
  level++;
  $("h1").text("Level "+ level);
  var randomNumber = Math.random() * 4;
  randomNumber = Math.floor(randomNumber);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  $("#" + randomChosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColor);

}

function playSound(color) {
  var audio = new Audio("sounds/" +color+ ".mp3");
  audio.play();
}

function checkAnswer(currentLevel){
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
      console.log("success");
      if (userClickedPattern.length === gamePattern.length){
        setTimeout(function () {
          nextSequence();
        }, 1000);
    }
  } else {
      playSound("wrong");
      $("body").addClass("game-over");
      $("h1").text("Game Over, Press Any Key to Restart");
      setTimeout(function() {
        $("body").removeClass("game-over");
      }, 200);

      startOver();

    }
}

function animatePress(currentColour) {
  $(".btn").on("click", function() {
    var button = $(this);
    button.addClass("pressed");
    setTimeout(function() {
      button.removeClass("pressed");
    }, 100);
  });
}


$("body").on("keypress", function(){
  if(!isStarted){
    nextSequence();
    isStarted = true;
  }
});
function startOver(){
  level = 0;
  gamePattern = [];
  isStarted = false ;
};
