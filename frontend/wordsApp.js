const startGameBtn = document.getElementById('start-game')
startGameBtn.addEventListener('click', startGame(event))
const letters = document.querySelector('#letters')
// letters.innerText = "";

function startGame(event){
    fetch(`http://localhost:3000/games/1`)
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