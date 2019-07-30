// const startGameBtn = document.getElementById('level-selector')
const letters = document.querySelector('#letters')
const loginInput = document.getElementById('submit')
const levelSelect = document.getElementById('level-group')
const wordList = document.getElementById("word-list")
const gameInput = document.getElementById("game-input")
const inputForm = document.getElementById("input-form")
const timer = document.getElementById('timer')
const playDiv = document.getElementById('play-div')
const score = document.getElementById('score')
const gameOver = document.getElementById('game-over')

let currentScore = 0

playDiv.addEventListener('click', function(){
    let gameOn = document.querySelector('#game')
    gameOn.classList.remove('hide')
    let clickPlay = document.getElementById('play-div')
    clickPlay.classList.add('hide')
})

let possibilites = []

inputForm.addEventListener('submit', submitWord)


// startGameBtn.addEventListener('click', startGame)
loginInput.addEventListener('click', userLogin)

function startGame(level){
    fetch(`http://localhost:3000/games/${level}`)
    .then(function(response){
        return response.json()
    })
    .then(function(json){
        console.log(json);
        json.letters.forEach(letter =>{
            // letters.innerText = ""
            letters.innerText += " " + letter
        })
        possibilities = json.possibilities
        playDiv.classList.remove('hide')
        setTimer()
    })

}


function userLogin(event){
   let userInput = document.querySelector('#login-input').value;
   console.log(userInput)
    fetch(`http://localhost:3000/users`, {
        method: `POST`,
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            username: userInput
        })
    }).then(res => res.json())
    .then(res => {
        // hide:login, welcome
        // show:welcome, level
        let element = document.getElementById('login')
        hideElement(element)
        let next= document.getElementById('welcome')
        showElement(next)
        let addName = document.querySelector('#welcome h2')
        addName.innerText += " " + res.username.charAt(0).toUpperCase() + res.username.slice(1) + "!";
        let level = document.getElementById('level-group')
        showElement(level)
        let welcome = document.getElementById('intro')
        hideElement(welcome)
    })
    .then(addLevelSelectListener(event))
}

function addLevelSelectListener(event){
    // debugger
    levelSelect.addEventListener('click', chooseLevel)
}
function chooseLevel(event){
   const level = event.target.id
//    showElement(game)
   hideElement(levelSelect)
    // debugger
   if (level === 'easy') {
        startGame(level)
   }
   else if (level === 'medium'){
        startGame(level)
   }
   else if (level === 'hard'){
        startGame(level)
   }
}


function submitWord(event){
    let submittedWord = event.target.firstElementChild.value
    // debugger
    if (possibilities.includes(submittedWord)){
        gameInput.value = ''
        currentScore += submittedWord.length
        score.innerText = currentScore
        console.log(currentScore)
        addWordToWordList(submittedWord)
    }
    else {
        gameInput.value = ''
        gameInput.placeholder = "Invalid word";
    }

}

function addWordToWordList(submittedWord) {
    const newWord = document.createElement('li')
    newWord.innerText = submittedWord
    wordList.appendChild(newWord)
}

function rejectWord(){
    
}

// Hide element
function hideElement(element){
    element.classList.add('hide')
}

// Show element
function showElement(next){
    next.classList.remove('hide')
}


function setTimer(){
    // Set the date we're counting down to
var countDownDate = new Date().getTime() + 60000;

// Update the count down every 1 second
var x = setInterval(function() {

 // Get today's date and time
 var now = new Date().getTime();

 // Find the distance between now and the count down date
 var distance = countDownDate - now;

 // Time calculations for days, hours, minutes and seconds
 var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
 var seconds = Math.floor((distance % (1000 * 60)) / 1000);

 // Output the result in an element with id="demo"
 timer.innerHTML ='0' + minutes + " : " + seconds;

 // If the count down is over, write some text
 if (distance < 0) {
   clearInterval(x);
   document.getElementById("timer").innerHTML = "Times Up!";
   timeUp()
 }
}, 1000);
}

function timeUp(){
    // hide
    hideElement(game)
    // show
    showElement(gameOver)
    document.getElementById('return-score').innerText += " " + currentScore
    document.querySelector('#click-to-restart').addEventListener('click', function(){
        hideElement(gameOver)
        hideElement(game)
        showElement(levelSelect)
    })
    
}
