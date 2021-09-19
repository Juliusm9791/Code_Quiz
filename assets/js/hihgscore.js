let highScoreList = document.querySelector("#highScoreList");
let highScoreGoBackButton = document.querySelector("#highScoreGoBackButton");
let restartButton = document.querySelector("#clearButton");
let backToMainPage = document.querySelector("#backToMainPage");

let topScoreList = 5; // top ten view

let scoresArray = [];

scoresArray = JSON.parse(localStorage.getItem("scoresArray"));
if (scoresArray === null) {
    scoresArray = [];
   }
scoresArray.sort((a, b) => b.timeScore - a.timeScore);
generateHigsoreTable();

// Creating score table
function generateHigsoreTable(){
for (i = 0; i < scoresArray.length; i++){
    if (i <= (topScoreList - 1)) {
        highScoreList.append(createHTMLelement ("", "tr"));
        highScoreList.children[i + 1].append(createHTMLelement ((i + 1 + "."), "td"));
        highScoreList.children[i + 1].appendChild(createHTMLelement (scoresArray[i].player, "td"));
        highScoreList.children[i + 1].appendChild(createHTMLelement (scoresArray[i].timeScore, "td"));
        highScoreList.children[i + 1].appendChild(createHTMLelement (scoresArray[i].correctAnsw, "td"));
        highScoreList.children[i + 1].appendChild(createHTMLelement (scoresArray[i].wrongAnsw, "td"));
        }
    }
}

function createHTMLelement(x,elem) {
    let newElement = document.createElement(elem); 
    newElement.textContent = x;
    return newElement;
}

restartButton.addEventListener("click", function(){
    localStorage.clear("scoresArray");
    location.reload();
});

backToMainPage.addEventListener("click", function(){
    location.href = "../../index.html";
}); 