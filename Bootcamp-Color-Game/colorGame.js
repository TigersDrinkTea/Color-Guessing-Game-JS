var numberOfSquares = 6
var colors = [];
var pickedColor;
var colors = generateRandomColors(numberOfSquares);
var squares = document.querySelectorAll('.square');
var colorDisplay = document.getElementById('colorDisplay');
var messageDisplay = document.getElementById('message');
var h1 = document.querySelector('h1');
var resetButton = document.getElementById('reset');
var easyButton = document.getElementById('easyBtn')
var hardButton = document.getElementById('hardBtn');
var difficultyButtons = document.querySelectorAll('.difficulty')

init();

///////////////////////////////////////////////////////////////////////////////
function init() {
    // difficulty/mode buttons event listeners: this selects the number of squares generated and displayed for each mode.
    for (var i = 0; i < difficultyButtons.length; i++) {
        difficultyButtons[i].addEventListener('click', function () {
            difficultyButtons[0].classList.remove('selected');
            difficultyButtons[1].classList.remove('selected');
            difficultyButtons[2].classList.remove('selected');
            this.classList.add('selected');
            if (this.textContent === 'Easy') {
                numberOfSquares = 3;

            }
            if (this.textContent === 'Hard') {
                numberOfSquares = 6;
            }
            if (this.textContent === 'Expert!') {
                numberOfSquares = 9;
            }
            reset();

        });
    }

    //This is the main loop assignign the random colors to the squares and checking for wins/losses
    for (let i = 0; i < squares.length; i++) {
        // add colors to squares 
        squares[i].style.backgroundColor = colors[i];

        //Add click listeners to squares
        squares[i].addEventListener('click', function () {
            //Get the colors of the clicked squares
            var clickedColor = this.style.backgroundColor;

            //Compare to the picked color
            if (clickedColor === pickedColor) {
                messageDisplay.textContent = 'CORRECT!';
                resetButton.textContent = ('Play Again?')
                changeColorsWin(clickedColor);
                h1.style.background = clickedColor;

            } else {
                this.style.backgroundColor = '#232323';
                messageDisplay.textContent = 'TRY AGAIN';
            }
        });
    }
reset();
}
//////////////////////////////////////////////////////////////////////////////////


// RESET: when we reset we also have to check if we are playing on easy or hard to decide how many squares to show. All that happens is in the for loop we check to see for each index if there is a color generated and if there is then set the squares background to it. if not then we display nothing. EG we click hard, generate 6 colors, when we reset there are 6 generated so the for loop finds them all and sets the background to that color
function reset() {
    resetButton.textContent = ('Reset Colors')
    messageDisplay.textContent = '';
    colorDisplay.textContent = pickedColor;
    h1.style.background = 'steelblue';
    //generate new colors
    colors = generateRandomColors(numberOfSquares);
    //pick new random color from array
    pickedColor = pickColor();
    //change colors of squares to match the array. it says if there is a color generated then change the squares abckground to that color. else hide the square
    for (let i = 0; i < squares.length; i++) {
        if (colors[i]) {
            squares[i].style.display = 'block';
            squares[i].style.backgroundColor = colors[i];
        } else {
            squares[i].style.display = 'none';
        }
    }
};


//Reseting the game with New Colors Button
resetButton.addEventListener('click', function () {
    reset();
});


// changing all the colors to the winning color
function changeColorsWin(Color) {
    //loop through all the squares
    for (let i = 0; i < squares.length; i++) {
        // change the color to the clicked one
        squares[i].style.backgroundColor = Color;
    }
};


//////////////////////////////////////////////////////////////////////////////////////////////
//function to create a random number and then select that index position from the colors array. 
function pickColor() {
    var random = Math.floor(Math.random() * colors.length)
    return colors[random];
}

//function to generate the num of random colors in the array
function generateRandomColors(num) {
    //make an array
    var arr = [];
    //add num random colors
    for (let i = 0; i < num; i++) {
        //Get random color from random color generator function below and push to array
        arr.push(randomColor());
    }
    //return that array
    return arr;
}

//function to create random colors
function randomColor() {
    // pick three numbers from 0-255
    var r = Math.floor(Math.random() * 256);
    var g = Math.floor(Math.random() * 256);
    var b = Math.floor(Math.random() * 256);
    return 'rgb(' + r + ', ' + g + ', ' + b + ')';
}

//////////////////////////////////////////////////////////////////////


