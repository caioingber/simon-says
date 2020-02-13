let simon = []
let player = []
let blocks = document.querySelectorAll('.block')
let score = 0
let gameWon = false
let gameScore = document.querySelector('#score')
let newGame = document.querySelector('#new-game')
let colors = ['yellow', 'blue', 'red', 'green']
let sounds = document.querySelectorAll('.sounds')
let gameBoard = document.querySelector('#simon')
let mid = document.querySelector('.middle')
let womp = document.querySelector('#womp')
let horn = document.querySelector('#horn')
let simonTurn = false;


function resetListen () {
    setTimeout(function(){
        for (let i=0; i < blocks.length; i++) {
            blocks[i].addEventListener('click', playerTurn)
            blocks[i].addEventListener('click', showClick)
            blocks[i].style.pointerEvents = 'auto'
            blocks[i].style.cursor = 'pointer'
        }
    }, 750 * simon.length)
}

for (let i=0; i < blocks.length ; i++) {
    blocks[i].setAttribute('dataset', i)
    blocks[i].blockPosition = []
    blocks[i].blockPosition.push(Number(blocks[i].attributes[1].value))
    blocks[i].classList.add(colors[i])
    blocks[i].sound = sounds[i]
    blocks[i].addEventListener('click', playerTurn)
    blocks[i].addEventListener('click', showClick)
    blocks[i].style.pointerEvents = 'auto'
    blocks[i].style.cursor = 'pointer'
}

newGame.addEventListener('click', startGame)

function startGame() {
    for (let i=0; i < blocks.length ; i++) {
        let randomColor = Math.floor(Math.random()*16777215).toString(16)
        blocks[i].style.backgroundColor = '#' + randomColor
    }
    simonTurn = true
    gameBoard.classList.remove('rotate')
    gameWon = false
    simon = []
    player = []
    gameScore.innerText = 0
    loser.innerText = ""
    score = 0
    simon.push(Math.floor(Math.random() * 4))
    simonTurn = true
    showValues()
    resetListen()
}

function showValues() {
    for (let i=0; i < simon.length; i++) {
        highlight(blocks[simon[i]], i)
    }
}

function highlight(value, interval) { 
    console.log(value)
    setTimeout(function() {value.classList.add('highlight'); value.sound.play();}, (interval * 750) + 250)
    setTimeout(function() {value.classList.remove('highlight');}, (interval * 750) + 750)
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
    // for (let i=0; i < blocks.length; i++) {
    //     blocks[i].style.pointerEvents = 'none'
    // }
    if (gameWon === false) {
        compareValues()
    }
}

let count = 0
function compareValues() {
    console.log(simon)
    console.log(player)
    if (player.length === simon.length) {
        count = 0
        for (let i=0; i < blocks.length; i++) {
            blocks[i].style.pointerEvents = 'none'
        }
        for (let i=0; i < player.length; i++) {
            if(simon[i] === player[i]) {
                count++
            } 
        }
        if (count === simon.length) {
            score += 1
            if(score === 3) {
                loser.innerText = "Congratulations, You've Won! 🙌🙌🙌"
                gameScore.innerText = score
                gameWon = true
                horn.play()
                mid.classList.add('rotate')
                gameBoard.classList.add('rotate')
                for (let i=0; i < blocks.length; i++) {
                    blocks[i].style.pointerEvents = 'none'
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
            // resetListen()
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
    womp.play() 
    for (let i=0; i < blocks.length; i++) {
        // blocks[i].removeEventListener('click', playerTurn)
        // blocks[i].removeEventListener('click', showClick)
        blocks[i].style.pointerEvents = 'none'
    }
}        

function newRound() {
    setTimeout(function() {
        simonTurn = true
        simon.push(Math.floor(Math.random() * 4))
        let color = simon.pop()
        simon.push(color)
        console.log(simon)
        showValues()
        resetListen()
    }, 1500)
}