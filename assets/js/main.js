// Main sections
let highscoreView = document.querySelector("#highscoreView");
let timerView = document.querySelector("#timerView");
let startInfo = document.querySelector("#startInfo");
let allDone = document.querySelector("#allDone");
let finalScore = document.querySelector("#finalScore");
let questionShow = document.querySelector("#questionShow");
let answerButtons = document.querySelector("#answerButtons");
let correctOrWrong = document.querySelector("#correctOrWrong");

// Buttons
let startButton = document.querySelector("#startButton");
let initialsSubmitButton = document.querySelector("#initialsSubmitButton");

// Text inputs
let initials = document.querySelector("#initials");

allDone.style.display = "none";
let timer = 0;
let secconds = 50;
let questionTime = secconds;
let randomNr;
let correctAnswer;

let score = {
    player: "",
    correctAnsw: 0,
    wrongAnsw: 0,
    timeScore: 0,
}

let scoresArray = [];
scoresArray = JSON.parse(localStorage.getItem("scoresArray"));
if (scoresArray === null) {
     scoresArray = [];
    }

// Quiz questions / answers - correct
let quizArrayOriginal= [{'question': 'first', 'answers': ["one1", "two1", "three1", "fffffffffour1", 0]},
                        {'question': 'second', 'answers': ["ooooooooooone2", "two2", "three2", "four2", 1]},
                        {'question': 'third', 'answers': ["one3", "ttttttttttttwo3", "three3", "four3", 2]},
                        {'question': 'fourth', 'answers': ["one4", "two4", "tttttttttthree4", "four4", 3]},];

// making a quiz array copy to work with
let quizArray = [];
quizArray.push.apply(quizArray, quizArrayOriginal);
         

// checking if the the pressed button is correct answer
answerButtons.addEventListener("click", function(event) {
    let button = event.target;
        if (button.matches("button")) {
            let state = button.getAttribute("data-state");
            if (state === "true") {
                correctOrWrong.appendChild(createHTMLelement("Correct", "p"));
                // showCorrectWrongMessage();
                score.correctAnsw++;
                showCorrectWrongMessageDelay();
            } else {              
                correctOrWrong.appendChild(createHTMLelement("Wrong", "p"));
                // showCorrectWrongMessage();
                questionTime -= 10;
                score.wrongAnsw++;
                showCorrectWrongMessageDelay();
            }
        }
});

// message corect or wrong answer
function showCorrectWrongMessageDelay() {
    correctOrWrong.style.borderTop = "1px solid #505050";
    if (quizArray.length === 0) {
        setTimeout(() =>{
            correctOrWrong.innerHTML = "";
            correctOrWrong.style.borderTop = "0px";
            ifNoMoreQuestions();
        },500);
    } else {
        // let inactiveButtons = document.querySelectorAll(".amswButtons");
        // for (i = 0; i < inactiveButtons.length; i++) {
        //     inactiveButtons[i].disable = true;     
        // }
        // console.log(inactiveButtons);
        setTimeout(() =>{
            correctOrWrong.innerHTML = "";
            correctOrWrong.style.borderTop = "0px";
            startNextQuestion();
        },500);
    }
}

//start quiz button
startButton.addEventListener("click", startTimer);

function startTimer () {   
    startNextQuestion()
    timerView.append(createHTMLelement(questionTime + " second(s) remaining", "p"));
    timer = setInterval(() => {
        questionTime--;
        timerView.innerHTML = questionTime + " second(s) remaining";
        if (questionTime <= 0) {
            ifNoMoreQuestions()
        } 
    }, 1000);
}


function createHTMLelement(x,elem) {
    let newElement = document.createElement(elem); 
    newElement.textContent = x;
    return newElement;
}

function createRandomNr() {
    randomNr = Math.floor(Math.random() * quizArray.length);
}

// preapare questions and answers
function setQuestion() {
    removingChildrens(questionShow);
    removingChildrens(answerButtons);
    startInfo.style.display = "none";
    allDone.style.display = "none";
    questionShow.append(createHTMLelement(quizArray[randomNr].question, "p"));
    correctAnswer = quizArray[randomNr].answers[4];
    for (i = 0; i < quizArray[randomNr].answers.length - 1; i++) {
        answerButtons.append(createHTMLelement(quizArray[randomNr].answers[i], "button"));
        answerButtons.children[i].setAttribute("class", "amswButtons");
        if (correctAnswer === i) {
            answerButtons.children[i].setAttribute("data-state", "true");
        }
        else {
            answerButtons.children[i].setAttribute("data-state", "false");
        }
    }
}

function removingChildrens(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

function startNextQuestion() {
    createRandomNr();
    setQuestion();
    quizArray.splice(randomNr, 1);
}

//collecting and writing score results
function writeScore () {
    initialsSubmitButton.addEventListener("click", function() {
        if (document.getElementById("initials").value.trim() < 1){
            allDone.appendChild(createHTMLelement("You need to enter name", "p"));
        } else {
            score.player = document.getElementById("initials").value;
            scoresArray.push(score);
            localStorage.setItem("scoresArray", JSON.stringify(scoresArray));
            location.href = "./assets/html/highscore.html";
        }     
    });
}


function ifNoMoreQuestions(){
    if (questionTime < 0) {
        questionTime = 0;
    } else {
        score.timeScore = questionTime;
    }
    writeScore ();
    clearInterval(timer);
    finalScore.textContent = score.timeScore;
    allDone.style.display = "block";
    questionShow.style.display = "none";
    answerButtons.style.display = "none";
    correctOrWrong.style.display = "none";
    // initials.value = "";
}

