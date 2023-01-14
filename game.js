
var colors=["red","blue","green","yellow"];
var sequence=[];
var enteredsequence=[];
var level=0;
var started=false;

//start game by pressing a key
$(document).keypress(function(){
  if (started===false){
    started=true;
    $("h1").text("Level "+level);
    nextSequence();
  }
});

//generates random number and saves it in sequence
function nextSequence(){
  enteredsequence=[];

  level++;
  $("h1").text("Level "+level);

  var randomnum=Math.floor(Math.random()*4);
  var randomcolor=colors[randomnum];
  sequence.push(randomcolor);

  $("#"+randomcolor).fadeOut("fast").fadeIn("fast");
  var audio=new Audio("sounds/"+randomcolor+".mp3");
  audio.play();
}

//when a color is clicked
$(".btn").click(function(){
  var userchosencolor=$(this).attr("id");

  enteredsequence.push(userchosencolor);

  $("#"+userchosencolor).addClass("pressed");
  setTimeout(function(){
    $("#"+userchosencolor).removeClass("pressed");
  },100);

  var audio= new Audio("sounds/"+userchosencolor+".mp3");
  audio.play();
  $(this).fadeOut("fast").fadeIn("fast");

  checkAnswer(enteredsequence.length-1);
})

//check answer
function checkAnswer(currentindex){
  if (enteredsequence[currentindex]===sequence[currentindex]){
    console.log("success");

    if (enteredsequence.length===sequence.length){
      setTimeout(function(){
        nextSequence();
      },1000);
    }
  }
  else{
    console.log("wrong");
    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
    },200);
    $("h1").text("Game Over, Press any key to restart");
    var audio=new Audio("sounds/wrong.mp3");
    audio.play();

    $(document).keypress(function(){
      startOver();
    });
  }
}

//reset values
function startOver(){
  level=0;
  started=false;
  sequence=[];
  nextSequence();
}
