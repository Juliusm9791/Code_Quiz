// Main sections
let highscoreView = document.querySelector("#highscoreView");
let timerView = document.querySelector("#timerView");
let startInfo = document.querySelector("#startInfo");
let allDone = document.querySelector("#allDone");
let fillScore = document.querySelector("#fillScore");
let questionShow = document.querySelector("#questionShow");
let answerButtons = document.querySelector("#answerButtons");
let correctOrWrong = document.querySelector("#correctOrWrong");



// Buttons
let startButton = document.querySelector("#startButton");
let initialsSubmitButton = document.querySelector("#initialsSubmitButton");
let highScoreGoBackButton = document.querySelector("#highScoreGoBackButton");
let restartButton = document.querySelector("#restartButton");

// Text inputs
let initials = document.querySelector("#initials");

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
// getFromStorage();

// function getFromStorage() {
//     scoresArray = JSON.parse(localStorage.getItem("scoresArray"));
//     // if (scoresArray !== null) {
//     //     return;
//     // document.querySelector(".message").textContent = lastGrade.student +  " received a/an " + lastGrade.grade
//     // }
// }


// Quiz questions / answers
let quizArrayOriginal= [{'question': 'first', 'answers': ["one1", "two1", "three1", "fffffffffour1", 0]},
                        {'question': 'second', 'answers': ["ooooooooooone2", "two2", "three2", "four2", 1]},
                        {'question': 'third', 'answers': ["one3", "ttttttttttttwo3", "three3", "four3", 2]},
                        {'question': 'fourth', 'answers': ["one4", "two4", "tttttttttthree4", "four4", 3]},];

let quizArray = [];
quizArray.push.apply(quizArray, quizArrayOriginal);
         
        
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
                questionTime -=10;
                score.wrongAnsw++;
                showCorrectWrongMessageDelay();
            }
        }
  
});

// Event Listeners
startButton.addEventListener("click", startTimer);

function showCorrectWrongMessageDelay() {
      correctOrWrong.style.borderTop = "1px solid #505050";
      if (quizArray.length === 0) {
        setTimeout(() =>{
            correctOrWrong.innerHTML = "";
            correctOrWrong.style.borderTop = "0px";
            ifNoMoreQuestions();
        },1000);
    } else {
        setTimeout(() =>{
            correctOrWrong.innerHTML = "";
            correctOrWrong.style.borderTop = "0px";
            startNextQuestion();
        },1000);
    }
}
function startTimer () {
    
    startNextQuestion()
    timerView.append(createHTMLelement(questionTime, "p"));
    timer = setInterval(() => {
        questionTime--;
        timerView.children[1].textContent = questionTime;
        if (questionTime <= 0) {
            clearInterval(timer);
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

function setQuestion() {
    console.log(quizArray.length, "ilgis")
    removingChildrens(questionShow);
    removingChildrens(answerButtons);
    startInfo.style.display = "block";
    allDone.style.display = "none";
    fillScore.style.display = "none";
    // questionShow.children[0].remove(); // h1 tag html TEMP
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

function writeScore () {
    let initialsSubmitButton = document.querySelector("#initialsSubmitButton");
    initialsSubmitButton.addEventListener("click", function() {
        score.player = document.getElementById("initials").value;
        console.log(score.player);
        console.log(score);
        scoresArray.push(score);
        localStorage.setItem("scoresArray", JSON.stringify(scoresArray));
        initialsSubmitButton.display = true;
       
    });
}

function ifNoMoreQuestions(){
    // if (quizArray.length === 0) {
        score.timeScore = questionTime;
        writeScore ();
        clearInterval(timer);
        allDone.style.display = "block";
        questionShow.style.display = "none";
        answerButtons.style.display = "none";
        correctOrWrong.style.display = "none";
        removingChildrens(timerView);
    // }
}

restartButton.addEventListener("click", function(){
    quizArray = []
    quizArray.push.apply(quizArray, quizArrayOriginal);
    initialsSubmitButton.display = false;
    questionTime = secconds;
}) 