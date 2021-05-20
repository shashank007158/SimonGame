
var name=prompt("Enter your Name:");
var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started=false;
var level=0;

$(document).on("keypress",function(){
  if(!started)
  {

    $("#level-title").text("Level "+level);
    nextSequence();
    started=true;
  }
});

$(".btn").click(function() {
  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userClickedPattern.length -1);
});



function nextSequence() {

  userClickedPattern=[];
  level++;
  if(level%10===0)
  {
    $("#level-title").text("Level "+level+" reached..."+name.toUpperCase()+" ,You are a Pro!!");
  }
  else if(level%5===0)
  {
    $("#level-title").text("Level "+level+" reached... Go on "+name.toUpperCase()+" You can do it");
  }
  else
  {
    $("#level-title").text("Level "+level);
  }
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    $("#"+randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
      playSound(randomChosenColor);
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function checkAnswer(currentLevel)
{
  if(userClickedPattern[currentLevel]===gamePattern[currentLevel])
  {
    if(userClickedPattern.length===gamePattern.length)
    {
      setTimeout(function(){
        nextSequence();
      },1000);
    }
  }
  else
  {
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
    },200);
      $("#level-title").text("Game Over,Press Any Key to Restart");
      startOver();
  }
}

function startOver()
{
  level=0;
  gamePattern=[];
  started=false;
}
