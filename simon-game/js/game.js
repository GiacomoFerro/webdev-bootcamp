buttonColours = ["red", "blue", "yellow", "green"];
gamePattern = [];
userClickedPattern = [];
var level = 0;
var started = false;

$(document).keypress(function() {
  if (!started) {

    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColour) {
  $('#' + currentColour).addClass("pressed");

  setTimeout(function() {
    $('#' + currentColour).removeClass("pressed");
  }, 100);

}

function nextSequence() {

  level++;
  $("#level-title").text("Level " + level);

  randomNumber = Math.floor(Math.random() * (3 - 0 + 1));
  randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

  playSound(randomChosenColour);

  //console.log(gamePattern);

}

function startOver(){
  level=0;
  gamePattern=[];
  userClickedPattern=[];
  started = false;
}

function checkAnswer(currentLevel){

  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
      if (userClickedPattern.length === gamePattern.length){
        setTimeout(function () {
          nextSequence();
        }, 1000);
      }
    } else {
      playSound("wrong");
      $("body").addClass("game-over");
      $("#level-title").text("Game Over, Press Any Key to Restart");

      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);

      startOver();
    }

}

$(".btn").click(function() {
  userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length-1);
});
