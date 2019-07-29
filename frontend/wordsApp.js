function getWords(){
    fetch("https://norvig.com/ngrams/enable1.txt")
    .then(function(response){
        return response.json()
    })
    .then(console.log(words)
    )
}

getWords()