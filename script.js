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


//assigning IDs for each block

for (let i=0; i < blocks.length; i++) {
    blocks[i].setAttribute('dataset', i)
    blocks[i].blockPosition = []
    blocks[i].blockPosition.push(Number(blocks[i].attributes[1].value))
    blocks[i].classList.add(colors[i])
    //event listener for player clicksa
    blocks[i].addEventListener('click', playerTurn)
    // blocks[i].style.backgroundColor = colors[i]
}

let newGame = document.querySelector('#new-game')

newGame.addEventListener('click', startGame)

// Adding values to simon array
function startGame() {
    simon = []
    player = []
    simon.push(Math.floor(Math.random() * 4))
    // showValues()
}

// function showValues() {
//     for (let i=0; i < simon.length; i++) {
//         blocks[simon[i]].classList.add('highlight')
//     }
//     console.log(simon)
//     // newRound()
// }

function playerTurn(e) {
    e.preventDefault()
    // console.dir(e.target)
    console.log(e.target.classList[1])
    player.push(e.target.blockPosition[0])
    console.log(player)
    if(player.length === simon.length) {
        compareValues()
    }
}

function compareValues() {
    let count = 0
    for (let i=0; i < simon.length; i++) {
        if(simon[i] === player[i]) {
            count = count + 1
            if(count === simon.length) {
                score = score + 1
                playerWin = true
                newRound()
                player = []
                break
            }
        } else {
            console.log("You Lose")
        }
    }
}

function newRound() {
    simon.push(Math.floor(Math.random() * 4))
    let color = simon.pop()
    console.log(blocks[color].classList[1])
    simon.push(color)
    console.log(simon)
}