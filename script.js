/* SIMON PROJECT

Components
- 4 div blocks, each a different color
- A 'Start' Game button
- A Score section

Objects

- The Game
    - Contains: Player, Simon, Title, Score, Start button
    - Methods
        - Score tracker
        - Comparison function
        - Event listeners
- Simon
    - Contains: the board itself, each block, a 'random' assignment method, and an array of choices
- Player
    - Contains: name, array of choice, method to add choices to array


Gameplay (dumb version)

- Page loads, with 4 blocks. Function to startGame has event listener on 'Start Game' button. 
- startGame begins with a score of 0, and initiates a newRound function. 
- Once the newRound begins, it assigns a random number using Math Floor(Math Random ()) between 0 - 3 
(each div contains a block in an array) and adds that number to a new array. 
Once there is an additional value in the array, another eventListener is added waiting for a click action from the user.

The user clicks on a block, the index of the block (using e.target) is then pushed into a user array.
Once the value has been pushed, function is invoked to compareArrays utilizing a for loop set to the length of the computer Array

*/

//defining elements

let simon = []
let player = []
let blocks = document.querySelectorAll('.block')
let score = 0
let playerWin = false

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
    blocks[i].addEventListener('click', playerTurn)
    //event listener for player clicksa
    
    // blocks[i].style.backgroundColor = colors[i]
}



let newGame = document.querySelector('#new-game')

newGame.addEventListener('click', startGame)

// Adding values to simon array
function startGame() {
    simon = []
    player = []
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
    setTimeout(function() {value.classList.add('highlight')}, (interval * 500) + 250)
    setTimeout(function() {value.classList.remove('highlight')}, (interval * 500) + 500)
}

function playerTurn(e) {
    e.preventDefault()
    // console.dir(e.target)
    // console.log(e.target.classList[1])
    player.push(e.target.blockPosition[0])
    console.log(player)
    compareValues()
}

function compareValues() {
    if (player.length === simon.length) {
        let count = 0
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
        } else {
            alert("You lose!")
            player = []
            simon = []
        }
    } else {
        resetListen()
    }
}
        
        

function newRound() {
    simon.push(Math.floor(Math.random() * 4))
    let color = simon.pop()
    // console.log(blocks[color].classList[1])
    simon.push(color)
    console.log(simon)
    showValues()
}