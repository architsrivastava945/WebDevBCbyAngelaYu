var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var randomNumber;
var currentButton;
var userChoosenPattern = [];
var level = 0;
var start = false;
var archit = false;

var nextJs = function() {
    randomNumber = Math.floor(Math.random()*4);
}

var randomChosenColour = function() {
    currentButton = buttonColors[randomNumber];
    gamePattern.push(currentButton);
}

var playSound = function(naam) {
    var audio = new Audio("./sounds/"+naam+".mp3");
    audio.play();
}

var nextSequence = function() {
    nextJs();
    randomChosenColour();  
    $("#" + currentButton).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(currentButton);
    level++;
    $("h1").text("Level "+level);
    console.log("game : "+gamePattern);
    userChoosenPattern = [];
}

var animatePress = function(currentColor) {
    $("."+currentColor).addClass("pressed");
    setTimeout(function() {
        $("."+currentColor).removeClass("pressed");
    },100);
}

var startOver = function() {
    gamePattern = [];
    start = false;
    level = 0;
    archit = false;
    // $("#Archit").css("display","block");
    $("#Archit").toggle();
}

var compareArray = function(idx) {
    if(archit) {
        if(gamePattern.length === userChoosenPattern.length){
            setTimeout(nextSequence,1000);
        }
    }
    else {
        if (gamePattern[idx] === userChoosenPattern[idx]) {
            console.log("success");
            if (gamePattern.length === userChoosenPattern.length) {
                setTimeout(nextSequence,1000);
            }
        }else{
            $("h1").text("You lost at level "+ level);
            playSound("wrong");
            $("body").addClass("game-over");
            setTimeout(function() {
                $("body").removeClass("game-over");
            },200);
            startOver();
        }
    }
}

$(".btn").click(function() {
    var userChoosenColor = $(this).attr('id');
    animatePress(userChoosenColor);
    playSound(userChoosenColor);
    userChoosenPattern.push(userChoosenColor);
    console.log("user : "+userChoosenPattern);
    compareArray(userChoosenPattern.length - 1);
});

$(document).keypress(function() {
    if (!start){
        start = true;
        console.log("start");
        $("h1").text("Level "+level);
        nextSequence();
    }
});

$("#Archit").click(function() {
    archit=true;
    // $("#Archit").css("display","none");
    $("#Archit").toggle();
});