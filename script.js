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
        blocks[i].addEventListener('click', showClick)
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
    for (let i=0; i < blocks.length; i++) {
        blocks[i].style.cursor = 'pointer'
    }
    simon = []
    player = []
    gameScore.innerText = 0
    loser.innerText = ""
    score = 0
    simon.push(Math.floor(Math.random() * 4))
    showValues()
}


function showValues() {
    for (let i=0; i < simon.length; i++) {
        highlight(blocks[simon[i]], i)
    }
}

function removeHover(e) {
    e.preventDefault()
    e.target.style.opacity = null
}

function hoverButton(e) {
    e.preventDefault()
    e.target.style.opacity = .5
    console.dir(e.target)
}

function highlight(value, interval) { 
    console.log(value)
    setTimeout(function() {value.classList.add('highlight')}, (interval * 750) + 250)
    setTimeout(function() {value.classList.remove('highlight')}, (interval * 750) + 750)
    setTimeout(resetListen, (interval * 750) + 750)
}

let header = document.querySelector('h1')
header.addEventListener('click', showClick)

function showClick() {
    highlight(this, -.5)
}

let pIndex = 0
function playerTurn(e) {
    // highlight when player clicks block
    e.preventDefault()
    player.push(e.target.blockPosition[0])
    console.log(pIndex)
    compareValues()
}

let count = 0
function compareValues() {
    console.log(simon)
    console.log(player)
    if (player.length === simon.length) {
        count = 0
        for (let i=0; i < player.length; i++) {
            if(simon[i] === player[i]) {
                count++
            } 
        }
        if (count === simon.length) {
            score += 1
            if(score === 10) {
                loser.innerText = "Congratulations, You've Won! 🙌🙌🙌"
                for (let i=0; i < blocks.length; i++) {
                    gameScore.innerText = score
                    blocks[i].removeEventListener('click', playerTurn)
                }
            } else {
                newRound()
                player = []
                count = 0
                gameScore.innerText = score
            }
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
        blocks[i].addEventListener('click', showClick)
        blocks[i].style.cursor = null
    }
}        

function newRound() {
    setTimeout(function() {
        simon.push(Math.floor(Math.random() * 4))
        let color = simon.pop()
        simon.push(color)
        console.log(simon)
        showValues()
        resetListen()
    }, 1500)
        pIndex = 0
}