var buttonColours = ["red", "blue", "green", "yellow"];//arrey of colours

var gamePattern = [];//empty pattern
var userClickedPattern = [];

var started = false;
var level = 0;


$(document).keypress(function() {
    if (!started){
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }   
    });

$(".btn").click(function() {
    var userChosenColour = $(this).attr("id");
userClickedPattern.push(userChosenColour);

playSound(userChosenColour);
animatedPress(userChosenColour);
checkAnswer(userClickedPattern.length - 1);

});

//rememner putting the name of function, here is nextSequence, otherwise: function doesn't work.
function nextSequence() {
    userClickedPattern = []; // why need to rewrite again this var?
    level++;
    $("#level-title").text("Level " + level);
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    
    $('#' + randomChosenColour).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);  
}
function animatedPress(currentColour){
    $("."+currentColour).addClass("pressed");

    setTimeout(function(){
        $("." + currentColour).removeClass("pressed")
    }, 100);
}

function playSound(name){
    var audio = new Audio ("sounds/" + name + ".mp3");
    audio.play();
}

function checkAnswer(currentLevel){

    // Check if last button clicked is right
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        console.log("success");
        if (userClickedPattern.length === gamePattern.length){
            setTimeout(function(){
                nextSequence();}, 1000);
        }
    }
    else {
        console.log("wrong");
        //can also use playSound("wrong")
        var wrong = new Audio ("sounds/wrong.mp3");
        wrong.play();

        $("body").addClass("game-over");
        $('h1').text("Game Over, Press Any key to Restart");

        setTimeout(function(){
            $("body").removeClass("game-over");
    }, 200);
    startOver();
    }
}

function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
}
