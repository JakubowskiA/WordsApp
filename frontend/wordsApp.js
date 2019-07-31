// const startGameBtn = document.getElementById('level-selector')
const letters = document.querySelector('#letters')
const loginForm = document.getElementById('login-form')
const levelSelect = document.getElementById('level-group')
const wordList = document.getElementById("word-list")
const gameInput = document.getElementById("game-input")
const inputForm = document.getElementById("input-form")
const timer = document.getElementById('timer')
const playDiv = document.getElementById('play-div')
const score = document.getElementById('score')
const gameOver = document.getElementById('game-over')
const leaderboard = document.getElementById('leaderboard')
const returnScore = document.getElementById('return-score')
const navBar = document.getElementById('navbar')
const login = document.getElementById('login')
let userID;
let currentScore = 0
let leaders = {}

function fetchLeaderBoard(){
    fetch(`http://localhost:3000/users`)
    .then(res => res.json())
    .then(res => {
        createLeaderboard(res)
    })
}

function addNavListeners(res) {
    navBar.addEventListener('click', chooseNav)
}

function chooseNav(event) {
    let nameAdd = document.querySelector('#welcome h2')
    const navSelect = event.target.id
       if (navSelect === 'login-nav') {
        hideElement(welcome) 
        hideElement(rules)  
        leaderboard.classList.remove('row')
        hideElement(leaderboard) 
        showElement(login)
       }
       else if (navSelect === 'leaderboard-nav'){
        hideElement(welcome) 
        hideElement(login)  
        hideElement(rules)
        fetchLeaderBoard()
        showElement(leaderboard)
       }
       else if (navSelect === 'rules-nav'){
        hideElement(welcome) 
        hideElement(login)  
        leaderboard.classList.remove('row')
        hideElement(leaderboard) 
        showElement(rules)
       }
}

function createLeaderboard(res) {
    leaderboard.innerHTML = "<h2 style = 'width: 100%;'>Leaderboard</h2><br><br><ol id='leaderList'></ol>";
    let lineOL = document.getElementById('leaderList');
    res.forEach(user => {
        let line = document.createElement('li');
        line.innerText = user.username.charAt(0).toUpperCase() + user.username.slice(1) + ": " + user.highscore;
        lineOL.appendChild(line)
    })
    leaderboard.appendChild(lineOL);
}

playDiv.addEventListener('click', function(){
    let gameOn = document.querySelector('#game')
    gameOn.classList.remove('hide')
    let clickPlay = document.getElementById('play-div')
    clickPlay.classList.add('hide')
    setTimer()
})

let possibilites = []

inputForm.addEventListener('submit', submitWord)


// startGameBtn.addEventListener('click', startGame)
loginForm.addEventListener('submit', userLogin)

function startGame(level){
    fetch(`http://localhost:3000/games/${level}`)
    .then(function(response){
        return response.json()
    })
    .then(function(json){
        console.log(json);
        letters.innerText = ""
        currentScore = 0
        score.innerText = currentScore
        json.letters.forEach(letter =>{
            showLetters(letter)
        })
        possibilities = json.possibilities
        wordList.innerHTML = ''
        showElement(playDiv)
        hideElement(welcome)
        fetchLeaderBoard()
        returnScore.innerText = "Your Score was"
    })
}


function userLogin(event){
   event.preventDefault()
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
        userID = res.id;
        let element = document.getElementById('login')
        hideElement(element)
        let next= document.getElementById('welcome')
        showElement(next)
        let addName = document.querySelector('#welcome h2')
        addName.innerHTML = `<h2>Welcome to Wordle, ${res.username.charAt(0).toUpperCase()}${res.username.slice(1)}!</h2>`;
        debugger
        let level = document.getElementById('level-group')
        showElement(level)
        let welcome = document.getElementById('intro')
        hideElement(welcome)
        addNavListeners(res)
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

let usedWords = []

function submitWord(event){
    event.preventDefault()
    let submittedWord = event.target.firstElementChild.value
    // debugger
    if (possibilities.includes(submittedWord) && !usedWords.includes(submittedWord)){
        usedWords.push(submittedWord)
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
    newWord.innerHTML = `<li id=wordlist> ${submittedWord} </li>`
    wordList.appendChild(newWord)
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
    var countDownDate = new Date().getTime() + 62000;
    // Update the count down every 1 second
    var x = setInterval(function() {
        // Get today's date and time
        var now = new Date().getTime();
        // Find the distance between now and the count down date
        var distance = countDownDate - now;
        // Time calculations for days, hours, minutes and seconds
        //  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);
        // Output the result in an element with id="demo"
        timer.innerHTML = seconds;
        // If the count down is over, write some text
        if (distance < 0) {
            clearInterval(x);
            document.getElementById("timer").innerHTML = "Times Up!";
            fetch(`http://localhost:3000/users/${userID}`,{
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    highscore: currentScore
                })   
            })
            .then(res => res.json())
            .then(res => console.log(res))
            timeUp()
        }
    }, 1000);
}

function timeUp(){
    // hide
    hideElement(game)
    // show
    showElement(gameOver)
    returnScore.innerText += " " + currentScore
    document.querySelector('#click-to-restart').addEventListener('click', function(){
        usedWords=[]
        currentScore = 0
        hideElement(gameOver)
        hideElement(game)
        showElement(levelSelect)
    }) 
}

function showLetters(letter) {
    let letterBox = document.createElement('div')
    letters.appendChild(letterBox)
    letterBox.innerHTML += `<div id='letter-box'>${letter.toUpperCase()}</div>`
}
gameInput.addEventListener('change', resetInner)

function resetInner(){
    if (gameInput.placeholder === "Invalid word"){
        gameInput.placeholder = "Enter your word here."
    }
}
