const startGameBtn = document.getElementById('level-selector')
const letters = document.querySelector('#letters')
const loginInput = document.getElementById('submit')

startGameBtn.addEventListener('click', startGame)
loginInput.addEventListener('click', userLogin)

function startGame(event){
    console.log(event.target)

    fetch(`http://localhost:3000/games/${event.target.id}`)
    .then(function(response){
        return response.json()
    })
    .then(function(json){
        console.log(json);
        json.letters.forEach(letter =>{
            // letters.innerText = ""
            letters.innerText += " " + letter
        })
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
}

// Hide element
function hideElement(element){
    element.classList.add('hide')
}

// Show element
function showElement(next){
    next.classList.remove('hide')
}
