var enddiv = document.createElement("div");
var highScoreArray= JSON.parse(localStorage.getItem("highScoreArray"))    
console.log(highScoreArray);
var timeEl = document.createElement("h3");
var startButton = document.getElementById("start-button");
var sameGameEl = document.querySelector(".start-game");
timeEl.setAttribute("id", "timeEl");
var time = 60;
var questionCard = document.querySelector(".question-card")

//Start Game Function
function startGame() {
    sameGameEl.classList.add("hide");
    questionCard.classList.remove("hide");
    createCard()
}
//Named the timeInterval so have a variable to use for clear interval. (Timer)
var timeInterval = setInterval(function () {
    time--;
    if (time < 0) {
        time = 0
    }

    timeEl.textContent = time;
}, 1000)

//Questions
var questions = [
    {
        questionText: "1. What are the two basic groups of dataypes in JavaScript?",
        choices: ["a. Primitive", "b. Reference types", "c. None of the above", "d. All of the above"],
        answer: "d. All of the above"
    },

    {
        questionText: "2. Which symbol is used for comments in Javascript?",
        choices: ["a. \* *\ ", "b. \* */ ", "c. \\ ", "d. // "],
        answer: "d. // "
    },

    {
        questionText: "3. Which built-in method calls a function for each element in the array??",
        choices: ["a. while()", "b. forEach()", "c. loop()", "d. None of the above."],
        answer: "b. forEach()"
    },

    {
        questionText: "4. Which of the following is not JavaScript data type?",
        choices: ["a. Undefined", "b. Float", "c. Boolean", "d. Number"],
        answer: "b. Float"
    },

    {
        questionText: "5. Inside which HTML element do we put the JavaScript?",
        choices: ["a. <script>", "b. <head>", "c. <meta>", "d. <style>"],
        answer: "a. <script>"
    },
];

var score = 0;

var qi = 0;
//Function that builds the question that runs each time we run the function
function createCard() {
    questionCard.innerHTML = ""
    var h2element = document.createElement('h2');
    var buttonBox = document.createElement("div");
    buttonBox.setAttribute("class","button-box");
    h2element.textContent = questions[qi].questionText;

    //Loops over choices array and creates a button for each choice
    questions[qi].choices.forEach(function (choice) {
        var btnEl = document.createElement("button");
        btnEl.textContent = choice;
        btnEl.setAttribute("value", choice);
        btnEl.onclick = checkAnswer;
        buttonBox.appendChild(btnEl);
    });
    //Help with spacing and relative positioning
    var spanEl = document.createElement("span");
    spanEl.appendChild(timeEl);

    //Appending question elements to the page
    questionCard.appendChild(spanEl);
    questionCard.appendChild(h2element);
    questionCard.appendChild(buttonBox);
}

//Tells if right/wrong
function checkAnswer() {
    console.log(this.value);
    if (this.value !== questions[qi].answer) {
        console.log("wrong");
        time -= 10;
        timeEl.textContent = time;
        if (time <= 0) {
            endgame()
        }
    }
    else {
        console.log("right");
        score++;
        console.log(score); 
    } 
    // Increase index (start at 0 and keep moving up) to move to next question
    qi++;
    // Checks returning questions, first one will end the game and second will build a card (moves to next question)
    if (qi === questions.length) {

        endgame()
    } else {
        createCard()
    }
}

// End game functionality
function endgame() {
    questionCard.setAttribute("style", "display: none");
    clearInterval(timeInterval);
    timeEl.setAttribute("style", "display: none");
    buildEndScreen()
}

//End game screen 
function buildEndScreen() {
    var totalScore = score * time;
    console.log(totalScore);
    var main = document.querySelector(".main");
    var label = document.createElement("label");
    label.textContent = "initials";
    label.setAttribute("for", "initials");
    var input = document.createElement("input");
    var button = document.createElement("button");
    button.textContent="save";
    // input.innerHTML="submit";
    input.setAttribute("type","text");
    button.setAttribute("type","button");
    input.setAttribute("name", "initials");
    
    button.onclick=function(){
        var highScore = {
            name: input.value,
            score: totalScore
        }
        console.log(highScore);
        highScoreArray.push(highScore);
        localStorage.setItem("highScoreArray",JSON.stringify(highScoreArray));
        getHighScore();
    }
    
    enddiv.innerHTML = "<h3>endgame " + totalScore + "</h3>";
    enddiv.setAttribute("class", "end-game");
    enddiv.appendChild(label);
    enddiv.appendChild(input);
    enddiv.appendChild(button);
    main.appendChild(enddiv);
}


function getHighScore() {
    highScoreArray.sort(function(a,b){
        return b.score-a.score;
    });
    var scoreList=document.createElement("ol");
    enddiv.appendChild(scoreList);
    highScoreArray.forEach(function(score){
        var li = document.createElement("li");
        console.log(score);
        li.textContent=score.name + " " + score.score;
        scoreList.appendChild(li);
    })
    console.log(highScoreArray);

    //retrieve scores from local storage
}
 
var container = document.querySelector('body, timeEl');
var quest = document.querySelector('body questionCard');

startButton.addEventListener("click", startGame);