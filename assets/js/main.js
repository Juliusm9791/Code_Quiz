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
let highScoreClearButton = document.querySelector("#highScoreClearButton");

// Text inputs
let initials = document.querySelector("#initials");

let timer = 0;
let questionTime = 50;
let randomNr;
let correctAnswer;

let score = {
    player: "",
    correctAnsw: 0,
    wrongAnsw: 0,
    timeScore: 0,
}

let scoresArray = [];


// Quiz questions / answers
let quizArray= [{'question': 'first', 'answers': ["one1", "two1", "three1", "fffffffffour1", 0]},
                {'question': 'second', 'answers': ["ooooooooooone2", "two2", "three2", "four2", 1]},
                {'question': 'third', 'answers': ["one3", "ttttttttttttwo3", "three3", "four3", 2]},
                {'question': 'fourth', 'answers': ["one4", "two4", "tttttttttthree4", "four4", 3]},];
           
                

answerButtons.addEventListener("click", function(event) {
    let button = event.target;
   
        if (button.matches("button")) {
            let state = button.getAttribute("data-state");
            if (state === "true") {
                correctOrWrong.appendChild(createHTMLelement("Correct", "p"));
                score.correctAnsw++;
                console.log(score.correctAnsw, "corrrrr")
                if (quizArray.length === 0) {
                    ifNoMoreQuestions();
                } else {
                    startNextQuestion()
                }
            } else {              
                correctOrWrong.appendChild(createHTMLelement("Wrong", "p"));
                questionTime -=10;
                score.wrongAnsw++;
                console.log(score.correctAnsw, "wrwwww")
                if (quizArray.length === 0) {
                    ifNoMoreQuestions();
                } else {
                    startNextQuestion()
                }
            }
        }
  
});

  
  
  
//   function getFromStorage() {
//       let quizArrayFormMemory = JSON.parse(localStorage.getItem("quizArray"));
//       if (quizArrayFormMemory !== null) {
//           // document.querySelector(".message").textContent = lastGrade.student +  " received a/an " + lastGrade.grade
//     }
// }


// Event Listeners
startButton.addEventListener("click", startTimer);


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
    startInfo.style.display = "none";
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
    initialsSubmitButton.addEventListener("click", readvalues)

    function readvalues(){
        score.player = document.getElementById("initials").value;
        console.log(score.player);
        scoresArray.push(score);
        localStorage.setItem("scoresArray", JSON.stringify(scoresArray));
    }
}

function ifNoMoreQuestions(){
    if (quizArray.length === 0) {
        score.timeScore = questionTime;
        writeScore ();
        clearInterval(timer);
        allDone.style.display = "block";
        questionShow.style.display = "none";
        answerButtons.style.display = "none";
        correctOrWrong.style.display = "none";
    }
}