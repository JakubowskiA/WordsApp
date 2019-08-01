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
let currentScore = 0;
let longestWord = '';
let leaders = {}


// fetch the leaderboard
function fetchLeaderBoard(){
    fetch(`http://localhost:3000/users`)
    .then(res => res.json())
    .then(res => {
        createLeaderboard(res)
    })
}


//display the leaderboard
function createLeaderboard(res) {
    let table = document.getElementById('leader-table')
    let leaderHeading = document.querySelector('#leaderboard h2')
    leaderHeading.classList.remove('hide');
    table.classList.remove('hide');
    let tableBody = document.querySelector('#table-body');
    tableBody.innerHTML = ""
    let iterator = 0
    res.forEach(user =>{
        let line = document.createElement('tr') 
        line.innerHTML = `<th scope="row">${++iterator}</th>
                            <td>${user.username}</td>
                            <td>${user.highscore}</td>
                            <td>${user.longest_word}</td>`
        tableBody.appendChild(line);
    })
}

//add event listeners to the nav-bar
function addNavListeners(res){
    navBar.addEventListener('click', chooseNav)
}
// we have to all the function atleast once
addNavListeners("blah")


//this function is called with navbar is clicked
function chooseNav(event) {
    let nameAdd = document.querySelector('#welcome h2')
    const navSelect = event.target.id
       if (navSelect === 'login-nav') {
        // //hides the game over div which shows the user score in left div
        // hideElement(gameOver)
        // //hides welcome message on the right
        // hideElement(welcome) 

        // if(document.querySelector('#timer').innerHTML == 'Times Up!'){
        //     showElement(levelSelect)
        //     document.getElementById('submit').disabled = false;
        // }else{
            
        // }
        location.reload();
        // hideElement(rules)  
        // leaderboard.classList.remove('row')
        // hideElement(leaderboard) 
        // showElement(login)
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

// navbar event listener ends here


//add eventlistener to the 'how to play div'
playDiv.addEventListener('click', function(){
    let clickPlay = document.getElementById('play-div')
    clickPlay.classList.add('hide')
    showElement(game)
    setTimer()
})

let possibilites = []

//runs when user submits a word
inputForm.addEventListener('submit', submitWord)


// startGameBtn.addEventListener('click', startGame)

loginForm.addEventListener('submit', userLogin)

// starts the game and when the game is running the login button is disabled
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
        longestWord = res.longest_word;
        userID = res.id;
        let element = document.getElementById('login')
        hideElement(element)
        let next= document.getElementById('welcome')
        showElement(next)
        let addName = document.querySelector('#welcome h2')
        addName.innerHTML = `<h2>Welcome to Wordle, ${res.username.charAt(0).toUpperCase()}${res.username.slice(1)}!</h2>`;
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
        if(submittedWord.length > longestWord.length){
            longestWord = submittedWord;
        }
        usedWords.push(submittedWord)
        gameInput.value = ''
        currentScore += submittedWord.length
        score.innerText = currentScore
        gameInput.style.borderColor = 'lightskyblue';
        gameInput.style.boxShadow = '0 0 5px lightskyblue'

        console.log(currentScore)
        addWordToWordList(submittedWord)
        gameInput.classList.remove('input-shake')
    }
    else {
        gameInput.classList.add('input-shake')
        gameInput.value = '';
        gameInput.style.borderColor = 'red';
        gameInput.style.boxShadow = '0 0 5px red'
        gameInput.placeholder = "Invalid word";
    }
}

function addWordToWordList(submittedWord) {
    let newWord = document.createElement('li')
    newWord.innerText = submittedWord
    wordList.appendChild(newWord);
 
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
    var countDownDate = new Date().getTime() + 59000;
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
                    highscore: currentScore,
                    longest_word: longestWord
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
        // fetchLeaderBoard()
        // showElement(leaderboard)
        hideElement(gameOver)
        hideElement(game)
        showElement(levelSelect)
    }) 
}

function showLetters(letter) {
    let letterBox = document.createElement('div')
    letters.appendChild(letterBox)
    letterBox.innerHTML += `<div class='letter-box'>${letter.toUpperCase()}</div>`
}
gameInput.addEventListener('change', resetInner)

function resetInner(){
    if (gameInput.placeholder === "Invalid word"){
        gameInput.placeholder = "Enter your word here."
    }
}
