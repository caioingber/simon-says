let simon = []
let player = []
let blocks = document.querySelectorAll('.block')
let score = 0
let gameScore = document.querySelector('#score')
let newGame = document.querySelector('#new-game')
let colors = ['yellow', 'blue', 'red', 'green']

//Function to reset event listener
resetListen = () => {
    for (let i=0; i < blocks.length; i++) {
        blocks[i].addEventListener('click', playerTurn)
    }
}

for (let i=0; i < blocks.length; i++) {
    blocks[i].setAttribute('dataset', i)
    blocks[i].blockPosition = []
    blocks[i].blockPosition.push(Number(blocks[i].attributes[1].value))
    blocks[i].classList.add(colors[i])
}

newGame.addEventListener('click', startGame)

// Adding values to simon array
function startGame() {
    simon = []
    player = []
    gameScore.innerText = 0
    loser.innerText = ""
    score = 0
    simon.push(Math.floor(Math.random() * 4))
    resetListen()
    showValues()
}


function showValues() {
    for (i=0; i < simon.length; i++) {
        highlight(blocks[simon[i]], i)
    }
    // console.log(simon)
}

function highlight(value, interval) { 
    setTimeout(function() {value.classList.add('highlight')}, (interval * 750) + 250)
    setTimeout(function() {value.classList.remove('highlight')}, (interval * 750) + 750)
}

function playerTurn(e) {
    e.preventDefault()
    player.push(e.target.blockPosition[0])
    console.log(player)
    compareValues()
}

let count = 0
function compareValues() {
    if (player.length === simon.length) {
        count = 0
        for (let i=0; i < player.length; i++) {
            console.log(simon)
            console.log(player)
            if(simon[i] === player[i]) {
                count++
            } 
        }
        if (count === simon.length) {
            newRound()
            player = []
            score += 1
            count = 0
            gameScore.innerText = score
        } else {
            loserSays()
        }
    } else {
        if(simon[count] === player[count]) {
            count++
            resetListen()
        } else {
            loserSays()
        }
    }
}
        
function loserSays () {
    let loser = document.querySelector('#loser')
    loser.innerText = "Sorry, Try Again 😎"
    count = 0
    player = []
    simon = []
    for (let i=0; i < blocks.length; i++) {
        blocks[i].removeEventListener('click', playerTurn)
    }
}        

function newRound() {
    setTimeout(function() {
        simon.push(Math.floor(Math.random() * 4))
        let color = simon.pop()
        simon.push(color)
        console.log(simon)
        showValues()
    }, 1000)
}