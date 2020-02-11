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

let colors = ['yellow', 'blue', 'red', 'green']


//assigning IDs for each block

for (let i=0; i < blocks.length; i++) {
    blocks[i].setAttribute('dataset', i + 1)
    blocks[i].setAttribute('id', colors[i])
    blocks[i].style.backgroundColor = colors[i]
}

function randomValue() {
    simon.push(Math.floor(Math.random() * 4))
    console.log(simon)
}

randomValue()
randomValue()
randomValue()